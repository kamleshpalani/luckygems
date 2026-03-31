import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_NAME = "Gurudev Astrology – Vedic Astrologer | Dr. Gurudeva";
const SITE_URL = "https://www.luckygemfinder.com";

/**
 * SEO meta tag component.
 * Usage: <SEO title="..." description="..." canonical="/path" />
 */
export default function SEO({
  title,
  description,
  canonical,
  ogImage = "/og-default.jpg",
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} | Dr. Gurudeva – Vedic Astrologer`
    : SITE_NAME;

  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Gurudev Astrology" />
      <meta property="og:image" content={`${SITE_URL}${ogImage}`} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={`${SITE_URL}${ogImage}`} />

      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
}
