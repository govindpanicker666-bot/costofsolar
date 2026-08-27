import React from 'react';
import { ShieldCheck, Zap, Award, ArrowDown, Globe } from 'lucide-react';
import { SolarCostCalculator } from '../calculator/SolarCostCalculator';
import { InlineEditable } from '../common/InlineEditable';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 bg-gradient-to-b from-blue-50/60 via-white to-slate-50">
      {/* Decorative ambient background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/10 via-amber-300/10 to-indigo-400/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges & SEO Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs md:text-sm font-semibold shadow-xs">
            <Globe className="w-4 h-4 text-blue-600 animate-pulse" />
            <InlineEditable id="home-badge-text" defaultText="Updated 2026 World Solar Price Index & Global Subsidies" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.12]">
            <InlineEditable
              id="home-hero-h1"
              defaultText="Solar Installation Cost 2026: Complete World Guide"
              as="span"
            />
          </h1>

          <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            <InlineEditable
              id="home-hero-desc"
              multiline
              defaultText="Find accurate solar installation costs worldwide. Compare prices by city, system size & roof area. Updated 2026 data with savings calculator."
              as="span"
            />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <InlineEditable id="home-badge-1" defaultText="Tier-1 BloombergNEF Certified" />
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <InlineEditable id="home-badge-2" defaultText="Verified Tax Credits & Subsidies" />
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" />
              <InlineEditable id="home-badge-3" defaultText="25-Year Linear Power Warranty" />
            </span>
          </div>
        </div>

        {/* Dynamic Cost Calculator Widget Hero Embed */}
        <div id="calculator" className="max-w-4xl mx-auto scroll-mt-24">
          <SolarCostCalculator initialBill={180} initialRoofArea={1500} city="Global Average" />
        </div>

        <div className="text-center mt-8">
          <a
            href="#cities"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors"
          >
            <span>Explore 14 Major Global Cities & Cost Breakdown</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
