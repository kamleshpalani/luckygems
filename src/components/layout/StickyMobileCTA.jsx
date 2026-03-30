import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, CalendarDays } from 'lucide-react';
import { CONTACT_INFO } from '../../data/navigation';

/**
 * Fixed bottom CTA bar visible only on mobile.
 * Three quick actions: Call, WhatsApp, Book.
 */
export default function StickyMobileCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
      role="complementary"
      aria-label="Quick contact options"
    >
      {/* Subtle gradient fade above the bar */}
      <div className="h-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />

      <div className="bg-white border-t border-stone-200 shadow-large px-3 py-2 pb-safe">
        <div className="grid grid-cols-3 gap-2">
          {/* Call */}
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="flex flex-col items-center gap-0.5 py-2 rounded-xl bg-stone-50 hover:bg-stone-100 active:scale-95 transition-all"
            aria-label={`Call ${CONTACT_INFO.phone}`}
          >
            <div className="w-8 h-8 rounded-full bg-maroon-100 flex items-center justify-center">
              <Phone size={15} className="text-maroon-600" />
            </div>
            <span className="text-[10px] font-semibold text-stone-600">Call</span>
          </a>

          {/* Book – center, highlighted */}
          <Link
            to="/book"
            className="flex flex-col items-center gap-0.5 py-2 rounded-xl bg-maroon-500 hover:bg-maroon-600 active:scale-95 transition-all shadow-maroon"
            aria-label="Book a consultation"
          >
            <div className="w-8 h-8 rounded-full bg-maroon-400 flex items-center justify-center">
              <CalendarDays size={15} className="text-white" />
            </div>
            <span className="text-[10px] font-bold text-white">Book</span>
          </Link>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hello%20Dr.%20Gurudeva%2C%20I%20would%20like%20to%20book%20a%20consultation.`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-0.5 py-2 rounded-xl bg-green-50 hover:bg-green-100 active:scale-95 transition-all"
            aria-label="Contact via WhatsApp"
          >
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <MessageCircle size={15} className="text-green-600" />
            </div>
            <span className="text-[10px] font-semibold text-stone-600">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
