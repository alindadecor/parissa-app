import { useCallback } from 'react';
import { RingConfiguration } from '../types';
import { shopifyService } from '../services/shopifyIntegration';
import { mapJourneyToShopifyProperties } from '../services/shopifyIntegration';
import { toJourneySelections } from '../utils/journey';

export interface CheckoutLineItem {
  variantId: string;
  quantity: number;
  properties: Record<string, string>;
}

/**
 * Builds Shopify cart line items from RingConfigurations.
 */
export function buildCheckoutLineItems(
  configs: RingConfiguration[]
): CheckoutLineItem[] {
  const lines: CheckoutLineItem[] = [];

  for (const config of configs) {
    const properties = mapJourneyToShopifyProperties(toJourneySelections(config));

    const plainProperties = Object.fromEntries(
      Object.entries(properties).map(([k, v]) => [k, String(v)])
    );

    lines.push({
      variantId: '',
      quantity: 1,
      properties: plainProperties,
    });
  }

  return lines;
}

/**
 * Resolves the best-fitting Shopify variant for each ring configuration and
 * returns the checkout URL via the Storefront cart API.
 */
export function useShopifyCheckout() {
  const isConfigured = shopifyService.isConfigured();

  const createCheckout = useCallback(
    async (configs: RingConfiguration[]): Promise<string | null> => {
      if (!shopifyService.isConfigured() || configs.length === 0) {
        return null;
      }

      const items: CheckoutLineItem[] = [];

      for (const config of configs) {
        const selections = toJourneySelections(config);
        const result = await shopifyService.findProductForJourney(selections);
        if (!result.product || !result.matchedVariant) {
          continue;
        }

        const properties = mapJourneyToShopifyProperties(selections);
        items.push({
          variantId: result.matchedVariant.id,
          quantity: 1,
          properties: Object.fromEntries(
            Object.entries(properties).map(([k, v]) => [k, String(v)])
          ),
        });
      }

      if (items.length === 0) {
        return null;
      }

      return shopifyService.createCheckoutUrl(items);
    },
    []
  );

  return { createCheckout, isConfigured };
}
