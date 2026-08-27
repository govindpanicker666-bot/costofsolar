import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import {
  PageRecord,
  FaqRecord,
  InstallerRecord,
  LeadRecord,
  PageTemplateType,
  PageSectionId,
} from '../types';
import {
  getStaticPages,
  getStaticPageBySlug,
  getStaticInstallers,
  getStaticFaqsByPageId,
} from '../data/globalSolarData';

// Storage keys for offline persistence & fallback
const STORAGE_KEYS = {
  PAGES: 'solar_cms_pages_v3_firebase',
  FAQS: 'solar_cms_faqs_v3_firebase',
  INSTALLERS: 'solar_cms_installers_v3_firebase',
  LEADS: 'solar_cms_leads_v3_firebase',
  DELETED_PAGES: 'solar_cms_deleted_pages_ids_v3',
  FIREBASE_CONFIG: 'solar_custom_firebase_config_v3',
  ADMIN_AUTH: 'solar_cms_admin_auth_v2',
};

export function getDeletedPageIdentifiers(): string[] {
  return getLocalItem<string[]>(STORAGE_KEYS.DELETED_PAGES, []);
}

export function recordPageDeleted(id: string, slug?: string): void {
  const current = getDeletedPageIdentifiers();
  const next = new Set(current);
  if (id) next.add(id);
  if (slug) next.add(slug.toLowerCase());
  setLocalItem(STORAGE_KEYS.DELETED_PAGES, Array.from(next));
}

