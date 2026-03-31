-- ─────────────────────────────────────────────────────────
--  remedies.sql
--  Vedic remedy types and pooja/homa pricing
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

CREATE POLICY "Public read remedies"  ON remedies FOR SELECT TO anon, authenticated USING (active = TRUE);
CREATE POLICY "Authenticated write remedies" ON remedies FOR ALL TO authenticated USING (true);
CREATE POLICY "Public read poojas"   ON poojas  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated write poojas"   ON poojas  FOR ALL TO authenticated USING (true);

-- ── Seed: Remedies ────────────────────────────────────────
INSERT INTO remedies (slug, title, tagline, short_desc, icon, category, sort_order) VALUES
  ('poojas-homas',       'Poojas & Homas',       'Sacred rituals performed at Gurudeva''s Ashram in India',           'Vedic poojas and homas individually prescribed for your doshas and performed at the ashram temple.',    'Flame',   'Rituals',        1),
  ('doshas-yogas',       'Doshas & Yogas',        'Identify and address planetary afflictions in your chart',          'Analysis and remedies for doshas like Manglik, Kaal Sarpa, Pitru Dosha and negative yogas.',           'Layers',  'Analysis',       2),
  ('manglik-dosha',      'Manglik Dosha',         'Understanding and remedying Kuja/Chevvai Dosham',                   'Manglik dosha (Kuja Dosham) assessment and prescribed remedies for marriage compatibility.',            'Mars',    'Doshas',         3),
  ('kaal-sarpa-dosha',   'Kaal Sarpa Dosha',      'All planets between Rahu and Ketu — effects and remedies',         'Analysis of Kaal Sarpa Dosha with graded effects and appropriate Rahu-Ketu remedies.',                 'Snake',   'Doshas',         4),
  ('sarpa-dosha',        'Sarpa Dosha',           'Naga Dosha — causes, effects and temple remedies',                  'Sarpa / Naga Dosha assessment from chart and prescribing snake god poojas or Nagpanchami rituals.',    'Snake2',  'Doshas',         5),
  ('sade-sati',          'Sade Sati',             '7½ year Saturn transit — preparation and remedies',                 'Sade Sati (Saturn over natal Moon) analysis with period-specific remedies and guidance.',              'Saturn',  'Transits',       6),
  ('viyog-dosha',        'Viyog Dosha',           'Separation and loss in relationships — causes and cures',           'Viyog Dosha analysis for relationship separation patterns and corrective remedies.',                   'Unlink',  'Doshas',         7),
  ('black-magic-removal','Black Magic Removal',   'Protection from negative energies and occult interference',         'Identifying and removing black magic, evil eye and spiritual interference through Vedic methods.',      'Shield',  'Protection',     8),
  ('spiritual-healing',  'Spiritual Healing',     'Holistic healing through Vedic mantras, yantras and remedies',      'Combining planetary remedies, mantras and energy clearing for holistic wellbeing.',                    'Sparkles','Healing',        9),
  ('yantras',            'Yantras',               'Sacred geometric instruments to attract planetary blessings',       'Energized yantras prescribed for specific planets to enhance favorable energies.',                     'Grid',    'Tools',         10),
  ('vastu',              'Vastu Shastra',         'Align your space with Vedic principles for harmony and prosperity', 'Vastu analysis for homes and offices to remove negative energy blocks and enhance prosperity.',        'Home',    'Environment',   11);

-- ── Seed: Poojas (under poojas-homas) ─────────────────────
INSERT INTO poojas (remedy_slug, title, price, description, requires, day_timing, sort_order) VALUES
  ('poojas-homas', 'Sani Dosha Nivarana Pooja',                          '$151', 'For those suffering from Sade Sati, Astama Sani, Panchama Sani or Sani Maha Dasa negative effects. Performed at Navagraha temple every Saturday.', 'Name, Rashi, Nakshatra, Gothram, scanned photograph',                         'Saturdays only — Navagraha temple',    1),
  ('poojas-homas', 'Rahu Ketu Sarpa Dosha Pooja',                        '$151', 'For Sarpa Dosham, Naga Dosham or Kala Sarpa Dosham. Conducted only during Rahu Kaalam. Scanned photographs required.', 'Name, Rashi, Nakshatra, Gothram (or DOB/time/place), scanned photograph', 'Rahu Kalam days — Navagraha temple',   2),
  ('poojas-homas', 'Manglik Dosha Nivaran Pooja',                        '$251', 'Person is married to a banana tree; tree is cremated to divert Manglik dosha. Physical presence or photograph required.', 'Physical presence OR scanned photograph — contact prior to booking',           'Special scheduling — contact to confirm', 3),
  ('poojas-homas', 'Navagraha Santhi Pooja',                             '$151', 'For those suffering bad effects of more than one planet. Beneficial even when date of birth is unknown.', 'Name, Gothram, family members'' names, scanned photograph',                     'Navagraha temple — Gurudeva''s Ashram',4),
  ('poojas-homas', 'Maha Mruthyunjaya Homam & Japam',                    '$501', 'For severe/chronic/incurable diseases and those with short lifespan in horoscope. Also for hospitalised individuals.', 'Date, place and time of birth, scanned photograph',                             'Gurudeva''s ashram — special scheduling', 5),
  ('poojas-homas', 'Graha Santhi and Japam',                             '$101', 'For malefic effects of one specific planet (Jupiter, Mercury, Venus, Moon, Mars or Sun). Performed on the day of that planet.', 'Date, time and place of birth, Gothram, scanned photograph',                   'Day of the afflicted planet',          6),
  ('poojas-homas', 'Sani Vishesa Pooja, Thailabhisekham & Homa Japam',  '$501', 'Comprehensive Saturn remedy. Includes Thailabhisekham — oil abhishekam on Sani idol — and full homa japam.', 'Date, time and place of birth, Gothram, scanned photograph',                   'Saturdays — Navagraha temple',         7),
  ('poojas-homas', 'Rahu Ketu Sarpa Pooja, Abhisekam & Homa Japam',    '$501', 'Comprehensive Rahu-Ketu remedy. Full pooja, abhisekam and homa japam performed together.', 'Date, time and place of birth, Gothram, scanned photograph',                   'Rahu Kalam — Gurudeva''s ashram',      8);
