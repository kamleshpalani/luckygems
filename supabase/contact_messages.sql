-- ─────────────────────────────────────────────────────────
--  contact_messages.sql
--  Stores ContactForm submissions (name, email, phone, service, message)
--  Run in: Supabase → SQL Editor
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

-- Website visitors can submit contact forms
CREATE POLICY "Allow public inserts"
  ON contact_messages FOR INSERT TO anon
  WITH CHECK (true);

-- Only you (authenticated) can read messages
CREATE POLICY "Allow authenticated reads"
  ON contact_messages FOR SELECT TO authenticated
  USING (true);

-- Only you can update status (mark as read/replied)
CREATE POLICY "Allow authenticated updates"
  ON contact_messages FOR UPDATE TO authenticated
  USING (true);
