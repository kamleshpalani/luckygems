import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionWrapper, { SectionHeader } from '../components/common/SectionWrapper';
import ArticleCard from '../components/blog/ArticleCard';
import CTASection from '../components/common/CTASection';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { ARTICLES, ARTICLE_CATEGORIES } from '../data/articles';

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const featured = ARTICLES.filter((a) => a.featured);
  const all = ARTICLES.filter((a) => !a.featured);

  const filtered = ARTICLES.filter((a) => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchQ = !query || a.title.toLowerCase().includes(query.toLowerCase()) || a.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      <SEO
        title="Vedic Astrology Articles & Guides – Dr. Gurudeva"
        description="In-depth articles on Vedic astrology, gemstone therapy, planetary remedies, and Ayurvedic wellness by Dr. Gurudeva."
        canonical="/articles"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-8 md:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: 'Articles', path: '/articles' }]} />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 max-w-xl"
          >
            <p className="section-label text-gold-300 mb-2">Knowledge & Insight</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Articles & Guides
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed">
              Educational articles on Vedic astrology, gemstone therapy, remedies, and holistic well-being — written by Dr. Gurudeva.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <SectionWrapper variant="ivory">
          <SectionHeader label="Featured" title="Must-Read Articles" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Filter & search */}
      <SectionWrapper variant="white">
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {['All', ...ARTICLE_CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? 'bg-maroon-600 text-white border-maroon-600'
                    : 'border-stone-300 text-stone-600 hover:border-maroon-400 hover:text-maroon-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-400 w-56"
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-stone-500">
            <p className="text-lg">No articles match your search.</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('All'); }}
              className="mt-3 text-maroon-600 underline text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </SectionWrapper>

      <CTASection
        heading="Have a Question Not Covered Here?"
        subtext="Book a consultation with Dr. Gurudeva for answers specific to your birth chart."
        primaryCTA={{ label: 'Book a Consultation', href: '/book' }}
        secondaryCTA={{ label: 'Browse Services', href: '/services' }}
      />
    </>
  );
}
