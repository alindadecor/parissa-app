import React, { useState } from 'react';
import {
  Hand,
  Finger,
  DiamondShape,
  EssenceArchetype,
  IntentionOutcome,
  RingConfiguration,
} from '../types';
import {
  ESSENCE_ARCHETYPES,
  INTENTION_OUTCOMES,
} from '../data/parissaData';
import { ErrorBoundary } from './ErrorBoundary';
import { Step01PlaceShape } from './Step01PlaceShape';
import { Step02Essence } from './Step02Essence';
import { Step03Intention } from './Step03Intention';
import { Step04Craft } from './Step04Craft';
import { Step05Reveal } from './Step05Reveal';

interface JourneyFlowProps {
  onBackToHome: () => void;
  onAddToCart: (config: RingConfiguration) => void;
  onSaveStory: (config: RingConfiguration) => void;
  isConfigSaved: (configId: string) => boolean;
  initialPresetShape?: DiamondShape;
}

export const JourneyFlow: React.FC<JourneyFlowProps> = ({
  onBackToHome,
  onAddToCart,
  onSaveStory,
  isConfigSaved,
  initialPresetShape = 'oval',
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Configuration accumulator
  const [hand, setHand] = useState<Hand>('left');
  const [finger, setFinger] = useState<Finger>('ring');
  const [shape, setShape] = useState<DiamondShape>(initialPresetShape);

  const [birthData, setBirthData] = useState<{
    date: string;
    city: string;
    time?: string;
    isExactTimeKnown: boolean;
  }>({
    date: '1995-08-14',
    city: 'Melbourne, Australia',
    time: '06:45',
    isExactTimeKnown: true,
  });

  const [essenceArchetype, setEssenceArchetype] = useState<EssenceArchetype>(
    ESSENCE_ARCHETYPES.Leo
  );

  const [intentionOutcome, setIntentionOutcome] = useState<IntentionOutcome>(
    INTENTION_OUTCOMES.emerald_sovereignty
  );

  const [craftConfig, setCraftConfig] = useState<Partial<RingConfiguration>>({
    collection: 'The Constellation',
    diamondType: 'natural',
    carat: 1.5,
    metal: '18k-yellow-gold',
    ringSize: 6.5,
    bandWidth: 'classic',
  });

  const [showChangeModal, setShowChangeModal] = useState(false);

  // Step 01 completion handler
  const handleStep01Complete = (data: { hand: Hand; finger: Finger; shape: DiamondShape }) => {
    setHand(data.hand);
    setFinger(data.finger);
    setShape(data.shape);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 02 completion handler
  const handleStep02Complete = (data: {
    birthData: { date: string; city: string; time?: string; isExactTimeKnown: boolean };
    essenceArchetype: EssenceArchetype;
  }) => {
    setBirthData(data.birthData);
    setEssenceArchetype(data.essenceArchetype);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 03 completion handler
  const handleStep03Complete = (outcome: IntentionOutcome) => {
    setIntentionOutcome(outcome);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 04 completion handler
  const handleStep04Complete = (config: Partial<RingConfiguration>) => {
    if (config.shape) setShape(config.shape);
    setCraftConfig((prev) => ({ ...prev, ...config }));
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Assembled full ring configuration
  const currentRingConfig: RingConfiguration = {
    id: `parissa-ring-${shape}-${craftConfig.metal || '18k-gold'}-${essenceArchetype.sign.toLowerCase()}`,
    title: `The ${craftConfig.collection || 'Constellation'} ${shape.charAt(0).toUpperCase() + shape.slice(1)} Solitaire`,
    hand,
    finger,
    shape,
    collection: craftConfig.collection || 'The Constellation',
    diamondType: craftConfig.diamondType || 'natural',
    carat: craftConfig.carat || 1.5,
    metal: craftConfig.metal || '18k-yellow-gold',
    ringSize: craftConfig.ringSize || 6.5,
    bandWidth: craftConfig.bandWidth || 'classic',
    essenceArchetype,
    essenceGem: essenceArchetype.essenceGem,
    intentionOutcome,
    intentionGem: intentionOutcome.intentionGem,
    birthData,
    savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    priceDisplay: 'Price on request',
    leadTime: '2–4 Weeks Made to Order in Melbourne',
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] pb-20">
      {/* Progress Timeline in Artistic Flair style */}
      <div className="bg-[#FAF8F5] border-b border-[#1A1A1A]/10 sticky top-20 z-30 py-3 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {[
            { num: 1, label: 'Place + Shape' },
            { num: 2, label: 'Essence' },
            { num: 3, label: 'Intention' },
            { num: 4, label: 'Craft' },
            { num: 5, label: 'Reveal' },
          ].map((s) => {
            const isCurrent = currentStep === s.num;
            const isCompleted = currentStep > s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num <= currentStep) {
                    setCurrentStep(s.num as any);
                  }
                }}
                disabled={s.num > currentStep}
                className={`flex items-center gap-2 transition-all cursor-pointer ${
                  isCurrent
                    ? 'text-[#1A1A1A] font-semibold'
                    : isCompleted
                    ? 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                    : 'text-[#1A1A1A]/25 cursor-not-allowed'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-sans font-medium border ${
                    isCurrent
                      ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                      : isCompleted
                      ? 'bg-[#E8E4D9] text-[#1A1A1A] border-[#1A1A1A]/30'
                      : 'border-[#1A1A1A]/20'
                  }`}
                >
                  {isCompleted ? '✓' : `0${s.num}`}
                </span>
                <span className="hidden md:inline font-sans text-xs uppercase tracking-[0.15em]">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Steps Component Rendering */}
      {currentStep === 1 && (
        <ErrorBoundary fallbackTitle="Place & Shape is unavailable" onReset={() => setCurrentStep(1)}>
          <Step01PlaceShape
            initialHand={hand}
            initialFinger={finger}
            initialShape={shape}
            onComplete={handleStep01Complete}
            onBackToHome={onBackToHome}
          />
        </ErrorBoundary>
      )}

      {currentStep === 2 && (
        <ErrorBoundary fallbackTitle="Essence is unavailable" onReset={() => setCurrentStep(2)}>
          <Step02Essence
            initialBirthData={birthData}
            initialEssence={essenceArchetype}
            onComplete={handleStep02Complete}
            onBack={() => setCurrentStep(1)}
          />
        </ErrorBoundary>
      )}

      {currentStep === 3 && (
        <ErrorBoundary fallbackTitle="Intention is unavailable" onReset={() => setCurrentStep(3)}>
          <Step03Intention
            initialIntention={intentionOutcome}
            onComplete={handleStep03Complete}
            onBack={() => setCurrentStep(2)}
          />
        </ErrorBoundary>
      )}

      {currentStep === 4 && (
        <ErrorBoundary fallbackTitle="Craft is unavailable" onReset={() => setCurrentStep(4)}>
          <Step04Craft
            initialConfig={{
              ...craftConfig,
              shape,
            }}
            essenceArchetype={essenceArchetype}
            intentionOutcome={intentionOutcome}
            onComplete={handleStep04Complete}
            onBack={() => setCurrentStep(3)}
          />
        </ErrorBoundary>
      )}

      {currentStep === 5 && (
        <ErrorBoundary fallbackTitle="Reveal is unavailable" onReset={() => setCurrentStep(5)}>
          <Step05Reveal
            ringConfig={currentRingConfig}
            onContinueToRing={() => onAddToCart(currentRingConfig)}
            onSaveStory={() => onSaveStory(currentRingConfig)}
            onChangeAnyChoice={() => setShowChangeModal(true)}
            isSaved={isConfigSaved(currentRingConfig.id)}
          />
        </ErrorBoundary>
      )}

      {/* Change Any Choice Modal */}
      {showChangeModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-[#FAF8F5] border border-[#1A1A1A]/20 p-8 max-w-lg w-full rounded shadow-xl">
            <h3 className="font-serif-luxury text-3xl text-[#1A1A1A] mb-2 font-light">
              Adjust Your Choices
            </h3>
            <p className="font-sans text-xs text-[#1A1A1A]/70 mb-6 leading-relaxed">
              Select which dimension of your ring you would like to revisit. All other choices will remain saved.
            </p>

            <div className="space-y-3 mb-8">
              <button
                type="button"
                onClick={() => {
                  setShowChangeModal(false);
                  setCurrentStep(1);
                }}
                className="w-full p-4 text-left rounded border border-[#1A1A1A]/15 hover:border-[#1A1A1A] hover:bg-[#E8E4D9]/50 transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-serif-luxury text-lg text-[#1A1A1A] block">01 • Hand, Finger & Shape</span>
                  <span className="font-sans text-[11px] text-[#1A1A1A]/60">Currently: {hand} hand, {finger} finger, {shape} diamond</span>
                </div>
                <span className="text-xs font-serif">→</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowChangeModal(false);
                  setCurrentStep(2);
                }}
                className="w-full p-4 text-left rounded border border-[#1A1A1A]/15 hover:border-[#1A1A1A] hover:bg-[#E8E4D9]/50 transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-serif-luxury text-lg text-[#1A1A1A] block">02 • Astrological Essence</span>
                  <span className="font-sans text-[11px] text-[#1A1A1A]/60">Currently: {essenceArchetype.archetypeTitle} ({essenceArchetype.essenceGem.name})</span>
                </div>
                <span className="text-xs font-serif">→</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowChangeModal(false);
                  setCurrentStep(3);
                }}
                className="w-full p-4 text-left rounded border border-[#1A1A1A]/15 hover:border-[#1A1A1A] hover:bg-[#E8E4D9]/50 transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-serif-luxury text-lg text-[#1A1A1A] block">03 • Guiding Intention</span>
                  <span className="font-sans text-[11px] text-[#1A1A1A]/60">Currently: {intentionOutcome.title} ({intentionOutcome.intentionGem.name})</span>
                </div>
                <span className="text-xs font-serif">→</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowChangeModal(false);
                  setCurrentStep(4);
                }}
                className="w-full p-4 text-left rounded border border-[#1A1A1A]/15 hover:border-[#1A1A1A] hover:bg-[#E8E4D9]/50 transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-serif-luxury text-lg text-[#1A1A1A] block">04 • Craft, Metal & Diamond</span>
                  <span className="font-sans text-[11px] text-[#1A1A1A]/60">Currently: {craftConfig.carat}ct, {craftConfig.metal}, {craftConfig.collection}</span>
                </div>
                <span className="text-xs font-serif">→</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowChangeModal(false)}
              className="w-full py-3.5 border border-[#1A1A1A]/25 rounded-full text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#E8E4D9]/40 transition-colors"
            >
              Cancel & Return to Reveal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
