import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Phone,
  Calendar,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { SERVICES } from "../../data/services";
import { FAQ_GROUPS } from "../../data/faq";
import { CONTACT_INFO } from "../../data/navigation";

/* ─────────────────────────────────────────────────────────
   KNOWLEDGE BASE
───────────────────────────────────────────────────────── */
const FLAT_FAQS = FAQ_GROUPS.flatMap((g) => g.items);

const CONCERN_OPTIONS = [
  {
    id: "horoscope",
    label: "🔮 Horoscope & Birth Chart",
    slug: "horoscope-reading",
  },
  { id: "career", label: "💼 Career & Business", slug: "career-astrology" },
  {
    id: "marriage",
    label: "💑 Marriage & Compatibility",
    slug: "marriage-compatibility",
  },
  { id: "health", label: "🏥 Health & Family", slug: "health-astrology" },
  { id: "gemstone", label: "💎 Gemstone Guidance", slug: "lucky-gem-report" },
  { id: "remedy", label: "🕉️ Doshas & Remedies", slug: "doshas-yogas" },
  { id: "muhurtham", label: "📅 Auspicious Timing", slug: "muhurtham" },
  {
    id: "question",
    label: "❓ Ask a Specific Question",
    slug: "ask-a-question",
  },
];

function detectIntent(text) {
  const t = text.toLowerCase().trim();

  if (
    /^(hi\b|hello|hey\b|namaste|hii|helo|good morning|good evening|good afternoon|greet)/.test(
      t,
    )
  )
    return "greeting";
  if (/\b(book|appointment|schedule|book a consult)\b/.test(t)) return "book";
  if (/\b(phone|call|contact|number|reach|whatsapp|wa\.me)\b/.test(t))
    return "contact";
  if (/\b(hour|timing|available|open|when can|office hour)\b/.test(t))
    return "hours";
  if (/\b(price|cost|fee|how much|charge|\$|rate)\b/.test(t)) return "pricing";
  if (/\bfree\b/.test(t)) return "free";
  if (/\b(payment|pay|paypal|credit card|wire|bank)\b/.test(t))
    return "payment";
  if (
    /\b(horoscope|birth chart|kundli|rashi|nakshatra|jathakam|janam patri|natal chart)\b/.test(
      t,
    )
  )
    return "horoscope";
  if (/\b(career|job|profession|work|business|promotion|job change)\b/.test(t))
    return "career";
  if (
    /\b(marriage|kundali match|compatib|wedding|bride|groom|manglik dosha)\b/.test(
      t,
    )
  )
    return "marriage";
  if (
    /\b(gemstone|gem\b|stone|ruby|sapphire|neelam|manik|pearl|coral|emerald|navratna|blue sapphire|hessonite)\b/.test(
      t,
    )
  )
    return "gemstone";
  if (
    /\b(remedy|remedies|dosha|kaal sarp|sade sati|black magic|spiritual healing|pooja|homa|yantra|vastu)\b/.test(
      t,
    )
  )
    return "remedy";
  if (
    /\b(muhurtham|muhurat|auspicious timing|griha pravesh|cesarean|c.section)\b/.test(
      t,
    )
  )
    return "muhurtham";
  if (/\b(language|telugu|tamil|hindi|kannada|malayalam)\b/.test(t))
    return "language";
  if (/\b(numerology|lucky number)\b/.test(t)) return "numerology";
  if (
    /\b(about|who is|experience|dr.*gurudeva|gurudeva|doctor|25 year)\b/.test(t)
  )
    return "about";
  if (
    /\b(recommend|suggest|which service|what service|best service|help me choose|not sure|dont know|don.t know)\b/.test(
      t,
    )
  )
    return "recommend";
  if (/\b(email|online report|email service|email reading)\b/.test(t))
    return "email";

  // Fuzzy FAQ match
  const matched = FLAT_FAQS.find((faq) => {
    const words = faq.q
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 4);
    return words.filter((w) => t.includes(w)).length >= 2;
  });
  if (matched) return { type: "faq", item: matched };

  return "unknown";
}

