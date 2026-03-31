import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  CheckCircle,
  ShoppingBag,
  Mail,
  ExternalLink,
  DollarSign,
  Info,
} from "lucide-react";
import SEO from "../components/common/SEO";
import SectionWrapper, {
  SectionHeader,
} from "../components/common/SectionWrapper";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import {
  PRICING_PLANS,
  SPECIALTY_PRICING,
  PAYMENT_METHODS,
} from "../data/pricing";

const PAYPAL_EMAIL = "doctor_deva@yahoo.com";

const AFTER_PAYMENT = [
  "Send your details (name, date/time/place of birth) to gurudeva_trust@yahoo.com after payment.",
  "Dr. Gurudeva will confirm receipt and schedule your request within 24 hours.",
  "For phone consultations, Dr. Gurudeva will call you at the arranged time.",
  "For email/online services, the report will be delivered within 48 hours.",
  "For poojas and homas, scheduling information will be emailed within 24 hours.",
];

function PayPalForm({
  itemName,
  itemNumber,
  amount,
  setAmount,
  accentClass,
  buttonClass,
}) {
  const handleSubmit = (e) => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      e.preventDefault();
      alert("Please enter a valid amount before proceeding to PayPal.");
    }
  };

  return (
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_blank"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input type="hidden" name="cmd" value="_xclick" />
      <input type="hidden" name="business" value={PAYPAL_EMAIL} />
      <input type="hidden" name="item_name" value={itemName} />
      <input type="hidden" name="item_number" value={itemNumber} />
      <input type="hidden" name="currency_code" value="USD" />
      <input type="hidden" name="no_shipping" value="1" />

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">
          Amount (USD)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 font-semibold text-lg">
            $
          </span>
          <input
            type="number"
            name="amount"
            min="1"
            step="1"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-3 border-2 border-stone-200 rounded-xl text-lg font-semibold text-stone-800 focus:outline-none focus:border-maroon-400 transition-colors"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${buttonClass}`}
      >
        <img
          src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
          alt="PayPal"
          className="h-5 object-contain"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        Pay Now via PayPal
        <ExternalLink size={14} />
      </button>

      <p className="text-xs text-stone-400 text-center">
        Powered by PayPal · Secure checkout · No account required
      </p>
    </form>
  );
}

