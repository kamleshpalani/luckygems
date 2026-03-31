import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const SERVICES_LIST = [
  'Horoscope Reading',
  'Online Consultation',
  'Career & Business Astrology',
  'Marriage & Compatibility',
  'Family / Child / Health',
  'Muhurtham & Timing',
  'Travel & Abroad',
  'Numerology',
  'Remedi Consultation',
  'Gemstone Guidance',
  'Other',
];

export default function ContactForm({ compact = false }) {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]    = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    /* TODO: connect to backend/email service */
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-green-600" />
        </div>
        <h3 className="font-serif text-xl text-stone-900 mb-2">Message Received!</h3>
        <p className="text-stone-500 text-sm max-w-sm mx-auto">
          Thank you for reaching out. Dr. Gurudeva's team will respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5" noValidate>
      <div className={`grid gap-5 ${compact ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
        <div>
          <label htmlFor="name" className="form-label">Full Name <span className="text-maroon-500">*</span></label>
          <input
            id="name" name="name" type="text"
            value={form.name} onChange={handleChange}
            required placeholder="Your full name"
            className="form-input"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">Email Address <span className="text-maroon-500">*</span></label>
          <input
            id="email" name="email" type="email"
            value={form.email} onChange={handleChange}
            required placeholder="you@email.com"
            className="form-input"
            autoComplete="email"
          />
        </div>
      </div>

      <div className={`grid gap-5 ${compact ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
        <div>
          <label htmlFor="phone" className="form-label">Phone / WhatsApp</label>
          <input
            id="phone" name="phone" type="tel"
            value={form.phone} onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="form-input"
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="service" className="form-label">Service Interested In</label>
          <select
            id="service" name="service"
            value={form.service} onChange={handleChange}
            className="form-select"
          >
            <option value="">Select a service…</option>
            {SERVICES_LIST.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="form-label">Your Message <span className="text-maroon-500">*</span></label>
        <textarea
          id="message" name="message"
          value={form.message} onChange={handleChange}
          required rows={compact ? 3 : 5}
          placeholder="Please briefly describe what you'd like to discuss or any specific questions…"
          className="form-textarea"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending…
          </span>
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-stone-400 text-center">
        Your information is kept strictly confidential.
      </p>
    </form>
  );
}
