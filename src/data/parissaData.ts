/**
 * PARISSA Data Repository
 * Strict compliance with PARISSA Website Experience & UX Brief V2 and Asset Brief 03 Aug 2026.
 * "Three shapes are enough - when the journey is the product."
 * "This is a mirror, not a prediction."
 */

import {
  EssenceArchetype,
  IntentionOutcome,
  IntentionDimension,
  CollectionName,
  DiamondShape,
  MetalType,
  ZodiacSign,
  ProductListing,
} from '../types';

// =========================================================================
// 12 APPROVED ESSENCE ARCHETYPES & GEMS (Source: Brief V2 Page 10)
// =========================================================================
export const ESSENCE_ARCHETYPES: Record<ZodiacSign, EssenceArchetype> = {
  Leo: {
    sign: 'Leo',
    archetypeTitle: 'The Leader',
    element: 'Fire',
    coreLight: 'Radiant confidence and natural, generous presence.',
    traits: ['Warmth', 'Presence', 'Natural instinct to lead', 'Generous spirit'],
    essenceGem: {
      id: 'gem-golden-sapphire',
      name: 'Golden Sapphire',
      colorName: 'Royal Amber Solar',
      hex: '#D4AF37',
      accentHex: '#F3E5AB',
      meaning: 'Radiant confidence, heart-centered leadership, and solar joy.',
      symbolism: 'Reflects the confidence and warmth you already carry.',
    },
    reading:
      "You carry a natural presence that inspires and uplifts. Your light is bold yet warm, and you attract people through your authenticity. You're here to create, to lead, and to leave things brighter than you found them.",
  },
  Aries: {
    sign: 'Aries',
    archetypeTitle: 'The Pioneer',
    element: 'Fire',
    coreLight: 'Forward courage and sovereign pioneering momentum.',
    traits: ['Courageous', 'Pioneering', 'Direct', 'Unshakable'],
    essenceGem: {
      id: 'gem-ruby',
      name: 'Ruby',
      colorName: 'Deep Crimson',
      hex: '#9E1B32',
      accentHex: '#E25865',
      meaning: 'Forward courage, sovereign vitality, and primal heart hearth.',
      symbolism: 'Grounds your inner fire into quiet, decisive action.',
    },
    reading: 'You meet the world with clear forward motion. You arrive at beginnings without hesitation, carrying the heat of conviction that inspires new horizons.',
  },
  Virgo: {
    sign: 'Virgo',
    archetypeTitle: 'The Sage',
    element: 'Earth',
    coreLight: 'Discernment, clarity, and refined devotion to truth.',
    traits: ['Discerning', 'Luminous', 'Mindful', 'Devoted'],
    essenceGem: {
      id: 'gem-white-sapphire',
      name: 'White Sapphire',
      colorName: 'Prismatic Celestial White',
      hex: '#E8EDF5',
      accentHex: '#FFFFFF',
      meaning: 'Discernment and clarity, crystalline perception, and sacred order.',
      symbolism: 'Pure optical truth reflecting what endures beneath the surface.',
    },
    reading: 'You meet the world with quiet discernment. You notice what is essential where others see noise, refining complexity into serene, lasting beauty.',
  },
  Cancer: {
    sign: 'Cancer',
    archetypeTitle: 'The Guardian',
    element: 'Water',
    coreLight: 'Loyal steadiness, intuitive sanctuary, and tender depth.',
    traits: ['Steadfast', 'Intuitive', 'Protective', 'Tender'],
    essenceGem: {
      id: 'gem-blue-sapphire-cancer',
      name: 'Blue Sapphire',
      colorName: 'Deep Cerulean Sanctuary',
      hex: '#1E3A8A',
      accentHex: '#60A5FA',
      meaning: 'Loyal steadiness, deep intuition, and unbreakable devotion.',
      symbolism: 'The deep calm ocean holding space for true feeling.',
    },
    reading: 'You meet the world with deep intuitive steadiness. Your sanctuary is sacred, and your loyalty creates a sheltering harbor for those you love.',
  },
  Taurus: {
    sign: 'Taurus',
    archetypeTitle: 'The Creator',
    element: 'Earth',
    coreLight: 'Grounded creation, sensory patience, and timeless endurance.',
    traits: ['Grounded', 'Architectural', 'Sensual', 'Enduring'],
    essenceGem: {
      id: 'gem-green-sapphire',
      name: 'Green Sapphire',
      colorName: 'Rich Meadow Earth',
      hex: '#2E5A44',
      accentHex: '#4E8C6C',
      meaning: 'Grounded creation, organic rhythm, and patient blossoming.',
      symbolism: 'Roots drinking deep from the earth, flourishing in due season.',
    },
    reading: 'You meet the world with grounded elegance. You do not rush what is meant to endure, bringing patience, beauty, and physical grace into everything you touch.',
  },
  Gemini: {
    sign: 'Gemini',
    archetypeTitle: 'The Communicator',
    element: 'Air',
    coreLight: 'Clear expression, curiosity, and nimble bridges of light.',
    traits: ['Expressive', 'Curious', 'Fluid', 'Illuminating'],
    essenceGem: {
      id: 'gem-aquamarine-gemini',
      name: 'Aquamarine',
      colorName: 'Crystalline Cyan Sky',
      hex: '#5B92A5',
      accentHex: '#9AD1E5',
      meaning: 'Clear expression, fluid communication, and crystalline wit.',
      symbolism: 'Dissolves hesitation into effortless and honest dialogue.',
    },
    reading: 'You meet the world with nimble curiosity and clear expression. Your mind weaves connection across divides, illuminating multiple truths with lighthearted grace.',
  },
  Libra: {
    sign: 'Libra',
    archetypeTitle: 'The Lover',
    element: 'Air',
    coreLight: 'Harmony, connection, and elevated relational sight.',
    traits: ['Harmonious', 'Poetic', 'Graceful', 'Heart-centered'],
    essenceGem: {
      id: 'gem-pink-sapphire',
      name: 'Pink Sapphire',
      colorName: 'Blush Dawn Rose',
      hex: '#D86B8C',
      accentHex: '#F6B7CE',
      meaning: 'Harmony and connection, relational poise, and tender truth.',
      symbolism: 'The open heart that has transmuted vulnerability into poise.',
    },
    reading: 'You meet the world with aesthetic grace and profound care for harmony. You seek symmetry not to avoid friction, but because beauty is your moral compass.',
  },
  Scorpio: {
    sign: 'Scorpio',
    archetypeTitle: 'The Transformer',
    element: 'Water',
    coreLight: 'Renewal, inner strength, and truth held under pressure.',
    traits: ['Alchemical', 'Intense', 'Resilient', 'Fierce'],
    essenceGem: {
      id: 'gem-red-spinel',
      name: 'Red Spinel',
      colorName: 'Midnight Velvet Fire',
      hex: '#7A1C2C',
      accentHex: '#B23A4E',
      meaning: 'Renewal and inner strength, fearless rebirth, and deep magnetism.',
      symbolism: 'Tempered by pressure to emerge brilliant and unbreakable.',
    },
    reading: 'You meet the world with penetrating depth and alchemical strength. You are unafraid of transition, knowing that every ending carries the seed of magnificent rebirth.',
  },
  Sagittarius: {
    sign: 'Sagittarius',
    archetypeTitle: 'The Explorer',
    element: 'Fire',
    coreLight: 'Freedom, direction, and philosophical expansive vision.',
    traits: ['Visionary', 'Untamed', 'Optimistic', 'Directional'],
    essenceGem: {
      id: 'gem-teal-sapphire',
      name: 'Teal Sapphire',
      colorName: 'Ocean Twilight Teal',
      hex: '#1E6B7B',
      accentHex: '#4E9CAE',
      meaning: 'Freedom and direction, wide horizons, and untethered vision.',
      symbolism: 'The arrow aimed at distant stars, unswayed by doubt.',
    },
    reading: 'You meet the world with boundless optimism and clear direction. You remind the world that horizons are meant to be crossed and truth is an open-ended adventure.',
  },
  Capricorn: {
    sign: 'Capricorn',
    archetypeTitle: 'The Builder',
    element: 'Earth',
    coreLight: 'Discipline, resilience, and building what outlasts the seasons.',
    traits: ['Masterful', 'Patient', 'Principled', 'Resilient'],
    essenceGem: {
      id: 'gem-black-spinel',
      name: 'Black Spinel',
      colorName: 'Midnight Obsidian Satin',
      hex: '#1F2421',
      accentHex: '#3D4440',
      meaning: 'Discipline and resilience, quiet mastery, and ancestral permanence.',
      symbolism: 'Dense noble stone standing calm amidst shifting sands.',
    },
    reading: 'You meet the world with quiet integrity and ancestral resilience. You build what endures, holding standards of mastery that command quiet respect.',
  },
  Aquarius: {
    sign: 'Aquarius',
    archetypeTitle: 'The Visionary',
    element: 'Air',
    coreLight: 'Originality, perspective, and humane collective foresight.',
    traits: ['Innovative', 'Independent', 'Foresighted', 'Sovereign'],
    essenceGem: {
      id: 'gem-violet-sapphire',
      name: 'Violet Sapphire',
      colorName: 'Celestial Twilight Violet',
      hex: '#5E4B8B',
      accentHex: '#9381BF',
      meaning: 'Originality and perspective, visionary breakthroughs, and liberated spirit.',
      symbolism: 'The rare bridge between independent sight and higher vision.',
    },
    reading: 'You meet the world from the vantage of tomorrow. You carry an original perspective that questions tired traditions and opens doors to new possibilities.',
  },
  Pisces: {
    sign: 'Pisces',
    archetypeTitle: 'The Dreamer',
    element: 'Water',
    coreLight: 'Intuition, flow, and oceanic empathy.',
    traits: ['Receptive', 'Poetic', 'Compassionate', 'Fluid'],
    essenceGem: {
      id: 'gem-aquamarine-pisces',
      name: 'Aquamarine',
      colorName: 'Glacial Morning Tide',
      hex: '#549F98',
      accentHex: '#A2DBD7',
      meaning: 'Intuition and flow, gentle surrender, and boundless empathy.',
      symbolism: 'Smooth waters yielding to life, carrying quiet transcendent peace.',
    },
    reading: 'You meet the world with intuitive softness and compassionate sight. You listen to what remains unsaid, transmuting the weight of the world into quiet grace.',
  },
};

