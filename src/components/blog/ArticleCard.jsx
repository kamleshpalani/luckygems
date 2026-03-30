import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ArticleCard({ article, index = 0, featured = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link
        to={`/articles/${article.slug}`}
        className={`card card-top-accent feature-glow-card block group overflow-hidden h-full ${featured ? 'md:flex md:gap-0' : ''}`}
        aria-label={`Read article: ${article.title}`}
      >
        {/* Decorative top gradient bar — animated on hover */}
        <div
          className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
          style={{
            background: 'linear-gradient(90deg, #8B1A1A 0%, #C9960C 40%, #F9D04A 60%, #C9960C 80%, #8B1A1A 100%)',
            backgroundSize: '200% auto',
            animation: 'gradientShift 3s ease infinite',
          }}
        />

        <div className="p-5 flex flex-col h-full">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
              style={{
                background: 'linear-gradient(135deg, rgba(201,150,12,0.12), rgba(201,150,12,0.06))',
                border: '1px solid rgba(201,150,12,0.28)',
                color: '#9a6200',
              }}
            >
              <Tag size={9} />
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-stone-400 text-xs">
              <Clock size={10} />
              {article.readTime}
            </span>
          </div>

          <h3 className="font-serif text-base font-semibold text-maroon-900 mb-2 leading-snug group-hover:text-maroon-600 transition-colors flex-1">
            {article.title}
          </h3>

          <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {article.excerpt}
          </p>

          <span className="inline-flex items-center gap-1 text-maroon-600 text-xs font-semibold mt-auto group-hover:gap-2 transition-all">
            Read article <ArrowRight size={12} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
