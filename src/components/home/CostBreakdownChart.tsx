import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Layers, Info, CheckCircle2, Globe } from 'lucide-react';

interface ComponentCost {
  name: string;
  share: number;
  cost3kw: number;
  cost5kw: number;
  cost10kw: number;
  color: string;
  description: string;
}

export const CostBreakdownChart: React.FC = () => {
  const [selectedKw, setSelectedKw] = useState<'3kw' | '5kw' | '10kw'>('5kw');

  const componentsData: ComponentCost[] = [
    {
      name: 'Photovoltaic Panels',
      share: 40,
      cost3kw: 1800,
      cost5kw: 3000,
      cost10kw: 5600,
      color: '#1a6eff',
      description: 'Tier-1 Monocrystalline PERC / N-Type 430W-550W modules with 25-yr linear power warranty.',
    },
    {
      name: 'Inverter & Power Electronics',
      share: 22,
      cost3kw: 990,
      cost5kw: 1650,
      cost10kw: 3080,
      color: '#0ea5e9',
      description: 'High-efficiency string or microinverters (SolarEdge, Enphase, SMA, Fronius) with smart monitoring.',
    },
    {
      name: 'Mounting & Racking',
      share: 11,
      cost3kw: 495,
      cost5kw: 825,
      cost10kw: 1540,
      color: '#f59e0b',
      description: 'Corrosion-resistant anodized aluminum & stainless steel structural framing engineered for local wind & snow loads.',
    },
    {
      name: 'Electrical BOS & Protections',
      share: 13,
      cost3kw: 585,
      cost5kw: 975,
      cost10kw: 1820,
      color: '#8b5cf6',
      description: 'UV-rated DC solar cabling, AC/DC disconnect isolators, surge protective devices (SPDs), and earthing systems.',
    },
    {
      name: 'Permits, Interconnection & Labor',
      share: 14,
      cost3kw: 630,
      cost5kw: 1050,
      cost10kw: 1960,
      color: '#10b981',
      description: 'Local building & electrical permits, utility interconnection filings, certified master electrician labor.',
    },
  ];

  const totalGrossCost = {
    '3kw': 4500,
    '5kw': 7500,
    '10kw': 14000,
  }[selectedKw];

  const subsidy = Math.round(totalGrossCost * 0.28);
  const netCost = totalGrossCost - subsidy;

  const chartData = componentsData.map((c) => ({
    name: c.name,
    share: c.share,
    cost: selectedKw === '3kw' ? c.cost3kw : selectedKw === '5kw' ? c.cost5kw : c.cost10kw,
    color: c.color,
    description: c.description,
  }));

  return (
    <section id="cost-breakdown" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-blue-600" /> Itemized Bill of Materials
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Where Does Your Money Go? Global Solar Cost Breakdown
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Understand the global cost distribution of a certified rooftop solar installation in 2026. Benchmark components against international engineering standards.
          </p>

          {/* System Size Switcher */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 mt-2">
            <button
              type="button"
              id="kw-switch-3"
              onClick={() => setSelectedKw('3kw')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedKw === '3kw' ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3 kW (Small Home)
            </button>
            <button
              type="button"
              id="kw-switch-5"
              onClick={() => setSelectedKw('5kw')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedKw === '5kw' ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              5 kW (Standard Home)
            </button>
            <button
              type="button"
              id="kw-switch-10"
              onClick={() => setSelectedKw('10kw')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedKw === '10kw' ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              10 kW (Large / Multi-Family)
            </button>
          </div>
        </div>

        {/* Chart & Detail Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Recharts Bar Visualizer */}
          <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Cost Share by Component (%)
              </span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                Gross Benchmark: ${totalGrossCost.toLocaleString()} USD
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <XAxis type="number" unit="%" domain={[0, 50]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12, fill: '#1e293b', fontWeight: 600 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                            <div className="font-bold text-amber-300">{d.name}</div>
                            <div className="text-slate-300">Share: <span className="text-white font-semibold">{d.share}%</span></div>
                            <div className="text-slate-300">Estimated Cost: <span className="text-emerald-400 font-bold">${d.cost.toLocaleString()}</span></div>
                            <p className="text-[11px] text-slate-400 max-w-xs pt-1 border-t border-slate-700">{d.description}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="share" radius={[0, 8, 8, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Summary Pill Bar */}
            <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Gross Investment</span>
                <span className="font-bold text-slate-800">${totalGrossCost.toLocaleString()}</span>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-emerald-800">
                <span className="text-[11px] text-emerald-700 block">Avg Clean Energy Rebates</span>
                <span className="font-bold">- ${subsidy.toLocaleString()}</span>
              </div>
              <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-200 text-blue-900">
                <span className="text-[11px] text-blue-700 block">Net Estimated Cost</span>
                <span className="font-black text-blue-700">${netCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Component Descriptions List */}
          <div className="lg:col-span-5 space-y-3">
            {componentsData.map((comp) => {
              const currentCost = selectedKw === '3kw' ? comp.cost3kw : selectedKw === '5kw' ? comp.cost5kw : comp.cost10kw;
              return (
                <div
                  key={comp.name}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-all flex items-start gap-3"
                >
                  <div
                    className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: comp.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-bold text-slate-900">{comp.name}</h4>
                      <span className="text-xs font-bold text-slate-700">
                        ${currentCost.toLocaleString()} ({comp.share}%)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
