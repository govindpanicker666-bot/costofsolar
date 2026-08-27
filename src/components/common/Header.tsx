import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Calculator, MapPin, Layers, Shield, Sparkles, Menu, X, Search, ShieldAlert, ArrowUpRight, Globe } from 'lucide-react';
import { GLOBAL_CITIES } from '../../data/globalSolarData';

interface HeaderProps {
  isAdminLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdminLoggedIn = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const topCities = GLOBAL_CITIES.map((c) => ({
    name: c.city,
    country: c.country,
    slug: c.slug,
  }));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.toLowerCase().trim();
    const matchedCity = topCities.find((c) => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q));

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
      navigate(`/#cities`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg md:text-xl tracking-tight text-slate-900 flex items-center">
                costofsolarinstallation<span className="text-blue-600">.com</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100/70 px-1.5 py-0.2 rounded inline-block tracking-wider -mt-0.5">
                2026 World Guide
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link to="/#calculator" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-blue-600" /> Calculator
            </Link>

            <div className="relative group">
              <button type="button" className="hover:text-blue-600 transition-colors flex items-center gap-1.5 py-2 cursor-pointer">
                <Globe className="w-4 h-4 text-amber-500" /> 14 Global Cities
              </button>
              <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 hidden group-hover:block transition-all z-50">
                <div className="text-[11px] font-bold text-slate-400 uppercase px-2 py-1">Worldwide City Guides</div>
                <div className="grid grid-cols-2 gap-1 max-h-80 overflow-y-auto">
                  {topCities.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/${c.slug}`}
                      className="px-2.5 py-1.5 text-xs text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors flex items-center justify-between"
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{c.country}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/5kw-solar-system-cost" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" /> System Sizes
            </Link>

            <Link to="/solar-installation-cost-for-2000-sqft-house" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" /> Roof Area Guide
            </Link>

            <Link to="/#subsidies" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-500" /> Global Subsidies
            </Link>
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
              href="#solar-cost-calculator"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Calculate Savings</span>
              <ArrowUpRight className="w-4 h-4" />
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
                className="absolute right-1.5 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-slate-200 space-y-2">
            <Link
              to="/#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              Solar Cost Calculator
            </Link>
            <div className="px-3 pt-2 text-xs font-bold text-slate-400 uppercase">14 Major Global Cities</div>
            <div className="grid grid-cols-2 gap-1 px-3">
              {topCities.map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-xs text-slate-600 hover:text-blue-600"
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <Link
              to="/5kw-solar-system-cost"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              System Size Cost (1kW to 10kW)
            </Link>
            <Link
              to="/solar-installation-cost-for-2000-sqft-house"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              Roof Area Guide (Sq Ft)
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
