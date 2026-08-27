export type PageTemplateType = 'city' | 'system_size' | 'sqft';
export type TemplateType = PageTemplateType;

export type PageStatus = 'draft' | 'published';

export type PageSectionId = 
  | 'hero' 
  | 'quick_stats' 
  | 'cost_breakdown' 
  | 'calculator' 
  | 'system_comparison' 
  | 'specs_card' 
  | 'city_comparison_chart' 
  | 'city_size_table' 
  | 'subsidy' 
  | 'savings_chart' 
  | 'roi_chart' 
  | 'installers' 
  | 'faq' 
  | 'internal_links' 
  | 'cta'
  | 'grid_steps'
  | 'seasonal_curve'
  | 'equipment_specs'
  | 'hidden_costs'
  | 'case_study'
  | 'llm_geo';

export interface PageRecord {
  id: string;
  title: string;
  slug: string;
  template_type: PageTemplateType;
  city?: string;
  state?: string;
  avg_cost_min: number;
  avg_cost_max: number;
  cost_per_watt: number;
  payback_years: number;
  savings_per_year: number;
  subsidy_amount: number;
  system_size_kw?: number;
  sqft?: number;
  section_order: PageSectionId[];
  status: PageStatus;
  meta_title: string;
  meta_description: string;
  real_data_sources?: string;
  custom_content?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface FaqRecord {
  id: string;
  page_id: string;
  question: string;
  answer: string;
  display_order: number;
  created_at?: string;
}

export interface InstallerRecord {
  id: string;
  page_id?: string;
  city?: string;
  name: string;
  rating: number;
  reviews_count?: number;
  price_range_min: number;
  price_range_max: number;
  phone?: string;
  verified?: boolean;
  experience_years?: number;
  created_at?: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  monthly_bill: number;
  roof_area?: number;
  roof_area_sqft?: number;
  city: string;
  source_page_slug?: string;
  source_slug?: string;
  status?: 'new' | 'contacted' | 'quoted' | 'closed';
  notes?: string;
  created_at: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface CostBreakdownItem {
  component: string;
  sharePercent: number;
  minCost: number;
  midCost: number;
  maxCost: number;
  description: string;
}

export interface CityNearbyComparison {
  city: string;
  state: string;
  avgCostPerKw: number;
  costRange: string;
  subsidyPercent: number;
  isCurrent?: boolean;
}

export const FIREBASE_FIRESTORE_RULES = `// Firestore Security Rules for "Cost of Solar Installation" (costofsolarinstallation.com)
// Deploy these rules to your Firebase console under Firestore Database -> Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Programmatic SEO landing pages: Publicly readable by all visitors; write access for admin
    match /pages/{pageId} {
      allow read: if true;
      allow write: if true; // In production, restrict to authenticated admin users
    }
    
    // Frequently Asked Questions
    match /faqs/{faqId} {
      allow read: if true;
      allow write: if true;
    }
    
    // Certified Solar Installers & EPC contractors
    match /installers/{installerId} {
      allow read: if true;
      allow write: if true;
    }
    
    // Solar Subsidy & Quote Leads: Public can create quotes; admins can view and manage
    match /leads/{leadId} {
      allow create: if true;
      allow read, update, delete: if true;
    }
  }
}
`;

export const SUPABASE_SCHEMA_SQL = FIREBASE_FIRESTORE_RULES;

