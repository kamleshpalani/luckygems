import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { ICON_MAP } from '../../utils/iconMap';

export default function RelatedServices({ slugs = [], currentSlug }) {
  const related = slugs
    .filter((s) => s !== currentSlug)
    .map((s) => SERVICES.find((srv) => srv.slug === s))
    .filter(Boolean)
    .slice(0, 3);

  if (!related.length) return null;

  return (
    <div>
      <h3 className="font-serif text-lg text-stone-900 mb-4">Related Services</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {related.map((srv) => {
          const Icon = ICON_MAP[srv.icon] || ICON_MAP.Star;
          return (
            <Link
              key={srv.slug}
              to={`/services/${srv.slug}`}
              className="card p-4 flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-maroon-50 flex items-center justify-center flex-shrink-0 group-hover:bg-maroon-100 transition-colors">
                <Icon size={16} className="text-maroon-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-800 group-hover:text-maroon-600 transition-colors truncate">
                  {srv.title}
                </p>
              </div>
              <ArrowRight size={14} className="text-stone-300 group-hover:text-maroon-400 flex-shrink-0 transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
