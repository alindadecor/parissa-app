import { RingConfiguration } from '../types';
import { METALS } from '../data/parissaData';

/**
 * Returns the human-readable price for a ring configuration.
 * When a real numeric price was resolved from Shopify, formats it;
 * otherwise returns the price-on-request fallback.
 */
export function formatRingPrice(priceDisplay?: string): string {
  if (priceDisplay && priceDisplay !== 'Price on request') {
    return priceDisplay;
  }
  return 'Price on request';
}

/**
 * Formats a numeric Shopify amount into a display string using the currency.
 */
export function formatMoney(
  amount: string | number,
  currencyCode?: string
): string {
  const numeric = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (Number.isNaN(numeric)) return 'Price on request';

  const currency = currencyCode ?? 'AUD';
  try {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(numeric);
  } catch {
    return `${currency} ${numeric.toLocaleString('en-AU')}`;
  }
}

/**
 * Estimates a display price when the metal base price is known but the exact
 * variant price hasn't been fetched yet. Only used as a graceful fallback.
 */
export function buildPriceDisplay(
  carat: number,
  metal?: keyof typeof METALS,
  actualPrice?: string
): string {
  if (actualPrice) return actualPrice;
  return 'Price on request';
}
