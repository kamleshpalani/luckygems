-- ─────────────────────────────────────────────────────────
--  Gurudev Astrology — Supabase Schema
--  Run this once in: Supabase → SQL Editor → Run
-- ─────────────────────────────────────────────────────────

-- 1. Create the inquiries table
CREATE TABLE inquiries (
  id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  service          TEXT,
  service_title    TEXT,
  full_name        TEXT,
  dob              DATE,
  time_of_birth    TEXT,
  place_of_birth   TEXT,
  present_location TEXT
);

-- 2. Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous users (website visitors) to insert rows
CREATE POLICY "Allow public inserts"
  ON inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Only authenticated users (you, via Supabase dashboard) can read rows
CREATE POLICY "Allow authenticated reads"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (true);
