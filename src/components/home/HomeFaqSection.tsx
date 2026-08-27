import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { FaqRecord } from '../../types';

interface HomeFaqSectionProps {
  faqs: FaqRecord[];
  title?: string;
  subtitle?: string;
}

export const HomeFaqSection: React.FC<HomeFaqSectionProps> = ({
  faqs,
  title = 'Global Solar Installation Cost — Top Questions Answered for 2026',
  subtitle = 'Everything you need to know about global rooftop solar prices in 2026, equipment warranties, clean energy tax credits, and return on investment.',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" /> SEO FAQ Schema
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || `faq-${index}`}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  id={`faq-toggle-${index}`}
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs flex items-center justify-center font-black shrink-0">
                      {index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div className="p-1 rounded-lg bg-slate-50 text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
