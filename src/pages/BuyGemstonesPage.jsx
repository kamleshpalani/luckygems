import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Phone, Star, Clock, Sparkles, Gem, Sun } from 'lucide-react';
import SEO from '../components/common/SEO';
import { buildFAQSchema } from '../components/common/Schema';
import Schema from '../components/common/Schema';
import SectionWrapper, { SectionHeader } from '../components/common/SectionWrapper';
import GemstoneCard from '../components/gemstones/GemstoneCard';
import FAQAccordion from '../components/common/FAQAccordion';
import CTASection from '../components/common/CTASection';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { GEMSTONES } from '../data/gemstones';
import { CONTACT_INFO } from '../data/navigation';

const BUY_FAQS = [
  { q: 'Are the gemstones natural and certified?', a: 'Yes. All gemstones sourced through Dr. Gurudeva are natural, untreated, and come with certification from reputable gemological labs.' },
  { q: 'Can I buy a stone somewhere else?', a: 'Yes. You can purchase from any reputable certified source. Dr. Gurudeva will still advise on the quality, weight, and specifications required for your chart.' },
  { q: 'Do I need a consultation before buying?', a: 'Absolutely. A proper Vedic chart analysis must precede any gemstone purchase. Dr. Gurudeva does not recommend gemstones without this step.' },
  { q: 'What if the gemstone is too expensive for me?', a: 'There are affordable substitute stones for most planetary gemstones. Dr. Gurudeva will advise you on effective alternatives within your budget.' },
];

const WEARING_RULES = [
  {
    icon: Clock,
    title: 'Ring Making Time (Muhurtham)',
    body: 'While making the ring or pendant, an auspicious Lagna or Muhurtham time is set to fix the gemstone into the ring or pendant. Dr. Gurudeva calculates this auspicious time based on the horoscope of the person who will be wearing it. Our goldsmith then fits the gemstone only at that specific time.',
  },
  {
    icon: Sparkles,
    title: 'Suddhi (Purification)',
    body: 'Once the ring or pendant is made, Dr. Gurudeva performs Suddhi — a process of cleaning the gemstone with sacred powders and water while chanting appropriate Suddhi mantras. This is mandatory because gemstones tend to absorb the doshas and karmas of anyone who touches them. From the moment a gemstone is unearthed until it reaches you, many hands may have touched it. Suddhi removes all such absorbed energies.',
  },
  {
    icon: Sun,
    title: 'Pooja and Mantras',
    body: 'After Suddhi, pooja is offered to the finished gemstone for several days by chanting the particular Beeja-akshari Moola Mantra of the planet that rules that gemstone. This step is mandatory to make the gemstone effective and yield the desired results. Once pooja is complete, the consecrated gemstone is shipped to you with instructions for the procedure to follow at home and the mantras to chant until the auspicious wearing day arrives.',
  },
  {
    icon: Gem,
    title: 'Wearing Time (Muhurtham)',
    body: 'The wearing time is the most crucial step in gemstone prescription. If gemstones are worn in an auspicious time, good results will continue. If worn in a bad time, bad results will continue. Dr. Gurudeva sets the Lagna or Muhurtham time based upon the gemstone and the horoscope of the wearer. Wearing the gemstone with utmost faith and chanting mantras at the time of wearing will give excellent results.',
  },
];

const QUALITY_FEATURES = [
  'Natural, untreated stones only',
  'Gemological certification available',
  'Chart-matched weight and quality',
  'Energized with planetary mantras before delivery',
  'Mounted in the prescribed metal setting',
];

const PRICE_RANGES = [
  { gem: 'Ruby (Manik)', planet: 'Sun', range: '$50–$500+', note: 'Per carat, natural Burmese preferred' },
  { gem: 'Pearl (Moti)', planet: 'Moon', range: '$20–$200+', note: 'Natural saltwater, not freshwater' },
  { gem: 'Red Coral (Moonga)', planet: 'Mars', range: '$30–$300+', note: 'Italian or Japanese origin' },
  { gem: 'Emerald (Panna)', planet: 'Mercury', range: '$100–$1,000+', note: 'Colombian quality preferred' },
  { gem: 'Yellow Sapphire (Pukhraj)', planet: 'Jupiter', range: '$100–$800+', note: 'Ceylon (Sri Lanka) origin' },
  { gem: 'Diamond / White Sapphire', planet: 'Venus', range: '$80–$500+', note: 'White Sapphire is a common substitute' },
  { gem: 'Blue Sapphire (Neelam)', planet: 'Saturn', range: '$200–$2,000+', note: 'Most powerful — requires precise prescription' },
  { gem: 'Hessonite (Gomed)', planet: 'Rahu', range: '$20–$150+', note: 'Ceylon or African origin' },
  { gem: "Cat's Eye (Lahsuniya)", planet: 'Ketu', range: '$30–$300+', note: "Chrysoberyl cat's eye" },
];

