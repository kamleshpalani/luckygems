import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import {
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_REVIEW_URL,
  GOOGLE_REVIEWS,
} from '../../data/googleReviews';

/* ── Google "G" SVG logo ──────────────────────────────── */
function GoogleLogo({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ── Five-star row ────────────────────────────────────── */
function StarRow({ rating = 5, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'text-[#fbbc05]' : 'text-stone-300'}
          fill={i < rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}

/* ── Individual review card ───────────────────────────── */
function GoogleReviewCard({ review, index }) {
  const [expanded, setExpanded] = useState(false);
  const TRUNCATE = 160;
  const long = review.text.length > TRUNCATE;
  const displayText =
    long && !expanded ? review.text.slice(0, TRUNCATE).trimEnd() + '…' : review.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col gap-3"
    >
      {/* Header: avatar + name + date */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 select-none"
          style={{ backgroundColor: review.avatarColor }}
          aria-hidden="true"
        >
          {review.initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-stone-900 text-sm leading-snug truncate">{review.name}</p>
          <p className="text-stone-400 text-xs mt-0.5">{review.relativeDate}</p>
        </div>
        <div className="flex-shrink-0 opacity-70">
          <GoogleLogo size={18} />
        </div>
      </div>

      {/* Stars */}
      <StarRow rating={review.rating} />

      {/* Review text */}
      <p className="text-stone-600 text-sm leading-relaxed flex-1">
        {displayText}
        {long && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-blue-600 hover:underline text-xs font-medium"
          >
            {expanded ? 'less' : 'more'}
          </button>
        )}
      </p>
    </motion.div>
  );
}

/* ── Main exported section ────────────────────────────── */
export default function GoogleReviewsSection() {
  return (
    <SectionWrapper variant="base">
      <SectionHeader
        label="Google Reviews"
        title="What Clients Say on Google"
        subtitle="Verified reviews from Google — real clients, real experiences."
      />

      {/* Rating summary bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10 bg-white border border-stone-200 rounded-2xl shadow-sm px-6 py-5 max-w-md mx-auto"
      >
        {/* Google logo + "Reviews" label */}
        <div className="flex items-center gap-2">
          <GoogleLogo size={28} />
          <span className="font-semibold text-stone-700 text-sm">Google Reviews</span>
        </div>

        <div className="hidden sm:block h-8 w-px bg-stone-200" aria-hidden="true" />

        {/* Score */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-3xl font-bold text-stone-900 leading-none">
            {GOOGLE_RATING.toFixed(1)}
          </span>
          <div className="flex flex-col gap-0.5">
            <StarRow rating={Math.round(GOOGLE_RATING)} size={15} />
            <span className="text-stone-400 text-xs">
              Based on {GOOGLE_REVIEW_COUNT} reviews
            </span>
          </div>
        </div>
      </motion.div>

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {GOOGLE_REVIEWS.map((review, i) => (
          <GoogleReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-700 font-medium text-sm px-6 py-2.5 rounded-xl shadow-sm transition-all duration-200"
        >
          <GoogleLogo size={16} />
          See all reviews on Google
        </a>
      </div>
    </SectionWrapper>
  );
}
