import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, CreditCard } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionWrapper, { SectionHeader } from '../components/common/SectionWrapper';
import BookingOptions from '../components/forms/BookingOptions';
import PricingCard from '../components/common/PricingCard';
import FAQAccordion from '../components/common/FAQAccordion';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { PRICING_PLANS } from '../data/pricing';
import { FAQ_GROUPS } from '../data/faq';
import { CONTACT_INFO } from '../data/navigation';

const BOOKING_STEPS = [
  { step: '1', title: 'Choose a Plan', desc: 'Select the consultation type that best fits your questions and needs.' },
  { step: '2', title: 'Pick Your Format', desc: 'Choose between phone call, WhatsApp video, or in-person.' },
  { step: '3', title: 'Contact to Schedule', desc: 'Call or WhatsApp to confirm your date and time.' },
  { step: '4', title: 'Prepare Your Details', desc: 'Have your full birth date, exact time of birth, and birthplace ready.' },
  { step: '5', title: 'Make Payment', desc: 'Payment is completed before the session. Multiple methods accepted.' },
];

export default function BookPage() {
  const location = useLocation();
  const preselectedService = new URLSearchParams(location.search).get('service') || '';

  const pricingFaqs = FAQ_GROUPS.find((g) => g.category === 'Pricing')?.items || [];
  const appointmentFaqs = FAQ_GROUPS.find((g) => g.category === 'Appointment Process')?.items || [];

  return (
    <>
      <SEO
        title="Book a Vedic Astrology Consultation with Dr. Gurudeva"
        description="Schedule your Vedic astrology consultation with Dr. Gurudeva. Choose from phone, video, or in-person sessions. Multiple languages available."
        canonical="/book"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-maroon-700 to-maroon-900 text-white py-8 md:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: 'Book a Consultation', path: '/book' }]} />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 max-w-xl"
          >
            <p className="section-label text-gold-300 mb-2">Schedule</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Book a Consultation
            </h1>
            <p className="text-maroon-100 text-lg leading-relaxed mb-6">
              Consult with Dr. Gurudeva by phone, video, or in-person. Serving clients worldwide in English, Tamil, Telugu, Kannada, and Hindi.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${CONTACT_INFO.phone}`} className="btn-gold">
                <Phone size={15} /> Call to Book
              </a>
              <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=I%20would%20like%20to%20book%20a%20consultation`} target="_blank" rel="noopener noreferrer" className="btn-outline border-white text-white hover:bg-white/10">
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking format */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto">
          <SectionHeader label="Choose Your Format" title="How Would You Like to Consult?" subtitle="All formats deliver the same quality — choose the one most comfortable for you." />
          <BookingOptions preselected={preselectedService} />
        </div>
      </SectionWrapper>

      {/* Booking steps */}
      <SectionWrapper variant="ivory">
        <SectionHeader label="The Process" title="How to Book in 5 Steps" subtitle="Simple and straightforward from start to finish." />
        <div className="grid sm:grid-cols-5 gap-4">
          {BOOKING_STEPS.map(({ step, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="w-10 h-10 rounded-full bg-maroon-500 text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">{step}</div>
              <h3 className="font-serif font-semibold text-stone-900 text-sm mb-1">{title}</h3>
              <p className="text-stone-500 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Pricing */}
      <SectionWrapper variant="white">
        <SectionHeader label="Pricing" title="Consultation Plans" subtitle="Straightforward pricing — no hidden fees." />
        <div className="grid sm:grid-cols-3 gap-5">
          {PRICING_PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/payment" className="flex items-center gap-2 justify-center text-maroon-600 hover:text-maroon-800 text-sm font-medium transition-colors">
            <CreditCard size={14} /> View full payment options & specialty pricing
          </Link>
        </div>
      </SectionWrapper>

      {/* What to prepare */}
      <SectionWrapper variant="ivory">
        <div className="max-w-xl mx-auto">
          <SectionHeader label="Before Your Session" title="What to Prepare" subtitle="For an accurate and comprehensive reading:" />
          <ul className="space-y-3">
            {[
              'Full date of birth (day, month, year)',
              'Exact time of birth (as close to the minute as possible)',
              'Exact birthplace (city, state, country)',
              'Key questions or areas you want to focus on',
              'Any relevant past events or ongoing concerns',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-stone-700">
                <CheckCircle size={14} className="text-gold-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-stone-500 text-sm mt-5">
            <strong>Note:</strong> Birth time accuracy significantly affects the quality of the reading. Birth certificates or hospital records are ideal sources.
          </p>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Questions" title="Booking & Pricing FAQs" />
          <FAQAccordion items={[...pricingFaqs, ...appointmentFaqs]} flat />
        </div>
      </SectionWrapper>
    </>
  );
}
