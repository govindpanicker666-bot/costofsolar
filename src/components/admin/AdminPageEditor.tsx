import React, { useState } from 'react';
import {
  Save,
  ArrowLeft,
  Eye,
  GripVertical,
  Plus,
  Trash2,
  MapPin,
  Zap,
  Home,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
  Users,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  RefreshCw,
  Clock,
  Cpu,
  Bot,
  Sliders,
  DollarSign,
  Search,
  FileText,
} from 'lucide-react';
import {
  PageRecord,
  TemplateType,
  PageSectionId,
  FaqRecord,
  InstallerRecord,
} from '../../types';
import { CityPageTemplate } from '../templates/CityPageTemplate';
import { SystemSizeTemplate } from '../templates/SystemSizeTemplate';
import { SqFtPageTemplate } from '../templates/SqFtPageTemplate';
import { AiContentGeneratorPanel } from './AiContentGeneratorPanel';
import { regenerateAiSection } from '../../lib/geminiApi';

interface AdminPageEditorProps {
  initialPage?: PageRecord | null;
  onSave: (page: PageRecord, faqs: FaqRecord[], installers: InstallerRecord[]) => void;
  onCancel: () => void;
}

export const AdminPageEditor: React.FC<AdminPageEditorProps> = ({
  initialPage,
  onSave,
  onCancel,
}) => {
  const [activeStep, setActiveStep] = useState<'ai_generator' | 'details' | 'sections' | 'faqs' | 'installers' | 'preview'>('ai_generator');
  const isNew = !initialPage;

  // Form State
  const [templateType, setTemplateType] = useState<TemplateType>(
    initialPage?.template_type || 'city'
  );
  const [title, setTitle] = useState(initialPage?.title || '');
  const [slug, setSlug] = useState(initialPage?.slug || '');
  const [metaTitle, setMetaTitle] = useState(initialPage?.meta_title || '');
  const [metaDesc, setMetaDesc] = useState(initialPage?.meta_description || '');
  const [status, setStatus] = useState<'published' | 'draft'>(initialPage?.status || 'published');

  // Custom AI Generated text & JSON blobs
  const [heroSubtitle, setHeroSubtitle] = useState<string>(
    initialPage?.custom_content?.heroSubtitle || ''
  );
  const [quickAnswer, setQuickAnswer] = useState<string>(
    initialPage?.custom_content?.quickAnswer || ''
  );
  const [ctaHeadline, setCtaHeadline] = useState<string>(
    initialPage?.custom_content?.ctaHeadline || ''
  );
  const [ctaSubtext, setCtaSubtext] = useState<string>(
    initialPage?.custom_content?.ctaSubtext || ''
  );
  const [customData, setCustomData] = useState<Record<string, any>>(
    initialPage?.custom_content ? { ...initialPage.custom_content } : {}
  );

  // AI Generation telemetry
  const [aiMeta, setAiMeta] = useState<{ model: string; tokens: number; durationMs: number } | null>(null);
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);

  // Specific Data fields - clean defaults with no hardcoded assumptions
  const [city, setCity] = useState(initialPage?.city || '');
  const [state, setState] = useState(initialPage?.state || '');
  const [country, setCountry] = useState(initialPage?.custom_content?.country || '');
  const [currencySymbol, setCurrencySymbol] = useState(initialPage?.custom_content?.currency || '$');
  const [systemSizeKw, setSystemSizeKw] = useState<number>(initialPage?.system_size_kw || 5);
  const [sqft, setSqft] = useState<number>(initialPage?.sqft || 2000);
  const [avgCostMin, setAvgCostMin] = useState<number>(initialPage?.avg_cost_min || 0);
  const [avgCostMax, setAvgCostMax] = useState<number>(initialPage?.avg_cost_max || 0);
  const [costPerWatt, setCostPerWatt] = useState<number>(initialPage?.cost_per_watt || 0);
  const [subsidyAmount, setSubsidyAmount] = useState<number>(initialPage?.subsidy_amount || 0);
  const [savingsPerYear, setSavingsPerYear] = useState<number>(initialPage?.savings_per_year || 0);
  const [paybackYears, setPaybackYears] = useState<number>(initialPage?.payback_years || 0);
  const [realDataSources, setRealDataSources] = useState<string>(
    initialPage?.real_data_sources || (initialPage?.custom_content as any)?.real_data_sources || ''
  );

  // Section Order
  const defaultSections: Record<TemplateType, PageSectionId[]> = {
    city: ['hero', 'quick_stats', 'cost_breakdown', 'calculator', 'system_comparison', 'city_comparison_chart', 'subsidy', 'installers', 'faq', 'internal_links', 'cta'],
    system_size: ['hero', 'quick_stats', 'specs_card', 'cost_breakdown', 'city_size_table', 'calculator', 'subsidy', 'faq', 'internal_links', 'cta'],
    sqft: ['hero', 'quick_stats', 'cost_breakdown', 'savings_chart', 'roi_chart', 'faq', 'internal_links', 'cta'],
  };

  const [sectionOrder, setSectionOrder] = useState<PageSectionId[]>(
    initialPage?.section_order || defaultSections[templateType]
  );

  // FAQs State - populated dynamically via AI or initialPage
  const [faqs, setFaqs] = useState<FaqRecord[]>(() => {
    if (initialPage) {
      return [];
    }
    return [];
  });

  // Installers State (for City template)
  const [installers, setInstallers] = useState<InstallerRecord[]>(() => {
    return [];
  });

  // Auto-generate title & slug helpers
  const handleTemplateChange = (newType: TemplateType) => {
    setTemplateType(newType);
    setSectionOrder(defaultSections[newType]);
    if (isNew) {
      const locationLabel = city ? (country ? `${city}, ${country}` : city) : (country || 'Your Area');
      if (newType === 'city') {
        if (city) {
          setTitle(`Solar Installation Cost in ${city} 2026`);
          setSlug(`solar-installation-cost-in-${city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
          setMetaTitle(`Solar Installation Cost in ${city} 2026 — Price, Subsidy & ROI Guide`);
          setMetaDesc(`Complete guide to solar panel installation cost in ${city}. System pricing, local government incentives, payback timeline, and verified solar installers.`);
        } else {
          setTitle(`Solar Installation Cost Guide 2026`);
          setSlug(`solar-installation-cost-guide-2026`);
        }
      } else if (newType === 'system_size') {
        setTitle(`${systemSizeKw}kW Solar System Cost & ROI Guide 2026`);
        setSlug(`${systemSizeKw}kw-solar-system-cost-guide-2026`);
        setMetaTitle(`${systemSizeKw}kW Solar System Cost 2026: Pricing, Output & Payback`);
        setMetaDesc(`Detailed ${systemSizeKw}kW solar system cost breakdown. Check grid-tie and hybrid pricing, daily power generation, and clean energy subsidies.`);
      } else if (newType === 'sqft') {
        setTitle(`Solar Installation Cost for ${sqft} Sq Ft Home 2026`);
        setSlug(`solar-installation-cost-for-${sqft}-sqft-home-2026`);
        setMetaTitle(`Solar Cost for ${sqft} Sq Ft House 2026: Sizing & Savings`);
        setMetaDesc(`Find out the exact solar installation cost for a ${sqft} sq ft house. Recommended kW capacity, annual electricity bill savings, and payback period.`);
      }
    }
  };

  // Populate AI Generated Content into Form
  const handleAiGenerationComplete = (generatedData: any, meta: { model: string; tokens: number; durationMs: number }) => {
    setAiMeta(meta);

    // Dynamic Geographic & Localization info
    if (generatedData.city) {
      setCity(generatedData.city);
    }
    if (generatedData.state !== undefined) {
      setState(generatedData.state || '');
    }
    if (generatedData.country) {
      setCountry(generatedData.country);
    }
    if (generatedData.currencySymbol) {
      setCurrencySymbol(generatedData.currencySymbol);
    }

    if (generatedData.metaTitle) {
      setMetaTitle(generatedData.metaTitle);
      setTitle(generatedData.metaTitle.split('—')[0].split('|')[0].trim());
    } else if (generatedData.title) {
      setTitle(generatedData.title);
      setMetaTitle(generatedData.title);
    }

    if (generatedData.slug) {
      setSlug(generatedData.slug.replace(/^\//, ''));
    } else if (generatedData.city) {
      setSlug(`solar-installation-cost-in-${generatedData.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
    }

    if (generatedData.metaDescription) {
      setMetaDesc(generatedData.metaDescription);
    }
    if (generatedData.heroSubtitle) {
      setHeroSubtitle(generatedData.heroSubtitle);
    }
    if (generatedData.quickAnswer) {
      setQuickAnswer(generatedData.quickAnswer);
    }
    if (generatedData.ctaHeadline) {
      setCtaHeadline(generatedData.ctaHeadline);
    }
    if (generatedData.ctaSubtext) {
      setCtaSubtext(generatedData.ctaSubtext);
    }

    // Stats
    if (generatedData.stats) {
      if (generatedData.stats.avgCostMin) setAvgCostMin(Number(generatedData.stats.avgCostMin));
      if (generatedData.stats.avgCostMax) setAvgCostMax(Number(generatedData.stats.avgCostMax));
      if (generatedData.stats.costPerWatt) setCostPerWatt(Number(generatedData.stats.costPerWatt));
      if (generatedData.stats.paybackYears) setPaybackYears(Number(generatedData.stats.paybackYears));
      if (generatedData.stats.annualSavings) setSavingsPerYear(Number(generatedData.stats.annualSavings));
      if (generatedData.stats.subsidyAmount) setSubsidyAmount(Number(generatedData.stats.subsidyAmount));
    }

    // FAQs
    if (Array.isArray(generatedData.faqs) && generatedData.faqs.length > 0) {
      const formattedFaqs: FaqRecord[] = generatedData.faqs.map((f: any, idx: number) => ({
        id: `ai-faq-${Date.now()}-${idx}`,
        page_id: initialPage?.id || 'temp',
        question: f.question || 'FAQ Question',
        answer: f.answer || 'FAQ Answer',
        display_order: idx,
      }));
      setFaqs(formattedFaqs);
    }

    // Installers
    if (Array.isArray(generatedData.installers) && generatedData.installers.length > 0) {
      const formattedInstallers: InstallerRecord[] = generatedData.installers.map((inst: any, idx: number) => ({
        id: `ai-inst-${Date.now()}-${idx}`,
        city: generatedData.city || city || '',
        name: inst.name || `Certified Solar Installer ${idx + 1}`,
        rating: Number(inst.rating) || 4.9,
        price_range_min: Number(inst.priceRangeMin || inst.price_range_min || generatedData.stats?.avgCostMin || avgCostMin || 0),
        price_range_max: Number(inst.priceRangeMax || inst.price_range_max || generatedData.stats?.avgCostMax || avgCostMax || 0),
        experience_years: Number(inst.experienceYears || inst.experience_years || 8),
        phone: inst.phone,
        website: inst.website,
        address: inst.address,
      }));
      setInstallers(formattedInstallers);
    } else if (generatedData.city) {
      // Create clean dynamic installer placeholders for this specific city
      const currentCity = generatedData.city;
      const minP = Number(generatedData.stats?.avgCostMin || 45000);
      const maxP = Number(generatedData.stats?.avgCostMax || 55000);
      setInstallers([
        {
          id: `inst-1-${Date.now()}`,
          city: currentCity,
          name: `${currentCity} Solar Power & EPC Systems`,
          rating: 4.9,
          price_range_min: minP,
          price_range_max: maxP,
          experience_years: 10,
        },
        {
          id: `inst-2-${Date.now()}`,
          city: currentCity,
          name: `Apex Clean Energy ${currentCity}`,
          rating: 4.8,
          price_range_min: Math.round(minP * 0.95),
          price_range_max: Math.round(maxP * 1.05),
          experience_years: 8,
        },
        {
          id: `inst-3-${Date.now()}`,
          city: currentCity,
          name: `SunGrid Renewable Solutions`,
          rating: 4.9,
          price_range_min: Math.round(minP * 1.02),
          price_range_max: Math.round(maxP * 1.08),
          experience_years: 12,
        },
      ]);
    }

    // Store rich nested structures into customData
    const updatedCustom: Record<string, any> = {
      ...customData,
      heroSubtitle: generatedData.heroSubtitle || heroSubtitle,
      quickAnswer: generatedData.quickAnswer || quickAnswer,
      ctaHeadline: generatedData.ctaHeadline || ctaHeadline,
      ctaSubtext: generatedData.ctaSubtext || ctaSubtext,
      gridInterconnectionSteps: generatedData.gridInterconnectionSteps,
      seasonalIrradiance: generatedData.seasonalIrradiance || generatedData.seasonalSolarIrradiance,
      seasonalSolarIrradiance: generatedData.seasonalSolarIrradiance || generatedData.seasonalIrradiance,
      recommendedEquipment: generatedData.recommendedEquipment,
      hiddenCostsChecklist: generatedData.hiddenCostsChecklist,
      localCaseStudy: generatedData.localCaseStudy,
      utilityCompanies: generatedData.utilityCompanies,
      discomRegulation: generatedData.discomRegulation,
      costBreakdownTable: generatedData.costBreakdownTable || generatedData.costBreakdown,
      costBreakdown: generatedData.costBreakdown || generatedData.costBreakdownTable,
      systemSizeCards: generatedData.systemSizeCards,
      cityComparisonData: generatedData.cityComparisonData || generatedData.cityComparison,
      cityComparison: generatedData.cityComparison || generatedData.cityComparisonData,
      monthlyGenerationData: generatedData.monthlyGenerationData || generatedData.monthlyGeneration,
      monthlyGeneration: generatedData.monthlyGeneration || generatedData.monthlyGenerationData,
      subsidyPrograms: generatedData.subsidyPrograms,
      subsidyContent: generatedData.subsidyContent,
      llmSummaryTable: generatedData.llmSummaryTable || generatedData.llmSummaryGeoTable,
      llmSummaryGeoTable: generatedData.llmSummaryGeoTable || generatedData.llmSummaryTable,
      cityWiseCostTable: generatedData.cityWiseCostTable || generatedData.cityWiseCosts,
      cityWiseCosts: generatedData.cityWiseCosts || generatedData.cityWiseCostTable,
      environmentalImpact: generatedData.environmentalImpact,
      maintenanceCostTable: generatedData.maintenanceCostTable || generatedData.maintenanceCosts,
      maintenanceCosts: generatedData.maintenanceCosts || generatedData.maintenanceCostTable,
      financingOptions: generatedData.financingOptions,
      recommendedSystemSize: generatedData.recommendedSystemSize,
      billSavingsChart: generatedData.billSavingsChart,
      roiTimeline: generatedData.roiTimeline,
      howToSteps: generatedData.howToSteps,
      systemSpecs: generatedData.systemSpecs,
      internalLinkSuggestions: generatedData.internalLinkSuggestions,
    };
    setCustomData(updatedCustom);

    // Transition smoothly to Details step so user can review/edit
    setActiveStep('details');
  };

  // Single Section Regeneration Handler
  const handleRegenerateSection = async (sectionKey: string) => {
    setRegeneratingSection(sectionKey);
    try {
      const result = await regenerateAiSection({
        sectionKey,
        templateType,
        targetKeyword: title || metaTitle || `${templateType} solar cost`,
        city,
        country,
        currencySymbol,
        systemSizeKw,
        sqft,
        currentData: {
          title,
          metaTitle,
          metaDesc,
          avgCostMin,
          avgCostMax,
          costPerWatt,
          faqsCount: faqs.length,
        },
      });

      if (result.success && result.data) {
        const d = result.data;
        if (sectionKey === 'meta' || sectionKey === 'metadata') {
          if (d.metaTitle) setMetaTitle(d.metaTitle);
          if (d.metaDescription) setMetaDesc(d.metaDescription);
        } else if (sectionKey === 'quickAnswer' || sectionKey === 'quick_answer') {
          if (typeof d === 'string') setQuickAnswer(d);
          else if (d.quickAnswer) setQuickAnswer(d.quickAnswer);
          else if (d.heroSubtitle) setHeroSubtitle(d.heroSubtitle);
        } else if (sectionKey === 'stats' || sectionKey === 'pricing') {
          if (d.avgCostMin) setAvgCostMin(Number(d.avgCostMin));
          if (d.avgCostMax) setAvgCostMax(Number(d.avgCostMax));
          if (d.costPerWatt) setCostPerWatt(Number(d.costPerWatt));
          if (d.paybackYears) setPaybackYears(Number(d.paybackYears));
          if (d.annualSavings) setSavingsPerYear(Number(d.annualSavings));
        } else if (sectionKey === 'faqs') {
          if (Array.isArray(d.faqs) && d.faqs.length > 0) {
            setFaqs(
              d.faqs.map((f: any, i: number) => ({
                id: `ai-faq-${Date.now()}-${i}`,
                page_id: initialPage?.id || 'temp',
                question: f.question,
                answer: f.answer,
                display_order: i,
              }))
            );
          }
        }

        if (result.meta) {
          setAiMeta(result.meta);
        }
      }
    } catch (e) {
      console.warn('Section regeneration error:', e);
    } finally {
      setRegeneratingSection(null);
    }
  };

  // Section Reordering Helpers
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    setSectionOrder(newOrder);
  };

  // FAQ Handlers
  const addFaq = () => {
    setFaqs([
      ...faqs,
      {
        id: `f-${Date.now()}`,
        page_id: initialPage?.id || 'temp',
        question: 'New Question...',
        answer: 'Detailed helpful answer with key numbers...',
        display_order: faqs.length,
      },
    ]);
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Build Preview Page Record
  const currentPageRecord: PageRecord = {
    id: initialPage?.id || `page-${Date.now()}`,
    slug: slug.replace(/^\//, ''),
    title: title || 'Untitled Solar Page',
    template_type: templateType,
    city: templateType === 'city' ? city : undefined,
    state: templateType === 'city' ? state : undefined,
    system_size_kw: systemSizeKw,
    sqft: templateType === 'sqft' ? sqft : undefined,
    avg_cost_min: avgCostMin,
    avg_cost_max: avgCostMax,
    cost_per_watt: costPerWatt,
    subsidy_amount: subsidyAmount,
    savings_per_year: savingsPerYear,
    payback_years: paybackYears,
    meta_title: metaTitle || title,
    meta_description: metaDesc,
    real_data_sources: realDataSources.trim() || undefined,
    status: status,
    section_order: sectionOrder,
    custom_content: {
      ...customData,
      heroSubtitle,
      quickAnswer,
      ctaHeadline,
      ctaSubtext,
      country,
      currency: currencySymbol,
      real_data_sources: realDataSources.trim() || undefined,
    },
    created_at: initialPage?.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const handleFinalSave = () => {
    onSave(currentPageRecord, faqs, installers);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-white">
                {isNew ? 'Create Programmatic Page' : `Edit: ${title}`}
              </h1>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-[10px] uppercase font-bold border border-blue-500/30">
                {templateType.replace('_', ' ')}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              /{slug || 'new-page-url'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveStep(activeStep === 'preview' ? 'details' : 'preview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeStep === 'preview'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{activeStep === 'preview' ? 'Exit Preview' : 'Live Preview'}</span>
          </button>

          <button
            type="button"
            id="admin-save-page-btn"
            onClick={handleFinalSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {/* Editor Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveStep('ai_generator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeStep === 'ai_generator'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-slate-900 text-purple-300 hover:text-white border border-purple-900/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>1. Smart Data Autofill</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveStep('details')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeStep === 'details'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          2. Data & Content Form
        </button>

        <button
          type="button"
          onClick={() => setActiveStep('sections')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeStep === 'sections'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          3. Section Ordering ({sectionOrder.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveStep('faqs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeStep === 'faqs'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          4. FAQ Schema ({faqs.length})
        </button>

        {templateType === 'city' && (
          <button
            type="button"
            onClick={() => setActiveStep('installers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeStep === 'installers'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            5. Local Installers ({installers.length})
          </button>
        )}

        <button
          type="button"
          onClick={() => setActiveStep('preview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeStep === 'preview'
              ? 'bg-amber-500 text-slate-950 font-black'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Live Preview
        </button>
      </div>

      {/* STEP 1.5: AI CONTENT GENERATOR PANEL */}
      {activeStep === 'ai_generator' && (
        <div className="space-y-6">
          {/* Template Archetype Selector in Step 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Step 1: Choose Template Archetype</span>
              <span className="text-xs font-mono text-slate-500 lowercase">select archetype before generation</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={() => handleTemplateChange('city')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  templateType === 'city'
                    ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20'
                    : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Template 1: City Guide</span>
                </div>
                <p className="text-xs text-slate-400">
                  Target: "Solar installation cost in [City]". Itemized components, DISCOM rules, local installers.
                </p>
              </div>

              <div
                onClick={() => handleTemplateChange('system_size')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  templateType === 'system_size'
                    ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/20'
                    : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                  <Zap className="w-4 h-4" />
                  <span>Template 2: System Size (kW)</span>
                </div>
                <p className="text-xs text-slate-400">
                  Target: "[X]kW solar system cost in India". On-grid vs Off-grid, panel count, generation specs.
                </p>
              </div>

              <div
                onClick={() => handleTemplateChange('sqft')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  templateType === 'sqft'
                    ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/20'
                    : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1">
                  <Home className="w-4 h-4" />
                  <span>Template 3: Roof Area (Sq Ft)</span>
                </div>
                <p className="text-xs text-slate-400">
                  Target: "Solar cost for [X] sq ft house". 12-month bill graph & 10-year ROI payback curve.
                </p>
              </div>
            </div>
          </div>

          {/* AI Generator Component */}
          <AiContentGeneratorPanel
            templateType={templateType}
            initialCity={city}
            initialKeyword={title}
            initialKw={systemSizeKw}
            initialSqft={sqft}
            onGenerationComplete={handleAiGenerationComplete}
            onSkipAi={() => setActiveStep('details')}
          />

          {/* Real Data Sources (Optional but Recommended) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Real Data Sources (optional but recommended)</span>
              </label>
              <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                Helpful Content Booster
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paste any real installer quotes, government portal links, or utility rate data you have for this city. This will be stored and displayed in the <strong className="text-slate-300">About This Data</strong> section on the public page.
            </p>
            <textarea
              id="admin-real-data-sources"
              value={realDataSources}
              onChange={(e) => setRealDataSources(e.target.value)}
              rows={3}
              placeholder="e.g., Central PM Surya Ghar portal rates (Feb 2026), Tata Power Delhi tariff schedule, local quotes from 3 empanelled vendors..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors font-mono leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* STEP 2: Details & Parameters */}
      {activeStep === 'details' && (
        <div className="space-y-6">
          {/* Quick AI Regeneration Actions Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold text-slate-300">
                Need to autofill solar market data again?
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveStep('ai_generator')}
              className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Autofill Page Data</span>
            </button>
          </div>

          {/* Primary Meta & URLs */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span>Page Metadata & Search Snippets</span>
              </h2>

              <button
                type="button"
                onClick={() => handleRegenerateSection('metadata')}
                disabled={regeneratingSection === 'metadata'}
                title="Regenerate this section with Gemini AI"
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-lg text-[11px] font-bold flex items-center gap-1 border border-purple-500/20 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${regeneratingSection === 'metadata' ? 'animate-spin text-purple-400' : ''}`} />
                <span>Regenerate Meta</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Page H1 Heading & Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  URL Slug (Auto-routed)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Meta Title (SEO Tag - max 60 chars)
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Publication Status
                </label>
                <select
                  value={status}
                  onChange={(e: any) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                >
                  <option value="published">Published (Visible in Sitemap)</option>
                  <option value="draft">Draft (Admin Only)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Meta Description (Search Engine Snippet - max 155 chars)
                </label>
                <textarea
                  rows={2}
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Quick Answer & Subtitle AI Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
                Hero Subtitle & Featured Snippet Quick Answer
              </h2>

              <button
                type="button"
                onClick={() => handleRegenerateSection('quick_answer')}
                disabled={regeneratingSection === 'quick_answer'}
                title="Regenerate this section with Gemini AI"
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-lg text-[11px] font-bold flex items-center gap-1 border border-purple-500/20 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${regeneratingSection === 'quick_answer' ? 'animate-spin text-purple-400' : ''}`} />
                <span>Regenerate Quick Answer</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Hero Subtitle (2-3 sentences, keyword-rich)
                </label>
                <textarea
                  rows={3}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="In 2026, rooftop solar in this region costs..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Quick Answer Box (Featured Snippet Optimized)
                </label>
                <textarea
                  rows={3}
                  value={quickAnswer}
                  onChange={(e) => setQuickAnswer(e.target.value)}
                  placeholder="Direct answers for search queries..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Template Specific Inputs & Benchmarks */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
                Pricing Benchmarks & Calculations
              </h2>

              <button
                type="button"
                onClick={() => handleRegenerateSection('stats')}
                disabled={regeneratingSection === 'stats'}
                title="Regenerate pricing stats with Gemini AI"
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-lg text-[11px] font-bold flex items-center gap-1 border border-purple-500/20 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${regeneratingSection === 'stats' ? 'animate-spin text-purple-400' : ''}`} />
                <span>Regenerate Stats</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {templateType === 'city' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">City Name</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Country / State</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                </>
              )}

              {templateType === 'system_size' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">System Size (kW)</label>
                  <input
                    type="number"
                    value={systemSizeKw}
                    onChange={(e) => setSystemSizeKw(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              )}

              {templateType === 'sqft' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Roof Area (Sq Ft)</label>
                  <input
                    type="number"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Currency Symbol</label>
                <input
                  type="text"
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs text-center font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Avg Cost Min ({currencySymbol})</label>
                <input
                  type="number"
                  value={avgCostMin}
                  onChange={(e) => setAvgCostMin(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Avg Cost Max ({currencySymbol})</label>
                <input
                  type="number"
                  value={avgCostMax}
                  onChange={(e) => setAvgCostMax(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cost Per Watt ({currencySymbol}/W)</label>
                <input
                  type="number"
                  step="0.01"
                  value={costPerWatt}
                  onChange={(e) => setCostPerWatt(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subsidy Amount ({currencySymbol})</label>
                <input
                  type="number"
                  value={subsidyAmount}
                  onChange={(e) => setSubsidyAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Annual Savings ({currencySymbol})</label>
                <input
                  type="number"
                  value={savingsPerYear}
                  onChange={(e) => setSavingsPerYear(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Payback Period (Years)</label>
                <input
                  type="number"
                  step="0.1"
                  value={paybackYears}
                  onChange={(e) => setPaybackYears(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Token & AI Telemetry Footer */}
          {aiMeta && (
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-purple-300">
                <Cpu className="w-3.5 h-3.5" /> Engine: {aiMeta.model} (fallback ready)
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Usage: {aiMeta.tokens} tokens
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" /> Time: {(aiMeta.durationMs / 1000).toFixed(2)}s
              </span>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: Drag & Drop Section Ordering */}
      {activeStep === 'sections' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">
                Drag and Drop Page Section Ordering
              </h2>
              <p className="text-xs text-slate-400">
                Customize the vertical presentation hierarchy on the landing page.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSectionOrder(defaultSections[templateType])}
              className="text-xs text-blue-400 hover:underline cursor-pointer"
            >
              Reset to Default Order
            </button>
          </div>

          <div className="space-y-2">
            {sectionOrder.map((sectionId, idx) => (
              <div
                key={sectionId}
                className="bg-slate-800 border border-slate-700/80 rounded-xl p-3.5 flex items-center justify-between text-xs transition-colors hover:border-slate-500"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-900 text-slate-400 flex items-center justify-center font-mono text-[11px] font-bold">
                    {idx + 1}
                  </span>
                  <GripVertical className="w-4 h-4 text-slate-500" />
                  <span className="font-bold text-white capitalize">
                    {sectionId.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveSection(idx, 'up')}
                    className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === sectionOrder.length - 1}
                    onClick={() => moveSection(idx, 'down')}
                    className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: FAQs Manager */}
      {activeStep === 'faqs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">
                Manage FAQ Schema & Accordion
              </h2>
              <p className="text-xs text-slate-400">
                These questions and answers are structured into JSON-LD for rich Google snippet indexing.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleRegenerateSection('faqs')}
                disabled={regeneratingSection === 'faqs'}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/20 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${regeneratingSection === 'faqs' ? 'animate-spin text-purple-400' : ''}`} />
                <span>AI Regenerate FAQs</span>
              </button>

              <button
                type="button"
                onClick={addFaq}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={faq.id || idx}
                className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">FAQ Item #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFaq(idx)}
                    className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Answer</label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: Installers Manager (City only) */}
      {activeStep === 'installers' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">
                Verified Installers in {city}
              </h2>
              <p className="text-xs text-slate-400">
                Empanelled vendors displayed on this city's guide.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setInstallers([
                  ...installers,
                  {
                    id: `inst-${Date.now()}`,
                    city: city,
                    name: `New Solar Vendor ${city}`,
                    rating: 4.8,
                    price_range_min: avgCostMin,
                    price_range_max: avgCostMax,
                    experience_years: 5,
                  },
                ])
              }
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Installer</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {installers.map((inst, idx) => (
              <div
                key={inst.id || idx}
                className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={inst.name}
                    onChange={(e) => {
                      const updated = [...installers];
                      updated[idx].name = e.target.value;
                      setInstallers(updated);
                    }}
                    className="font-bold text-white bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs w-full mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => setInstallers(installers.filter((_, i) => i !== idx))}
                    className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inst.rating}
                      onChange={(e) => {
                        const updated = [...installers];
                        updated[idx].rating = Number(e.target.value);
                        setInstallers(updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block">Experience (Yrs)</label>
                    <input
                      type="number"
                      value={inst.experience_years}
                      onChange={(e) => {
                        const updated = [...installers];
                        updated[idx].experience_years = Number(e.target.value);
                        setInstallers(updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIVE PREVIEW TAB */}
      {activeStep === 'preview' && (
        <div className="border border-slate-700 rounded-2xl overflow-hidden shadow-2xl bg-white">
          <div className="bg-slate-900 px-4 py-2 text-xs font-mono text-slate-300 border-b border-slate-800 flex items-center justify-between">
            <span>Preview Mode: costofsolarinstallation.com/{slug}</span>
            <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] uppercase font-bold">
              Template: {templateType}
            </span>
          </div>

          <div className="p-0 pointer-events-auto">
            {templateType === 'city' && (
              <CityPageTemplate
                page={currentPageRecord}
                faqs={faqs}
                installers={installers}
              />
            )}
            {templateType === 'system_size' && (
              <SystemSizeTemplate
                page={currentPageRecord}
                faqs={faqs}
              />
            )}
            {templateType === 'sqft' && (
              <SqFtPageTemplate
                page={currentPageRecord}
                faqs={faqs}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
