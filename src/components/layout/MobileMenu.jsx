import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { X, ChevronDown, Phone, MessageCircle, CalendarDays } from 'lucide-react';
import { NAV_ITEMS, CTA_NAV, CONTACT_INFO } from '../../data/navigation';

export default function MobileMenu({ isOpen, onClose }) {
  const [openGroup, setOpenGroup] = useState(null);

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed inset-y-0 left-0 z-50 w-80 max-w-[90vw] bg-white flex flex-col shadow-large"
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <Link to="/" onClick={onClose} className="font-serif text-maroon-700 text-lg font-semibold">
            Dr. Gurudeva
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-maroon-600 hover:bg-maroon-50 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-3">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.path}>
                <button
                  className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium text-stone-700 hover:text-maroon-600 hover:bg-maroon-50 transition-colors"
                  onClick={() =>
                    setOpenGroup((prev) =>
                      prev === item.path ? null : item.path
                    )
                  }
                  aria-expanded={openGroup === item.path}
                >
                  {item.label}
                  <ChevronDown
                    size={15}
                    className={`text-stone-400 transition-transform duration-200 ${
                      openGroup === item.path ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openGroup === item.path && (
                  <div className="ml-3 mb-1 border-l-2 border-maroon-100 pl-3">
                    <NavLink
                      to={item.path}
                      end
                      onClick={onClose}
                      className="block py-2 text-xs text-stone-400 hover:text-maroon-600 font-semibold uppercase tracking-wider"
                    >
                      View All {item.label}
                    </NavLink>
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `block py-2 text-sm transition-colors ${
                            isActive
                              ? 'text-maroon-600 font-semibold'
                              : 'text-stone-600 hover:text-maroon-600'
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-maroon-600 bg-maroon-50 font-semibold'
                      : 'text-stone-700 hover:text-maroon-600 hover:bg-maroon-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Bottom CTA strip */}
        <div className="p-4 border-t border-stone-100 space-y-2">
          <Link
            to={CTA_NAV.path}
            onClick={onClose}
            className="btn-primary w-full justify-center"
          >
            <CalendarDays size={15} />
            {CTA_NAV.label}
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="btn-secondary justify-center !py-2 !text-xs"
            >
              <Phone size={13} />
              Call
            </a>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg py-2 text-xs transition-colors"
            >
              <MessageCircle size={13} />
              WhatsApp
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
