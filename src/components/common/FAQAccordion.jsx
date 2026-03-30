import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * FAQAccordion – renders a list of {q, a} items.
 * Optionally grouped via items={[{category, items:[]}]}
 */
export default function FAQAccordion({ items = [], flat = true }) {
  const [open, setOpen] = useState(null);

  const toggle = (key) => setOpen((prev) => (prev === key ? null : key));

  if (flat) {
    return (
      <div className="space-y-2" role="list">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            id={`faq-${i}`}
            question={item.q}
            answer={item.a}
            isOpen={open === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    );
  }

  // Grouped mode
  return (
    <div className="space-y-8" role="list">
      {items.map((group) => (
        <div key={group.category}>
          <h3 className="font-serif text-lg text-stone-900 mb-4 flex items-center gap-2">
            <span className="gold-divider my-0 w-6" />
            {group.category}
          </h3>
          <div className="space-y-2">
            {group.items.map((item, i) => {
              const key = `${group.category}-${i}`;
              return (
                <AccordionItem
                  key={key}
                  id={key}
                  question={item.q}
                  answer={item.a}
                  isOpen={open === key}
                  onToggle={() => toggle(key)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function AccordionItem({ id, question, answer, isOpen, onToggle }) {
  return (
    <div
      className={`card overflow-hidden transition-all duration-200 ${isOpen ? 'ring-1 ring-maroon-200' : ''}`}
      role="listitem"
    >
      <button
        id={`q-${id}`}
        aria-expanded={isOpen}
        aria-controls={`a-${id}`}
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-stone-800 text-sm md:text-base leading-snug">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-stone-400 mt-0.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-maroon-500' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`a-${id}`}
            role="region"
            aria-labelledby={`q-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pt-0 text-sm text-stone-500 leading-relaxed border-t border-stone-100">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
