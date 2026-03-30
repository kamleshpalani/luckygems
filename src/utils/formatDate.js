/**
 * Format an ISO date string or "Month DD, YYYY" string to a readable format
 * @param {string} dateStr
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string}
 */
export function formatDate(dateStr, options = { year: 'numeric', month: 'long', day: 'numeric' }) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr; // return as-is if unparseable
    return date.toLocaleDateString('en-US', options);
  } catch {
    return dateStr;
  }
}

/**
 * Format a date to short format: "Jan 15, 2024"
 */
export function formatDateShort(dateStr) {
  return formatDate(dateStr, { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * Return relative time string: "3 days ago", "2 months ago"
 */
export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return 'Today';
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 13) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
}
