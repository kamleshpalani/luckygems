import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ICON_MAP } from '../../utils/iconMap';

export default function ServiceCard({ service, index = 0 }) {
  const Icon = ICON_MAP[service.icon] || ICON_MAP.Star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="h-full"
    >
      <Link
        to={`/services/${service.slug}`}
        className="card card-top-accent feature-glow-card block p-6 group h-full relative"
        aria-label={`Learn more about ${service.title}`}
      >
        {/* Price badge */}
        {service.price && (
          <span
            className="absolute top-4 right-4 text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(201,150,12,0.12), rgba(201,150,12,0.06))',
              border: '1px solid rgba(201,150,12,0.3)',
              color: '#9a6200',
            }}
          >
            {service.price}
          </span>
        )}

        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, rgba(201,150,12,0.12), rgba(139,26,26,0.07))',
              border: '1px solid rgba(201,150,12,0.22)',
              boxShadow: '0 2px 12px rgba(201,150,12,0.1)',
            }}
          >
            <Icon size={21} className="text-maroon-700 group-hover:text-gold-600 transition-colors duration-200" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-serif text-base font-semibold text-maroon-900 group-hover:text-maroon-600 transition-colors">
                {service.title}
              </h3>
              {service.popular && (
                <span className="badge text-[10px] py-0.5">Popular</span>
              )}
            </div>
            <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">
              {service.shortDesc}
            </p>
            <span className="inline-flex items-center gap-1 text-maroon-600 text-xs font-semibold mt-3 group-hover:gap-2 transition-all duration-200">
              Learn more <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
