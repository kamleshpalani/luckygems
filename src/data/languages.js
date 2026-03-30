/**
 * Language-based SEO landing page data.
 */

export const LANGUAGES = [
  {
    slug:        'tamil-astrologer-usa',
    title:       'Tamil Astrologer in the USA',
    metaTitle:   'Tamil Astrologer in USA | Dr. Gurudeva – Vedic Jothidam Consultations',
    metaDesc:    'Consult Dr. Gurudeva, an experienced Tamil Vedic astrologer in the USA. Jothidam consultations in Tamil for the Tamil diaspora across America.',
    heroHeading: 'Tamil Jothidam Consultations in the USA',
    heroSub:     'Dr. Gurudeva offers authentic Vedic astrology (Jothidam) consultations in Tamil for the Tamil community in the United States.',
    language:    'Tamil',
    languageNote: 'Dr. Gurudeva conducts consultations in fluent Tamil — covering all aspects of Vedic Jothidam including horoscope reading, marriage matching, Muhurtham and gemstone guidance.',
    faqs: [
      { q: 'Are consultations conducted in Tamil?', a: 'Yes — Dr. Gurudeva is fluent in Tamil and conducts full consultations in Tamil on request.' },
      { q: 'Do you follow South Indian horoscope format?', a: 'Yes — South Indian (square) format charts are prepared and discussed.' },
    ],
  },
  {
    slug:        'telugu-astrologer-usa',
    title:       'Telugu Astrologer in the USA',
    metaTitle:   'Telugu Astrologer in USA | Dr. Gurudeva – Vedic Jyotishyam Consultations',
    metaDesc:    'Consult Dr. Gurudeva, a trusted Telugu Vedic astrologer in the USA. Jyotishyam consultations in Telugu for the Telugu diaspora across America.',
    heroHeading: 'Telugu Jyotishyam Consultations in the USA',
    heroSub:     'Dr. Gurudeva offers Vedic astrology consultations in Telugu for the Telugu community in the United States.',
    language:    'Telugu',
    languageNote: 'Dr. Gurudeva provides comprehensive Vedic astrology consultations in Telugu, including horoscope analysis, marriage compatibility (Jathaka Porutham), Muhurtham and gemstone guidance.',
    faqs: [
      { q: 'Are consultations conducted in Telugu?', a: 'Yes — Dr. Gurudeva conducts full consultations in Telugu on request.' },
      { q: 'Do you serve the Hyderabad Telugu community in the USA?', a: 'Yes — we serve Telugu clients from all regions including Andhra and Telangana backgrounds.' },
    ],
  },
  {
    slug:        'south-indian-astrology',
    title:       'South Indian Vedic Astrology in the USA',
    metaTitle:   'South Indian Astrologer in USA | Dr. Gurudeva – Vedic Consultations',
    metaDesc:    'Dr. Gurudeva is a South Indian Vedic astrologer serving clients in Tamil, Telugu, Kannada, Malayalam and English. Authentic South Indian astrology in the USA.',
    heroHeading: 'South Indian Vedic Astrology in the USA',
    heroSub:     'Authentic South Indian Vedic astrology tradition — serving the Tamil, Telugu, Kannada and Malayalam communities across the United States.',
    language:    'South Indian',
    languageNote: 'Dr. Gurudeva is deeply trained in the South Indian tradition of Vedic astrology, including Parashara and Jaimini systems widely practiced in Tamil Nadu, Andhra Pradesh, Karnataka and Kerala. Consultations are available in Tamil, Telugu, Kannada, Malayalam and English.',
    faqs: [
      { q: 'Which South Indian languages does Dr. Gurudeva speak?', a: 'Tamil, Telugu, Kannada, Malayalam, Hindi and English.' },
      { q: 'Do you use the South Indian (square chart) format?', a: 'Yes — South Indian format charts are available on request.' },
    ],
  },
];

export function getLanguageBySlug(slug) {
  return LANGUAGES.find((l) => l.slug === slug) || null;
}
