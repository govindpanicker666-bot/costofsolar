import React, { useState, useEffect } from 'react';
import {
  PageRecord,
  FaqRecord,
  InstallerRecord,
  LeadRecord,
  TemplateType,
} from '../types';
import {
  fetchPages,
  fetchLeads,
  savePage,
  deletePage,
  bulkUpdatePagesStatus,
  bulkDeletePages,
  saveFaqs,
  deleteLead,
  seedDefaultDataset,
  resetToDefaultData,
  isFirebaseConfigured,
} from '../lib/firebase';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminDashboardView } from '../components/admin/AdminDashboardView';
import { AdminPagesList } from '../components/admin/AdminPagesList';
import { AdminPageEditor } from '../components/admin/AdminPageEditor';
import { AdminTemplatesView } from '../components/admin/AdminTemplatesView';
import { AdminLeadsView } from '../components/admin/AdminLeadsView';
import { AdminSettingsView } from '../components/admin/AdminSettingsView';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pages' | 'create' | 'templates' | 'leads' | 'settings'>('dashboard');
  const [pages, setPages] = useState<PageRecord[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [editingPage, setEditingPage] = useState<PageRecord | null>(null);
  const [loading, setLoading] = useState(true);

  // Check auth state on mount
  useEffect(() => {
    const authState = localStorage.getItem('solar_cms_admin_auth_v2');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Fetch data
  const refreshData = async () => {
    try {
      const [pagesData, leadsData] = await Promise.all([
        fetchPages(),
        fetchLeads(),
      ]);
      setPages(pagesData);
      setLeads(leadsData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('solar_cms_admin_auth_v2');
    localStorage.removeItem('solar_cms_admin_user');
    setIsAuthenticated(false);
  };

  const handleSavePage = async (
    pageToSave: PageRecord,
    faqs: FaqRecord[],
    installers: InstallerRecord[]
  ) => {
    await savePage(pageToSave);
    if (faqs.length > 0) {
      await saveFaqs(pageToSave.id, faqs);
    }
    await refreshData();
    setEditingPage(null);
    setActiveTab('pages');
  };

  const handleDeletePage = async (id: string) => {
    await deletePage(id);
    await refreshData();
  };

  const handleBulkUpdateStatus = async (ids: string[], status: 'published' | 'draft') => {
    await bulkUpdatePagesStatus(ids, status);
    await refreshData();
  };

  const handleBulkDelete = async (ids: string[]) => {
    await bulkDeletePages(ids);
    await refreshData();
  };

  const handleDeleteLead = async (id: string) => {
    await deleteLead(id);
    await refreshData();
  };

  const handleExportLeadsCsv = () => {
    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = ['ID', 'Name', 'Phone', 'City', 'Monthly Bill (INR)', 'Roof Area (sq ft)', 'Source Slug', 'Date'];
    const csvRows = [
      headers.join(','),
      ...leads.map((l) =>
        [
          `"${l.id}"`,
          `"${l.name.replace(/"/g, '""')}"`,
          `"${l.phone}"`,
          `"${l.city.replace(/"/g, '""')}"`,
          l.monthly_bill,
          l.roof_area_sqft,
          `"${l.source_slug || ''}"`,
          `"${l.created_at}"`,
        ].join(',')
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `solar_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateWithTemplate = (template: TemplateType) => {
    const newDraft: PageRecord = {
      id: `page-${Date.now()}`,
      slug:
        template === 'city'
          ? 'solar-installation-cost-in-new-city'
          : template === 'system_size'
          ? '4kw-solar-system-cost-in-india'
          : 'solar-installation-cost-for-2500-sqft-house',
      title:
        template === 'city'
          ? 'Solar Installation Cost in New City 2026'
          : template === 'system_size'
          ? '4kW Solar System Cost in India 2026'
          : 'Solar Installation Cost for 2500 sq ft House 2026',
      template_type: template,
      city: template === 'city' ? 'Chandigarh' : undefined,
      state: template === 'city' ? 'Punjab' : undefined,
      system_size_kw: template === 'system_size' ? 4 : 3,
      sqft: template === 'sqft' ? 2500 : undefined,
      avg_cost_min: 49000,
      avg_cost_max: 56000,
      cost_per_watt: 50.5,
      subsidy_amount: 78000,
      savings_per_year: 42000,
      payback_years: 3.6,
      meta_title: 'Solar Installation Cost 2026',
      meta_description: 'Complete cost and subsidy guide for solar installation.',
      status: 'published',
      section_order: ['hero', 'quick_stats', 'cost_breakdown', 'calculator', 'faq', 'cta'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setEditingPage(newDraft);
    setActiveTab('create');
  };

  const handleSeedDataset = async () => {
    await seedDefaultDataset();
    await refreshData();
    alert('Successfully seeded 25+ programmatic SEO pages!');
  };

  const handleResetData = async () => {
    await resetToDefaultData();
    await refreshData();
    alert('Reset database to default seed state.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const isConnected = isFirebaseConfigured();

  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={(tab) => {
        if (tab === 'create') setEditingPage(null);
        setActiveTab(tab);
      }}
      onLogout={handleLogout}
      leadsCount={leads.length}
      pagesCount={pages.length}
      isFirebaseConnected={isConnected}
    >
      {activeTab === 'dashboard' && (
        <AdminDashboardView
          pages={pages}
          leads={leads}
          onNavigate={(tab) => {
            if (tab === 'create') setEditingPage(null);
            setActiveTab(tab);
          }}
          onCreateWithTemplate={handleCreateWithTemplate}
          onExportLeadsCsv={handleExportLeadsCsv}
        />
      )}

      {activeTab === 'pages' && (
        <AdminPagesList
          pages={pages}
          onEditPage={(page) => {
            setEditingPage(page);
            setActiveTab('create');
          }}
          onDeletePage={handleDeletePage}
          onBulkUpdateStatus={handleBulkUpdateStatus}
          onBulkDelete={handleBulkDelete}
          onCreateNew={() => {
            setEditingPage(null);
            setActiveTab('create');
          }}
        />
      )}

      {activeTab === 'create' && (
        <AdminPageEditor
          initialPage={editingPage}
          onSave={handleSavePage}
          onCancel={() => {
            setEditingPage(null);
            setActiveTab('pages');
          }}
        />
      )}

      {activeTab === 'templates' && (
        <AdminTemplatesView onCreateWithTemplate={handleCreateWithTemplate} />
      )}

      {activeTab === 'leads' && (
        <AdminLeadsView
          leads={leads}
          onDeleteLead={handleDeleteLead}
          onExportCsv={handleExportLeadsCsv}
        />
      )}

      {activeTab === 'settings' && (
        <AdminSettingsView
          onSeedData={handleSeedDataset}
          onResetData={handleResetData}
        />
      )}
    </AdminLayout>
  );
};
