-- ═════════════════════════════════════════════════════════
--  MASTER SETUP — Gurudev Astrology Supabase Database
--  Run this file in: Supabase → SQL Editor → Run
--
--  This creates ALL tables in the correct order.
--  Safe to re-run on a database that already has some tables.
-- ═════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────
--  1. INQUIRIES (from /inquiry form)
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
  id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  service          TEXT,
  service_title    TEXT,
  full_name        TEXT,
  dob              DATE,
  time_of_birth    TEXT,
  place_of_birth   TEXT,
  present_location TEXT,
  status           TEXT DEFAULT 'new'  -- new | in_progress | completed
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "inquiries_public_insert" ON inquiries;
CREATE POLICY "inquiries_public_insert"
  ON inquiries FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "inquiries_auth_read" ON inquiries;
CREATE POLICY "inquiries_auth_read"
  ON inquiries FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "inquiries_auth_update" ON inquiries;
CREATE POLICY "inquiries_auth_update"
  ON inquiries FOR UPDATE TO authenticated USING (true);


-- ─────────────────────────────────────────────────────────
--  2. CONTACT MESSAGES (from /contact form)
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  service    TEXT,
  message    TEXT NOT NULL,
  status     TEXT DEFAULT 'new'   -- new | read | replied
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contact_public_insert" ON contact_messages;
CREATE POLICY "contact_public_insert"
  ON contact_messages FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "contact_auth_read" ON contact_messages;
CREATE POLICY "contact_auth_read"
  ON contact_messages FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "contact_auth_update" ON contact_messages;
CREATE POLICY "contact_auth_update"
  ON contact_messages FOR UPDATE TO authenticated USING (true);


-- ─────────────────────────────────────────────────────────
--  3. SERVICES
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  tagline     TEXT,
  short_desc  TEXT,
  icon        TEXT,
  category    TEXT,
  price       TEXT,
  popular     BOOLEAN DEFAULT FALSE,
  active      BOOLEAN DEFAULT TRUE,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "services_public_read" ON services;
CREATE POLICY "services_public_read"   ON services FOR SELECT TO anon, authenticated USING (active = TRUE);
DROP POLICY IF EXISTS "services_auth_write" ON services;
CREATE POLICY "services_auth_write"    ON services FOR ALL    TO authenticated USING (true);

INSERT INTO services (slug, title, tagline, icon, category, price, popular, sort_order) VALUES
  ('horoscope-reading',       'Get Your Horoscope',          'Lifetime predictions based on Vedic astrology',               'Star',       'Core Astrology', '$21',  TRUE,  1),
  ('online-consultation',     'Online Consultation',         'Detailed written analysis sent within 24–48 hours',           'Globe',      'Core Astrology', '$21',  FALSE, 2),
  ('career-astrology',        'Career Analysis',             'Find the career path your horoscope supports',                'Briefcase',  'Life Areas',     '$21',  FALSE, 3),
  ('marriage-compatibility',  'Kundli Matching',             '36-point horoscope compatibility analysis',                   'Heart',      'Life Areas',     '$21',  FALSE, 4),
  ('muhurtham',               'Muhurthams / Lagnas',         'Auspicious timing for life''s biggest moments',              'Calendar',   'Timing',         '$21',  FALSE, 5),
  ('lucky-gem-report',        'Find Your Lucky Gem',         'Your ideal gemstone from your birth chart',                   'Gem',        'Gemstones',      '$21',  FALSE, 6),
  ('business-astrology',      'Business & Partnership',      'Planetary guidance for your enterprise',                      'Building2',  'Life Areas',     '$21',  FALSE, 7),
  ('child-health-guidance',   'Family, Child & Health',      'Vedic guidance for family wellbeing and health',              'Activity',   'Life Areas',     '$21',  FALSE, 8),
  ('travel-abroad-astrology', 'Travel & Abroad',             'Is foreign settlement or travel favored in your chart?',      'Plane',      'Life Areas',     '$21',  FALSE, 9),
  ('numerology',              'Numerology',                  'The power of numbers in your birth date and name',            'Hash',       'Speciality',     '$21',  FALSE, 10),
  ('ask-a-question',          'Ask a Question',              'One focused question answered in depth',                      'HelpCircle', 'Speciality',     '$11',  FALSE, 11),
  ('birth-time-correction',   'Birth Time Correction',       'Rectify your birth time using life events',                   'Clock',      'Speciality',     '$21',  FALSE, 12)
