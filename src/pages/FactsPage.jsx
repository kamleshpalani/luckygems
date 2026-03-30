import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Star, BookOpen, Globe, Gem, Leaf } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionWrapper, { SectionHeader } from '../components/common/SectionWrapper';
import CTASection from '../components/common/CTASection';
import Breadcrumbs from '../components/common/Breadcrumbs';

const ASTROLOGY_FACTS = [
  {
    title: 'Vedic vs Western Astrology',
    body: 'Vedic astrology (Jyotish) uses the sidereal zodiac — star-based — while Western astrology uses the tropical zodiac — Sun position-based. The difference is approximately 23 degrees, which is why your Vedic Sun sign often differs from your Western Sun sign.',
  },
  {
    title: 'The Lagna (Ascendant)',
    body: 'In Vedic astrology, your Lagna — the rising sign at the time of your birth — is often considered more important than your Sun sign. It governs your physical appearance, temperament, and overall life direction.',
  },
  {
    title: 'The 27 Nakshatras',
    body: 'Vedic astrology uses 27 lunar mansions called Nakshatras. Your Moon\'s Nakshatra at birth is central to understanding personality, life patterns, and even the timing of marriage and career. This level of precision is unique to Vedic astrology.',
  },
  {
    title: 'Dashas — Planetary Periods',
    body: 'Vedic astrology uses a unique system of planetary periods called Dashas. Each planet rules a specific number of years. Understanding which planet is currently active in your chart explains major life events and timing.',
  },
  {
    title: 'The Navamsa Chart',
    body: 'Beyond your main birth chart (Rasi), Vedic astrology uses divisional charts. The Navamsa (D-9) is the most important supplementary chart — it reveals the deeper nature of your marriage, dharma, and the strength of your planets.',
  },
  {
    title: 'Functional Benefics and Malefics',
    body: 'Whether a planet is beneficial or harmful for you depends on your Lagna — not just the planet itself. Saturn can be highly beneficial for Libra ascendants, while it can be harmful for others. This is why generic Sun-sign advice rarely holds up.',
  },
];

const GEMSTONE_FACTS = [
  { title: 'Why 9 Stones?', body: 'The Navaratna (nine gems) corresponds to the nine Vedic planets: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu. Each stone amplifies the energy of its ruling planet when worn correctly.' },
  { title: 'Natural vs Synthetic', body: 'Only natural, untreated gemstones carry the planetary frequencies needed for astrological therapy. Synthetic stones, glass, or heavily treated stones are considered ineffective in the Vedic tradition.' },
  { title: 'Weight Matters', body: 'The minimum weight of a gemstone for astrological benefit is typically 2–3 carats, though this varies by stone and the strength required. A stone that is too small may not produce the intended effect.' },
  { title: 'Why Not "Zodiac Stones"?', body: 'Zodiac stones based solely on Sun signs are a Westernized simplification. Vedic gemstone prescription requires a full chart analysis — particularly the Lagna and functional benefic planets — not just your Sun sign.' },
];

const REMEDY_FACTS = [
  { title: 'What is a Remedy?', body: 'In Vedic astrology, a remedy (parihara) is a prescribed action — mantra, ritual, charity, fasting, or gemstone — intended to mitigate harmful planetary influences or strengthen beneficial ones.' },
  { title: 'Mantras and Planets', body: 'Each planet has a corresponding mantra. Chanting the Surya (Sun) mantra strengthens solar energy; the Chandra (Moon) mantra supports emotional stability. Mantras should ideally be prescribed after a chart analysis for maximum effectiveness.' },
  { title: 'Why Charity Works', body: 'Charitable donation (daan) is one of the oldest forms of Vedic remedy. Each planet is associated with a specific type of giving — donating on specific days and to specific people is believed to pacify that planet\'s malefic influence.' },
  { title: 'Kavach and Yantras', body: 'A Kavach is a custom engraved amulet with planetary mantras inscribed in a precise configuration. A Yantra is a geometric diagram representing a deity or planet and used in ritual worship. Both are prescribed based on chart analysis.' },
];

const SECTION_ICONS = {
  'Vedic Astrology': <Star size={20} className="text-gold-500" />,
  'Gemstone Therapy': <Gem size={20} className="text-gold-500" />,
  'Vedic Remedies': <Leaf size={20} className="text-gold-500" />,
};

const SECTIONS = [
  { title: 'Vedic Astrology', facts: ASTROLOGY_FACTS },
  { title: 'Gemstone Therapy', facts: GEMSTONE_FACTS },
  { title: 'Vedic Remedies', facts: REMEDY_FACTS },
];

export default function FactsPage() {
  return (
    <>
      <SEO
        title="Vedic Astrology Facts & Knowledge – Dr. Gurudeva"
        description="Essential facts about Vedic astrology, Navaratna gemstone therapy, and planetary remedies. Understand the science behind the practice."
        canonical="/facts"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-8 md:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: 'Facts & Knowledge', path: '/facts' }]} />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 max-w-xl"
          >
            <p className="section-label text-gold-300 mb-2">Education</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Facts & Knowledge
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed">
              Essential knowledge about Vedic astrology, gemstone therapy, and planetary remedies — to understand the practice before your consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {SECTIONS.map(({ title, facts }, secIdx) => (
        <SectionWrapper key={title} variant={secIdx % 2 === 0 ? 'white' : 'ivory'}>
          <div className="flex items-center gap-2 mb-2">
            {SECTION_ICONS[title]}
            <p className="section-label">{title}</p>
          </div>
          <h2 className="section-title mb-1">{title} — Key Facts</h2>
          <div className="gold-divider mb-8" />
          <div className="grid md:grid-cols-2 gap-5">
            {facts.map(({ title: t, body }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="card p-5"
              >
                <h3 className="font-serif font-semibold text-stone-900 mb-2">{t}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      ))}

      {/* Quick links */}
      <SectionWrapper variant="maroon">
        <div className="text-center">
          <p className="section-label text-gold-300 mb-2">Explore More</p>
          <h2 className="font-serif text-2xl font-bold text-white mb-6">Want to Go Deeper?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/articles" className="btn-gold">Read Articles</Link>
            <Link to="/services" className="btn-outline border-white text-white hover:bg-white/10">Browse Services</Link>
            <Link to="/faq" className="btn-outline border-white text-white hover:bg-white/10">View FAQs</Link>
          </div>
        </div>
      </SectionWrapper>

      <CTASection
        heading="Put the Knowledge into Action"
        subtext="Book a consultation with Dr. Gurudeva to see how these principles apply to your unique birth chart."
      />
    </>
  );
}
