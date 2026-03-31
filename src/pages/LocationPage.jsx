import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, CheckCircle } from "lucide-react";
import SEO from "../components/common/SEO";
import Schema, {
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "../components/common/Schema";
import SectionWrapper, {
  SectionHeader,
} from "../components/common/SectionWrapper";
import FAQAccordion from "../components/common/FAQAccordion";
import CTASection from "../components/common/CTASection";
import Breadcrumbs from "../components/common/Breadcrumbs";
import NotFoundPage from "./NotFoundPage";
import { getLocationBySlug } from "../data/locations";
import { CONTACT_INFO } from "../data/navigation";

export default function LocationPage() {
  const { slug } = useParams();
  const page = getLocationBySlug(slug);

  if (!page) return <NotFoundPage />;

  return (
    <>
      <SEO
        title={page.metaTitle}
        description={page.metaDesc}
        canonical={`/locations/${slug}`}
      />
      {page.faqs && <Schema type="FAQPage" data={buildFAQSchema(page.faqs)} />}

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-8 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[{ label: page.heroHeading, path: `/locations/${slug}` }]}
          />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} className="text-gold-400" />
              <p className="section-label text-gold-300">Serving Your Region</p>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {page.heroHeading}
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed mb-6">
              {page.heroParagraph || page.regionDesc}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/book" className="btn-gold">
                Book a Consultation
              </Link>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="btn-outline border-white text-white hover:bg-white/10"
              >
                <Phone size={14} /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About region */}
      <SectionWrapper variant="white">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="section-label">About This Region</p>
            <h2 className="section-title mb-2">
              Vedic Astrology for{" "}
              {page.heroHeading
                .replace("Indian Astrologer in ", "")
                .replace("Indian Astrologer – ", "")}
            </h2>
            <div className="gold-divider" />
            <p className="text-stone-600 leading-relaxed mt-4">
              {page.regionDesc}
            </p>
            {page.additionalDesc && (
              <p className="text-stone-600 leading-relaxed mt-3">
                {page.additionalDesc}
              </p>
            )}
          </div>
          <div className="space-y-4">
            <div className="card-gold p-6">
              <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">
                Why Clients in This Region Choose Dr. Gurudeva
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Over 25 years of experience in Vedic astrology",
                  "100% online — available from anywhere",
                  "Consultations in English, Tamil, Telugu, Kannada, Hindi",
                  "Detailed written reports available",
                  "Trusted by thousands of clients worldwide",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-stone-700 text-sm"
                  >
                    <CheckCircle
                      size={13}
                      className="text-gold-500 flex-shrink-0"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Cities */}
      {page.cities && page.cities.length > 0 && (
        <SectionWrapper variant="ivory">
          <SectionHeader
            label="Serving Cities"
            title="Clients From Across the Region"
            subtitle="Dr. Gurudeva has served clients from all major cities and communities in this region."
          />
          <div className="flex flex-wrap gap-2 justify-center">
            {page.cities.map((city) => (
              <span
                key={city}
                className="px-3 py-1.5 rounded-full text-stone-300 text-sm"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                {city}
              </span>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Services CTA */}
      <SectionWrapper variant="white">
        <div className="text-center max-w-xl mx-auto">
          <SectionHeader
            label="Available Services"
            title="What Dr. Gurudeva Offers"
            subtitle="Full range of Vedic astrology services available for clients in this region."
          />
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/services" className="btn-primary">
              Browse All Services
            </Link>
            <Link to="/gemstones" className="btn-outline">
              Gemstone Guidance
            </Link>
            <Link to="/remedies" className="btn-outline">
              Vedic Remedies
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <SectionWrapper variant="ivory">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              label="Questions"
              title="Frequently Asked Questions"
            />
            <FAQAccordion items={page.faqs} flat />
          </div>
        </SectionWrapper>
      )}

      <CTASection
        heading={`Ready to Consult with Dr. Gurudeva?`}
        subtext="Book your session today — available worldwide by phone or video call."
      />
    </>
  );
}
