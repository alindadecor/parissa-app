import React, { useState } from 'react';
import { IntentionOutcome } from '../types';
import {
  INTENTION_DIMENSIONS_DETAILED,
  INTENTION_OUTCOMES,
  calculateIntentionOutcome,
} from '../data/parissaData';
import { ArrowRight, ArrowLeft, Check, Sparkles, RotateCcw, Info } from 'lucide-react';
import { NorthStarIcon } from './GemIcon';

interface Step03Props {
  initialIntention?: IntentionOutcome;
  onComplete: (intention: IntentionOutcome) => void;
  onBack: () => void;
}

export const Step03Intention: React.FC<Step03Props> = ({
  initialIntention,
  onComplete,
  onBack,
}) => {
  // reflectionIndex: 0..4 for the 5 indirect reflections (Q1 to Q5)
  // reflectionIndex: 5 for the Reveal Screen (after completing Q5)
  const [reflectionIndex, setReflectionIndex] = useState<number>(0);

  // User selections per question (keys 1 to 5)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  // Recommended intention outcome (calculated strictly after answering all 5 questions)
  const [recommendedOutcome, setRecommendedOutcome] = useState<IntentionOutcome>(
    initialIntention || INTENTION_OUTCOMES.GR
  );

  // Active intention outcome (initially recommended, but user has full permission to choose differently)
  const [activeOutcome, setActiveOutcome] = useState<IntentionOutcome>(
    initialIntention || INTENTION_OUTCOMES.GR
  );

  // Safe accessor for current question (0 to 4)
  const currentDimension = INTENTION_DIMENSIONS_DETAILED[Math.min(reflectionIndex, 4)];
  const currentSelectedOptionId = selectedAnswers[currentDimension?.number];

  const handleSelectOption = (optionId: string) => {
    if (!currentDimension) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentDimension.number]: optionId,
    }));
  };

  const handleNext = () => {
    if (!currentSelectedOptionId) return;

    if (reflectionIndex < 4) {
      setReflectionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Q5 completed! Calculate the recommendation from hidden scoring
      const finalAnswers = {
        ...selectedAnswers,
        [currentDimension.number]: currentSelectedOptionId,
      };
      const computed = calculateIntentionOutcome(finalAnswers);
      setRecommendedOutcome(computed);
      setActiveOutcome(computed);
      setReflectionIndex(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (reflectionIndex > 0) {
      setReflectionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setReflectionIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper text mapping for each question
  const getHelperText = (index: number) => {
    switch (index) {
      case 0:
        return 'Choose what feels most true today — not what sounds most like the person you think you should be.';
      case 1:
        return 'Choose the relational atmosphere that allows you to breathe and be yourself most freely.';
      case 2:
        return 'Notice your instinctive response without judgment. There are no right or wrong answers.';
      case 3:
        return 'Imagine the feeling of ease and inner strength you want to welcome into your days.';
      case 4:
        return 'Let your intuition guide your choice before the analytical mind begins to dissect it.';
      default:
        return '';
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#F9F7F2] text-[#1A1A1A] flex flex-col">
      {/* Top Stepper Bar */}
      <div className="border-b border-[#1A1A1A]/10 bg-[#FAF8F5]/80 px-6 sm:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-6 sm:gap-10">
            <span className="font-semibold uppercase tracking-[0.22em] text-[#1A1A1A]">
              03 / 05 &nbsp;INTENTION
            </span>
            <div className="hidden md:flex items-center gap-6 text-[#1A1A1A]/40 uppercase tracking-[0.2em]">
              <span className="text-[#1A1A1A]/70">01</span>
              <span className="text-[#1A1A1A]/70">02</span>
              <NorthStarIcon size={12} className="text-[#1A1A1A]" />
              <span>04</span>
              <span>05</span>
            </div>
          </div>

          <button
            onClick={reflectionIndex === 5 ? () => setReflectionIndex(4) : handlePrev}
            className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>
              {reflectionIndex === 0
                ? 'Back to Essence'
                : reflectionIndex === 5
                ? 'Back to Questions'
                : `Back to 0${reflectionIndex}`}
            </span>
          </button>
        </div>
      </div>

      {reflectionIndex < 5 ? (
        /* ================= QUIZ VIEW (Q1 to Q5) =================
           Strict UI Locking:
           - NO Intention Gem
           - NO Gem name
           - NO scores / points
           - NO scoring categories (e.g. Love, Growth, Clarity)
           - NO hint about which gem will be given
        =========================================================== */
        <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 sm:py-16 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-8">
            {/* Progress Segmented Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-semibold">
                  0{reflectionIndex + 1} / 05 &nbsp;·&nbsp; {currentDimension.code}
                </span>
                <span className="border border-[#1A1A1A]/20 bg-[#FAF8F5] px-3 py-1 rounded-full text-[11px] uppercase tracking-wider text-[#1A1A1A]/70 font-medium">
                  เลือก 1 ข้อ
                </span>
              </div>

              {/* 5 Segment Progress Bars */}
              <div className="grid grid-cols-5 gap-2">
                {[0, 1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step === reflectionIndex
                        ? 'bg-[#1A1A1A]'
                        : step < reflectionIndex
                        ? 'bg-[#1A1A1A]/50'
                        : 'bg-[#1A1A1A]/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Header */}
            <div className="space-y-3 pt-2">
              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-light text-[#1A1A1A] leading-tight">
                {currentDimension.question}
              </h1>

              {/* Helper text */}
              <div className="bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-xl p-4 sm:p-5 flex items-start gap-3">
                <Info size={16} className="text-[#1A1A1A]/40 shrink-0 mt-0.5" />
                <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/75 font-light leading-relaxed">
                  <strong className="font-semibold text-[#1A1A1A]">Helper:</strong>{' '}
                  {getHelperText(reflectionIndex)}
                </p>
              </div>
            </div>

            {/* 4 Reflection Options (Strictly text only, no gems, no scoring categories) */}
            <div className="space-y-3 pt-2">
              {currentDimension.options.map((option) => {
                const isSelected = currentSelectedOptionId === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full text-left p-5 sm:p-6 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 group ${
                      isSelected
                        ? 'bg-[#FAF8F5] border-[#1A1A1A] ring-2 ring-[#1A1A1A] shadow-xs'
                        : 'bg-[#FAF8F5] border-[#1A1A1A]/15 hover:border-[#1A1A1A]/50 hover:bg-[#FAF8F5]/90'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Selection Radio Circle */}
                      <span
                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-sans shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FAF8F5]'
                            : 'border-[#1A1A1A]/30 bg-transparent text-[#1A1A1A]/50 group-hover:border-[#1A1A1A]/60'
                        }`}
                      >
                        {isSelected ? <Check size={13} strokeWidth={2.5} /> : option.letter}
                      </span>

                      {/* Option Text */}
                      <p
                        className={`font-serif text-lg sm:text-xl leading-snug transition-colors ${
                          isSelected
                            ? 'text-[#1A1A1A] font-medium'
                            : 'text-[#1A1A1A]/90 group-hover:text-[#1A1A1A]'
                        }`}
                      >
                        {option.label}
                      </p>
                    </div>

                    <span
                      className={`text-xs uppercase tracking-widest font-sans transition-opacity shrink-0 pt-1 ${
                        isSelected
                          ? 'text-[#1A1A1A] font-semibold opacity-100'
                          : 'text-[#1A1A1A]/30 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-10 flex items-center justify-between border-t border-[#1A1A1A]/10 mt-10">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#1A1A1A]/20 text-xs font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!currentSelectedOptionId}
              className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-xs font-sans uppercase tracking-[0.22em] font-medium transition-all cursor-pointer group shadow-sm ${
                currentSelectedOptionId
                  ? 'bg-[#4A3B32] hover:bg-[#1A1A1A] text-[#FAF8F5]'
                  : 'bg-[#1A1A1A]/20 text-[#1A1A1A]/40 cursor-not-allowed'
              }`}
            >
              <span>{reflectionIndex === 4 ? 'Complete & Reveal' : 'Continue'}</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      ) : (
        /* ================= REVEAL VIEW (AFTER Q5) =================
           Mandated in Brief:
           - Your Intention: [Recommended Intention]
           - Your Intention Gem: [Gem]
           - "One recommendation. Full permission to choose differently."
           - Disclaimer: "Symbolic reflection, not prediction. ไม่ใช่ psychological test หรือคำทำนาย"
           - Option to choose differently from the 8 intention gems
        ============================================================= */
        <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 sm:py-16 space-y-10 animate-fadeIn">
          {/* Header Banner with Required Message */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold text-[#1A1A1A]/60 block">
              03 / 05 · Intention Revealed
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#1A1A1A] leading-tight">
              One recommendation. Full permission to choose differently.
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed">
              Based on your five reflections, this is the light and inner intention that surfaced.
              You hold complete freedom to honour this suggestion or choose another stone that calls to you.
            </p>
          </div>

          {/* Core Reveal Hero Card */}
          <div className="bg-[#FAF8F5] border border-[#1A1A1A]/15 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Your Intention */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/50 font-semibold block">
                  Your Intention
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] font-light">
                  {activeOutcome.title}
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-[#1A1A1A]/80">
                  "{activeOutcome.affirmation}"
                </p>
              </div>

              <div className="space-y-2 border-t border-[#1A1A1A]/10 pt-4">
                <span className="font-sans text-[11px] uppercase tracking-wider text-[#1A1A1A]/50 font-semibold">
                  Intention Reflection:
                </span>
                <p className="font-serif text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed">
                  {activeOutcome.reading}
                </p>
              </div>

              {activeOutcome.id !== recommendedOutcome.id && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 text-xs font-sans text-[#1A1A1A]/80">
                  <span>Chosen by you (Recommendation was: {recommendedOutcome.title})</span>
                </div>
              )}
            </div>

            {/* Right: Your Intention Gem */}
            <div className="md:col-span-5 bg-[#F9F7F2] border border-[#1A1A1A]/10 rounded-xl p-6 sm:p-8 flex flex-col items-center text-center space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/50 font-semibold">
                Your Intention Gem
              </span>

              {/* Gem Orb Visual */}
              <div className="relative">
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-lg flex items-center justify-center border-4 border-white transition-transform hover:scale-105"
                  style={{ backgroundColor: activeOutcome.intentionGem.hex }}
                >
                  <div
                    className="w-14 h-14 rounded-full opacity-60 filter blur-[1px]"
                    style={{ backgroundColor: activeOutcome.intentionGem.accentHex }}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 via-transparent to-white/40 pointer-events-none" />
                </div>
                <div className="absolute -top-1 -right-1 text-[#1A1A1A]">
                  <NorthStarIcon size={16} />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-medium text-[#1A1A1A]">
                  {activeOutcome.intentionGem.name}
                </h3>
                <p className="font-sans text-xs uppercase tracking-wider text-[#1A1A1A]/60">
                  {activeOutcome.intentionGem.colorName}
                </p>
              </div>

              <p className="font-serif text-xs text-[#1A1A1A]/70 italic leading-relaxed pt-1">
                {activeOutcome.intentionGem.meaning}
              </p>
            </div>
          </div>

          {/* Mandatory Disclaimer Box */}
          <div className="bg-[#FAF8F5] border border-[#1A1A1A]/15 rounded-xl p-5 sm:p-6 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#1A1A1A]/70">
              <Info size={16} />
            </div>
            <div className="space-y-1 text-xs sm:text-sm font-sans text-[#1A1A1A]/75 font-light leading-relaxed">
              <p className="font-semibold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                Symbolic Reflection Disclaimer
              </p>
              <p>
                This reflection is a symbolic mirror designed to help anchor your private intention, not a
                prediction, medical diagnosis, or psychological assessment. You hold total sovereignty over
                your story and may choose whichever gem reflects your heart.
              </p>
              <p className="text-[11px] text-[#1A1A1A]/55 pt-0.5">
                (การสะท้อนความหมายนี้เป็นเพียงสัญลักษณ์เพื่อช่วยตั้งเจตจำนงส่วนตัว ไม่ใช่การทำนายทายทักหรือการทดสอบทางจิตวิทยา)
              </p>
            </div>
          </div>

          {/* Full Permission to Choose Differently: 8 Approved Intention Gems Palette */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A1A1A]/10 pb-3">
              <div className="space-y-0.5">
                <h3 className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-[#1A1A1A]">
                  Choose Differently (The 8 Intention Gems)
                </h3>
                <p className="font-sans text-xs text-[#1A1A1A]/60 font-light">
                  If another stone speaks more clearly to your season, select it below.
                </p>
              </div>
              <span className="text-[11px] font-sans uppercase tracking-wider text-[#1A1A1A]/50">
                8 Approved Gems
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {Object.entries(INTENTION_OUTCOMES)
                .filter(([key]) => key !== 'amethyst') // Only the 8 canonical outcomes per brief
                .map(([key, outcome]) => {
                  const isSelected = activeOutcome.id === outcome.id;
                  const isRecommended = recommendedOutcome.id === outcome.id;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveOutcome(outcome)}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#FAF8F5] border-[#1A1A1A] ring-2 ring-[#1A1A1A] shadow-xs'
                          : 'bg-[#FAF8F5]/70 border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                      }`}
                    >
                      {/* Recommendation Badge */}
                      {isRecommended && (
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#1A1A1A] text-[#FAF8F5] text-[9px] font-sans uppercase tracking-wider font-semibold">
                          Recommended
                        </span>
                      )}

                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-8 h-8 rounded-full shrink-0 border border-white shadow-xs"
                          style={{ backgroundColor: outcome.intentionGem.hex }}
                        />
                        <div className="overflow-hidden">
                          <span className="font-serif text-sm font-medium text-[#1A1A1A] block truncate">
                            {outcome.intentionGem.name}
                          </span>
                          <span className="font-sans text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 block truncate">
                            {outcome.title.split('&')[0].trim()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-sans pt-1 border-t border-[#1A1A1A]/5">
                        <span className="text-[#1A1A1A]/60 truncate">{outcome.title}</span>
                        {isSelected && (
                          <Check size={13} className="text-[#1A1A1A] shrink-0 font-bold" />
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#1A1A1A]/10">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#1A1A1A]/20 text-xs font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Retake Reflections</span>
            </button>

            <button
              type="button"
              onClick={() => onComplete(activeOutcome)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#4A3B32] hover:bg-[#1A1A1A] text-[#FAF8F5] rounded-full text-xs font-sans uppercase tracking-[0.25em] font-medium transition-all shadow-sm cursor-pointer group"
            >
              <Sparkles size={14} />
              <span>Confirm Intention & Proceed to Craft (Step 04)</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
