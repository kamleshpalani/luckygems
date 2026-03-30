import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '../../data/navigation';

/**
 * Full-width CTA section with customizable heading, subtext and actions.
 */
export default function CTASection({
  heading    = 'Ready to Consult Dr. Gurudeva?',
  subtext    = 'Book a personal consultation today and gain clarity on your path forward.',
  primaryCTA = { label: 'Book Consultation', path: '/book' },
  secondaryCTA,
  variant    = 'maroon', // 'maroon' | 'ivory' | 'dark'
}) {
  const styles = {
    maroon: {
      wrapper: '',
      heading: 'text-white',
      sub:     'text-maroon-100',
      primary: 'btn-gold btn-shine',
      secondary:'bg-white/10 hover:bg-white/20 text-white border border-white/30',
    },
    ivory: {
      wrapper: 'bg-ivory-100 border-t border-ivory-300',
      heading: 'text-stone-900',
      sub:     'text-stone-500',
      primary: 'btn-primary btn-shine',
      secondary:'btn-secondary',
    },
    dark: {
      wrapper: 'bg-stone-900',
      heading: 'text-white',
      sub:     'text-stone-400',
      primary: 'btn-primary btn-shine',
      secondary:'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    },
  }[variant];

  /* Maroon variant gets a full decorative treatment */
  if (variant === 'maroon') {
    return (
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background: 'linear-gradient(135deg, #6F1414 0%, #8B1A1A 40%, #7a1616 70%, #5a1010 100%)',
        }}
      >
        {/* Aurora orbs */}
        <div className="aurora-orb aurora-orb-gold" style={{ width:'50vw', height:'50vw', top:'-30%', right:'-10%', opacity: 0.35 }} />
        <div className="aurora-orb aurora-orb-maroon" style={{ width:'40vw', height:'40vw', bottom:'-20%', left:'-10%', opacity: 0.5 }} />

        {/* Diagonal light band */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)',
          }}
        />

        {/* Mandala watermark */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: "url('/mandala-tile.svg')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Floating sparkles */}
        {[
          { l:'8%',  b:'20%', s:6,  dur:'5s',   delay:'0s'   },
          { l:'18%', b:'70%', s:4,  dur:'7s',   delay:'1.2s' },
          { l:'42%', b:'15%', s:5,  dur:'4.5s', delay:'2s'   },
          { l:'65%', b:'80%', s:7,  dur:'6s',   delay:'0.8s' },
          { l:'80%', b:'35%', s:4,  dur:'5.5s', delay:'1.6s' },
          { l:'92%', b:'60%', s:5,  dur:'4s',   delay:'3s'   },
        ].map(({ l, b, s, dur, delay }, i) => (
          <div key={i} className="float-particle" style={{
            left:l, bottom:b, width:s, height:s,
            '--dur':dur, '--delay':delay,
            background: i%2===0
              ? 'radial-gradient(circle, rgba(201,150,12,0.9) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)',
          }} />
        ))}

        {/* Ornate top rule */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background:'linear-gradient(90deg, transparent, rgba(201,150,12,0.5) 30%, rgba(255,255,255,0.2) 50%, rgba(201,150,12,0.5) 70%, transparent)' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(201,150,12,0.35)' }}
            >
              <span style={{ color:'rgba(201,150,12,0.95)', fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase' }}>
                ✦ Begin Your Journey
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
              {heading}
            </h2>
            <p className="text-maroon-100/80 text-base md:text-lg mb-10 max-w-2xl mx-auto">{subtext}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={primaryCTA.path} className={`${styles.primary} !px-10 !py-4 !text-base w-full sm:w-auto justify-center`}>
                <CalendarDays size={18} />
                {primaryCTA.label}
              </Link>

              {secondaryCTA ? (
                <Link to={secondaryCTA.path} className={`inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-base transition-all ${styles.secondary}`}>
                  {secondaryCTA.label}
                </Link>
              ) : (
                <div className="flex flex-col xs:flex-row sm:flex-row gap-3 w-full sm:w-auto">
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-sm transition-all bg-white/10 hover:bg-white/20 text-white border border-white/20 w-full sm:w-auto"
                  >
                    <Phone size={15} />
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-sm bg-green-600 hover:bg-green-500 text-white transition-colors w-full sm:w-auto"
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Ornate bottom rule */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background:'linear-gradient(90deg, transparent, rgba(201,150,12,0.4) 40%, rgba(201,150,12,0.4) 60%, transparent)' }} />
      </section>
    );
  }

  return (
    <section className={`py-16 md:py-20 ${styles.wrapper}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`font-serif text-3xl md:text-4xl font-semibold mb-4 ${styles.heading}`}>
            {heading}
          </h2>
          <p className={`text-base md:text-lg mb-8 max-w-2xl mx-auto ${styles.sub}`}>{subtext}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to={primaryCTA.path} className={`${styles.primary} !px-8 !py-3.5`}>
              <CalendarDays size={16} />
              {primaryCTA.label}
            </Link>

            {secondaryCTA ? (
              <Link to={secondaryCTA.path} className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium text-sm transition-all ${styles.secondary}`}>
                {secondaryCTA.label}
              </Link>
            ) : (
              <div className="flex gap-3">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-lg font-medium text-sm transition-all ${styles.secondary}`}
                >
                  <Phone size={15} />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg font-medium text-sm bg-green-600 hover:bg-green-700 text-white transition-colors"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
