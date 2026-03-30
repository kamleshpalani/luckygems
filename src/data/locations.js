/**
 * Location-based SEO landing page data.
 * Primary location: Highland Park, NJ (near Edison Train Station)
 */

export const LOCATIONS = [
  {
    slug:        'indian-astrologer-usa',
    title:       'Trusted Indian Astrologer in the USA',
    metaTitle:   'Indian Astrologer in USA | Dr. Gurudeva – Vedic Astrology Consultations',
    metaDesc:    'Looking for a trusted Indian Vedic astrologer in the USA? Dr. Gurudeva offers personal Vedic astrology consultations by phone and in-person from Highland Park, NJ for clients across the United States.',
    heroHeading: 'Vedic Astrology Consultations Across the USA',
    heroSub:     'Dr. Gurudeva serves clients nationwide — from New Jersey to California — with authentic Vedic astrology guidance. Free phone consultations available.',
    region:      'United States',
    regionDesc:  'Dr. Gurudeva has served the Indian diaspora across the United States for over two decades. Based in Highland Park, NJ (near Edison Train Station), he offers in-person consultations in New Jersey and phone/online consultations for clients across the entire USA. Whether you are in New York, New Jersey, California, Texas, Illinois, or anywhere else — consultation is just a phone call away.',
    cities:      ['Highland Park', 'Edison', 'New Brunswick', 'Newark', 'New York', 'Princeton', 'Jersey City', 'Parsippany', 'Iselin', 'Piscataway', 'Chicago', 'Houston', 'Dallas', 'Los Angeles', 'San Jose', 'Seattle', 'Atlanta', 'Washington DC', 'Boston'],
    faqs: [
      { q: 'Where is Dr. Gurudeva located in the USA?', a: 'Dr. Gurudeva is based at 601 Leia Lane, Highland Park, NJ 08904, near the Edison Train Station.' },
      { q: 'Can I consult Dr. Gurudeva from outside New Jersey?', a: 'Yes — phone consultations are available to clients across all US time zones. In-person is available in Highland Park, NJ.' },
      { q: 'What are the consultation hours?', a: 'Dr. Gurudeva is available 7 days a week, 9 AM to 9 PM EST. Call 732-448-0667.' },
    ],
  },
  {
    slug:        'indian-astrologer-new-jersey',
    title:       'Indian Astrologer in New Jersey | Highland Park & Edison',
    metaTitle:   'Indian Astrologer in New Jersey | Dr. Gurudeva – Vedic Astrology Highland Park',
    metaDesc:    'Consult Dr. Gurudeva, a renowned Vedic astrologer based in Highland Park, NJ near Edison. Serving the NJ Indian community with in-person and phone consultations. Call 732-448-0667.',
    heroHeading: 'Vedic Astrology in New Jersey',
    heroSub:     'In-person consultations available in Highland Park, NJ. Serving the entire New Jersey Indian community.',
    region:      'New Jersey, USA',
    regionDesc:  'Dr. Gurudeva is based in Highland Park, New Jersey, near the Edison Train Station — a central and convenient location for the large Indian community in Central NJ. In-person consultations are available by appointment. Phone consultations are also available for clients throughout New Jersey and the tri-state area.',
    cities:      ['Highland Park', 'Edison', 'New Brunswick', 'East Brunswick', 'Old Bridge', 'Piscataway', 'Iselin', 'Woodbridge', 'Princeton', 'Plainsboro', 'South Plainfield', 'Newark', 'Jersey City', 'Parsippany', 'Bridgewater'],
    faqs: [
      { q: 'Where exactly is the in-person consultation location?', a: 'Dr. Gurudeva is located at 601 Leia Lane, Highland Park, NJ 08904, near the Edison Train Station for easy access.' },
      { q: 'How do I schedule an in-person appointment?', a: 'Call Dr. Gurudeva at 732-448-0667 or email doctor_deva@yahoo.com to schedule an in-person appointment.' },
      { q: 'Do you serve the Edison / Iselin Indian community?', a: 'Yes — Highland Park is centrally located and easily accessible from Edison, Iselin, Piscataway, and all of Central NJ.' },
    ],
  },
  {
    slug:        'indian-astrologer-california',
    title:       'Indian Astrologer for California Clients',
    metaTitle:   'Indian Astrologer for California | Dr. Gurudeva – Phone & Online Consultations',
    metaDesc:    'Consult Dr. Gurudeva, a renowned Vedic astrologer, by phone or online from anywhere in California including San Jose, Fremont, and Los Angeles. Call 732-448-0667.',
    heroHeading: 'Vedic Astrology for California Clients',
    heroSub:     'Phone and online consultations available for the California Indian community from Dr. Gurudeva.',
    region:      'California, USA',
    regionDesc:  'Dr. Gurudeva serves a large number of clients from the California Indian community via phone and online consultations. Whether you are in the San Francisco Bay Area, Los Angeles, San Diego, or anywhere in California — Dr. Gurudeva is just a phone call away. Call 732-448-0667, available 9 AM–9 PM EST, 7 days a week.',
    cities:      ['San Jose', 'Fremont', 'Milpitas', 'Santa Clara', 'Sunnyvale', 'Cupertino', 'Los Altos', 'Union City', 'Newark', 'Hayward', 'Oakland', 'San Francisco', 'Los Angeles', 'San Diego', 'Sacramento'],
    faqs: [
      { q: 'Can I get an in-person consultation in California?', a: 'Dr. Gurudeva is based in New Jersey. California clients are served via phone and online consultations.' },
      { q: 'What time zone should I use when calling?', a: 'Dr. Gurudeva is available 9 AM–9 PM EST. For California (PST), that is 6 AM–6 PM Pacific time.' },
    ],
  },
];

export function getLocationBySlug(slug) {
  return LOCATIONS.find((l) => l.slug === slug) || null;
}
