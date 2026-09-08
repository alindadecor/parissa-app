import { RingConfiguration } from '../types';
import { JourneyStructuredSelections } from '../services/shopifyIntegration';

export function toJourneySelections(
  config: RingConfiguration
): JourneyStructuredSelections {
  return {
    place: { hand: config.hand, finger: config.finger },
    shape: config.shape,
    essence: {
      sign: config.essenceArchetype.sign,
      archetypeTitle: config.essenceArchetype.archetypeTitle,
      essenceGem: config.essenceGem,
      birthData: config.birthData,
    },
    intention: {
      outcomeId: config.intentionOutcome.id,
      outcomeTitle: config.intentionOutcome.title,
      intentionGem: config.intentionGem,
    },
    craft: {
      collection: config.collection,
      metal: config.metal,
      carat: config.carat,
      diamondType: config.diamondType,
      ringSize: config.ringSize,
      bandWidth: config.bandWidth,
    },
  };
}
