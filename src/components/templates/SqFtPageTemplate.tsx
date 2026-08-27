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
  Home,
  Zap,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
  Clock,
  DollarSign,
  ChevronRight,
  ArrowRight,
  Sun,
  CheckCircle2,
  Globe,
  Leaf,
  BatteryCharging,
  SlidersHorizontal,
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
  Calculator
} from 'lucide-react';
import { PageRecord, FaqRecord, PageSectionId } from '../../types';
import { GLOBAL_CITIES } from '../../data/globalSolarData';
import { LeadCaptureForm } from '../common/LeadCaptureForm';
import { InlineEditable } from '../common/InlineEditable';
import { InlineEditButton } from './InlineEditButton';
import { AboutThisData } from '../common/AboutThisData';

interface SqFtPageTemplateProps {
  page: PageRecord;
  faqs?: FaqRecord[];
  allPages?: PageRecord[];
  isAdmin?: boolean;
  onEditSection?: (sectionId: PageSectionId, sectionTitle: string) => void;
}

export const SqFtPageTemplate: React.FC<SqFtPageTemplateProps> = ({
  page,
  faqs: initialFaqs = [],
  allPages = [],
  isAdmin = false,
  onEditSection = () => {},
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Priority: page.custom_content (AI generated) > calculations
  const custom = (page.custom_content && typeof page.custom_content === 'object' ? page.custom_content : {}) as Record<string, any>;

  const sqft = page.sqft || 2000;
  // Recommended kW based on standard residential rooftop load or AI
  const usableRoofSqFt = Math.round(sqft * 0.50);
  const recommendedKw = Number(custom.recommendedSystemSize?.kw) || page.system_size_kw || Math.max(3, Math.round((usableRoofSqFt / 65) * 10) / 10);
  const grossMin = page.avg_cost_min || Math.round(recommendedKw * 1150);
  const grossMax = page.avg_cost_max || Math.round(recommendedKw * 1550);
  const avgGross = Math.round((grossMin + grossMax) / 2);
  const subsidy = page.subsidy_amount || Math.round(avgGross * 0.30);
  const netCost = avgGross - subsidy;

  // Specs & Solar Geometry (AI custom_content > calculated fallback)
  const numPanels = Number(custom.systemSpecs?.panelCount || custom.systemSpecs?.panelsNeeded) || Math.ceil((recommendedKw * 1000) / 450);
  const requiredRoofSqFt = Number(custom.systemSpecs?.roofAreaSqFt || custom.systemSpecs?.areaNeeded) || Math.round(numPanels * 21.5);
  const unitsPerDay = Number(custom.systemSpecs?.unitsPerDay) || Math.round(recommendedKw * 4.3 * 10) / 10;
  const unitsPerMonth = Number(custom.systemSpecs?.unitsPerMonth) || Math.round(unitsPerDay * 30);
  const unitsPerYear = Number(custom.systemSpecs?.annualGenerationKwh) || Math.round(unitsPerDay * 365);
  const annualSavings = page.savings_per_year || Number(custom.stats?.annualSavings) || Math.round(unitsPerYear * 0.18);

  // Environmental Metrics (AI custom_content > calculated fallback)
  const co2AvoidedKg = Number(custom.environmentalImpact?.co2PerYear) || Math.round(unitsPerYear * 0.72);
  const treesPlanted = Number(custom.environmentalImpact?.treesEquivalent) || Math.round(co2AvoidedKg / 21);
  const kmNotDriven = Number(custom.environmentalImpact?.kmNotDriven) || Math.round(co2AvoidedKg * 5.8);
  const coalNotBurnedKg = Number(custom.environmentalImpact?.coalAvoided) || Math.round(unitsPerYear * 0.38);

  // Interactive Payback Calculator State
  const [calcMonthlyBill, setCalcMonthlyBill] = useState<number>(Math.round(sqft * 0.09));
  const [calcRatePerKwh, setCalcRatePerKwh] = useState<number>(0.18);
  const [calcEscalation, setCalcEscalation] = useState<number>(3.5);

  const calcAnnualSolarGen = recommendedKw * 1550;
  const calcAnnualBillSavings = Math.min(calcMonthlyBill * 12, Math.round(calcAnnualSolarGen * calcRatePerKwh));
  const calcPaybackYears = Math.max(2.8, Math.round((netCost / (calcAnnualBillSavings || 1)) * 10) / 10);

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

  // 12-Month Generation Data (AI custom_content > calculated fallback)
  const defaultMonthlyGeneration = [
    { month: 'Jan', generation: Math.round(recommendedKw * 95) },
    { month: 'Feb', generation: Math.round(recommendedKw * 105) },
    { month: 'Mar', generation: Math.round(recommendedKw * 135) },
    { month: 'Apr', generation: Math.round(recommendedKw * 148) },
    { month: 'May', generation: Math.round(recommendedKw * 165) },
    { month: 'Jun', generation: Math.round(recommendedKw * 170) },
    { month: 'Jul', generation: Math.round(recommendedKw * 168) },
    { month: 'Aug', generation: Math.round(recommendedKw * 155) },
    { month: 'Sep', generation: Math.round(recommendedKw * 138) },
    { month: 'Oct', generation: Math.round(recommendedKw * 120) },
    { month: 'Nov', generation: Math.round(recommendedKw * 100) },
    { month: 'Dec', generation: Math.round(recommendedKw * 90) },
  ];

  const rawMonthly = custom.monthlyGenerationData || custom.monthlyGeneration;
  const monthlyGenerationData = (Array.isArray(rawMonthly) && rawMonthly.length > 0)
    ? rawMonthly.map((m: any, i: number) => ({
        month: m.month || defaultMonthlyGeneration[i]?.month || `M${i+1}`,
        generation: Number(m.units || m.generation) || defaultMonthlyGeneration[i]?.generation || Math.round(recommendedKw * 120),
      }))
    : defaultMonthlyGeneration;

  // Itemized Cost Breakdown Rows (AI custom_content > calculated fallback)
  const defaultBreakdownRows = [
    {
      item: `Tier-1 PV Modules (${numPanels}x 450W Monocrystalline Panels)`,
      specs: 'High-efficiency N-Type TOPCon with 25-yr warranty',
      min: Math.round(grossMin * 0.40),
      avg: Math.round(avgGross * 0.40),
      max: Math.round(grossMax * 0.40),
    },
    {
      item: 'Solar Power Inverter (Smart Grid-Tied / Microinverters)',
      specs: '98% efficiency with mobile phone system monitoring app',
      min: Math.round(grossMin * 0.20),
      avg: Math.round(avgGross * 0.20),
      max: Math.round(grossMax * 0.20),
    },
    {
      item: `Roof Mounting Rails, Flashings & Waterproof Clamps`,
      specs: `Engineered for ${sqft} sq ft rooftop geometry and wind uplift`,
      min: Math.round(grossMin * 0.11),
      avg: Math.round(avgGross * 0.11),
      max: Math.round(grossMax * 0.11),
    },
    {
      item: 'Electrical Balance of System (AC/DC DB, Isolators, Conduit)',
      specs: 'NEC compliant solar DC cables and surge protection devices',
      min: Math.round(grossMin * 0.12),
      avg: Math.round(avgGross * 0.12),
      max: Math.round(grossMax * 0.12),
    },
    {
      item: 'Certified Turnkey Installation Labor & Electrical Hookup',
      specs: 'Licensed master electrician installation and safety sign-off',
      min: Math.round(grossMin * 0.10),
      avg: Math.round(avgGross * 0.10),
      max: Math.round(grossMax * 0.10),
    },
    {
      item: 'Utility Permitting, Net Metering & Interconnection Filing',
      specs: 'Turnkey municipal permits and bi-directional meter setup',
      min: Math.round(grossMin * 0.05),
      avg: Math.round(avgGross * 0.05),
      max: Math.round(grossMax * 0.05),
    },
    {
      item: 'Year 1 Comprehensive Maintenance & Diagnostic Health Check',
      specs: 'Full infrared thermal scan and connection torque verification',
      min: Math.round(grossMin * 0.02),
      avg: Math.round(avgGross * 0.02),
      max: Math.round(grossMax * 0.02),
    },
  ];

  const rawBreakdown = custom.costBreakdownTable || custom.costBreakdown;
  const breakdownRows = (Array.isArray(rawBreakdown) && rawBreakdown.length > 0)
    ? rawBreakdown.map((row: any) => ({
        item: row.item,
        specs: row.specs || 'Certified solar component & labor specification',
        min: Number(row.min) || Math.round(grossMin * 0.15),
        avg: Number(row.avg || row.mid) || Math.round(avgGross * 0.15),
        max: Number(row.max) || Math.round(grossMax * 0.15),
      }))
    : defaultBreakdownRows;

  // 12 Comprehensive Long-tail FAQs
  const templateFaqs = [
    {
      question: `How much does solar cost for a ${sqft} sq ft house in 2026?`,
      answer: `In 2026, solar installation for a ${sqft} sq ft house typically requires a ${recommendedKw}kW system costing between $${grossMin.toLocaleString()} and $${grossMax.toLocaleString()} gross. After the 30% clean energy tax credit or regional subsidies, the net cost is approximately $${netCost.toLocaleString()}, generating $${annualSavings.toLocaleString()} in annual power bill savings with payback in 4.2 to 5.5 years.`
    },
    {
      question: `How many solar panels are needed for a ${sqft} sq ft house?`,
      answer: `A standard ${sqft} sq ft residential home typically requires ${numPanels} to ${numPanels + 2} modern 450W solar panels to offset 90% to 100% of average electricity usage. This layout occupies about ${requiredRoofSqFt} square feet of unobstructed roof area.`
    },
    {
      question: `What size solar system is recommended for a ${sqft} sq ft home?`,
      answer: `A ${recommendedKw}kW system is the standard recommendation for a ${sqft} sq ft house with moderate-to-high electricity consumption (including central air conditioning, heating, refrigeration, and consumer electronics).`
    },
    {
      question: `How much roof space is required for solar on a ${sqft} sq ft house?`,
      answer: `Each modern solar panel requires approximately 21.5 sq ft. For a ${recommendedKw}kW system with ${numPanels} panels, you will need approximately ${requiredRoofSqFt} sq ft of south or west-facing roof space free of heavy tree shading, dormers, or chimneys.`
    },
    {
      question: `How much electricity will a ${sqft} sq ft house solar system generate?`,
      answer: `A ${recommendedKw}kW rooftop system generates approximately ${unitsPerDay} kWh per day and roughly ${unitsPerYear.toLocaleString()} kWh per year. In sunny regions, annual production can reach up to ${(recommendedKw * 1700).toLocaleString()} kWh.`
    },
    {
      question: `Will solar panels eliminate the electric bill for a ${sqft} sq ft home?`,
      answer: `Yes, in areas with standard 1:1 net metering, your solar array will offset virtually 100% of energy usage charges. You will only pay a nominal monthly grid connection fee (typically $10 to $20/month) to your local utility.`
    },
    {
      question: `Can I add battery storage to a ${sqft} sq ft house solar system?`,
      answer: `Yes. A 10kWh to 15kWh lithium-ion battery system (such as Tesla Powerwall or Enphase 5P) can be integrated during installation or added later, providing seamless blackout protection and overnight self-powering.`
    },
    {
      question: `How do I know if my ${sqft} sq ft home's roof is suitable for solar?`,
      answer: `Ideal roofs are less than 15 years old, receive at least 4 to 5 hours of direct unshaded sunlight daily, and have composite shingle, metal, or concrete tile roofing with a slope between 15° and 35°.`
    },
    {
      question: `How does roof orientation affect solar savings on a ${sqft} house?`,
      answer: `South-facing roofs yield 100% of maximum rated solar output in the Northern Hemisphere. West and east-facing roofs generate 80% to 90% of potential power, which is still highly profitable.`
    },
    {
      question: `What warranties come with a solar installation on a ${sqft} sq ft home?`,
      answer: `High-quality solar packages include a 25 to 30-year performance guarantee on panels (85%+ output), 10 to 25 years on inverters, and a 10-year watertight roof penetration warranty from the certified installer.`
    },
    {
      question: `How much does solar increase the property value of a ${sqft} sq ft house?`,
      answer: `National real estate research indicates that solar panels increase home equity value by 4.1% on average (an increase of over $16,000 to $25,000 on typical residential homes) while remaining exempt from property tax increases in most jurisdictions.`
    },
    {
      question: `What is the step-by-step process to install solar on a ${sqft} sq ft house?`,
      answer: `The process takes 3 to 6 weeks: (1) Rooftop engineering scan & design, (2) City building permit & utility interconnection filing, (3) 1-day physical panel and electrical installation, and (4) City inspection and utility Net Meter PTO (Permission to Operate) activation.`
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
      return initialFaqs.map(f => ({ question: f.question, answer: f.answer }));
    }
    return templateFaqs;
  }, [custom.faqs, initialFaqs, templateFaqs]);

  const allHowToSteps = useMemo(() => {
    if (Array.isArray(custom.howToSteps) && custom.howToSteps.length > 0) {
      return custom.howToSteps.map((s: any, idx: number) => ({
        '@type': 'HowToStep',
        name: s.step || s.title || `Step ${idx + 1}`,
        text: s.description || s.desc || '',
        position: idx + 1
      }));
    }
    return [
      {
        '@type': 'HowToStep',
        name: 'Analyze Monthly Electricity Usage',
        text: `Review your past 12 months of utility electric bills to determine average monthly kilowatt-hour (kWh) consumption (typically 500-900 kWh for a ${sqft} sq ft house).`,
        position: 1
      },
      {
        '@type': 'HowToStep',
        name: 'Measure Unshaded Rooftop Area',
        text: `Calculate available south or west-facing roof space. A ${recommendedKw}kW system requires approximately ${requiredRoofSqFt} square feet of unshaded area.`,
        position: 2
      },
      {
        '@type': 'HowToStep',
        name: 'Select System Capacity and Hardware Tier',
        text: `Size the system at ~${recommendedKw}kW with ${numPanels} tier-1 450W monocrystalline modules and high-efficiency string or microinverters.`,
        position: 3
      },
      {
        '@type': 'HowToStep',
        name: 'Calculate Clean Energy Tax Credits and Net Payback',
        text: `Deduct 30% federal clean energy tax credits to establish net out-of-pocket investment of ~$${netCost.toLocaleString()} with ~${calcPaybackYears} year breakeven.`,
        position: 4
      }
    ];
  }, [custom.howToSteps, sqft, recommendedKw, requiredRoofSqFt, numPanels, netCost, calcPaybackYears]);

  const otherSqFtPages = allPages.filter((p) => p.template_type === 'sqft' && p.slug !== page.slug).slice(0, 3);
  const sizePages = allPages.filter((p) => p.template_type === 'system_size').slice(0, 3);
  const relatedPagesList = [...otherSqFtPages, ...sizePages].slice(0, 6);

  // Structured HowTo Schema JSON-LD for Search Engines
  const howToSchemaJson = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate Solar System Size and Cost for a ${sqft} Sq Ft House`,
    description: `Step-by-step methodology to calculate rooftop solar panel requirements, inverter capacity, and cost for a ${sqft} square foot residential home.`,
    totalTime: 'PT15M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: netCost
    },
    step: allHowToSteps
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
      {/* HowTo & FAQ JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchemaJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJson) }} />

      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-12 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 flex-wrap">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/#roof-sizes" className="hover:text-blue-600 transition-colors">Roof Size Guides</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-bold">{sqft} Sq Ft House</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
                  <Home className="w-3.5 h-3.5 text-purple-600" /> {sqft} Sq Ft (~{Math.round(sqft / 10.76)} m²) Property
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" /> {page.updated_at ? `Data Updated ${new Date(page.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : '2026 Price Index'}
                </span>
                {subsidy > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Incentives Qualified
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                  <InlineEditable
                    id={`sqft-${sqft}-h1`}
                    defaultText={custom.h1 || page.h1 || page.title || `How Much Does Solar Cost for a ${sqft} Sq Ft House in 2026?`}
                    as="span"
                  />
                </h1>
                <InlineEditButton sectionId="hero" sectionTitle="Hero Section" isAdmin={isAdmin} onEditSection={onEditSection} />
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                <InlineEditable
                  id={`sqft-${sqft}-desc`}
                  multiline
                  defaultText={custom.heroSubtitle || page.hero_subtitle || `Complete 2026 solar cost, system capacity, and ROI breakdown for a ${sqft} sq ft residential home. Learn recommended system size (${recommendedKw}kW), required panel count (${numPanels} panels), monthly electric bill offsets, and 25-year financial savings.`}
                  as="span"
                />
              </p>

              {/* AEO/GEO Quick Answer Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-purple-900 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-purple-600" /> Quick Answer: Solar Cost for a {sqft} Sq Ft House
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  <InlineEditable
                    id={`sqft-${sqft}-quick-answer`}
                    multiline
                    defaultText={custom.quickAnswer || page.quick_answer || `Installing solar on a ${sqft} sq ft house typically costs between $${grossMin.toLocaleString()} and $${grossMax.toLocaleString()} gross for a recommended ${recommendedKw}kW system (${numPanels} panels). After applying the 30% clean energy tax credit, the net out-of-pocket cost is approximately $${netCost.toLocaleString()}. It generates ~${unitsPerYear.toLocaleString()} kWh annually, saving ~$${annualSavings.toLocaleString()} per year with full breakeven in 4.0 to 5.2 years.`}
                    as="span"
                  />
                </p>
              </div>
            </div>

            {/* Recommended System Size Card */}
            <div className="lg:w-80 bg-white p-5 rounded-2xl border border-purple-200 shadow-lg shadow-purple-600/5 space-y-3 shrink-0">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <InlineEditable id={`sqft-${sqft}-card-header`} defaultText="Recommended Solar Capacity" />
              </div>
              <div className="text-3xl font-black text-purple-700">
                {recommendedKw} kW System
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Net cost of ~${netCost.toLocaleString()} after 30% tax credit. Fits easily on ~{requiredRoofSqFt} sq ft of roof.
              </p>
              <a
                href="#lead-cta-section"
                className="block text-center py-2.5 px-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                Get Quotes for {sqft} sq ft House →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIFICATIONS STATS CARDS */}
      <section className="py-8 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200/80">
              <div className="text-xs font-semibold text-purple-700 mb-1">Recommended Size</div>
              <div className="text-xl md:text-2xl font-black text-slate-900">{recommendedKw} kW DC</div>
              <span className="text-[11px] text-slate-500">{numPanels} Premium 450W Panels</span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80">
              <div className="text-xs font-semibold text-blue-700 mb-1">Net Installed Cost</div>
              <div className="text-xl md:text-2xl font-black text-slate-900">${netCost.toLocaleString()}</div>
              <span className="text-[11px] text-emerald-700 font-medium">After 30% Tax Credit</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
              <div className="text-xs font-semibold text-emerald-700 mb-1">Roof Space Required</div>
              <div className="text-xl md:text-2xl font-black text-slate-900">~{requiredRoofSqFt} sq ft</div>
              <span className="text-[11px] text-slate-500">Only {Math.round((requiredRoofSqFt / usableRoofSqFt) * 100)}% of roof area</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <div className="text-xs font-semibold text-amber-700 mb-1">Annual Bill Savings</div>
              <div className="text-xl md:text-2xl font-black text-slate-900">~${annualSavings.toLocaleString()} / yr</div>
              <span className="text-[11px] text-emerald-700 font-medium">~{calcPaybackYears} yr payback</span>
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
                  id={`sqft-${sqft}-table-h2`}
                  defaultText={`Itemized Solar Cost Breakdown for a ${sqft} Sq Ft House`}
                />
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Estimated equipment bill of materials, mounting hardware, and electrical labor for a {recommendedKw}kW system.
              </p>
            </div>
            <InlineEditButton sectionId="cost_breakdown" sectionTitle="Cost Breakdown" isAdmin={isAdmin} onEditSection={onEditSection} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Component & Specification</th>
                    <th className="py-3.5 px-4 text-right">Economy Tier</th>
                    <th className="py-3.5 px-4 text-right bg-purple-50/50 text-purple-900 font-extrabold">Average Cost ($)</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Premium Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {breakdownRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="font-semibold text-slate-900">
                          <InlineEditable id={`sqft-${sqft}-table-item-${idx}`} defaultText={row.item} />
                        </div>
                        <div className="text-[11px] text-slate-500">{row.specs}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                        ${row.min.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-purple-700 bg-purple-50/30">
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
                    <td className="py-3.5 px-4 sm:px-6">Total Gross Turnkey Installation</td>
                    <td className="py-3.5 px-4 text-right">${grossMin.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right text-purple-700 bg-purple-50/60 font-black">${avgGross.toLocaleString()}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">${grossMax.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE PAYBACK & SAVINGS CALCULATOR */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              <InlineEditable
                id={`sqft-${sqft}-calc-h2`}
                defaultText={`Calculate Your Real-Time Solar Payback for a ${sqft} Sq Ft House`}
              />
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Adjust monthly electricity bills and utility rates to see your exact breakeven timeline and 25-year returns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Current Monthly Electric Bill ($)
                  </label>
                  <span className="text-base font-black text-purple-700">${calcMonthlyBill}/mo</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="700"
                  step="10"
                  value={calcMonthlyBill}
                  onChange={(e) => setCalcMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Electricity Tariff Rate ($/kWh)
                  </label>
                  <span className="text-base font-black text-purple-700">${calcRatePerKwh.toFixed(2)}/kWh</span>
                </div>
                <input
                  type="range"
                  min="0.08"
                  max="0.45"
                  step="0.01"
                  value={calcRatePerKwh}
                  onChange={(e) => setCalcRatePerKwh(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Annual Rate Increase (%)
                  </label>
                  <span className="text-base font-black text-purple-700">{calcEscalation}% / yr</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={calcEscalation}
                  onChange={(e) => setCalcEscalation(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-xs font-semibold text-emerald-800 mb-1">Payback Period</div>
                <div className="text-3xl font-black text-slate-900">{calcPaybackYears} Years</div>
                <p className="text-xs text-slate-600 mt-1">Full recovery of net out-of-pocket cost</p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200">
                <div className="text-xs font-semibold text-purple-800 mb-1">Year 1 Utility Savings</div>
                <div className="text-3xl font-black text-slate-900">${calcAnnualBillSavings.toLocaleString()}</div>
                <p className="text-xs text-slate-600 mt-1">Direct monthly electricity bill offset</p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-blue-800 mb-1">25-Year Net Cumulative Return</div>
                    <div className="text-3xl sm:text-4xl font-black text-blue-900">
                      ${calc25YearSavings.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-slate-500 font-semibold">10-Year Return</div>
                    <div className="text-xl font-bold text-slate-800">${calc10YearSavings.toLocaleString()}</div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Net lifetime financial profit generated after paying off the ${netCost.toLocaleString()} solar installation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ENVIRONMENTAL IMPACT SECTION */}
      <section className="py-14 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold mb-3 border border-emerald-400/30">
              <Leaf className="w-3.5 h-3.5" /> Carbon Footprint Reduction
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              <InlineEditable
                id={`sqft-${sqft}-env-h2`}
                defaultText={`What Is the Environmental Impact of Solar on a ${sqft} Sq Ft House?`}
              />
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Transforming your {sqft} sq ft rooftop into a clean power plant produces tangible ecological benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black">{co2AvoidedKg.toLocaleString()} kg</div>
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">CO2 Avoided / Year</div>
              <p className="text-[11px] text-slate-300">{(co2AvoidedKg * 25 / 1000).toFixed(1)} tons avoided over 25 years</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto text-green-400">
                <TreeDeciduous className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black">{treesPlanted.toLocaleString()} Trees</div>
              <div className="text-xs font-bold text-green-300 uppercase tracking-wider">Equivalent Trees Planted</div>
              <p className="text-[11px] text-slate-300">Equivalent carbon offset of a mature forest</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
                <Car className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black">{kmNotDriven.toLocaleString()} km</div>
              <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">Vehicle Kilometers Offset</div>
              <p className="text-[11px] text-slate-300">Gasoline vehicle emissions avoided</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
                <Flame className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black">{coalNotBurnedKg.toLocaleString()} kg</div>
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Coal Not Burned / Year</div>
              <p className="text-[11px] text-slate-300">Fossil fuel extraction prevented</p>
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
                  id={`sqft-${sqft}-chart-h2`}
                  defaultText={`Monthly Solar Output (kWh) for a ${sqft} Sq Ft House`}
                />
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Estimated monthly energy production reflecting seasonal sun peak hours across a 12-month calendar.
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
                    formatter={(value: any) => [`${value} kWh`, 'Estimated Output']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="generation" name="Monthly Generation (kWh)" fill="#7c3aed" radius={[6, 6, 0, 0]}>
                    {monthlyGenerationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index >= 4 && index <= 7 ? '#8b5cf6' : '#a78bfa'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
              <span>Total Annual Yield: <strong className="text-slate-900 font-bold">~{unitsPerYear.toLocaleString()} kWh</strong></span>
              <span>Summer Peak: <strong className="text-purple-700 font-bold">May–July (~165-170 kWh/mo)</strong></span>
              <span>Winter Baseline: <strong className="text-slate-700 font-bold">Dec–Jan (~90-95 kWh/mo)</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ON-GRID VS HYBRID VS OFF-GRID COMPARISON CARDS */}
      <section className="py-14 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              <InlineEditable
                id={`sqft-${sqft}-types-h2`}
                defaultText={`On-Grid vs Hybrid vs Off-Grid: Best Wiring Setup for a ${sqft} Sq Ft House`}
              />
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Compare turnkey grid-tied, hybrid battery backup, and off-grid configurations for a {sqft} sq ft residence ({recommendedKw}kW system).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border-2 border-purple-500 shadow-md space-y-4 relative">
              <div className="inline-flex px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-black uppercase tracking-wider">
                Recommended for {sqft} Sq Ft Homes
              </div>
              <h3 className="text-xl font-bold text-slate-900">On-Grid: Best Fit for Most {sqft} Sq Ft Suburban Homes</h3>
              <div className="text-2xl font-black text-purple-700">${netCost.toLocaleString()} <span className="text-xs font-normal text-slate-500">Net Turnkey</span></div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Fastest payback ({calcPaybackYears} yrs) & highest 25-yr financial return (+${calc25YearSavings.toLocaleString()})</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Offsets {Math.round(unitsPerMonth)} kWh/month of household utility power consumption</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Full 1:1 net energy metering bill credits on surplus power exports</li>
                <li className="flex items-start gap-1.5"><X className="w-4 h-4 text-rose-500 shrink-0" /> Automatically disconnects during utility grid outages</li>
              </ul>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                <strong>Best for:</strong> Homeowners looking to eliminate ~${Math.round(calcAnnualBillSavings / 12)}/month electric bills with the lowest upfront investment.
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-black uppercase tracking-wider">
                Solar + {recommendedKw <= 4 ? '5 kWh' : recommendedKw <= 8 ? '10–13.5 kWh' : '20–27 kWh'} Storage
              </div>
              <h3 className="text-xl font-bold text-slate-900">Hybrid: Outage Protection for Larger {sqft} Sq Ft Loads</h3>
              <div className="text-2xl font-black text-blue-700">${Math.round(netCost + (recommendedKw <= 4 ? 4500 : recommendedKw <= 8 ? 8500 : 15000)).toLocaleString()} <span className="text-xs font-normal text-slate-500">Net Turnkey</span></div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> {recommendedKw <= 5 ? '12–18 hrs essential backup (refrigerator, lights, WiFi, sump pump)' : '24–36 hrs whole-home power (including 1-2 inverter AC units)'}</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Eliminates peak evening Time-Of-Use (TOU) utility rates</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> LFP safe chemistry battery with 10-year warranty</li>
                <li className="flex items-start gap-1.5"><X className="w-4 h-4 text-amber-500 shrink-0" /> Battery bank adds $4,500 – $8,500 to initial budget</li>
              </ul>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                <strong>Best for:</strong> {sqft} sq ft homes in storm-prone regions or areas with NEM 3.0 export rules.
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="inline-flex px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-black uppercase tracking-wider">
                {Math.round(recommendedKw * 2.8)} kWh Standalone Bank
              </div>
              <h3 className="text-xl font-bold text-slate-900">Off-Grid: Viable Only for Remote {sqft} Sq Ft Properties</h3>
              <div className="text-2xl font-black text-slate-900">${Math.round(avgGross * 1.95).toLocaleString()} <span className="text-xs font-normal text-slate-500">Gross</span></div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> 100% independence from utility power companies and grid transmission fees</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Sized for {Math.round(recommendedKw * 1.2)}kVA pure sine wave off-grid inverter</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Auto-generator start (AGS) support for prolonged winter storms</li>
                <li className="flex items-start gap-1.5"><X className="w-4 h-4 text-rose-500 shrink-0" /> Requires strict seasonal power management</li>
              </ul>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                <strong>Best for:</strong> Rural homesteads and remote cabins where utility grid connection costs exceed $15,000.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5. ROOFTOP FEASIBILITY & STRUCTURAL GEOMETRY */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                <InlineEditable
                  id={`sqft-${sqft}-geometry-h2`}
                  defaultText={`Rooftop Geometry & Solar Feasibility for a ${sqft} Sq Ft House`}
                />
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                How panel dimensions, fire setbacks, and roof orientation map across a {sqft} sq ft building footprint.
              </p>
            </div>
            <InlineEditButton sectionId="geometry" sectionTitle="Rooftop Geometry" isAdmin={isAdmin} onEditSection={onEditSection} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
              <div className="text-xs font-bold text-purple-700 uppercase">Usable Solar Roof Area</div>
              <div className="text-2xl font-black text-purple-950">~{usableRoofSqFt} Sq Ft</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Represents ~50% of the total {sqft} sq ft footprint, factoring in roof pitch, dormers, chimneys, and 3-foot perimeter fire department setbacks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
              <div className="text-xs font-bold text-blue-700 uppercase">Array Footprint ({numPanels} Panels)</div>
              <div className="text-2xl font-black text-blue-950">{requiredRoofSqFt} Sq Ft</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Utilizes {Math.min(95, Math.round((requiredRoofSqFt / usableRoofSqFt) * 100))}% of the usable sunny roof plane, leaving ample room for future panel expansion or HVAC access.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <div className="text-xs font-bold text-emerald-700 uppercase">Added Structural Weight</div>
              <div className="text-2xl font-black text-emerald-950">~2.7 lbs / Sq Ft</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lightweight aluminum racking and 450W glass-backsheet modules add negligible dead load, well within standard residential 25-30 lbs/sq ft building limits.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
              <div className="text-xs font-bold text-amber-700 uppercase">Ideal Pitch & Orientation</div>
              <div className="text-2xl font-black text-amber-950">25°–35° South/West</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                South and West-facing roof planes capture optimal sun hours, generating ~{unitsPerDay} kWh/day with high annual efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. GOVERNMENT INCENTIVES & SUBSIDIES */}
      <section className="py-14 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              <InlineEditable
                id={`sqft-${sqft}-incentives-h2`}
                defaultText={`Incentives That Cut the Net Solar Cost for a ${sqft} Sq Ft Property`}
              />
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Federal clean energy tax credits, feed-in tariffs, and sales tax exemptions computed for a {recommendedKw}kW system on a {sqft} sq ft home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-purple-700 uppercase">30% Clean Energy Credit</div>
              <h3 className="text-base font-bold text-slate-900">30% Clean Energy ITC: ${Math.round(avgGross * 0.30).toLocaleString()} Back on Your {sqft} Sq Ft Install</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct dollar-for-dollar reduction on federal/national tax liability, returning 30% of total turnkey hardware and labor costs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-blue-700 uppercase">Net Energy Metering (NEM)</div>
              <h3 className="text-base font-bold text-slate-900">Export Credits: ${Math.round(unitsPerYear * 0.42 * 0.12).toLocaleString()}/yr Net Metering Return</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Surplus solar power (~{Math.round(unitsPerYear * 0.42).toLocaleString()} kWh/yr) exported during peak midday hours credits your utility electricity bill.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-emerald-700 uppercase">Sales & Property Tax Exemption</div>
              <h3 className="text-base font-bold text-slate-900">Sales Tax Exemption: ${Math.round(avgGross * 0.08).toLocaleString()} Saved on Equipment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero sales tax on equipment and 100% exemption from property tax assessment increases for the added equity on your {sqft} sq ft home.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-amber-700 uppercase">STCs & Utility Rebates</div>
              <h3 className="text-base font-bold text-slate-900">State Solar Rebate: ${Math.round(recommendedKw * 13.2 * 38).toLocaleString()} for Your Roof Size</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant point-of-sale discounts and marketable renewable certificates applied directly to reduce your final installer invoice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. MAINTENANCE COSTS & SYSTEM WARRANTY */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              <InlineEditable
                id={`sqft-${sqft}-maint-h2`}
                defaultText={`What Are the Ongoing Maintenance Costs for a ${sqft} Sq Ft House?`}
              />
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Annual upkeep, panel cleaning schedules for {numPanels} modules, and manufacturer warranty expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Maintenance Service ({numPanels} Panels)</th>
                    <th className="py-3.5 px-4">Interval</th>
                    <th className="py-3.5 px-4 text-right">Estimated Cost ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Panel Rinsing & Washing ({numPanels} modules)</td>
                    <td className="py-3.5 px-4">1–2 times / year</td>
                    <td className="py-3.5 px-4 text-right font-medium">${Math.max(75, Math.round(numPanels * 8))} – ${Math.max(110, Math.round(numPanels * 12))}</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Electrical Diagnostic & Wiring Check</td>
                    <td className="py-3.5 px-4">Every 3–4 Years</td>
                    <td className="py-3.5 px-4 text-right font-medium">${Math.round(130 + recommendedKw * 10)} – ${Math.round(180 + recommendedKw * 14)}</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">String Inverter Replacement Fund</td>
                    <td className="py-3.5 px-4">Year 12–15</td>
                    <td className="py-3.5 px-4 text-right font-bold text-purple-700">${Math.round(recommendedKw <= 4 ? 850 : recommendedKw <= 8 ? 1350 : 2100).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Mobile Telemetry Cloud App</td>
                    <td className="py-3.5 px-4">24/7 Real-Time</td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-600">Free ($0)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-600" /> Warranty Protection Summary
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">25-Year Linear Power Output</span>
                  <span className="font-bold text-purple-700">Guarantees 87.4%+ output at Year 25</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Inverter Manufacturer Warranty</span>
                  <span className="font-bold text-purple-700">12 to 25 Years (Microinverters)</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Rooftop Watertight Workmanship</span>
                  <span className="font-bold text-purple-700">10-Year Watertight Seal Guarantee</span>
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
                id={`sqft-${sqft}-finance-h2`}
                defaultText={`How to Fund Solar on a ${sqft} Sq Ft Home: All Payment Paths`}
              />
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Compare direct cash purchases, zero-down solar green loans, leases, and PPAs sized for a {sqft} sq ft property.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="text-xs font-black text-purple-700 uppercase">Option 1: Cash</div>
              <h3 className="text-base font-bold text-slate-900">Outright Purchase: Best Long-Term Value for {sqft} Sq Ft Owners</h3>
              <div className="text-xl font-black text-slate-900">${netCost.toLocaleString()} <span className="text-xs font-normal text-slate-500">Net</span></div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full ownership with maximum lifetime ROI. Capture 100% of the ${subsidy.toLocaleString()} tax credit with zero interest expense.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-purple-700">
                25-Yr Net Gain: +${calc25YearSavings.toLocaleString()}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-emerald-500 space-y-3 shadow-md relative">
              <span className="absolute -top-3 left-4 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
                Most Popular
              </span>
              <div className="text-xs font-black text-emerald-600 uppercase">Option 2: Green Loan</div>
              <h3 className="text-base font-bold text-slate-900">Secured Solar Loan: Keep Savings From Day 1</h3>
              <div className="text-xl font-black text-emerald-700">~${Math.round(netCost * 0.0089)} / mo</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                15-year 6.99% fixed loan. Monthly payment of ~${Math.round(netCost * 0.0089)} is lower than eliminated utility bill (~${Math.round(calcAnnualBillSavings / 12)}/mo).
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                Immediate Net Cashflow Positive
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="text-xs font-black text-blue-600 uppercase">Option 3: Lease</div>
              <h3 className="text-base font-bold text-slate-900">Operating Lease: No Ownership, Predictable Monthly Solar Rate</h3>
              <div className="text-xl font-black text-blue-700">~${Math.round(recommendedKw * 17)} / mo</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fixed monthly equipment rental fee. Third-party provider monitors and repairs the {numPanels} panels for 20–25 years.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-blue-700">
                Best for: Homeowners without personal tax liability.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="text-xs font-black text-amber-600 uppercase">Option 4: PPA</div>
              <h3 className="text-base font-bold text-slate-900">Power Purchase Agreement: Pay Only for What Your Roof Generates</h3>
              <div className="text-xl font-black text-amber-700">~${(0.12).toFixed(2)} / kWh</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pay only for the ~{unitsPerYear.toLocaleString()} kWh generated at a locked, guaranteed discount per kilowatt-hour.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-amber-700">
                Zero maintenance risk & guaranteed savings.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. EXPANDED 12-FAQ SECTION */}
      <section className="py-14 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                <InlineEditable
                  id={`sqft-${sqft}-faq-h2`}
                  defaultText={`Frequently Asked Questions: Solar for a ${sqft} Sq Ft House`}
                />
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Detailed answers on panel counts, roof layout requirements, outputs, and financial payback.
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
                    className="w-full p-4.5 text-left flex items-center justify-between gap-3 text-sm font-bold text-slate-900 hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    <InlineEditable id={`sqft-${sqft}-faq-q-${idx}`} defaultText={faq.question} />
                    <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${isOpen ? 'rotate-90 text-purple-600' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4.5 pb-4.5 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                      <InlineEditable id={`sqft-${sqft}-faq-a-${idx}`} multiline defaultText={faq.answer} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. RELATED PAGES ("YOU MIGHT ALSO WANT TO KNOW") */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base md:text-lg font-bold text-slate-900">
              <InlineEditable
                id={`sqft-${sqft}-related-h3`}
                defaultText="Explore Nearby House Sizes & Matching kW Capacity Guides"
              />
            </h3>
            <InlineEditButton sectionId="internal_links" sectionTitle="Internal Links" isAdmin={isAdmin} onEditSection={onEditSection} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {relatedPagesList.map((rp) => (
              <Link
                key={rp.id}
                to={`/${rp.slug}`}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all group flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {rp.title.replace(/\(.*\)/, '').trim()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {rp.template_type === 'sqft' ? `${rp.sqft} sq ft property` : `${rp.system_size_kw}kW System Size`}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 13. LEAD CTA FORM */}
      <section id="lead-cta-section" className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadCaptureForm
            city="Global"
            sourceSlug={page.slug}
            defaultKw={recommendedKw}
            title={`Get Free Solar Installation Quotes for ${sqft} Sq Ft House`}
            subtitle={`Compare competitive bids from certified local solar contractors for your ${sqft} sq ft home with full 30% tax credit modeling.`}
          />
        </div>
      </section>

      {/* 14. ABOUT THIS DATA & METHODOLOGY */}
      <AboutThisData
        locationLabel={`${sqft} Sq Ft Residential Property Model`}
        updatedAt={page.updated_at}
        createdAt={page.created_at}
        realDataSources={page.real_data_sources || (custom as any)?.real_data_sources}
        templateType="sqft"
      />
    </div>
  );
};
