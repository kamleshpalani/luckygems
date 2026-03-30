import React from "react";
import { motion } from "framer-motion";

/**
 * Consistent section wrapper with optional background variants.
 * variant: 'base' | 'elevated' | 'glass' | 'aurora' | 'deep' | 'maroon' | 'dark'
 */
export default function SectionWrapper({
  children,
  variant = "base",
  className = "",
  id,
}) {
  const variantMap = {
    base: { style: { background: "transparent" }, extra: "" },
    elevated: {
      style: {
        background: "rgba(255,255,255,0.04)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      },
      extra: "",
    },
    glass: {
      style: {
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      },
      extra: "",
    },
    aurora: {
      style: { background: "transparent" },
      extra: "relative overflow-hidden",
    },
    deep: {
      style: {
        background: "rgba(10,5,20,0.72)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      },
      extra: "",
    },
    maroon: {
      style: {
        background:
          "linear-gradient(135deg, rgba(139,26,26,0.55) 0%, rgba(80,10,10,0.62) 100%)",
        borderTop: "1px solid rgba(255,100,100,0.16)",
        borderBottom: "1px solid rgba(255,100,100,0.1)",
      },
      extra: "",
    },
    dark: {
      style: {
        background: "rgba(10,5,20,0.72)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      },
      extra: "",
    },
    // legacy aliases → all map to dark glass on dark bg
    white: {
      style: {
        background: "rgba(255,255,255,0.04)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      },
      extra: "",
    },
    ivory: { style: { background: "transparent" }, extra: "" },
    pattern: { style: { background: "transparent" }, extra: "" },
  };

  const { style, extra } = variantMap[variant] || variantMap.base;

  return (
    <section
      id={id}
      className={`section-padding ${extra} ${className}`}
      style={style}
    >
      {variant === "aurora" && (
        <>
          <div className="aurora-orb aurora-orb-maroon  w-96 h-96 -left-24 top-1/4 opacity-55" />
          <div className="aurora-orb aurora-orb-gold    w-80 h-80 right-0 bottom-0 opacity-40" />
          <div className="aurora-orb aurora-orb-crimson w-72 h-72 left-1/2 -top-12 opacity-30" />
          <div className="aurora-orb aurora-orb-gold    w-56 h-56 right-1/4 top-8 opacity-22" />
        </>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

/**
 * Animated section header used across all sections.
 */
export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
}) {
  return (
    <motion.div
      className={`mb-8 md:mb-12 lg:mb-14 ${align === "center" ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {label && (
        <p
          className={`section-label section-label-star ${light ? "text-gold-300" : ""}`}
        >
          {label}
        </p>
      )}
      <h2 className={`section-title ${light ? "text-white" : ""}`}>{title}</h2>
      {align === "center" && (
        <div className="ornate-divider">
          <span className="od-line" />
          <span className="od-gem" />
          <span className="od-line od-line-r" />
        </div>
      )}
      {subtitle && (
        <p
          className={`section-subtitle max-w-2xl ${align === "center" ? "mx-auto" : ""} ${light ? "text-stone-300" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
