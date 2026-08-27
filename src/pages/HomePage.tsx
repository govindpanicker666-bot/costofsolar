import React, { useMemo } from 'react';
import { getStaticPages, getStaticFaqsByPageId } from '../data/globalSolarData';
import { SEOHead } from '../components/seo/SEOHead';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { StatsBar } from '../components/home/StatsBar';
import { CostBreakdownChart } from '../components/home/CostBreakdownChart';
import { CityCostComparison } from '../components/home/CityCostComparison';
import { HowItWorks } from '../components/home/HowItWorks';
import { HomeFaqSection } from '../components/home/HomeFaqSection';
import { LeadCaptureForm } from '../components/common/LeadCaptureForm';

export const HomePage: React.FC = () => {
  const pages = useMemo(() => getStaticPages(), []);
  const faqs = useMemo(() => getStaticFaqsByPageId('home'), []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-500 selection:text-white">
      <SEOHead
        title="Solar Installation Cost 2026 | City-wise Global Guide"
        description="Find accurate solar installation costs worldwide. Compare prices by city, system size & roof area. Updated 2026 data with savings calculator."
        url="https://costofsolarinstallation.com"
        type="website"
        faqs={faqs}
      />

      <Header pages={pages} />

      <main className="flex-1">
        {/* 1. Hero Section with Real-Time Calculator */}
        <HeroSection />

        {/* 2. Key Stats Bar */}
        <StatsBar />

        {/* 3. Interactive Component Cost Breakdown Chart (Recharts) */}
        <CostBreakdownChart />

        {/* 4. City-wise Price Comparison Cards (14 Global Cities) */}
        <CityCostComparison />

        {/* 5. 3-Step Solar Installation Explainer */}
        <HowItWorks />

        {/* 6. Comprehensive FAQ Section with Schema Accordion */}
        <HomeFaqSection faqs={faqs} />

        {/* 7. Homepage Bottom CTA Form */}
        <section id="quote-cta" className="py-16 md:py-24 bg-white border-t border-slate-200/80 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LeadCaptureForm
              city="Worldwide"
              sourceSlug="home"
              defaultKw={5}
              title="Get Free Custom Solar Quotes for Your Rooftop"
              subtitle="Connect with top-rated, certified solar installers in your area. Compare quotes, verify equipment warranties, and claim regional clean energy incentives."
            />
          </div>
        </section>
      </main>

      <Footer pages={pages} />
    </div>
  );
};
