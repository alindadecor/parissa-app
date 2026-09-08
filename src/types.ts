/**
 * PARISSA Fine Jewelry — Type Definitions
 * Source of Truth: PARISSA Website Experience & UX Brief V2 + Asset Brief 03 Aug 2026
 */

export type Hand = 'left' | 'right';
export type Finger = 'ring' | 'index' | 'pinky' | 'middle'; // Strictly no Thumb

export type DiamondShape = 'round' | 'oval' | 'marquise'; // Launch shapes only

export type CollectionName = 
  | 'The Constellation' 
  | 'The Bezel' 
  | 'The Nirun' 
  | 'The Petite';

export type MetalType = 
  | '18k-yellow-gold' 
  | '18k-rose-gold' 
  | '18k-white-gold' 
  | 'platinum';

export type DiamondType = 'natural' | 'lab-grown';
export type BandWidth = 'delicate' | 'classic' | 'substantial';

export interface Gem {
  id: string;
  name: string;
  colorName: string;
  hex: string;
  accentHex: string;
  meaning: string;
  symbolism: string;
}

export type ZodiacSign = 
  | 'Aries' 
  | 'Taurus' 
  | 'Gemini' 
  | 'Cancer' 
  | 'Leo' 
  | 'Virgo' 
  | 'Libra' 
  | 'Scorpio' 
  | 'Sagittarius' 
  | 'Capricorn' 
  | 'Aquarius' 
  | 'Pisces';

export interface EssenceArchetype {
  sign: ZodiacSign;
  archetypeTitle: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  essenceGem: Gem;
  reading: string;
  coreLight: string;
  traits: string[];
}

export interface IntentionOutcome {
  id: string;
  title: string;
  theme: string;
  intentionGem: Gem;
  affirmation: string;
  reading: string;
  gemMapPosition: { x: number; y: number };
}

export interface IntentionOption {
  id: string;
  label: string;
  sublabel: string;
  // Hidden scoring vector mapping to intention outcome IDs
  scoringTarget: string;
}

export interface IntentionDimension {
  number: number;
  title: string;
  subtitle: string;
  prompt: string;
  options: IntentionOption[];
}

export interface RingConfiguration {
  id: string;
  title: string;
  hand: Hand;
  finger: Finger;
  shape: DiamondShape;
  collection: CollectionName;
  diamondType: DiamondType;
  carat: number;
  metal: MetalType;
  ringSize: number;
  bandWidth: BandWidth;
  essenceArchetype: EssenceArchetype;
  essenceGem: Gem;
  intentionOutcome: IntentionOutcome;
  intentionGem: Gem;
  birthData?: {
    date: string;
    city: string;
    time?: string;
    isExactTimeKnown: boolean;
  };
  savedAt: string;
  priceDisplay: string; // Formatted price, or 'Price on request' when unavailable
  leadTime: string;
}

export interface ProductListing {
  id: string;
  name: string;
  collection: CollectionName;
  shape: DiamondShape;
  subtitle: string;
  description: string;
  carat: number;
  metalDefault: MetalType;
  storyExcerpt: string;
  priceDisplay?: string;
}

export interface CartItem {
  id: string;
  storyTitle?: string;
  ringConfig: {
    shape: DiamondShape;
    metal: MetalType;
    carat: number;
    ringSize: number;
    place?: {
      hand: Hand;
      finger: Finger;
    };
    essenceGem?: Gem;
    intentionGem?: Gem;
  };
  priceDisplay: string;
}

export interface ParissaStory {
  id: string;
  storyTitle: string;
  createdAt: string;
  ringConfig: {
    shape: DiamondShape;
    metal: MetalType;
    carat: number;
    ringSize: number;
    place?: {
      hand: Hand;
      finger: Finger;
    };
  };
  essenceArchetype: EssenceArchetype;
  intentionOutcome: IntentionOutcome;
}

