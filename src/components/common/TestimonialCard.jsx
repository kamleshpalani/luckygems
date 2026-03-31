import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card card-top-accent flex flex-col h-full relative p-6 overflow-hidden"
    >
      {/* Giant decorative quote mark */}
      <div
        aria-hidden="true"
        className="absolute -top-2 right-3 font-serif font-black select-none pointer-events-none"
        style={{
          fontSize: "7rem",
          lineHeight: 1,
          color: "rgba(201,150,12,0.08)",
        }}
      >
        “
      </div>

      {/* Stars */}
      <div
        className="flex items-center gap-1 mb-4"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className="text-gold-400"
            fill="currentColor"
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-stone-600 text-sm leading-relaxed italic flex-1 mb-5 relative z-10">
        “{testimonial.text}”
      </p>

      {/* Author */}
      <div
        className="flex items-center gap-3 mt-auto pt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #8B1A1A 0%, #C9960C 100%)",
            boxShadow: "0 2px 8px rgba(139,26,26,0.25)",
          }}
          aria-hidden="true"
        >
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-maroon-900 text-sm">
            {testimonial.name}
          </p>
          <p className="text-stone-400 text-xs mt-0.5">
            {testimonial.location} · {testimonial.service}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