function getResponse(intent) {
  if (typeof intent === "object" && intent.type === "faq") {
    return {
      text: intent.item.a,
      quickReplies: ["book", "contact", "recommend"],
    };
  }
  switch (intent) {
    case "greeting":
      return {
        text: `Namaste! 🙏 I'm Dr. Gurudeva's virtual assistant. I can help you explore services, find the right consultation, or answer common questions.\n\nHow can I help you today?`,
        quickReplies: ["pricing", "recommend", "book", "contact"],
      };
    case "book":
      return {
        text: `You can book a consultation in two ways:\n\n📧 **Online/Email** – Order via our website and receive your report within 24–48 hours.\n\n📞 **By Phone** – Call directly: ${CONTACT_INFO.phoneDisplay} (USA) or ${CONTACT_INFO.phoneUK} (UK)\n\nAvailable 9 AM – 9 PM EST, 7 days a week.`,
        action: { label: "Book Now", to: "/book" },
        quickReplies: ["pricing", "contact"],
      };
    case "contact":
      return {
        text: `📞 **USA:** ${CONTACT_INFO.phoneDisplay}\n📞 **UK:** ${CONTACT_INFO.phoneUK}\n📧 **Email:** ${CONTACT_INFO.email}\n💬 **WhatsApp:** wa.me/${CONTACT_INFO.whatsapp}\n\n🕐 Available 9 AM – 9 PM EST, 7 days a week.`,
        action: { label: "Contact Page", to: "/contact" },
        quickReplies: ["book", "hours"],
      };
    case "hours":
      return {
        text: `Dr. Gurudeva is available **9 AM to 9 PM EST, 7 days a week** — including weekends and holidays.\n\nFor time zones: UK clients should follow the same EST hours. If no one answers, leave your name and number and Dr. Gurudeva will call back.`,
        quickReplies: ["contact", "book"],
      };
    case "pricing":
      return {
        text: `💰 **Pricing Overview:**\n\n• Most online/email services: **$21**\n• Ask a Question (email): **$11**\n• Cesarean Muhurtham: **$31**\n• Vivaha (Wedding) Muhurtham: **$51**\n• Phone consultation (1st time): **Free**\n• Phone (subsequent): **$31**\n• In-person: **$31**\n\nAll payments via PayPal, credit card, or bank transfer.`,
        action: { label: "View All Services", to: "/services" },
        quickReplies: ["book", "payment", "recommend"],
      };
    case "free":
      return {
        text: `Yes! 🎉 Dr. Gurudeva offers a **free first phone consultation** for 2–3 specific questions about your horoscope.\n\nCall: ${CONTACT_INFO.phoneDisplay} (USA) or ${CONTACT_INFO.phoneUK} (UK)\n🕐 9 AM – 9 PM EST, 7 days a week.`,
        quickReplies: ["contact", "book"],
      };
    case "payment":
      return {
        text: `💳 **Payment Methods Accepted:**\n\n• PayPal (${CONTACT_INFO.paypal})\n• Credit card by phone\n• Online website payment\n• Bank deposit / wire transfer\n• Check or money order\n• Cash (in-person only)\n\nAll online payments are processed securely through PayPal.`,
        quickReplies: ["book", "pricing"],
      };
    case "horoscope":
      return {
        text: `✨ The **Horoscope Reading** is our most popular service — ideal if you're new to Vedic astrology.\n\n• Lifetime predictions (career, marriage, health, finances)\n• Lucky gem, lucky day, lucky color\n• Dasha interpretations\n• FREE 50-page horoscope report included!\n\n**Price: $21** | Reply within 24 hours.`,
        action: {
          label: "View Horoscope Service",
          to: "/services/horoscope-reading",
        },
        quickReplies: ["book", "pricing", "recommend"],
      };
    case "career":
      return {
        text: `💼 The **Career Analysis** service helps you find your ideal profession and best timing for career moves.\n\n• Best career path suited to your horoscope\n• Favorable periods for job change or promotion\n• Remedies for malefic career planets\n• FREE 50-page horoscope included!\n\n**Price: $21** | Reply within 24 hours.`,
        action: {
          label: "View Career Service",
          to: "/services/career-astrology",
        },
        quickReplies: ["book", "muhurtham"],
      };
    case "marriage":
      return {
        text: `💑 **Kundli Matching / Horoscope Compatibility** — a thorough 36-point Gun Milan analysis.\n\n• Manglik dosha check\n• Divorce/separation indicators\n• Vaidhavya dosha analysis\n• Full Graha Kundli compatibility\n\n**Price: $21** | Send birth details for both partners.`,
        action: {
          label: "View Compatibility Service",
          to: "/services/marriage-compatibility",
        },
        quickReplies: ["book", "pricing"],
      };
    case "gemstone":
      return {
        text: `💎 Dr. Gurudeva recommends gemstones based on your birth chart — only natural, energized gemstones.\n\n• Lucky Gem Report: personalized recommendation ($21)\n• Rings & pendants made in 15–20 days\n• Mantra-energized before shipping\n• Blue Sapphire & Hessonite are fast-acting stones\n\nNever wear a gemstone without consulting a Vedic astrologer!`,
        action: { label: "Gemstone Guidance", to: "/gemstones" },
        quickReplies: ["book", "pricing"],
      };
    case "remedy":
      return {
        text: `🕉️ Dr. Gurudeva offers remedies for all major doshas:\n\n• Kaal Sarp Dosha, Sade Sati, Manglik Dosha\n• Sarpa Dosha, Viyog Dosha\n• Black Magic Removal\n• Spiritual Healing, Yantras, Poojas & Homas\n• Vastu Consultation\n\nAll remedies are prescribed based on your birth chart.`,
        action: { label: "View All Remedies", to: "/remedies" },
        quickReplies: ["book", "pricing", "contact"],
      };
    case "muhurtham":
      return {
        text: `📅 **Muhurtham** — choosing auspicious timing for important life events:\n\n• Vivaha (Wedding) Muhurtham – $51\n• Cesarean Muhurtham – $31\n• Griha Pravesh, Business Launch, Travel – $21 each\n\nDr. Gurudeva uses traditional Panchanga methods for accurate timings.`,
        action: { label: "View Muhurtham Service", to: "/services/muhurtham" },
        quickReplies: ["book", "pricing"],
      };
    case "language":
      return {
        text: `🌐 Dr. Gurudeva consults in **6 languages:**\n\nTelugu, Tamil, Kannada, Malayalam, Hindi, and English.\n\nFor email reports, mention your preferred language in the additional comments when ordering.`,
        quickReplies: ["book", "contact"],
      };
    case "numerology":
      return {
        text: `🔢 The **Numerology** service reveals your life path, lucky numbers, and the best numbers for important decisions.\n\n• Lucky name analysis\n• Lucky number for business, vehicles, addresses\n• Birth number interpretations\n\n**Price: $21**`,
        action: {
          label: "View Numerology Service",
          to: "/services/numerology",
        },
        quickReplies: ["book", "pricing"],
      };
    case "about":
      return {
        text: `👳 **Dr. Gurudeva** is a Vedic astrologer with **25+ years of experience**, serving clients across USA, UK, Canada, India & worldwide.\n\n• Specializes in Vedic Jyotish (Lahari system)\n• Based in Highland Park, NJ (serves globally)\n• Offers phone, email, and in-person consultations\n• Known for accuracy, compassion, and practical remedies`,
        action: { label: "Learn More", to: "/about" },
        quickReplies: ["book", "contact", "pricing"],
      };
    case "email":
      return {
        text: `📧 Most services are available as **email / online reports**:\n\n• Submit your birth details on the website\n• Pay securely via PayPal or credit card\n• Receive a detailed report within **24–48 hours**\n• Follow-up questions via phone or WhatsApp at no extra charge`,
        action: { label: "View Services", to: "/services" },
        quickReplies: ["pricing", "book"],
      };
    case "recommend":
      return { text: null, stage: "recommend" };
    default:
      return {
        text: `I'm not sure I understood that. Here are some things I can help with:`,
        quickReplies: ["pricing", "recommend", "book", "contact"],
      };
  }
}

