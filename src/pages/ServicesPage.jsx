import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import Schema, { buildFAQSchema } from '../components/common/Schema';
import SectionWrapper, { SectionHeader } from '../components/common/SectionWrapper';
import ServiceCard from '../components/services/ServiceCard';
import FAQAccordion from '../components/common/FAQAccordion';
import CTASection from '../components/common/CTASection';
import PricingCard from '../components/common/PricingCard';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { SERVICES, SERVICE_CATEGORIES } from '../data/services';
import { PRICING_PLANS } from '../data/pricing';
import { FAQ_GROUPS } from '../data/faq';

const PROCESS_STEPS = [
  { num: '01', title: 'Share Your Birth Details',   desc: 'Date, time and place of birth — the foundation of your chart.' },
  { num: '02', title: 'Chart Preparation',           desc: 'Dr. Gurudeva reviews your chart before the session.' },
  { num: '03', title: 'Your Consultation',           desc: 'A personal session — phone, video or in-person.' },
  { num: '04', title: 'Guidance & Follow-Up',        desc: 'Written summary + WhatsApp support for 2–6 weeks.' },
];

export default function ServicesPage() {
  const consultFaqs = FAQ_GROUPS.find((g) => g.category === 'Consultations')?.items || [];

  return (
    <>
      <SEO
        title="Vedic Astrology Services – Horoscope, Career, Marriage, Muhurtham & More"
        description="Explore Dr. Gurudeva's full range of Vedic astrology services — horoscope readings, career guidance, marriage compatibility, muhurtham, numerology and more."
        canonical="/services"
      />
      <Schema type="FAQPage" data={buildFAQSchema(consultFaqs)} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-maroon-800 to-maroon-900 text-white py-8 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: 'Services', path: '/services' }]} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mt-4"
          >
            <p className="section-label text-gold-300 mb-3">Vedic Astrology</p>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-5 leading-tight">
              Astrology Services
            </h1>
            <p className="text-maroon-100 text-lg leading-relaxed">
              Personalized Vedic consultations for every area of life — from career and marriage to health, spirituality and timing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid by category */}
      {SERVICE_CATEGORIES.map((category) => {
        const catServices = SERVICES.filter((s) => s.category === category);
        return (
          <SectionWrapper key={category} variant="white">
            <h2 className="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-3">
              <span className="gold-divider my-0 w-8" />
              {category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {catServices.map((service, i) => (
                <ServiceCard key={service.slug} service={service} index={i} />
              ))}
            </div>
          </SectionWrapper>
        );
      })}

      {/* Process */}
      <SectionWrapper variant="ivory">
        <SectionHeader
          label="How It Works"
          title="Your Consultation Journey"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card p-6 text-center"
            >
              <div className="w-12 h-12 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-maroon-600 font-bold text-lg">{num}</span>
              </div>
              <h3 className="font-serif font-semibold text-stone-900 mb-2">{title}</h3>
              <p className="text-stone-500 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Pricing overview */}
      <SectionWrapper variant="white">
        <SectionHeader
          label="Pricing"
          title="Transparent Consultation Fees"
          subtitle="Clear pricing with no hidden costs. Choose the consultation type that best fits your needs."
        />
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/payment" className="text-sm text-maroon-500 hover:underline">
            View specialty service pricing →
          </Link>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper variant="ivory">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Questions" title="Consultation FAQs" />
          <FAQAccordion items={consultFaqs} flat />
          <div className="text-center mt-6">
            <Link to="/faq" className="btn-secondary">
              View All FAQs <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      <CTASection heading="Ready to Book Your Consultation?" subtext="Select the service that fits your need and book a session with Dr. Gurudeva today." />
    </>
  );
}
