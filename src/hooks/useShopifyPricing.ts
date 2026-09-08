import { useEffect, useState } from 'react';
import { RingConfiguration } from '../types';
import { shopifyService } from '../services/shopifyIntegration';
import { formatMoney } from '../utils/price';
import { toJourneySelections } from '../utils/journey';

export interface ResolvedPrice {
  amount: number;
  currencyCode: string;
  label: string;
}

/**
 * Resolves real Shopify prices for a set of ring configurations.
 * Returns a map of config.id -> resolved price. When Shopify isn't
 * configured, returns an empty map (components fall back to price-on-request).
 */
export function useShopifyPricing(configs: RingConfiguration[]) {
  const [prices, setPrices] = useState<Record<string, ResolvedPrice>>({});

  useEffect(() => {
    if (!shopifyService.isConfigured() || configs.length === 0) {
      setPrices({});
      return;
    }

    let cancelled = false;

    (async () => {
      const next: Record<string, ResolvedPrice> = {};
      for (const config of configs) {
        const selections = toJourneySelections(config);
        const { matchedVariant } = await shopifyService.findProductForJourney(
          selections
        );
        if (!matchedVariant || cancelled) continue;

        const amount = parseFloat(matchedVariant.price.amount);
        next[config.id] = {
          amount,
          currencyCode: matchedVariant.price.currencyCode,
          label: formatMoney(amount, matchedVariant.price.currencyCode),
        };
      }
      if (!cancelled) setPrices(next);
    })();

    return () => {
      cancelled = true;
    };
  }, [configs]);

  return prices;
}
