import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaqRecord, BreadcrumbItem } from '../../types';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  faqs?: FaqRecord[];
  breadcrumbs?: BreadcrumbItem[];
  schemaType?: 'website' | 'localBusiness' | 'product';
  city?: string;
  state?: string;
  country?: string;
  priceMin?: number;
  priceMax?: number;
  dateModified?: string;
  datasetName?: string;
  datasetDescription?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  faqs = [],
  breadcrumbs = [],
  schemaType = 'website',
  city,
  state,
  country,
  priceMin,
  priceMax,
  dateModified,
  datasetName,
  datasetDescription,
}) => {
  const domain = 'https://costofsolarinstallation.com';
  const fullCanonical = canonicalUrl 
    ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${domain}${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`) 
    : domain;

  // JSON-LD Schemas
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cost of Solar Installation',
    url: domain,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${domain}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${domain}${item.url.startsWith('/') ? '' : '/'}${item.url}`
    }))
  } : null;

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: datasetName || `Solar Installation Cost Data — ${city || 'Regional'} 2026`,
    description: datasetDescription || `Aggregated solar panel installation pricing data for ${city || 'the region'}${country ? `, ${country}` : ''}`,
    dateModified: dateModified || new Date().toISOString().split('T')[0],
    creator: {
      '@type': 'Organization',
      name: 'Cost of Solar Installation'
    },
    variableMeasured: 'Solar installation cost per watt',
    measurementTechnique: 'Installer quote aggregation'
  };

  const localBusinessSchema = (schemaType === 'localBusiness' && city) ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Solar Rooftop Installation Services ${city}`,
    description: `Certified rooftop solar panel installation, PM Surya Ghar Muft Bijli Yojana subsidy assistance, and net metering in ${city}, ${state || 'India'}.`,
    url: fullCanonical,
    areaServed: {
      '@type': 'City',
      name: city,
      addressRegion: state,
      addressCountry: 'IN'
    },
    priceRange: priceMin && priceMax ? `₹${priceMin.toLocaleString('en-IN')} - ₹${priceMax.toLocaleString('en-IN')}` : '₹₹₹',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, EMI',
    currenciesAccepted: 'INR'
  } : null;

  const productSchema = (schemaType === 'product' && priceMin) ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: description,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: priceMin,
      highPrice: priceMax || priceMin * 1.3,
      offerCount: '10'
    }
  } : null;

  // Direct sync to document head for environments
  useEffect(() => {
    document.title = title;
    
    // update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // update og tags
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:url', fullCanonical);
    setMeta('og:type', ogType);

    // update canonical link
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      document.head.appendChild(canon);
    }
    canon.setAttribute('href', fullCanonical);
  }, [title, description, fullCanonical, ogType]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content="Cost of Solar Installation" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {localBusinessSchema && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}

      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}

      {datasetSchema && (
        <script type="application/ld+json">
          {JSON.stringify(datasetSchema)}
        </script>
      )}
    </Helmet>
  );
};
