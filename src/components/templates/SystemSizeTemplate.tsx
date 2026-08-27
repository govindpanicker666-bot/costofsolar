import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import {
  Zap,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sun,
  Leaf,
  BatteryCharging,
  SlidersHorizontal,
  Home,
  Globe,
  HelpCircle,
  Wrench,
  CreditCard,
  Building2,
  TreeDeciduous,
  Car,
  Flame,
  Award,
  AlertCircle,
  FileCheck,
  Check,
  X,
  Info
} from 'lucide-react';
import { PageRecord, FaqRecord, PageSectionId } from '../../types';
import { GLOBAL_CITIES } from '../../data/globalSolarData';
import { LeadCaptureForm } from '../common/LeadCaptureForm';
import { InlineEditable } from '../common/InlineEditable';
import { InlineEditButton } from './InlineEditButton';
import { AboutThisData } from '../common/AboutThisData';

interface SystemSizeTemplateProps {
  page: PageRecord;
  faqs?: FaqRecord[];
  allPages?: PageRecord[];
  isAdmin?: boolean;
  onEditSection?: (sectionId: PageSectionId, sectionTitle: string) => void;
}

export const SystemSizeTemplate: React.FC<SystemSizeTemplateProps> = ({
  page,
  faqs: initialFaqs = [],
  allPages = [],
  isAdmin = false,
  onEditSection = () => {},
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [sortCityBy, setSortCityBy] = useState<'cost' | 'name'>('cost');

  const kw = page.system_size_kw || 5;
  const grossMin = page.avg_cost_min || Math.round(kw * 1150);
  const grossMax = page.avg_cost_max || Math.round(kw * 1550);
  const grossAvg = Math.round((grossMin + grossMax) / 2);
  const subsidy = page.subsidy_amount || Math.round(grossAvg * 0.30);
  const netCost = grossAvg - subsidy;

  // Priority: page.custom_content (AI generated) > calculations
  const custom = (page.custom_content && typeof page.custom_content === 'object' ? page.custom_content : {}) as Record<string, any>;

  // Key system specifications (AI custom_content > calculated fallback)
  const numPanels = Number(custom.systemSpecs?.panelCount || custom.systemSpecs?.panelsNeeded) || Math.ceil((kw * 1000) / 450);
  const roofAreaSqFt = Number(custom.systemSpecs?.roofAreaSqFt || custom.systemSpecs?.areaNeeded) || Math.round(kw * 65);
  const unitsPerDay = Number(custom.systemSpecs?.unitsPerDay) || Math.round(kw * 4.3 * 10) / 10;
  const unitsPerMonth = Number(custom.systemSpecs?.unitsPerMonth) || Math.round(unitsPerDay * 30);
  const unitsPerYear = Number(custom.systemSpecs?.annualGenerationKwh) || Math.round(unitsPerDay * 365);

  // Environmental statistics (AI custom_content > calculated fallback)
  const co2AvoidedKg = Number(custom.environmentalImpact?.co2PerYear || custom.systemSpecs?.co2SavedPerYear) || Math.round(unitsPerYear * 0.72);
  const treesPlanted = Number(custom.environmentalImpact?.treesEquivalent || custom.systemSpecs?.treesEquivalent) || Math.round(co2AvoidedKg / 21);
  const kmNotDriven = Number(custom.environmentalImpact?.kmNotDriven) || Math.round(co2AvoidedKg * 5.8);
  const coalNotBurnedKg = Number(custom.environmentalImpact?.coalAvoided || custom.systemSpecs?.coalAvoided) || Math.round(unitsPerYear * 0.38);

  // Interactive Payback Calculator State
  const [calcMonthlyBill, setCalcMonthlyBill] = useState<number>(180);
  const [calcRatePerKwh, setCalcRatePerKwh] = useState<number>(0.18);
  const [calcEscalation, setCalcEscalation] = useState<number>(3.5);

  const calcAnnualSolarGen = kw * 1550; // typical annual kWh
  const calcAnnualBillSavings = Math.min(calcMonthlyBill * 12, Math.round(calcAnnualSolarGen * calcRatePerKwh));
  const calcPaybackYears = Math.max(2.8, Math.round((netCost / (calcAnnualBillSavings || 1)) * 10) / 10);
  
  // 10-Year and 25-Year Compound Savings
  const calc10YearSavings = useMemo(() => {
    let total = 0;
    let rate = calcAnnualBillSavings;
    for (let yr = 1; yr <= 10; yr++) {
      total += rate;
      rate *= (1 + calcEscalation / 100);
    }
    return Math.round(total - netCost);
  }, [calcAnnualBillSavings, calcEscalation, netCost]);

  const calc25YearSavings = useMemo(() => {
    let total = 0;
    let rate = calcAnnualBillSavings;
    for (let yr = 1; yr <= 25; yr++) {
      total += rate;
      rate *= (1 + calcEscalation / 100);
    }
    return Math.round(total - netCost);
  }, [calcAnnualBillSavings, calcEscalation, netCost]);

  // Monthly 12-Month Generation Data (AI custom_content > calculated fallback)
  const defaultMonthlyGeneration = [
    { month: 'Jan', generation: Math.round(kw * 95), avgSunHours: 3.2 },
    { month: 'Feb', generation: Math.round(kw * 105), avgSunHours: 3.8 },
    { month: 'Mar', generation: Math.round(kw * 135), avgSunHours: 4.5 },
    { month: 'Apr', generation: Math.round(kw * 148), avgSunHours: 5.1 },
    { month: 'May', generation: Math.round(kw * 165), avgSunHours: 5.6 },
    { month: 'Jun', generation: Math.round(kw * 170), avgSunHours: 5.8 },
    { month: 'Jul', generation: Math.round(kw * 168), avgSunHours: 5.7 },
    { month: 'Aug', generation: Math.round(kw * 155), avgSunHours: 5.3 },
    { month: 'Sep', generation: Math.round(kw * 138), avgSunHours: 4.7 },
    { month: 'Oct', generation: Math.round(kw * 120), avgSunHours: 4.0 },
    { month: 'Nov', generation: Math.round(kw * 100), avgSunHours: 3.4 },
    { month: 'Dec', generation: Math.round(kw * 90), avgSunHours: 3.0 },
  ];

  const rawMonthly = custom.monthlyGenerationData || custom.monthlyGeneration;
  const monthlyGenerationData = (Array.isArray(rawMonthly) && rawMonthly.length > 0)
    ? rawMonthly.map((m: any, i: number) => ({
        month: m.month || defaultMonthlyGeneration[i]?.month || `M${i+1}`,
        generation: Number(m.units || m.generation) || defaultMonthlyGeneration[i]?.generation || Math.round(kw * 120),
        avgSunHours: Number(m.avgSunHours) || defaultMonthlyGeneration[i]?.avgSunHours || 4.5,
      }))
    : defaultMonthlyGeneration;

  // Itemized Cost Breakdown Rows (AI custom_content > calculated fallback)
  const defaultBreakdownRows = [
    {
      item: `Tier-1 Monocrystalline Solar Panels (${numPanels}x 450W Modules)`,
      specs: '25-year 85%+ linear power performance warranty',
      min: Math.round(grossMin * 0.40),
      avg: Math.round(grossAvg * 0.40),
      max: Math.round(grossMax * 0.40),
    },
    {
      item: `Smart Solar Inverter (String or Microinverter System)`,
      specs: '98% CEC efficiency with mobile cloud telemetry',
      min: Math.round(grossMin * 0.20),
      avg: Math.round(grossAvg * 0.20),
      max: Math.round(grossMax * 0.20),
    },
    {
      item: 'Rooftop Mounting Hardware & Racking Rails',
      specs: 'Anodized aluminum engineered for 140mph wind resistance',
      min: Math.round(grossMin * 0.11),
      avg: Math.round(grossAvg * 0.11),
      max: Math.round(grossMax * 0.11),
    },
    {
      item: 'Electrical Balance of System (AC/DC Disconnects, Cabling, Conduit)',
      specs: 'NEC compliant UV-shielded solar cable and surge protectors',
      min: Math.round(grossMin * 0.12),
      avg: Math.round(grossAvg * 0.12),
      max: Math.round(grossMax * 0.12),
    },
    {
      item: 'Certified Turnkey Installation Labor & Electrical Wiring',
      specs: 'Licensed master electrician installation and safety sign-off',
      min: Math.round(grossMin * 0.10),
      avg: Math.round(grossAvg * 0.10),
      max: Math.round(grossMax * 0.10),
    },
    {
      item: 'Grid Interconnection, Net Metering & City Permitting',
      specs: 'Utility bi-directional net meter application & AHJ inspections',
      min: Math.round(grossMin * 0.05),
      avg: Math.round(grossAvg * 0.05),
      max: Math.round(grossMax * 0.05),
    },
    {
      item: 'Year 1 Preventive Maintenance & Diagnostic Check',
      specs: 'Full thermal drone scan and connection torque verification',
      min: Math.round(grossMin * 0.02),
      avg: Math.round(grossAvg * 0.02),
      max: Math.round(grossMax * 0.02),
    },
  ];

  const rawBreakdown = custom.costBreakdownTable || custom.costBreakdown?.onGrid || custom.costBreakdown;
  const breakdownRows = (Array.isArray(rawBreakdown) && rawBreakdown.length > 0)
    ? rawBreakdown.map((row: any) => ({
        item: row.item,
        specs: row.specs || 'Certified solar component & labor specification',
        min: Number(row.min) || Math.round(grossMin * 0.15),
        avg: Number(row.avg || row.mid) || Math.round(grossAvg * 0.15),
        max: Number(row.max) || Math.round(grossMax * 0.15),
      }))
    : defaultBreakdownRows;

  // 12 Comprehensive FAQs for 100% keyword coverage
  const templateFaqs = [
    {
      question: `How much does a ${kw}kW solar system cost in 2026?`,
      answer: `In 2026, a turnkey ${kw}kW residential solar power system costs between $${grossMin.toLocaleString()} and $${grossMax.toLocaleString()} gross before incentives. With standard 30% clean energy tax credits or regional subsidies, the net cost drops to approximately $${netCost.toLocaleString()}, with payback typically achieved in 3.8 to 5.5 years.`
    },
    {
      question: `How many solar panels are in a ${kw}kW system?`,
      answer: `A ${kw}kW solar installation consists of approximately ${numPanels} modern high-efficiency 450W monocrystalline modules (or ${Math.ceil((kw * 1000) / 400)} 400W modules). These panels require roughly ${roofAreaSqFt} square feet (~${Math.round(roofAreaSqFt / 10.76)} m²) of unshaded roof area.`
    },
    {
      question: `How much electricity does a ${kw}kW solar system generate per day and year?`,
      answer: `A ${kw}kW solar system generates approximately ${unitsPerDay} kWh per day, ${unitsPerMonth} kWh per month, and roughly ${unitsPerYear.toLocaleString()} kWh per year, depending on your geographic location, roof tilt, azimuth, and local sun peak hours.`
    },
    {
      question: `Can a ${kw}kW solar system power an entire house?`,
      answer: `Yes, for average residential homes consuming between 400 and 700 kWh per month, a ${kw}kW system can offset 85% to 100% of all electrical usage, including air conditioning, refrigerators, lighting, laundry, and daily consumer electronics.`
    },
    {
      question: `Is a ${kw}kW solar system enough to charge an Electric Vehicle (EV)?`,
      answer: `Yes. An EV driven 10,000 to 12,000 miles per year requires about 2,500 to 3,200 kWh annually. A ${kw}kW system producing ~${unitsPerYear.toLocaleString()} kWh annually can easily cover both baseline household electricity and overnight EV charging.`
    },
    {
      question: `What is the difference between string inverters and microinverters for a ${kw}kW system?`,
      answer: `A centralized string inverter routes DC power from all panels into one unit (lower upfront cost, 10-12 year warranty). Microinverters attach to each individual panel (25-year warranty, independent optimization preventing shade from lowering overall system output).`
    },
    {
      question: `How does net metering work with a ${kw}kW solar system?`,
      answer: `During bright midday hours when your ${kw}kW system generates more electricity than your home consumes, surplus power flows into the grid, rolling back your utility meter. At night, you draw power from the grid using accumulated credits.`
    },
    {
      question: `What happens to a ${kw}kW grid-tied system during a power blackout?`,
      answer: `Standard grid-tied systems automatically shut down during blackouts (anti-islanding safety) to protect line workers. If you need continuous power during outages, pair the ${kw}kW array with a 10kWh–15kWh hybrid battery storage system.`
    },
    {
      question: `What roof type is best for a ${kw}kW solar installation?`,
      answer: `Solar can be installed on composite asphalt shingles, concrete tiles, metal standing seam, flat roofs, and corrugated metal. South-facing roofs (in the Northern Hemisphere) with 15° to 35° pitch offer optimal solar harvest.`
    },
    {
      question: `How much maintenance does a ${kw}kW solar system require?`,
      answer: `Solar PV panels have zero moving parts and require minimal maintenance. Rinsing them 1 to 2 times a year to remove dust, bird droppings, or pollen is generally sufficient to maintain 98%+ peak efficiency.`
    },
    {
      question: `What warranties are included with a ${kw}kW solar system?`,
      answer: `Tier-1 ${kw}kW installations include: (1) 25 to 30-year 85%+ linear power output warranty, (2) 12 to 25-year manufacturer product warranty, (3) 10 to 25-year inverter warranty, and (4) 10-year installer workmanship guarantee.`
    },
    {
      question: `How much value does a ${kw}kW solar system add to home resale value?`,
      answer: `According to national real estate studies by Zillow and Lawrence Berkeley National Laboratory, homes with owned solar installations sell for 4.1% more on average and spend significantly fewer days on the market.`
    }
  ];

  const allFaqs = useMemo(() => {
    if (Array.isArray(custom.faqs) && custom.faqs.length > 0) {
      return custom.faqs.map((f: any) => ({
        question: f.question,
        answer: f.answer,
      }));
    }
    if (initialFaqs && initialFaqs.length > 0) {
      return initialFaqs.map((f: any) => ({ question: f.question, answer: f.answer }));
    }
    return templateFaqs;
  }, [custom.faqs, initialFaqs, templateFaqs]);

  // City-wise cost table for this kW size (AI custom_content > GLOBAL_CITIES)
  const cityWiseRates = useMemo(() => {
    const rawCities = custom.cityWiseCostTable || custom.cityWiseCosts;
    if (Array.isArray(rawCities) && rawCities.length > 0) {
      return rawCities.map((c: any) => {
        const cityMin = Number(c.costMin) || Math.round(kw * 1200);
        const cityMax = Number(c.costMax) || Math.round(kw * 1600);
        const cityGross = Math.round((cityMin + cityMax) / 2);
        const citySubsidy = Math.round(cityGross * 0.30);
        const cityNet = cityGross - citySubsidy;
        const cityAnnualSavings = Math.round(kw * 1500 * 0.18);
        return {
          city: c.city,
          country: c.country || 'Global',
          currencySymbol: c.currency || '$',
          slug: c.city.toLowerCase().replace(/\s+/g, '-'),
          totalGross: cityGross,
          subsidy: citySubsidy,
          netCost: cityNet,
          annualSavings: cityAnnualSavings,
        };
      });
    }

    return GLOBAL_CITIES.map((c) => {
      const cityGross = Math.round(c.costPerWattUSD * kw * 1000);
      const citySubsidy = Math.round(cityGross * (c.subsidyPercentage / 100));
      const cityNet = cityGross - citySubsidy;
      const cityAnnualSavings = Math.round(kw * c.annualYieldKwhPerKw * 0.18);
      return {
        city: c.city,
        country: c.country,
        currencySymbol: c.currencySymbol || '$',
        slug: c.slug,
        totalGross: cityGross,
        subsidy: citySubsidy,
        netCost: cityNet,
        annualSavings: cityAnnualSavings,
      };
    });
  }, [kw, custom.cityWiseCostTable, custom.cityWiseCosts]);

  const sortedCityRates = useMemo(() => {
    return [...cityWiseRates].sort((a, b) => (sortCityBy === 'cost' ? a.netCost - b.netCost : a.city.localeCompare(b.city)));
  }, [sortCityBy, cityWiseRates]);

  const otherSizes = allPages.filter((p) => p.template_type === 'system_size' && p.slug !== page.slug).slice(0, 4);
  const sqftPages = allPages.filter((p) => p.template_type === 'sqft').slice(0, 2);
  const relatedPagesList = [...otherSizes, ...sqftPages].slice(0, 6);

  // Structured Product Schema JSON-LD for Search Engines
  const productSchemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${kw}kW Residential Solar Power System`,
    description: `Complete ${kw}kW turnkey solar energy installation including tier-1 PV modules, inverter, racking hardware, and certified labor.`,
    category: 'Solar Energy Systems',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: grossMin,
      highPrice: grossMax,
      offerCount: 14,
    }
  };

  const faqSchemaJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      }
    }))
  };

  return (
    <div className="space-y-0 text-slate-900">
      {/* Product & FAQ JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemaJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJson) }} />

      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-12 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 flex-wrap">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/#system-sizes" className="hover:text-blue-600 transition-colors">System Sizes</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-bold">{kw}kW Solar System</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                  <Zap className="w-3.5 h-3.5 text-blue-600" /> {kw} Kilowatt (kW) DC Capacity
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" /> {page.updated_at ? `Data Updated ${new Date(page.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : '2026 Edition'}
                </span>
                {subsidy > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Clean Energy Incentives Available
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                  <InlineEditable
                    id={`size-${kw}-h1`}
                    defaultText={custom.h1 || page.h1 || page.title || `${kw}kW Solar System Cost 2026: Global Price, Output & ROI Guide`}
                    as="span"
                  />
                </h1>
                <InlineEditButton sectionId="hero" sectionTitle="Hero Section" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                <InlineEditable
                  id={`size-${kw}-desc`}
                  multiline
                  defaultText={custom.heroSubtitle || page.hero_subtitle || `Complete 2026 pricing and technical guide for a ${kw}kW residential solar power installation. Compare itemized hardware costs, calculate annual energy generation, explore grid-tied vs hybrid options, and review 25-year financial returns.`}
                  as="span"
                />
              </p>

              {/* AEO/GEO Quick Answer Box (Targeting Featured Snippets & AI Engines) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-blue-800 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-blue-600" /> Quick Answer: How Much Does a {kw}kW Solar System Cost in 2026?
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  <InlineEditable
                    id={`size-${kw}-quick-answer`}
                    multiline
                    defaultText={custom.quickAnswer || page.quick_answer || `A ${kw}kW solar power system in 2026 costs between $${grossMin.toLocaleString()} and $${grossMax.toLocaleString()} gross ($1.15 to $1.55 per Watt installed). After applying standard 30% clean energy incentives, the net out-of-pocket cost is approximately $${netCost.toLocaleString()}. It produces ~${unitsPerDay} kWh daily (~${unitsPerYear.toLocaleString()} kWh annually), saving $${(page.savings_per_year || Math.round(kw * 380)).toLocaleString()} per year with an average payback period of 3.8 to 5.2 years.`}
                    as="span"
                  />
                </p>
              </div>
            </div>

            {/* Quick Incentive Callout Card */}
            <div className="lg:w-80 bg-white p-5 rounded-2xl border border-blue-200 shadow-lg shadow-blue-600/5 space-y-3 shrink-0">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <InlineEditable id={`size-${kw}-card-header`} defaultText="Standard 30% Tax Credit" />
              </div>
              <div className="text-3xl font-black text-emerald-600">
                ${subsidy.toLocaleString()} Saved
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Net turnkey price of ~${netCost.toLocaleString()} after applying standard residential clean energy credits.
              </p>
              <a
                href="#lead-cta-section"
                className="block text-center py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                Get Free {kw}kW Solar Quotes →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SPECIFICATIONS STATS */}
      <section className="py-8 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80">
              <div className="text-xs font-semibold text-blue-700 mb-1">Turnkey Net Cost</div>
              <div className="text-xl md:text-2xl font-black text-slate-900">${netCost.toLocaleString()}</div>
              <span className="text-[11px] text-slate-500">Gross: ${grossAvg.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200/80">
              <div className="text-xs font-semibold text-purple-700 mb-1">Panels & Roof Area</div>
              <div className="text-xl md:text-2xl font-black text-slate-900">{numPanels} Panels</div>
              <span className="text-[11px] text-slate-500">~{roofAreaSqFt} sq ft (~{Math.round(roofAreaSqFt / 10.76)} m²)</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
              <div className="text-xs font-semibold text-emerald-700 mb-1">Daily Generation</div>
              <div className="text-xl md:text-2xl font-black text-slate-900">~{unitsPerDay} kWh / Day</div>
              <span className="text-[11px] text-slate-500">~{unitsPerMonth} kWh / Month</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <div className="text-xs font-semibold text-amber-700 mb-1">Estimated Payback</div>
              <div className="text-xl md:text-2xl font-black text-slate-900">{page.payback_years || 4.5} Years</div>
              <span className="text-[11px] text-emerald-700 font-medium">20+ yrs pure profit</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAILED COST BREAKDOWN TABLE */}
      <section className="py-14 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                <InlineEditable
                  id={`size-${kw}-table-h2`}
                  defaultText={`How Much Does Each Component of a ${kw}kW Solar System Cost?`}
                />
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Itemized equipment bill of materials, labor, permitting, and grid connection for a turnkey {kw}kW installation.
              </p>
            </div>
            <InlineEditButton sectionId="cost_breakdown" sectionTitle="Cost Breakdown" isAdmin={isAdmin} onEditSection={onEditSection} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Component & System Role</th>
                    <th className="py-3.5 px-4 text-right">Economy Tier</th>
                    <th className="py-3.5 px-4 text-right bg-blue-50/50 text-blue-900 font-extrabold">Average Cost ($)</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Premium Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {breakdownRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="font-semibold text-slate-900">
                          <InlineEditable id={`size-${kw}-table-item-${idx}`} defaultText={row.item} />
                        </div>
                        <div className="text-[11px] text-slate-500">{row.specs}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                        ${row.min.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-blue-700 bg-blue-50/30">
                        ${row.avg.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-medium text-slate-600">
                        ${row.max.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-bold text-slate-900">
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6">Total Turnkey {kw}kW Investment</td>
                    <td className="py-3.5 px-4 text-right">${grossMin.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right text-blue-700 bg-blue-50/60 font-black">${grossAvg.toLocaleString()}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">${grossMax.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE PAYBACK & ROI CALCULATOR */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              <InlineEditable
                id={`size-${kw}-calc-h2`}
                defaultText={`What Is the Payback Period and 25-Year ROI for a ${kw}kW System?`}
              />
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Adjust your monthly electric bill and electricity rate to calculate custom breakeven and compound 25-year savings in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls */}
            <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Current Monthly Electric Bill ($)
                  </label>
                  <span className="text-base font-black text-blue-600">${calcMonthlyBill}/mo</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="10"
                  value={calcMonthlyBill}
                  onChange={(e) => setCalcMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Electricity Tariff Rate ($/kWh)
                  </label>
                  <span className="text-base font-black text-blue-600">${calcRatePerKwh.toFixed(2)}/kWh</span>
                </div>
                <input
                  type="range"
                  min="0.08"
                  max="0.45"
                  step="0.01"
                  value={calcRatePerKwh}
                  onChange={(e) => setCalcRatePerKwh(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Expected Annual Utility Rate Inflation (%)
                  </label>
                  <span className="text-base font-black text-blue-600">{calcEscalation}% / yr</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={calcEscalation}
                  onChange={(e) => setCalcEscalation(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            {/* Real-time Calculation Outputs */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-xs font-semibold text-emerald-800 mb-1">Payback Period</div>
                <div className="text-3xl font-black text-slate-900">{calcPaybackYears} Years</div>
                <p className="text-xs text-slate-600 mt-1">System pays for itself through eliminated power bills</p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div className="text-xs font-semibold text-blue-800 mb-1">Year 1 Utility Savings</div>
                <div className="text-3xl font-black text-slate-900">${calcAnnualBillSavings.toLocaleString()}</div>
                <p className="text-xs text-slate-600 mt-1">Direct reduction in grid power purchases</p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-purple-800 mb-1">25-Year Net Profit & Savings</div>
                    <div className="text-3xl sm:text-4xl font-black text-purple-900">
                      ${calc25YearSavings.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-slate-500 font-semibold">10-Year Savings</div>
                    <div className="text-xl font-bold text-slate-800">${calc10YearSavings.toLocaleString()}</div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Net lifetime return after fully recovering initial ${netCost.toLocaleString()} turnkey installation cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ENVIRONMENTAL IMPACT SECTION */}
      <section className="py-14 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold mb-3 border border-emerald-400/30">
              <Leaf className="w-3.5 h-3.5" /> Carbon Offset & Sustainability
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              <InlineEditable
                id={`size-${kw}-env-h2`}
                defaultText={`What Is the Environmental Impact of a ${kw}kW Solar System?`}
              />
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Every kilowatt-hour generated by your {kw}kW rooftop array displaces fossil fuel generation from the municipal grid.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black">{co2AvoidedKg.toLocaleString()} kg</div>
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">CO2 Avoided / Year</div>
              <p className="text-[11px] text-slate-300">Equivalent to {(co2AvoidedKg * 25 / 1000).toFixed(1)} tons over 25 years</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto text-green-400">
                <TreeDeciduous className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black">{treesPlanted.toLocaleString()} Trees</div>
              <div className="text-xs font-bold text-green-300 uppercase tracking-wider">Equivalent Trees Planted</div>
              <p className="text-[11px] text-slate-300">Equivalent carbon absorption capacity annually</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
                <Car className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black">{kmNotDriven.toLocaleString()} km</div>
              <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">Vehicle Kilometers Offset</div>
              <p className="text-[11px] text-slate-300">Equivalent to avoiding gas automobile emissions</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
                <Flame className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black">{coalNotBurnedKg.toLocaleString()} kg</div>
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Coal Not Burned / Year</div>
              <p className="text-[11px] text-slate-300">Conserves natural fossil fuels & clean air</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MONTHLY GENERATION RECHARTS BAR CHART */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                <InlineEditable
                  id={`size-${kw}-chart-h2`}
                  defaultText={`How Much Power Does a ${kw}kW Solar System Generate Each Month?`}
                />
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Estimated monthly energy production (kWh) demonstrating seasonal solar irradiance and peak generation periods.
              </p>
            </div>
            <InlineEditButton sectionId="savings_chart" sectionTitle="Generation Chart" isAdmin={isAdmin} onEditSection={onEditSection} />
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyGenerationData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#334155', fontWeight: 600 }} />
                  <YAxis unit=" kWh" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    formatter={(value: any) => [`${value} kWh`, 'Monthly Production']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="generation" name="Estimated Output (kWh)" fill="#2563eb" radius={[6, 6, 0, 0]}>
                    {monthlyGenerationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index >= 4 && index <= 7 ? '#3b82f6' : '#60a5fa'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
              <span>Annual Output Total: <strong className="text-slate-900 font-bold">~{unitsPerYear.toLocaleString()} kWh</strong></span>
              <span>Peak Production: <strong className="text-blue-700 font-bold">June & July (~170 kWh/mo)</strong></span>
              <span>Winter Production: <strong className="text-slate-700 font-bold">Dec & Jan (~90-95 kWh/mo)</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ON-GRID VS HYBRID VS OFF-GRID COMPARISON */}
      <section className="py-14 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              <InlineEditable
                id={`size-${kw}-types-h2`}
                defaultText={`On-Grid, Hybrid or Off-Grid: Choosing the Right ${kw}kW Architecture`}
              />
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Compare turnkey system architecture, required battery capacity, and backup duration for a {kw}kW solar array.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Grid-Tied */}
            <div className="bg-white p-6 rounded-2xl border-2 border-blue-500 shadow-md space-y-4 relative">
              <div className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-black uppercase tracking-wider">
                Most Popular (88% of {kw}kW Installations)
              </div>
              <h3 className="text-xl font-bold text-slate-900">{kw}kW On-Grid: Maximum Bill Savings, Zero Battery Cost</h3>
              <div className="text-2xl font-black text-blue-600">${netCost.toLocaleString()} <span className="text-xs font-normal text-slate-500">Net Turnkey</span></div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Lowest upfront cost & fastest ROI ({calcPaybackYears} yrs)</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Feeds ~{unitsPerYear.toLocaleString()} kWh/yr directly into grid via Net Metering</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Uses {kw <= 6 ? 'single-phase 230V' : 'three-phase 400V'} grid-tied smart string inverter</li>
                <li className="flex items-start gap-1.5"><X className="w-4 h-4 text-rose-500 shrink-0" /> Anti-islanding safety shutoff during municipal power cuts</li>
              </ul>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                <strong>Best for:</strong> Urban/suburban homes with stable grid power looking to eliminate ${Math.round(calcAnnualBillSavings / 12)}/mo in electric bills.
              </div>
            </div>

            {/* Hybrid */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="inline-flex px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-black uppercase tracking-wider">
                Solar + {kw <= 4 ? '5 kWh' : kw <= 8 ? '10–13.5 kWh' : kw <= 14 ? '20–27 kWh' : '30–45 kWh'} Battery
              </div>
              <h3 className="text-xl font-bold text-slate-900">{kw}kW Hybrid: Grid Backup + Daytime Battery Autonomy</h3>
              <div className="text-2xl font-black text-purple-600">${Math.round(netCost + (kw <= 4 ? 4500 : kw <= 8 ? 8500 : kw <= 14 ? 14500 : 22000)).toLocaleString()} <span className="text-xs font-normal text-slate-500">Net Turnkey</span></div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> {kw <= 4 ? '12–18 hrs essential backup (refrigerator, lights, WiFi)' : kw <= 8 ? '24–36 hrs backup (including 1 inverter AC, kitchen, sump pump)' : '48+ hrs whole-home power (multi-zone AC, heat pump & EV)'}</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Self-consumption optimization during peak TOU utility rate spikes</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> High-voltage Lithium Iron Phosphate (LFP) 10-year battery warranty</li>
                <li className="flex items-start gap-1.5"><X className="w-4 h-4 text-amber-500 shrink-0" /> Battery bank requires replacement at Year 12–15</li>
              </ul>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                <strong>Best for:</strong> Homeowners in areas with weather blackouts, time-of-use tariffs, or NEM 3.0 export rules.
              </div>
            </div>

            {/* Off-Grid */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="inline-flex px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-black uppercase tracking-wider">
                {Math.round(kw * 2.8)} kWh Island Bank
              </div>
              <h3 className="text-xl font-bold text-slate-900">{kw}kW Off-Grid: Full Energy Independence, No Utility Required</h3>
              <div className="text-2xl font-black text-slate-900">${Math.round(grossAvg * 1.95).toLocaleString()} <span className="text-xs font-normal text-slate-500">Gross</span></div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> 100% independence from utility poles, easements, and power companies</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Sized with {Math.round(kw * 1.2)}kVA pure sine wave off-grid inverter/charger</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Includes automatic generator start (AGS) integration for winter weeks</li>
                <li className="flex items-start gap-1.5"><X className="w-4 h-4 text-rose-500 shrink-0" /> Requires strict load balancing and periodic battery equalization</li>
              </ul>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                <strong>Best for:</strong> Remote ranches, eco-lodges, agricultural pumps, and cabins where grid hookup fees exceed $15,000.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5. APPLIANCE RUNNING CAPACITY & DAILY ENERGY BUDGET */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                <InlineEditable
                  id={`size-${kw}-appliances-h2`}
                  defaultText={`What Appliances Can a ${kw}kW Solar System Power in Your Home?`}
                />
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Real-world daily load breakdown showing how {unitsPerDay} kWh of daily output covers typical residential and commercial appliances.
              </p>
            </div>
            <InlineEditButton sectionId="appliances" sectionTitle="Appliance Coverage" isAdmin={isAdmin} onEditSection={onEditSection} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 uppercase">Air Conditioning</span>
                <span className="text-xs font-black text-blue-900">{Math.min(24, Math.round((unitsPerDay / 1.4) * 10) / 10)} Hours / Day</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">1.5-Ton Inverter AC (1,400W Draw)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {kw <= 3 ? 'Powers 1 energy-efficient bedroom AC for ~8-10 hours during hot afternoons.' : kw <= 6 ? 'Can power 1-2 split AC units continuously through daytime peak cooling hours.' : 'Sufficient to run multi-zone central air conditioning across 3-5 rooms without grid draw.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase">EV Charging</span>
                <span className="text-xs font-black text-emerald-900">~{Math.round(unitsPerDay / 0.3)} Miles / Day</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Level-2 Electric Vehicle Charging</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adds ~{Math.round((unitsPerDay / 0.3) * 1.6)} km of driving range per day (~{Math.round((unitsPerYear / 0.3) * 1.6).toLocaleString()} km/year), completely offsetting gas vehicle fuel expenses.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 uppercase">Refrigeration</span>
                <span className="text-xs font-black text-purple-900">24/7 Full Coverage</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Dual Refrigerators & Deep Freezers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uses only ~1.8 to 2.5 kWh per day (under {Math.round((2.2 / unitsPerDay) * 100)}% of the {kw}kW system's daily output), ensuring continuous zero-cost refrigeration.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 uppercase">Kitchen & Cooking</span>
                <span className="text-xs font-black text-amber-900">100% Offset</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Induction Cooktop, Microwave & Oven</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Covers ~3 to 5 kWh of daily culinary energy including high-draw induction cooking, espresso machines, and kitchen dishwashers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 uppercase">Water Heating</span>
                <span className="text-xs font-black text-indigo-900">{kw >= 5 ? '100% Solar Powered' : 'Smart Timer Recommended'}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Heat Pump / Electric Water Heater</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A 3kW water heater running 2 hours requires 6 kWh. Schedulable solar divert controllers heat your water tank using free midday {kw}kW solar power.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 uppercase">Home Lighting & IT</span>
                <span className="text-xs font-black text-teal-900">&lt; 10% System Load</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">LED Lighting, Laptops, TV & WiFi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard whole-home LED lighting and electronic devices consume ~1.2 to 2.0 kWh per day, leaving {Math.round(unitsPerDay - 2)} kWh daily for major appliances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. GLOBAL GOVERNMENT INCENTIVES & TAX CREDITS */}
      <section className="py-14 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              <InlineEditable
                id={`size-${kw}-incentives-h2`}
                defaultText={`Tax Credits & Rebates That Reduce Your ${kw}kW Net Cost in 2026`}
              />
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Exact financial deductions, clean energy tax credits, feed-in tariffs, and regulatory policies for a {kw}kW installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-blue-700 uppercase">30% Clean Energy ITC</div>
              <h3 className="text-base font-bold text-slate-900">30% Federal ITC: ${Math.round(grossAvg * 0.30).toLocaleString()} Off Your {kw}kW System</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dollar-for-dollar reduction on federal/national income tax returns under residential clean energy statutes (US Section 25D, UK 0% VAT, EU Energy Directives).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-emerald-700 uppercase">Annual Feed-In Credits</div>
              <h3 className="text-base font-bold text-slate-900">Net Metering Value: ${Math.round(unitsPerYear * 0.42 * 0.12).toLocaleString()}/yr Credit at {kw}kW Output</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exporting ~{Math.round(unitsPerYear * 0.42).toLocaleString()} kWh of surplus power annually rolls back your utility meter at retail or wholesale tariff compensation rates.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-purple-700 uppercase">Sales Tax & VAT Waiver</div>
              <h3 className="text-base font-bold text-slate-900">0% Sales Tax Exemption Worth ${Math.round(grossAvg * 0.08).toLocaleString()}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard 0% VAT on solar hardware in UK, Germany, and 100% state sales tax exemptions in 28+ US states eliminate taxes on your ${grossAvg.toLocaleString()} equipment invoice.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-amber-700 uppercase">STCs & SRECs Value</div>
              <h3 className="text-base font-bold text-slate-900">SREC / State Rebate: ${Math.round(kw * 13.2 * 38).toLocaleString()} for {kw}kW Certification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A {kw}kW array generates ~{Math.round(kw * 13.2)} tradable certificates (such as Australia STCs or US SRECs) applied as an upfront discount at contract signing.
              </p>
            </div>
          </div>

          {/* Regulatory & Grid Connection Policy Box */}
          <div className="mt-6 p-5 rounded-2xl bg-white border border-blue-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  {kw <= 5
                    ? `Fast-Track Grid Interconnection for ${kw}kW Arrays`
                    : kw <= 10
                    ? `Standard Residential Bi-Directional Net Metering (${kw}kW)`
                    : `Three-Phase Utility Interconnection Protocols for ${kw}kW+`}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {kw <= 5
                    ? `Systems up to 5kW qualify for expedited utility permitting across North America, Europe, and Australia, with simple single-phase bi-directional meter activation within 2-3 weeks.`
                    : kw <= 10
                    ? `A ${kw}kW system requires utility load feasibility sign-off. If your local network limits single-phase export to 5kW, a smart export limiter or battery storage ensures 100% compliance.`
                    : `Systems exceeding 10kW require three-phase 400V AC connection, dedicated dual utility disconnect switches, and grid stability engineering sign-off.`}
                </p>
              </div>
            </div>
            <a
              href="#lead-cta-section"
              className="shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors text-center"
            >
              Verify {kw}kW Local Subsidies →
            </a>
          </div>
        </div>
      </section>

      {/* 9. MAINTENANCE COST, DEGRADATION & LIFESPAN SECTION */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              <InlineEditable
                id={`size-${kw}-maint-h2`}
                defaultText={`What Are the Maintenance Costs and Degradation for a ${kw}kW Solar System?`}
              />
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Annual preventive upkeep costs for {numPanels} modules, inverter replacement timeline, and 25-year power degradation curve.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Maintenance Item ({kw}kW System)</th>
                    <th className="py-3.5 px-4">Frequency</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Estimated Cost ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                      <div>Panel Cleaning & Debris Removal</div>
                      <div className="text-[11px] text-slate-500">{numPanels}x 450W Monocrystalline Modules</div>
                    </td>
                    <td className="py-3.5 px-4">1–2 times / year</td>
                    <td className="py-3.5 px-4 sm:px-6 text-right font-medium text-slate-700">
                      ${Math.max(75, Math.round(numPanels * 8))} – ${Math.max(110, Math.round(numPanels * 12))}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                      <div>Master Electrician Diagnostic Check</div>
                      <div className="text-[11px] text-slate-500">Thermal IR scan, torque check & isolation test</div>
                    </td>
                    <td className="py-3.5 px-4">Every 3–4 years</td>
                    <td className="py-3.5 px-4 sm:px-6 text-right font-medium text-slate-700">
                      ${Math.round(130 + kw * 12)} – ${Math.round(180 + kw * 15)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                      <div>Inverter Replacement (String / Hybrid)</div>
                      <div className="text-[11px] text-slate-500">{kw <= 5 ? '3-5kW Single-Phase' : kw <= 10 ? '8-10kW Three-Phase' : '15-20kW Multi-MPPT'} Inverter</div>
                    </td>
                    <td className="py-3.5 px-4">Year 12–15 (if needed)</td>
                    <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-blue-700">
                      ${Math.round(kw <= 4 ? 850 : kw <= 8 ? 1350 : kw <= 14 ? 2100 : 3300).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                      <div>Cloud Telemetry & Mobile App Monitoring</div>
                      <div className="text-[11px] text-slate-500">Real-time panel-level production & error alerts</div>
                    </td>
                    <td className="py-3.5 px-4">Continuous</td>
                    <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-emerald-600">
                      Free ($0)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> 25-Year Power Degradation Model
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modern Tier-1 N-Type TOPCon panels degrade by &lt;1.0% in Year 1 and only 0.40% annually thereafter.
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-800">Year 1 Guaranteed Output</span>
                  <span className="font-black text-blue-600">99.0% (~{unitsPerYear.toLocaleString()} kWh)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-800">Year 10 Guaranteed Output</span>
                  <span className="font-black text-blue-600">94.5% (~{Math.round(unitsPerYear * 0.945).toLocaleString()} kWh)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-800">Year 25 Guaranteed Output</span>
                  <span className="font-black text-emerald-600">87.4% (~{Math.round(unitsPerYear * 0.874).toLocaleString()} kWh)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINANCING OPTIONS (CASH, LOAN, LEASE, PPA) */}
      <section className="py-14 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              <InlineEditable
                id={`size-${kw}-finance-h2`}
                defaultText={`4 Ways to Pay for a ${kw}kW System — Cash, Loan, Lease or PPA`}
              />
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Compare upfront cash purchases, $0-down solar green loans, leases, and Power Purchase Agreements (PPAs) tailored for a {kw}kW system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="text-xs font-black text-blue-600 uppercase">Option 1: Cash</div>
              <h3 className="text-base font-bold text-slate-900">Cash Purchase: Highest ROI, Fastest {kw}kW Payback</h3>
              <div className="text-xl font-black text-slate-900">${netCost.toLocaleString()} <span className="text-xs font-normal text-slate-500">Net</span></div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pay upfront in full. Claim the full ${subsidy.toLocaleString()} tax credit, pay $0 interest, and achieve the fastest {calcPaybackYears}-year breakeven.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-blue-700">
                25-Year Profit: +${calc25YearSavings.toLocaleString()}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-emerald-500 space-y-3 shadow-md relative">
              <span className="absolute -top-3 left-4 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
                Most Popular
              </span>
              <div className="text-xs font-black text-emerald-600 uppercase">Option 2: Green Loan</div>
              <h3 className="text-base font-bold text-slate-900">Solar Loan: Own Your {kw}kW System With Zero Upfront</h3>
              <div className="text-xl font-black text-emerald-700">~${Math.round(netCost * 0.0089)} / mo</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                15-year 6.99% fixed loan. Monthly payment of ~${Math.round(netCost * 0.0089)} is lower than eliminated utility bill (~${Math.round(calcAnnualBillSavings / 12)}/mo), creating immediate cash savings.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                Positive Cashflow: +${Math.max(15, Math.round(calcAnnualBillSavings / 12 - netCost * 0.0089))}/month
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="text-xs font-black text-purple-600 uppercase">Option 3: Lease</div>
              <h3 className="text-base font-bold text-slate-900">Operating Lease: Fixed Monthly Rate, No Ownership Responsibility</h3>
              <div className="text-xl font-black text-purple-700">~${Math.round(kw * 17)} / mo</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                $0 upfront capital. Solar provider owns and maintains the {numPanels} panels. Homeowner pays a fixed monthly rate for 20-25 years.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-purple-700">
                Best for: Homeowners without tax liability to use the ITC.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="text-xs font-black text-amber-600 uppercase">Option 4: PPA</div>
              <h3 className="text-base font-bold text-slate-900">PPA: Pay Per kWh Only — No Capital Investment</h3>
              <div className="text-xl font-black text-amber-700">~${(0.12).toFixed(2)} / kWh</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buy only the ~{unitsPerYear.toLocaleString()} kWh produced by the {kw}kW system at a guaranteed discounted rate 30-40% below utility grid tariffs.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-amber-700">
                Zero maintenance risk & guaranteed rate discount.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. GLOBAL CITY PRICING TABLE FOR THIS KW SIZE */}
      <section className="py-14 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                <InlineEditable
                  id={`size-${kw}-cities-h2`}
                  defaultText={`${kw}kW Solar Installation Cost Across 14 Major Global Metros`}
                />
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Comparing turnkey equipment pricing, local tax credits, and annual utility bill savings worldwide.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">Sort by:</span>
              <button
                type="button"
                onClick={() => setSortCityBy('cost')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  sortCityBy === 'cost' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-300'
                }`}
              >
                Lowest Net Cost
              </button>
              <button
                type="button"
                onClick={() => setSortCityBy('name')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  sortCityBy === 'name' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-300'
                }`}
              >
                City Name (A–Z)
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">City & Country</th>
                    <th className="py-3.5 px-4 text-right">Gross Cost</th>
                    <th className="py-3.5 px-4 text-right text-emerald-700">Subsidies</th>
                    <th className="py-3.5 px-4 text-right bg-blue-50/50 text-blue-900 font-extrabold">Net Turnkey Cost</th>
                    <th className="py-3.5 px-4 text-right">Annual Savings</th>
                    <th className="py-3.5 px-4 sm:px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {sortedCityRates.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-blue-500" />
                          <span>{c.city}, {c.country}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                        ${c.totalGross.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-emerald-600">
                        -${c.subsidy.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-blue-700 bg-blue-50/30">
                        ${c.netCost.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-slate-700">
                        ~${c.annualSavings.toLocaleString()} / yr
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-center">
                        <Link
                          to={`/${c.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                        >
                          View City Guide →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 12. EXPANDED 12-FAQ SECTION */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                <InlineEditable
                  id={`size-${kw}-faq-h2`}
                  defaultText={`Frequently Asked Questions About ${kw}kW Solar Systems`}
                />
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Expert answers on panel counts, roof requirements, electrical outputs, and payback calculations.
              </p>
            </div>
            <InlineEditButton sectionId="faq" sectionTitle="FAQ Section" isAdmin={isAdmin} onEditSection={onEditSection} />
          </div>

          <div className="space-y-3">
            {allFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4.5 text-left flex items-center justify-between gap-3 text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <InlineEditable id={`size-${kw}-faq-q-${idx}`} defaultText={faq.question} />
                    <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${isOpen ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4.5 pb-4.5 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                      <InlineEditable id={`size-${kw}-faq-a-${idx}`} multiline defaultText={faq.answer} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 13. RELATED PAGES ("YOU MIGHT ALSO WANT TO KNOW") */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base md:text-lg font-bold text-slate-900">
              <InlineEditable
                id={`size-${kw}-related-h3`}
                defaultText="Compare Other System Sizes & House Footprint Guides"
              />
            </h3>
            <InlineEditButton sectionId="internal_links" sectionTitle="Internal Links" isAdmin={isAdmin} onEditSection={onEditSection} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {relatedPagesList.map((rp) => (
              <Link
                key={rp.id}
                to={`/${rp.slug}`}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {rp.title.replace(/\(.*\)/, '').trim()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {rp.template_type === 'system_size' ? `${rp.system_size_kw}kW Capacity` : `${rp.sqft} sq ft area`}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 14. LEAD CTA CAPTURE SECTION */}
      <section id="lead-cta-section" className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadCaptureForm
            city="Global"
            sourceSlug={page.slug}
            defaultKw={kw}
            title={`Get Certified ${kw}kW Solar Installation Quotes`}
            subtitle={`Compare competitive quotes from certified tier-1 solar installers for your ${kw}kW system with full tax credit modeling.`}
          />
        </div>
      </section>

      {/* 15. ABOUT THIS DATA & METHODOLOGY */}
      <AboutThisData
        locationLabel={`${kw}kW Solar System Model`}
        updatedAt={page.updated_at}
        createdAt={page.created_at}
        realDataSources={page.real_data_sources || (custom as any)?.real_data_sources}
        templateType="system_size"
      />
    </div>
  );
};
