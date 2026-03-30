import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import SEO from '../components/common/SEO';
import Schema, { LOCAL_BUSINESS_SCHEMA } from '../components/common/Schema';
import SectionWrapper, { SectionHeader } from '../components/common/SectionWrapper';
import ContactForm from '../components/forms/ContactForm';
import FAQAccordion from '../components/common/FAQAccordion';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { CONTACT_INFO } from '../data/navigation';
import { FAQ_GROUPS } from '../data/faq';

const CONTACT_METHODS = [
  {
    icon: <Phone size={22} className="text-gold-500" />,
    label: 'Phone / WhatsApp',
    value: CONTACT_INFO.phoneDisplay,
    sub: 'Available 7 days a week, 9 AM – 9 PM EST',
    action: { label: 'Call Now', href: `tel:${CONTACT_INFO.phone}` },
    action2: { label: 'WhatsApp', href: `https://wa.me/${CONTACT_INFO.whatsapp}` },
  },
  {
    icon: <Mail size={22} className="text-gold-500" />,
    label: 'Email',
    value: CONTACT_INFO.email,
    sub: 'Response within 24 hours',
    action: { label: 'Send Email', href: `mailto:${CONTACT_INFO.email}` },
  },
  {
    icon: <MessageCircle size={22} className="text-gold-500" />,
    label: 'WhatsApp Consultation',
    value: 'For detailed enquiries',
    sub: 'Share your birth details via WhatsApp',
    action: { label: 'Open WhatsApp', href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=Hello%20Dr.%20Gurudeva%2C%20I%20would%20like%20to%20enquire%20about%20a%20consultation.` },
  },
];

const OFFICE_INFO = [
  {
    icon: <MapPin size={15} />,
    label: 'In-Person Consultations',
    value: '108 Cedar Lane, Highland Park, NJ 08904',
    sub: 'Enter through garage door · By appointment only · $31 per reading',
    sub2: 'Do not ship to this address'
  },
  {
    icon: <MapPin size={15} />,
    label: 'Home / Shipping Address',
    value: '601 Leia Lane, Highland Park, NJ 08904',
    sub: '1 mile from Edison Train Station',
  },
  { icon: <Phone size={15} />, label: 'Phone (USA)', value: CONTACT_INFO.phoneUSA },
  { icon: <Phone size={15} />, label: 'Phone (UK)', value: CONTACT_INFO.phoneUK },
  { icon: <Mail size={15} />, label: 'Email', value: CONTACT_INFO.email },
  { icon: <Clock size={15} />, label: 'Hours', value: '9 AM – 9 PM EST, 7 days a week' },
];

export default function ContactPage() {
  const appointmentFaqs = FAQ_GROUPS.find((g) => g.category === 'Appointment Process')?.items || [];

  return (
    <>
      <SEO
        title="Contact Dr. Gurudeva – Book a Vedic Astrology Consultation"
        description="Contact Dr. Gurudeva for a Vedic astrology consultation. Reach us by phone, WhatsApp, or email. Serving clients worldwide."
        canonical="/contact"
      />
      <Schema type="LocalBusiness" data={LOCAL_BUSINESS_SCHEMA} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-8 md:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: 'Contact', path: '/contact' }]} />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 max-w-xl"
          >
            <p className="section-label text-gold-300 mb-2">Get in Touch</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Contact Dr. Gurudeva
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed">
              Reach out by phone, WhatsApp, or email. We serve clients worldwide in English, Tamil, Telugu, Kannada, and Hindi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact methods */}
      <SectionWrapper variant="ivory">
        <div className="grid sm:grid-cols-3 gap-5">
          {CONTACT_METHODS.map(({ icon, label, value, sub, action, action2 }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-gold p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-3">
                {icon}
              </div>
              <h3 className="font-serif font-semibold text-stone-900 mb-1">{label}</h3>
              <p className="text-maroon-700 font-medium text-sm mb-1">{value}</p>
              <p className="text-stone-500 text-xs mb-4">{sub}</p>
              <div className="flex flex-col gap-2">
                <a href={action.href} className="btn-primary justify-center text-sm">{action.label}</a>
                {action2 && (
                  <a href={action2.href} target="_blank" rel="noopener noreferrer" className="btn-outline justify-center text-sm">{action2.label}</a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Form + office info */}
      <SectionWrapper variant="white">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-6">Send a Message</h2>
            <ContactForm />
          </div>

          {/* Office info */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-6">Office Information</h2>
            <div className="card p-6 space-y-4">
              {OFFICE_INFO.map(({ icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-gold-500 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">{label}</p>
                    <p className="text-stone-700 text-sm">{value}</p>
                    {sub && <p className="text-stone-400 text-xs mt-0.5">{sub}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 card-gold p-5">
              <p className="text-sm text-stone-600 leading-relaxed">
                <strong className="text-stone-800">International Clients:</strong> Dr. Gurudeva serves clients across the USA, UK, Canada, Australia, Singapore, and India. All consultations are available online via phone or video call.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper variant="ivory">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Before You Write" title="Appointment Process FAQs" />
          <FAQAccordion items={appointmentFaqs} flat />
        </div>
      </SectionWrapper>
    </>
  );
}
