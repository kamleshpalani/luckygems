-- ─────────────────────────────────────────────────────────
--  pricing.sql
--  Consultation pricing plans
-- ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS pricing_plans (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  plan_key    TEXT UNIQUE NOT NULL,   -- phone | online | inperson
  name        TEXT NOT NULL,
  price       TEXT NOT NULL,
  duration    TEXT,
  popular     BOOLEAN DEFAULT FALSE,
  description TEXT,
  includes    TEXT[],                 -- array of bullet points
  note        TEXT,
  cta_label   TEXT,
  active      BOOLEAN DEFAULT TRUE,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read"
  ON pricing_plans FOR SELECT TO anon, authenticated
  USING (active = TRUE);

CREATE POLICY "Authenticated write"
  ON pricing_plans FOR ALL TO authenticated
  USING (true);

-- ── Seed Data ─────────────────────────────────────────────
INSERT INTO pricing_plans (plan_key, name, price, duration, popular, description, includes, note, cta_label, sort_order) VALUES
  ('phone',
   'Phone Consultation',
   'Free',
   'Free call',
   FALSE,
   'Direct free phone consultation with Dr. Gurudeva. Call 732-448-0667 anytime 9 AM–9 PM EST.',
   ARRAY[
     'Free direct phone call (first-time or specific questions)',
     'Speak directly with Dr. Gurudeva',
     'Available 7 days, 9 AM–9 PM EST (USA)',
     'UK line also available: 020-8144-6490'
   ],
   'Subsequent detailed consultations are $31. In-person face-to-face is $31.',
   'Call Now',
   1),

  ('online',
   'Online / Email Service',
   '$21',
   'Per service',
   TRUE,
   'All standard online astrology services including horoscope reading, career analysis, kundli matching, health report and more.',
   ARRAY[
     'Complete analysis sent by email within 24–48 hours',
     'Free 50-page horoscope PDF included',
     'Covers all major life areas',
     'Personalized remedies and guidance',
     'Follow-up questions welcome'
   ],
   'Applies to: Horoscope, Career, Kundli Matching, Health, Baby Report, Manglik, Kaal Sarp, Sade Sati and all standard services.',
   'Book Online Service',
   2),

  ('inperson',
   'In-Person Consultation',
   '$31',
   'Face-to-face',
   FALSE,
   'Personal face-to-face consultation with Dr. Gurudeva at Highland Park, NJ (near Edison Train Station).',
   ARRAY[
     'Face-to-face personal meeting',
     'Full horoscope analysis and discussions',
     'Available in Highland Park, NJ',
     'Near Edison Train Station for easy access',
     'Flexible scheduling by appointment'
   ],
   'Please call 732-448-0667 to schedule an in-person appointment.',
   'Schedule In-Person',
   3);
