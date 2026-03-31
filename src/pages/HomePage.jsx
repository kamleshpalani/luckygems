import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Phone,
  MessageCircle,
  CalendarDays,
  ChevronRight,
  CheckCircle,
  Globe,
  Award,
  Clock,
  Users,
  Gem,
  Sparkles,
  ArrowRight,
  Shield,
} from "lucide-react";

import SEO from "../components/common/SEO";
import Schema, {
  LOCAL_BUSINESS_SCHEMA,
  buildFAQSchema,
} from "../components/common/Schema";
import SectionWrapper, {
  SectionHeader,
} from "../components/common/SectionWrapper";
import TempleBackground from "../components/common/TempleBackground";
import ServiceCard from "../components/services/ServiceCard";
import RemedyCard from "../components/remedies/RemedyCard";
import GemstoneCard from "../components/gemstones/GemstoneCard";
import ArticleCard from "../components/blog/ArticleCard";
import TestimonialCard from "../components/common/TestimonialCard";
import FAQAccordion from "../components/common/FAQAccordion";
import CTASection from "../components/common/CTASection";
import GoogleReviewsSection from "../components/common/GoogleReviewsSection";
import { CONTACT_INFO } from "../data/navigation";
import { SERVICES } from "../data/services";
import { REMEDIES } from "../data/remedies";
import { GEMSTONES } from "../data/gemstones";
import { TESTIMONIALS } from "../data/testimonials";
import { ARTICLES } from "../data/articles";
import { FAQ_FLAT } from "../data/faq";

const FEATURED_SERVICES = SERVICES.filter((s) => s.popular).slice(0, 6);
const FEATURED_REMEDIES = REMEDIES.slice(0, 6);
const FEATURED_GEMSTONES = GEMSTONES.slice(0, 6);
const FEATURED_ARTICLES = ARTICLES.filter((a) => a.featured)
  .concat(ARTICLES.filter((a) => !a.featured))
  .slice(0, 3);
const HOME_FAQS = FAQ_FLAT.slice(0, 5);