// Initial Seed Data for Programmatic SEO Pages in India
export const INITIAL_PAGES: PageRecord[] = [
  // City Pages (Template 1)
  {
    id: 'page-mumbai',
    title: 'Mumbai Solar Installation Cost 2026',
    slug: 'solar-installation-cost-in-mumbai',
    template_type: 'city',
    city: 'Mumbai',
    state: 'Maharashtra',
    avg_cost_min: 48000,
    avg_cost_max: 56000,
    cost_per_watt: 52,
    payback_years: 3.6,
    savings_per_year: 54000,
    subsidy_amount: 0,
    system_size_kw: 3,
    section_order: ['hero', 'quick_stats', 'cost_breakdown', 'calculator', 'system_comparison', 'city_comparison_chart', 'subsidy', 'installers', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: 'Solar Installation Cost in Mumbai 2026 | Prices, Subsidies & Top Installers',
    meta_description: 'Check 2026 solar rooftop installation costs in Mumbai. Compare 1kW to 10kW prices, MSEDCL & Tata Power net metering subsidies up to ₹78,000, and verified local solar installers.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-delhi',
    title: 'Delhi NCR Solar Installation Cost 2026',
    slug: 'solar-installation-cost-in-delhi',
    template_type: 'city',
    city: 'Delhi NCR',
    state: 'Delhi',
    avg_cost_min: 45000,
    avg_cost_max: 53000,
    cost_per_watt: 49,
    payback_years: 3.4,
    savings_per_year: 58000,
    subsidy_amount: 0,
    system_size_kw: 3,
    section_order: ['hero', 'quick_stats', 'cost_breakdown', 'calculator', 'system_comparison', 'city_comparison_chart', 'subsidy', 'installers', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: 'Solar Installation Cost in Delhi NCR 2026 | Prices, Subsidies & Top Installers',
    meta_description: 'Complete 2026 guide to solar panel installation cost in Delhi & NCR. Learn about BSES/TPDDL solar policy, PM Surya Ghar subsidy ₹78,000, and top rated installers.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-bangalore',
    title: 'Bangalore Solar Installation Cost 2026',
    slug: 'solar-installation-cost-in-bangalore',
    template_type: 'city',
    city: 'Bangalore',
    state: 'Karnataka',
    avg_cost_min: 47000,
    avg_cost_max: 55000,
    cost_per_watt: 51,
    payback_years: 3.8,
    savings_per_year: 52000,
    subsidy_amount: 0,
    system_size_kw: 3,
    section_order: ['hero', 'quick_stats', 'cost_breakdown', 'calculator', 'system_comparison', 'city_comparison_chart', 'subsidy', 'installers', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: 'Solar Installation Cost in Bangalore 2026 | Prices, Subsidies & Top Installers',
    meta_description: 'Explore solar rooftop costs in Bangalore (Bengaluru) for 2026. BESCOM net metering guidelines, rooftop subsidy calculator, and top certified EPC contractors.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-hyderabad',
    title: 'Hyderabad Solar Installation Cost 2026',
    slug: 'solar-installation-cost-in-hyderabad',
    template_type: 'city',
    city: 'Hyderabad',
    state: 'Telangana',
    avg_cost_min: 46000,
    avg_cost_max: 54000,
    cost_per_watt: 50,
    payback_years: 3.5,
    savings_per_year: 56000,
    subsidy_amount: 0,
    system_size_kw: 3,
    section_order: ['hero', 'quick_stats', 'cost_breakdown', 'calculator', 'system_comparison', 'city_comparison_chart', 'subsidy', 'installers', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: 'Solar Installation Cost in Hyderabad 2026 | Prices, Subsidies & Top Installers',
    meta_description: 'Hyderabad rooftop solar cost guide 2026. TSSPDCL net-metering details, central subsidy up to ₹78,000, solar ROI calculations, and trusted installers in Telangana.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-chennai',
    title: 'Chennai Solar Installation Cost 2026',
    slug: 'solar-installation-cost-in-chennai',
    template_type: 'city',
    city: 'Chennai',
    state: 'Tamil Nadu',
    avg_cost_min: 46500,
    avg_cost_max: 54500,
    cost_per_watt: 50.5,
    payback_years: 3.7,
    savings_per_year: 53000,
    subsidy_amount: 0,
    system_size_kw: 3,
    section_order: ['hero', 'quick_stats', 'cost_breakdown', 'calculator', 'system_comparison', 'city_comparison_chart', 'subsidy', 'installers', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: 'Solar Installation Cost in Chennai 2026 | Prices, Subsidies & Top Installers',
    meta_description: '2026 Solar installation cost in Chennai, Tamil Nadu. TANGEDCO rooftop net-metering norms, PM Surya Ghar subsidy details, and cost calculator for 1kW-10kW.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-ahmedabad',
    title: 'Ahmedabad Solar Installation Cost 2026',
    slug: 'solar-installation-cost-in-ahmedabad',
    template_type: 'city',
    city: 'Ahmedabad',
    state: 'Gujarat',
    avg_cost_min: 42000,
    avg_cost_max: 49000,
    cost_per_watt: 45.5,
    payback_years: 3.1,
    savings_per_year: 62000,
    subsidy_amount: 0,
    system_size_kw: 3,
    section_order: ['hero', 'quick_stats', 'cost_breakdown', 'calculator', 'system_comparison', 'city_comparison_chart', 'subsidy', 'installers', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: 'Solar Installation Cost in Ahmedabad 2026 | Prices, Subsidies & Top Installers',
    meta_description: 'Gujarat leads solar rooftop adoption! Get updated 2026 solar installation rates in Ahmedabad, Torrent Power / UGVCL subsidy process, and top verified solar vendors.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-pune',
    title: 'Pune Solar Installation Cost 2026',
    slug: 'solar-installation-cost-in-pune',
    template_type: 'city',
    city: 'Pune',
    state: 'Maharashtra',
    avg_cost_min: 47500,
    avg_cost_max: 55000,
    cost_per_watt: 51.2,
    payback_years: 3.6,
    savings_per_year: 54500,
    subsidy_amount: 0,
    system_size_kw: 3,
    section_order: ['hero', 'quick_stats', 'cost_breakdown', 'calculator', 'system_comparison', 'city_comparison_chart', 'subsidy', 'installers', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: 'Solar Installation Cost in Pune 2026 | Prices, Subsidies & Top Installers',
    meta_description: 'Discover Pune rooftop solar installation prices in 2026. MSEDCL online subsidy application, Mono PERC vs Bifacial panel rates, and quotes from certified installers.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-jaipur',
    title: 'Jaipur Solar Installation Cost 2026',
    slug: 'solar-installation-cost-in-jaipur',
    template_type: 'city',
    city: 'Jaipur',
    state: 'Rajasthan',
    avg_cost_min: 43000,
    avg_cost_max: 50000,
    cost_per_watt: 46.5,
    payback_years: 3.2,
    savings_per_year: 60000,
    subsidy_amount: 0,
    system_size_kw: 3,
    section_order: ['hero', 'quick_stats', 'cost_breakdown', 'calculator', 'system_comparison', 'city_comparison_chart', 'subsidy', 'installers', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: 'Solar Installation Cost in Jaipur 2026 | Prices, Subsidies & Top Installers',
    meta_description: 'Detailed 2026 solar cost in Jaipur with 300+ sunny days. JVVNL net metering, PM Surya Ghar Muft Bijli Yojana subsidy, and verified Rajasthan solar EPCs.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // System Size Pages (Template 2)
  {
    id: 'page-3kw',
    title: '3kW Solar System Cost in India 2026',
    slug: '3kw-solar-system-cost',
    template_type: 'system_size',
    system_size_kw: 3,
    avg_cost_min: 145000,
    avg_cost_max: 180000,
    cost_per_watt: 52,
    payback_years: 3.4,
    savings_per_year: 54000,
    subsidy_amount: 0,
    section_order: ['hero', 'quick_stats', 'specs_card', 'cost_breakdown', 'city_size_table', 'calculator', 'subsidy', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: '3kW Solar System Cost in India 2026 | On-Grid vs Off-Grid Price & Subsidy',
    meta_description: 'Complete price breakdown of a 3kW solar system in India for 2026. On-grid cost after ₹78,000 PM Surya Ghar subsidy, daily generation, panels needed, and ROI timeline.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-5kw',
    title: '5kW Solar System Cost in India 2026',
    slug: '5kw-solar-system-cost',
    template_type: 'system_size',
    system_size_kw: 5,
    avg_cost_min: 240000,
    avg_cost_max: 290000,
    cost_per_watt: 51,
    payback_years: 3.6,
    savings_per_year: 88000,
    subsidy_amount: 0,
    section_order: ['hero', 'quick_stats', 'specs_card', 'cost_breakdown', 'city_size_table', 'calculator', 'subsidy', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: '5kW Solar System Cost in India 2026 | Price with Subsidy & Generation Specs',
    meta_description: 'Find out the exact cost of a 5kW rooftop solar plant in India. Covers on-grid and hybrid system pricing, central subsidy, units generated per month, and payback.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-10kw',
    title: '10kW Solar System Cost in India 2026',
    slug: '10kw-solar-system-cost',
    template_type: 'system_size',
    system_size_kw: 10,
    avg_cost_min: 460000,
    avg_cost_max: 540000,
    cost_per_watt: 48,
    payback_years: 3.2,
    savings_per_year: 175000,
    subsidy_amount: 0,
    section_order: ['hero', 'quick_stats', 'specs_card', 'cost_breakdown', 'city_size_table', 'calculator', 'subsidy', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: '10kW Solar System Cost in India 2026 | Commercial & Large Home Pricing',
    meta_description: '10kW solar system price in India for villas, schools, and commercial properties in 2026. Area requirements, 3-phase inverter specs, ROI calculation, and subsidies.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-2kw',
    title: '2kW Solar System Cost in India 2026',
    slug: '2kw-solar-system-cost',
    template_type: 'system_size',
    system_size_kw: 2,
    avg_cost_min: 105000,
    avg_cost_max: 130000,
    cost_per_watt: 55,
    payback_years: 3.3,
    savings_per_year: 36000,
    subsidy_amount: 60000,
    section_order: ['hero', 'quick_stats', 'specs_card', 'cost_breakdown', 'city_size_table', 'calculator', 'subsidy', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: '2kW Solar System Cost in India 2026 | Price after ₹60,000 Subsidy',
    meta_description: 'Cost and benefits of a 2kW solar rooftop system in India in 2026. Ideal for 2-3 BHK homes. Includes ₹60,000 PM Surya Ghar subsidy details and monthly bill savings.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Sq Ft Pages (Template 3)
  {
    id: 'page-2000sqft',
    title: 'Solar Installation Cost for 2000 sq ft House 2026',
    slug: 'solar-installation-cost-for-2000-sqft-house',
    template_type: 'sqft',
    sqft: 2000,
    system_size_kw: 6,
    avg_cost_min: 280000,
    avg_cost_max: 340000,
    cost_per_watt: 50,
    payback_years: 3.5,
    savings_per_year: 105000,
    subsidy_amount: 0,
    section_order: ['hero', 'quick_stats', 'cost_breakdown', 'savings_chart', 'roi_chart', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: 'Solar Installation Cost for 2000 sq ft House 2026 | System Size & ROI',
    meta_description: 'How much does it cost to install solar on a 2,000 sq ft house roof in India? Recommended 5kW–7kW capacity, monthly electricity bill reduction, and 10-year ROI chart.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-1000sqft',
    title: 'Solar Installation Cost for 1000 sq ft House 2026',
    slug: 'solar-installation-cost-for-1000-sqft-house',
    template_type: 'sqft',
    sqft: 1000,
    system_size_kw: 3,
    avg_cost_min: 150000,
    avg_cost_max: 185000,
    cost_per_watt: 53,
    payback_years: 3.4,
    savings_per_year: 54000,
    subsidy_amount: 0,
    section_order: ['hero', 'quick_stats', 'cost_breakdown', 'savings_chart', 'roi_chart', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: 'Solar Installation Cost for 1000 sq ft House 2026 | Price & Subsidy',
    meta_description: 'Estimated cost to install rooftop solar panels for a 1,000 sq ft home in India. Recommended 3kW system, government subsidies, and zero-electricity bill timeline.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-1500sqft',
    title: 'Solar Installation Cost for 1500 sq ft House 2026',
    slug: 'solar-installation-cost-for-1500-sqft-house',
    template_type: 'sqft',
    sqft: 1500,
    system_size_kw: 4,
    avg_cost_min: 200000,
    avg_cost_max: 245000,
    cost_per_watt: 51,
    payback_years: 3.5,
    savings_per_year: 72000,
    subsidy_amount: 0,
    section_order: ['hero', 'quick_stats', 'cost_breakdown', 'savings_chart', 'roi_chart', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: 'Solar Installation Cost for 1500 sq ft House 2026 | Complete Guide',
    meta_description: 'Calculate solar installation cost for a 1,500 sq ft rooftop in India in 2026. 4kW-5kW recommendations, 12-month savings graph, and net cost after subsidy.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-3000sqft',
    title: 'Solar Installation Cost for 3000 sq ft House 2026',
    slug: 'solar-installation-cost-for-3000-sqft-house',
    template_type: 'sqft',
    sqft: 3000,
    system_size_kw: 8,
    avg_cost_min: 380000,
    avg_cost_max: 450000,
    cost_per_watt: 49,
    payback_years: 3.3,
    savings_per_year: 145000,
    subsidy_amount: 0,
    section_order: ['hero', 'quick_stats', 'cost_breakdown', 'savings_chart', 'roi_chart', 'faq', 'internal_links', 'cta'],
    status: 'published',
    meta_title: 'Solar Installation Cost for 3000 sq ft House 2026 | Big Home Solar Guide',
    meta_description: 'Detailed analysis for installing solar on a 3,000 sq ft residential or commercial roof. 8kW–10kW system pricing, high-efficiency bifacial panels, and ROI timeline.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const INITIAL_FAQS: FaqRecord[] = [
  {
    id: 'faq-home-1',
    page_id: 'home',
    question: 'How much does solar installation cost on average worldwide in 2026?',
    answer: 'In 2026, average residential solar installation costs range from $0.80 to $2.85 per Watt depending on region. A standard 5kW system costs between $4,000 and $14,000 globally before incentives. Payback periods average 3.5 to 7 years depending on local electricity rates and available subsidies.',
    display_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'faq-home-2',
    page_id: 'home',
    question: 'How much roof space is needed for a residential solar system?',
    answer: 'Modern 400W-550W solar panels require approximately 55 to 65 square feet (5.1 to 6.0 square meters) per kilowatt of capacity. A standard 5kW system needs around 275 to 325 sq ft of unshaded roof space.',
    display_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'faq-home-3',
    page_id: 'home',
    question: 'What government incentives are available for solar installation?',
    answer: 'Major global incentives include the 30% Federal Tax Credit (USA), 0% VAT on solar equipment (UK, Germany, Netherlands), Small-scale Technology Certificates (Australia), and net metering programs across most countries. Visit your local energy authority website for country-specific programs.',
    display_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'faq-home-4',
    page_id: 'home',
    question: 'What is the lifespan of a solar panel system?',
    answer: 'Tier-1 monocrystalline panels carry 25 to 30-year performance warranties guaranteeing 85% or more output at year 25. Inverters typically last 10 to 15 years and may need one replacement over the system lifetime.',
    display_order: 4,
    created_at: new Date().toISOString()
  },
  {
    id: 'faq-home-5',
    page_id: 'home',
    question: 'What is net metering and how does it work?',
    answer: 'Net metering allows you to export surplus solar electricity back to the grid and receive credits against your electricity bill. A bidirectional meter tracks both import and export. At billing time you pay only for net units consumed.',
    display_order: 5,
    created_at: new Date().toISOString()
  },
];

export const INITIAL_INSTALLERS: InstallerRecord[] = [];

export const INITIAL_LEADS: LeadRecord[] = [];

// Helper to get local data safely
function getLocalItem<T>(key: string, defaultData: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
    return defaultData;
  }
}

function setLocalItem<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error writing localStorage key "${key}":`, e);
  }
}

// ----------------- Firebase Initialization & Client -----------------

export interface FirebaseConfigOptions {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  firestoreDatabaseId?: string;
}

let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

export function getFirebaseConfig(): FirebaseConfigOptions {
  try {
    const customConfigRaw = localStorage.getItem(STORAGE_KEYS.FIREBASE_CONFIG);
    if (customConfigRaw) {
      const parsed = JSON.parse(customConfigRaw);
      if (parsed.projectId || parsed.apiKey) {
        return parsed;
      }
    }
  } catch (e) {
    // Ignore JSON parse errors
  }

  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || '(default)',
  };
}

export function isFirebaseConfigured(): boolean {
  const config = getFirebaseConfig();
  return Boolean(config.projectId && (config.apiKey || config.authDomain || config.appId));
}

export function initFirebase(): { app: FirebaseApp | null; db: Firestore | null } {
  if (firestoreDb && firebaseApp) {
    return { app: firebaseApp, db: firestoreDb };
  }

  const config = getFirebaseConfig();
  if (config.projectId && config.apiKey) {
    try {
      if (getApps().length === 0) {
        firebaseApp = initializeApp({
          apiKey: config.apiKey,
          authDomain: config.authDomain || `${config.projectId}.firebaseapp.com`,
          projectId: config.projectId,
          storageBucket: config.storageBucket || `${config.projectId}.appspot.com`,
          messagingSenderId: config.messagingSenderId,
          appId: config.appId,
        });
      } else {
        firebaseApp = getApp();
      }

      firestoreDb = getFirestore(firebaseApp, config.firestoreDatabaseId || '(default)');
      return { app: firebaseApp, db: firestoreDb };
    } catch (e) {
      console.warn('Firebase initialization error, using local persistence fallback:', e);
    }
  }

  return { app: null, db: null };
}

// ----------------- Pages API -----------------

export async function getPages(): Promise<PageRecord[]> {
  const deletedIds = getDeletedPageIdentifiers();
  const deletedSet = new Set(deletedIds.map((s) => s.toLowerCase()));

  const pageMap = new Map<string, PageRecord>();

  // 1. Check if user has initialized local storage
  const hasLocal = localStorage.getItem(STORAGE_KEYS.PAGES);
  if (!hasLocal) {
    const staticList = getStaticPages();
    staticList.forEach((p) => {
      if (!deletedSet.has(p.id.toLowerCase()) && !deletedSet.has(p.slug.toLowerCase())) {
        pageMap.set(p.id, p);
      }
    });
    INITIAL_PAGES.forEach((p) => {
      if (!deletedSet.has(p.id.toLowerCase()) && !deletedSet.has(p.slug.toLowerCase())) {
        pageMap.set(p.id, p);
      }
    });
  } else {
    try {
      const localPages = getLocalItem<PageRecord[]>(STORAGE_KEYS.PAGES, []);
      if (Array.isArray(localPages)) {
        localPages.forEach((p) => {
          if (!deletedSet.has(p.id.toLowerCase()) && !deletedSet.has(p.slug.toLowerCase())) {
            pageMap.set(p.id, p);
          }
        });
      }
    } catch {}
  }

  // 2. If Firebase Firestore is active, fetch remote records
  const { db } = initFirebase();
  if (db) {
    try {
      const colRef = collection(db, 'pages');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        snap.forEach((d) => {
          const remotePage = { id: d.id, ...d.data() } as PageRecord;
          if (
            remotePage.slug &&
            !deletedSet.has(remotePage.id.toLowerCase()) &&
            !deletedSet.has(remotePage.slug.toLowerCase())
          ) {
            pageMap.set(remotePage.id, remotePage);
          }
        });
      }
    } catch (e) {
      console.warn('Firestore fetch failed, using local cache:', e);
    }
  }

  const allMerged = Array.from(pageMap.values());
  setLocalItem(STORAGE_KEYS.PAGES, allMerged);
  return allMerged;
}

export async function getPageBySlug(slug: string): Promise<{
  page: PageRecord | null;
  faqs: FaqRecord[];
  installers: InstallerRecord[];
}> {
  const cleanSlug = slug.toLowerCase();
  const deletedIds = getDeletedPageIdentifiers();
  if (deletedIds.some((id) => id.toLowerCase() === cleanSlug)) {
    return { page: null, faqs: [], installers: [] };
  }

  const pages = await getPages();
  let page = pages.find((p) => p.slug.toLowerCase() === cleanSlug) || null;

  if (!page) {
    const staticFallback = getStaticPageBySlug(slug);
    if (staticFallback && !deletedIds.some((id) => id.toLowerCase() === staticFallback.id.toLowerCase() || id.toLowerCase() === staticFallback.slug.toLowerCase())) {
      page = staticFallback;
    }
  }

  if (!page) {
    return { page: null, faqs: [], installers: [] };
  }

  let faqs = await getFaqs(page.id);
  if (!faqs || faqs.length === 0) {
    faqs = getStaticFaqsByPageId(page.id || page.slug, page.city);
  }

  let installers = page.city ? await getInstallers(page.city) : [];
  if (!installers || installers.length === 0) {
    installers = getStaticInstallers(page.city);
  }

  return { page, faqs, installers };
}

export async function createPage(pageData: Omit<PageRecord, 'id' | 'created_at' | 'updated_at'> & { id?: string }): Promise<PageRecord> {
  const newPage: PageRecord = {
    ...pageData,
    id: pageData.id || `page-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // If this slug or id was in deleted list, un-delete it
  const deletedIds = getDeletedPageIdentifiers();
  const filteredDeleted = deletedIds.filter(
    (d) => d.toLowerCase() !== newPage.id.toLowerCase() && d.toLowerCase() !== newPage.slug.toLowerCase()
  );
  setLocalItem(STORAGE_KEYS.DELETED_PAGES, filteredDeleted);

  const { db } = initFirebase();
  if (db) {
    try {
      await setDoc(doc(db, 'pages', newPage.id), newPage);
    } catch (e) {
      console.warn('Firestore write failed, writing locally:', e);
    }
  }

  const pages = getLocalItem<PageRecord[]>(STORAGE_KEYS.PAGES, INITIAL_PAGES);
  const updated = [newPage, ...pages.filter((p) => p.id !== newPage.id)];
  setLocalItem(STORAGE_KEYS.PAGES, updated);
  return newPage;
}

export async function updatePage(id: string, updates: Partial<PageRecord>): Promise<PageRecord | null> {
  const pages = getLocalItem<PageRecord[]>(STORAGE_KEYS.PAGES, INITIAL_PAGES);
  const index = pages.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedPage: PageRecord = {
    ...pages[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { db } = initFirebase();
  if (db) {
    try {
      await setDoc(doc(db, 'pages', id), updatedPage, { merge: true });
    } catch (e) {
      console.warn('Firestore update failed:', e);
    }
  }

  pages[index] = updatedPage;
  setLocalItem(STORAGE_KEYS.PAGES, pages);
  return updatedPage;
}

export async function deletePage(id: string): Promise<boolean> {
  const pages = getLocalItem<PageRecord[]>(STORAGE_KEYS.PAGES, INITIAL_PAGES);
  const targetPage = pages.find((p) => p.id === id);
  const slug = targetPage?.slug;

  // Record as deleted permanently
  recordPageDeleted(id, slug);

  const { db } = initFirebase();
  if (db) {
    try {
      await deleteDoc(doc(db, 'pages', id));
    } catch (e) {
      console.warn('Firestore delete failed:', e);
    }
  }

  const filtered = pages.filter((p) => p.id !== id);
  setLocalItem(STORAGE_KEYS.PAGES, filtered);
  return true;
}

export async function bulkUpdateStatus(ids: string[], status: 'draft' | 'published'): Promise<void> {
  const pages = getLocalItem<PageRecord[]>(STORAGE_KEYS.PAGES, INITIAL_PAGES);
  const updated = pages.map((p) => {
    if (ids.includes(p.id)) {
      return { ...p, status, updated_at: new Date().toISOString() };
    }
    return p;
  });

  const { db } = initFirebase();
  if (db) {
    try {
      for (const id of ids) {
        await updateDoc(doc(db, 'pages', id), { status, updated_at: new Date().toISOString() });
      }
    } catch (e) {
      console.warn('Firestore bulk update error:', e);
    }
  }

  setLocalItem(STORAGE_KEYS.PAGES, updated);
}

// ----------------- FAQs API -----------------

export async function getFaqs(pageId?: string): Promise<FaqRecord[]> {
  const { db } = initFirebase();
  if (db) {
    try {
      const colRef = collection(db, 'faqs');
      const q = pageId ? query(colRef, where('page_id', '==', pageId)) : colRef;
      const snap = await getDocs(q);
      if (!snap.empty) {
        const faqs: FaqRecord[] = [];
        snap.forEach((d) => faqs.push({ id: d.id, ...d.data() } as FaqRecord));
        return faqs.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
      }
    } catch (e) {
      console.warn('Firestore FAQ fetch failed:', e);
    }
  }

  const allFaqs = getLocalItem<FaqRecord[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS);
  if (!pageId || pageId === 'homepage' || pageId === 'home') {
    return allFaqs.filter((f) => f.page_id === 'homepage' || f.page_id === 'home');
  }

  const matched = allFaqs.filter((f) => f.page_id === pageId);
  return matched;
}

export async function saveFaqs(pageId: string, faqs: FaqRecord[]): Promise<void> {
  const { db } = initFirebase();
  if (db) {
    try {
      for (const faq of faqs) {
        await setDoc(doc(db, 'faqs', faq.id || `faq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`), {
          ...faq,
          page_id: pageId,
          created_at: faq.created_at || new Date().toISOString(),
        });
      }
    } catch (e) {
      console.warn('Firestore FAQ save error:', e);
    }
  }

  const allFaqs = getLocalItem<FaqRecord[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS);
  const filtered = allFaqs.filter((f) => f.page_id !== pageId);
  setLocalItem(STORAGE_KEYS.FAQS, [...filtered, ...faqs]);
}

// ----------------- Installers API -----------------

export async function getInstallers(city?: string): Promise<InstallerRecord[]> {
  const { db } = initFirebase();
  if (db) {
    try {
      const colRef = collection(db, 'installers');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const insts: InstallerRecord[] = [];
        snap.forEach((d) => insts.push({ id: d.id, ...d.data() } as InstallerRecord));
        if (city) {
          return insts.filter((i) => !i.city || i.city.toLowerCase() === city.toLowerCase());
        }
        return insts;
      }
    } catch (e) {
      console.warn('Firestore Installer fetch failed:', e);
    }
  }

  const all = getLocalItem<InstallerRecord[]>(STORAGE_KEYS.INSTALLERS, INITIAL_INSTALLERS);
  if (!city) return all;
  return all.filter((i) => (i.city && i.city.toLowerCase() === city.toLowerCase()) || i.page_id === `page-${city.toLowerCase()}`);
}

// ----------------- Leads API -----------------

export async function getLeads(): Promise<LeadRecord[]> {
  const { db } = initFirebase();
  if (db) {
    try {
      const colRef = collection(db, 'leads');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const leads: LeadRecord[] = [];
        snap.forEach((d) => leads.push({ id: d.id, ...d.data() } as LeadRecord));
        setLocalItem(STORAGE_KEYS.LEADS, leads);
        return leads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    } catch (e) {
      console.warn('Firestore Leads fetch failed:', e);
    }
  }
  return getLocalItem<LeadRecord[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
}

export async function createLead(leadData: Omit<LeadRecord, 'id' | 'created_at'>): Promise<LeadRecord> {
  const newLead: LeadRecord = {
    ...leadData,
    id: `lead-${Date.now()}`,
    status: 'new',
    created_at: new Date().toISOString(),
  };

  const { db } = initFirebase();
  if (db) {
    try {
      await setDoc(doc(db, 'leads', newLead.id), newLead);
    } catch (e) {
      console.warn('Firestore create lead failed:', e);
    }
  }

  const leads = getLocalItem<LeadRecord[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
  const updated = [newLead, ...leads];
  setLocalItem(STORAGE_KEYS.LEADS, updated);
  return newLead;
}

export async function deleteLead(id: string): Promise<boolean> {
  const { db } = initFirebase();
  if (db) {
    try {
      await deleteDoc(doc(db, 'leads', id));
    } catch (e) {
      console.warn('Firestore lead delete failed:', e);
    }
  }

  const leads = getLocalItem<LeadRecord[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
  setLocalItem(STORAGE_KEYS.LEADS, leads.filter((l) => l.id !== id));
  return true;
}

// ----------------- Aliases & Convenient Wrappers -----------------

export const fetchPages = getPages;
export async function fetchPageBySlug(slug: string): Promise<PageRecord | null> {
  const result = await getPageBySlug(slug);
  return result.page;
}
export const fetchFaqs = getFaqs;
export const fetchInstallers = getInstallers;
export const fetchLeads = getLeads;
export const submitLead = createLead;

export async function savePage(page: PageRecord): Promise<PageRecord> {
  const pages = await getPages();
  const existing = pages.find((p) => p.id === page.id);
  if (existing) {
    const updated = await updatePage(page.id, page);
    return updated || page;
  }
  return createPage(page);
}

export const bulkUpdatePagesStatus = bulkUpdateStatus;

export async function bulkDeletePages(ids: string[]): Promise<void> {
  for (const id of ids) {
    await deletePage(id);
  }
}

export async function seedDefaultDataset(): Promise<void> {
  resetToDefaultData();
}

export function resetToDefaultData(): void {
  setLocalItem(STORAGE_KEYS.PAGES, INITIAL_PAGES);
  setLocalItem(STORAGE_KEYS.FAQS, INITIAL_FAQS);
  setLocalItem(STORAGE_KEYS.INSTALLERS, INITIAL_INSTALLERS);
  setLocalItem(STORAGE_KEYS.LEADS, INITIAL_LEADS);
}
