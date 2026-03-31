-- ─────────────────────────────────────────────────────────
--  gemstones.sql
--  Vedic gemstone catalogue with planetary associations
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
  benefits      TEXT[],          -- array of benefit strings
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

CREATE POLICY "Public read"
  ON gemstones FOR SELECT TO anon, authenticated
  USING (active = TRUE);

CREATE POLICY "Authenticated write"
  ON gemstones FOR ALL TO authenticated
  USING (true);

-- ── Seed Data ─────────────────────────────────────────────
INSERT INTO gemstones (slug, name, sanskrit_name, planet, color_hex, color_name, short_desc, benefits, caution, min_weight, metal, finger, day_to_wear, mantra, price_range, sort_order) VALUES
  ('ruby',           'Ruby',           'Manikya',   'Sun',     '#E63946', 'Red',          'Associated with the Sun — enhances leadership, vitality, confidence and career success.',       ARRAY['Strengthens willpower and self-confidence','Supports career and authority','Enhances vitality and health','Improves father-son relationships'],                 'Ruby should only be worn if Sun is a functional benefic in your specific chart.',                         '3–5 Ratti', 'Gold',            'Ring finger, right hand',   'Sunday, morning',   'Om Suryaya Namah',    '$$–$$$', 1),
  ('pearl',          'Pearl',          'Moti',      'Moon',    '#F0EAD6', 'White / Cream','Associated with the Moon — promotes emotional balance, mental peace and intuitive clarity.',   ARRAY['Calms the mind and reduces anxiety','Improves emotional intelligence','Enhances relationships and empathy','Supports health and sleep'],                          'Natural saltwater pearls are prescribed; freshwater pearls have lesser potency.',                         '5–7 Ratti', 'Silver',          'Little finger, right hand', 'Monday, morning',   'Om Chandraya Namah',  '$–$$',   2),
  ('red-coral',      'Red Coral',      'Moonga',    'Mars',    '#FF6B35', 'Orange-Red',   'Associated with Mars — builds courage, physical strength and removes Manglik dosha effects.',   ARRAY['Boosts energy and physical stamina','Improves courage and decisiveness','Helps with Manglik dosha','Supports blood-related health'],                              'Not recommended for those with aggressive temperament or certain chart configurations.',                   '5–7 Ratti', 'Gold or copper',  'Ring finger, right hand',   'Tuesday, morning',  'Om Mangalaya Namah',  '$–$$',   3),
  ('emerald',        'Emerald',        'Panna',     'Mercury', '#2D6A4F', 'Green',        'Associated with Mercury — enhances intellect, communication, business acumen and wit.',         ARRAY['Improves communication and speech','Supports business and trade','Enhances memory and learning','Helps with skin and nervous system'],                             'Emerald should not be worn with Pearl or Red Coral.',                                                    '3–5 Ratti', 'Gold or silver',  'Little finger, right hand', 'Wednesday, morning','Om Budhaya Namah',    '$$–$$$', 4),
  ('yellow-sapphire','Yellow Sapphire','Pukhraj',   'Jupiter', '#FFD700', 'Yellow / Gold','Associated with Jupiter — brings wisdom, prosperity, spiritual growth and marital harmony.',    ARRAY['Brings prosperity and wealth','Supports marriage and relationships','Enhances wisdom and spirituality','Beneficial for Guru Dasha periods'],                      'Avoid with Diamond or Blue Sapphire unless chart specifically supports it.',                              '3–5 Ratti', 'Gold',            'Index finger, right hand',  'Thursday, morning', 'Om Gurave Namah',     '$$$',    5),
  ('diamond',        'Diamond',        'Heera',     'Venus',   '#B9F2FF', 'White / Clear','Associated with Venus — brings luxury, love, artistic talent, marital happiness and beauty.',   ARRAY['Enhances beauty and artistic talent','Supports marriage and love','Brings luxury and comfort','Beneficial during Venus Dasha'],                                    'Never wear with Ruby (Sun) or Yellow Sapphire together without chart analysis.',                          '0.5–1 Carat','Platinum or white gold','Middle or ring finger','Friday, morning',  'Om Shukraya Namah',   '$$$$',   6),
  ('blue-sapphire',  'Blue Sapphire',  'Neelam',   'Saturn',  '#1B4F72', 'Blue',         'Associated with Saturn — one of the most powerful gemstones for discipline, career and karma.', ARRAY['Rapid results for career and finances','Provides discipline and focus','Removes delays and obstacles','Powerful during Sade Sati if prescribed'],                  'MUST be tested for 3 days before committing to wear — most powerful and unpredictable stone.',            '3–5 Ratti', 'Gold or silver',  'Middle finger, right hand', 'Saturday, morning', 'Om Shanaye Namah',    '$$$–$$$$',7),
  ('hessonite',      'Hessonite',      'Gomed',     'Rahu',    '#CC8800', 'Honey/Brown',  'Associated with Rahu — removes confusion, fear, addictions and Rahu Mahadasha negative effects.', ARRAY['Removes Rahu Dasha malefic effects','Reduces confusion and anxiety','Helps with career obstacles','Beneficial for unconventional careers'],                  'Should only be worn after thorough chart analysis — Rahu is unpredictable.',                               '5–8 Ratti', 'Panchdhatu or silver','Middle or ring finger',  'Saturday, evening', 'Om Rahave Namah',     '$–$$',   8),
  ('cats-eye',       'Cat''s Eye',     'Lehsunia',  'Ketu',    '#A8B400', 'Yellowish-Green','Associated with Ketu — provides spiritual insight, protection and removes Ketu Dasha effects.', ARRAY['Protects from evil eye','Provides spiritual insight','Removes Ketu Dasha effects','Beneficial for moksha and liberation'],                                       'Should only be worn after careful chart analysis — sudden effects possible.',                              '3–5 Ratti', 'Panchdhatu',      'Middle or ring finger',     'Thursday, evening', 'Om Ketave Namah',     '$–$$',   9);
