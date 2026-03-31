import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Briefcase,
  Heart,
  Activity,
  Gem,
  Layers,
  Calendar,
  HelpCircle,
  Building2,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  User,
  MapPin,
  Clock,
  CalendarDays,
  Navigation,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import SEO from "../components/common/SEO";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { supabase } from "../lib/supabase";

/* ──────────────────────────────────────────────────────────
   DATA
────────────────────────────────────────────────────────── */
const INQUIRY_SERVICES = [
  {
    slug: "horoscope-reading",
    title: "Horoscope Reading",
    tagline: "Lifetime predictions based on Vedic astrology",
    icon: Star,
    price: "$21",
    popular: true,
    color: "from-maroon-700 to-maroon-500",
    badge: "Most Popular",
  },
  {
    slug: "career-astrology",
    title: "Career Analysis",
    tagline: "Find the career path your horoscope supports",
    icon: Briefcase,
    price: "$21",
    color: "from-blue-700 to-blue-500",
  },
  {
    slug: "marriage-compatibility",
    title: "Kundli Matching",
    tagline: "36-point horoscope compatibility analysis",
    icon: Heart,
    price: "$21",
    color: "from-rose-700 to-rose-500",
  },
  {
    slug: "health-astrology",
    title: "Health Astrology",
    tagline: "Planetary influences on your wellbeing",
    icon: Activity,
    price: "$21",
    color: "from-emerald-700 to-emerald-500",
  },
  {
    slug: "lucky-gem-report",
    title: "Lucky Gem Report",
    tagline: "Your ideal gemstone from your birth chart",
    icon: Gem,
    price: "$21",
    color: "from-violet-700 to-violet-500",
  },
  {
    slug: "doshas-yogas",
    title: "Doshas & Yogas",
    tagline: "Identify and remedy planetary afflictions",
    icon: Layers,
    price: "$21",
    color: "from-amber-700 to-amber-500",
  },
  {
    slug: "muhurtham",
    title: "Muhurtham / Timing",
    tagline: "Auspicious timing for life's biggest moments",
    icon: Calendar,
    price: "$21",
    color: "from-teal-700 to-teal-500",
  },
  {
    slug: "business-astrology",
    title: "Business Astrology",
    tagline: "Planetary guidance for your enterprise",
    icon: Building2,
    price: "$21",
    color: "from-indigo-700 to-indigo-500",
  },
  {
    slug: "ask-a-question",
    title: "Ask a Question",
    tagline: "One specific question answered in depth",
    icon: HelpCircle,
    price: "$11",
    color: "from-stone-700 to-stone-500",
  },
];

/* ──────────────────────────────────────────────────────────
   VALIDATION
────────────────────────────────────────────────────────── */
const FIELDS = [
  {
    id: "fullName",
    label: "Full Name",
    icon: User,
    type: "text",
    placeholder: "e.g. Priya Sharma",
    required: true,
  },
  {
    id: "dob",
    label: "Date of Birth",
    icon: CalendarDays,
    type: "date",
    placeholder: "",
    required: true,
  },
  {
    id: "timeOfBirth",
    label: "Time of Birth",
    icon: Clock,
    type: "time",
    placeholder: "",
    required: true,
  },
  {
    id: "placeOfBirth",
    label: "Place of Birth",
    icon: MapPin,
    type: "text",
    placeholder: "e.g. Chennai, Tamil Nadu",
    required: true,
  },
  {
    id: "presentLocation",
    label: "Present Location",
    icon: Navigation,
    type: "text",
    placeholder: "e.g. Edison, NJ, USA",
    required: true,
  },
];

const INITIAL_VALUES = Object.fromEntries(FIELDS.map((f) => [f.id, ""]));
const INITIAL_ERRORS = Object.fromEntries(FIELDS.map((f) => [f.id, ""]));

function validate(values) {
  const errors = { ...INITIAL_ERRORS };
  let valid = true;

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
    valid = false;
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
    valid = false;
  }

  if (!values.dob) {
    errors.dob = "Date of birth is required.";
    valid = false;
  } else {
    const d = new Date(values.dob);
    if (d > new Date()) {
      errors.dob = "Date cannot be in the future.";
      valid = false;
    }
  }

  if (!values.timeOfBirth) {
    errors.timeOfBirth =
      "Birth time is required. Provide best estimate if unknown.";
    valid = false;
  }

  if (!values.placeOfBirth.trim()) {
    errors.placeOfBirth = "Place of birth is required.";
    valid = false;
  }

  if (!values.presentLocation.trim()) {
    errors.presentLocation = "Present location is required.";
    valid = false;
  }

  return { errors, valid };
}

