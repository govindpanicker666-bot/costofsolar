import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Layers,
  Users,
  Settings,
  LogOut,
  Sun,
  ExternalLink,
  Menu,
  X,
  Database,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'pages' | 'create' | 'templates' | 'leads' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'pages' | 'create' | 'templates' | 'leads' | 'settings') => void;
  onLogout: () => void;
  leadsCount?: number;
  pagesCount?: number;
  isFirebaseConnected?: boolean;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  onLogout,
  leadsCount = 0,
  pagesCount = 0,
  isFirebaseConnected = false,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'pages', label: 'Pages', icon: FileText, badge: pagesCount },
    { id: 'create', label: 'Create Page', icon: PlusCircle, badge: 'New' },
    { id: 'templates', label: 'Templates', icon: Layers, badge: '3' },
    { id: 'leads', label: 'Leads', icon: Users, badge: leadsCount },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Sun className="w-5 h-5 text-amber-300" />
          </div>
          <span className="font-bold text-white text-sm">Solar CMS Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:block md:w-64 bg-slate-900 border-r border-slate-800/80 p-5 flex flex-col justify-between shrink-0 z-40`}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Sun className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block">
                  Solar CMS
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Programmatic Engine
                </span>
              </div>
            </Link>
          </div>

          {/* Database Status Indicator */}
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Database className={`w-4 h-4 ${isFirebaseConnected ? 'text-emerald-400' : 'text-amber-400'}`} />
              <span className="font-medium text-slate-300">
                {isFirebaseConnected ? 'Firebase Connected' : 'Local Persistent'}
              </span>
            </div>
            <span className={`w-2 h-2 rounded-full ${isFirebaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-sm font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`admin-nav-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Footer Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
          <div className="px-3 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
              GP
            </div>
            <div className="truncate flex-1">
              <div className="text-white font-bold text-xs truncate">Govind Panicker</div>
              <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Super Admin
              </div>
            </div>
          </div>

          <div className="space-y-1 font-semibold">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-blue-400" />
                <span>View Public Site</span>
              </div>
              <span className="text-[10px] text-slate-500">Live</span>
            </Link>

            <button
              type="button"
              id="admin-logout-btn"
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 bg-slate-950 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
