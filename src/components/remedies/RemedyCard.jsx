import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ICON_MAP } from '../../utils/iconMap';

export default function RemedyCard({ remedy, index = 0 }) {
  const Icon = ICON_MAP[remedy.icon] || ICON_MAP.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link
        to={`/remedies/${remedy.slug}`}
        className="card card-top-accent feature-glow-card block p-6 group h-full"
        aria-label={`Learn more about ${remedy.title}`}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, rgba(201,150,12,0.14), rgba(139,26,26,0.08))',
            border: '1px solid rgba(201,150,12,0.25)',
            boxShadow: '0 2px 10px rgba(201,150,12,0.12)',
          }}
        >
          <Icon size={20} className="text-gold-600 group-hover:text-maroon-600 transition-colors" />
        </div>
        <h3 className="font-serif text-base font-semibold text-maroon-900 mb-1.5 group-hover:text-maroon-600 transition-colors">
          {remedy.title}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-3">
          {remedy.shortDesc}
        </p>
        <span className="inline-flex items-center gap-1 text-maroon-600 text-xs font-semibold group-hover:gap-2 transition-all">
          Explore <ArrowRight size={12} />
        </span>
      </Link>
    </motion.div>
  );
}