export interface ZodiacSignMeta {
  sign: ZodiacSign;
  glyph: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  pillars: string;
  archetypeLabel: string;
  traitsFormatted: string;
  gemTagline: string;
  gemDescription: string;
}

export const ZODIAC_METADATA: Record<ZodiacSign, ZodiacSignMeta> = {
  Leo: {
    sign: 'Leo',
    glyph: '♌',
    element: 'Fire',
    pillars: 'FIRE · COURAGE · CREATIVITY · PURPOSE',
    archetypeLabel: 'THE LEADER',
    traitsFormatted: 'CONFIDENT / RADIANT / VISIONARY',
    gemTagline: 'LIGHTS YOUR INNER FIRE',
    gemDescription:
      'A stone of confidence, clarity and creative power. Golden Sapphire helps you stay true to your path and shine with purpose.',
  },
  Aries: {
    sign: 'Aries',
    glyph: '♈',
    element: 'Fire',
    pillars: 'FIRE · COURAGE · VITALITY · MOMENTUM',
    archetypeLabel: 'THE PIONEER',
    traitsFormatted: 'COURAGEOUS / DIRECT / UNSHAKABLE',
    gemTagline: 'KINDLES YOUR FORWARD COURAGE',
    gemDescription:
      'A stone of sovereign vitality and primal fire. Ruby grounds your courage into quiet, decisive action and anchors your inner momentum.',
  },
  Taurus: {
    sign: 'Taurus',
    glyph: '♉',
    element: 'Earth',
    pillars: 'EARTH · PATIENCE · HARMONY · GROUNDING',
    archetypeLabel: 'THE CREATOR',
    traitsFormatted: 'GROUNDED / SENSORY / ENDURING',
    gemTagline: 'ANCHORS TIMELESS ELEGANCE',
    gemDescription:
      'A stone of grounded creation, organic rhythm and patient blossoming. Green Sapphire reminds you that true elegance takes deep roots.',
  },
  Gemini: {
    sign: 'Gemini',
    glyph: '♊',
    element: 'Air',
    pillars: 'AIR · CURIOSITY · EXPRESSION · WIT',
    archetypeLabel: 'THE COMMUNICATOR',
    traitsFormatted: 'EXPRESSIVE / CURIOUS / FLUID',
    gemTagline: 'ILLUMINATES YOUR VOICE',
    gemDescription:
      'A crystalline stone of clear expression and fluid wit. Aquamarine dissolves hesitation into effortless and honest dialogue.',
  },
  Cancer: {
    sign: 'Cancer',
    glyph: '♋',
    element: 'Water',
    pillars: 'WATER · INTUITION · SANCTUARY · DEVOTION',
    archetypeLabel: 'THE GUARDIAN',
    traitsFormatted: 'STEADFAST / INTUITIVE / PROTECTIVE',
    gemTagline: 'SHELTERS YOUR SACRED HEARTH',
    gemDescription:
      'A stone of deep intuitive steadiness, emotional sanctuary and loyalty. Blue Sapphire holds space for genuine truth and inner peace.',
  },
  Virgo: {
    sign: 'Virgo',
    glyph: '♍',
    element: 'Earth',
    pillars: 'EARTH · DISCERNMENT · CLARITY · DEVOTION',
    archetypeLabel: 'THE SAGE',
    traitsFormatted: 'DISCERNING / LUMINOUS / DEVOTED',
    gemTagline: 'CRYSTALLISES SACRED ORDER',
    gemDescription:
      'A stone of discernment, optical truth and sacred focus. White Sapphire strips away distractions to reveal the enduring core of what matters.',
  },
  Libra: {
    sign: 'Libra',
    glyph: '♎',
    element: 'Air',
    pillars: 'AIR · HARMONY · POISE · CONNECTION',
    archetypeLabel: 'THE LOVER',
    traitsFormatted: 'HARMONIOUS / POETIC / HEART-CENTERED',
    gemTagline: 'OPENS RELATIONAL POISE',
    gemDescription:
      'A stone of harmony, tender truth and elevated relational poise. Pink Sapphire transmutes vulnerability into unshakable graceful connection.',
  },
  Scorpio: {
    sign: 'Scorpio',
    glyph: '♏',
    element: 'Water',
    pillars: 'WATER · RENEWAL · DEPTH · MAGNETISM',
    archetypeLabel: 'THE TRANSFORMER',
    traitsFormatted: 'ALCHEMICAL / INTENSE / RESILIENT',
    gemTagline: 'TEMPERS ALCHEMICAL POWER',
    gemDescription:
      'A stone of sovereign renewal and unbreakable magnetism. Red Spinel is forged under pressure to emerge radiant, fierce and enduring.',
  },
  Sagittarius: {
    sign: 'Sagittarius',
    glyph: '♐',
    element: 'Fire',
    pillars: 'FIRE · FREEDOM · VISION · HORIZONS',
    archetypeLabel: 'THE EXPLORER',
    traitsFormatted: 'VISIONARY / UNTAMED / OPTIMISTIC',
    gemTagline: 'EXPANDS DISTANT HORIZONS',
    gemDescription:
      'A stone of untamed vision, direction and philosophical optimism. Teal Sapphire aims your arrow at far-reaching stars with quiet confidence.',
  },
  Capricorn: {
    sign: 'Capricorn',
    glyph: '♑',
    element: 'Earth',
    pillars: 'EARTH · RESILIENCE · MASTERY · PERMANENCE',
    archetypeLabel: 'THE BUILDER',
    traitsFormatted: 'MASTERFUL / PATIENT / PRINCIPLED',
    gemTagline: 'BUILDS WHAT ENDURES',
    gemDescription:
      'A stone of quiet mastery, ancestral permanence and steady discipline. Black Spinel stands calm and impenetrable amidst shifting sands.',
  },
  Aquarius: {
    sign: 'Aquarius',
    glyph: '♒',
    element: 'Air',
    pillars: 'AIR · FORESIGHT · ORIGINALITY · SOVEREIGNTY',
    archetypeLabel: 'THE VISIONARY',
    traitsFormatted: 'INNOVATIVE / FORESIGHTED / SOVEREIGN',
    gemTagline: 'AWAKENS FUTURE SIGHT',
    gemDescription:
      'A stone of visionary perspective, liberation and intellectual sovereignty. Violet Sapphire bridges higher foresight with authentic originality.',
  },
  Pisces: {
    sign: 'Pisces',
    glyph: '♓',
    element: 'Water',
    pillars: 'WATER · INTUITION · EMPATHY · GRACE',
    archetypeLabel: 'THE DREAMER',
    traitsFormatted: 'RECEPTIVE / POETIC / COMPASSIONATE',
    gemTagline: 'TRANSMUTES SACRED GRACE',
    gemDescription:
      'A stone of smooth waters, boundless empathy and gentle surrender. Aquamarine guides quiet intuition into transcendent peace.',
  },
};

