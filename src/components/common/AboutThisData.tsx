import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp, Calendar, FileText, CheckCircle2 } from 'lucide-react';

interface AboutThisDataProps {
  locationLabel?: string;
  updatedAt?: string;
  createdAt?: string;
  realDataSources?: string;
  templateType?: 'city' | 'system_size' | 'sqft';
}

export const AboutThisData: React.FC<AboutThisDataProps> = ({
  locationLabel = 'your area',
  updatedAt,
  createdAt,
  realDataSources,
  templateType = 'city',
}) => {
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const rawDate = updatedAt || createdAt;
  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '2026';

  return (
    <section className="py-8 bg-slate-50 border-t border-slate-200/80 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <span>About This Data & Transparency</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Last updated: <strong className="text-slate-700 font-semibold">{formattedDate}</strong></span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Data on this page represents aggregated solar installation pricing collected from installer quotes, government subsidy portals, and public utility rate disclosures for {locationLabel}. Figures reflect typical residential rooftop system costs as of {formattedDate}. Individual quotes may vary based on roof type, system size, and installer.
          </p>

          {realDataSources && realDataSources.trim().length > 0 && (
            <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-blue-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Sources Consulted</span>
              </div>
              <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                {realDataSources}
              </p>
            </div>
          )}

          <div>
            <button
              type="button"
              onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isMethodologyOpen ? 'Hide Methodology' : 'View Estimation Methodology'}</span>
              {isMethodologyOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {isMethodologyOpen && (
              <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2 leading-relaxed animate-in fade-in duration-200">
                <p className="font-semibold text-slate-800">
                  Cost ranges and financial estimates are derived from:
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-600">
                  <li><strong className="text-slate-700">Installer quote aggregation</strong> across verified local solar contractors and EPC suppliers.</li>
                  <li><strong className="text-slate-700">Government subsidy portal published rates</strong> and statutory tax credit frameworks.</li>
                  <li><strong className="text-slate-700">Utility tariff schedules</strong> for grid export and net metering calculations.</li>
                </ol>
                <p className="text-slate-500 text-[11px] pt-1">
                  All figures are reviewed and updated periodically.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
