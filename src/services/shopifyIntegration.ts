/**
 * PARISSA Fine Jewelry — Shopify Integration Boundary & Data Contracts
 * 
 * Source of Truth: Shopify Storefront / Admin Architecture
 * 
 * Architectural Directives:
 * 1. Shopify is the ultimate source of truth for:
 *    - Catalog Products, Titles, Descriptions, Handles
 *    - High-Resolution Product Media, Gallery, Alt Texts
 *    - Variants, SKUs, Inventory, Availability
 *    - Collections and Real Pricing / Currencies
 * 2. Journey logic remains pure and isolated from hardcoded product media/inventories.
 * 3. Journey outputs structured configuration attributes that are passed to Shopify
 *    either as line-item properties, custom attributes, or variant matching parameters.
 */

import {
  Hand,
  Finger,
  DiamondShape,
  CollectionName,
  MetalType,
  DiamondType,
  BandWidth,
  Gem,
  EssenceArchetype,
  IntentionOutcome,
} from '../types';

// =========================================================================
// 1. SHOPIFY DATA CONTRACTS (STOREFRONT API STANDARD)
// =========================================================================

export interface ShopifyImage {
  id: string;
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ShopifyMenuItem {
  title: string;
  url: string;
  resourceId?: string | null;
  items?: ShopifyMenuItem[];
}

export interface ShopifyMenu {
  id: string;
  title: string;
  items: ShopifyMenuItem[];
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney | null;
  selectedOptions: ShopifySelectedOption[];
  image?: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: 'PARISSA';
  productType: string;
  tags: string[];
  availableForSale: boolean;
  onlineStoreUrl?: string;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
  collections?: {
    id: string;
    handle: string;
    title: string;
  }[];
}

// =========================================================================
// 2. JOURNEY TO SHOPIFY ATTRIBUTE MAPPING
// =========================================================================

/**
 * Structured selections produced by the 5-step Journey.
 * This object does NOT invent products; it provides the exact parameters
 * to match or configure a Shopify Product & Cart Line Item.
 */
export interface JourneyStructuredSelections {
  // 01 Place & Shape
  place: {
    hand: Hand;
    finger: Finger;
  };
  shape: DiamondShape;

  // 02 Essence
  essence: {
    sign: string;
    archetypeTitle: string;
    essenceGem: Gem;
    birthData?: {
      date: string;
      city: string;
      time?: string;
      isExactTimeKnown: boolean;
    };
  };

  // 03 Intention
  intention: {
    outcomeId: string;
    outcomeTitle: string;
    intentionGem: Gem;
  };