export function getZodiacMetadata(sign: ZodiacSign): ZodiacSignMeta {
  return ZODIAC_METADATA[sign] || ZODIAC_METADATA.Leo;
}

// =========================================================================
// 8 APPROVED INTENTION OUTCOMES (Source: Brief V2 Page 12 & 12A)
// Strictly: White Sapphire, Pink Sapphire, Green Sapphire, Ruby,
// Aquamarine, Black Spinel, Violet Sapphire, Golden Sapphire
// NO Amethyst per source audit!
// =========================================================================
export const INTENTION_OUTCOMES: Record<string, IntentionOutcome> = {
  amethyst: {
    id: 'amethyst',
    title: 'Room to Grow',
    theme: 'You may need room to grow.',
    intentionGem: {
      id: 'int-amethyst',
      name: 'Amethyst',
      colorName: 'Radiant Orchid Violet',
      hex: '#9C6EA9',
      accentHex: '#D8B6D5',
      meaning: 'Clarity, growth, and inner trust.',
      symbolism: 'Growth is a gentle unfolding that supports your next chapter.',
    },
    affirmation: 'Growth Looks Good On You.',
    reading:
      'You are in a season of expansion. A part of you is ready for more — more truth, more freedom, more of who you are becoming. Amethyst supports your next chapter with calm, clarity and the courage to move forward. It reminds you that growth is a gentle unfolding.',
    gemMapPosition: { x: 50, y: 50 },
  },
  GR: {
    id: 'GR',
    title: 'Growth & Renewal',
    theme: 'Making room for what is emerging',
    intentionGem: {
      id: 'int-green-sapphire',
      name: 'Green Sapphire',
      colorName: 'Forest Verdant Glint',
      hex: '#2E5A44',
      accentHex: '#4E8C6C',
      meaning: 'Patience, organic blossoming, and self-expansion.',
      symbolism: 'A private promise to keep making room for change.',
    },
    affirmation: 'I give myself permission to grow at my own natural pace.',
    reading: 'Your answers suggest that this chapter is less about becoming someone new than releasing what no longer fits. Growth may be asking for patience, permission and a gentler pace.',
    gemMapPosition: { x: 30, y: 65 },
  },
  CF: {
    id: 'CF',
    title: 'Clarity & Focus',
    theme: 'Hearing what matters again',
    intentionGem: {
      id: 'int-white-sapphire',
      name: 'White Sapphire',
      colorName: 'Luminous Prismatic Light',
      hex: '#E2E8F0',
      accentHex: '#FFFFFF',
      meaning: 'Singular perspective, mental calm, and lucid truth.',
      symbolism: 'A private promise to return to what is essential.',
    },
    affirmation: 'I clear away the noise to honor the clear voice within.',
    reading: 'Your answers reflect a desire to step back from crowded distractions. Clarity does not shout; it arrives when you give yourself permission to listen to what truly matters.',
    gemMapPosition: { x: 50, y: 25 },
  },
  LC: {
    id: 'LC',
    title: 'Love & Connection',
    theme: 'Being seen in gentle simplicity',
    intentionGem: {
      id: 'int-pink-sapphire',
      name: 'Pink Sapphire',
      colorName: 'Blush Dawn Rose',
      hex: '#D86B8C',
      accentHex: '#F6B7CE',
      meaning: 'Tender receptivity, emotional warmth, and soft boundaries.',
      symbolism: 'A private promise to receive love without having to perform.',
    },
    affirmation: 'I open my heart to be loved fully, without needing to perform.',
    reading: 'Your reflections point toward an invitation to rest. Love in this chapter asks you to stop earning approval and allow yourself to be met with tenderness and understanding.',
    gemMapPosition: { x: 35, y: 40 },
  },
  CC: {
    id: 'CC',
    title: 'Courage & Confidence',
    theme: 'Taking up space without apology',
    intentionGem: {
      id: 'int-ruby',
      name: 'Ruby',
      colorName: 'Royal Crimson Flame',
      hex: '#9E1B32',
      accentHex: '#E25865',
      meaning: 'Noble conviction, heart fire, and claiming one’s voice.',
      symbolism: 'A private promise to step forward into your sovereign light.',
    },
    affirmation: 'I speak my truth and step forward with deliberate conviction.',
    reading: 'You are ready to stop playing small to keep circumstances predictable. Ruby marks your decision to trust your voice, claim your ambition, and take up the space you deserve.',
    gemMapPosition: { x: 75, y: 60 },
  },
  NB: {
    id: 'NB',
    title: 'New Beginnings',
    theme: 'Stepping lightly into the unwritten',
    intentionGem: {
      id: 'int-aquamarine',
      name: 'Aquamarine',
      colorName: 'Cool Ocean Cyan',
      hex: '#5B92A5',
      accentHex: '#A2DBD7',
      meaning: 'Fluid trust, fresh horizons, and release of old chapters.',
      symbolism: 'A private promise to meet change as an open door.',
    },
    affirmation: 'I step across the threshold with lightness, curiosity and trust.',
    reading: 'A threshold is before you. You do not need to have the entire road mapped out before taking the next step. New Beginnings invites you to trust the current and begin.',
    gemMapPosition: { x: 70, y: 30 },
  },
  RP: {
    id: 'RP',
    title: 'Resilience & Protection',
    theme: 'An unshakeable inner sanctuary',
    intentionGem: {
      id: 'int-black-spinel',
      name: 'Black Spinel',
      colorName: 'Midnight Velveteen Noir',
      hex: '#1E2421',
      accentHex: '#424A45',
      meaning: 'Grounded boundaries, emotional armor, and quiet fortitude.',
      symbolism: 'A private promise to protect your peace with calm strength.',
    },
    affirmation: 'My boundaries are my sanctuary; I remain intact through all seasons.',
    reading: 'You have navigated heavy currents. This outcome marks a return to your core fortress—knowing that setting clear boundaries is an act of sovereign self-respect.',
    gemMapPosition: { x: 25, y: 80 },
  },
  CE: {
    id: 'CE',
    title: 'Creativity & Expression',
    theme: 'Uninhibited authentic voice',
    intentionGem: {
      id: 'int-violet-sapphire',
      name: 'Violet Sapphire',
      colorName: 'Twilight Amethyst Violet',
      hex: '#5E4B8B',
      accentHex: '#9381BF',
      meaning: 'Artistic liberation, intuitive originality, and joyful play.',
      symbolism: 'A private promise to honor your unedited self-expression.',
    },
    affirmation: 'I express my true colors without editing myself for others.',
    reading: 'Your spirit craves play, art, and expressive freedom. Violet Sapphire honors your idiosyncratic genius and invites you to share your creative light without self-censorship.',
    gemMapPosition: { x: 80, y: 80 },
  },
  AO: {
    id: 'AO',
    title: 'Abundance & Opportunity',
    theme: 'Solar ease and magnetic receiving',
    intentionGem: {
      id: 'int-golden-sapphire',
      name: 'Golden Sapphire',
      colorName: 'Lustrous Sunlit Gold',
      hex: '#D4AF37',
      accentHex: '#F6E4A4',
      meaning: 'Prosperity of spirit, celebration, and unforced ease.',
      symbolism: 'A private promise to welcome goodness without guilt.',
    },
    affirmation: 'I welcome abundance with effortless ease and open hands.',
    reading: 'Your season of striving is shifting into harvest. Abundance invites you to open the windows, accept generosity from life, and celebrate how far you have already come.',
    gemMapPosition: { x: 60, y: 75 },
  },
};

