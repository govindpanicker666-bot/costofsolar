import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  PageRecord,
  PageSectionId,
  FaqRecord,
  InstallerRecord,
} from '../types';
import {
  getStaticPages,
  getStaticPageBySlug,
  getStaticInstallers,
  getStaticFaqsByPageId,
} from '../data/globalSolarData';
import {
  getPageBySlug,
  getPages,
  updatePage,
} from '../lib/firebase';
import { SEOHead } from '../components/seo/SEOHead';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { CityPageTemplate } from '../components/templates/CityPageTemplate';
import { SystemSizeTemplate } from '../components/templates/SystemSizeTemplate';
import { SqFtPageTemplate } from '../components/templates/SqFtPageTemplate';
import { InlineSectionModal } from '../components/admin/InlineSectionModal';
import {
  AlertTriangle,
  ArrowLeft,
  Compass,
  Pencil,
  Sparkles,
  ShieldCheck,
  Loader2,
  Sun,
} from 'lucide-react';

export const DynamicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [overridePage, setOverridePage] = useState<PageRecord | null>(null);
  const [fetchedPage, setFetchedPage] = useState<PageRecord | null>(null);
  const [fetchedFaqs, setFetchedFaqs] = useState<FaqRecord[]>([]);
  const [fetchedInstallers, setFetchedInstallers] = useState<InstallerRecord[]>([]);
  const [allPagesList, setAllPagesList] = useState<PageRecord[]>(() => getStaticPages());
  const [loading, setLoading] = useState(true);

  // Inline editing state
  const [inlineModalOpen, setInlineModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<PageSectionId>('hero');
  const [selectedSectionTitle, setSelectedSectionTitle] = useState('Hero');

  useEffect(() => {
    setIsAdmin(localStorage.getItem('solar_cms_admin_auth_v2') === 'true');
    window.scrollTo(0, 0);
  }, [slug]);

  // Load page data asynchronously from Firebase / Local Storage / Static Seed
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function loadData() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const [pageResult, allPages] = await Promise.all([
          getPageBySlug(slug),
          getPages(),
        ]);

        if (isMounted) {
          if (allPages && allPages.length > 0) {
            setAllPagesList(allPages);
          }

          if (pageResult && pageResult.page) {
            setFetchedPage(pageResult.page);
            setFetchedFaqs(
              pageResult.faqs && pageResult.faqs.length > 0
                ? pageResult.faqs
                : getStaticFaqsByPageId(pageResult.page.id || pageResult.page.slug, pageResult.page.city)
            );
            setFetchedInstallers(pageResult.installers);
          } else {
            // Fallback directly to static lookup
            const staticMatch = getStaticPageBySlug(slug);
            if (staticMatch) {
              setFetchedPage(staticMatch);
              setFetchedFaqs(getStaticFaqsByPageId(staticMatch.id, staticMatch.city));
              setFetchedInstallers(getStaticInstallers(staticMatch.city));
            } else {
              setFetchedPage(null);
            }
          }
        }
      } catch (err) {
        console.warn('Error loading dynamic page data:', err);
        if (isMounted) {
          const staticMatch = getStaticPageBySlug(slug);
          if (staticMatch) {
            setFetchedPage(staticMatch);
            setFetchedFaqs(getStaticFaqsByPageId(staticMatch.id, staticMatch.city));
            setFetchedInstallers(getStaticInstallers(staticMatch.city));
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const page = overridePage || fetchedPage || (slug ? getStaticPageBySlug(slug) : null);
  const allPages = allPagesList.length > 0 ? allPagesList : getStaticPages();

  const faqs = useMemo(() => {
    if (!page) return [];
    const custom = (page.custom_content && 
      typeof page.custom_content === 'object' 
      ? page.custom_content : {}) as Record<string, any>;
    if (Array.isArray(custom.faqs) && custom.faqs.length > 0) {
      return custom.faqs.map((f: any, idx: number) => ({
        id: f.id || `custom-faq-${idx}`,
        page_id: page.id,
        question: f.question,
        answer: f.answer,
        display_order: idx,
      }));
    }
    if (fetchedFaqs && fetchedFaqs.length > 0) return fetchedFaqs;
    return getStaticFaqsByPageId(page.id || page.slug, page.city);
  }, [page, fetchedFaqs]);

  const installers = useMemo(() => {
    if (!page) return [];
    const custom = (page.custom_content && typeof page.custom_content === 'object' ? page.custom_content : {}) as Record<string, any>;
    if (Array.isArray(custom.installers) && custom.installers.length > 0) {
      return custom.installers.map((inst: any, idx: number) => ({
        id: inst.id || `custom-inst-${idx}`,
        city: inst.city || page.city || 'Local',
        name: inst.name,
        rating: Number(inst.rating) || 4.9,
        price_range_min: Number(inst.price_range_min || inst.priceRangeMin) || 4500,
        price_range_max: Number(inst.price_range_max || inst.priceRangeMax) || 8500,
        experience_years: Number(inst.experience_years || inst.experienceYears) || 8,
      }));
    }
    if (fetchedInstallers && fetchedInstallers.length > 0) return fetchedInstallers;
    if (page.city) return getStaticInstallers(page.city);
    return [];
  }, [page, fetchedInstallers]);

  const handleEditSection = (sectionId: PageSectionId, sectionTitle: string) => {
    setSelectedSectionId(sectionId);
    setSelectedSectionTitle(sectionTitle);
    setInlineModalOpen(true);
  };

  const handleSavePageFromModal = async (updatedPage: PageRecord) => {
    setOverridePage(updatedPage);
    try {
      await updatePage(updatedPage.id, updatedPage);
    } catch (e) {
      console.warn('Error saving page changes:', e);
    }
  };

  // Draft Page Check for non-admin users
  if (page && page.status === 'draft' && !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header pages={[]} />
        <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <Sun className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Coming Soon
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              This solar cost guide is being prepared. Check back soon for accurate pricing data.
            </p>
            <Link to="/" className="inline-block px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // 404 Fallback
  if (!page && !loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header pages={allPages} />
        <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
              <Compass className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Solar Page Not Found
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              We couldn't find a guide for <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-blue-600">/{slug}</code>. Browse our popular global city guides or return to the main calculator.
            </p>

            <div className="pt-2 space-y-2">
              <Link
                to="/"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all block"
              >
                Return to Homepage Calculator
              </Link>
              <Link
                to="/sitemap"
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all block"
              >
                Browse All Solar Cost Guides
              </Link>
            </div>
          </div>
        </main>
        <Footer pages={allPages} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-500 selection:text-white">
      <SEOHead
        title={page.meta_title || page.title}
        description={page.meta_description}
        url={`https://costofsolarinstallation.com/${page.slug}`}
        type="article"
        page={page}
        faqs={faqs}
        country={page.state || (page.custom_content as any)?.country || (page.city ? 'India / Global' : undefined)}
        dateModified={page.updated_at || page.created_at}
        datasetName={page.city ? `${page.city} Solar Cost & Irradiance Dataset` : `${page.title} Dataset`}
        datasetDescription={page.meta_description || `Solar pricing, hardware specifications, and grid net metering datasets for ${page.title}`}
      />

      {/* Admin Quick Banner when logged in */}
      {isAdmin && (
        <div className="bg-slate-950 text-slate-300 px-4 py-2 text-xs border-b border-slate-800 flex items-center justify-between z-50 sticky top-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white">Admin Live Mode:</span>
            <span>You can click "Edit Section" on any section or open CMS.</span>
          </div>
          <Link
            to="/admin"
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Open in CMS</span>
          </Link>
        </div>
      )}

      <Header pages={allPages} />

      <main className="flex-1">
        {page.template_type === 'city' && (
          <CityPageTemplate
            page={page}
            faqs={faqs}
            installers={installers}
            allPages={allPages}
            isAdmin={isAdmin}
            onEditSection={handleEditSection}
          />
        )}

        {page.template_type === 'system_size' && (
          <SystemSizeTemplate
            page={page}
            faqs={faqs}
            allPages={allPages}
            isAdmin={isAdmin}
            onEditSection={handleEditSection}
          />
        )}

        {page.template_type === 'sqft' && (
          <SqFtPageTemplate
            page={page}
            faqs={faqs}
            allPages={allPages}
            isAdmin={isAdmin}
            onEditSection={handleEditSection}
          />
        )}
      </main>

      {/* Inline Section Editing Modal */}
      {page && (
        <InlineSectionModal
          page={page}
          sectionId={selectedSectionId}
          sectionTitle={selectedSectionTitle}
          isOpen={inlineModalOpen}
          onClose={() => setInlineModalOpen(false)}
          onSavePage={handleSavePageFromModal}
        />
      )}

      <Footer pages={allPages} />
    </div>
  );
};
