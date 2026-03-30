import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function GemstoneCard({ gem, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link
        to={`/gemstones#${gem.slug}`}
        className="card-top-accent block p-5 group text-center relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(201,150,12,0.22)",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
          transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow =
            "0 16px 40px rgba(0,0,0,0.55), 0 6px 16px rgba(201,150,12,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.45)";
        }}
        aria-label={`${gem.name} gemstone guidance`}
      >
        {/* Gem sphere */}
        <div className="relative w-14 h-14 mx-auto mb-3">
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              background: `radial-gradient(circle, ${gem.color}55 0%, transparent 70%)`,
              filter: "blur(8px)",
              transform: "scale(1.4)",
            }}
          />
          {/* Gem circle */}
          <div
            className="w-14 h-14 rounded-full relative"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${gem.color}ee 0%, ${gem.color}99 50%, ${gem.color}66 100%)`,
              boxShadow: `0 4px 16px ${gem.color}66, inset 0 2px 4px rgba(255,255,255,0.4), inset -2px -2px 6px rgba(0,0,0,0.15)`,
            }}
            aria-hidden="true"
          >
            {/* Facet highlight */}
            <div
              className="absolute top-2 left-3 w-4 h-2.5 rounded-full rotate-[-20deg]"
              style={{
                background: "rgba(255,255,255,0.55)",
                filter: "blur(2px)",
              }}
            />
          </div>
        </div>

        <div
          className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2"
          style={{
            background: "rgba(201,150,12,0.14)",
            border: "1px solid rgba(201,150,12,0.35)",
            color: "#EEC060",
          }}
        >
          {gem.planet}
        </div>
        <h3 className="font-serif text-sm font-semibold text-maroon-900 mb-0.5 group-hover:text-maroon-600 transition-colors">
          {gem.name}
        </h3>
        <p className="text-[11px] text-stone-400 italic">{gem.sanskritName}</p>
      </Link>
    </motion.div>
  );
}
