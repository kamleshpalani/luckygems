import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, PhoneCall, Search } from 'lucide-react';
import SEO from '../components/common/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for could not be found." noIndex />

      <section className="min-h-[70vh] flex items-center justify-center bg-ivory-100 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto"
        >
          <p className="font-serif text-8xl font-bold text-maroon-500 mb-2">404</p>
          <h1 className="font-serif text-2xl font-semibold text-stone-900 mb-3">Page Not Found</h1>
          <p className="text-stone-600 leading-relaxed mb-8">
            We couldn't find the page you were looking for. It may have moved, been renamed, or no longer exists.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">
              <Home size={16} />
              Go Home
            </Link>
            <Link to="/services" className="btn-outline">
              <Search size={16} />
              Browse Services
            </Link>
            <a href="tel:+17324480667" className="btn-secondary">
              <PhoneCall size={16} />
              Call Us
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