// Backward compatible aliases
(INTENTION_OUTCOMES as Record<string, IntentionOutcome>)['emerald_sovereignty'] = INTENTION_OUTCOMES.GR;
(INTENTION_OUTCOMES as Record<string, IntentionOutcome>)['sapphire_clarity'] = INTENTION_OUTCOMES.CF;
(INTENTION_OUTCOMES as Record<string, IntentionOutcome>)['ruby_passion'] = INTENTION_OUTCOMES.CC;
(INTENTION_OUTCOMES as Record<string, IntentionOutcome>)['diamond_radiance'] = INTENTION_OUTCOMES.AO;


// =========================================================================
// 5 INTENTION REFLECTIONS (Exact copy and scoring from Brief V2 Page 11 & 12)
// Hidden scoring: Q1-Q4 (primary +2, secondary +1), Q5 (primary +3, secondary +1)
// =========================================================================
export interface DetailedIntentionOption {
  id: string;
  letter: 'A' | 'B' | 'C' | 'D';
  label: string;
  primaryKey: string;
  secondaryKey: string;
}

export interface DetailedIntentionDimension {
  number: number;
  code: string;
  title: string;
  subtitle: string;
  question: string;
  note: string;
  options: DetailedIntentionOption[];
}

export const INTENTION_DIMENSIONS_DETAILED: DetailedIntentionDimension[] = [
  {
    number: 1,
    code: 'PRESENT STATE',
    title: 'Present State',
    subtitle: 'Reflection 01 of 05',
    question: 'Which sentence comes closest to how you feel right now?',
    note: 'Choose what feels most true today — not what sounds most like the person you think you should be.',
    options: [
      {
        id: '01-A',
        letter: 'A',
        label: 'I have outgrown something that once felt right.',
        primaryKey: 'GR',
        secondaryKey: 'NB',
      },
      {
        id: '01-B',
        letter: 'B',
        label: 'My mind feels crowded; I want to hear what matters again.',
        primaryKey: 'CF',
        secondaryKey: 'RP',
      },
      {
        id: '01-C',
        letter: 'C',
        label: 'I am there for everyone, but I do not feel fully seen.',
        primaryKey: 'LC',
        secondaryKey: 'CE',
      },
      {
        id: '01-D',
        letter: 'D',
        label: 'I can sense possibility, but I am afraid to move toward it.',
        primaryKey: 'CC',
        secondaryKey: 'AO',
      },
    ],
  },
  {
    number: 2,
    code: 'RELATIONAL NEED',
    title: 'Relational Need',
    subtitle: 'Reflection 02 of 05',
    question: 'Around the people closest to you, what do you most want to feel?',
    note: 'Reflect honestly on the atmosphere that allows you to breathe most freely.',
    options: [
      {
        id: '02-A',
        letter: 'A',
        label: 'Safe enough to soften without losing myself.',
        primaryKey: 'RP',
        secondaryKey: 'LC',
      },
      {
        id: '02-B',
        letter: 'B',
        label: 'Encouraged to take up space and speak honestly.',
        primaryKey: 'CE',
        secondaryKey: 'CC',
      },
      {
        id: '02-C',
        letter: 'C',
        label: 'Grounded enough to hear myself clearly.',
        primaryKey: 'CF',
        secondaryKey: 'GR',
      },
      {
        id: '02-D',
        letter: 'D',
        label: 'Free to become new without being pulled back.',
        primaryKey: 'NB',
        secondaryKey: 'AO',
      },
    ],
  },
  {
    number: 3,
    code: 'PROTECTIVE PATTERN',
    title: 'Protective Pattern',
    subtitle: 'Reflection 03 of 05',
    question: 'When a meaningful choice is in front of you, which pattern feels familiar?',
    note: 'There are no right answers. Notice your instinct without judgment.',
    options: [
      {
        id: '03-A',
        letter: 'A',
        label: "I hear others' expectations before my own voice.",
        primaryKey: 'CE',
        secondaryKey: 'CF',
      },
      {
        id: '03-B',
        letter: 'B',
        label: 'I worry my choice will disappoint someone I love.',
        primaryKey: 'CC',
        secondaryKey: 'LC',
      },
      {
        id: '03-C',
        letter: 'C',
        label: 'I stay with what is familiar, even when it no longer fits.',
        primaryKey: 'GR',
        secondaryKey: 'RP',
      },
      {
        id: '03-D',
        letter: 'D',
        label: 'I wait for certainty, permission or the perfect moment.',
        primaryKey: 'NB',
        secondaryKey: 'AO',
      },
    ],
  },
  {
    number: 4,
    code: 'DESIRED SHIFT',
    title: 'Desired Shift',
    subtitle: 'Reflection 04 of 05',
    question: 'If the next six months changed one thing inside you, what would matter most?',
    note: 'Imagine the feeling of ease that you want to welcome into your days.',
    options: [
      {
        id: '04-A',
        letter: 'A',
        label: 'Trusting myself sooner, before every doubt is answered.',
        primaryKey: 'CC',
        secondaryKey: 'CF',
      },
      {
        id: '04-B',
        letter: 'B',
        label: 'Feeling safe without making myself smaller.',
        primaryKey: 'RP',
        secondaryKey: 'GR',
      },
      {
        id: '04-C',
        letter: 'C',
        label: 'Giving and receiving love without abandoning my needs.',
        primaryKey: 'LC',
        secondaryKey: 'CE',
      },
      {
        id: '04-D',
        letter: 'D',
        label: 'Meeting change as possibility, not only risk.',
        primaryKey: 'AO',
        secondaryKey: 'NB',
      },
    ],
  },
  {
    number: 5,
    code: 'INTUITIVE IMAGE',
    title: 'Intuitive Image',
    subtitle: 'Reflection 05 of 05',
    question: 'Which image feels most like the chapter calling you forward?',
    note: 'Let intuition respond before the thinking mind analyzes.',
    options: [
      {
        id: '05-A',
        letter: 'A',
        label: 'A clear path appearing through morning mist.',
        primaryKey: 'CF',
        secondaryKey: 'NB',
      },
      {
        id: '05-B',
        letter: 'B',
        label: 'Deep roots sending up new leaves.',
        primaryKey: 'GR',
        secondaryKey: 'RP',
      },
      {
        id: '05-C',
        letter: 'C',
        label: 'A candle lit beside an open seat at the table.',
        primaryKey: 'LC',
        secondaryKey: 'CE',
      },
      {
        id: '05-D',
        letter: 'D',
        label: 'A wide horizon after a steep climb.',
        primaryKey: 'AO',
        secondaryKey: 'CC',
      },
    ],
  },
];

