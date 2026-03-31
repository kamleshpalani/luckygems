-- ─────────────────────────────────────────────────────────
--  faq.sql
--  Frequently Asked Questions grouped by category
-- ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS faq_categories (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       TEXT UNIQUE NOT NULL,
  icon       TEXT,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faq_items (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category_id  BIGINT REFERENCES faq_categories(id) ON DELETE CASCADE,
  question     TEXT NOT NULL,
  answer       TEXT NOT NULL,
  featured     BOOLEAN DEFAULT FALSE,   -- shown on homepage
  active       BOOLEAN DEFAULT TRUE,
  sort_order   INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items      ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories" ON faq_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read items"      ON faq_items      FOR SELECT TO anon, authenticated USING (active = TRUE);
CREATE POLICY "Auth write categories"  ON faq_categories FOR ALL    TO authenticated USING (true);
CREATE POLICY "Auth write items"       ON faq_items      FOR ALL    TO authenticated USING (true);

-- ── Seed: Categories ──────────────────────────────────────
INSERT INTO faq_categories (name, icon, sort_order) VALUES
  ('Consultations',    'MessageCircle', 1),
  ('Pricing & Payment','DollarSign',    2),
  ('Birth Details',    'Clock',         3),
  ('Gemstones',        'Gem',           4),
  ('Appointment Process','CalendarDays',5);

-- ── Seed: FAQ Items ───────────────────────────────────────
-- Consultations (category 1)
INSERT INTO faq_items (category_id, question, answer, featured, sort_order) VALUES
  (1, 'Is it free to consult Dr. Gurudeva by phone?',
      'Yes — direct phone consultation is free for the first time, but not for all queries. It depends on your case. Usually personal horoscope readings are free for 2–3 specific questions. Call 732-448-0667 (USA) or 020-8144-6490 (UK), 9 AM–9 PM EST, 7 days a week.',
      TRUE, 1),
  (1, 'What is the consultation fee if I am not eligible for a free consultation?',
      'Over phone, subsequent consultations are $31. In-person face-to-face consultations are $31 only.',
      TRUE, 2),
  (1, 'I took free consultation the first time. Do I need to pay for a second consultation?',
      'Yes, you need to pay $31 for the second consultation. In-person face-to-face consultations are always $31.',
      TRUE, 3),
  (1, 'What is the best time to call Dr. Gurudeva?',
      '9 AM to 9 PM EST, USA timings — 7 days a week. UK clients should follow the same timings. If nobody answers, leave your name, phone number and a brief message — Dr. Gurudeva will call back.',
      TRUE, 4),
  (1, 'What information do I need to provide?',
      'Your full name, date of birth, place of birth, and birth time (as accurate as possible). For marriage compatibility, provide this for both partners.',
      TRUE, 5),
  (1, 'Can I consult online from outside the USA?',
      'Yes — Dr. Gurudeva serves clients globally via phone. UK phone: 020-8144-6490. Email: doctor_deva@yahoo.com.',
      FALSE, 6),
  (1, 'Are consultations available in languages other than English?',
      'Yes — Dr. Gurudeva consults in Telugu, Tamil, Kannada, Malayalam, Hindi and English.',
      FALSE, 7),
  (1, 'Will I get remedies along with my question answer?',
      'Yes — remedies are included with the answer to your question. You can contact Dr. Gurudeva directly to proceed with those remedies.',
      FALSE, 8);

-- Pricing & Payment (category 2)
INSERT INTO faq_items (category_id, question, answer, featured, sort_order) VALUES
  (2, 'What does an email / online service cost?',
      'All standard online services (Get Your Horoscope, Career Analysis, Kundli Matching, Health Report etc.) are $21 each. Vivaha Muhurtham is $51; all other muhurthams are $21.',
      FALSE, 1),
  (2, 'How fast will I get a reply for my online query?',
      'Usually within 48 hours we send you a reply by email.',
      FALSE, 2),
  (2, 'What payment methods are accepted?',
      'Zelle, PayPal (Friends & Family), Venmo, Google Pay and Cash App. For international payments, contact Dr. Gurudeva directly for bank transfer details.',
      FALSE, 3),
  (2, 'Is there a discount for multiple services ordered together?',
      'Please contact Dr. Gurudeva directly at 732-448-0667 to discuss bundled services.',
      FALSE, 4);

-- Birth Details (category 3)
INSERT INTO faq_items (category_id, question, answer, featured, sort_order) VALUES
  (3, 'What if I don''t know my exact birth time?',
      'Provide your best estimate. Dr. Gurudeva can perform Birth Time Rectification using key life events if you need an accurate time.',
      FALSE, 1),
  (3, 'Why is the birth time so important?',
      'The Ascendant (Lagna) changes approximately every 2 hours. An error in birth time can shift the entire house system and lead to inaccurate predictions.',
      FALSE, 2),
  (3, 'Can I get a reading for my newborn baby?',
      'Yes — Dr. Gurudeva offers a special Newborn Baby Report for babies 3 years and below.',
      FALSE, 3);

-- Gemstones (category 4)
INSERT INTO faq_items (category_id, question, answer, featured, sort_order) VALUES
  (4, 'Do I need a chart analysis before wearing a gemstone?',
      'Yes — absolutely. Wearing the wrong gemstone can strengthen malefic planets. Dr. Gurudeva analyzes your full birth chart before recommending any gemstone.',
      FALSE, 1),
  (4, 'Can I wear multiple gemstones at once?',
      'Only if the planets involved are friendly to each other. Conflicting combinations (e.g. Ruby + Blue Sapphire) must be avoided. Get a full chart analysis first.',
      FALSE, 2),
  (4, 'Where can I buy the prescribed gemstone?',
      'Dr. Gurudeva can recommend trusted sources. Certified natural gemstones are essential — synthetic or treated stones have no astrological effect.',
      FALSE, 3);

-- Appointment Process (category 5)
INSERT INTO faq_items (category_id, question, answer, featured, sort_order) VALUES
  (5, 'How do I book an online service?',
      'Visit the Inquiry page, select your service, provide your birth details and submit. You will receive a confirmation and reply within 24–48 hours.',
      FALSE, 1),
  (5, 'How do I book a phone or in-person consultation?',
      'Call 732-448-0667 directly between 9 AM–9 PM EST, 7 days a week. For in-person (Highland Park, NJ), call to schedule.',
      FALSE, 2),
  (5, 'What happens after I submit my online inquiry?',
      'Dr. Gurudeva personally reviews your details. You will receive a detailed written analysis by email within 24–48 hours along with prescribed remedies.',
      FALSE, 3);
