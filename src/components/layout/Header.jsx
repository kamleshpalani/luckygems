import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Star, Sparkles } from "lucide-react";
import { NAV_ITEMS, CTA_NAV, CONTACT_INFO } from "../../data/navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handler(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* ── Top utility bar ── */}
      <div
        className="hidden md:flex items-center justify-end gap-6 px-6 py-1.5 text-xs"
        style={{
          background: "rgba(10,5,20,0.88)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="flex items-center gap-1.5 text-gold-300 hover:text-gold-200 transition-colors font-semibold"
        >
          <Phone size={11} />
          {CONTACT_INFO.phone}
        </a>
        <span className="text-stone-700">|</span>
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="text-stone-400 hover:text-gold-300 transition-colors"
        >
          WhatsApp
        </a>
        <span className="text-stone-700">|</span>
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="text-stone-400 hover:text-gold-300 transition-colors"
        >
          {CONTACT_INFO.email}
        </a>
      </div>

      {/* ── Main header ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "shadow-[0_8px_32px_rgba(0,0,0,0.55)] border-b border-white/10"
            : "border-b border-white/[0.07]"
        }`}
        style={{
          background: scrolled ? "rgba(10,5,20,0.92)" : "rgba(10,5,20,0.72)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #8B1A1A, #5a0e0e)",
                  boxShadow: "0 4px 12px rgba(139,26,26,0.3)",
                }}
              >
                <Star size={15} className="text-gold-300" fill="currentColor" />
              </div>
              <div className="leading-none">
                <div className="font-serif text-white font-semibold text-base group-hover:text-gold-300 transition-colors">
                  Gurudev Astrology
                </div>
                <div className="text-[10px] text-gold-400 tracking-[0.15em] uppercase font-sans">
                  Vedic Astrologer
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              ref={dropdownRef}
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <DesktopDropdown
                    key={item.path}
                    item={item}
                    isOpen={activeDropdown === item.path}
                    onToggle={() =>
                      setActiveDropdown((prev) =>
                        prev === item.path ? null : item.path,
                      )
                    }
                  />
                ) : (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-gold-300 bg-white/10"
                          : "text-stone-300 hover:text-white hover:bg-white/8"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/inquiry"
                className="btn-outline !py-2 !px-4 !text-xs hidden xl:inline-flex"
              >
                Request Reading
              </Link>
              <Link to={CTA_NAV.path} className="btn-gold !py-2 !px-4 !text-xs">
                <Sparkles size={12} />
                {CTA_NAV.label}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-gold-300 hover:text-gold-200 transition-colors"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.16)",
              }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/* Desktop dropdown item */
function DesktopDropdown({ item, isOpen, onToggle }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          isOpen
            ? "text-gold-300 bg-white/10"
            : "text-stone-300 hover:text-white hover:bg-white/8"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-56 rounded-xl py-2 z-50 animate-slide-down"
          style={{
            background: "rgba(14,8,28,0.95)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow:
              "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
          role="menu"
        >
          <NavLink
            to={item.path}
            end
            className="block px-4 py-2 text-[10px] text-purple-400 hover:text-gold-300 font-semibold uppercase tracking-[0.12em] transition-colors"
            role="menuitem"
          >
            View All {item.label}
          </NavLink>
          <div className="glass-divider mx-3 mb-1 mt-0.5" />
          {item.children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? "text-gold-300 bg-white/10"
                    : "text-stone-300 hover:text-white hover:bg-white/8"
                }`
              }
              role="menuitem"
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
