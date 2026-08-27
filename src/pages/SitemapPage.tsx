import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageRecord } from '../types';
import { getStaticPages } from '../data/globalSolarData';
import { getPages } from '../lib/firebase';
import { SEOHead } from '../components/seo/SEOHead';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import {
  FileCode,
  MapPin,
  Zap,
  Home,
  ExternalLink,
  Copy,
  Check,
  Globe,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const SitemapPage: React.FC = () => {
  const [pages, setPages] = useState<PageRecord[]>(() => getStaticPages().filter((p) => p.status === 'published'));
  const [activeTab, setActiveTab] = useState<'html' | 'xml' | 'robots'>('html');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getPages().then((all) => {
      if (all && all.length > 0) {
        setPages(all.filter((p) => p.status === 'published'));
      }
    }).catch(() => {});
  }, []);

  const cityPages = pages.filter((p) => p.template_type === 'city');
  const systemPages = pages.filter((p) => p.template_type === 'system_size');
  const sqftPages = pages.filter((p) => p.template_type === 'sqft');

  // Generate XML Sitemap string
  const xmlSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://costofsolarinstallation.com/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${pages
  .map(
    (p) => `  <url>
    <loc>https://costofsolarinstallation.com/${p.slug}</loc>
    <lastmod>${(p.updated_at || p.created_at).slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p.template_type === 'city' ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsTxtContent = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://costofsolarinstallation.com/sitemap.xml`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <SEOHead
        title="HTML & XML Sitemap — Cost of Solar Installation"
        description="Comprehensive index of all city solar cost guides, system capacity specs, and house roof area calculators on costofsolarinstallation.com."
        url="https://costofsolarinstallation.com/sitemap"
      />

      <Header pages={pages} />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Globe className="w-3.5 h-3.5 text-blue-600" /> Complete Index
              </div>
              <h1 className="text-3xl font-black text-slate-950 tracking-tight">
                Solar Cost Guides
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Browse our solar installation cost guides by location and system size.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('html')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'html'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Visual Index
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('xml')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'xml'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                sitemap.xml
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('robots')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'robots'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                robots.txt
              </button>
            </div>
          </div>

          {/* TAB 1: Visual Categorized Index */}
          {activeTab === 'html' && (
            <div className="space-y-8">
              {/* City Guides */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 text-blue-600">
                  <MapPin className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-slate-900">
                    City-wise Solar Installation Guides ({cityPages.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
                  {cityPages.map((cp) => (
                    <Link
                      key={cp.id}
                      to={`/${cp.slug}`}
                      className="p-3 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/40 text-xs font-semibold text-slate-800 transition-all flex items-center justify-between group"
                    >
                      <span>Solar Cost in {cp.city || cp.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* System Size Guides */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 text-amber-600">
                  <Zap className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-slate-900">
                    System Capacity & Kilowatt Guides ({systemPages.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
                  {systemPages.map((sp) => (
                    <Link
                      key={sp.id}
                      to={`/${sp.slug}`}
                      className="p-3 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/40 text-xs font-semibold text-slate-800 transition-all flex items-center justify-between group"
                    >
                      <span>{sp.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Roof Area Guides */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 text-purple-600">
                  <Home className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-slate-900">
                    House Roof Area (Sq Ft) Guides ({sqftPages.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
                  {sqftPages.map((qp) => (
                    <Link
                      key={qp.id}
                      to={`/${qp.slug}`}
                      className="p-3 rounded-xl border border-slate-100 hover:border-purple-300 hover:bg-purple-50/40 text-xs font-semibold text-slate-800 transition-all flex items-center justify-between group"
                    >
                      <span>{qp.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Raw XML Sitemap */}
          {activeTab === 'xml' && (
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Endpoint: /sitemap.xml (Auto-generated from published database rows)
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(xmlSitemapContent)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy XML'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-96">
                {xmlSitemapContent}
              </pre>
            </div>
          )}

          {/* TAB 3: robots.txt */}
          {activeTab === 'robots' && (
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Endpoint: /robots.txt
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(robotsTxtContent)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-blue-400 overflow-x-auto">
                {robotsTxtContent}
              </pre>
            </div>
          )}
        </div>
      </main>

      <Footer pages={pages} />
    </div>
  );
};
