import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionWrapper from '../components/common/SectionWrapper';
import ArticleCard from '../components/blog/ArticleCard';
import CTASection from '../components/common/CTASection';
import Breadcrumbs from '../components/common/Breadcrumbs';
import NotFoundPage from './NotFoundPage';
import { getArticleBySlug, ARTICLES } from '../data/articles';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) return <NotFoundPage />;

  const related = ARTICLES.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 3);

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        canonical={`/articles/${article.slug}`}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-8 md:py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: 'Articles', path: '/articles' }, { label: article.title, path: `/articles/${article.slug}` }]} />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4"
          >
            <span className="badge badge-gold mb-4 inline-flex">{article.category}</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-4">{article.title}</h1>
            <p className="text-stone-300 text-lg leading-relaxed mb-6">{article.excerpt}</p>
            <div className="flex flex-wrap items-center gap-5 text-stone-400 text-sm">
              <span className="flex items-center gap-1.5"><Calendar size={13} /> {article.publishDate}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} /> {article.readTime} read</span>
              <span className="flex items-center gap-1.5"><Tag size={13} /> {article.category}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-stone prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-stone-900
              prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-stone-600 prose-p:leading-relaxed
              prose-li:text-stone-600
              prose-strong:text-stone-800
              prose-a:text-maroon-600 hover:prose-a:text-maroon-800"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }}
          />
          <div className="mt-10 pt-6 border-t border-stone-200 flex items-center justify-between">
            <Link to="/articles" className="flex items-center gap-2 text-maroon-600 hover:text-maroon-800 text-sm font-medium transition-colors">
              <ArrowLeft size={15} /> Back to Articles
            </Link>
            <span className="text-stone-400 text-sm">Published: {article.publishDate}</span>
          </div>
        </div>
      </SectionWrapper>

      {/* Related */}
      {related.length > 0 && (
        <SectionWrapper variant="ivory">
          <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-6">More from {article.category}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>
        </SectionWrapper>
      )}

      <CTASection
        heading="Apply This Knowledge to Your Chart"
        subtext="Book a consultation with Dr. Gurudeva to see how these insights apply to your specific horoscope."
      />
    </>
  );
}