const QUICK_REPLY_MAP = {
  pricing: { label: "💰 Pricing", intent: "pricing" },
  recommend: { label: "🔮 Find My Service", intent: "recommend" },
  book: { label: "📅 Book Consultation", intent: "book" },
  contact: { label: "📞 Contact Details", intent: "contact" },
  hours: { label: "🕐 Office Hours", intent: "hours" },
  payment: { label: "💳 Payment Methods", intent: "payment" },
  muhurtham: { label: "📅 Muhurtham", intent: "muhurtham" },
};

/* ─────────────────────────────────────────────────────────
   MESSAGE TYPES
───────────────────────────────────────────────────────── */
const WELCOME = {
  id: 0,
  role: "bot",
  text: `Namaste! 🙏 I'm Dr. Gurudeva's virtual assistant.\n\nI can help you explore services, answer questions, and connect you with the right consultation. What would you like to know?`,
  quickReplies: ["pricing", "recommend", "book", "contact"],
};

/* ─────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-end gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-maroon-400"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function BotMessage({ msg, onQuickReply }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 40);
    return () => clearTimeout(t);
  }, []);

  const lines = (msg.text || "").split("\n");
  const formatted = lines.map((line, li) => {
    // bold: **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={li}>
        {parts.map((part, pi) =>
          part.startsWith("**") ? (
            <strong key={pi} className="font-semibold text-stone-800">
              {part.slice(2, -2)}
            </strong>
          ) : (
            part
          ),
        )}
        {li < lines.length - 1 && <br />}
      </span>
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-2.5 max-w-[85%]"
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-maroon-700 to-maroon-500 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
        <Bot size={14} className="text-gold-300" />
      </div>

      <div className="flex flex-col gap-2">
        {/* Bubble */}
        <div
          className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {formatted}
        </div>

        {/* Action button */}
        {msg.action && (
          <Link
            to={msg.action.to}
            className="self-start inline-flex items-center gap-1.5 bg-maroon-600 hover:bg-maroon-700 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            {msg.action.label}
            <ChevronRight size={11} />
          </Link>
        )}

        {/* Quick replies */}
        {msg.quickReplies && (
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {msg.quickReplies.map((qr) => {
              const def = QUICK_REPLY_MAP[qr];
              if (!def) return null;
              return (
                <button
                  key={qr}
                  onClick={() => onQuickReply(def.intent, def.label)}
                  className="text-xs border border-gold-600/40 hover:border-gold-500 text-gold-300 hover:text-gold-200 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors"
                >
                  {def.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Recommend concerns */}
        {msg.type === "recommend" && (
          <div className="flex flex-col gap-1.5 mt-0.5">
            {CONCERN_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() =>
                  onQuickReply("concern_" + opt.id, opt.label, opt.slug)
                }
                className="text-left text-xs border border-white/12 hover:border-gold-500/50 text-stone-300 hover:text-gold-300 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl transition-colors flex items-center gap-2"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function UserMessage({ msg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex justify-end"
    >
      <div className="max-w-[80%] bg-maroon-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm shadow-sm leading-relaxed">
        {msg.text}
      </div>
    </motion.div>
  );
}

function LeadForm({ stage, onSubmit, onSkip }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const placeholder =
    stage === "lead_name" ? "Your name…" : "Your email address…";
  const type = stage === "lead_email" ? "email" : "text";

  return (
    <div className="flex gap-2">
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && value.trim() && onSubmit(value.trim())
        }
        placeholder={placeholder}
        className="flex-1 text-sm border border-white/15 rounded-xl px-3 py-2 focus:outline-none focus:border-gold-500/60 text-stone-200 placeholder:text-stone-500"
        style={{ background: "rgba(255,255,255,0.07)" }}
        autoComplete={type === "email" ? "email" : "name"}
      />
      <button
        onClick={() => value.trim() && onSubmit(value.trim())}
        disabled={!value.trim()}
        className="bg-maroon-600 hover:bg-maroon-700 disabled:opacity-40 text-white px-3 py-2 rounded-xl transition-colors"
      >
        <Send size={14} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN CHATBOT COMPONENT
───────────────────────────────────────────────────────── */
let msgId = 1;
function nextId() {
  return ++msgId;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [stage, setStage] = useState("chat"); // 'chat' | 'recommend' | 'lead_name' | 'lead_email'
  const [lead, setLead] = useState({ name: "" });
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const pushBot = useCallback(
    (payload, delay = 600) => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "bot", ...payload },
        ]);
        if (!open) setUnread((n) => n + 1);
      }, delay);
    },
    [open],
  );

  const pushUser = useCallback((text) => {
    setMessages((prev) => [...prev, { id: nextId(), role: "user", text }]);
  }, []);

  const handleSend = useCallback(
    (text) => {
      const trimmed = (text || input).trim();
      if (!trimmed) return;
      setInput("");

      // Lead capture flow
      if (stage === "lead_name") {
        pushUser(trimmed);
        setLead({ name: trimmed });
        setStage("lead_email");
        pushBot({
          text: `Thanks, ${trimmed}! 😊 What's the best email address to reach you?`,
        });
        return;
      }
      if (stage === "lead_email") {
        pushUser(trimmed);
        const fullLead = { ...lead, email: trimmed };
        // Persist lead
        try {
          const saved = JSON.parse(localStorage.getItem("chatLeads") || "[]");
          saved.push({ ...fullLead, ts: new Date().toISOString() });
          localStorage.setItem("chatLeads", JSON.stringify(saved));
        } catch (_) {
          /* ignore */
        }
        setStage("chat");
        pushBot({
          text: `Thank you! 🙏 Dr. Gurudeva's team will reach out to **${fullLead.email}** shortly.\n\nWould you like to book directly?`,
          action: { label: "Book Consultation", to: "/book" },
          quickReplies: ["pricing", "contact"],
        });
        return;
      }

      pushUser(trimmed);
      const intent = detectIntent(trimmed);
      const res = getResponse(intent);

      if (res.stage === "recommend") {
        setStage("recommend");
        pushBot({
          text: `Great! Let me help you find the right service. 🔮\n\nWhat area would you like guidance on?`,
          type: "recommend",
        });
        return;
      }

      if (res.text === null) return; // handled by stage change

      pushBot(res);
    },
    [input, stage, lead, pushUser, pushBot],
  );

  const handleQuickReply = useCallback(
    (intent, label, concernSlug) => {
      pushUser(label);

      // Concern picked in recommend flow
      if (intent.startsWith("concern_") && concernSlug) {
        setStage("chat");
        const svc = SERVICES.find((s) => s.slug === concernSlug);
        if (svc) {
          pushBot({
            text: `Based on your interest, I'd recommend:\n\n**${svc.title}**\n${svc.shortDesc}\n\n**Price: ${svc.price || "$21"}**`,
            action: { label: `View ${svc.title}`, to: `/services/${svc.slug}` },
            quickReplies: ["book", "pricing", "contact"],
          });
        }
        // After recommendation, offer lead capture after a short delay
        setTimeout(() => {
          pushBot(
            {
              text: `Would you like Dr. Gurudeva's team to reach out to you personally with more details?`,
              quickReplies: [],
              type: "lead_prompt",
            },
            1800,
          );
        }, 800);
        return;
      }

      if (intent === "lead_capture") {
        setStage("lead_name");
        pushBot({ text: `Sure! What's your name? 😊` });
        return;
      }

      const res = getResponse(intent);
      if (res.stage === "recommend") {
        setStage("recommend");
        pushBot({
          text: `Great! Let me help you find the right service. 🔮\n\nWhat area would you like guidance on?`,
          type: "recommend",
        });
        return;
      }
      pushBot(res);
    },
    [pushUser, pushBot],
  );

  // Lead prompt "Yes" quick reply
  function handleLeadPromptYes() {
    pushUser("Yes, please reach out");
    setStage("lead_name");
    pushBot({ text: `Great! What's your name? 😊` });
  }

  return (
    <>
      {/* ── Floating launch button ── */}
      <div className="fixed bottom-[5.5rem] right-4 lg:bottom-6 lg:right-6 z-50">
        <AnimatePresence>
          {!open && (
            <motion.button
              key="fab"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() => setOpen(true)}
              aria-label="Open chat assistant"
              className="relative w-14 h-14 rounded-full bg-gradient-to-br from-maroon-700 to-maroon-500 shadow-lg hover:shadow-xl text-white flex items-center justify-center transition-shadow"
            >
              <MessageCircle size={22} />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {unread}
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile overlay backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={[
                "fixed z-50 flex flex-col shadow-2xl overflow-hidden",
                // Mobile: full screen sheet
                "inset-x-2 bottom-2 top-16",
                "rounded-2xl",
                // md+: fixed panel bottom-right
                "md:inset-auto md:bottom-24 md:right-6 md:top-auto md:w-[390px] md:h-[600px] md:max-h-[80vh]",
                "lg:bottom-8 lg:right-8",
              ].join(" ")}
              style={{
                background: "rgba(10,4,22,0.97)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(201,150,12,0.18)",
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-maroon-800 to-maroon-700 px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  <Sparkles size={16} className="text-gold-300" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm leading-snug">
                    Dr. Gurudeva's Assistant
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                    <span className="text-maroon-200 text-xs">Online now</span>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="text-white/70 hover:text-white transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
                {messages.map((msg) => {
                  if (msg.role === "user")
                    return <UserMessage key={msg.id} msg={msg} />;
                  if (msg.type === "lead_prompt") {
                    return (
                      <div
                        key={msg.id}
                        className="flex items-start gap-2.5 max-w-[85%]"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-maroon-700 to-maroon-500 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                          <Bot size={14} className="text-gold-300" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div
                            className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed"
                            style={{
                              background: "rgba(255,255,255,0.07)",
                              border: "1px solid rgba(255,255,255,0.12)",
                            }}
                          >
                            {msg.text}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleLeadPromptYes}
                              className="text-xs border border-gold-600/40 hover:border-gold-500 text-gold-300 hover:text-gold-200 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors"
                            >
                              ✅ Yes, please
                            </button>
                            <button
                              onClick={() =>
                                handleQuickReply("book", "📅 Book Consultation")
                              }
                              className="text-xs border border-white/15 text-stone-300 hover:text-gold-300 hover:border-gold-500/40 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors"
                            >
                              📅 Book directly
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <BotMessage
                      key={msg.id}
                      msg={msg}
                      onQuickReply={handleQuickReply}
                    />
                  );
                })}
                {typing && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-maroon-700 to-maroon-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Bot size={14} className="text-gold-300" />
                    </div>
                    <div
                      className="rounded-2xl rounded-tl-sm"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <TypingDots />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input bar */}
              <div
                className="flex-shrink-0 border-t border-white/10 px-3 py-3"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {stage === "lead_name" || stage === "lead_email" ? (
                  <LeadForm
                    stage={stage}
                    onSubmit={(val) => handleSend(val)}
                    onSkip={() => {
                      setStage("chat");
                    }}
                  />
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask anything…"
                      className="flex-1 text-sm border border-white/15 rounded-xl px-3 py-2 focus:outline-none focus:border-gold-500/60 text-stone-200 placeholder:text-stone-500"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="bg-maroon-600 hover:bg-maroon-700 disabled:opacity-40 text-white px-3 py-2 rounded-xl transition-colors"
                      aria-label="Send"
                    >
                      <Send size={15} />
                    </button>
                  </form>
                )}
                <p className="text-center text-stone-400 text-[10px] mt-2">
                  Powered by LuckyGems ·{" "}
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="underline hover:text-maroon-500"
                  >
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
