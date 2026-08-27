import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowRight, ShieldCheck, Zap, Sun, Sparkles } from 'lucide-react';
import { GLOBAL_CITIES, GlobalCityData } from '../../data/globalSolarData';

export const CityCostComparison: React.FC = () => {
  const [selectedContinent, setSelectedContinent] = useState<string>('All');

  const continents = ['All', 'North America', 'Europe', 'Asia', 'Oceania', 'Middle East', 'South America', 'Africa'];

  const filteredCities = selectedContinent === 'All'
    ? GLOBAL_CITIES
    : GLOBAL_CITIES.filter((c) => c.continent === selectedContinent);

  return (
    <section id="cities" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-blue-600" /> Global Price Index 2026
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Solar Installation Cost by City Worldwide
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Rooftop solar costs vary based on regional labor rates, equipment tariffs, and national clean energy incentives. Compare 2026 installation benchmarks across {GLOBAL_CITIES.length} major global hubs.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-amber-500" />
            Showing {filteredCities.length} verified global city guides
          </div>
        </div>

        {/* Continent Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {continents.map((continentName) => (
            <button
              key={continentName}
              type="button"
              id={`filter-continent-${continentName.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedContinent(continentName)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedContinent === continentName
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
              }`}
            >
              {continentName}
            </button>
          ))}
        </div>

        {/* 14 Global Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCities.map((cityData) => (
            <Link
              key={cityData.slug}
              to={`/${cityData.slug}`}
              className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-blue-500/50 shadow-xs hover:shadow-xl hover:shadow-blue-600/5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {cityData.country} ({cityData.continent})
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cityData.city}
                    </h3>
                  </div>
                  <span className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="space-y-2.5 py-3 border-y border-slate-100 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Est. System Cost:</span>
                    <span className="font-bold text-slate-900">
                      {cityData.localCostRange}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Cost per Watt (USD):</span>
                    <span className="font-semibold text-blue-600">
                      ${cityData.costPerWattUSD.toFixed(2)} / W
                    </span>
                  </div>
                  <div className="flex justify-between items-start text-emerald-800 font-medium bg-emerald-50/90 border border-emerald-200/60 p-2 rounded-lg gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-[11px] line-clamp-1">{cityData.subsidyName}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1 text-slate-800 font-bold">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  {cityData.paybackYears} Yrs Payback
                </span>
                <span className="text-blue-600 font-semibold group-hover:underline flex items-center gap-0.5">
                  Full Guide →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
