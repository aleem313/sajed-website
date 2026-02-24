/**
 * Format a Date as a relative time string.
 *
 * @example formatRelativeTime(new Date(Date.now() - 5000)) => "Just now"
 * @example formatRelativeTime(new Date(Date.now() - 300000)) => "5 minutes ago"
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format a Date for display, e.g. "24 Feb 2026"
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format a Date as "Member since February 2026"
 */
export function formatMemberSince(date: Date): string {
  return `Member since ${date.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  })}`;
}
