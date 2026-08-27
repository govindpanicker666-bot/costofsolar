import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, ChevronDown, Menu, X, Search, ArrowRight } from 'lucide-react';
import { getStaticPages, GLOBAL_CITIES } from '../../data/globalSolarData';
import { PageRecord } from '../../types';

interface HeaderProps {
  pages?: PageRecord[];
  isAdminLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ pages, isAdminLoggedIn = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<'cities' | 'sizes' | 'roofs' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Combine static pages with any dynamic/passed pages to ensure all available pages are present
  const allPages = useMemo(() => {
    const staticList = getStaticPages();
    if (pages && pages.length > 0) {
      const map = new Map<string, PageRecord>();
      staticList.forEach((p) => map.set(p.slug, p));
      pages.forEach((p) => map.set(p.slug, p));
      return Array.from(map.values());
    }
    return staticList;
  }, [pages]);

  // 1. All available City Pages
  const cityList = useMemo(() => {
    const cityMap = new Map<string, { name: string; country?: string; slug: string }>();

    // Seed from GLOBAL_CITIES
    GLOBAL_CITIES.forEach((c) => {
      cityMap.set(c.slug, { name: c.city, country: c.country, slug: c.slug });
    });

    // Add any pages with template_type === 'city'
    allPages
      .filter((p) => p.template_type === 'city')
      .forEach((p) => {
        cityMap.set(p.slug, {
          name: p.city || p.title.replace(/^Solar Installation Cost in\s+/i, '').replace(/\s+\(.*$/i, '').trim(),
          country: p.state,
          slug: p.slug,
        });
      });

    return Array.from(cityMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [allPages]);

  // 2. All available System Size Pages
  const systemSizeList = useMemo(() => {
    const sizeMap = new Map<string, { label: string; kw: number; slug: string }>();

    allPages
      .filter((p) => p.template_type === 'system_size')
      .forEach((p) => {
        const kw = p.system_size_kw || parseInt(p.slug.match(/(\d+)/)?.[1] || '5', 10);
        // Prefer canonical short slug if multiple exist
        if (!sizeMap.has(p.slug)) {
          sizeMap.set(p.slug, {
            label: `${kw} kW Solar System`,
            kw,
            slug: p.slug,
          });
        }
      });

    return Array.from(sizeMap.values()).sort((a, b) => a.kw - b.kw);
  }, [allPages]);

  // 3. All available Roof Area Pages
  const roofAreaList = useMemo(() => {
    const roofMap = new Map<string, { label: string; sqft: number; slug: string }>();

    allPages
      .filter((p) => p.template_type === 'sqft')
      .forEach((p) => {
        const sqft = p.sqft || parseInt(p.slug.match(/(\d+)/)?.[1] || '2000', 10);
        if (!roofMap.has(p.slug)) {
          roofMap.set(p.slug, {
            label: `${sqft.toLocaleString()} Sq Ft House`,
            sqft,
            slug: p.slug,
          });
        }
      });

    return Array.from(roofMap.values()).sort((a, b) => a.sqft - b.sqft);
  }, [allPages]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.toLowerCase().trim();
    const matchedCity = cityList.find((c) => c.name.toLowerCase().includes(q) || (c.country && c.country.toLowerCase().includes(q)));

    if (matchedCity) {
      navigate(`/${matchedCity.slug}`);
      setSearchOpen(false);
      setSearchQuery('');
    } else if (q.includes('kw') || !isNaN(Number(q))) {
      const num = q.replace(/[^0-9]/g, '') || '5';
      navigate(`/${num}kw-solar-system-cost`);
      setSearchOpen(false);
      setSearchQuery('');
    } else if (q.includes('sq') || q.includes('sqft')) {
      const num = q.replace(/[^0-9]/g, '') || '2000';
      navigate(`/solar-installation-cost-for-${num}-sqft-house`);
      setSearchOpen(false);
      setSearchQuery('');
    } else {
      navigate(`/sitemap`);
      setSearchOpen(false);
    }
  };

  const handleQuoteClick = (e: React.MouseEvent) => {
    const targetEl = document.getElementById('quote-cta') || document.getElementById('quote-lead-form');
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on homepage or a page with the element loaded, navigate to home quote section
      navigate('/#quote-cta');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg md:text-xl tracking-tight text-slate-900 flex items-center">
                costofsolarinstallation<span className="text-blue-600">.com</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            {/* 1. Cities Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="hover:text-blue-600 transition-colors flex items-center gap-1.5 py-2 cursor-pointer focus:outline-none"
              >
                <span>Cities</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 hidden group-hover:block transition-all z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">All City Guides</span>
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{cityList.length} Cities</span>
                </div>
                <div className="grid grid-cols-2 gap-1 max-h-80 overflow-y-auto pr-1">
                  {cityList.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/${c.slug}`}
                      className="px-2.5 py-2 text-xs text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors flex flex-col justify-center"
                    >
                      <span className="font-semibold text-slate-800">{c.name}</span>
                      {c.country && <span className="text-[10px] text-slate-400 font-normal">{c.country}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. System Size Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="hover:text-blue-600 transition-colors flex items-center gap-1.5 py-2 cursor-pointer focus:outline-none"
              >
                <span>System Size</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 hidden group-hover:block transition-all z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                <div className="px-2 pb-2 mb-1 border-b border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">System Size Capacities</span>
                </div>
                <div className="space-y-0.5 max-h-80 overflow-y-auto">
                  {systemSizeList.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/${s.slug}`}
                      className="px-3 py-2 text-xs text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors flex items-center justify-between"
                    >
                      <span>{s.label}</span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{s.kw} kW</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Roof Area Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="hover:text-blue-600 transition-colors flex items-center gap-1.5 py-2 cursor-pointer focus:outline-none"
              >
                <span>Roof Area</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 hidden group-hover:block transition-all z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                <div className="px-2 pb-2 mb-1 border-b border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">House & Roof Sizes</span>
                </div>
                <div className="space-y-0.5 max-h-80 overflow-y-auto">
                  {roofAreaList.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/${r.slug}`}
                      className="px-3 py-2 text-xs text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors flex items-center justify-between"
                    >
                      <span>{r.label}</span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{r.sqft} sq ft</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              id="header-search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Search city, system size or roof area"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href="#quote-cta"
              onClick={handleQuoteClick}
              id="header-get-quote-btn"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              id="mobile-search-toggle"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div className="py-3 px-1 border-t border-slate-100 animate-in fade-in duration-150">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search global city (e.g. Los Angeles, London, Sydney), kW size, or roof sq ft..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-24 py-2 bg-slate-100 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-slate-200 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Mobile Cities Dropdown Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileExpanded(mobileExpanded === 'cities' ? null : 'cities')}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <span>Cities ({cityList.length})</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileExpanded === 'cities' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'cities' && (
                <div className="grid grid-cols-2 gap-1 px-3 pt-1 pb-2">
                  {cityList.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/${c.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1.5 px-2 text-xs text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded font-medium"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile System Size Dropdown Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileExpanded(mobileExpanded === 'sizes' ? null : 'sizes')}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <span>System Size</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileExpanded === 'sizes' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'sizes' && (
                <div className="space-y-1 px-3 pt-1 pb-2">
                  {systemSizeList.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/${s.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 px-2 text-xs text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded font-medium"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Roof Area Dropdown Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileExpanded(mobileExpanded === 'roofs' ? null : 'roofs')}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <span>Roof Area</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileExpanded === 'roofs' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'roofs' && (
                <div className="space-y-1 px-3 pt-1 pb-2">
                  {roofAreaList.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/${r.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 px-2 text-xs text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded font-medium"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Get a Free Quote CTA */}
            <div className="pt-2 px-3">
              <a
                href="#quote-cta"
                onClick={handleQuoteClick}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