export default function HomePage() {
  return (
    <>
      <SEO
        title="Trusted Vedic Astrologer in USA | Horoscope, Gemstones & Remedies"
        description="Consult Dr. Gurudeva — a trusted Vedic astrologer with 25+ years of experience. Horoscope readings, gemstone guidance, muhurtham, and spiritual remedies for clients worldwide."
        canonical="/"
      />
      <Schema type="LocalBusiness" data={LOCAL_BUSINESS_SCHEMA} />
      <Schema type="FAQPage" data={buildFAQSchema(HOME_FAQS)} />

      <HeroSection />
      <ConsultationOptions />
      <FreeReadingBanner />
      <FeaturedServicesSection />
      <WhyChooseSection />
      <FeaturedRemediesSection />
      <GemstonesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <GoogleReviewsSection />
      <FAQSection />
      <ArticlesSection />
      <LocationSection />
      <CTASection />
    </>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Hero                                                      */
/* ──────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden grid-overlay"
      style={{
        background: "transparent",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Floating sparkle particles */}
      {[
        { l: "6%", b: "15%", s: 5, dur: "4.5s", delay: "0s", gold: true },
        { l: "11%", b: "58%", s: 4, dur: "6.2s", delay: "1.3s", gold: false },
        { l: "18%", b: "80%", s: 6, dur: "5.1s", delay: "0.6s", gold: true },
        { l: "35%", b: "10%", s: 4, dur: "7s", delay: "2.1s", gold: false },
        { l: "50%", b: "85%", s: 5, dur: "4.8s", delay: "1.1s", gold: true },
        { l: "62%", b: "8%", s: 3, dur: "6.5s", delay: "3s", gold: false },
        { l: "72%", b: "65%", s: 8, dur: "5.6s", delay: "0.9s", gold: true },
        { l: "85%", b: "30%", s: 4, dur: "4.2s", delay: "1.7s", gold: false },
        { l: "92%", b: "72%", s: 5, dur: "7.1s", delay: "2.6s", gold: true },
        { l: "44%", b: "48%", s: 3, dur: "5.3s", delay: "0.4s", gold: false },
        { l: "28%", b: "38%", s: 4, dur: "6.8s", delay: "1.8s", gold: true },
        { l: "78%", b: "88%", s: 6, dur: "4s", delay: "2.3s", gold: false },
      ].map(({ l, b, s, dur, delay, gold }, i) => (
        <div
          key={i}
          className="float-particle"
          style={{
            left: l,
            bottom: b,
            width: s,
            height: s,
            "--dur": dur,
            "--delay": delay,
            background: gold
              ? "radial-gradient(circle, rgba(201,150,12,0.85) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(139,26,26,0.65) 0%, transparent 70%)",
          }}
        />
      ))}

      {/* Temple + zodiac SVG overlay (right side) */}
      <TempleBackground />

      {/* Soft divine glow orbs */}
      <div
        className="aurora-orb aurora-orb-gold"
        style={{
          width: "55vw",
          height: "55vw",
          top: "-20%",
          right: "-15%",
          opacity: 0.5,
        }}
      />
      <div
        className="aurora-orb aurora-orb-maroon"
        style={{
          width: "40vw",
          height: "40vw",
          bottom: "-10%",
          left: "-10%",
          opacity: 0.35,
        }}
      />
      <div
        className="aurora-orb aurora-orb-gold"
        style={{
          width: "25vw",
          height: "25vw",
          top: "40%",
          left: "30%",
          opacity: 0.2,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{
              background: "rgba(201,150,12,0.12)",
              border: "1px solid rgba(201,150,12,0.30)",
            }}
          >
            <Star size={12} className="text-gold-500" fill="currentColor" />
            <span className="text-xs font-semibold text-maroon-700 tracking-[0.12em] uppercase">
              25+ Years of Vedic Astrology
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] mb-5 text-balance"
          >
            <span className="text-maroon-900">Clarity for Every</span>
            <br />
            <span className="shimmer-text">Chapter of Life</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-500 text-sm sm:text-base md:text-lg leading-relaxed mb-7 max-w-xl"
          >
            Personal Vedic astrology consultations with Dr. Gurudeva — trusted
            by thousands of families across the USA, India and worldwide.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/book"
              className="btn-gold btn-shine !px-8 !py-4 !text-base w-full sm:w-auto justify-center"
            >
              <CalendarDays size={18} />
              Book a Consultation
            </Link>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hello%20Dr.%20Gurudeva%2C%20I%20would%20like%20to%20inquire%20about%20a%20consultation.`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary btn-shine !px-8 !py-4 !text-base w-full sm:w-auto justify-center"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8"
            style={{ borderTop: "1px solid rgba(139,26,26,0.1)" }}
          >
            {[
              { icon: Users, value: "10,000+", label: "Consultations" },
              { icon: Globe, value: "50+", label: "Countries Served" },
              { icon: Award, value: "25+", label: "Years Experience" },
              { icon: Star, value: "5.0 ★", label: "Average Rating" },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col gap-1 p-3 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span className="stat-value">{value}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Icon size={11} className="text-gold-500 flex-shrink-0" />
                  <span className="text-stone-500 text-xs leading-tight">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Free Reading Banner                                       */
/* ──────────────────────────────────────────────────────── */
function FreeReadingBanner() {
  return (
    <div className="bg-gradient-to-r from-maroon-800 to-maroon-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Phone size={18} className="text-gold-300" />
            </div>
            <div>
              <p className="font-serif font-bold text-xl text-white leading-tight">
                Horoscope Readings <span className="text-gold-300">FREE!</span>
              </p>
              <p className="text-maroon-200 text-sm mt-1 leading-relaxed max-w-lg">
                Consult Dr. Gurudeva directly at{" "}
                <strong className="text-white">732-448-0667</strong> for your
                first horoscope/Kundli reading — free of charge. Limited to one
                person per family. Vedic Astrology is a family heritage to Dr.
                Gurudeva.
              </p>
              <p className="text-maroon-300 text-xs mt-1.5">
                Available for: India · Bangladesh · Pakistan · Nepal · Sri Lanka
                · EST timezone USA
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:flex-shrink-0">
            <p className="text-maroon-200 text-xs leading-relaxed max-w-xs">
              Be ready with Date of Birth, time and place of birth when you
              call. In-person consultations and email/website readings are paid
              services.
            </p>
            <a
              href="tel:+17324480667"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm flex-shrink-0 shadow"
            >
              <Phone size={15} />
              Call Now: 732-448-0667
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Consultation options bar                                  */
/* ──────────────────────────────────────────────────────── */
function ConsultationOptions() {
  const options = [
    {
      icon: Phone,
      label: "Phone Consultation",
      desc: "Call from anywhere",
      href: `tel:${CONTACT_INFO.phone}`,
      external: true,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      desc: "Chat & schedule",
      href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
      external: true,
    },
    {
      icon: CalendarDays,
      label: "Book Online",
      desc: "Secure & instant",
      href: "/book",
      external: false,
    },
    {
      icon: Globe,
      label: "Zoom / Video",
      desc: "Face-to-face online",
      href: "/book?type=video",
      external: false,
    },
  ];

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        borderTop: "1px solid rgba(255,255,255,0.09)",
        borderBottom: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.07)" }}
        >
          {options.map(({ icon: Icon, label, desc, href, external }) => {
            const Wrapper = external ? "a" : Link;
            const extra = external
              ? {
                  href,
                  target: href.startsWith("http") ? "_blank" : undefined,
                  rel: "noreferrer",
                }
              : { to: href };
            return (
              <Wrapper
                key={label}
                {...extra}
                className="flex items-center gap-3 px-3 py-4 sm:px-5 sm:py-5 transition-all duration-200 group hover:bg-white/5"
                style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201,150,12,0.12), rgba(139,26,26,0.08))",
                    border: "1px solid rgba(201,150,12,0.2)",
                    boxShadow: "0 2px 8px rgba(201,150,12,0.1)",
                  }}
                >
                  <Icon size={17} className="text-maroon-700" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-maroon-900 group-hover:text-maroon-600 transition-colors leading-tight">
                    {label}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5 hidden sm:block">
                    {desc}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Featured Services                                         */
/* ──────────────────────────────────────────────────────── */
function FeaturedServicesSection() {
  return (
    <SectionWrapper variant="base">
      <SectionHeader
        label="Astrology Services"
        title="Guidance for Every Area of Life"
        subtitle="From career and marriage to health and spirituality — Dr. Gurudeva offers focused consultations for your most important questions."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURED_SERVICES.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/services" className="btn-outline">
          View All Services <ArrowRight size={15} />
        </Link>
      </div>
    </SectionWrapper>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Why Choose                                               */
/* ──────────────────────────────────────────────────────── */
function WhyChooseSection() {
  const reasons = [
    {
      icon: Shield,
      title: "Honest & Fear-Free Guidance",
      desc: "Dr. Gurudeva is known for clear, honest readings without exaggeration or fearmongering.",
    },
    {
      icon: Award,
      title: "25+ Years of Experience",
      desc: "Decades of experience across thousands of consultations in classical Vedic astrology.",
    },
    {
      icon: Globe,
      title: "Serving Clients Worldwide",
      desc: "Whether you are in California, New York, India or the UK — consultations are available globally.",
    },
    {
      icon: Clock,
      title: "Precise Timing Guidance",
      desc: "The Vedic Dasa system allows accurate timing of major life events — not just general patterns.",
    },
    {
      icon: Users,
      title: "Multi-Language Consultations",
      desc: "Consultations in Tamil, Telugu, Kannada, Malayalam, Hindi and English.",
    },
    {
      icon: CheckCircle,
      title: "Practical Remedies",
      desc: "Remedies are prescribed thoughtfully and explained clearly — no blind rituals.",
    },
  ];

  return (
    <SectionWrapper variant="elevated">
      <SectionHeader
        label="Why Dr. Gurudeva"
        title="Trusted by Thousands. Guided by Tradition."
        subtitle="What sets Dr. Gurudeva apart isn't just experience — it's integrity, precision and a genuine commitment to each client's well-being."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 card-top-accent feature-glow-card"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.11)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.45)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 icon-pulse-gold"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,150,12,0.12), rgba(139,26,26,0.08))",
                border: "1px solid rgba(201,150,12,0.22)",
                boxShadow: "0 2px 8px rgba(201,150,12,0.12)",
              }}
            >
              <Icon size={20} className="text-maroon-700" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-maroon-900 mb-1">
                {title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Remedies                                                  */
/* ──────────────────────────────────────────────────────── */
function FeaturedRemediesSection() {
  return (
    <SectionWrapper variant="base">
      <SectionHeader
        label="Vedic Remedies"
        title="Address the Root Causes"
        subtitle="Beyond prediction — targeted remedies to address planetary imbalances, doshas and spiritual blockages."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURED_REMEDIES.map((remedy, i) => (
          <RemedyCard key={remedy.slug} remedy={remedy} index={i} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/remedies" className="btn-outline">
          Explore All Remedies <ArrowRight size={15} />
        </Link>
      </div>
    </SectionWrapper>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Gemstones                                                 */
/* ──────────────────────────────────────────────────────── */
function GemstonesSection() {
  return (
    <SectionWrapper variant="elevated">
      <SectionHeader
        label="Gemstone Guidance"
        title="The Right Gem, Prescribed Precisely"
        subtitle="Gemstones are among the most powerful Vedic remedies — when prescribed correctly. Dr. Gurudeva analyzes your chart before making any recommendation."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {FEATURED_GEMSTONES.map((gem, i) => (
          <GemstoneCard key={gem.slug} gem={gem} index={i} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/gemstones" className="btn-outline">
          Gemstone Guidance <ArrowRight size={15} />
        </Link>
      </div>
    </SectionWrapper>
  );
}

/* ──────────────────────────────────────────────────────── */
/* How It Works                                              */
/* ──────────────────────────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Book Your Session",
      desc: "Choose a consultation type and select a convenient date and time.",
    },
    {
      num: "02",
      title: "Provide Birth Details",
      desc: "Share your date, place and time of birth. Dr. Gurudeva prepares before your session.",
    },
    {
      num: "03",
      title: "Receive Your Reading",
      desc: "A personal, in-depth consultation — phone, video or in-person.",
    },
    {
      num: "04",
      title: "Follow Up with Clarity",
      desc: "Written summary, remedy guidance and WhatsApp follow-up for 2–6 weeks.",
    },
  ];

  return (
    <SectionWrapper variant="aurora">
      <SectionHeader
        label="The Process"
        title="Simple Steps to Clarity"
        subtitle="Getting started is easy. Here's how Dr. Gurudeva works with clients from first contact to ongoing support."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting line on large screens */}
        <div
          className="hidden lg:block absolute top-[3.5rem] left-[12.5%] right-[12.5%] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,150,12,0.3) 20%, rgba(201,150,12,0.3) 80%, transparent)",
          }}
        />
        {steps.map(({ num, title, desc }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-center p-6 rounded-2xl card-top-accent"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.11)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.45)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,26,26,0.1), rgba(201,150,12,0.12))",
                border: "1px solid rgba(201,150,12,0.25)",
                boxShadow: "0 2px 12px rgba(139,26,26,0.1)",
              }}
            >
              <span className="font-serif gradient-text-gold text-xl font-bold">
                {num}
              </span>
            </div>
            <h3 className="font-serif text-maroon-900 font-semibold text-base mb-2">
              {title}
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link to="/book" className="btn-gold !px-10 !py-4">
          <CalendarDays size={16} />
          Book Now
        </Link>
      </div>
    </SectionWrapper>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Testimonials                                              */
/* ──────────────────────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <SectionWrapper variant="base">
      <SectionHeader
        label="Client Stories"
        title="Trusted by Families Worldwide"
        subtitle="Real experiences from real clients who found clarity and direction through Dr. Gurudeva's guidance."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TESTIMONIALS.slice(0, 4).map((t, i) => (
          <TestimonialCard key={t.id} testimonial={t} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ──────────────────────────────────────────────────────── */
/* FAQ Preview                                               */
/* ──────────────────────────────────────────────────────── */
function FAQSection() {
  return (
    <SectionWrapper variant="elevated">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          label="Common Questions"
          title="Frequently Asked Questions"
          subtitle="Quick answers to the questions clients ask most often."
        />
        <FAQAccordion items={HOME_FAQS} flat />
        <div className="text-center mt-8">
          <Link to="/faq" className="btn-glass">
            View All FAQs <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Articles                                                  */
/* ──────────────────────────────────────────────────────── */
function ArticlesSection() {
  return (
    <SectionWrapper variant="base">
      <SectionHeader
        label="Astrology Insights"
        title="Learn & Understand"
        subtitle="Articles from Dr. Gurudeva on Vedic astrology, gemstones, remedies and practical wisdom."
      />
      <div className="grid sm:grid-cols-3 gap-5">
        {FEATURED_ARTICLES.map((article, i) => (
          <ArticleCard key={article.slug} article={article} index={i} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/articles" className="btn-outline">
          All Articles <ArrowRight size={15} />
        </Link>
      </div>
    </SectionWrapper>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Location / Language support                               */
/* ──────────────────────────────────────────────────────── */
function LocationSection() {
  const links = [
    {
      label: "Indian Astrologer USA",
      path: "/locations/indian-astrologer-usa",
    },
    {
      label: "Indian Astrologer California",
      path: "/locations/indian-astrologer-california",
    },
    { label: "Tamil Astrologer USA", path: "/languages/tamil-astrologer-usa" },
    {
      label: "Telugu Astrologer USA",
      path: "/languages/telugu-astrologer-usa",
    },
    {
      label: "South Indian Astrology USA",
      path: "/languages/south-indian-astrology",
    },
  ];

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
      className="py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm flex items-center gap-2">
            <Globe size={14} className="text-gold-600" />
            Serving clients globally · also available in:
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-5 gap-y-1">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="text-stone-500 hover:text-maroon-700 text-xs transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