export default function PaymentPage() {
  const [serviceAmount, setServiceAmount] = useState("");
  const [productAmount, setProductAmount] = useState("");

  return (
    <>
      <SEO
        title="Payments – Dr. Gurudeva | Vedic Astrology"
        description="Pay for astrology consultations, poojas, gemstones, and products via PayPal. Transparent pricing from Dr. Gurudeva."
        canonical="/payment"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-8 md:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: "Payment", path: "/payment" }]} />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 max-w-xl"
          >
            <p className="section-label text-gold-300 mb-2">Secure Checkout</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Payments
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed">
              Pay securely via PayPal for consultations, poojas, gemstones, and
              products. Enter your amount and proceed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TWO PAYMENT BOXES ── */}
      <SectionWrapper variant="white">
        <SectionHeader
          label="Pay Online"
          title="Choose Your Payment Category"
          subtitle={`PayPal ID: ${PAYPAL_EMAIL} — you can also send payments directly from your PayPal account to this ID.`}
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Box 1 — Services / Email / Website */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border-2 border-maroon-200 bg-maroon-50 p-7 flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-maroon-500 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-white" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-maroon-800 leading-tight">
                  Services / Email / Website Requests
                </h2>
                <p className="text-xs text-maroon-600 mt-0.5">
                  Horoscope reading, Kundli matching, Muhurthams &amp; all
                  standard services
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "$21 — Standard service",
                "$31 — In-person",
                "$51 — Vivaha Muhurtham",
              ].map((hint) => (
                <span
                  key={hint}
                  className="text-xs bg-maroon-100 text-maroon-700 px-2.5 py-1 rounded-full font-medium"
                >
                  {hint}
                </span>
              ))}
            </div>

            <PayPalForm
              itemName="Dr. Gurudeva — Astrology Service / Email / Website Request"
              itemNumber="SERVICE"
              amount={serviceAmount}
              setAmount={setServiceAmount}
              buttonClass="bg-maroon-600 hover:bg-maroon-700 text-white shadow"
            />
          </motion.div>

          {/* Box 2 — Poojas / Gems / Products */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border-2 p-7 flex flex-col gap-5"
            style={{
              background: "rgba(201,150,12,0.08)",
              border: "2px solid rgba(201,150,12,0.40)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                <ShoppingBag size={18} className="text-white" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-800 leading-tight">
                  Poojas / Gems / Products
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Homas, Yantras, Gemstones &amp; all physical products
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "$101 — Graha Santhi",
                "$151 — Sani / Navagraha",
                "$251 — Manglik",
                "$501 — Homam",
                "$200 — Yantras",
              ].map((hint) => (
                <span
                  key={hint}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: "rgba(201,150,12,0.15)",
                    border: "1px solid rgba(201,150,12,0.30)",
                    color: "#EEC060",
                  }}
                >
                  {hint}
                </span>
              ))}
            </div>

            <PayPalForm
              itemName="Dr. Gurudeva — Pooja / Gems / Products"
              itemNumber="PRODUCT"
              amount={productAmount}
              setAmount={setProductAmount}
              buttonClass="bg-gold-500 hover:bg-gold-600 text-white shadow"
            />
          </motion.div>
        </div>

        {/* Info note */}
        <div
          className="mt-8 max-w-3xl mx-auto flex items-start gap-3 rounded-xl p-4"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <Info size={16} className="text-stone-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-stone-600 leading-relaxed">
            After completing payment, please email your details (name,
            date/time/place of birth, and service requested) to{" "}
            <a
              href="mailto:gurudeva_trust@yahoo.com"
              className="text-maroon-600 font-medium hover:underline"
            >
              gurudeva_trust@yahoo.com
            </a>
            . Dr. Gurudeva will confirm your request within 24 hours. For
            queries, call{" "}
            <a
              href="tel:+17324480667"
              className="text-maroon-600 font-medium hover:underline"
            >
              732-448-0667
            </a>
            .
          </p>
        </div>
      </SectionWrapper>

      {/* Consultation plans */}
      <SectionWrapper variant="ivory">
        <SectionHeader
          label="Consultation Fees"
          title="Standard Consultation Plans"
          subtitle="All prices are in USD."
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gold-300">
                <th className="text-left py-3 pr-4 font-semibold text-stone-700">
                  Plan
                </th>
                <th className="text-left py-3 pr-4 font-semibold text-stone-700">
                  Duration
                </th>
                <th className="text-left py-3 pr-4 font-semibold text-stone-700">
                  Price
                </th>
                <th className="text-left py-3 font-semibold text-stone-700">
                  What's Included
                </th>
              </tr>
            </thead>
            <tbody>
              {PRICING_PLANS.map(({ name, duration, price, includes }) => (
                <tr
                  key={name}
                  className="border-b border-white/8 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 pr-4 font-semibold text-stone-800">
                    {name}
                  </td>
                  <td className="py-3 pr-4 text-stone-600">{duration}</td>
                  <td className="py-3 pr-4 text-maroon-700 font-bold">
                    {price}
                  </td>
                  <td className="py-3 text-stone-500">
                    {(includes || []).slice(0, 2).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* Specialty pricing */}
      <SectionWrapper variant="white">
        <SectionHeader
          label="Specialty Services"
          title="Specialty Report Pricing"
          subtitle="Written reports, charts, and specialized analysis."
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gold-300">
                <th className="text-left py-3 pr-4 font-semibold text-stone-700">
                  Service
                </th>
                <th className="text-left py-3 font-semibold text-stone-700">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {SPECIALTY_PRICING.map(({ service, price }) => (
                <tr
                  key={service}
                  className="border-b border-white/8 hover:bg-white/5 transition-colors"
                >
                  <td className="py-2.5 pr-4 text-stone-700">{service}</td>
                  <td className="py-2.5 text-maroon-700 font-semibold">
                    {price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* Payment methods */}
      <SectionWrapper variant="ivory">
        <SectionHeader
          label="How to Pay"
          title="Accepted Payment Methods"
          subtitle="PayPal is the preferred and most secure method."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PAYMENT_METHODS.map(({ name, details }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="card p-4 text-center"
            >
              <CreditCard size={18} className="text-gold-500 mx-auto mb-2" />
              <p className="font-semibold text-stone-800 text-sm">{name}</p>
              <p className="text-stone-500 text-xs mt-1 break-all">{details}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* After payment */}
      <SectionWrapper variant="white">
        <div className="max-w-xl mx-auto">
          <SectionHeader label="What Happens Next" title="After You Pay" />
          <ul className="space-y-3">
            {AFTER_PAYMENT.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-stone-700">
                <CheckCircle
                  size={14}
                  className="text-gold-500 mt-0.5 flex-shrink-0"
                />
                {step}
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      <CTASection
        heading="Questions Before Paying?"
        subtext="Call Dr. Gurudeva directly on 732-448-0667 (9 AM–9 PM EST, 7 days). Free first-time phone consultation available."
        primaryCTA={{ label: "Book a Consultation", href: "/book" }}
        secondaryCTA={{ label: "View All Services", href: "/services" }}
      />
    </>
  );
}