export default function BuyGemstonesPage() {
  return (
    <>
      <SEO
        title="Buy Vedic Gemstones – Certified Natural Stones Prescribed by Dr. Gurudeva"
        description="Purchase natural certified Vedic gemstones prescribed specifically for your birth chart by Dr. Gurudeva. Consultation required before any purchase."
        canonical="/gemstones/buy"
      />
      <Schema type="FAQPage" data={buildFAQSchema(BUY_FAQS)} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-8 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: 'Gemstones', path: '/gemstones' }, { label: 'Buy Gemstones', path: '/gemstones/buy' }]} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 max-w-2xl"
          >
            <p className="section-label text-gold-300 mb-3">Buy Gemstones</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Certified Natural Gemstones
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed mb-6">
              Every gemstone sourced through Dr. Gurudeva is natural, certified, and prescribed only after a thorough analysis of your Vedic birth chart.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/book?service=gemstone-consultation" className="btn-gold">Get Consultation First</Link>
              <a href={`tel:${CONTACT_INFO.phone}`} className="btn-outline border-white text-white hover:bg-white/10">
                <Phone size={15} /> Call to Enquire
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why consult first */}
      <SectionWrapper variant="ivory">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-gold p-7">
            <ShieldCheck size={28} className="text-gold-600 mx-auto mb-3" />
            <h2 className="font-serif text-xl font-semibold text-stone-900 mb-3">Consultation Before Purchase — Always</h2>
            <p className="text-stone-600 leading-relaxed">
              Gemstone therapy requires precision. Dr. Gurudeva will first analyze your Lagna, functional benefics, and malefic planets before recommending any stone. Wearing the wrong gemstone can strengthen a malefic planet and cause harm. This step is mandatory, not optional.
            </p>
            <Link to="/services/lucky-gem-report" className="btn-primary mt-5 inline-flex">Get Your Lucky Gem Report</Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Gemstone Wearing Rules & Regulations */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            label="Rules & Regulations"
            title="Gemstone Wearing Rules per Vedic Astrology"
            subtitle="The following procedure is mandatory in gemstone prescription as per Indian Vedic astrology. No variations to this procedure are acceptable. No extra charge is collected for any of these steps — all are included in the gemstone price."
          />
          <div className="grid sm:grid-cols-2 gap-5">
            {WEARING_RULES.map(({ icon: RuleIcon, title, body }) => (
              <div key={title} className="card p-5 space-y-3">
                <div className="inline-flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gold-50 flex items-center justify-center flex-shrink-0">
                    <RuleIcon size={18} className="text-gold-600" />
                  </div>
                  <h3 className="font-serif font-semibold text-stone-900 text-base">{title}</h3>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-stone-500 text-xs mt-5 border-t border-stone-200 pt-5">
            Gemstones must be natural and without any astrological doshas as per Indian Vedic astrology.
            Only natural, untreated stones are used. No extra charge is collected for the above procedure — it is included in the gemstone price.
          </p>
        </div>
      </SectionWrapper>

      {/* Gemstone grid */}
      <SectionWrapper variant="white">
        <SectionHeader
          label="Available Stones"
          title="All Nine Planetary Gemstones"
          subtitle="Available upon prescription. Price varies based on weight, origin, and quality required for your chart."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {GEMSTONES.map((gem, i) => (
            <GemstoneCard key={gem.slug} gem={gem} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Price reference table */}
      <SectionWrapper variant="ivory">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Price Reference" title="Approximate Price Ranges" subtitle="Prices vary significantly by origin, treatment status, and quality. Final pricing is determined after consultation." />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gold-300">
                  <th className="text-left py-2 pr-4 font-semibold text-stone-700">Gemstone</th>
                  <th className="text-left py-2 pr-4 font-semibold text-stone-700">Planet</th>
                  <th className="text-left py-2 pr-4 font-semibold text-stone-700">Range (per carat)</th>
                  <th className="text-left py-2 font-semibold text-stone-700">Notes</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_RANGES.map(({ gem, planet, range, note }) => (
                  <tr key={gem} className="border-b border-stone-200 hover:bg-ivory-100 transition-colors">
                    <td className="py-2.5 pr-4 font-medium text-stone-800">{gem}</td>
                    <td className="py-2.5 pr-4 text-stone-600">{planet}</td>
                    <td className="py-2.5 pr-4 text-maroon-700 font-medium">{range}</td>
                    <td className="py-2.5 text-stone-500">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>

      {/* Quality assurance */}
      <SectionWrapper variant="maroon">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label text-gold-300 mb-2">Our Guarantee</p>
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Quality You Can Trust</h2>
          <ul className="text-left space-y-3 max-w-lg mx-auto">
            {QUALITY_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-ivory-200">
                <Star size={13} className="text-gold-400 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn-gold mt-7 inline-flex">Ask About a Specific Stone</Link>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Questions" title="Gemstone Purchasing FAQs" />
          <FAQAccordion items={BUY_FAQS} flat />
        </div>
      </SectionWrapper>

      <CTASection
        heading="Ready to Get Your Gemstone Prescription?"
        subtext="Book a gemstone analysis consultation — the first and most important step."
        primaryCTA={{ label: 'Book Gemstone Analysis', href: '/book?service=gemstone-consultation' }}
        secondaryCTA={{ label: 'Learn About Gemstones', href: '/gemstones' }}
      />
    </>
  );
}
