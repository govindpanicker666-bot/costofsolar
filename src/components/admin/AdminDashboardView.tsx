import React from 'react';
import {
  FileText,
  Users,
  Layers,
  Sparkles,
  TrendingUp,
  Plus,
  ArrowRight,
  Database,
  Download,
  Calendar,
  CheckCircle2,
  MapPin,
  Zap,
  Home,
  Clock,
} from 'lucide-react';
import { PageRecord, LeadRecord } from '../../types';

interface AdminDashboardViewProps {
  pages: PageRecord[];
  leads: LeadRecord[];
  onNavigate: (tab: 'pages' | 'create' | 'leads' | 'templates' | 'settings') => void;
  onCreateWithTemplate: (template: 'city' | 'system_size' | 'sqft') => void;
  onExportLeadsCsv: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  pages,
  leads,
  onNavigate,
  onCreateWithTemplate,
  onExportLeadsCsv,
}) => {
  const publishedPages = pages.filter((p) => p.status === 'published');
  const draftPages = pages.filter((p) => p.status === 'draft');

  // Calculate published in the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const publishedThisWeek = publishedPages.filter((p) => {
    const d = new Date(p.updated_at || p.created_at);
    return !isNaN(d.getTime()) && d >= sevenDaysAgo;
  }).length;

  const cityPagesCount = pages.filter((p) => p.template_type === 'city').length;
  const systemPagesCount = pages.filter((p) => p.template_type === 'system_size').length;
  const sqftPagesCount = pages.filter((p) => p.template_type === 'sqft').length;

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Programmatic SEO Dashboard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Cost of Solar Installation CMS engine for costofsolarinstallation.com
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            id="quick-export-leads-btn"
            onClick={onExportLeadsCsv}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Leads CSV</span>
          </button>

          <button
            type="button"
            id="quick-create-page-btn"
            onClick={() => onNavigate('create')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Page</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Generated Pages</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white">{pages.length}</div>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="text-emerald-400 font-bold">{publishedPages.length} Published</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">{draftPages.length} Drafts</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Published This Week</span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">{publishedThisWeek}</div>
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className={publishedThisWeek > 5 ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
              {publishedThisWeek > 5 ? 'High velocity (stagger recommended)' : 'Safe publishing velocity'}
            </span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Customer Leads</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">{leads.length}</div>
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Quote Inquiries</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Indexed Sitemap URLs</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">{publishedPages.length + 1}</div>
          <div className="text-xs text-slate-400">
            Auto-synced to /sitemap.xml
          </div>
        </div>
      </div>

      {/* Programmatic Template Distribution & Quick Creation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template 1: City Pages */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-slate-800 text-blue-400 rounded-full border border-slate-700">
                {cityPagesCount} Pages
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              Template 1: City Price Guides
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Target keywords: "Solar installation cost in [City]". Features DISCOM net metering steps, nearby city comparisons, and local verified EPC installers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onCreateWithTemplate('city')}
            className="w-full py-2.5 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 hover:border-blue-500"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate City Page</span>
          </button>
        </div>

        {/* Template 2: System Size Pages */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-slate-800 text-amber-400 rounded-full border border-slate-700">
                {systemPagesCount} Pages
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              Template 2: System Size (kW)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Target keywords: "[X]kW solar system cost in India". Includes On-grid vs Off-grid vs Hybrid, daily generation specs, and sortable city tables.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onCreateWithTemplate('system_size')}
            className="w-full py-2.5 bg-slate-800 hover:bg-amber-600 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 hover:border-amber-500"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate System Size Page</span>
          </button>
        </div>

        {/* Template 3: Sq Ft Pages */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-slate-800 text-purple-400 rounded-full border border-slate-700">
                {sqftPagesCount} Pages
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              Template 3: Roof Area (Sq Ft)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Target keywords: "Solar cost for [X] sq ft house". Includes 12-month before/after electricity bill line chart and 10-year cumulative ROI curve.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onCreateWithTemplate('sqft')}
            className="w-full py-2.5 bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 hover:border-purple-500"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate Sq Ft Page</span>
          </button>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Recent Customer Quote Inquiries</h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('leads')}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({leads.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentLeads.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            No leads received yet. Test by submitting a quote request on the homepage or any city page.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Phone Number</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Monthly Bill</th>
                  <th className="py-3 px-4">Roof Area</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">{lead.name}</td>
                    <td className="py-3 px-4 text-emerald-400 font-mono">{lead.phone}</td>
                    <td className="py-3 px-4">{lead.city}</td>
                    <td className="py-3 px-4">₹{lead.monthly_bill.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">{lead.roof_area_sqft} sq ft</td>
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
