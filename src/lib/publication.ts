export const PUBLICATION_TIME_ZONE = "Europe/Paris";

/** Returns YYYY-MM-DD for an instant in the publication timezone. */
export function getPublicationDay(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: PUBLICATION_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

/** ISO publication dates become public at 00:00 in mainland France. */
export function isPublicationDateReached(date: string, now: Date = new Date()): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && date <= getPublicationDay(now);
}
