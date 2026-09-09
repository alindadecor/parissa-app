import { useEffect, useState } from 'react';
import { shopifyService, ShopifyProduct, ShopifyProductVariant } from '../services/shopifyIntegration';
import { MetalType } from '../types';

export interface MetalOption {
  label: string;
  subtitle: string;
  swatchColor: string;
  variantId: string;
  imageUrl?: string;
  availableForSale: boolean;
}

export const METAL_COLORS: Record<string, string> = {
  '18K Yellow Gold': '#D4AF37',
  '18K Rose Gold': '#E8A598',
  '18K White Gold': '#E8E8E8',
  'Platinum 950': '#C0BEC0',
};

export const METAL_META: Record<string, { subtitle: string; description: string }> = {
  '18K Yellow Gold': {
    subtitle: 'GOLDEN HOUR · WARM & CLASSIC',
    description: 'Rich, buttery honey warmth that deepens with wear and time.',
  },
  '18K Rose Gold': {
    subtitle: 'SUNSET BLUSH · ROMANTIC & MODERN',
    description: 'Soft blush-pink gold flattering all undertones with gentle warmth.',
  },
  '18K White Gold': {
    subtitle: 'MOONLIGHT · CLEAN & MIRRORED',
    description: 'Luminous rhodium-plated white gold with contemporary crisp brilliance.',
  },
  'Platinum 950': {
    subtitle: 'PURE CELESTIAL PERMANENCE',
    description: 'Dense, naturally white 85% platinum developing a noble heirloom patina.',
  },
};

export const LABEL_TO_SLUG: Record<string, MetalType> = {
  '18K Yellow Gold': '18k-yellow-gold',
  '18K Rose Gold': '18k-rose-gold',
  '18K White Gold': '18k-white-gold',
  'Platinum 950': 'platinum',
};

function extractMetalLabel(variant: ShopifyProductVariant): string | null {
  const option = variant.selectedOptions.find((o) => o.name === 'Metal Type' || o.name === 'Metal');
  const raw = option?.value || variant.title || '';
  const lower = raw.trim().toLowerCase();
  if (lower.includes('platinum')) return 'Platinum 950';
  if (lower.includes('rose')) return '18K Rose Gold';
  if (lower.includes('white')) return '18K White Gold';
  if (lower.includes('yellow') || lower.includes('gold')) return '18K Yellow Gold';
  return null;
}

function matchesShape(product: ShopifyProduct, shape?: string): boolean {
  if (!shape) return true;
  const target = shape.toLowerCase().trim();
  if (!target) return true;
  const title = product.title.toLowerCase();
  const tags = product.tags.map((t) => t.toLowerCase());
  return title.includes(target) || tags.some((t) => t.includes(target));
}

export function getImageForMetal(metals: MetalOption[], label: string): string | null {
  const match = metals.find((m) => m.label === label);
  if (match?.imageUrl) return match.imageUrl;
  const firstImage = metals.map((m) => m.imageUrl).find(Boolean);
  return firstImage ?? null;
}

export function useCollectionVariants(
  collectionHandle: string,
  shape?: string
): { metals: MetalOption[]; loading: boolean; error: string | null } {
  const [metals, setMetals] = useState<MetalOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setMetals([]);

    if (!collectionHandle) {
      setLoading(false);
      return;
    }

    shopifyService
      .getProducts({ collectionHandle, limit: 50 })
      .then((products) => {
        if (cancelled) return;
        const matched = products.filter((p) => matchesShape(p, shape));
        const seen = new Set<string>();
        const result: MetalOption[] = [];
        for (const product of matched) {
          for (const variant of product.variants) {
            const label = extractMetalLabel(variant);
            if (!label || seen.has(label)) continue;
            seen.add(label);
            result.push({
              label,
              subtitle: METAL_META[label]?.subtitle || label.toUpperCase(),
              swatchColor: METAL_COLORS[label] || '#B7A98F',
              variantId: variant.id,
              imageUrl: variant.image?.url || undefined,
              availableForSale: variant.availableForSale,
            });
          }
        }
        if (!cancelled) setMetals(result);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load variants');
        setMetals([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [collectionHandle, shape]);

  return { metals, loading, error };
}