ON CONFLICT (slug) DO NOTHING;


-- ─────────────────────────────────────────────────────────
--  4. GEMSTONES
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gemstones (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  sanskrit_name TEXT,
  planet        TEXT,
  color_hex     TEXT,
  color_name    TEXT,
  short_desc    TEXT,
  benefits      TEXT[],
  caution       TEXT,
  min_weight    TEXT,
  metal         TEXT,
  finger        TEXT,
  day_to_wear   TEXT,
  mantra        TEXT,
  price_range   TEXT,
  active        BOOLEAN DEFAULT TRUE,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gemstones ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gemstones_public_read" ON gemstones;
CREATE POLICY "gemstones_public_read"  ON gemstones FOR SELECT TO anon, authenticated USING (active = TRUE);
DROP POLICY IF EXISTS "gemstones_auth_write" ON gemstones;
CREATE POLICY "gemstones_auth_write"   ON gemstones FOR ALL    TO authenticated USING (true);

INSERT INTO gemstones (slug, name, sanskrit_name, planet, color_hex, color_name, short_desc, benefits, caution, min_weight, metal, finger, day_to_wear, mantra, price_range, sort_order) VALUES
  ('ruby',           'Ruby',           'Manikya',  'Sun',     '#E63946', 'Red',           'Enhances leadership, vitality, confidence and career success.',        ARRAY['Strengthens willpower and self-confidence','Supports career and authority','Enhances vitality and health','Improves father-son relationships'],        'Only wear if Sun is a functional benefic in your chart.',           '3–5 Ratti',  'Gold',              'Ring finger, right hand',   'Sunday, morning',    'Om Suryaya Namah',   '$$–$$$', 1),
  ('pearl',          'Pearl',          'Moti',     'Moon',    '#F0EAD6', 'White / Cream', 'Promotes emotional balance, mental peace and intuitive clarity.',      ARRAY['Calms the mind and reduces anxiety','Improves emotional intelligence','Enhances relationships and empathy','Supports health and sleep'],             'Natural saltwater pearls only; freshwater has lesser potency.',     '5–7 Ratti',  'Silver',            'Little finger, right hand', 'Monday, morning',    'Om Chandraya Namah', '$–$$',   2),
  ('red-coral',      'Red Coral',      'Moonga',   'Mars',    '#FF6B35', 'Orange-Red',    'Builds courage, physical strength and removes Manglik dosha effects.', ARRAY['Boosts energy and physical stamina','Improves courage and decisiveness','Helps with Manglik dosha','Supports blood-related health'],                 'Avoid for aggressive temperament or certain chart configurations.', '5–7 Ratti',  'Gold or copper',    'Ring finger, right hand',   'Tuesday, morning',   'Om Mangalaya Namah', '$–$$',   3),
  ('emerald',        'Emerald',        'Panna',    'Mercury', '#2D6A4F', 'Green',         'Enhances intellect, communication, business acumen and wit.',          ARRAY['Improves communication and speech','Supports business and trade','Enhances memory and learning','Helps with skin and nervous system'],                'Do not wear with Pearl or Red Coral.',                              '3–5 Ratti',  'Gold or silver',    'Little finger, right hand', 'Wednesday, morning', 'Om Budhaya Namah',   '$$–$$$', 4),
  ('yellow-sapphire','Yellow Sapphire','Pukhraj',  'Jupiter', '#FFD700', 'Yellow / Gold', 'Brings wisdom, prosperity, spiritual growth and marital harmony.',     ARRAY['Brings prosperity and wealth','Supports marriage and relationships','Enhances wisdom and spirituality','Beneficial for Guru Dasha periods'],          'Avoid with Diamond or Blue Sapphire unless chart supports it.',     '3–5 Ratti',  'Gold',              'Index finger, right hand',  'Thursday, morning',  'Om Gurave Namah',    '$$$',    5),
  ('diamond',        'Diamond',        'Heera',    'Venus',   '#B9F2FF', 'White / Clear', 'Brings luxury, love, artistic talent, marital happiness and beauty.',  ARRAY['Enhances beauty and artistic talent','Supports marriage and love','Brings luxury and comfort','Beneficial during Venus Dasha'],                      'Never wear with Ruby without chart analysis.',                      '0.5–1 Carat','Platinum or gold',  'Middle or ring finger',     'Friday, morning',    'Om Shukraya Namah',  '$$$$',   6),
  ('blue-sapphire',  'Blue Sapphire',  'Neelam',   'Saturn',  '#1B4F72', 'Blue',          'One of the most powerful stones for discipline, career and karma.',    ARRAY['Rapid results for career and finances','Provides discipline and focus','Removes delays and obstacles','Powerful during Sade Sati if prescribed'], 'Test for 3 days before committing — most powerful and unpredictable.','3–5 Ratti', 'Gold or silver',    'Middle finger, right hand', 'Saturday, morning',  'Om Shanaye Namah',   '$$$–$$$$',7),
  ('hessonite',      'Hessonite',      'Gomed',    'Rahu',    '#CC8800', 'Honey / Brown', 'Removes confusion, fear, addictions and Rahu Mahadasha effects.',      ARRAY['Removes Rahu Dasha malefic effects','Reduces confusion and anxiety','Helps with career obstacles','Beneficial for unconventional careers'],          'Only wear after thorough chart analysis — Rahu is unpredictable.',  '5–8 Ratti',  'Panchdhatu / silver','Middle or ring finger',     'Saturday, evening',  'Om Rahave Namah',    '$–$$',   8),
  ('cats-eye',       'Cat''s Eye',     'Lehsunia', 'Ketu',    '#A8B400', 'Yellowish-Green','Provides spiritual insight, protection and removes Ketu Dasha effects.',ARRAY['Protects from evil eye','Provides spiritual insight','Removes Ketu Dasha effects','Beneficial for moksha and liberation'],                        'Sudden effects possible — careful chart analysis required first.',  '3–5 Ratti',  'Panchdhatu',        'Middle or ring finger',     'Thursday, evening',  'Om Ketave Namah',    '$–$$',   9)
ON CONFLICT (slug) DO NOTHING;


-- ─────────────────────────────────────────────────────────
--  5. REMEDIES & POOJAS
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS remedies (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  tagline     TEXT,
  short_desc  TEXT,
  icon        TEXT,
  category    TEXT,
  active      BOOLEAN DEFAULT TRUE,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS poojas (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  remedy_slug TEXT REFERENCES remedies(slug) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  price       TEXT,
  description TEXT,
  requires    TEXT,
  day_timing  TEXT,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE remedies ENABLE ROW LEVEL SECURITY;
ALTER TABLE poojas   ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "remedies_public_read" ON remedies;
CREATE POLICY "remedies_public_read" ON remedies FOR SELECT TO anon, authenticated USING (active = TRUE);
DROP POLICY IF EXISTS "remedies_auth_write" ON remedies;
CREATE POLICY "remedies_auth_write"  ON remedies FOR ALL    TO authenticated USING (true);
DROP POLICY IF EXISTS "poojas_public_read" ON poojas;
CREATE POLICY "poojas_public_read"   ON poojas   FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "poojas_auth_write" ON poojas;
CREATE POLICY "poojas_auth_write"    ON poojas   FOR ALL    TO authenticated USING (true);

INSERT INTO remedies (slug, title, tagline, icon, category, sort_order) VALUES
  ('poojas-homas',       'Poojas & Homas',       'Sacred rituals at Gurudeva''s Ashram, India',              'Flame',   'Rituals',     1),
  ('doshas-yogas',       'Doshas & Yogas',        'Identify and address planetary afflictions',               'Layers',  'Analysis',    2),
  ('manglik-dosha',      'Manglik Dosha',         'Understanding and remedying Kuja/Chevvai Dosham',          'Mars',    'Doshas',      3),
  ('kaal-sarpa-dosha',   'Kaal Sarpa Dosha',      'All planets between Rahu and Ketu — effects and remedies', 'Snake',   'Doshas',      4),
  ('sarpa-dosha',        'Sarpa Dosha',           'Naga Dosha — causes, effects and temple remedies',         'Snake',   'Doshas',      5),
  ('sade-sati',          'Sade Sati',             '7½ year Saturn transit — preparation and remedies',        'Saturn',  'Transits',    6),
  ('viyog-dosha',        'Viyog Dosha',           'Separation in relationships — causes and cures',           'Unlink',  'Doshas',      7),
  ('black-magic-removal','Black Magic Removal',   'Protection from negative energies',                        'Shield',  'Protection',  8),
  ('spiritual-healing',  'Spiritual Healing',     'Holistic healing through Vedic mantras and yantras',       'Sparkles','Healing',     9),
  ('yantras',            'Yantras',               'Sacred geometric instruments for planetary blessings',     'Grid',    'Tools',      10),
  ('vastu',              'Vastu Shastra',         'Align your space with Vedic principles',                   'Home',    'Environment',11)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO poojas (remedy_slug, title, price, requires, day_timing, sort_order) VALUES
  ('poojas-homas', 'Sani Dosha Nivarana Pooja',                       '$151', 'Name, Rashi, Nakshatra, Gothram, scanned photograph',     'Saturdays — Navagraha temple',    1),
  ('poojas-homas', 'Rahu Ketu Sarpa Dosha Pooja',                     '$151', 'Name, Rashi, Nakshatra, Gothram (or DOB), photograph',    'Rahu Kalam — Navagraha temple',   2),
  ('poojas-homas', 'Manglik Dosha Nivaran Pooja',                     '$251', 'Physical presence OR scanned photograph',                 'Special scheduling — call first', 3),
  ('poojas-homas', 'Navagraha Santhi Pooja',                          '$151', 'Name, Gothram, family members'' names, photograph',       'Navagraha temple — ashram',       4),
  ('poojas-homas', 'Maha Mruthyunjaya Homam & Japam',                 '$501', 'Date, place and time of birth, scanned photograph',       'Ashram — special scheduling',     5),
  ('poojas-homas', 'Graha Santhi and Japam',                          '$101', 'Date, time and place of birth, Gothram, photograph',      'Day of the afflicted planet',     6),
  ('poojas-homas', 'Sani Vishesa Pooja, Thailabhisekham & Homa Japam','$501', 'Date, time and place of birth, Gothram, photograph',      'Saturdays — Navagraha temple',    7),
  ('poojas-homas', 'Rahu Ketu Sarpa Pooja, Abhisekam & Homa Japam',  '$501', 'Date, time and place of birth, Gothram, photograph',      'Rahu Kalam — Gurudeva''s ashram', 8)
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────────────────
--  6. TESTIMONIALS
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        TEXT NOT NULL,
  location    TEXT,
  service     TEXT,
  rating      INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  avatar      TEXT,
  featured    BOOLEAN DEFAULT FALSE,
  approved    BOOLEAN DEFAULT TRUE,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "testimonials_public_read" ON testimonials;
CREATE POLICY "testimonials_public_read" ON testimonials FOR SELECT TO anon, authenticated USING (approved = TRUE);
DROP POLICY IF EXISTS "testimonials_auth_write" ON testimonials;
CREATE POLICY "testimonials_auth_write"  ON testimonials FOR ALL    TO authenticated USING (true);

INSERT INTO testimonials (name, location, service, rating, review_text, avatar, featured, sort_order) VALUES
  ('Priya S.',  'San Jose, CA',    'Horoscope Reading',          5, 'Dr. Gurudeva''s reading was incredibly accurate. He described situations in my life that he couldn''t have known without truly reading the chart. His gemstone recommendation has made a noticeable difference.', 'PS', TRUE, 1),
  ('Rajesh K.', 'Fremont, CA',     'Career & Business Astrology',5, 'I was at a complete crossroads — two job offers and a business idea. Dr. Gurudeva''s analysis was spot-on. He told me exactly which direction was supported by my chart. Six months later, I can confirm he was right.', 'RK', TRUE, 2),
  ('Ananya M.', 'New York, NY',    'Marriage Compatibility',     5, 'We were nervous about the Manglik concern flagged by another astrologer. Dr. Gurudeva reviewed both charts carefully and reassured us. We are now happily married. Thank you!', 'AM', TRUE, 3),
  ('Suresh N.', 'Houston, TX',     'Muhurtham',                  5, 'We used Dr. Gurudeva for our house purchase Muhurtham and our son''s business launch timing. Both have been tremendously positive. His knowledge of Panchanga is very thorough.', 'SN', TRUE, 4),
  ('Meena R.',  'London, UK',      'Gemstone Guidance',          5, 'I had been wearing a gemstone from someone else for years with no benefit. Dr. Gurudeva reviewed my chart and suggested a completely different stone. The results within a month were remarkable.', 'MR', TRUE, 5),
  ('Vikram P.', 'Toronto, Canada', 'Online Consultation',        5, 'Being in Canada, the online video consultation was very convenient. Dr. Gurudeva is punctual, patient and thorough. He took time to explain everything clearly and answered all my questions.', 'VP', TRUE, 6),
  ('Deepa V.',  'Chicago, IL',     'Sade Sati',                  5, 'I was going through the worst period of my life — job loss, health issues, family disputes. Dr. Gurudeva identified Sade Sati and prescribed Saturn remedies. Within 3 months things began improving.', 'DV', FALSE,7),
  ('Ramesh G.', 'Dallas, TX',      'Kaal Sarpa Dosha',           5, 'Dr. Gurudeva identified Kaal Sarpa Dosha in my chart and explained exactly how it was manifesting in my life. His prescribed Rahu-Ketu pooja and remedies brought visible change.', 'RG', FALSE,8)
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────────────────
--  7. FAQ
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faq_categories (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       TEXT UNIQUE NOT NULL,
  icon       TEXT,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faq_items (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category_id BIGINT REFERENCES faq_categories(id) ON DELETE CASCADE,
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  featured    BOOLEAN DEFAULT FALSE,
  active      BOOLEAN DEFAULT TRUE,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items      ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "faq_cat_public_read" ON faq_categories;
CREATE POLICY "faq_cat_public_read"  ON faq_categories FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "faq_cat_auth_write" ON faq_categories;
CREATE POLICY "faq_cat_auth_write"   ON faq_categories FOR ALL    TO authenticated USING (true);
DROP POLICY IF EXISTS "faq_items_public_read" ON faq_items;
CREATE POLICY "faq_items_public_read"ON faq_items      FOR SELECT TO anon, authenticated USING (active = TRUE);
DROP POLICY IF EXISTS "faq_items_auth_write" ON faq_items;
CREATE POLICY "faq_items_auth_write" ON faq_items      FOR ALL    TO authenticated USING (true);

INSERT INTO faq_categories (name, icon, sort_order) VALUES
  ('Consultations',    'MessageCircle', 1),
  ('Pricing & Payment','DollarSign',    2),
  ('Birth Details',    'Clock',         3),
  ('Gemstones',        'Gem',           4),
  ('Appointment Process','CalendarDays',5)
ON CONFLICT (name) DO NOTHING;

INSERT INTO faq_items (category_id, question, answer, featured, sort_order) VALUES
  (1,'Is it free to consult Dr. Gurudeva by phone?','Yes — direct phone consultation is free for the first time. Call 732-448-0667 (USA) or 020-8144-6490 (UK), 9 AM–9 PM EST, 7 days a week.', TRUE, 1),
  (1,'What is the consultation fee for a second consultation?','Subsequent phone consultations are $31. In-person face-to-face consultations are always $31.', TRUE, 2),
  (1,'What is the best time to call Dr. Gurudeva?','9 AM to 9 PM EST, 7 days a week. If nobody answers, leave your name, number and brief message — Dr. Gurudeva will call back.', TRUE, 3),
  (1,'What information do I need to provide?','Your full name, date of birth, place of birth, and birth time (as accurate as possible). For marriage compatibility, provide this for both partners.', TRUE, 4),
  (1,'Are consultations available in languages other than English?','Yes — Telugu, Tamil, Kannada, Malayalam, Hindi and English.', FALSE, 5),
  (2,'What does an email / online service cost?','All standard online services are $21. Vivaha Muhurtham is $51. All other muhurthams are $21.', FALSE, 1),
  (2,'How fast will I get a reply?','Usually within 48 hours by email.', FALSE, 2),
  (2,'What payment methods are accepted?','Zelle, PayPal (Friends & Family), Venmo, Google Pay and Cash App.', FALSE, 3),
  (3,'What if I don''t know my exact birth time?','Provide your best estimate. Dr. Gurudeva can perform Birth Time Rectification using key life events.', FALSE, 1),
  (3,'Why is birth time so important?','The Ascendant changes every ~2 hours. An inaccurate birth time shifts the entire chart and affects prediction accuracy.', FALSE, 2),
  (4,'Do I need a chart analysis before wearing a gemstone?','Yes — absolutely. Wearing the wrong gemstone can strengthen malefic planets. Dr. Gurudeva analyzes your full chart first.', FALSE, 1),
  (4,'Can I wear multiple gemstones at once?','Only if the planetary rulers are friendly. Conflicting combinations must be avoided. Get a full chart analysis first.', FALSE, 2),
  (5,'How do I book an online service?','Go to the Inquiry page, select your service, provide birth details and submit. Reply within 24–48 hours.', FALSE, 1),
  (5,'How do I book a phone or in-person consultation?','Call 732-448-0667 between 9 AM–9 PM EST, 7 days a week.', FALSE, 2)
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────────────────
--  8. ARTICLES / BLOG
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS articles (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  category     TEXT,
  read_time    TEXT,
  publish_date DATE,
  featured     BOOLEAN DEFAULT FALSE,
  published    BOOLEAN DEFAULT TRUE,
  content      TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "articles_public_read" ON articles;
CREATE POLICY "articles_public_read" ON articles FOR SELECT TO anon, authenticated USING (published = TRUE);
DROP POLICY IF EXISTS "articles_auth_write" ON articles;
CREATE POLICY "articles_auth_write"  ON articles FOR ALL    TO authenticated USING (true);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS articles_updated_at ON articles;
CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

INSERT INTO articles (slug, title, excerpt, category, read_time, publish_date, featured) VALUES
  ('gem-conflictions',      'Gem Conflictions – Why Some Gemstones Should Never Be Worn Together','Not all gemstones are compatible. Learn which combinations to avoid.','Gemstones',      '6 min', '2024-11-10', TRUE),
  ('about-12-raasis',       'About the 12 Raasis – The 12 Zodiac Signs in Vedic Astrology',      'The 12 Raasis form the foundation of every Vedic horoscope.',       'Astrology Basics','8 min', '2024-10-15', TRUE),
  ('how-gems-affect-a-person','How Do Gems Affect a Person? The Metaphysics of Vedic Gemstone Therapy','Why certain stones are prescribed in Vedic astrology.',        'Gemstones',      '5 min', '2024-09-20', TRUE)
ON CONFLICT (slug) DO NOTHING;


-- ─────────────────────────────────────────────────────────
--  9. PRICING PLANS
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pricing_plans (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  plan_key    TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  price       TEXT NOT NULL,
  duration    TEXT,
  popular     BOOLEAN DEFAULT FALSE,
  description TEXT,
  includes    TEXT[],
  note        TEXT,
  cta_label   TEXT,
  active      BOOLEAN DEFAULT TRUE,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pricing_public_read" ON pricing_plans;
CREATE POLICY "pricing_public_read" ON pricing_plans FOR SELECT TO anon, authenticated USING (active = TRUE);
DROP POLICY IF EXISTS "pricing_auth_write" ON pricing_plans;
CREATE POLICY "pricing_auth_write"  ON pricing_plans FOR ALL    TO authenticated USING (true);

INSERT INTO pricing_plans (plan_key, name, price, duration, popular, description, includes, note, cta_label, sort_order) VALUES
  ('phone',    'Phone Consultation',    'Free', 'Free call',    FALSE, 'Free first-time phone consultation with Dr. Gurudeva. Call 732-448-0667.',
    ARRAY['Free call (first-time / specific questions)','Speak directly with Dr. Gurudeva','9 AM–9 PM EST, 7 days (USA)','UK line: 020-8144-6490'],
    'Subsequent detailed consultations are $31. In-person is $31.', 'Call Now', 1),
  ('online',   'Online / Email Service','$21',  'Per service',  TRUE,  'All standard online services delivered by email within 24–48 hours.',
    ARRAY['Complete email analysis within 24–48 hours','Free 50-page horoscope PDF','Personalized remedies included','Follow-up questions welcome'],
    'Applies to all standard services: Horoscope, Career, Kundli, Health, Baby Report, Manglik, Kaal Sarp, Sade Sati, etc.', 'Book Online Service', 2),
  ('inperson', 'In-Person Consultation','$31',  'Face-to-face', FALSE, 'Personal face-to-face session at Highland Park, NJ (near Edison Train Station).',
    ARRAY['Face-to-face personal meeting','Full horoscope analysis','Highland Park, NJ — near Edison Train Station','Flexible scheduling by appointment'],
    'Call 732-448-0667 to schedule.', 'Schedule In-Person', 3)
ON CONFLICT (plan_key) DO NOTHING;


-- ═════════════════════════════════════════════════════════
--  ✅ SETUP COMPLETE
--  Tables created: inquiries, contact_messages, services,
--  gemstones, remedies, poojas, testimonials, faq_categories,
--  faq_items, articles, pricing_plans
-- ═════════════════════════════════════════════════════════
