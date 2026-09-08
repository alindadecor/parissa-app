import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  mapJourneyToShopifyProperties,
  JourneyStructuredSelections,
  ShopifyServiceBoundary,
} from '../services/shopifyIntegration';
import { ESSENCE_ARCHETYPES, INTENTION_OUTCOMES } from '../data/parissaData';

function makeSelections(overrides?: Partial<JourneyStructuredSelections>): JourneyStructuredSelections {
  return {
    place: { hand: 'left', finger: 'ring' },
    shape: 'oval',
    essence: {
      sign: 'Leo',
      archetypeTitle: 'The Leader',
      essenceGem: ESSENCE_ARCHETYPES.Leo.essenceGem,
      birthData: {
        date: '1995-08-14',
        city: 'Melbourne, Australia',
        time: '06:45',
        isExactTimeKnown: true,
      },
    },
    intention: {
      outcomeId: 'emerald_sovereignty',
      outcomeTitle: INTENTION_OUTCOMES.emerald_sovereignty.title,
      intentionGem: INTENTION_OUTCOMES.emerald_sovereignty.intentionGem,
    },
    craft: {
      collection: 'The Constellation',
      metal: '18k-yellow-gold',
      carat: 1.5,
      diamondType: 'natural',
      ringSize: 6.5,
      bandWidth: 'classic',
    },
    ...overrides,
  };
}

describe('mapJourneyToShopifyProperties', () => {
  it('maps craft selections to line-item properties', () => {
    const props = mapJourneyToShopifyProperties(makeSelections());

    expect(props._parissa_hand).toBe('left');
    expect(props._parissa_finger).toBe('ring');
    expect(props._parissa_diamond_shape).toBe('oval');
    expect(props._parissa_collection).toBe('The Constellation');
    expect(props._parissa_metal).toBe('18k-yellow-gold');
    expect(props._parissa_carat).toBe('1.5 ct');
    expect(props._parissa_ring_size).toBe('US 6.5');
    expect(props._parissa_diamond_type).toBe('natural');
    expect(props._parissa_band_width).toBe('classic');
    expect(props._parissa_birth_date).toBe('1995-08-14');
    expect(props._parissa_birth_city).toBe('Melbourne, Australia');
    expect(props._parissa_north_star_hallmark).toBe('engraved');
  });

  it('maps essence and intention gems by name', () => {
    const props = mapJourneyToShopifyProperties(makeSelections());

    expect(props._parissa_essence_gem).toBe('Golden Sapphire');
    expect(props._parissa_intention_gem).toBe(
      INTENTION_OUTCOMES.emerald_sovereignty.intentionGem.name
    );
    expect(props._parissa_essence_archetype).toBe('The Leader');
    expect(props._parissa_intention_title).toBe(
      INTENTION_OUTCOMES.emerald_sovereignty.title
    );
  });

  it('omits optional birth properties when birthData is absent', () => {
    const selections = makeSelections();
    delete selections.essence.birthData;
    const props = mapJourneyToShopifyProperties(selections);

    expect(props._parissa_birth_date).toBeUndefined();
    expect(props._parissa_birth_city).toBeUndefined();
  });

  it('formats carat to one decimal regardless of input', () => {
    const props = mapJourneyToShopifyProperties(
      makeSelections({ craft: { ...makeSelections().craft, carat: 2 } })
    );
    expect(props._parissa_carat).toBe('2.0 ct');
  });
});

describe('ShopifyServiceBoundary', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_SHOPIFY_STORE_DOMAIN', '');
    vi.stubEnv('VITE_SHOPIFY_STOREFRONT_TOKEN', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });
  it('reports not configured when env is missing', () => {
    const service = new ShopifyServiceBoundary();
    expect(service.isConfigured()).toBe(false);
  });

  it('returns empty products when not configured', async () => {
    const service = new ShopifyServiceBoundary();
    await expect(service.fetchProducts()).resolves.toEqual([]);
    await expect(service.fetchProductByHandle('foo')).resolves.toBeNull();
  });

  it('returns null journey match when not configured', async () => {
    const service = new ShopifyServiceBoundary();
    const result = await service.findProductForJourney(makeSelections());
    expect(result).toEqual({ product: null, matchedVariant: null });
  });

  it('returns null checkout URL when not configured', async () => {
    const service = new ShopifyServiceBoundary();
    await expect(
      service.createCheckoutUrl([{ variantId: 'gid://', quantity: 1, properties: {} }])
    ).resolves.toBeNull();
  });
});
