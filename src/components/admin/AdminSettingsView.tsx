import React, { useState, useEffect } from 'react';
import {
  Settings,
  Database,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Layers,
  FileCode,
  Flame,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { FIREBASE_FIRESTORE_RULES } from '../../types';
import { getFirebaseConfig, isFirebaseConfigured } from '../../lib/firebase';

interface AdminSettingsViewProps {
  isSupabaseConnected?: boolean;
  onSeedData: () => void;
  onResetData: () => void;
}

export const AdminSettingsView: React.FC<AdminSettingsViewProps> = ({
  onSeedData,
  onResetData,
}) => {
  const currentConfig = getFirebaseConfig();
  const [apiKey, setApiKey] = useState(currentConfig.apiKey || '');
  const [projectId, setProjectId] = useState(currentConfig.projectId || '');
  const [authDomain, setAuthDomain] = useState(currentConfig.authDomain || '');
  const [appId, setAppId] = useState(currentConfig.appId || '');
  const [messagingSenderId, setMessagingSenderId] = useState(currentConfig.messagingSenderId || '');
  const [storageBucket, setStorageBucket] = useState(currentConfig.storageBucket || '');

  const [copiedRules, setCopiedRules] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const isConnected = isFirebaseConfigured();

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    const configToSave = {
      apiKey: apiKey.trim(),
      projectId: projectId.trim(),
      authDomain: authDomain.trim() || (projectId.trim() ? `${projectId.trim()}.firebaseapp.com` : ''),
      appId: appId.trim(),
      messagingSenderId: messagingSenderId.trim(),
      storageBucket: storageBucket.trim() || (projectId.trim() ? `${projectId.trim()}.appspot.com` : ''),
    };

    localStorage.setItem('solar_custom_firebase_config_v3', JSON.stringify(configToSave));
    setStatusMsg('Firebase credentials saved successfully! Reloading connection...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleCopyRules = () => {
    navigator.clipboard.writeText(FIREBASE_FIRESTORE_RULES);
    setCopiedRules(true);
    setTimeout(() => setCopiedRules(false), 2500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <Flame className="w-7 h-7 text-amber-500" />
          System Settings & Firebase Firestore
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Native AI Studio persistent cloud database configuration, Firestore security rules, and programmatic page seeders.
        </p>
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Firebase Firestore Connection Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <Database className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Firebase Firestore Database</h2>
              <p className="text-xs text-slate-400">
                Native AI Studio persistent cloud database with real-time sync & automatic offline fallback.
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto ${
              isConnected
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-indigo-400'}`} />
            {isConnected ? 'Live Firebase Firestore Connected' : 'Native Offline/Local Engine Ready'}
          </span>
        </div>

        <form onSubmit={handleSaveCredentials} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Firebase Project ID (`VITE_FIREBASE_PROJECT_ID`)
              </label>
              <input
                type="text"
                placeholder="cost-of-solar-india-app"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Firebase Web API Key (`VITE_FIREBASE_API_KEY`)
              </label>
              <input
                type="password"
                placeholder="AIzaSyA_example_api_key_here..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Auth Domain (Optional)
              </label>
              <input
                type="text"
                placeholder="your-project.firebaseapp.com"
                value={authDomain}
                onChange={(e) => setAuthDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                App ID (Optional)
              </label>
              <input
                type="text"
                placeholder="1:123456789:web:abcdef123456"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              id="save-firebase-settings-btn"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              Save Firebase Credentials
            </button>
            <span className="text-[11px] text-slate-400">
              Works instantly in browser even without API keys via client-side storage cache.
            </span>
          </div>
        </form>
      </div>

      {/* Firestore Security Rules Copy Block */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Firestore Security Rules (`firestore.rules`)</h2>
              <p className="text-xs text-slate-400">
                Security rules for the collections (`pages`, `faqs`, `installers`, and `leads`).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyRules}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
          >
            {copiedRules ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Rules Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy Firestore Rules</span>
              </>
            )}
          </button>
        </div>

        <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 text-[11px] font-mono overflow-x-auto max-h-52">
          {FIREBASE_FIRESTORE_RULES}
        </pre>
      </div>

      {/* Programmatic Data Seeding & Maintenance */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Programmatic Batch Seeding & Data Tools</h2>
            <p className="text-xs text-slate-400">
              Generate 25+ comprehensive programmatic SEO landing pages across Indian cities, kW capacities, and roof sizes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">Seed 25+ Comprehensive Landing Pages</h3>
            <p className="text-xs text-slate-400">
              Populates complete high-converting guides for Mumbai, Delhi NCR, Bangalore, Pune, Ahmedabad, Chennai, Hyderabad, Kolkata, Jaipur, Lucknow, plus 1kW-10kW and 1000-4000 sq ft guides.
            </p>
            <button
              type="button"
              id="seed-programmatic-pages-btn"
              onClick={onSeedData}
              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
            >
              Seed Programmatic Dataset
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-rose-300">Reset All Data</h3>
            <p className="text-xs text-slate-400">
              Clears custom pages and restores the default initial programmatic pages and sample leads.
            </p>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all pages and leads to default seed state?')) {
                  onResetData();
                }
              }}
              className="w-full py-2 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-700"
            >
              Reset to Factory Seed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
