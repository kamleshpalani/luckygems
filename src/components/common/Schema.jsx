import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Injects JSON-LD schema markup.
 * Usage: <Schema type="LocalBusiness" data={...} />
 */
export default function Schema({ type, data }) {
  const schema = { '@context': 'https://schema.org', '@type': type, ...data };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

/* ── Preset schemas ── */

export const LOCAL_BUSINESS_SCHEMA = {
  '@type':       'LocalBusiness',
  name:          'Luckygemfinder – Dr. Gurudeva Vedic Astrologer',
  description:   'Trusted Vedic astrologer offering horoscope readings, gemstone guidance, remedies and consultations in the USA and worldwide.',
  url:           'https://www.luckygemfinder.com',
  telephone:     '+17324480667',
  email:         'doctor_deva@yahoo.com',
  priceRange:    '$$',
  image:         'https://www.luckygemfinder.com/og-default.jpg',
  address: {
    '@type':           'PostalAddress',
    streetAddress:     '601 Leia Lane',
    addressLocality:   'Highland Park',
    addressRegion:     'NJ',
    postalCode:        '08904',
    addressCountry:    'US',
  },
  geo: {
    '@type':     'GeoCoordinates',
    latitude:    '40.4990',
    longitude:   '-74.4229',
  },
  areaServed: ['United States', 'Canada', 'United Kingdom', 'India'],
  serviceType: [
    'Vedic Astrology',
    'Horoscope Reading',
    'Gemstone Guidance',
    'Muhurtham',
    'Numerology',
    'Vastu Shastra',
  ],
  openingHours: 'Mo-Su 09:00-20:00',
  sameAs: [
    'https://www.facebook.com/luckygemfinder',
    'https://www.youtube.com/luckygemfinder',
  ],
};

/**
 * Build FAQ schema from [{q, a}] array.
 */
export function buildFAQSchema(items) {
  return {
    '@type':        'FAQPage',
    mainEntity: items.slice(0, 10).map(({ q, a }) => ({
      '@type':          'Question',
      name:             q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

/**
 * Build BreadcrumbList schema.
 */
export function buildBreadcrumbSchema(crumbs) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       crumb.label,
      item:       `https://www.luckygemfinder.com${crumb.path}`,
    })),
  };
}
