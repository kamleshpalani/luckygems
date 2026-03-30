import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import SEO from '../components/common/SEO';
import Schema, { buildFAQSchema, buildBreadcrumbSchema } from '../components/common/Schema';
import SectionWrapper, { SectionHeader } from '../components/common/SectionWrapper';
import FAQAccordion from '../components/common/FAQAccordion';
import CTASection from '../components/common/CTASection';
import Breadcrumbs from '../components/common/Breadcrumbs';
import NotFoundPage from './NotFoundPage';
import { ICON_MAP } from '../utils/iconMap';
import { getRemedyBySlug, REMEDIES } from '../data/remedies';

export default function RemedyDetailPage() {
  const { slug } = useParams();
  const remedy   = getRemedyBySlug(slug);

  if (!remedy) return <NotFoundPage />;

  const Icon        = ICON_MAP[remedy.icon] || ICON_MAP.Sparkles;
  const related     = REMEDIES.filter((r) => remedy.relatedSlugs?.includes(r.slug) && r.slug !== slug).slice(0, 3);
  const breadcrumbs = [
    { label: 'Remedies',    path: '/remedies' },
    { label: remedy.title,  path: `/remedies/${slug}` },
  ];

  return (
    <>
      <SEO
        title={`${remedy.title} – Vedic Remedy Guidance`}
        description={remedy.shortDesc}
        canonical={`/remedies/${slug}`}
      />
      {remedy.concerns.length > 0 && (
        <Schema type="FAQPage" data={buildFAQSchema(remedy.concerns)} />
      )}
      <Schema type="BreadcrumbList" data={buildBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-8 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={breadcrumbs.slice(0, -1)} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-5">
              <Icon size={13} className="text-gold-300" />
              <span className="text-xs text-gold-200 font-medium">{remedy.category}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 leading-tight">
              {remedy.hero.heading}
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed">
              {remedy.hero.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <SectionWrapper variant="white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-10">

          {/* Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* What it means */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-stone-900 mb-3">Understanding {remedy.title}</h2>
              <p className="text-stone-600 leading-relaxed">{remedy.whatItMeans}</p>
            </div>

            {/* Issues addressed */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-stone-900 mb-4">Common Issues Addressed</h2>
              <ul className="space-y-3">
                {remedy.issuesAddressed.map((issue) => (
                  <li key={issue} className="flex items-start gap-3 text-stone-600 text-sm">
                    <CheckCircle size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>

            {/* How guidance works */}
            <div className="card-gold p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-gold-500" />
                <h2 className="font-serif text-lg font-semibold text-stone-900">How Guidance Is Provided</h2>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">{remedy.howGuidanceWorks}</p>
            </div>

            {/* FAQ */}
            {remedy.concerns.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-semibold text-stone-900 mb-4">Common Questions</h2>
                <FAQAccordion items={remedy.concerns} flat />
              </div>
            )}

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h3 className="font-serif text-lg text-stone-900 mb-4">Related Remedies & Services</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {related.map((r) => {
                    const RelIcon = ICON_MAP[r.icon] || ICON_MAP.Sparkles;
                    return (
                      <Link
                        key={r.slug}
                        to={`/remedies/${r.slug}`}
                        className="card p-4 flex items-center gap-3 group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-gold-50 flex items-center justify-center flex-shrink-0">
                          <RelIcon size={16} className="text-gold-600" />
                        </div>
                        <span className="text-sm font-medium text-stone-800 group-hover:text-maroon-600 transition-colors">
                          {r.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center mx-auto">
                <Icon size={20} className="text-gold-600" />
              </div>
              <h3 className="font-serif font-semibold text-stone-900">{remedy.title}</h3>
              <p className="text-stone-400 text-xs leading-relaxed">{remedy.shortDesc}</p>
              <Link to="/book" className="btn-primary w-full justify-center !text-sm">
                Book Consultation
              </Link>
              <a
                href="https://wa.me/17324480667"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors w-full justify-center"
              >
                <MessageCircle size={13} />
                WhatsApp Dr. Gurudeva
              </a>
            </div>

            <div className="card p-5">
              <h4 className="font-semibold text-stone-800 text-sm mb-3">All Remedies</h4>
              <Link to="/remedies" className="flex items-center gap-1.5 text-maroon-500 text-sm hover:underline">
                View all remedies <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <CTASection
        heading={`Get Guidance on ${remedy.title}`}
        subtext="Book a consultation to understand if this remedy applies to your chart and how to approach it."
      />
    </>
  );
}
