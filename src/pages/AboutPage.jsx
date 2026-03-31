import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Globe,
  Star,
  Heart,
  CheckCircle,
  Users,
  ArrowRight,
  Phone,
  MapPin,
  Sparkles,
  Gem,
} from "lucide-react";
import SEO from "../components/common/SEO";
import SectionWrapper, {
  SectionHeader,
} from "../components/common/SectionWrapper";
import CTASection from "../components/common/CTASection";
import { CONTACT_INFO } from "../data/navigation";

const SPECIALIZATIONS = [
  "Horoscope & Birth Chart Analysis",
  "Marriage Compatibility & Muhurtham",
  "Career, Business & Financial Astrology",
  "Gemstone Prescription & Sourcing",
  "Dosha Analysis & Vedic Remedies",
  "Birth Time Rectification",
  "Numerology & Name Correction",
  "Palmistry & Face Reading",
  "Namalogy (Name Numerology)",
  "Horary Query (Prashna)",
  "Kaal Sarpa, Sarpa & Manglik Dosha",
  "Child & Newborn Horoscopes",
  "Foreign Travel & Settlement Analysis",
  "Spiritual Healing & Energy Clearing",
  "Vastu Shastra Consultation",
  "Jathak Dosh Nivaran Poojas & Homas",
];

