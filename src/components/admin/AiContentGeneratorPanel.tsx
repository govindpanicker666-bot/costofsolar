import React, { useState } from 'react';
import {
  Sparkles,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Zap,
  MapPin,
  Globe,
  Clock,
  Cpu,
} from 'lucide-react';
import { TemplateType } from '../../types';
import { AiGenerationInputs, generateAiPageContent, AiGenerationResult } from '../../lib/geminiApi';

interface AiContentGeneratorPanelProps {
  templateType: TemplateType;
  initialCity?: string;
  initialKeyword?: string;
  initialKw?: number;
  initialSqft?: number;
  onGenerationComplete: (generatedData: any, meta: { model: string; tokens: number; durationMs: number }) => void;
  onSkipAi: () => void;
}

export const AiContentGeneratorPanel: React.FC<AiContentGeneratorPanelProps> = ({
  templateType,
  initialCity = '',
  initialKw = 5,
  initialSqft = 2000,
  onGenerationComplete,
  onSkipAi,
}) => {
  const [city, setCity] = useState(initialCity || '');
  const [country, setCountry] = useState('');
  const [systemSizeKw, setSystemSizeKw] = useState<number>(initialKw || 5);
  const [sqft, setSqft] = useState<number>(initialSqft || 2000);

  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationSuccess, setGenerationSuccess] = useState(false);
  const [lastMeta, setLastMeta] = useState<{ model: string; tokens: number; durationMs: number } | null>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!city.trim() || !country.trim()) {
      setError('Please provide both City and Country name');
      return;
    }

    setError(null);
    setLoading(true);
    setGenerationSuccess(false);

    const inputs: AiGenerationInputs = {
      templateType,
      city: city.trim(),
      country: country.trim(),
      systemSizeKw: templateType === 'system_size' ? Number(systemSizeKw) : undefined,
      sqft: templateType === 'sqft' ? Number(sqft) : undefined,
    };

    const result: AiGenerationResult = await generateAiPageContent(inputs);

    setLoading(false);

    if (result.success && result.data) {
      setGenerationSuccess(true);
      const meta = result.meta || { model: 'gemini-3.6-flash', tokens: 1800, durationMs: 2800 };
      setLastMeta(meta);
      onGenerationComplete(result.data, meta);
    } else {
      setError(result.error || 'Generation failed — please check your Gemini API key');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-6">
      {/* Banner Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-950/60 to-purple-950/60 p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-[10px] font-bold tracking-wider uppercase border border-blue-500/30">
                1. Smart Market Research
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-mono border border-emerald-500/30">
                Live Data Retrieval
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white mt-1">
              Autofill Local Solar Market Data
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
              Enter target city and country. The system will retrieve local solar pricing, regional subsidies, active utility companies, and specific rooftop guidance.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSkipAi}
          className="px-3.5 py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors cursor-pointer self-start sm:self-center"
        >
          Manual Data Entry
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleGenerate} className="p-6 pt-0 space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-rose-950/50 border border-rose-800/60 rounded-xl flex items-start gap-3 text-xs text-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">{error}</p>
              {error.includes('GEMINI_API_KEY') && (
                <p className="text-slate-400 text-[11px]">
                  Please ensure your Gemini API key is configured in your project settings or .env file.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Success Banner */}
        {generationSuccess && lastMeta && (
          <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                <strong>Content generated successfully!</strong> Complete solar page data loaded from Gemini API.
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-emerald-400">
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" /> {lastMeta.model}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {(lastMeta.durationMs / 1000).toFixed(1)}s
              </span>
            </div>
          </div>
        )}

        {/* SIMPLIFIED CMS INPUTS */}
        <div className="bg-slate-850/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>City Name</span>
                <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                id="ai-city-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Austin, London, Sydney, Mumbai, Berlin"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Country</span>
                <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                id="ai-country-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. USA, UK, Australia, India, Germany"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-500"
              />
            </div>

            {templateType === 'system_size' && (
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  System Size (kW)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={systemSizeKw}
                  onChange={(e) => setSystemSizeKw(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            )}

            {templateType === 'sqft' && (
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Roof Area (Sq Ft)
                </label>
                <input
                  type="number"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Mandatory Helper Text */}
          <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-xs text-blue-300/90 font-medium">
            <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              Local currency, pricing estimates, subsidies, utility companies, and rooftop specs will be automatically retrieved.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-400">
            Clicking Autofill initiates a real-time market data query.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onSkipAi}
              className="w-1/2 sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Manual Form
            </button>

            <button
              type="submit"
              disabled={loading}
              id="ai-generate-content-btn"
              className="w-1/2 sm:w-auto px-7 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Retrieving Market Data...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>AUTOFILL MARKET DATA</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
