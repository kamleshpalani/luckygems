import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Phone, CheckCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import Schema, { buildFAQSchema } from '../components/common/Schema';
import SectionWrapper, { SectionHeader } from '../components/common/SectionWrapper';
import FAQAccordion from '../components/common/FAQAccordion';
import CTASection from '../components/common/CTASection';
import Breadcrumbs from '../components/common/Breadcrumbs';
import NotFoundPage from './NotFoundPage';
import { getLanguageBySlug } from '../data/languages';
import { CONTACT_INFO } from '../data/navigation';

export default function LanguagePage() {
  const { slug } = useParams();
  const page = getLanguageBySlug(slug);

  if (!page) return <NotFoundPage />;

  return (
    <>
      <SEO
        title={page.metaTitle}
        description={page.metaDesc}
        canonical={`/languages/${slug}`}
      />
      {page.faqs && <Schema type="FAQPage" data={buildFAQSchema(page.faqs)} />}

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-8 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: page.heroHeading || page.metaTitle, path: `/languages/${slug}` }]} />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <Globe size={16} className="text-gold-400" />
              <p className="section-label text-gold-300">Language Services</p>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {page.heroHeading || page.metaTitle}
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed mb-6">{page.heroParagraph || page.metaDesc}</p>
            {page.languageNote && (
              <div className="inline-block bg-gold-500/20 border border-gold-400/40 rounded-lg px-4 py-2 mb-5">
                <p className="text-gold-200 text-sm font-medium">{page.languageNote}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <Link to="/book" className="btn-gold">Book a Consultation</Link>
              <a href={`tel:${CONTACT_INFO.phone}`} className="btn-outline border-white text-white hover:bg-white/10">
                <Phone size={14} /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <SectionWrapper variant="white">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="section-label">Language & Community</p>
            <h2 className="section-title mb-2">{page.language ? `${page.language}-Speaking Astrologer` : 'South Indian Astrology'}</h2>
            <div className="gold-divider" />
            <p className="text-stone-600 leading-relaxed mt-4">{page.regionDesc || page.metaDesc}</p>
            {page.additionalDesc && (
              <p className="text-stone-600 leading-relaxed mt-3">{page.additionalDesc}</p>
            )}
          </div>
          <div className="card-gold p-6">
            <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Why Choose a Native-Language Consultation?</h3>
            <ul className="space-y-2.5">
              {[
                'Greater comfort discussing personal and sensitive topics',
                'Traditional Vedic terminology explained in your language',
                'Cultural context and regional astrological traditions preserved',
                'No nuance lost in translation',
                'More effective remedies rooted in your cultural practice',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-stone-700 text-sm">
                  <CheckCircle size={13} className="text-gold-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Services */}
      <SectionWrapper variant="ivory">
        <SectionHeader label="What We Offer" title={`Full Vedic Astrology Services${page.language ? ` in ${page.language}` : ''}`} subtitle="All services available in your language — same quality, same depth, same precision." />
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/services" className="btn-primary">Browse All Services</Link>
          <Link to="/gemstones" className="btn-outline">Gemstone Guidance</Link>
          <Link to="/remedies" className="btn-outline">Vedic Remedies</Link>
          <Link to="/book" className="btn-gold">Book Now</Link>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <SectionWrapper variant="white">
          <div className="max-w-3xl mx-auto">
            <SectionHeader label="Questions" title="Frequently Asked Questions" />
            <FAQAccordion items={page.faqs} flat />
          </div>
        </SectionWrapper>
      )}

      <CTASection
        heading={`Book Your ${page.language || 'South Indian'} Astrology Consultation`}
        subtext="Available worldwide by phone or video call. Comfortable, familiar, and accurate."
      />
    </>
  );
}
