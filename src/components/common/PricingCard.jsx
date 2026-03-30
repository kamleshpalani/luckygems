import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricingCard({ plan, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative rounded-2xl p-7 flex flex-col h-full border-2 transition-shadow duration-200 ${
        plan.popular
          ? 'border-maroon-400 bg-maroon-50 shadow-maroon'
          : 'border-stone-200 bg-white shadow-soft hover:shadow-medium'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-maroon-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            <Zap size={11} fill="currentColor" />
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-1">{plan.name}</h3>
        <p className="text-stone-500 text-sm">{plan.description}</p>
        <div className="flex items-baseline gap-1.5 mt-4">
          <span className="font-serif text-4xl font-bold text-maroon-600">{plan.price}</span>
          <span className="text-stone-400 text-sm">/ {plan.duration}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-7 flex-1">
        {plan.includes.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700">
            <Check size={14} className="text-maroon-500 flex-shrink-0 mt-0.5" />
            {item}
          </li>
        ))}
      </ul>

      <Link
        to="/book"
        className={`w-full text-center py-3 rounded-xl font-medium text-sm transition-all ${
          plan.popular
            ? 'btn-primary justify-center'
            : 'btn-outline justify-center'
        }`}
        state={{ plan: plan.id }}
      >
        {plan.cta}
      </Link>
    </motion.div>
  );
}