// Helper to compute recommended intention from selected answers
export function calculateIntentionOutcome(selectedOptionIds: Record<number, string>): IntentionOutcome {
  const scores: Record<string, number> = {
    GR: 0,
    CF: 0,
    LC: 0,
    CC: 0,
    NB: 0,
    RP: 0,
    CE: 0,
    AO: 0,
  };

  INTENTION_DIMENSIONS_DETAILED.forEach((dimension) => {
    const chosenId = selectedOptionIds[dimension.number];
    const option = dimension.options.find((o) => o.id === chosenId);
    if (!option) return;

    if (dimension.number <= 4) {
      // Q1-Q4: primary +2, secondary +1
      scores[option.primaryKey] = (scores[option.primaryKey] || 0) + 2;
      scores[option.secondaryKey] = (scores[option.secondaryKey] || 0) + 1;
    } else {
      // Q5: primary +3, secondary +1 (breaks ties)
      scores[option.primaryKey] = (scores[option.primaryKey] || 0) + 3;
      scores[option.secondaryKey] = (scores[option.secondaryKey] || 0) + 1;
    }
  });

  // Find max score key
  let winnerKey = 'GR';
  let maxScore = -1;

  Object.keys(scores).forEach((key) => {
    if (scores[key] > maxScore) {
      maxScore = scores[key];
      winnerKey = key;
    }
  });

  return INTENTION_OUTCOMES[winnerKey] || INTENTION_OUTCOMES.GR;
}

