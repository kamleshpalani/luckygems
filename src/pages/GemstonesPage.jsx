import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, ArrowRight, Gem } from 'lucide-react';
import SEO from '../components/common/SEO';
import Schema, { buildFAQSchema } from '../components/common/Schema';
import SectionWrapper, { SectionHeader } from '../components/common/SectionWrapper';
import GemstoneCard from '../components/gemstones/GemstoneCard';
import FAQAccordion from '../components/common/FAQAccordion';
import CTASection from '../components/common/CTASection';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { GEMSTONES } from '../data/gemstones';
import { FAQ_GROUPS } from '../data/faq';

const WEARING_STEPS = [
  { step: '1', title: 'Consultation First',    desc: 'Schedule a gemstone analysis consultation. No gemstone should be purchased without a chart review.' },
  { step: '2', title: 'Prescription',           desc: 'Dr. Gurudeva prescribes the correct stone, weight, metal and finger for your chart.' },
  { step: '3', title: 'Source or Purchase',     desc: 'Use the prescribed gemstone — purchase from Dr. Gurudeva or a trusted certified source.' },
  { step: '4', title: 'Energization',           desc: 'The stone is energized with the appropriate planetary mantra before wearing.' },
  { step: '5', title: 'Correct Day & Time',     desc: 'Worn on the prescribed day and time for maximum effectiveness.' },
];

const CAUTIONS = [
  'Never wear a gemstone without a chart-based prescription',
  'Avoid synthetic or glass-filled stones — they carry no astrological potency',
  'Wearing the wrong stone can amplify malefic planetary effects',
  'Popular "zodiac stones" are not reliable — your Lagna and functional benefics matter most',
];

export default function GemstonesPage() {
  const gemFaqs = FAQ_GROUPS.find((g) => g.category === 'Gemstones')?.items || [];

  return (
    <>
      <SEO
        title="Vedic Gemstone Guidance – Lucky Gem Report & Prescription by Dr. Gurudeva"
        description="Gemstone guidance from Dr. Gurudeva — personalized gemstone prescriptions based on your Vedic birth chart. Learn which stone is right for you and why."
        canonical="/gemstones"
      />
      <Schema type="FAQPage" data={buildFAQSchema(gemFaqs)} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-8 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: 'Gemstones', path: '/gemstones' }]} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 max-w-2xl"
          >
            <p className="section-label text-gold-300 mb-3">Vedic Gemstones</p>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-5 leading-tight">
              The Right Gemstone, Prescribed for You
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed">
              Gemstones are among the most potent Vedic remedies — when correctly prescribed. Every recommendation is based on your unique birth chart, not your Sun sign.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <SectionWrapper variant="white">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="section-label">About Gemstone Therapy</p>
            <h2 className="section-title mb-2">How Vedic Gemstone Therapy Works</h2>
            <div className="gold-divider" />
            <p className="text-stone-600 leading-relaxed mt-4">
              In Vedic astrology, natural gemstones are believed to amplify the energies of specific planets. When a functional benefic planet in your chart is weak, wearing its corresponding gemstone can strengthen its positive influence in your life.
            </p>
            <p className="text-stone-600 leading-relaxed mt-3">
              However, this is a precision science. The wrong gemstone — one that strengthens a malefic planet for your specific Lagna — can make things worse. Dr. Gurudeva never recommends a gemstone without first analyzing the complete birth chart.
            </p>
          </div>

          {/* Lucky Gem Report */}
          <div id="lucky-gem-report" className="card-gold p-7">
            <div className="flex items-center gap-3 mb-4">
              <Gem size={22} className="text-gold-600" />
              <h3 className="font-serif text-xl font-semibold text-stone-900">Lucky Gem Report</h3>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed mb-5">
              Receive a detailed written gemstone report specific to your birth chart. Includes your primary gemstone recommendation, supporting stones, wearing guidelines, and gemstones to avoid.
            </p>
            <ul className="space-y-2.5 mb-6">
              {['Primary gemstone for your Lagna', 'Supporting stones and their roles', 'Stones that should be avoided', 'Weight, metal, finger, and timing', 'Approximate price range guidance'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-stone-700 text-sm">
                  <CheckCircle size={13} className="text-gold-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/book?service=gemstone-report" className="btn-primary w-full justify-center">
              Get Your Gem Report
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Gemstone grid */}
      <SectionWrapper variant="ivory">
        <SectionHeader
          label="The Nine Gems"
          title="Navaratna – The Planetary Gemstones"
          subtitle="Each of the nine classical Vedic planets has a corresponding gemstone. Whether or not to wear any of these depends entirely on your individual chart."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {GEMSTONES.map((gem, i) => (
            <GemstoneCard key={gem.slug} gem={gem} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Wearing process */}
      <SectionWrapper variant="white">
        <SectionHeader
          label="The Process"
          title="How to Wear a Gemstone Correctly"
          subtitle="The correct approach from consultation to wearing — for maximum benefit."
        />
        <div className="grid sm:grid-cols-5 gap-4">
          {WEARING_STEPS.map(({ step, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.09 }}
              className="text-center"
            >
              <div className="w-10 h-10 rounded-full bg-maroon-500 text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">
                {step}
              </div>
              <h3 className="font-serif font-semibold text-stone-900 text-sm mb-1.5">{title}</h3>
              <p className="text-stone-500 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Caution */}
      <SectionWrapper variant="ivory">
        <div className="max-w-2xl mx-auto">
          <div className="card-gold p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-gold-600" />
              <h3 className="font-serif text-lg font-semibold text-stone-900">Important Cautions</h3>
            </div>
            <ul className="space-y-3">
              {CAUTIONS.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-stone-700 text-sm">
                  <AlertTriangle size={13} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Questions" title="Gemstone FAQs" />
          <FAQAccordion items={gemFaqs} flat />
          <div className="text-center mt-6">
            <Link to="/gemstones/buy" className="btn-outline">
              View Available Gemstones <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      <CTASection
        heading="Get Your Personalized Gemstone Recommendation"
        subtext="A gemstone prescription is included in the Full Horoscope consultation or available as a standalone report."
      />
    </>
  );
}
