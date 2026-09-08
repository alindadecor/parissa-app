import { useEffect, useState, useCallback } from 'react';
import { shopifyService, ShopifyProduct } from '../services/shopifyIntegration';
import { ProductListing, DiamondShape, CollectionName, MetalType } from '../types';

const SHAPE_TAGS: DiamondShape[] = ['round', 'oval', 'marquise'];
const COLLECTION_TAGS: Record<string, CollectionName> = {
  'the-constellation': 'The Constellation',
  'the-bezel': 'The Bezel',
  'the-nirun': 'The Nirun',
  'the-petite': 'The Petite',
};

function detectShape(tags: string[], title: string): DiamondShape {
  const lower = tags.map((t) => t.toLowerCase());
  for (const s of SHAPE_TAGS) if (lower.includes(s)) return s;

  const tl = title.toLowerCase();
  if (tl.includes('oval')) return 'oval';
  if (tl.includes('marquise')) return 'marquise';
  return 'round';
}

function detectCollection(tags: string[]): CollectionName {
  const lower = tags.map((t) => t.toLowerCase());
  for (const [key, name] of Object.entries(COLLECTION_TAGS)) {
    if (lower.includes(key)) return name;
  }
  return 'The Constellation';
}

function defaultMetal(tags: string[]): MetalType {
  const lower = tags.map((t) => t.toLowerCase());
  if (lower.includes('rose') || lower.includes('rose-gold')) return '18k-rose-gold';
  if (lower.includes('white') || lower.includes('white-gold')) return '18k-white-gold';
  if (lower.includes('platinum')) return 'platinum';
  return '18k-yellow-gold';
}

/**
 * Maps a Shopify product into the storefront ProductListing shape used by the
 * Explore/PDP views. Because Shopify does not currently expose carat or metal
 * options, these default to representative values.
 */
export function toProductListing(
  p: ShopifyProduct,
  fallbackCarat = 1.0
): ProductListing {
  const shape = detectShape(p.tags, p.title);
  const collection = detectCollection(p.tags);
  const metalDefault = defaultMetal(p.tags);

  const variantPrice = p.variants.find(
    (v) => v.price && parseFloat(v.price.amount) > 0
  );
  const priceDisplay = variantPrice
    ? `${parseFloat(variantPrice.price.amount).toLocaleString('en-AU', {
        style: 'currency',
        currency: variantPrice.price.currencyCode,
        maximumFractionDigits: 0,
      })}`
    : 'Price on request';

  return {
    id: p.id,
    name: p.title,
    collection,
    shape,
    subtitle: collection,
    description: p.description || 'Available in PARISSA fine jewelry.',
    carat: fallbackCarat,
    metalDefault,
    storyExcerpt: p.description || '',
    priceDisplay,
  };
}

/**
 * Loads the product catalog from Shopify. Falls back to an empty list when
 * the Storefront API isn't configured.
 */
export function useShopifyProducts(options?: { limit?: number }) {
  const [products, setProducts] = useState<ProductListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!shopifyService.isConfigured()) {
      setProducts([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const raw = await shopifyService.getProducts({ limit: options?.limit ?? 50 });
      setProducts(raw.map((p) => toProductListing(p)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [options?.limit]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { products, loading, error, refresh };
}