// =========================================================================
// 3 LAUNCH SHAPES (Brief V2 Page 3 & 7)
// Strictly Round, Oval, Marquise
// =========================================================================
export const DIAMOND_SHAPES: Record<DiamondShape, {
  name: string;
  title: string;
  shape: DiamondShape;
  character: string;
  poeticNote: string;
  stylingNote: (finger: string) => string;
}> = {
  round: {
    name: 'Round',
    title: 'The Centre',
    shape: 'round',
    character: 'Timeless / balanced / luminous',
    poeticNote: 'Soft symmetry and concentrated sparkle. For a diamond that feels centred, enduring and quietly bright.',
    stylingNote: (finger) =>
      `Round Brilliant brings balanced, timeless equilibrium to your ${finger} finger. Your preference comes first.`,
  },
  oval: {
    name: 'Oval',
    title: 'The Continuum',
    shape: 'oval',
    character: 'Graceful / evolving / elongated',
    poeticNote: 'Creates a gentle vertical line. For a story still unfolding, with grace and movement.',
    stylingNote: (finger) =>
      `Oval creates a gentle vertical line on your chosen ${finger} finger. Your preference comes first.`,
  },
  marquise: {
    name: 'Marquise',
    title: 'The Compass',
    shape: 'marquise',
    character: 'Directional / distinct / bold',
    poeticNote: 'The strongest lengthening line. For a diamond with direction — individual, deliberate and unmistakably yours.',
    stylingNote: (finger) =>
      `Marquise accentuates directional elongation on your ${finger} finger with bold starlight geometry. Your preference comes first.`,
  },
};

