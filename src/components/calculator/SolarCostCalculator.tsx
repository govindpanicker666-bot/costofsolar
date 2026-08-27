import React, { useState, useMemo } from 'react';
import { Sun, Zap, DollarSign, ShieldCheck, ArrowRight, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface SolarCostCalculatorProps {
  initialBill?: number;
  initialRoofArea?: number;
  city?: string;
  currencySymbol?: string;
  costPerWattUSD?: number;
  onOpenQuoteModal?: (data: { systemSizeKw: number; bill: number; roofArea: number }) => void;
  compact?: boolean;
}

export const SolarCostCalculator: React.FC<SolarCostCalculatorProps> = ({
  initialBill = 180,
  initialRoofArea = 800,
  city = 'Global',
  currencySymbol = '$',
  costPerWattUSD = 1.15,
  onOpenQuoteModal,
  compact = false,
}) => {
  const [monthlyBill, setMonthlyBill] = useState<number>(initialBill);
  const [roofArea, setRoofArea] = useState<number>(initialRoofArea);
  const [panelQuality, setPanelQuality] = useState<'standard' | 'premium'>('premium');

  // Real-time calculation logic for Global Benchmark in 2026
  // Avg residential electricity rate: ~$0.16 / kWh
  // 1 kW generates approx 4.2 kWh/day -> ~125 kWh/month
  // 1 kW requires ~65-90 sq ft (6-8 sq meters) shadow-free area
  const calculations = useMemo(() => {
    const tariffPerKwh = 0.16;
    const monthlyKwhNeeded = Math.max(100, Math.round(monthlyBill / tariffPerKwh));
    
    // System size in kW needed based on bill
    const kwByBill = monthlyKwhNeeded / 125;
    
    // System size in kW supported by roof area (1 kW = ~80 sq ft)
    const kwByRoof = Math.max(1, roofArea / 80);
    
    // Recommended system size (rounded to nearest 0.5 kW, minimum 2 kW, maximum 25 kW)
    let recommendedKw = Math.min(kwByBill, kwByRoof);
    recommendedKw = Math.max(2, Math.round(recommendedKw * 2) / 2);
    if (recommendedKw > 25) recommendedKw = 25;

    // Gross Cost calculation
    const qualityMultiplier = panelQuality === 'premium' ? 1.15 : 0.95;
    const effectiveCostPerWatt = costPerWattUSD * qualityMultiplier;
    
    const grossCostMin = Math.round(recommendedKw * (effectiveCostPerWatt * 0.9) * 1000);
    const grossCostMax = Math.round(recommendedKw * (effectiveCostPerWatt * 1.15) * 1000);

    // Estimated Clean Energy Incentives (approx 30% average across US, EU, AU, etc.)
    const avgGross = (grossCostMin + grossCostMax) / 2;
    const subsidy = Math.round(avgGross * 0.30);

    const netCostMin = Math.max(1200, grossCostMin - subsidy);
    const netCostMax = Math.max(2000, grossCostMax - subsidy);
    const avgNetCost = (netCostMin + netCostMax) / 2;

    // Generation and Savings
    const dailyGenerationKwh = Math.round(recommendedKw * 4.3 * 10) / 10;
    const monthlyGenerationKwh = Math.round(dailyGenerationKwh * 30);
    const annualGenerationKwh = Math.round(dailyGenerationKwh * 365);
    
    const annualSavings = Math.round(Math.min(monthlyKwhNeeded, monthlyGenerationKwh) * tariffPerKwh * 12);
    const monthlySavings = Math.round(annualSavings / 12);
    
    // Payback period in years
    const paybackYears = Math.max(3.2, Math.round((avgNetCost / (annualSavings || 1)) * 10) / 10);
    
    // 25 Years lifetime savings (accounting for 2.5% annual utility inflation)
    const lifetimeSavings = Math.round(annualSavings * 25 * 1.32);

    // CO2 offset (1 kWh = ~0.45 kg CO2)
    const co2SavedTonsPerYear = Math.round((annualGenerationKwh * 0.45) / 1000 * 10) / 10;

    return {
      recommendedKw,
      grossCostMin,
      grossCostMax,
      subsidy,
      netCostMin,
      netCostMax,
      annualSavings,
      monthlySavings,
      paybackYears,
      lifetimeSavings,
      dailyGenerationKwh,
      monthlyGenerationKwh,
      co2SavedTonsPerYear,
      roofAreaSufficient: kwByRoof >= kwByBill,
    };
  }, [monthlyBill, roofArea, panelQuality, costPerWattUSD]);

  const handleGetQuotes = () => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal({
        systemSizeKw: calculations.recommendedKw,
        bill: monthlyBill,
        roofArea: roofArea,
      });
    } else {
      const cta = document.getElementById('lead-cta-section');
      if (cta) {
        cta.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div id="solar-cost-calculator" className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-blue-900/5 overflow-hidden transition-all">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-6 py-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 backdrop-blur rounded-xl">
              <Sun className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold tracking-tight">
                Instant Solar Cost & Savings Calculator
              </h3>
              <p className="text-xs md:text-sm text-blue-100/90 font-medium">
                Updated for 2026 clean energy incentives in {city}
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> 2026 Solar Benchmarks
          </span>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Monthly Bill Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor="monthly-bill-input" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-600" />
                Monthly Electricity Bill
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-sm">{currencySymbol}</span>
                <input
                  id="monthly-bill-input"
                  type="number"
                  min="30"
                  max="5000"
                  step="10"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Math.max(30, Number(e.target.value) || 30))}
                  className="w-32 pl-7 pr-3 py-1.5 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <input
              id="monthly-bill-slider"
              type="range"
              min="50"
              max="1000"
              step="10"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>{currencySymbol}50 (Apartment/Low)</span>
              <span>{currencySymbol}250 (Average Home)</span>
              <span>{currencySymbol}700+ (High Usage)</span>
            </div>
          </div>

          {/* Roof Area Input */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <label htmlFor="roof-area-input" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                Usable Rooftop Area (Sq Ft)
              </label>
              <div className="relative">
                <input
                  id="roof-area-input"
                  type="number"
                  min="100"
                  max="10000"
                  step="50"
                  value={roofArea}
                  onChange={(e) => setRoofArea(Math.max(100, Number(e.target.value) || 100))}
                  className="w-32 pr-12 pl-3 py-1.5 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">sq ft</span>
              </div>
            </div>
            <input
              id="roof-area-slider"
              type="range"
              min="200"
              max="4000"
              step="50"
              value={roofArea}
              onChange={(e) => setRoofArea(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>300 sq ft</span>
              <span>1,200 sq ft</span>
              <span>3,500+ sq ft</span>
            </div>
          </div>

          {/* Panel Technology Selection */}
          <div className="pt-2 border-t border-slate-100">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Panel Technology Preference
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                id="panel-standard-btn"
                onClick={() => setPanelQuality('standard')}
                className={`px-3 py-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                  panelQuality === 'standard'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50'
                }`}
              >
                <div className="font-semibold text-slate-900">Standard Mono PERC</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Reliable 20-21% efficiency</div>
              </button>
              <button
                type="button"
                id="panel-premium-btn"
                onClick={() => setPanelQuality('premium')}
                className={`px-3 py-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                  panelQuality === 'premium'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50'
                }`}
              >
                <div className="font-semibold text-slate-900 flex items-center gap-1">
                  N-Type TOPCon / HJT <Sparkles className="w-3 h-3 text-amber-500" />
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">Premium 22.5%+ high yield</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Output Calculations Box */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50/80 rounded-xl p-5 md:p-6 border border-slate-200">
          <div>
            {/* Top Primary Recommendation Highlight */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Recommended Size
                </span>
                <div className="text-2xl md:text-3xl font-extrabold text-blue-600 mt-1 flex items-baseline gap-1">
                  {calculations.recommendedKw} <span className="text-sm font-semibold text-slate-600">kW</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  ~{calculations.dailyGenerationKwh} kWh / day
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Est. Clean Energy Tax Credit
                </span>
                <div className="text-2xl md:text-3xl font-extrabold text-emerald-600 mt-1 flex items-baseline gap-1">
                  {currencySymbol}{calculations.subsidy.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-700 font-medium mt-0.5 block">
                  ~30% Tax Credit / Rebate
                </span>
              </div>
            </div>

            {/* Price Details Breakdown Card */}
            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm space-y-2.5 text-sm">
              <div className="flex justify-between items-center text-slate-600">
                <span>Estimated Gross Cost:</span>
                <span className="font-semibold text-slate-800">
                  {currencySymbol}{calculations.grossCostMin.toLocaleString()} - {currencySymbol}{calculations.grossCostMax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg text-xs font-semibold">
                <span>Incentives & Tax Deductions:</span>
                <span>- {currencySymbol}{calculations.subsidy.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-100 pt-2 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-sm md:text-base">Net Cost to You:</span>
                <span className="text-xl md:text-2xl font-black text-blue-700">
                  {currencySymbol}{calculations.netCostMin.toLocaleString()} - {currencySymbol}{calculations.netCostMax.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Savings and Payback Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                <div className="text-[11px] font-semibold text-amber-900">Estimated Annual Savings</div>
                <div className="text-lg font-bold text-amber-700 mt-0.5">
                  {currencySymbol}{calculations.annualSavings.toLocaleString()} / yr
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl">
                <div className="text-[11px] font-semibold text-blue-900">Payback Period</div>
                <div className="text-lg font-bold text-blue-700 mt-0.5">
                  {calculations.paybackYears} Years
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-5 pt-4 border-t border-slate-200">
            <button
              type="button"
              id="calc-get-quotes-btn"
              onClick={handleGetQuotes}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Get Free Quotes for {calculations.recommendedKw}kW System</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-2">
              Free consultation & site survey • No obligation quotes • Verified Tier-1 EPCs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