/* ──────────────────────────────────────────────────────────
   STEP INDICATOR
────────────────────────────────────────────────────────── */
const STEPS = ["Select Service", "Your Birth Details", "Confirmation"];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 select-none">
      {STEPS.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "idle";
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  scale: state === "active" ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${
                  state === "done"
                    ? "bg-maroon-600 border-maroon-600 text-white"
                    : state === "active"
                      ? "bg-white border-maroon-600 text-maroon-700 shadow-md shadow-maroon-200"
                      : "bg-white border-stone-300 text-stone-400"
                }`}
              >
                {state === "done" ? <CheckCircle2 size={17} /> : i + 1}
              </motion.div>
              <span
                className={`text-[11px] font-medium whitespace-nowrap transition-colors duration-300 ${
                  state === "active"
                    ? "text-maroon-700"
                    : state === "done"
                      ? "text-maroon-500"
                      : "text-stone-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-10 sm:w-16 mb-5 mx-1 rounded-full transition-colors duration-500 ${
                  i < current ? "bg-maroon-500" : "bg-stone-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SERVICE CARD
────────────────────────────────────────────────────────── */
function ServiceCard({ service, selected, onSelect }) {
  const Icon = service.icon;
  const active = selected?.slug === service.slug;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(service)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`relative text-left w-full rounded-2xl border-2 p-5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon-400 ${
        active
          ? "border-maroon-500 bg-maroon-50 shadow-lg shadow-maroon-100"
          : "border-stone-200 bg-white hover:border-maroon-300 hover:shadow-md"
      }`}
      style={{
        background: active ? "rgba(201,150,12,0.10)" : "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Popular badge */}
      {service.badge && (
        <span className="absolute -top-2.5 right-4 bg-gold-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
          {service.badge}
        </span>
      )}

      {/* Selection ring */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-3 right-3"
          >
            <div className="w-5 h-5 rounded-full bg-maroon-600 flex items-center justify-center">
              <CheckCircle2 size={13} className="text-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 shadow-sm`}
      >
        <Icon size={20} className="text-white" />
      </div>

      {/* Text */}
      <p
        className={`font-semibold text-sm leading-snug mb-1 ${active ? "text-maroon-800" : "text-stone-900"}`}
      >
        {service.title}
      </p>
      <p className="text-stone-500 text-xs leading-relaxed line-clamp-2">
        {service.tagline}
      </p>

      {/* Price */}
      <div
        className={`mt-3 inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
          active ? "bg-maroon-600 text-white" : "bg-stone-100 text-stone-600"
        }`}
      >
        {service.price}
      </div>
    </motion.button>
  );
}

/* ──────────────────────────────────────────────────────────
   FORM FIELD
────────────────────────────────────────────────────────── */
function FormField({ field, value, error, onChange, touched }) {
  const Icon = field.icon;
  const hasError = touched && error;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={field.id}
        className="text-sm font-semibold text-stone-700 flex items-center gap-1.5"
      >
        <Icon size={13} className="text-maroon-500" />
        {field.label}
        <span className="text-maroon-500">*</span>
      </label>
      <div className="relative">
        <input
          id={field.id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          className={`w-full rounded-xl border px-4 py-3 text-sm backdrop-blur-sm transition-all duration-150 focus:outline-none focus:ring-2 ${
            hasError
              ? "border-red-400 focus:ring-red-200 focus:border-red-400"
              : "border-stone-300 focus:ring-maroon-200 focus:border-maroon-400"
          } placeholder:text-stone-400 text-stone-800`}
        />
      </div>
      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-600 text-xs mt-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SELECTED SERVICE SUMMARY CHIP
────────────────────────────────────────────────────────── */
function ServiceSummaryBar({ service, onChange }) {
  const Icon = service.icon;
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-2xl px-5 py-3.5 mb-6"
      style={{
        background: "rgba(201,150,12,0.08)",
        border: "1px solid rgba(201,150,12,0.30)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}
        >
          <Icon size={16} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-maroon-900 text-sm leading-snug">
            {service.title}
          </p>
          <p className="text-maroon-600 text-xs">
            {service.price} · Email report within 24–48 hrs
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onChange}
        className="text-xs text-gold-400 hover:text-gold-300 border border-gold-600/40 hover:border-gold-500/60 px-3 py-1.5 rounded-full transition-colors flex-shrink-0"
      >
        Change
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SUCCESS SCREEN
────────────────────────────────────────────────────────── */
function SuccessScreen({ service, values }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 22,
      }}
      className="text-center py-8 px-4"
    >
      {/* Animated checkmark */}
      <div className="relative mx-auto w-24 h-24 mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-maroon-600 to-maroon-400 flex items-center justify-center shadow-xl shadow-maroon-200"
        >
          <CheckCircle2 size={44} className="text-white" strokeWidth={2} />
        </motion.div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.cos((i / 6) * Math.PI * 2) * 44,
              y: Math.sin((i / 6) * Math.PI * 2) * 44,
            }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.8 }}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gold-400"
            style={{ transform: "translate(-50%, -50%)" }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
          Request Submitted! 🙏
        </h2>
        <p className="text-stone-500 text-sm max-w-md mx-auto leading-relaxed mb-6">
          Namaste, <strong className="text-stone-700">{values.fullName}</strong>
          ! Dr. Gurudeva has received your request for{" "}
          <strong className="text-maroon-700">{service.title}</strong>. You'll
          receive a detailed report via email within{" "}
          <strong>24–48 hours</strong>.
        </p>

        {/* Summary card */}
        <div
          className="rounded-2xl p-5 text-left max-w-sm mx-auto mb-8 space-y-2"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {[
            ["Service", service.title],
            ["Name", values.fullName],
            ["Date of Birth", values.dob],
            ["Time of Birth", values.timeOfBirth],
            ["Place of Birth", values.placeOfBirth],
            ["Present", values.presentLocation],
          ].map(([label, val]) => (
            <div key={label} className="flex items-start gap-2 text-sm">
              <span className="text-stone-400 w-28 flex-shrink-0">{label}</span>
              <span className="font-medium text-stone-800 flex-1">{val}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary justify-center">
            Go to Home
          </Link>
          <Link to="/services" className="btn-outline justify-center">
            Browse All Services
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────────────────────── */
const SLIDE = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

export default function InquiryPage() {
  const [step, setStep] = useState(0); // 0=select, 1=form, 2=success
  const [service, setService] = useState(null);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState(
    Object.fromEntries(FIELDS.map((f) => [f.id, false])),
  );
  const [loading, setLoading] = useState(false);
  const [dir, setDir] = useState(1); // slide direction
  const topRef = useRef(null);

  const crumbs = [{ label: "Request a Consultation", path: "/inquiry" }];

  // Scroll top on step change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const goTo = useCallback(
    (next) => {
      setDir(next > step ? 1 : -1);
      setStep(next);
    },
    [step],
  );

  const handleSelectService = useCallback((svc) => {
    setService(svc);
  }, []);

  const handleNext = useCallback(() => {
    if (!service) return;
    goTo(1);
  }, [service, goTo]);

  const handleBack = useCallback(() => {
    goTo(0);
  }, [goTo]);

  const handleChange = useCallback(
    (id, val) => {
      setValues((prev) => ({ ...prev, [id]: val }));
      setTouched((prev) => ({ ...prev, [id]: true }));
      // Live-validate touched field
      const { errors: e } = validate({ ...values, [id]: val });
      setErrors((prev) => ({ ...prev, [id]: e[id] }));
    },
    [values],
  );

  const handleBlur = useCallback(
    (id) => {
      setTouched((prev) => ({ ...prev, [id]: true }));
      const { errors: e } = validate(values);
      setErrors((prev) => ({ ...prev, [id]: e[id] }));
    },
    [values],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // Touch all fields
      setTouched(Object.fromEntries(FIELDS.map((f) => [f.id, true])));
      const { errors: e2, valid } = validate(values);
      setErrors(e2);
      if (!valid) return;

      setLoading(true);
      try {
        const { error } = await supabase.from("inquiries").insert({
          service: service.slug,
          service_title: service.title,
          full_name: values.fullName,
          dob: values.dob,
          time_of_birth: values.timeOfBirth,
          place_of_birth: values.placeOfBirth,
          present_location: values.presentLocation,
        });
        if (error) throw error;
        goTo(2);
      } catch (_) {
        alert("Something went wrong. Please try again or call us directly.");
      } finally {
        setLoading(false);
      }
    },
    [values, service, goTo],
  );

  return (
    <>
      <SEO
        title="Request a Consultation – Dr. Gurudeva Vedic Astrologer"
        description="Submit your birth details to Dr. Gurudeva for a personalized Vedic astrology consultation."
        canonical="/inquiry"
      />

      {/* ── Decorative hero strip ── */}
      <section className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-700 text-white py-10 md:py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          aria-hidden="true"
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${220 + i * 120}px`,
                height: `${220 + i * 120}px`,
                top: "50%",
                left: "10%",
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
          <Breadcrumbs crumbs={[]} />
          <div className="flex items-center gap-3 mt-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Sparkles size={18} className="text-gold-300" />
            </div>
            <span className="text-gold-300 text-sm font-medium">
              Consultation Request
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
            Book Your Vedic Consultation
          </h1>
          <p className="text-maroon-200 text-base max-w-lg">
            Select a service and share your birth details — Dr. Gurudeva will
            personally analyze your chart and reply within 24–48 hours.
          </p>
        </div>
      </section>

      {/* ── Main card ── */}
      <div ref={topRef} className="min-h-screen py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Step indicator */}
          <div className="mb-8">
            <StepIndicator current={step} />
          </div>

          {/* Glass card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-stone-200/60 overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              {/* ── STEP 0: Service Selection ── */}
              {step === 0 && (
                <motion.div
                  key="step-0"
                  custom={dir}
                  variants={SLIDE}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="p-6 sm:p-8"
                >
                  <div className="mb-6">
                    <h2 className="font-serif text-2xl font-bold text-stone-100 mb-1">
                      Choose a Service
                    </h2>
                    <p className="text-stone-500 text-sm">
                      Select the consultation that best fits your need. You can
                      change this later.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {INQUIRY_SERVICES.map((svc, i) => (
                      <motion.div
                        key={svc.slug}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <ServiceCard
                          service={svc}
                          selected={service}
                          onSelect={handleSelectService}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <p className="text-stone-400 text-xs">
                      {service
                        ? `Selected: ${service.title}`
                        : "No service selected yet"}
                    </p>
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      disabled={!service}
                      whileHover={service ? { scale: 1.02 } : {}}
                      whileTap={service ? { scale: 0.97 } : {}}
                      className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Continue
                      <ChevronRight size={15} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 1: Birth Details Form ── */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  custom={dir}
                  variants={SLIDE}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="p-6 sm:p-8"
                >
                  {/* Service summary */}
                  {service && (
                    <ServiceSummaryBar
                      service={service}
                      onChange={handleBack}
                    />
                  )}

                  {/* Dr. Gurudeva's greeting */}
                  <div
                    className="rounded-2xl p-5 mb-7 relative overflow-hidden"
                    style={{
                      background: "rgba(139,26,26,0.14)",
                      border: "1px solid rgba(139,26,26,0.28)",
                    }}
                  >
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl opacity-5 pointer-events-none font-serif select-none">
                      🕉
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-maroon-700 to-maroon-500 flex items-center justify-center flex-shrink-0 shadow-md">
                        <span className="text-white font-bold text-sm">G</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gold-300 text-sm mb-1">
                          Dr. Gurudeva Astrologer
                        </p>
                        <div className="text-stone-700 text-sm leading-relaxed space-y-0.5">
                          <p className="font-medium text-maroon-800">
                            Namaste,
                          </p>
                          <p>Dr. Gurudeva Astrologer here.</p>
                          <p>Please send your birth details below:</p>
                          <div className="mt-2 text-stone-400 text-xs space-y-0.5">
                            <p>Full Name :</p>
                            <p>Dob :</p>
                            <p>Time :</p>
                            <p>Place of birth :</p>
                            <p>Present Location :</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-5 mb-8">
                      {FIELDS.map((field) => (
                        <FormField
                          key={field.id}
                          field={field}
                          value={values[field.id]}
                          error={errors[field.id]}
                          touched={touched[field.id]}
                          onChange={handleChange}
                          onBlur={() => handleBlur(field.id)}
                        />
                      ))}
                    </div>

                    {/* Privacy note */}
                    <p className="text-stone-400 text-xs mb-6 flex items-start gap-1.5">
                      <span className="text-maroon-400 mt-0.5">🔒</span>
                      Your birth details are used solely for your astrological
                      reading and are never shared with third parties.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="btn-outline flex items-center gap-2 w-full sm:w-auto justify-center order-2 sm:order-1"
                      >
                        <ChevronLeft size={15} />
                        Back
                      </button>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.97 } : {}}
                        className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center order-1 sm:order-2 sm:ml-auto disabled:opacity-70"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            Submit Request
                            <ArrowRight size={15} />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* ── STEP 2: Success ── */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  custom={dir}
                  variants={SLIDE}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="p-6 sm:p-10"
                >
                  <SuccessScreen service={service} values={values} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust badges */}
          {step < 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-8 text-stone-400 text-xs"
            >
              {[
                "25+ Years Experience",
                "Clients in 30+ Countries",
                "Reply Within 24–48 Hours",
                "Secure & Confidential",
              ].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-maroon-400" />
                  {t}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
