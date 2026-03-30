import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionWrapper, { SectionHeader } from '../components/common/SectionWrapper';
import RemedyCard from '../components/remedies/RemedyCard';
import FAQAccordion from '../components/common/FAQAccordion';
import CTASection from '../components/common/CTASection';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { REMEDIES, REMEDY_CATEGORIES } from '../data/remedies';
import { FAQ_GROUPS } from '../data/faq';

const WHY_REMEDIES = [
  'Remedies are prescribed based on your specific chart — not generic advice.',
  'Each remedy targets identified planetary imbalances, not assumed ones.',
  'Dr. Gurudeva explains the purpose and logic of every remedy he recommends.',
  'Remedies are practical, proportional, and aligned with your life situation.',
  'You always have the choice — no remedy is mandatory.',
];

export default function RemediesPage() {
  const remedyFaqs = FAQ_GROUPS.find((g) => g.category === 'Remedies')?.items || [];

  return (
    <>
      <SEO
        title="Vedic Remedies – Poojas, Doshas, Spiritual Healing, Yantras & Vastu"
        description="Explore Dr. Gurudeva's Vedic remedies — poojas, homas, dosha analysis, black magic removal, spiritual healing, yantras, and Vastu consultations."
        canonical="/remedies"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-8 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: 'Remedies', path: '/remedies' }]} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 max-w-2xl"
          >
            <p className="section-label text-gold-300 mb-3">Vedic Remedies</p>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-5 leading-tight">
              Address the Root Causes
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed">
              Targeted Vedic remedies prescribed based on your birth chart — to address planetary imbalances, doshas and spiritual blockages affecting your life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro / why remedies */}
      <SectionWrapper variant="white">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeader
              label="About Remedies"
              title="What Are Vedic Remedies?"
              align="left"
              subtitle="Vedic astrology doesn't just predict — it prescribes. The ancient texts include a rich tradition of remedies designed to work with the planetary energies affecting your life."
            />
          </div>
          <div>
            <h3 className="font-serif text-lg text-stone-900 mb-4">Dr. Gurudeva's Approach</h3>
            <ul className="space-y-3">
              {WHY_REMEDIES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-stone-600 text-sm">
                  <CheckCircle size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Remedy grid by category */}
      {REMEDY_CATEGORIES.map((category) => {
        const catRemedies = REMEDIES.filter((r) => r.category === category);
        return (
          <SectionWrapper key={category} variant={category === 'Doshas' ? 'ivory' : 'white'}>
            <h2 className="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-3">
              <Sparkles size={18} className="text-gold-500" />
              {category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {catRemedies.map((remedy, i) => (
                <RemedyCard key={remedy.slug} remedy={remedy} index={i} />
              ))}
            </div>
          </SectionWrapper>
        );
      })}

      {/* FAQ */}
      <SectionWrapper variant="ivory">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Questions" title="Remedy FAQs" />
          <FAQAccordion items={remedyFaqs} flat />
          <div className="text-center mt-6">
            <Link to="/faq" className="btn-secondary">
              View All FAQs <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      <CTASection
        heading="Explore Your Remedies"
        subtext="Book a consultation to identify which remedies — if any — are appropriate for your chart."
      />
    </>
  );
}
