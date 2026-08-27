import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { DollarSign, Clock, TrendingUp, Globe } from 'lucide-react';
import { InlineEditable } from '../common/InlineEditable';

interface StatItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const StatsBar: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isInView) {
      setAnimated(true);
    }
  }, [isInView]);

  const stats: StatItem[] = [
    {
      id: 'stat-cities',
      label: 'Cities Covered',
      value: '500+ Cities',
      subtext: '500+ Cities Covered Worldwide',
      icon: Globe,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200/80',
    },
    {
      id: 'stat-cost',
      label: 'Avg Global Cost',
      value: '$1.15 / W',
      subtext: '$1,150 / kW average hardware + install',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200/80',
    },
    {
      id: 'stat-payback',
      label: 'Avg Payback Period',
      value: '4.8 Years',
      subtext: 'Worldwide average with clean energy credits',
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200/80',
    },
    {
      id: 'stat-savings',
      label: 'Avg Annual Savings',
      value: '$1,950 / yr',
      subtext: 'Per 6kW household installation',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200/80',
    },
  ];

  return (
    <section className="py-8 bg-white border-y border-slate-200/80">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={animated ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-4 md:p-5 rounded-2xl ${stat.bgColor} border ${stat.borderColor} flex flex-col justify-between hover:shadow-xs transition-shadow`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <InlineEditable id={`${stat.id}-label`} defaultText={stat.label} />
                  </span>
                  <div className={`p-2 rounded-xl bg-white shadow-2xs ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight">
                    <InlineEditable id={`${stat.id}-value`} defaultText={stat.value} />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-medium leading-snug">
                    <InlineEditable id={`${stat.id}-subtext`} defaultText={stat.subtext} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
