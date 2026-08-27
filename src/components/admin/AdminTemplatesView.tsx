import React from 'react';
import {
  Layers,
  MapPin,
  Zap,
  Home,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import { TemplateType } from '../../types';

interface AdminTemplatesViewProps {
  onCreateWithTemplate: (template: TemplateType) => void;
}

export const AdminTemplatesView: React.FC<AdminTemplatesViewProps> = ({
  onCreateWithTemplate,
}) => {
  const templates = [
    {
      type: 'city' as TemplateType,
      title: 'Template 1: City Price Guide',
      badge: 'Local SEO Engine',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      icon: MapPin,
      iconColor: 'text-blue-400',
      targetKeyword: 'Solar installation cost in [City]',
      sampleUrl: 'costofsolarinstallation.com/solar-installation-cost-in-mumbai',
      description:
        'Designed for geo-targeted ranking in 50+ Indian cities. Features itemized component tables, local DISCOM net metering procedures, PM Surya Ghar central subsidy breakdown, nearby city pricing benchmarks (Recharts), and verified local installer directories.',
      sections: [
        '1. Hero with breadcrumbs & last updated date',
        '2. Quick stats bar (avg cost, cost/W, payback, savings)',
        '3. Itemized bill of materials (min/mid/max tiers)',
        '4. Interactive calculator pre-filled for city',
        '5. System size comparison cards (1kW to 10kW)',
        '6. Nearby cities price comparison bar chart',
        '7. PM Surya Ghar subsidy application guide',
        '8. Verified local EPC installers card grid',
        '9. City-specific FAQ accordion with JSON-LD schema',
        '10. Internal link hub to related city guides',
        '11. City-specific lead capture form',
      ],
      fields: ['City Name', 'State', 'Avg Cost Min/Max (₹/kW)', 'Cost Per Watt', 'Subsidy Amount', 'DISCOM Policy'],
    },
    {
      type: 'system_size' as TemplateType,
      title: 'Template 2: System Size (kW)',
      badge: 'Technical Capacity Guide',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: Zap,
      iconColor: 'text-amber-400',
      targetKeyword: '[X]kW solar system cost in India',
      sampleUrl: 'costofsolarinstallation.com/3kw-solar-system-cost-in-india',
      description:
        'Targeted for homeowners searching by exact capacity requirements (1kW, 2kW, 3kW, 5kW, 10kW). Explains On-Grid vs Hybrid vs Off-Grid differences, panel counts, roof area needed, daily unit generation, and sortable city pricing matrix.',
      sections: [
        '1. Hero with kW capacity badge and highlights',
        '2. Quick stats bar (Total Price, Subsidy, Net Cost, Daily Output)',
        '3. Technical specs card (Panels, Sq Ft, Monthly Units, CO2 Offset)',
        '4. On-Grid vs Off-Grid vs Hybrid comparison matrix',
        '5. Sortable City-wise price table for this kW capacity',
        '6. Payback & ROI calculator tailored for kW size',
        '7. Central government subsidy breakdown',
        '8. Capacity-specific FAQ accordion with JSON-LD schema',
        '9. Internal link hub to related system sizes',
        '10. High-converting lead capture form',
      ],
      fields: ['System Size (kW)', 'Panel Count', 'Roof Area (Sq Ft)', 'Units/Day', 'On-grid vs Off-grid Pricing'],
    },
    {
      type: 'sqft' as TemplateType,
      title: 'Template 3: Roof Area (Sq Ft)',
      badge: 'Home Size ROI Model',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      icon: Home,
      iconColor: 'text-purple-400',
      targetKeyword: 'Solar installation cost for [X] sq ft house',
      sampleUrl: 'costofsolarinstallation.com/solar-installation-cost-for-2000-sqft-house',
      description:
        'Tailored for homeowners searching by plot or terrace square footage (1000 sq ft, 1500 sq ft, 2000 sq ft, 3000 sq ft). Includes usable shadow-free area calculations, recommended kW capacity, 12-month electricity bill reduction chart, and 10-year cumulative ROI timeline.',
      sections: [
        '1. Hero with sq ft property specifications',
        '2. Quick stats bar (Recommended kW, Net Cost, Annual Savings)',
        '3. Recommended capacity & equipment options',
        '4. 12-Month Electricity Bill Comparison chart (Recharts Line)',
        '5. 10-Year Cumulative ROI timeline chart (Recharts Area)',
        '6. Rooftop load & terrace accessibility FAQ schema',
        '7. Internal links to other square footage guides',
        '8. Lead capture quote form',
      ],
      fields: ['Roof Area (Sq Ft)', 'Usable Area %', 'Recommended Capacity (kW)', '12-Month Bill Projections', '10-Year ROI Data'],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Programmatic Page Templates
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Each template is engineered for high Core Web Vitals, dynamic JSON-LD schema generation, and high search intent conversion.
        </p>
      </div>

      <div className="space-y-8">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          return (
            <div
              key={tpl.type}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700">
                    <Icon className={`w-7 h-7 ${tpl.iconColor}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-white">{tpl.title}</h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${tpl.badgeColor}`}>
                        {tpl.badge}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      Pattern: {tpl.targetKeyword}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onCreateWithTemplate(tpl.type)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Page from this Template</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Template Architecture & Strategy
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {tpl.description}
                  </p>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                    <div className="text-slate-500 text-[11px]">Example Live URL Route:</div>
                    <div className="text-blue-400">{tpl.sampleUrl}</div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-3">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>Included Section Hierarchy</span>
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {tpl.sections.map((sec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
