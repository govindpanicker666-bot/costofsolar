import React, { useState, useMemo } from 'react';
import {
  Users,
  Download,
  Search,
  Filter,
  Phone,
  Calendar,
  IndianRupee,
  Home,
  CheckCircle2,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { LeadRecord } from '../../types';

interface AdminLeadsViewProps {
  leads: LeadRecord[];
  onDeleteLead: (id: string) => void;
  onExportCsv: () => void;
}

export const AdminLeadsView: React.FC<AdminLeadsViewProps> = ({
  leads,
  onDeleteLead,
  onExportCsv,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');

  const cities = ['all', ...Array.from(new Set(leads.map((l) => l.city).filter(Boolean)))];

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery) ||
        lead.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.source_slug && lead.source_slug.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCity = cityFilter === 'all' || lead.city.toLowerCase() === cityFilter.toLowerCase();
      return matchSearch && matchCity;
    });
  }, [leads, searchQuery, cityFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Customer Solar Leads
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {leads.length} high-intent homeowner quote submissions collected across all pages
          </p>
        </div>

        <button
          type="button"
          id="export-leads-csv-btn"
          onClick={onExportCsv}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export All Leads to CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-3 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, phone, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
          >
            {cities.map((c) => (
              <option key={c} value={c} className="bg-slate-900 capitalize">
                {c === 'all' ? 'All Cities' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Contact Phone</th>
                <th className="py-3.5 px-4">City</th>
                <th className="py-3.5 px-4">Monthly Bill</th>
                <th className="py-3.5 px-4">Roof Area</th>
                <th className="py-3.5 px-4">Source Page Slug</th>
                <th className="py-3.5 px-4">Submission Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No customer quote requests found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white text-sm">
                      {lead.name}
                    </td>

                    <td className="py-3.5 px-4">
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-emerald-400 font-mono font-bold hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{lead.phone}</span>
                      </a>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-200">
                      {lead.city}
                    </td>

                    <td className="py-3.5 px-4 text-amber-400 font-bold">
                      ₹{lead.monthly_bill.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3.5 px-4 text-purple-300 font-medium">
                      {lead.roof_area_sqft} sq ft
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      /{lead.source_slug || 'home'}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onDeleteLead(lead.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-900/30 rounded-lg transition-colors cursor-pointer"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
