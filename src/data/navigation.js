/**
 * Navigation configuration.
 * Drives both desktop nav and mobile menu.
 */

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'Horoscope Reading',         path: '/services/horoscope-reading' },
      { label: 'Ask a Question',            path: '/services/ask-a-question' },
      { label: 'Lucky Gem Report',          path: '/services/lucky-gem-report' },
      { label: 'Online Consultation',       path: '/services/online-consultation' },
      { label: 'Career Analysis',           path: '/services/career-astrology' },
      { label: 'Business & Partnership',    path: '/services/business-astrology' },
      { label: 'Marriage & Compatibility',  path: '/services/marriage-compatibility' },
      { label: 'Family, Child & Health',    path: '/services/child-health-guidance' },
      { label: 'Muhurtham & Timing',        path: '/services/muhurtham' },
      { label: 'Travel & Abroad',           path: '/services/travel-abroad-astrology' },
      { label: 'Numerology',                path: '/services/numerology' },
    ],
  },
  {
    label: 'Remedies',
    path: '/remedies',
    children: [
      { label: 'Poojas & Homas',      path: '/remedies/poojas-homas' },
      { label: 'Doshas & Yogas',      path: '/remedies/doshas-yogas' },
      { label: 'Manglik Dosha',       path: '/remedies/manglik-dosha' },
      { label: 'Kaal Sarpa Dosha',    path: '/remedies/kaal-sarpa-dosha' },
      { label: 'Sarpa Dosha',         path: '/remedies/sarpa-dosha' },
      { label: 'Sade Sati',           path: '/remedies/sade-sati' },
      { label: 'Viyog Dosha',         path: '/remedies/viyog-dosha' },
      { label: 'Black Magic Removal', path: '/remedies/black-magic-removal' },
      { label: 'Spiritual Healing',   path: '/remedies/spiritual-healing' },
      { label: 'Yantras',             path: '/remedies/yantras' },
      { label: 'Vastu',               path: '/remedies/vastu' },
    ],
  },
  {
    label: 'Gemstones',
    path: '/gemstones',
    children: [
      { label: 'Gemstone Guidance', path: '/gemstones' },
      { label: 'Lucky Gem Report',  path: '/services/lucky-gem-report' },
      { label: 'Buy Gemstones',     path: '/gemstones/buy' },
    ],
  },
  { label: 'Articles', path: '/articles' },
  { label: 'FAQ',      path: '/faq' },
  { label: 'Contact',  path: '/contact' },
];

export const CTA_NAV = { label: 'Book Consultation', path: '/book' };

export const CONTACT_INFO = {
  phone:           '7324480667',
  phoneDisplay:    '732-448-0667',
  phoneUSA:        '732-448-0667',
  phoneUK:         '020-8144-6490',
  whatsapp:        '17324480667',
  email:           'doctor_deva@yahoo.com',
  emailTrust:      'gurudeva_trust@yahoo.com',
  paypal:          'doctor_deva@yahoo.com',
  website:         'www.luckygemfinder.com',
  // Home / Shipping address (601 Leia Lane)
  addressLine1:    '601 Leia Lane',
  addressLine2:    'Highland Park, NJ 08904',
  addressFull:     '601 Leia Lane, Highland Park, NJ 08904, USA',
  addressNearby:   '1 mile from Edison Train Station',
  // Office / In-Person consultation address (108 Cedar Lane)
  officeAddressLine1: '108 Cedar Lane',
  officeAddressLine2: 'Highland Park, NJ 08904',
  officeAddressFull:  '108 Cedar Lane, Highland Park, NJ 08904',
  officeNote:         'Enter through garage door. Do not ship to this address.',
  inPersonFee:        '$31 per horoscope reading',
  hours:           '9 AM – 9 PM EST, 7 days a week',
};
