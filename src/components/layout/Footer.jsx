import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, Star, ExternalLink, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../../data/navigation';

const FOOTER_LINKS = {
  Services: [
    { label: 'Horoscope Reading',        path: '/services/horoscope-reading' },
    { label: 'Online Consultation',      path: '/services/online-consultation' },
    { label: 'Career & Business',        path: '/services/career-astrology' },
    { label: 'Marriage & Compatibility', path: '/services/marriage-compatibility' },
    { label: 'Muhurtham & Timing',       path: '/services/muhurtham' },
    { label: 'View All Services',        path: '/services' },
  ],
  Remedies: [
    { label: 'Poojas & Homas',      path: '/remedies/poojas-homas' },
    { label: 'Doshas & Yogas',      path: '/remedies/doshas-yogas' },
    { label: 'Black Magic Removal', path: '/remedies/black-magic-removal' },
    { label: 'Yantras',             path: '/remedies/yantras' },
    { label: 'Vastu Shastra',       path: '/remedies/vastu' },
    { label: 'View All Remedies',   path: '/remedies' },
  ],
  Gemstones: [
    { label: 'Gemstone Guidance', path: '/gemstones' },
    { label: 'Lucky Gem Report',  path: '/services/lucky-gem-report' },
    { label: 'Buy Gemstones',     path: '/gemstones/buy' },
  ],
  Info: [
    { label: 'About Dr. Gurudeva', path: '/about' },
    { label: 'Articles',           path: '/articles' },
    { label: 'FAQ',                path: '/faq' },
    { label: 'Astrology Facts',    path: '/facts' },
    { label: 'Contact',            path: '/contact' },
    { label: 'Book Consultation',  path: '/book' },
  ],
};

const LOCATION_LINKS = [
  { label: 'Indian Astrologer USA',        path: '/locations/indian-astrologer-usa' },
  { label: 'Indian Astrologer California', path: '/locations/indian-astrologer-california' },
  { label: 'Tamil Astrologer USA',         path: '/languages/tamil-astrologer-usa' },
  { label: 'Telugu Astrologer USA',        path: '/languages/telugu-astrologer-usa' },
  { label: 'South Indian Astrology',       path: '/languages/south-indian-astrology' },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pb-24 lg:pb-0"
      style={{ background: '#1E0505' }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Ornate top border */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,150,12,0.35) 25%, rgba(201,150,12,0.65) 50%, rgba(201,150,12,0.35) 75%, transparent 100%)' }} />
        <div className="absolute left-1/2 -translate-x-1/2 -top-[5px] w-2.5 h-2.5 rotate-45" style={{ background: 'rgba(201,150,12,0.65)', boxShadow: '0 0 8px rgba(201,150,12,0.5)' }} />
      </div>

      {/* Aurora orbs */}
      <div className="aurora-orb aurora-orb-maroon w-96 h-96 -left-24 bottom-0 opacity-50" />
      <div className="aurora-orb aurora-orb-gold w-72 h-72 right-0 top-0 opacity-40" />

      {/* Floating footer sparkles */}
      {[
        { l:'4%',  b:'30%', s:4, dur:'6s',   delay:'0s'   },
        { l:'15%', b:'65%', s:3, dur:'8s',   delay:'1.5s' },
        { l:'30%', b:'10%', s:5, dur:'5.5s', delay:'0.8s' },
        { l:'55%', b:'75%', s:4, dur:'7s',   delay:'2.2s' },
        { l:'70%', b:'20%', s:3, dur:'6.5s', delay:'0.4s' },
        { l:'85%', b:'55%', s:5, dur:'5s',   delay:'1.8s' },
        { l:'95%', b:'40%', s:4, dur:'7.5s', delay:'3s'   },
      ].map(({ l, b, s, dur, delay }, i) => (
        <div key={i} className="float-particle" style={{
          left:l, bottom:b, width:s, height:s,
          '--dur':dur, '--delay':delay,
          background: i%2===0
            ? 'radial-gradient(circle, rgba(201,150,12,0.7) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
        }} />
      ))}

      {/* Main footer grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {/* Brand / contact column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #8B1A1A, #5a0e0e)',
                  boxShadow: '0 0 20px rgba(139,26,26,0.5)',
                }}
              >
                <Star size={16} className="text-gold-300" fill="currentColor" />
              </div>
              <div>
                <div className="font-serif text-white font-semibold text-lg gradient-text-warm">
                  Dr. Gurudeva
                </div>
                <div className="text-[10px] text-stone-500 tracking-[0.14em] uppercase">
                  Vedic Astrologer
                </div>
              </div>
            </Link>

            <p className="text-sm text-stone-400 leading-relaxed mb-6 max-w-xs">
              Trusted Vedic astrology consultations for over two decades, serving clients across the USA and worldwide.
            </p>

            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-2.5 text-sm text-stone-400 hover:text-white transition-colors group"
                >
                  <span className="icon-glass w-7 h-7 text-maroon-400 group-hover:shadow-glow-maroon">
                    <Phone size={13} />
                  </span>
                  <span className="gradient-text-gold font-semibold">{CONTACT_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm text-stone-400 hover:text-white transition-colors group"
                >
                  <span
                    className="w-7 h-7 flex items-center justify-center rounded-lg"
                    style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)' }}
                  >
                    <MessageCircle size={13} className="text-green-400" />
                  </span>
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2.5 text-sm text-stone-400 hover:text-white transition-colors group"
                >
                  <span className="icon-glass-gold w-7 h-7">
                    <Mail size={13} className="text-gold-400" />
                  </span>
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>

            {/* CTA */}
            <Link to="/book" className="btn-gold !text-xs !py-2.5 !px-5 mt-6 inline-flex">
              <Sparkles size={12} />
              Book Free Consultation
            </Link>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-white font-semibold text-sm mb-4 gradient-text-gold">{group}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-stone-500 hover:text-stone-200 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SEO location links */}
        <div className="mt-10 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-[10px] text-stone-600 mb-3 uppercase tracking-[0.14em]">Also serving</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {LOCATION_LINKS.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="text-xs text-stone-600 hover:text-stone-300 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-600 text-center sm:text-left">
            © {new Date().getFullYear()} Luckygemfinder / Dr. Gurudeva. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="text-xs text-stone-600 hover:text-stone-300 transition-colors">
              Contact
            </Link>
            <Link to="/faq" className="text-xs text-stone-600 hover:text-stone-300 transition-colors">
              FAQ
            </Link>
            <a
              href={`https://${CONTACT_INFO.website}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-300 transition-colors"
            >
              {CONTACT_INFO.website}
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

