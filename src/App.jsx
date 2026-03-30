import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import PageLoader from './components/common/PageLoader';

/* ── Eager-loaded critical pages ── */
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

/* ── Lazy-loaded pages ── */
const AboutPage              = lazy(() => import('./pages/AboutPage'));
const ServicesPage           = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage      = lazy(() => import('./pages/ServiceDetailPage'));
const RemediesPage           = lazy(() => import('./pages/RemediesPage'));
const RemedyDetailPage       = lazy(() => import('./pages/RemedyDetailPage'));
const GemstonesPage          = lazy(() => import('./pages/GemstonesPage'));
const BuyGemstonesPage       = lazy(() => import('./pages/BuyGemstonesPage'));
const ArticlesPage           = lazy(() => import('./pages/ArticlesPage'));
const ArticleDetailPage      = lazy(() => import('./pages/ArticleDetailPage'));
const FAQPage                = lazy(() => import('./pages/FAQPage'));
const FactsPage              = lazy(() => import('./pages/FactsPage'));
const ContactPage            = lazy(() => import('./pages/ContactPage'));
const BookPage               = lazy(() => import('./pages/BookPage'));
const PaymentPage            = lazy(() => import('./pages/PaymentPage'));
const InquiryPage            = lazy(() => import('./pages/InquiryPage'));
const LocationPage           = lazy(() => import('./pages/LocationPage'));
const LanguagePage           = lazy(() => import('./pages/LanguagePage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<RootLayout />}>
            {/* Core */}
            <Route index                          element={<HomePage />} />
            <Route path="about"                   element={<AboutPage />} />

            {/* Services */}
            <Route path="services"                element={<ServicesPage />} />
            <Route path="services/:slug"          element={<ServiceDetailPage />} />

            {/* Remedies */}
            <Route path="remedies"                element={<RemediesPage />} />
            <Route path="remedies/:slug"          element={<RemedyDetailPage />} />

            {/* Gemstones */}
            <Route path="gemstones"               element={<GemstonesPage />} />
            <Route path="gemstones/buy"           element={<BuyGemstonesPage />} />

            {/* Content */}
            <Route path="articles"                element={<ArticlesPage />} />
            <Route path="articles/:slug"          element={<ArticleDetailPage />} />
            <Route path="faq"                     element={<FAQPage />} />
            <Route path="facts"                   element={<FactsPage />} />

            {/* Conversion */}
            <Route path="contact"                 element={<ContactPage />} />
            <Route path="book"                    element={<BookPage />} />
            <Route path="payment"                 element={<PaymentPage />} />
            <Route path="inquiry"                 element={<InquiryPage />} />

            {/* SEO landing pages */}
            <Route path="locations/:slug"         element={<LocationPage />} />
            <Route path="languages/:slug"         element={<LanguagePage />} />

            {/* 404 */}
            <Route path="*"                       element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
