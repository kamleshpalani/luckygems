import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Video, MapPin } from 'lucide-react';

const OPTIONS = [
  {
    icon:     Phone,
    title:    'Phone Consultation',
    desc:     'A direct, personal call with Dr. Gurudeva. Available worldwide.',
    cta:      'Book by Phone',
    href:     '/book?type=phone',
    color:    'bg-maroon-50 text-maroon-600',
  },
  {
    icon:     Video,
    title:    'Video Call',
    desc:     'Face-to-face via Zoom, WhatsApp Video or Google Meet.',
    cta:      'Book Video Call',
    href:     '/book?type=video',
    color:    'bg-blue-50 text-blue-600',
    popular:  true,
  },
  {
    icon:     MapPin,
    title:    'In-Person (Bay Area)',
    desc:     'Visit in the San Francisco Bay Area for a personal session.',
    cta:      'Check Availability',
    href:     '/book?type=inperson',
    color:    'bg-gold-50 text-gold-600',
  },
];

export default function BookingOptions() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {OPTIONS.map((opt) => {
        const Icon = opt.icon;
        return (
          <div
            key={opt.title}
            className={`relative card p-6 text-center flex flex-col items-center ${opt.popular ? 'ring-2 ring-maroon-400' : ''}`}
          >
            {opt.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge text-[10px]">
                Recommended
              </span>
            )}
            <div className={`w-12 h-12 rounded-full ${opt.color} flex items-center justify-center mb-4`}>
              <Icon size={20} />
            </div>
            <h3 className="font-serif text-base font-semibold text-stone-900 mb-1.5">{opt.title}</h3>
            <p className="text-stone-500 text-sm mb-5 flex-1">{opt.desc}</p>
            <Link to={opt.href} className="btn-outline w-full justify-center !py-2.5 !text-xs">
              {opt.cta}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
