import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Users,
  Gift,
  MessageCircle,
  AlertCircle,
  FileText,
  Calendar,
} from "lucide-react";
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
import RelatedServices from "../components/services/RelatedServices";
import PricingCard from "../components/common/PricingCard";
import Breadcrumbs from "../components/common/Breadcrumbs";
import NotFoundPage from "./NotFoundPage";
import { ICON_MAP } from "../utils/iconMap";
import { getServiceBySlug } from "../data/services";
import { PRICING_PLANS } from "../data/pricing";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <NotFoundPage />;

  const Icon = ICON_MAP[service.icon] || ICON_MAP.Star;
  const breadcrumbs = [
    { label: "Services", path: "/services" },
    { label: service.title, path: `/services/${slug}` },
  ];

  return (
    <>
      <SEO
        title={`${service.title} – Vedic Astrology Consultation`}
        description={service.shortDesc}
        canonical={`/services/${slug}`}
      />
      {service.concerns.length > 0 && (
        <Schema type="FAQPage" data={buildFAQSchema(service.concerns)} />
      )}
      <Schema type="BreadcrumbList" data={buildBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-maroon-800 to-maroon-900 text-white py-8 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={breadcrumbs.slice(0, -1)} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-5">
              <Icon size={13} className="text-gold-300" />
              <span className="text-xs text-gold-200 font-medium">
                {service.category}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 leading-tight">
              {service.hero.heading}
            </h1>
            <p className="text-maroon-100 text-lg leading-relaxed">
              {service.hero.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <SectionWrapper variant="white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-10">
          {/* Main col */}
          <div className="lg:col-span-2 space-y-12">
            {/* Who it is for */}
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Users size={16} className="text-maroon-500" />
                <h2 className="font-serif text-xl font-semibold text-stone-900">
                  Who This Service Is For
                </h2>
              </div>
              <ul className="space-y-3">
                {service.forWhom.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-stone-600 text-sm"
                  >
                    <CheckCircle
                      size={15}
                      className="text-maroon-400 mt-0.5 flex-shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What you get */}
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Gift size={16} className="text-gold-500" />
                <h2 className="font-serif text-xl font-semibold text-stone-900">
                  What You Will Receive
                </h2>
              </div>
              <ul className="space-y-3">
                {service.whatYouGet.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-stone-600 text-sm"
                  >
                    <CheckCircle
                      size={15}
                      className="text-gold-500 mt-0.5 flex-shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Notes */}
            {service.notes?.length > 0 && (
              <div
                className="rounded-xl p-5 space-y-3"
                style={{
                  background: "rgba(201,150,12,0.08)",
                  border: "1px solid rgba(201,150,12,0.28)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <div className="inline-flex items-center gap-2 mb-1">
                  <AlertCircle size={16} className="text-gold-400" />
                  <h2 className="font-serif text-base font-semibold text-gold-300">
                    Important Notes
                  </h2>
                </div>
                {service.notes.map((note, i) => (
                  <p key={i} className="text-stone-300 text-sm leading-relaxed">
                    <span className="font-semibold">Note {i + 1}: </span>
                    {note}
                  </p>
                ))}
              </div>
            )}
            {/* Question Categories (ask-a-question service) */}
            {service.questionCategories?.length > 0 && (
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <MessageCircle size={16} className="text-maroon-500" />
                  <h2 className="font-serif text-xl font-semibold text-stone-900">
                    Sample Questions
                  </h2>
                </div>
                <p className="text-stone-500 text-sm mb-5">
                  Choose from the list below or write your own question. Each
                  answer is <strong className="text-maroon-600">$11</strong>.
                  You will also receive a free 50-page horoscope report.
                </p>
                <div className="space-y-4">
                  {service.questionCategories.map((cat) => (
                    <div
                      key={cat.category}
                      className="rounded-xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }}
                    >
                      <h3 className="font-semibold text-maroon-700 text-sm mb-2.5">
                        {cat.category}
                      </h3>
                      <ul className="space-y-2">
                        {cat.questions.map((q) => (
                          <li
                            key={q}
                            className="flex items-start justify-between gap-3 text-stone-600 text-sm"
                          >
                            <span className="flex items-start gap-2">
                              <CheckCircle
                                size={13}
                                className="text-gold-500 mt-0.5 flex-shrink-0"
                              />
                              {q}
                            </span>
                            <span className="font-semibold text-maroon-600 text-xs whitespace-nowrap ml-2">
                              $11
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Muhurtham Types */}
            {service.muhurthamTypes?.length > 0 && (
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-gold-500" />
                  <h2 className="font-serif text-xl font-semibold text-stone-900">
                    Available Muhurthams
                  </h2>
                </div>
                <p className="text-stone-500 text-sm mb-4">
                  Please mention the ceremony venue city and the date range you
                  need in additional comments when ordering.
                </p>
                <div className="rounded-xl border border-white/12 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr
                        className="border-b-2 border-gold-500/50"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      >
                        <th className="text-left px-4 py-2.5 font-semibold text-stone-700">
                          Event
                        </th>
                        <th className="text-right px-4 py-2.5 font-semibold text-stone-700">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.muhurthamTypes.map(({ event, price }) => (
                        <tr
                          key={event}
                          className="border-b border-white/8 hover:bg-white/5 transition-colors"
                        >
                          <td className="px-4 py-2.5 text-stone-700">
                            {event}
                          </td>
                          <td className="px-4 py-2.5 text-right text-maroon-700 font-semibold">
                            {price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* Marital Questions (married-life-guidance service) */}
            {service.maritalQuestions?.length > 0 && (
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <Users size={16} className="text-maroon-500" />
                  <h2 className="font-serif text-xl font-semibold text-stone-900">
                    Questions Covered in This Service
                  </h2>
                </div>
                <ul className="space-y-2.5">
                  {service.maritalQuestions.map((q) => (
                    <li
                      key={q}
                      className="flex items-start gap-3 text-stone-600 text-sm"
                    >
                      <CheckCircle
                        size={14}
                        className="text-gold-500 mt-0.5 flex-shrink-0"
                      />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sample Report */}
            {service.sampleReport && (
              <div className="border border-gold-200 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-maroon-800 to-maroon-700 px-5 py-3 flex items-center gap-2">
                  <FileText size={16} className="text-gold-300" />
                  <h2 className="font-serif text-base font-semibold text-white">
                    {service.sampleReport.label}
                  </h2>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-maroon-100 flex items-center justify-center flex-shrink-0">
                      <Users size={18} className="text-maroon-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm">
                        {service.sampleReport.name}
                      </p>
                      <p className="text-stone-500 text-xs">
                        {service.sampleReport.analyst}
                      </p>
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm italic border-l-2 border-gold-400 pl-3">
                    {service.sampleReport.note}
                  </p>
                </div>
              </div>
            )}

            {/* Consultation formats */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-stone-900 mb-3">
                Consultation Format
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.formats.map((fmt) => (
                  <span key={fmt} className="badge px-3 py-1.5">
                    {fmt}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQ */}
            {service.concerns.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-semibold text-stone-900 mb-4">
                  Common Questions
                </h2>
                <FAQAccordion items={service.concerns} flat />
              </div>
            )}

            {/* Related */}
            {service.relatedSlugs?.length > 0 && (
              <RelatedServices
                slugs={service.relatedSlugs}
                currentSlug={slug}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <PricingCard
              plan={PRICING_PLANS.find((p) => p.id === "online")}
              index={0}
            />

            <div className="card p-5 text-center space-y-3">
              <p className="text-stone-500 text-sm">Have a quick question?</p>
              <a
                href="https://wa.me/17324480667"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors w-full justify-center"
              >
                <MessageCircle size={14} />
                WhatsApp Dr. Gurudeva
              </a>
              <Link
                to="/book"
                className="btn-outline w-full justify-center !text-sm"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <CTASection
        heading={`Book Your ${service.title} Session`}
        subtext={`Get personalized guidance from Dr. Gurudeva on ${service.title.toLowerCase()}.`}
      />
    </>
  );
}
