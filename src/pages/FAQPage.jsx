import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import Schema, { buildFAQSchema } from '../components/common/Schema';
import SectionWrapper, { SectionHeader } from '../components/common/SectionWrapper';
import FAQAccordion from '../components/common/FAQAccordion';
import CTASection from '../components/common/CTASection';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { FAQ_GROUPS, FAQ_FLAT } from '../data/faq';

export default function FAQPage() {
  const [activeGroup, setActiveGroup] = useState('All');

  const groups = FAQ_GROUPS.map((g) => g.category);
  const displayGroups =
    activeGroup === 'All' ? FAQ_GROUPS : FAQ_GROUPS.filter((g) => g.category === activeGroup);

  return (
    <>
      <SEO
        title="Frequently Asked Questions – Vedic Astrology Consultations with Dr. Gurudeva"
        description="Answers to the most common questions about Vedic astrology consultations, gemstone recommendations, remedies, pricing, and appointments with Dr. Gurudeva."
        canonical="/faq"
      />
      <Schema type="FAQPage" data={buildFAQSchema(FAQ_FLAT)} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-8 md:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: 'FAQ', path: '/faq' }]} />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 max-w-xl"
          >
            <p className="section-label text-gold-300 mb-2">Support</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed">
              Find answers to common questions about consultations, gemstone prescriptions, remedies, pricing, and how to book an appointment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category tabs */}
      <SectionWrapper variant="white">
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', ...groups].map((g) => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeGroup === g
                  ? 'bg-maroon-600 text-white border-maroon-600'
                  : 'border-stone-300 text-stone-600 hover:border-maroon-400 hover:text-maroon-600'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="space-y-10">
          {displayGroups.map(({ category, items }, i) => (
            <div key={category}>
              <h2 className="font-serif text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
                <HelpCircle size={18} className="text-gold-500" />
                {category}
              </h2>
              <FAQAccordion items={items} flat />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-stone-600 text-sm mb-4">
            Didn't find the answer you were looking for?
          </p>
          <Link to="/contact" className="btn-primary">Contact Us</Link>
        </div>
      </SectionWrapper>

      <CTASection
        heading="Ready to Book a Consultation?"
        subtext="Experience the depth of a personalized Vedic astrology reading with Dr. Gurudeva."
      />
    </>
  );
}
