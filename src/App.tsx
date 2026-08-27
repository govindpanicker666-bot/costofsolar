import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { HomePage } from './pages/HomePage';
import { DynamicPage } from './pages/DynamicPage';
import { AdminPage } from './pages/AdminPage';
import { SitemapPage } from './pages/SitemapPage';
import { InlineEditProvider } from './components/common/InlineEditable';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <HelmetProvider>
      <InlineEditProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* 1. Public Homepage with Dynamic Calculator & City Price Matrix */}
            <Route path="/" element={<HomePage />} />

            {/* 2. CMS Admin Dashboard (Password Protected /admin) */}
            <Route path="/admin" element={<AdminPage />} />

            {/* 3. HTML & XML Sitemap Indexes */}
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/sitemap.xml" element={<SitemapPage />} />

            {/* 4. Catch-all Dynamic Programmatic SEO Page Router */}
            <Route path="/:slug" element={<DynamicPage />} />
          </Routes>
        </BrowserRouter>
      </InlineEditProvider>
    </HelmetProvider>
  );
}

