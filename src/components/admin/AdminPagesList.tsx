import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  Filter,
  Eye,
  Pencil,
  Trash2,
  Copy,
  ExternalLink,
  CheckSquare,
  Square,
  FileCheck,
  FileX,
  Sparkles,
  MapPin,
  Zap,
  Home,
  AlertTriangle,
} from 'lucide-react';
import { PageRecord, TemplateType } from '../../types';

interface AdminPagesListProps {
  pages: PageRecord[];
  onEditPage: (page: PageRecord) => void;
  onDeletePage: (id: string) => void;
  onBulkUpdateStatus: (ids: string[], status: 'published' | 'draft') => void;
  onBulkDelete: (ids: string[]) => void;
  onCreateNew: () => void;
}

export const AdminPagesList: React.FC<AdminPagesListProps> = ({
  pages,
  onEditPage,
  onDeletePage,
  onBulkUpdateStatus,
  onBulkDelete,
  onCreateNew,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [templateFilter, setTemplateFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pageToDelete, setPageToDelete] = useState<PageRecord | null>(null);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredPages = useMemo(() => {
    return pages.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.city && p.city.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchTemplate = templateFilter === 'all' || p.template_type === templateFilter;
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;

      return matchSearch && matchTemplate && matchStatus;
    });
  }, [pages, searchQuery, templateFilter, statusFilter]);

  const allSelected = filteredPages.length > 0 && selectedIds.length === filteredPages.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredPages.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getTemplateIcon = (type: TemplateType) => {
    switch (type) {
      case 'city':
        return <MapPin className="w-3.5 h-3.5 text-blue-400" />;
      case 'system_size':
        return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'sqft':
        return <Home className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  const publishedCount = pages.filter((p) => p.status === 'published').length;

  return (
    <div className="space-y-6">
      {/* Spam Filter Protection / Stagger Warning Banner */}
      {publishedCount > 5 && (
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-amber-200 text-xs leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-300 text-sm block">
              SEO Staggering Advisory ({publishedCount} Pages Published)
            </span>
            <p className="text-amber-200/90">
              SEO Note: Publishing many pages simultaneously can trigger Google spam filters. Consider publishing 3-5 pages per week and monitoring Google Search Console indexing before scaling.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Programmatic Pages Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {pages.length} total SEO landing pages configured in database
          </p>
        </div>

        <button
          type="button"
          id="admin-add-page-btn"
          onClick={onCreateNew}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-3 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pages by keyword, city, or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={templateFilter}
              onChange={(e) => setTemplateFilter(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Templates</option>
              <option value="city" className="bg-slate-900">Template 1: City Guides</option>
              <option value="system_size" className="bg-slate-900">Template 2: System Size</option>
              <option value="sqft" className="bg-slate-900">Template 3: Roof Sq Ft</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Status</option>
              <option value="published" className="bg-slate-900">Published Only</option>
              <option value="draft" className="bg-slate-900">Drafts Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Action Controls */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-950/80 border border-blue-800 rounded-xl p-3 flex items-center justify-between text-xs text-blue-200">
          <div className="font-semibold flex items-center gap-2">
            <span>{selectedIds.length} pages selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onBulkUpdateStatus(selectedIds, 'published')}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Publish Selected</span>
            </button>
            <button
              type="button"
              onClick={() => onBulkUpdateStatus(selectedIds, 'draft')}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold flex items-center gap-1 cursor-pointer"
            >
              <FileX className="w-3.5 h-3.5" />
              <span>Set as Draft</span>
            </button>
            <button
              type="button"
              onClick={() => setShowBulkDeleteConfirm(true)}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected ({selectedIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Single Delete Confirmation Modal */}
      {pageToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Delete Programmatic Page?</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Are you sure you want to permanently delete <strong className="text-slate-200">"{pageToDelete.title}"</strong> (<code className="text-blue-400">/{pageToDelete.slug}</code>)? This will also remove any linked FAQs.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPageToDelete(null)}
                disabled={Boolean(deletingId)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  setDeletingId(pageToDelete.id);
                  try {
                    await onDeletePage(pageToDelete.id);
                    setPageToDelete(null);
                  } finally {
                    setDeletingId(null);
                  }
                }}
                disabled={Boolean(deletingId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer transition-colors"
              >
                {deletingId ? 'Deleting...' : 'Yes, Delete Page'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {showBulkDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Delete {selectedIds.length} Selected Pages?</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  This action will permanently delete all {selectedIds.length} selected programmatic SEO pages and their configurations. This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowBulkDeleteConfirm(false)}
                disabled={Boolean(deletingId)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  setDeletingId('bulk');
                  try {
                    await onBulkDelete(selectedIds);
                    setSelectedIds([]);
                    setShowBulkDeleteConfirm(false);
                  } finally {
                    setDeletingId(null);
                  }
                }}
                disabled={Boolean(deletingId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer transition-colors"
              >
                {deletingId ? 'Deleting...' : `Delete ${selectedIds.length} Pages`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pages Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-10">
                  <button
                    type="button"
                    onClick={toggleSelectAll}
                    className="cursor-pointer text-slate-400 hover:text-white"
                  >
                    {allSelected ? (
                      <CheckSquare className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-4">Page Title & Slug</th>
                <th className="py-3.5 px-4">Template</th>
                <th className="py-3.5 px-4">Entity</th>
                <th className="py-3.5 px-4">Avg Cost</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No programmatic pages found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => {
                  const isSelected = selectedIds.includes(page.id);
                  return (
                    <tr
                      key={page.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isSelected ? 'bg-blue-950/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => toggleSelectOne(page.id)}
                          className="cursor-pointer text-slate-400 hover:text-white"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm hover:text-blue-400 transition-colors">
                          {page.title}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                          <span>/{page.slug}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 text-[11px] font-semibold">
                          {getTemplateIcon(page.template_type)}
                          <span className="capitalize">{page.template_type.replace('_', ' ')}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400">
                        {page.template_type === 'city' && (
                          <span className="font-medium text-slate-200">{page.city}, {page.state}</span>
                        )}
                        {page.template_type === 'system_size' && (
                          <span className="font-medium text-amber-300">{page.system_size_kw} kW System</span>
                        )}
                        {page.template_type === 'sqft' && (
                          <span className="font-medium text-purple-300">{page.sqft} sq ft</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-200">
                        ₹{(page.avg_cost_min * (page.template_type === 'city' ? 3 : 1)).toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            page.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${page.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                          {page.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            title="Preview Public Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => onEditPage(page)}
                            className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-lg transition-colors cursor-pointer"
                            title="Edit in CMS"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setPageToDelete(page)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-900/30 rounded-lg transition-colors cursor-pointer"
                            title="Delete Page"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
