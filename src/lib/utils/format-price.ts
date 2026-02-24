/**
 * Convert price stored as integer pence to a formatted GBP string.
 * Returns "Free" when price is 0, null, or undefined.
 *
 * @example formatPrice(1050) => "£10.50"
 * @example formatPrice(0) => "Free"
 */
export function formatPrice(pence: number | null | undefined): string {
  if (pence === null || pence === undefined || pence === 0) {
    return "Free";
  }

  const pounds = pence / 100;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(pounds);
}

/**
 * Convert a pounds string or number to integer pence for storage.
 * Uses Math.round to avoid floating-point precision issues.
 *
 * @example priceToPence(10.50) => 1050
 * @example priceToPence("9.99") => 999
 */
export function priceToPence(pounds: number | string): number {
  const numericValue = typeof pounds === "string" ? parseFloat(pounds) : pounds;
  if (isNaN(numericValue) || numericValue < 0) return 0;
  return Math.round(numericValue * 100);
}

/**
 * Convert pence integer to pounds number.
 *
 * @example penceToPounds(1050) => 10.5
 */
export function penceToPounds(pence: number): number {
  return pence / 100;
}