// =========================================================================
// 4 COLLECTIONS (Asset Brief 03 Aug confirmed names)
// =========================================================================
export const COLLECTIONS: Record<CollectionName, {
  name: CollectionName;
  tagline: string;
  description: string;
  architecturalDetail: string;
  status: 'Confirmed' | 'Partial' | 'Pending';
  statusLabel: string;
}> = {
  'The Constellation': {
    name: 'The Constellation',
    tagline: 'Classic forms, endless possibilities.',
    description: 'A collection shaped by identity and intention. Each ring brings together a centre diamond with two personally chosen gemstones: one facing inward as a reflection of the light you carry, and one facing outward as a symbol of the direction you choose next.',
    architecturalDetail: 'Dual secret talisman bridge set beneath the gallery with iconic North Star hallmark.',
    status: 'Confirmed',
    statusLabel: 'Available First',
  },
  'The Bezel': {
    name: 'The Bezel',
    tagline: 'Modern. Considered. Distinctly yours.',
    description: 'Clean lines, smooth edges and quiet strength. The Bezel Collection frames each diamond in a modern setting designed for effortless, everyday wear.',
    architecturalDetail: 'Low-profile flush-set collar providing architectural protection and modern sleek lines.',
    status: 'Confirmed',
    statusLabel: 'Available First',
  },
  'The Nirun': {
    name: 'The Nirun',
    tagline: 'A new light on tradition.',
    description: 'Designed around continuity, renewal and the beauty of what endures. The Nirun Collection brings meaning to repeated forms, rhythm and light.',
    architecturalDetail: 'Continuity-inspired gallery with repeated organic rhythms and eternity fluting.',
    status: 'Partial',
    statusLabel: 'In Development',
  },
  'The Petite': {
    name: 'The Petite',
    tagline: 'For the everyday and every you.',
    description: 'A refined expression of the PARISSA story in a delicate scale. The Petite Collection is designed for quiet meaning and effortless everyday wear.',
    architecturalDetail: 'Whisper-thin 1.6mm band with tapered micro-claws maximizing light reflection.',
    status: 'Pending',
    statusLabel: 'Coming Next',
  },
};

// =========================================================================
// METALS (Brief V2 Page 19 & Asset Brief 03 Aug Page 70)
// Standard: 14K Gold; Upgrade: 18K Gold & Platinum 950
// =========================================================================
export const METALS: Record<MetalType, {
  id: MetalType;
  name: string;
  grade: '14K' | '18K' | 'Platinum';
  subtitle: string;
  hex: string;
  accentHex: string;
  description: string;
}> = {
  '18k-yellow-gold': {
    id: '18k-yellow-gold',
    name: '18K Yellow Gold',
    grade: '18K',
    subtitle: 'Golden Hour · Warm & Classic',
    hex: '#E5C158',
    accentHex: '#F6E4A4',
    description: 'Rich, buttery honey warmth that deepens with wear and time.',
  },
  '18k-rose-gold': {
    id: '18k-rose-gold',
    name: '18K Rose Gold',
    grade: '18K',
    subtitle: 'Sunset Blush · Romantic & Modern',
    hex: '#DCA287',
    accentHex: '#F2D3C4',
    description: 'Soft blush pink gold flattering all undertones with gentle warmth.',
  },
  '18k-white-gold': {
    id: '18k-white-gold',
    name: '18K White Gold',
    grade: '18K',
    subtitle: 'Moonlight · Clean & Mirrored',
    hex: '#DDE0E5',
    accentHex: '#F4F5F7',
    description: 'Luminous rhodium-plated white gold with contemporary crisp brilliance.',
  },
  platinum: {
    id: 'platinum',
    name: 'Platinum 950',
    grade: 'Platinum',
    subtitle: 'Pure Celestial Permanence',
    hex: '#C8CAD0',
    accentHex: '#ECEEF2',
    description: 'Dense, naturally white 95% platinum developing a noble heirloom patina.',
  },
};

