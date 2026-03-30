import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs component.
 * crumbs: [{label, path}]  – last item is current page (no link needed)
 */
export default function Breadcrumbs({ crumbs = [] }) {
  const all = [{ label: 'Home', path: '/' }, ...crumbs];

  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {all.map((crumb, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1">
              {i === 0 && <Home size={13} className="text-stone-400" />}
              {isLast ? (
                <span className="text-stone-500 font-medium truncate max-w-[160px]" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-stone-400 hover:text-maroon-600 transition-colors truncate max-w-[120px]"
                >
                  {crumb.label}
                </Link>
              )}
              {!isLast && <ChevronRight size={13} className="text-stone-300 flex-shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