const LANGUAGES = [
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Hindi",
  "English",
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Dr. Gurudeva – Famous Indian Vedic Astrologer in USA | Luckygemfinder"
        description="Dr. Gurudeva is a world-renowned traditional Indian Vedic astrologer based in Highland Park, NJ. Introduced to astrology at age 7 by his grandfather — a family heritage spanning generations. Call 732-448-0667 for a free phone consultation."
        canonical="/about"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-maroon-800 to-maroon-900 text-white py-10 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="section-label text-gold-300 mb-3">About</p>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-5 leading-tight">
              Dr. Gurudeva
            </h1>
            <p className="text-maroon-100 text-lg leading-relaxed">
              One of the world&rsquo;s most respected traditional Indian
              astrologers — introduced to Vedic Jyotish at age 7 by his
              grandfather, serving thousands of families across the USA, India
              and worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Dr. Gurudeva */}
      <SectionWrapper variant="white">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">His Story</p>
            <h2 className="section-title mb-4">
              A Family Heritage of Vedic Wisdom
            </h2>
            <div className="gold-divider" />
            <div className="space-y-4 text-stone-600 text-base leading-relaxed mt-4">
              <p>
                Dr. Gurudeva is one of the most respected traditional Indian
                astrologers in the world. His first introduction to Indian
                astrology — Vedic Jyotish — came at the tender age of{" "}
                <strong className="text-maroon-700">7 years old</strong>, under
                the personal guidance of his grandfather. This is no surprise:
                Dr. Gurudeva hails from a family steeped in the ancient Vedic
                tradition for several generations. Both his{" "}
                <strong className="text-maroon-700">
                  father and grandfather are renowned Vedic astrologers in India
                </strong>
                .
              </p>
              <p>
                Dr. Gurudeva is particularly blessed with{" "}
                <strong className="text-maroon-700">
                  &ldquo;Daviopasana&rdquo;
                </strong>{" "}
                — known in the West as the Sixth Sense — which elevates his
                astrological insight far beyond chart calculation alone.
              </p>
              <p>
                Although there are many remedies in Vedic astrology for handling
                malefic planetary effects, Dr. Gurudeva recommends{" "}
                <strong className="text-maroon-700">
                  poojas, homas, mantras and yantras
                </strong>{" "}
                as the primary approach. For enhancing positive yogas in the
                horoscope, he prescribes gemstones — the most powerful tools in
                bringing luck and fortune as per Vedic tradition.
              </p>
              <p>
                Thousands of people from different countries, religions and
                backgrounds have benefited from Dr. Gurudeva&rsquo;s guidance.
              </p>
              <p>
                Dr. Gurudeva is also renowned in{" "}
                <strong className="text-maroon-700">
                  Palmistry, Numerology, Namalogy, Horary Query (Prashna) and
                  Face Reading
                </strong>
                . His ashram temple is especially famous for{" "}
                <em>Jathak Dosh Nivaran Poojas and Homas</em> — traditional
                remedial rituals for planetary afflictions in the horoscope.
              </p>
              <div
                className="rounded-xl p-4 mt-2"
                style={{
                  background: "rgba(201,150,12,0.07)",
                  border: "1px solid rgba(201,150,12,0.2)",
                }}
              >
                <p className="text-maroon-800 text-sm font-medium">
                  Now based in the United States, Dr. Gurudeva offers phone and
                  in-person consultations to those living in the USA.{" "}
                  <strong>
                    Personal horoscope reading is free if contacted directly by
                    phone.
                  </strong>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats + contact panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, value: "25+", label: "Years of Practice" },
                { icon: Users, value: "10,000+", label: "Consultations Given" },
                { icon: Globe, value: "50+", label: "Countries Served" },
                { icon: Star, value: "5.0", label: "Average Client Rating" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="card p-5 text-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{
                      background: "rgba(201,150,12,0.15)",
                      border: "1px solid rgba(201,150,12,0.25)",
                    }}
                  >
                    <Icon size={16} className="text-maroon-500" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-maroon-600 mb-0.5">
                    {value}
                  </p>
                  <p className="text-stone-500 text-xs">{label}</p>
                </div>
              ))}
            </div>

            {/* Sixth Sense callout */}
            <div
              className="rounded-2xl p-5 flex items-start gap-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,150,12,0.10), rgba(201,150,12,0.05))",
                border: "1px solid rgba(201,150,12,0.28)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(201,150,12,0.12)",
                  border: "1px solid rgba(201,150,12,0.25)",
                }}
              >
                <Sparkles size={18} className="text-gold-600" />
              </div>
              <div>
                <p className="font-serif font-semibold text-stone-900 text-sm mb-1">
                  Blessed with Daviopasana
                </p>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Dr. Gurudeva is uniquely gifted with the &ldquo;Sixth
                  Sense&rdquo; — a divine intuition that provides higher
                  astrological insight beyond classical chart analysis alone.
                </p>
              </div>
            </div>

            {/* Gemstone wisdom callout */}
            <div
              className="rounded-2xl p-5 flex items-start gap-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,26,26,0.12), rgba(139,26,26,0.06))",
                border: "1px solid rgba(139,26,26,0.28)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(139,26,26,0.08)",
                  border: "1px solid rgba(139,26,26,0.2)",
                }}
              >
                <Gem size={18} className="text-maroon-600" />
              </div>
              <div>
                <p className="font-serif font-semibold text-stone-900 text-sm mb-1">
                  Gemstone Expert
                </p>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Every gemstone carries a unique planetary energy. Dr. Gurudeva
                  prescribes stones precisely based on your Lagna and functional
                  benefic planets — never by sun sign alone.
                </p>
              </div>
            </div>

            {/* Contact panel */}
            <div className="card p-5 space-y-3">
              <p className="font-serif font-semibold text-maroon-900 text-sm mb-1">
                Contact Dr. Gurudeva
              </p>
              <div className="flex items-start gap-3 text-sm">
                <MapPin
                  size={14}
                  className="text-gold-500 mt-0.5 flex-shrink-0"
                />
                <span className="text-stone-600">
                  601 Leia Lane, Highland Park, NJ 08904
                  <br />
                  <span className="text-stone-400 text-xs">
                    Near Edison Train Station
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={14} className="text-gold-500 flex-shrink-0" />
                <span className="text-stone-600">
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="text-maroon-700 font-semibold hover:underline"
                  >
                    {CONTACT_INFO.phoneUSA}
                  </a>
                  <span className="text-stone-400 text-xs ml-1">
                    (USA &amp; Canada)
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={14} className="text-gold-500 flex-shrink-0" />
                <span className="text-stone-600">
                  <a
                    href="tel:02081446490"
                    className="text-maroon-700 font-semibold hover:underline"
                  >
                    {CONTACT_INFO.phoneUK}
                  </a>
                  <span className="text-stone-400 text-xs ml-1">(UK)</span>
                </span>
              </div>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="btn-gold w-full justify-center !text-sm mt-1"
              >
                <Phone size={14} />
                Call for Free Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Specializations */}
      <SectionWrapper variant="ivory">
        <SectionHeader
          label="Expertise"
          title="Areas of Specialization"
          subtitle="Dr. Gurudeva is renowned in classical Vedic astrology, palmistry, numerology, namalogy, horary queries and face reading. His ashram temple is famous for Jathak Dosh Nivaran Poojas & Homas."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SPECIALIZATIONS.map((spec, i) => (
            <motion.div
              key={spec}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex items-center gap-3 rounded-xl p-4"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <CheckCircle size={15} className="text-gold-400 flex-shrink-0" />
              <span className="text-stone-700 text-sm font-medium">{spec}</span>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Languages */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeader
            label="Languages"
            title="Consultations in Your Language"
            subtitle="Astrology is most meaningful when understood in your native tongue."
          />
          <div className="flex flex-wrap justify-center gap-3">
            {LANGUAGES.map((lang) => (
              <span
                key={lang}
                className="badge-gold px-4 py-2 text-sm font-medium rounded-xl"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Approach */}
      <SectionWrapper variant="ivory">
        <SectionHeader
          label="The Approach"
          title="How Dr. Gurudeva Works"
          subtitle="A consultation with Dr. Gurudeva is personal, precise and grounded in classical Vedic tradition — not generic or fear-based."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: BookOpen,
              title: "Multi-Generational Heritage",
              desc: "Both Dr. Gurudeva's father and grandfather are renowned Vedic astrologers in India. This knowledge has been passed down through generations — giving him a depth of understanding no textbook alone can provide.",
            },
            {
              icon: Heart,
              title: "Honest & Fear-Free Guidance",
              desc: "Dr. Gurudeva will tell you exactly what the chart shows — including difficult truths — without exaggeration, unnecessary fear, or pressure for expensive remedies.",
            },
            {
              icon: CheckCircle,
              title: "Practical Remedies & Results",
              desc: "Poojas, homas, mantras, yantras and gemstones are prescribed with care and precision. Thousands of people from different countries, castes and religions have benefited from his remedial measures.",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card p-6"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: "rgba(201,150,12,0.15)",
                  border: "1px solid rgba(201,150,12,0.25)",
                }}
              >
                <Icon size={18} className="text-maroon-500" />
              </div>
              <h3 className="font-serif text-base font-semibold text-stone-900 mb-2">
                {title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/book" className="btn-primary">
            Book a Consultation <ArrowRight size={15} />
          </Link>
        </div>
      </SectionWrapper>

      <CTASection
        heading="Begin Your Consultation with Dr. Gurudeva"
        subtext="Get the clarity you seek. Book a personal session today."
      />
    </>
  );
}