// =========================================================================
// CATALOG PRODUCTS (Explore The Rings)
// =========================================================================
export const CATALOG_PRODUCTS: ProductListing[] = [
  {
    id: 'ring-constellation-round',
    name: 'The Constellation Round',
    collection: 'The Constellation',
    shape: 'round',
    subtitle: 'Solitaire with Signature North Star Under-Gallery',
    description: 'A classic six-claw solitaire with the signature North Star under-gallery. Holds your private Essence and Intention talisman gems resting close against your pulse.',
    carat: 1.0,
    metalDefault: '18k-yellow-gold',
    storyExcerpt: 'Classic forms, endless possibilities. Crafted to celebrate who you are and what you choose next.',
  },
  {
    id: 'ring-constellation-oval',
    name: 'The Constellation Oval',
    collection: 'The Constellation',
    shape: 'oval',
    subtitle: 'Graceful Solitaire with Secret Talisman Chamber',
    description: 'Elongating Oval solitaire cradled in fluid prongs, with concealed inner pavilion housing your astrological essence gem and intention gem.',
    carat: 1.5,
    metalDefault: '18k-yellow-gold',
    storyExcerpt: 'For a story still unfolding, with grace and movement.',
  },
  {
    id: 'ring-constellation-marquise',
    name: 'The Constellation Marquise',
    collection: 'The Constellation',
    shape: 'marquise',
    subtitle: 'Directional Compass Solitaire',
    description: 'The tapered boat silhouette creates maximum finger elongation. A bold talisman marking your sovereign direction.',
    carat: 1.5,
    metalDefault: '18k-rose-gold',
    storyExcerpt: 'For a diamond with direction — individual, deliberate and unmistakably yours.',
  },
  {
    id: 'ring-bezel-round',
    name: 'The Bezel Round',
    collection: 'The Bezel',
    shape: 'round',
    subtitle: 'Architectural Low-Profile Flush Setting',
    description: 'Clean lines and smooth edges. The diamond is nestled flush inside a solid gold bezel, engineered for seamless daily wear.',
    carat: 1.0,
    metalDefault: '18k-yellow-gold',
    storyExcerpt: 'Modern, considered and distinctly yours with zero catch points.',
  },
  {
    id: 'ring-bezel-oval',
    name: 'The Bezel Oval',
    collection: 'The Bezel',
    shape: 'oval',
    subtitle: 'Smooth Sculptural Bezel Ring',
    description: 'Sculpted in solid 18k gold with a smooth contour that accentuates the soft elongation of an oval diamond.',
    carat: 1.5,
    metalDefault: 'platinum',
    storyExcerpt: 'Framing each diamond in quiet strength designed for everyday wear.',
  },
  {
    id: 'ring-nirun-oval',
    name: 'The Nirun Continuum',
    collection: 'The Nirun',
    shape: 'oval',
    subtitle: 'Organic Fluid Contours',
    description: 'Gently twisting ribbons of precious metal inspired by the Thai concept of eternity. A tribute to timeless grace.',
    carat: 1.0,
    metalDefault: '18k-rose-gold',
    storyExcerpt: 'A new light on tradition, repeated forms, rhythm and light.',
  },
  {
    id: 'ring-petite-round',
    name: 'The Petite Solitaire',
    collection: 'The Petite',
    shape: 'round',
    subtitle: 'Whisper 1.6mm Band',
    description: 'A whisper-fine knife-edge band allowing the solitaire diamond to hover effortlessly like a drop of liquid light.',
    carat: 0.7,
    metalDefault: '18k-yellow-gold',
    storyExcerpt: 'Quiet meaning in a delicate scale, for the everyday and every you.',
  },
];

// Helper to determine Zodiac Sign from Date
export function getZodiacSignFromDate(birthDateStr: string): ZodiacSign {
  if (!birthDateStr) return 'Leo';
  const parts = birthDateStr.split('-');
  const month = parseInt(parts[1] || '7', 10);
  const day = parseInt(parts[2] || '27', 10);

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

// Rising Sign calculation helper when exact time is provided
export function calculateRisingSign(birthDateStr: string, timeStr: string, _cityStr: string): ZodiacSign {
  const zodiacCycle: ZodiacSign[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  const sunSign = getZodiacSignFromDate(birthDateStr);
  const sunIndex = zodiacCycle.indexOf(sunSign);

  if (!timeStr) return sunSign;

  const [hours, minutes] = timeStr.split(':').map(Number);
  const totalMinutes = (isNaN(hours) ? 12 : hours) * 60 + (isNaN(minutes) ? 0 : minutes);

  // Approximate astronomical rotation: ~2 hours per rising sign offset from sunrise (approx 06:00 AM)
  const offsetFromDawn = totalMinutes - 360;
  const signShift = Math.floor(((offsetFromDawn % 1440) + 1440) / 120);

  const risingIndex = (sunIndex + signShift) % 12;
  return zodiacCycle[risingIndex];
}
