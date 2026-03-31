-- ─────────────────────────────────────────────────────────
--  services.sql
--  Master list of astrology services offered
-- ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS services (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  tagline      TEXT,
  short_desc   TEXT,
  icon         TEXT,
  category     TEXT,
  price        TEXT,
  popular      BOOLEAN DEFAULT FALSE,
  active       BOOLEAN DEFAULT TRUE,
  sort_order   INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Anyone can read services (public catalogue)
CREATE POLICY "Public read"
  ON services FOR SELECT TO anon, authenticated
  USING (active = TRUE);

-- Only admin can insert/update
CREATE POLICY "Authenticated write"
  ON services FOR ALL TO authenticated
  USING (true);

-- ── Seed Data ─────────────────────────────────────────────
INSERT INTO services (slug, title, tagline, short_desc, icon, category, price, popular, sort_order) VALUES
  ('horoscope-reading',         'Get Your Horoscope',              'Your lifetime predictions based on Vedic astrology',            'Horoscope analyzed based on Indian Vedic astrology. Free 50-page report included.',                         'Star',       'Core Astrology',    '$21',  TRUE,  1),
  ('online-consultation',       'Online Consultation',             'Detailed written analysis sent within 24–48 hours',             'Full written horoscope reading delivered by email within 24–48 hours.',                                    'Globe',      'Core Astrology',    '$21',  FALSE, 2),
  ('career-astrology',          'Career Analysis',                 'Find the career path your horoscope supports',                  'Vedic career analysis including best-fit fields and favorable periods.',                                    'Briefcase',  'Life Areas',        '$21',  FALSE, 3),
  ('marriage-compatibility',    'Horoscope / Kundli Matching',     '36-point horoscope compatibility analysis',                     'Detailed Vedic kundli matching for marriage compatibility.',                                                'Heart',      'Life Areas',        '$21',  FALSE, 4),
  ('muhurtham',                 'Muhurthams / Lagnas',             'Auspicious timing for life's biggest moments',                  'Muhurtham calculation for weddings, housewarming, business launch and more.',                              'Calendar',   'Timing',            '$21',  FALSE, 5),
  ('lucky-gem-report',          'Find Your Lucky Gem',             'Your ideal gemstone from your birth chart',                     'Chart-based prescription of your most beneficial Vedic gemstone.',                                        'Gem',        'Gemstones',         '$21',  FALSE, 6),
  ('business-astrology',        'Business & Partnership',          'Planetary guidance for your enterprise',                        'Business name analysis, partnership compatibility and launch timing.',                                      'Building2',  'Life Areas',        '$21',  FALSE, 7),
  ('child-health-guidance',     'Family, Child & Health',          'Vedic guidance for family wellbeing and health',                'Health astrology, children's charts, and family planetary analysis.',                                      'Activity',   'Life Areas',        '$21',  FALSE, 8),
  ('travel-abroad-astrology',   'Travel & Abroad',                 'Is foreign settlement or travel favored in your chart?',        'Analysis of foreign travel, immigration and settlement prospects.',                                       'Plane',      'Life Areas',        '$21',  FALSE, 9),
  ('numerology',                'Numerology',                      'The power of numbers in your birth date and name',              'Vedic numerology analysis of your birth number and name number.',                                         'Hash',       'Speciality',        '$21',  FALSE, 10),
  ('ask-a-question',            'Ask a Question',                  'One specific question answered in depth',                       'One focused question answered with chart analysis and remedy guidance.',                                   'HelpCircle', 'Speciality',        '$11',  FALSE, 11),
  ('birth-time-correction',     'Birth Time Correction',           'Rectify your birth time using life events',                     'Accurate birth time rectification using key life events and Vedic techniques.',                            'Clock',      'Speciality',        '$21',  FALSE, 12);
