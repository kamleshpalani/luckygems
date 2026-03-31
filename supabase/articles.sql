-- ─────────────────────────────────────────────────────────
--  articles.sql
--  Blog / knowledge articles by Dr. Gurudeva
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
  content      TEXT,             -- full markdown/HTML content
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published"
  ON articles FOR SELECT TO anon, authenticated
  USING (published = TRUE);

CREATE POLICY "Authenticated write"
  ON articles FOR ALL TO authenticated
  USING (true);

-- Auto-update updated_at on edits
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Seed Data ─────────────────────────────────────────────
INSERT INTO articles (slug, title, excerpt, category, read_time, publish_date, featured) VALUES
  ('gem-conflictions',
   'Gem Conflictions – Why Some Gemstones Should Never Be Worn Together',
   'Not all gemstones are compatible with each other. Wearing conflicting gemstones can neutralize their benefits or strengthen malefic planets. Learn which combinations to avoid.',
   'Gemstones', '6 min', '2024-11-10', TRUE),

  ('about-12-raasis',
   'About the 12 Raasis – The 12 Zodiac Signs in Vedic Astrology',
   'The 12 Raasis form the foundation of every Vedic horoscope. Learn about each sign, its ruling planet, element, and core characteristics.',
   'Astrology Basics', '8 min', '2024-10-15', TRUE),

  ('how-gems-affect-a-person',
   'How Do Gems Affect a Person? The Metaphysics of Vedic Gemstone Therapy',
   'Gemstones transmit and absorb cosmic planetary energy. Learn the science and metaphysics behind why certain stones are prescribed in Vedic astrology.',
   'Gemstones', '5 min', '2024-09-20', TRUE);
