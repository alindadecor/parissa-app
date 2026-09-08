import React from 'react';
import { useShopifyPricing } from '../hooks/useShopifyPricing';
import { RingConfiguration } from '../types';
import { formatMoney, formatRingPrice } from '../utils/price';

interface PriceDisplayProps {
  amount?: string | number;
  currencyCode?: string;
  config?: RingConfiguration;
  fallbackText?: string;
  className?: string;
}

/**
 * Renders a ring's price. When a real Shopify price is available, shows it via
 * Intl currency formatting; otherwise shows 'Price on request'.
 *
 * Usage:
 *   <PriceDisplay amount={product.priceRange.minVariantPrice.amount}
 *                 currencyCode={product.priceRange.minVariantPrice.currencyCode} />
 *   <PriceDisplay config={ringConfig} />
 */
export function PriceDisplay({
  amount,
  currencyCode,
  config,
  fallbackText = 'Price on request',
  className,
}: PriceDisplayProps) {
  // Explicit amount + currency takes priority.
  if (amount !== undefined && amount !== null && String(amount).length > 0) {
    const numeric = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (!Number.isNaN(numeric) && numeric > 0) {
      return <span className={className}>{formatMoney(numeric, currencyCode)}</span>;
    }
  }

  return (
    <ConfigPrice config={config} fallbackText={fallbackText} className={className} />
  );
}

function ConfigPrice({
  config,
  fallbackText,
  className,
}: {
  config?: RingConfiguration;
  fallbackText: string;
  className?: string;
}) {
  // Hooks must run unconditionally, so compute for a possibly-null config.
  const configs = config ? [config] : [];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const prices = useShopifyPricing(configs);

  if (config) {
    const price = prices[config.id];
    if (price) {
      return <span className={className}>{price.label}</span>;
    }

    const existing = formatRingPrice(config.priceDisplay);
    if (!existing.startsWith('Price on request')) {
      return <span className={className}>{existing}</span>;
    }
  }

  return <span className={className}>{fallbackText}</span>;
}
