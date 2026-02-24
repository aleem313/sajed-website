/**
 * UK postcode regex covering all valid formats:
 *   A1 1AA, A11 1AA, AA1 1AA, AA11 1AA, A1A 1AA, AA1A 1AA
 * Also accepts the special GIR 0AA postcode and postcodes without spaces.
 */
const UK_POSTCODE_REGEX =
  /^([Gg][Ii][Rr]\s?0[Aa]{2})|([A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2})$/;

/**
 * Validates a UK postcode string.
 */
export function validatePostcode(postcode: string): boolean {
  return UK_POSTCODE_REGEX.test(postcode.trim());
}

/**
 * Normalize UK postcode: remove all spaces, convert to uppercase.
 * Used for database lookups and comparison.
 *
 * @example normalizePostcode("sw1a 1aa") => "SW1A1AA"
 */
export function normalizePostcode(postcode: string): string {
  return postcode.replace(/\s+/g, "").toUpperCase();
}

/**
 * Format UK postcode for display: uppercase with single space before inward code.
 * The inward code is always the last 3 characters.
 *
 * @example formatPostcode("sw1a1aa") => "SW1A 1AA"
 * @example formatPostcode("M1 1AA") => "M1 1AA"
 */
export function formatPostcode(postcode: string): string {
  const cleaned = normalizePostcode(postcode);
  if (cleaned.length < 5) return cleaned;
  const outward = cleaned.slice(0, -3);
  const inward = cleaned.slice(-3);
  return `${outward} ${inward}`;
}
