import { describe, it, expect } from 'vitest';
import {
  ESSENCE_ARCHETYPES,
  INTENTION_OUTCOMES,
  METALS,
  DIAMOND_SHAPES,
  COLLECTIONS,
  CATALOG_PRODUCTS,
} from './parissaData';

describe('ESSENCE_ARCHETYPES', () => {
  it('defines all 12 zodiac signs', () => {
    expect(Object.keys(ESSENCE_ARCHETYPES)).toHaveLength(12);
  });

  it('every archetype has a valid gem with colors and meaning', () => {
    for (const archetype of Object.values(ESSENCE_ARCHETYPES)) {
      expect(archetype.essenceGem.id).toBeTruthy();
      expect(archetype.essenceGem.name).toBeTruthy();
      expect(archetype.essenceGem.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(archetype.essenceGem.accentHex).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(archetype.essenceGem.meaning).toBeTruthy();
      expect(archetype.essenceGem.symbolism).toBeTruthy();
      expect(archetype.reading).toBeTruthy();
      expect(archetype.traits.length).toBeGreaterThan(0);
    }
  });

  it('sign key matches the sign field', () => {
    for (const [sign, archetype] of Object.entries(ESSENCE_ARCHETYPES)) {
      expect(archetype.sign).toBe(sign);
    }
  });
});

describe('INTENTION_OUTCOMES', () => {
  it('every outcome has a gem with mapping position', () => {
    for (const outcome of Object.values(INTENTION_OUTCOMES)) {
      expect(outcome.id).toBeTruthy();
      expect(outcome.title).toBeTruthy();
      expect(outcome.theme).toBeTruthy();
      expect(outcome.affirmation).toBeTruthy();
      expect(outcome.reading).toBeTruthy();
      expect(typeof outcome.gemMapPosition.x).toBe('number');
      expect(typeof outcome.gemMapPosition.y).toBe('number');
    }
  });
});

describe('METALS', () => {
  it('supports the four launch metals', () => {
    expect(Object.keys(METALS)).toEqual([
      '18k-yellow-gold',
      '18k-rose-gold',
      '18k-white-gold',
      'platinum',
    ]);
  });

  it('each metal has a valid hex color', () => {
    for (const metal of Object.values(METALS)) {
      expect(metal.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});

describe('DIAMOND_SHAPES', () => {
  it('contains the three launch shapes only', () => {
    expect(Object.keys(DIAMOND_SHAPES)).toEqual(['round', 'oval', 'marquise']);
  });
});

describe('COLLECTIONS', () => {
  it('contains the four confirmed collection names', () => {
    expect(Object.keys(COLLECTIONS)).toEqual([
      'The Constellation',
      'The Bezel',
      'The Nirun',
      'The Petite',
    ]);
  });
});

describe('CATALOG_PRODUCTS', () => {
  it('every product references valid shapes, collections and metals', () => {
    for (const product of CATALOG_PRODUCTS) {
      expect(DIAMOND_SHAPES[product.shape]).toBeDefined();
      expect(COLLECTIONS[product.collection]).toBeDefined();
      expect(METALS[product.metalDefault]).toBeDefined();
      expect(product.name).toBeTruthy();
      expect(product.description).toBeTruthy();
      expect(product.carat).toBeGreaterThan(0);
    }
  });

  it('product ids are unique', () => {
    const ids = CATALOG_PRODUCTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