  // 04 Craft
  craft: {
    collection: CollectionName;
    metal: MetalType;
    carat: number;
    diamondType: DiamondType;
    ringSize: number;
    bandWidth: BandWidth;
  };
}

/**
 * Shopify Line Item Properties (Custom Attributes)
 * Passed with the Cart item so the Melbourne Atelier receives full consecration data.
 */
export interface ShopifyJourneyLineItemProperties {
  '_parissa_hand': Hand;
  '_parissa_finger': Finger;
  '_parissa_diamond_shape': DiamondShape;
  '_parissa_collection': CollectionName;
  '_parissa_metal': MetalType;
  '_parissa_carat': string;
  '_parissa_diamond_type': DiamondType;
  '_parissa_ring_size': string;
  '_parissa_band_width': BandWidth;
  '_parissa_essence_gem': string;
  '_parissa_essence_archetype': string;
  '_parissa_intention_gem': string;
  '_parissa_intention_title': string;
  '_parissa_north_star_hallmark': 'engraved';
  '_parissa_birth_date'?: string;
  '_parissa_birth_city'?: string;
}

/**
 * Helper to convert Journey Structured Selections into Shopify Cart Line Item Properties
 */
export function mapJourneyToShopifyProperties(
  selections: JourneyStructuredSelections
): ShopifyJourneyLineItemProperties {
  const properties: ShopifyJourneyLineItemProperties = {
    '_parissa_hand': selections.place.hand,
    '_parissa_finger': selections.place.finger,
    '_parissa_diamond_shape': selections.shape,
    '_parissa_collection': selections.craft.collection,
    '_parissa_metal': selections.craft.metal,
    '_parissa_carat': `${selections.craft.carat.toFixed(1)} ct`,
    '_parissa_diamond_type': selections.craft.diamondType,
    '_parissa_ring_size': `US ${selections.craft.ringSize.toFixed(1)}`,
    '_parissa_band_width': selections.craft.bandWidth,
    '_parissa_essence_gem': selections.essence.essenceGem.name,
    '_parissa_essence_archetype': selections.essence.archetypeTitle,
    '_parissa_intention_gem': selections.intention.intentionGem.name,
    '_parissa_intention_title': selections.intention.outcomeTitle,
    '_parissa_north_star_hallmark': 'engraved',
  };

  if (selections.essence.birthData?.date) {
    properties['_parissa_birth_date'] = selections.essence.birthData.date;
  }
  if (selections.essence.birthData?.city) {
    properties['_parissa_birth_city'] = selections.essence.birthData.city;
  }

  return properties;
}

// =========================================================================
// 3. SHOPIFY STOREFRONT API CLIENT
// =========================================================================

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  descriptionHtml
  vendor
  productType
  tags
  availableForSale
  onlineStoreUrl
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  featuredImage {
    id
    url
    altText
    width
    height
  }
  images(first: 10) {
    nodes {
      id
      url
      altText
      width
      height
    }
  }
  variants(first: 50) {
    nodes {
      id
      title
      sku
      availableForSale
      price { amount currencyCode }
      compareAtPrice { amount currencyCode }
      selectedOptions { name value }
      image {
        id
        url
        altText
        width
        height
      }
    }
  }
`;

const MENU_QUERY = `
  query GetMenus {
    mainMenu: menu(handle: "main-menu") {
      id
      title
      items {
        title
        url
        resourceId
        items {
          title
          url
        }
      }
    }
    footerMenu: menu(handle: "footer") {
      id
      title
      items {
        title
        url
        resourceId
        items {
          title
          url
        }
      }
    }
  }
`;

function shopifyGraphql<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
  const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || '2025-01';

  if (!domain || !token) {
    return Promise.reject(new Error('Shopify credentials not configured'));
  }

  return fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
      return res.json();
    })
    .then((json) => {
      if (json.errors?.length) {
        throw new Error(json.errors[0].message);
      }
      return json.data as T;
    });
}

// =========================================================================
// 4. SERVICE IMPLEMENTATION
// =========================================================================

export interface IShopifyService {
  isConfigured(): boolean;
  fetchProducts(options?: { collectionHandle?: string; limit?: number }): Promise<ShopifyProduct[]>;
  getProducts(options?: { collectionHandle?: string; limit?: number }): Promise<ShopifyProduct[]>;
  fetchProductByHandle(handle: string): Promise<ShopifyProduct | null>;
  findProductForJourney(selections: JourneyStructuredSelections): Promise<{
    product: ShopifyProduct | null;
    matchedVariant: ShopifyProductVariant | null;
  }>;
  createCheckoutUrl(items: { variantId: string; quantity: number; properties: Record<string, string> }[]): Promise<string | null>;
  fetchMenus(): Promise<{ mainMenu: ShopifyMenu; footerMenu: ShopifyMenu } | null>;
}

function parseProduct(raw: any): ShopifyProduct {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    descriptionHtml: raw.descriptionHtml,
    vendor: raw.vendor,
    productType: raw.productType,
    tags: raw.tags,
    availableForSale: raw.availableForSale,
    onlineStoreUrl: raw.onlineStoreUrl,
    priceRange: raw.priceRange,
    featuredImage: raw.featuredImage,
    images: raw.images?.nodes ?? [],
    variants: raw.variants?.nodes?.map((v: any) => ({
      id: v.id,
      title: v.title,
      sku: v.sku,
      availableForSale: v.availableForSale,
      price: v.price,
      compareAtPrice: v.compareAtPrice,
      selectedOptions: v.selectedOptions,
      image: v.image,
    })) ?? [],
  };
}

export class ShopifyServiceBoundary implements IShopifyService {
  isConfigured(): boolean {
    return Boolean(
      import.meta.env.VITE_SHOPIFY_STORE_DOMAIN &&
      import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
    );
  }

  async fetchProducts(options?: { collectionHandle?: string; limit?: number }): Promise<ShopifyProduct[]> {
    if (!this.isConfigured()) return [];

    const limit = options?.limit ?? 20;

    if (options?.collectionHandle) {
      const data = await shopifyGraphql<{
        collectionByHandle: {
          products: { nodes: any[] };
        } | null;
      }>(
        `query ($handle: String!, $first: Int!) {
          collectionByHandle(handle: $handle) {
            products(first: $first) {
              nodes { ${PRODUCT_FIELDS} }
            }
          }
        }`,
        { handle: options.collectionHandle, first: limit }
      );
      return (data.collectionByHandle?.products.nodes ?? []).map(parseProduct);
    }

    const data = await shopifyGraphql<{
      products: { nodes: any[] };
    }>(
      `query ($first: Int!) {
        products(first: $first) {
          nodes { ${PRODUCT_FIELDS} }
        }
      }`,
      { first: limit }
    );
    return data.products.nodes.map(parseProduct);
  }

  async getProducts(options?: { collectionHandle?: string; limit?: number }): Promise<ShopifyProduct[]> {
    return this.fetchProducts(options);
  }

  async fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
    if (!this.isConfigured()) return null;

    const data = await shopifyGraphql<{
      productByHandle: any | null;
    }>(
      `query ($handle: String!) {
        productByHandle(handle: $handle) {
          ${PRODUCT_FIELDS}
        }
      }`,
      { handle }
    );

    return data.productByHandle ? parseProduct(data.productByHandle) : null;
  }

  async findProductForJourney(selections: JourneyStructuredSelections): Promise<{
    product: ShopifyProduct | null;
    matchedVariant: ShopifyProductVariant | null;
  }> {
    if (!this.isConfigured()) {
      return { product: null, matchedVariant: null };
    }

    // Search by collection handle derived from journey craft selection
    const collectionHandle = selections.craft.collection
      .toLowerCase()
      .replace(/^the\s+/, '')
      .replace(/\s+/g, '-');

    const products = await this.fetchProducts({ collectionHandle, limit: 50 });

    // Try to find a product matching the diamond shape
    const shapeLabel = selections.shape.charAt(0).toUpperCase() + selections.shape.slice(1);
    const match = products.find(
      (p) =>
        p.title.toLowerCase().includes(selections.shape) ||
        p.tags.some((t) => t.toLowerCase() === selections.shape)
    );

    if (!match) {
      return { product: null, matchedVariant: null };
    }

    // Try to match variant by metal type
    const metalLabel = selections.craft.metal
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const variant = match.variants.find(
      (v) =>
        v.selectedOptions.some(
          (o) => o.value.toLowerCase().includes(selections.craft.metal.split('-')[1])
        ) || v.title.toLowerCase().includes(metalLabel.toLowerCase())
    ) ?? match.variants[0] ?? null;

    return { product: match, matchedVariant: variant };
  }

  async fetchMenus(): Promise<{ mainMenu: ShopifyMenu; footerMenu: ShopifyMenu } | null> {
    if (!this.isConfigured()) return null;

    const data = await shopifyGraphql<{
      mainMenu: ShopifyMenu | null;
      footerMenu: ShopifyMenu | null;
    }>(MENU_QUERY);

    if (!data.mainMenu && !data.footerMenu) return null;

    return {
      mainMenu: data.mainMenu ?? { id: '', title: 'Main menu', items: [] },
      footerMenu: data.footerMenu ?? { id: '', title: 'Footer menu', items: [] },
    };
  }

  async createCheckoutUrl(
    items: { variantId: string; quantity: number; properties: Record<string, string> }[]
  ): Promise<string | null> {
    if (!this.isConfigured()) return null;

    const input = {
      lineItems: items.map((item) => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
        customAttributes: Object.entries(item.properties).map(([key, value]) => ({
          key,
          value,
        })),
      })),
    };

    const data = await shopifyGraphql<{
      cartCreate: {
        cart: { checkoutUrl: string };
        userErrors: { field: string; message: string }[];
      };
    }>(
      `mutation ($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }`,
      { input }
    );

    if (data.cartCreate.userErrors.length > 0) {
      throw new Error(data.cartCreate.userErrors[0].message);
    }

    return data.cartCreate.cart.checkoutUrl;
  }
}

export const shopifyService = new ShopifyServiceBoundary();
