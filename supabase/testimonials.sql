-- ─────────────────────────────────────────────────────────
--  testimonials.sql
--  Client testimonial reviews shown on the website
-- ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS testimonials (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        TEXT NOT NULL,
  location    TEXT,
  service     TEXT,
  rating      INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  avatar      TEXT,           -- initials e.g. 'PS'
  featured    BOOLEAN DEFAULT FALSE,
  approved    BOOLEAN DEFAULT TRUE,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read approved"
  ON testimonials FOR SELECT TO anon, authenticated
  USING (approved = TRUE);

CREATE POLICY "Authenticated write"
  ON testimonials FOR ALL TO authenticated
  USING (true);

-- ── Seed Data ─────────────────────────────────────────────
INSERT INTO testimonials (name, location, service, rating, review_text, avatar, featured, sort_order) VALUES
  ('Priya S.',   'San Jose, CA',     'Horoscope Reading',          5, 'Dr. Gurudeva''s reading was incredibly accurate. He described situations in my life that he couldn''t have known without truly reading the chart. His gemstone recommendation has made a noticeable difference. Highly recommend.',                                                                TRUE, 1),
  ('Rajesh K.',  'Fremont, CA',      'Career & Business Astrology',5, 'I was at a complete crossroads — two job offers and a business idea. Dr. Gurudeva''s analysis was spot-on. He told me exactly which direction was supported by my chart and why. Six months later, I can confirm he was right.',                                                               TRUE, 2),
  ('Ananya M.',  'New York, NY',     'Marriage Compatibility',     5, 'We were nervous about the Manglik concern flagged by another astrologer. Dr. Gurudeva reviewed both charts carefully and reassured us with a thorough explanation. We are now happily married. Thank you!',                                                                                        TRUE, 3),
  ('Suresh N.',  'Houston, TX',      'Muhurtham',                  5, 'We used Dr. Gurudeva for our house purchase Muhurtham and our son''s business launch timing. Both have been tremendously positive. His knowledge of Panchanga is very thorough.',                                                                                                                 TRUE, 4),
  ('Meena R.',   'London, UK',       'Gemstone Guidance',          5, 'I had been wearing a gemstone recommended by someone else for years with no benefit. Dr. Gurudeva reviewed my chart and suggested a completely different stone. The results within a month were remarkable.',                                                                                      TRUE, 5),
  ('Vikram P.',  'Toronto, Canada',  'Online Consultation',        5, 'Being in Canada, the online video consultation was very convenient. Dr. Gurudeva is punctual, patient and thorough. He took time to explain everything clearly and answered all my questions. I will definitely consult again.',                                                                    TRUE, 6),
  ('Deepa V.',   'Chicago, IL',      'Sade Sati',                  5, 'I was going through the worst period of my life — job loss, health issues, family disputes. Dr. Gurudeva identified Sade Sati and prescribed Saturn remedies. Within 3 months things began improving. His guidance was a lifeline.',                                                             FALSE,7),
  ('Ramesh G.',  'Dallas, TX',       'Kaal Sarpa Dosha',           5, 'Dr. Gurudeva identified Kaal Sarpa Dosha in my chart and explained exactly how it was manifesting in my life. His prescribed Rahu-Ketu pooja and remedies brought visible change. Very grateful.',                                                                                               FALSE,8);
