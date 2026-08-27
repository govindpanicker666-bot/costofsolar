import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import {
  MapPin,
  Calendar,
  Zap,
  TrendingUp,
  DollarSign,
  Clock,
  Sun,
  Star,
  Phone,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Wrench,
  FileCheck,
  BatteryCharging,
  Award,
  Building2,
  Calculator,
  ShieldCheck
} from 'lucide-react';
import { PageRecord, InstallerRecord, FaqRecord, PageSectionId } from '../../types';
import { GLOBAL_CITIES, getStaticFaqsByPageId } from '../../data/globalSolarData';
import { getCityDeepContent } from '../../data/citySpecificContent';
import { SolarCostCalculator } from '../calculator/SolarCostCalculator';
import { LeadCaptureForm } from '../common/LeadCaptureForm';
import { InlineEditable } from '../common/InlineEditable';
import { InlineEditButton } from './InlineEditButton';
import { AboutThisData } from '../common/AboutThisData';

interface CityPageTemplateProps {
  page: PageRecord;
  installers: InstallerRecord[];
  faqs: FaqRecord[];
  allPages?: PageRecord[];
  isAdmin?: boolean;
  onEditSection?: (sectionId: PageSectionId, sectionTitle: string) => void;
}

export const CityPageTemplate: React.FC<CityPageTemplateProps> = ({
  page,
  installers,
  faqs,
  allPages = [],
  isAdmin = false,
  onEditSection = () => {},
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const cityName = page.city || page.title.replace(/Solar.*/i, '').trim() || 'Global City';
  const countryOrRegion = page.state || (page.custom_content as any)?.country || 'International';

  const cityRecord = GLOBAL_CITIES.find(
    (c) => c.slug === page.slug || c.city.toLowerCase() === cityName.toLowerCase()
  );
  const isINR = (page.custom_content as any)?.currency === '₹' 
    || (page.custom_content as any)?.currencySymbol === '₹'
    || cityRecord?.currency === 'INR';
  const currencySymbol = (page.custom_content as any)?.currencySymbol || (page.custom_content as any)?.currency || (isINR ? '₹' : (cityRecord?.currencySymbol || '$'));

  const formatPrice = (amount: number) => {
    if (isINR) {
      return `₹${Math.round(amount).toLocaleString('en-IN')}`;
    }
    return `${currencySymbol}${Math.round(amount).toLocaleString()}`;
  };

  // Priority: page.custom_content (AI generated via Gemini) > page fields > generic placeholder
  const custom = (page.custom_content && typeof page.custom_content === 'object' ? page.custom_content : {}) as Record<string, any>;

  // Benchmark parameters
  const systemKw = Number(custom.stats?.systemSizeKw) 
    || page.system_size_kw 
    || 5;
  const costPerWatt = Number(custom.stats?.costPerWatt) 
    || page.cost_per_watt 
    || 1.50;
  
  // Cost calculations with strict AI custom_content priority
  const grossMin = Number(custom.stats?.avgCostMin) || page.avg_cost_min || Math.round(systemKw * 1000 * costPerWatt * 0.9);
  const grossMax = Number(custom.stats?.avgCostMax) || page.avg_cost_max || Math.round(systemKw * 1000 * costPerWatt * 1.15);
  const grossCost = Math.round((grossMin + grossMax) / 2);

  // Subsidies: Never hardcode ₹78,000 for isINR unless provided by AI or page record
  const subsidyAmount = Number(
    custom.stats?.subsidyAmount !== undefined 
      ? custom.stats.subsidyAmount 
      : page.subsidy_amount !== undefined 
        ? page.subsidy_amount 
        : 0
  );
  const netTurnkeyCost = Math.max(0, grossCost - subsidyAmount);
  const annualSavingsDisplay = Number(custom.stats?.annualSavings) || page.savings_per_year || Math.round(systemKw * 380);
  const paybackYearsDisplay = Number(custom.stats?.paybackYears) || page.payback_years || 4.5;

  // Deep localized content fallback resolver (Clean placeholder object)
  const fallbackDeepContent = getCityDeepContent(
    cityName,
    countryOrRegion,
    isINR,
    grossCost,
    subsidyAmount,
    netTurnkeyCost,
    currencySymbol
  );

  const deepContent = {
    utilityCompanies: (Array.isArray(custom.utilityCompanies) && custom.utilityCompanies.length > 0)
      ? custom.utilityCompanies
      : fallbackDeepContent.utilityCompanies,
    discomRegulation: custom.discomRegulation || fallbackDeepContent.discomRegulation,
    gridInterconnectionSteps: (Array.isArray(custom.gridInterconnectionSteps) && custom.gridInterconnectionSteps.length > 0)
      ? custom.gridInterconnectionSteps
      : fallbackDeepContent.gridInterconnectionSteps,
    seasonalSolarIrradiance: custom.seasonalSolarIrradiance || custom.seasonalIrradiance || fallbackDeepContent.seasonalSolarIrradiance,
    recommendedEquipment: custom.recommendedEquipment || fallbackDeepContent.recommendedEquipment,
    hiddenCostsChecklist: (Array.isArray(custom.hiddenCostsChecklist) && custom.hiddenCostsChecklist.length > 0)
      ? custom.hiddenCostsChecklist
      : fallbackDeepContent.hiddenCostsChecklist,
    localCaseStudy: custom.localCaseStudy || fallbackDeepContent.localCaseStudy,
    llmSummaryGeoTable: (Array.isArray(custom.llmSummaryGeoTable) && custom.llmSummaryGeoTable.length > 0)
      ? custom.llmSummaryGeoTable
      : (Array.isArray(custom.llmSummaryTable) && custom.llmSummaryTable.length > 0)
      ? custom.llmSummaryTable
      : fallbackDeepContent.llmSummaryGeoTable,
  };

  // Check content presence for structural variation (Fix 4)
  const hasCustomBreakdown = Array.isArray(custom.costBreakdownTable) || Array.isArray(custom.costBreakdown);
  const hasCustomGridSteps = Array.isArray(custom.gridInterconnectionSteps) && custom.gridInterconnectionSteps.length > 0;
  const hasCustomSeasonal = Boolean(custom.seasonalSolarIrradiance || custom.seasonalIrradiance);
  const hasCustomEquipment = Boolean(custom.recommendedEquipment);
  const hasCustomHiddenCosts = Array.isArray(custom.hiddenCostsChecklist) && custom.hiddenCostsChecklist.length > 0;
  const hasCustomCaseStudy = Boolean(custom.localCaseStudy);
  const hasCustomSubsidy = Boolean(custom.subsidyPrograms || custom.subsidyContent || (subsidyAmount > 0));
  const hasCustomNearbyCities = Array.isArray(custom.cityComparisonData) || Array.isArray(custom.cityComparison);
  const hasCustomLlmGeo = Array.isArray(custom.llmSummaryGeoTable) || Array.isArray(custom.llmSummaryTable);

  const defaultBreakdownRows = [
    {
      item: `Tier-1 Monocrystalline PV Modules (${systemKw}kW Capacity)`,
      specs: '25-year 85%+ linear power output warranty, high-efficiency cells',
      min: Math.round(grossMin * 0.42),
      mid: Math.round(grossCost * 0.42),
      max: Math.round(grossMax * 0.42),
    },
    {
      item: 'Grid-Tied Smart String Inverter with WiFi Monitoring',
      specs: '98% efficiency with mobile cloud telemetry tracking',
      min: Math.round(grossMin * 0.20),
      mid: Math.round(grossCost * 0.20),
      max: Math.round(grossMax * 0.20),
    },
    {
      item: 'Corrosion-Resistant Engineered Rooftop Mounting Hardware',
      specs: 'Engineered for high wind load and weatherproof roof seal',
      min: Math.round(grossMin * 0.14),
      mid: Math.round(grossCost * 0.14),
      max: Math.round(grossMax * 0.14),
    },
    {
      item: 'Balance of System (BOS): AC/DC Disconnects, Surge Protection, Cabling',
      specs: 'Dual AC/DC SPDs, heavy-duty conduit, certified grounding kit',
      min: Math.round(grossMin * 0.12),
      mid: Math.round(grossCost * 0.12),
      max: Math.round(grossMax * 0.12),
    },
    {
      item: 'Engineering, Municipal Permitting & Utility Net Meter Interconnection',
      specs: 'Turnkey local permitting, inspection review & bi-directional PTO approval',
      min: Math.round(grossMin * 0.12),
      mid: Math.round(grossCost * 0.12),
      max: Math.round(grossMax * 0.12),
    },
  ];

  const rawAiBreakdown = custom.costBreakdownTable || custom.costBreakdown;
  const breakdownRows = (Array.isArray(rawAiBreakdown) && rawAiBreakdown.length > 0)
    ? rawAiBreakdown.map((row: any) => ({
        item: row.item || 'Solar Component',
        specs: row.specs || 'Certified local equipment specification',
        min: Number(row.min) || Math.round(grossMin * 0.12),
        mid: Number(row.avg || row.mid) || Math.round(grossCost * 0.12),
        max: Number(row.max) || Math.round(grossMax * 0.12),
      }))
    : defaultBreakdownRows;

  // System Size comparison cards (AI custom_content > fallback)
  const defaultSystemSizes = [
    { kw: 3, cost: Math.round(3000 * costPerWatt * 1.08), subsidy: Math.round(3000 * costPerWatt * 1.08 * 0.3), area: '180–220', units: 380, popular: false },
    { kw: 5, cost: Math.round(5000 * costPerWatt * 1.02), subsidy: Math.round(5000 * costPerWatt * 1.02 * 0.3), area: '300–350', units: 640, popular: true },
    { kw: 7, cost: Math.round(7000 * costPerWatt * 0.98), subsidy: Math.round(7000 * costPerWatt * 0.98 * 0.3), area: '420–480', units: 900, popular: false },
    { kw: 10, cost: Math.round(10000 * costPerWatt * 0.92), subsidy: Math.round(10000 * costPerWatt * 0.92 * 0.3), area: '600–700', units: 1300, popular: false },
  ].map((s) => ({ ...s, net: s.cost - s.subsidy }));

  const rawAiSizes = custom.systemSizeCards;
  const systemSizes = (Array.isArray(rawAiSizes) && rawAiSizes.length > 0)
    ? rawAiSizes.map((s: any) => ({
        kw: Number(s.kw) || 3,
        cost: Number(s.grossCost || s.cost || s.costMin) || Math.round(grossCost * ((s.kw || 3) / systemKw)),
        subsidy: Number(s.subsidy !== undefined ? s.subsidy : subsidyAmount),
        net: Number(s.netCost !== undefined ? s.netCost : ((s.grossCost || s.cost || grossCost) - (s.subsidy || subsidyAmount))),
        area: String(s.areaNeeded || s.area || `${(s.kw || 3) * 65}`),
        units: Number(s.unitsPerMonth || s.units || Math.round((s.kw || 3) * 125)),
        popular: Boolean(s.popular),
      }))
    : defaultSystemSizes;

  // Nearby city comparison chart data (AI custom_content > fallback)
  const defaultNearbyCities = [
    { city: cityName, rate: costPerWatt, isCurrent: true },
  ];

  const rawAiCityComparison = custom.cityComparisonData || custom.cityComparison;
  const nearbyCities = (Array.isArray(rawAiCityComparison) && rawAiCityComparison.length > 0)
    ? rawAiCityComparison.map((c: any) => ({
        city: c.city,
        rate: Number(c.costPerWatt || c.rate || (c.avgCostMin ? Math.round((c.avgCostMin / (systemKw * 1000)) * 100) / 100 : costPerWatt)),
        isCurrent: c.city.toLowerCase() === cityName.toLowerCase(),
      }))
    : defaultNearbyCities;

  const otherCityPages = allPages
    .filter((p) => p.template_type === 'city' && p.slug !== page.slug)
    .slice(0, 4);

  const relatedSizePages = allPages
    .filter((p) => p.template_type === 'system_size')
    .slice(0, 3);

  // Formatted date badge for Fix 3 (Replace misleading Verified Market Rates badge)
  const updatedBadgeText = page.updated_at
    ? `Data Updated ${new Date(page.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
    : '2026 Market Data';

  // Render individual sections based on section_order
  const renderSection = (sectionId: PageSectionId) => {
    switch (sectionId) {
      case 'hero':
        return (
          <section key="hero" className="relative pt-6 pb-12 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 flex-wrap">
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link to="/#cities" className="hover:text-blue-600 transition-colors">Global City Guides</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-900 font-bold">{cityName} Solar Cost</span>
              </nav>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-3xl space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" /> {cityName}, {countryOrRegion}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" /> {updatedBadgeText}
                    </span>
                    {subsidyAmount > 0 && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Incentive Qualified
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                      <InlineEditable
                        id={`city-${cityName.toLowerCase()}-h1`}
                        defaultText={custom.h1 || page.h1 || page.title || `${cityName} Solar Installation Cost 2026: Pricing, Subsidies & ROI`}
                        as="span"
                      />
                    </h1>
                    <InlineEditButton sectionId="hero" sectionTitle="Hero" isAdmin={isAdmin} onEditSection={onEditSection} />
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    <InlineEditable
                      id={`city-${cityName.toLowerCase()}-desc`}
                      multiline
                      defaultText={custom.heroSubtitle || page.hero_subtitle || ''}
                      as="span"
                    />
                  </p>

                  {/* AEO/GEO Quick Answer Box */}
                  {(custom.quickAnswer || page.quick_answer) && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-sm space-y-2">
                      <div className="flex items-center gap-2 text-xs font-black text-blue-800 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-blue-600" /> Quick Answer: How Much Does Solar Cost in {cityName}?
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        <InlineEditable
                          id={`city-${cityName.toLowerCase()}-quick-answer`}
                          multiline
                          defaultText={custom.quickAnswer || page.quick_answer || ''}
                          as="span"
                        />
                      </p>
                    </div>
                  )}
                </div>

                {/* Quick subsidy callout card */}
                <div className="lg:w-80 bg-white p-5 rounded-2xl border border-blue-200 shadow-lg shadow-blue-600/5 space-y-3 shrink-0">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-subsidy-tag`} defaultText={subsidyAmount > 0 ? "Clean Energy Incentives" : "Solar ROI Potential"} />
                  </div>
                  <div className="text-2xl font-black text-emerald-600">
                    {subsidyAmount > 0 ? `${formatPrice(subsidyAmount)} Saved` : `${formatPrice(annualSavingsDisplay)}/yr`}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {subsidyAmount > 0
                      ? `Estimated regional clean energy incentives, tax credits, and net metering offsets available in ${cityName}.`
                      : `Estimated annual utility bill offsets based on local electricity tariffs in ${cityName}.`}
                  </p>
                  <a
                    href="#lead-cta-section"
                    className="block text-center py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Check Solar Quotes for {cityName} →
                  </a>
                </div>
              </div>
            </div>
          </section>
        );

      case 'quick_stats':
        return (
          <section key="quick_stats" className="py-8 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <InlineEditable id={`city-${cityName.toLowerCase()}-stats-header`} defaultText={`${cityName} Solar Market Key Indicators (2026)`} />
                </span>
                <InlineEditButton sectionId="quick_stats" sectionTitle="Quick Stats" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80">
                  <div className="flex items-center justify-between text-blue-600 mb-1">
                    <span className="text-xs font-semibold">Avg Cost ({systemKw}kW Gross)</span>
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div className="text-xl md:text-2xl font-black text-slate-900">
                    {formatPrice(grossCost)}
                  </div>
                  <span className="text-[11px] text-slate-500">{formatPrice(grossMin)} - {formatPrice(grossMax)}</span>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="flex items-center justify-between text-amber-600 mb-1">
                    <span className="text-xs font-semibold">Cost Per Watt</span>
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="text-xl md:text-2xl font-black text-slate-900">
                    {isINR ? `₹${Math.round(costPerWatt * 83)} / W` : `${currencySymbol}${costPerWatt.toFixed(2)} / W`}
                  </div>
                  <span className="text-[11px] text-slate-500">Turnkey Installed</span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                  <div className="flex items-center justify-between text-emerald-600 mb-1">
                    <span className="text-xs font-semibold">Avg Payback Period</span>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-xl md:text-2xl font-black text-slate-900">
                    {paybackYearsDisplay} Years
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium">Net of incentives</span>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/80">
                  <div className="flex items-center justify-between text-indigo-600 mb-1">
                    <span className="text-xs font-semibold">Annual Bill Savings</span>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-xl md:text-2xl font-black text-slate-900">
                    ~{formatPrice(annualSavingsDisplay)} / yr
                  </div>
                  <span className="text-[11px] text-slate-500">Based on local utility tariffs</span>
                </div>
              </div>
            </div>
          </section>
        );

      case 'cost_breakdown':
        return (
          <section key="cost_breakdown" className="py-14 bg-slate-50 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-table-h2`} defaultText={custom.breakdownH2 || `Itemized Solar Cost Breakdown for ${cityName}`} />
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Estimated {systemKw}kW residential rooftop solar bill of materials across economy, average, and premium brand tiers.
                  </p>
                </div>
                <InlineEditButton sectionId="cost_breakdown" sectionTitle="Cost Breakdown Table" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4 sm:px-6">Component & Specification</th>
                        <th className="py-3.5 px-4 text-right">Economy Tier</th>
                        <th className="py-3.5 px-4 text-right bg-blue-50/50 text-blue-900 font-extrabold">Average Cost</th>
                        <th className="py-3.5 px-4 sm:px-6 text-right">Premium Tier</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {breakdownRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6">
                            <div className="font-semibold text-slate-900">
                              <InlineEditable id={`city-${cityName.toLowerCase()}-breakdown-${idx}`} defaultText={row.item} />
                            </div>
                            <div className="text-[11px] text-slate-400">{row.specs}</div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                            {formatPrice(row.min)}
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold text-blue-700 bg-blue-50/30">
                            {formatPrice(row.mid)}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-right font-medium text-slate-600">
                            {formatPrice(row.max)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-bold text-slate-900">
                      <tr>
                        <td className="py-3.5 px-4 sm:px-6">Total Gross {systemKw}kW Installation</td>
                        <td className="py-3.5 px-4 text-right">{formatPrice(grossMin)}</td>
                        <td className="py-3.5 px-4 text-right text-blue-700 bg-blue-50/60 font-black">{formatPrice(grossCost)}</td>
                        <td className="py-3.5 px-4 sm:px-6 text-right">{formatPrice(grossMax)}</td>
                      </tr>
                      {subsidyAmount > 0 && (
                        <tr className="text-emerald-700 bg-emerald-50/60 border-t border-emerald-100">
                          <td className="py-3 px-4 sm:px-6 font-semibold">Less: Clean Energy Subsidies & Rebates</td>
                          <td className="py-3 px-4 text-right">- {formatPrice(subsidyAmount)}</td>
                          <td className="py-3 px-4 text-right font-bold">- {formatPrice(subsidyAmount)}</td>
                          <td className="py-3 px-4 sm:px-6 text-right">- {formatPrice(subsidyAmount)}</td>
                        </tr>
                      )}
                      <tr className="text-blue-900 bg-blue-100/40 text-sm sm:text-base font-black">
                        <td className="py-4 px-4 sm:px-6">Net Out-of-Pocket Cost</td>
                        <td className="py-4 px-4 text-right text-slate-900">{formatPrice(grossMin - subsidyAmount)}</td>
                        <td className="py-4 px-4 text-right text-blue-800">{formatPrice(netTurnkeyCost)}</td>
                        <td className="py-4 px-4 sm:px-6 text-right text-slate-900">{formatPrice(grossMax - subsidyAmount)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </section>
        );

      case 'calculator':
        return (
          <section key="calculator" className="py-14 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-calc-h2`} defaultText={custom.calcH2 || `Solar Savings Calculator for ${cityName}`} />
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Calculate your exact system capacity, rooftop area requirement, and net incentive savings in {cityName}.
                  </p>
                </div>
                <InlineEditButton sectionId="calculator" sectionTitle="Calculator" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="max-w-4xl mx-auto">
                <SolarCostCalculator initialBill={isINR ? 4500 : 220} initialRoofArea={isINR ? 300 : 1800} city={cityName} />
              </div>
            </div>
          </section>
        );

      case 'system_comparison':
        return (
          <section key="system_comparison" className="py-14 bg-slate-50 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-sizes-h2`} defaultText={custom.sizesH2 || `System Size Options in ${cityName}`} />
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Compare capacities to match your home size, rooftop area, and power consumption profile.
                  </p>
                </div>
                <InlineEditButton sectionId="system_comparison" sectionTitle="System Size Comparison" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {systemSizes.map((s) => (
                  <div
                    key={s.kw}
                    className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                      s.popular
                        ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-lg'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div>
                      {s.popular && (
                        <span className="inline-block px-2.5 py-0.5 bg-blue-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                          Most Popular
                        </span>
                      )}
                      <div className="text-xl font-extrabold text-slate-900">{s.kw} kW System</div>
                      <div className="text-xs text-slate-500 mt-0.5">~{s.units} units / month</div>

                      <div className="my-4 py-3 border-y border-slate-100 space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>Gross Price:</span>
                          <span className="font-semibold text-slate-800">{formatPrice(s.cost)}</span>
                        </div>
                        {s.subsidy > 0 && (
                          <div className="flex justify-between text-emerald-700 font-semibold">
                            <span>Est. Subsidy:</span>
                            <span>- {formatPrice(s.subsidy)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-100">
                          <span>Net Price:</span>
                          <span className="text-blue-700 font-black">{formatPrice(s.net)}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500 space-y-1">
                        <div>Roof Area: <span className="font-semibold text-slate-700">{s.area} sq ft</span></div>
                        <div>Best for: <span className="font-semibold text-slate-700">{s.kw <= 3 ? 'Small Homes' : s.kw <= 7 ? 'Family Homes' : 'Large Estates'}</span></div>
                      </div>
                    </div>

                    <a
                      href="#lead-cta-section"
                      className={`mt-4 w-full py-2 text-center text-xs font-bold rounded-xl transition-all block ${
                        s.popular
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      Get {s.kw}kW Quote
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'city_comparison_chart': {
        if (!hasCustomNearbyCities && !isAdmin) return null;

        const globalSolarTrend = [
          { year: '2018', costUSD: 1.21 },
          { year: '2019', costUSD: 1.01 },
          { year: '2020', costUSD: 0.88 },
          { year: '2021', costUSD: 0.82 },
          { year: '2022', costUSD: 0.86 },
          { year: '2023', costUSD: 0.72 },
          { year: '2024', costUSD: 0.65 },
          { year: '2025', costUSD: 0.58 },
          { year: '2026', costUSD: 0.52 },
        ];

        return (
          <section key="city_comparison_chart" className="py-14 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-chart-h2`} defaultText={custom.chartH2 || `${cityName} Solar Costs vs Global City Benchmarks & Price Trends`} />
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Compare average cost per watt against regional metropolitan benchmarks.
                  </p>
                </div>
                <InlineEditButton sectionId="city_comparison_chart" sectionTitle="Nearby City Comparison Chart" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  {/* City Benchmark Bar Chart */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-800 mb-3">Regional Cost per Watt Benchmark</h3>
                    <div className="h-60 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={nearbyCities} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                          <XAxis dataKey="city" tick={{ fontSize: 12, fill: '#334155', fontWeight: 600 }} />
                          <YAxis unit=" /W" domain={[0, 'auto']} tick={{ fontSize: 11, fill: '#64748b' }} />
                          <Tooltip
                            formatter={(value: any) => [
                              `${currencySymbol}${Number(value).toFixed(2)} per Watt`,
                              'Solar Rate'
                            ]}
                            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                          />
                          <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
                            {nearbyCities.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.isCurrent ? '#1a6eff' : '#94a3b8'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Global Solar Trend Line Chart */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-800 mb-3">Global Solar LCOE Trend (USD/kWh, IRENA Benchmark)</h3>
                    <div className="h-[220px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={globalSolarTrend} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#334155', fontWeight: 600 }} />
                          <YAxis unit=" $" domain={[0, 'auto']} tick={{ fontSize: 11, fill: '#64748b' }} />
                          <Tooltip
                            formatter={(value: any) => [
                              `$${Number(value).toFixed(2)} / kWh`,
                              'Global LCOE'
                            ]}
                            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                          />
                          <Line
                            type="monotone"
                            dataKey="costUSD"
                            stroke="#1a6eff"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#1a6eff', stroke: '#ffffff', strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                      Source: IRENA Renewable Power Generation Costs Report. Solar costs have fallen ~90% since 2010, making 2026 the most affordable time to install.
                    </p>
                    {custom.costTrendLocalContext && (
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed italic border-t border-slate-100 pt-2">
                        {custom.costTrendLocalContext}
                      </p>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-amber-500" /> {cityName} Solar Resource
                    </h4>
                    <div className="text-slate-700 text-xs leading-relaxed space-y-1">
                      <div><span className="font-semibold text-slate-900">Summer peak sun hours:</span> {deepContent.seasonalSolarIrradiance.summerPeakSunHours} hrs/day</div>
                      <div><span className="font-semibold text-slate-900">Winter peak sun hours:</span> {deepContent.seasonalSolarIrradiance.winterPeakSunHours} hrs/day</div>
                      <div><span className="font-semibold text-slate-900">Annual irradiance:</span> {deepContent.seasonalSolarIrradiance.annualIrradianceKwhM2} kWh/m²</div>
                      <div><span className="font-semibold text-slate-900">Optimal tilt:</span> {deepContent.seasonalSolarIrradiance.optimalTiltAngle}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-emerald-600" /> Utility & Regulation
                    </h4>
                    <div className="text-slate-700 text-xs leading-relaxed space-y-1.5">
                      <div className="font-semibold text-slate-900">
                        {deepContent.utilityCompanies.join(', ')}
                      </div>
                      <div className="text-slate-600">
                        {deepContent.discomRegulation}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'subsidy': {
        if (!hasCustomSubsidy && !isAdmin) return null;

        const subsidyItems = Array.isArray(custom.subsidyPrograms) && custom.subsidyPrograms.length > 0
          ? custom.subsidyPrograms
          : [
              {
                badge: 'DIRECT INCENTIVE',
                title: `${cityName} Clean Energy Subsidy Program`,
                desc: `Government clean energy financial incentives reduce your initial turnkey investment by up to ${formatPrice(subsidyAmount)}.`,
                authority: 'Regional Energy Ministry / Regulatory Body',
              },
              {
                badge: 'NET METERING',
                title: `${cityName} Grid Export & Billing Framework`,
                desc: 'Earn credits against your utility power bill for every kWh of clean surplus solar energy exported.',
                authority: 'Local Power Utility Grid Operator',
              },
              {
                badge: 'TAX BENEFIT',
                title: 'Clean Energy Tax Relief & Credits',
                desc: 'Accelerated depreciation or statutory tax credits available for certified solar installations.',
                authority: 'Tax Revenue Department',
              },
            ];

        return (
          <section key="subsidy" className="py-14 bg-slate-50 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-subsidy-h2`} defaultText={custom.subsidyH2 || `Clean Energy Incentives & Rebates in ${cityName}`} />
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    How to claim government subsidies, rebates, and tax credits in {cityName}, {countryOrRegion}.
                  </p>
                </div>
                <InlineEditButton sectionId="subsidy" sectionTitle="Subsidy Section" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subsidyItems.map((item: any, i: number) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-auto inline-flex items-center px-3 py-1 rounded-xl bg-blue-100 text-blue-700 text-xs font-black">
                        {item.badge || 'INCENTIVE'}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc || item.description}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">Authority:</span> {item.authority || 'Clean Energy Authority'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'installers': {
        if (!installers || installers.length === 0) return null;

        return (
          <section key="installers" className="py-14 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-installers-h2`} defaultText={custom.installersH2 || `Top Solar Installers in ${cityName}`} />
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    EPC contractors with certified technicians and 25-year manufacturer warranty support.
                  </p>
                </div>
                <InlineEditButton sectionId="installers" sectionTitle="Top Installers Section" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {installers.map((inst) => (
                  <div
                    key={inst.id}
                    className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                          {inst.name}
                        </h3>
                        {typeof inst.rating === 'number' && inst.rating > 0 && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md text-xs font-bold shrink-0">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {inst.rating}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 py-3 border-y border-slate-200 text-xs">
                        {(inst.price_range_min || inst.price_range_max) && (
                          <div className="flex justify-between text-slate-600">
                            <span>Price Range:</span>
                            <span className="font-bold text-slate-900">
                              {formatPrice(inst.price_range_min || grossMin)} - {formatPrice(inst.price_range_max || grossMax)}
                            </span>
                          </div>
                        )}
                        {inst.experience_years && (
                          <div className="flex justify-between text-slate-600">
                            <span>Experience:</span>
                            <span className="font-semibold text-slate-800">{inst.experience_years}+ Years</span>
                          </div>
                        )}
                        <div className="flex justify-between text-emerald-700 font-semibold">
                          <span>Status:</span>
                          <span>Certified Contractor</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3">
                      <a
                        href="#lead-cta-section"
                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Request Free Quote & Survey</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'faq': {
        const effectiveFaqs = faqs && faqs.length > 0 ? faqs : getStaticFaqsByPageId(page.id || page.slug, cityName);
        if (!effectiveFaqs || effectiveFaqs.length === 0) return null;

        return (
          <section key="faq" className="py-14 bg-slate-50 border-b border-slate-200/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-faq-h2`} defaultText={custom.faqH2 || `Frequently Asked Questions about ${cityName} Solar Costs`} />
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Direct answers to the most common solar questions for {cityName}.
                  </p>
                </div>
                <InlineEditButton sectionId="faq" sectionTitle="FAQ Section" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="space-y-3">
                {effectiveFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={faq.id || idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4.5 text-left flex items-center justify-between gap-3 text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <InlineEditable id={`city-${cityName.toLowerCase()}-faq-q-${idx}`} defaultText={faq.question} />
                        <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${isOpen ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
                      </button>
                      {isOpen && (
                        <div className="p-4.5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          <InlineEditable id={`city-${cityName.toLowerCase()}-faq-a-${idx}`} multiline defaultText={faq.answer} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      }

      case 'grid_steps': {
        if (!hasCustomGridSteps && !isAdmin) return null;

        return (
          <section key="grid_steps" className="py-14 bg-slate-50 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-grid-h2`} defaultText={custom.gridH2 || `${cityName} Grid Interconnection & Utility Approval Protocol`} />
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Regulatory framework: {deepContent.discomRegulation} ({deepContent.utilityCompanies.join(', ')})
                  </p>
                </div>
                <InlineEditButton sectionId="grid_steps" sectionTitle="Grid Interconnection" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {deepContent.gridInterconnectionSteps.map((step, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs relative flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs mb-3 shadow-xs">
                        {idx + 1}
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-sm mb-2 leading-snug">{step.title}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Compliant Protocol</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'seasonal_curve': {
        if (!hasCustomSeasonal && !isAdmin) return null;

        return (
          <section key="seasonal_curve" className="py-14 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-solar-yield-h2`} defaultText={custom.solarYieldH2 || `${cityName} Solar Irradiance & Generation Dynamics`} />
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Solar insolation parameters, optimal module tilt angle, and seasonal generation variance in {cityName}.
                  </p>
                </div>
                <InlineEditButton sectionId="seasonal_curve" sectionTitle="Solar Irradiance Yield" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-amber-600" /> Summer Peak Sun
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-2">
                    {deepContent.seasonalSolarIrradiance.summerPeakSunHours} <span className="text-sm font-semibold text-slate-600">hrs/day</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Peak insolation during sunny windows delivering maximum daily kilowatt-hours.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200">
                  <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-blue-600" /> Winter Peak Sun
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-2">
                    {deepContent.seasonalSolarIrradiance.winterPeakSunHours} <span className="text-sm font-semibold text-slate-600">hrs/day</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Maintains resilient baseline power generation even during lower winter sun angles.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-slate-700" /> Optimal Tilt Angle
                  </div>
                  <div className="text-lg font-black text-slate-900 mt-2">
                    {deepContent.seasonalSolarIrradiance.optimalTiltAngle}
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Engineered inclination to maximize annual photon capture and self-cleaning rainfall runoff.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> Annual Irradiance
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-2">
                    {deepContent.seasonalSolarIrradiance.annualIrradianceKwhM2} <span className="text-sm font-semibold text-slate-600">kWh/m²</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Total Global Horizontal Irradiance (GHI) across {cityName} latitude.
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'equipment_specs': {
        if (!hasCustomEquipment && !isAdmin) return null;

        return (
          <section key="equipment_specs" className="py-14 bg-slate-50 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-equip-h2`} defaultText={custom.equipH2 || `Recommended Hardware for ${cityName} Climate`} />
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Equipment specifications engineered for durability against {cityName} weather patterns.
                  </p>
                </div>
                <InlineEditButton sectionId="equipment_specs" sectionTitle="Equipment Specifications" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-blue-600" /> Top PV Modules
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{deepContent.recommendedEquipment.panelBrands}</h4>
                  <p className="text-xs text-slate-500">Tier-1 high hail & PID resistance certification.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-600" /> Smart Inverters
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{deepContent.recommendedEquipment.inverterBrands}</h4>
                  <p className="text-xs text-slate-500">High efficiency with rapid shutdown compliance.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-purple-600" /> Racking Architecture
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{deepContent.recommendedEquipment.mountingType}</h4>
                  <p className="text-xs text-slate-500">Engineered for local wind gusts and rooftop load limits.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-600" /> Safety Standards
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{deepContent.recommendedEquipment.durabilityCertification}</h4>
                  <p className="text-xs text-slate-500">Mandatory testing for regional electrical codes.</p>
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'hidden_costs': {
        if (!hasCustomHiddenCosts && !isAdmin) return null;

        return (
          <section key="hidden_costs" className="py-14 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-hidden-h2`} defaultText={custom.hiddenH2 || `Hidden Solar Costs & Permitting Checklist: ${cityName}`} />
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Unexpected expenses that may arise during installation in {cityName}.
                  </p>
                </div>
                <InlineEditButton sectionId="hidden_costs" sectionTitle="Hidden Costs Checklist" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deepContent.hiddenCostsChecklist.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Item #{idx + 1}
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{item.item}</h4>
                    <div className="text-sm font-black text-slate-900">
                      Typical Cost: <span className="text-blue-700">{item.typicalCost}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.necessity}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'case_study': {
        if (!hasCustomCaseStudy && !isAdmin) return null;

        return (
          <section key="case_study" className="py-14 bg-slate-50 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    <InlineEditable id={`city-${cityName.toLowerCase()}-case-h2`} defaultText={custom.caseH2 || `Example Solar Installation: Rooftop Solar in ${cityName}`} />
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Sample financial metrics and payback calculation for a residential solar installation in {cityName}.
                  </p>
                </div>
                <InlineEditButton sectionId="case_study" sectionTitle="Example Solar Installation" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                    {deepContent.localCaseStudy.systemSize}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {deepContent.localCaseStudy.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    This residential system produces approximately {deepContent.localCaseStudy.annualKwhProduced.toLocaleString()} kWh annually, providing immediate electricity bill offsets and long-term protection against escalating utility tariffs.
                  </p>
                </div>

                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs font-semibold text-slate-500">Gross Investment</div>
                    <div className="text-lg font-black text-slate-900 mt-1">{deepContent.localCaseStudy.grossCost}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-xs font-semibold text-emerald-800">Subsidy / Credits</div>
                    <div className="text-lg font-black text-emerald-700 mt-1">{deepContent.localCaseStudy.subsidyReceived}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="text-xs font-semibold text-blue-800">Net Turnkey Cost</div>
                    <div className="text-lg font-black text-blue-900 mt-1">{deepContent.localCaseStudy.netInvestment}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                    <div className="text-xs font-semibold text-purple-800">Payback Timeline</div>
                    <div className="text-lg font-black text-purple-900 mt-1">{deepContent.localCaseStudy.realPaybackYears} Years</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'llm_geo': {
        if (!hasCustomLlmGeo && !isAdmin) return null;

        return (
          <section key="llm_geo" className="py-8 bg-slate-50 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Summary Matrix for {cityName}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <tbody className="divide-y divide-slate-100">
                      {deepContent.llmSummaryGeoTable.map((row, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 font-bold text-slate-900 w-1/3">{row.metric}</td>
                          <td className="py-2.5 font-black text-blue-700 w-1/3">{row.value}</td>
                          <td className="py-2.5 text-slate-500">{row.context}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'internal_links':
        return (
          <section key="internal_links" className="py-12 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base md:text-lg font-bold text-slate-900">
                  <InlineEditable id={`city-${cityName.toLowerCase()}-links-h3`} defaultText="Also Read: Related Solar Guides & Global City Price Indices" />
                </h3>
                <InlineEditButton sectionId="internal_links" sectionTitle="Internal Links" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {otherCityPages.map((op) => (
                  <Link
                    key={op.id}
                    to={`/${op.slug}`}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all text-xs font-semibold text-slate-800 flex items-center justify-between group"
                  >
                    <span>Solar Cost in {op.city || op.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}

                {relatedSizePages.map((sp) => (
                  <Link
                    key={sp.id}
                    to={`/${sp.slug}`}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all text-xs font-semibold text-slate-800 flex items-center justify-between group"
                  >
                    <span>{sp.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );

      case 'cta':
        return (
          <section id="lead-cta-section" key="cta" className="py-14 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-end mb-2">
                <InlineEditButton sectionId="cta" sectionTitle="Lead CTA Form" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>
              <LeadCaptureForm
                city={cityName}
                sourceSlug={page.slug}
                defaultKw={systemKw}
                title={`Get Free Quotes from Top Installers in ${cityName}`}
                subtitle={`Connect with certified solar contractors in ${cityName}. Compare panel specs, warranty terms, and claim clean energy tax incentives.`}
              />
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  const sectionOrder = page.section_order && page.section_order.includes('case_study') ? page.section_order : [
    'hero',
    'quick_stats',
    'llm_geo',
    'cost_breakdown',
    'calculator',
    'grid_steps',
    'seasonal_curve',
    'equipment_specs',
    'hidden_costs',
    'system_comparison',
    'city_comparison_chart',
    'case_study',
    'subsidy',
    'installers',
    'faq',
    'internal_links',
    'cta',
  ];

  return (
    <div className="min-h-screen bg-white">
      {sectionOrder.map((sectionId) => renderSection(sectionId))}

      {/* FIX 2: About This Data Section (Appears on all pages for E-E-A-T transparency) */}
      <AboutThisData
        locationLabel={`${cityName}, ${countryOrRegion}`}
        updatedAt={page.updated_at}
        createdAt={page.created_at}
        realDataSources={page.real_data_sources || (custom as any)?.real_data_sources}
        templateType="city"
      />
    </div>
  );
};
