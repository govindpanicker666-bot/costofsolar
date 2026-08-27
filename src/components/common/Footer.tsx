import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Shield, FileText, Lock, Globe, MapPin, Zap, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = 2026;

  const topCities = [
    { name: 'Los Angeles', slug: 'solar-installation-cost-in-los-angeles' },
    { name: 'London', slug: 'solar-installation-cost-in-london' },
    { name: 'Sydney', slug: 'solar-installation-cost-in-sydney' },
    { name: 'Berlin', slug: 'solar-installation-cost-in-berlin' },
    { name: 'Dubai', slug: 'solar-installation-cost-in-dubai' },
    { name: 'Tokyo', slug: 'solar-installation-cost-in-tokyo' },
    { name: 'Toronto', slug: 'solar-installation-cost-in-toronto' },
    { name: 'Singapore', slug: 'solar-installation-cost-in-singapore' },
  ];

  const systemSizes = [
    { name: '3kW Solar System', slug: '3kw-solar-system-cost' },
    { name: '5kW Solar System', slug: '5kw-solar-system-cost' },
    { name: '8kW Solar System', slug: '8kw-solar-system-cost' },
    { name: '10kW Solar System', slug: '10kw-solar-system-cost' },
  ];

  const roofSizes = [
    { name: '1000 sq ft House', slug: 'solar-installation-cost-for-1000-sqft-house' },
    { name: '1500 sq ft House', slug: 'solar-installation-cost-for-1500-sqft-house' },
    { name: '2000 sq ft House', slug: 'solar-installation-cost-for-2000-sqft-house' },
    { name: '3000 sq ft House', slug: 'solar-installation-cost-for-3000-sqft-house' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Sun className="w-6 h-6 text-amber-300" />
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                costofsolarinstallation<span className="text-blue-500">.com</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-sm">
              The comprehensive resource and benchmark calculator for residential and commercial rooftop solar installation costs in {currentYear}. Grounded in tier-1 equipment benchmarks, regional labor rates, and verified national clean energy subsidies.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Global Verified Incentives
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> 2026 World Price Index
              </span>
            </div>
          </div>

          {/* Col 2: Top Global City Pages */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-400" /> Major Global Cities
            </h4>
            <ul className="space-y-2 text-xs">
              {topCities.map((c) => (
                <li key={c.slug}>
                  <Link to={`/${c.slug}`} className="hover:text-white hover:underline transition-colors">
                    Solar Cost in {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Capacity & Roof Guides */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> By System Size
            </h4>
            <ul className="space-y-2 text-xs">
              {systemSizes.map((s) => (
                <li key={s.slug}>
                  <Link to={`/${s.slug}`} className="hover:text-white hover:underline transition-colors">
                    {s.name} Guide
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-bold text-xs uppercase tracking-wider pt-3 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400" /> By Rooftop Area
            </h4>
            <ul className="space-y-2 text-xs">
              {roofSizes.map((r) => (
                <li key={r.slug}>
                  <Link to={`/${r.slug}`} className="hover:text-white hover:underline transition-colors">
                    Cost for {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Platform & SEO Resources */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-purple-400" /> Global Directory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/sitemap.xml" className="hover:text-white hover:underline transition-colors">
                  XML Sitemap (All Pages)
                </Link>
              </li>
              <li>
                <Link to="/robots.txt" className="hover:text-white hover:underline transition-colors">
                  Robots.txt Specification
                </Link>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white hover:underline transition-colors">
                  Solar Savings Calculator
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white hover:underline transition-colors">
                  How Solar Works Worldwide
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white hover:underline transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} costofsolarinstallation.com. All rights reserved. Calculations are estimates based on standard tier-1 manufacturer equipment and vetted EPC vendor averages across 14 major global regions.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Global Net Metering Index</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
