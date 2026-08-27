import React from 'react';
import { Calculator, Users, CheckCircle2, ShieldCheck, ArrowRight, Zap, Banknote, Globe } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Calculate System Size & Subsidies',
      description: 'Enter your monthly electricity bill and roof area in our dynamic calculator. Instantly discover your required capacity (kW), eligible national tax credits or rebates (up to 30%+ reduction), and projected 25-year ROI.',
      icon: Calculator,
      badge: 'Step 1: Solar Sizing',
      highlight: 'Accurate Global Solar Sizing',
    },
    {
      step: '02',
      title: 'Compare Certified EPC Installers',
      description: 'Receive competitive proposals from top-rated, licensed solar EPC contractors in your region. Compare panel technologies (N-Type TOPCon vs Heterojunction HJT), inverter topologies (string vs microinverters), and warranty terms.',
      icon: Users,
      badge: 'Step 2: Compare Quotes',
      highlight: 'Tier-1 Certified Installers',
    },
    {
      step: '03',
      title: 'Permitting & Grid Interconnection',
      description: 'Your chosen installer handles local municipal permitting, structural engineering stamps, electrical safety inspection, and bi-directional net metering synchronization with your utility company.',
      icon: Banknote,
      badge: 'Step 3: Turnkey Commissioning',
      highlight: 'Full Net Metering Synchronization',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Simplified 3-Step Process
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Rooftop Solar Installation Works Worldwide
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From initial roof assessment and subsidy qualification to net metering grid connection and clean electricity generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-slate-50/70 rounded-2xl p-7 border border-slate-200/80 shadow-sm relative flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-blue-600 transition-colors">
                      {item.step}
                    </span>
                    <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-600/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                    {item.badge}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
