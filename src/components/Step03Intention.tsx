import React, { useState } from 'react';
import { IntentionOutcome } from '../types';
import {
  INTENTION_DIMENSIONS_DETAILED,
  INTENTION_OUTCOMES,
  calculateIntentionOutcome,
} from '../data/parissaData';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Info,
  Gem,
  Sparkles,
  Hand,
  HeartHandshake,
} from 'lucide-react';
import { NorthStarIcon } from './GemIcon';
import { GEMSTONES } from '../data/gemstones';

interface Step03Props {
  initialIntention?: IntentionOutcome;
  onComplete: (intention: IntentionOutcome) => void;
  onBack: () => void;
}

const JOURNEY_STEPS = [
  { num: 1, label: 'Place & Shape' },
  { num: 2, label: 'Essence' },
  { num: 3, label: 'Intention' },
  { num: 4, label: 'Craft' },
  { num: 5, label: 'Reveal' },
];

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

  const gemKeywords = activeOutcome.intentionGem.meaning
    .replace(/\./g, '')
    .split(',')
    .map((s) => s.trim().replace(/^and\s+/i, '').toUpperCase())
    .filter(Boolean)
    .join(' · ');

  const matchedGemstone = GEMSTONES.find(
    (g) => g.name.toLowerCase() === activeOutcome.intentionGem.name.toLowerCase(),
  );

  const gemBenefits = [
    { icon: Gem, label: 'A conscious talisman' },
    { icon: Sparkles, label: 'Cut for inner light' },
    { icon: Hand, label: 'Set by hand' },
    { icon: HeartHandshake, label: 'Yours to choose' },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#f7f3ed] text-[#17242c] overflow-x-hidden lg:grid lg:grid-cols-[minmax(280px,340px)_1fr]">
      {/* ============ LEFT SIDEBAR (desktop only) ============ */}
      <aside className="hidden lg:flex flex-col justify-between bg-[#13292a] text-[#f7f3ed] px-10 py-10 lg:sticky lg:top-20 lg:self-start lg:h-[calc(100dvh-80px)]">
        <div className="space-y-12">
          {/* PARISSA Logo + tagline */}
          <div>
            <p className="font-serif-luxury text-3xl font-light tracking-wide text-[#f7f3ed]">
              PARISSA
            </p>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#c9a15a] mt-2">
              A Brighter You
            </p>
          </div>

          {/* Vertical Step List */}
          <nav className="space-y-1">
            {JOURNEY_STEPS.map((step) => {
              const isActive = step.num === 3;
              const isDone = step.num < 3;
              return (
                <div
                  key={step.num}
                  className={`flex items-center gap-4 py-3 border-b border-[#f7f3ed]/10 ${
                    isActive ? 'text-[#f7f3ed]' : isDone ? 'text-[#f7f3ed]/55' : 'text-[#f7f3ed]/30'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-sans border shrink-0 ${
                      isActive
                        ? 'bg-[#c9a15a] border-[#c9a15a] text-[#13292a] font-semibold'
                        : isDone
                        ? 'border-[#f7f3ed]/40 text-[#f7f3ed]/70'
                        : 'border-[#f7f3ed]/20 text-[#f7f3ed]/40'
                    }`}
                  >
                    {isDone ? '✓' : `0${step.num}`}
                  </span>
                  <span className="font-sans text-xs uppercase tracking-[0.22em]">
                    {step.label}
                  </span>
                  {isActive && <NorthStarIcon size={13} className="ml-auto text-[#c9a15a]" />}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="space-y-6">
          {/* Pull Quote */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#c9a15a]">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="text-[8px]">
                  ✦
                </span>
              ))}
            </div>
            <blockquote className="font-serif-luxury text-2xl font-light leading-snug text-[#f7f3ed]">
              A deeper you creates a brighter tomorrow.
            </blockquote>
          </div>

          {/* Sidebar Footer */}
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#f7f3ed]/40">
            Fine Jewellery for a More Meaningful You
          </p>
        </div>
      </aside>

      {/* ============ RIGHT CONTENT ============ */}
      <div className="min-w-0">
        {/* Content Top Bar */}
        <div className="border-b border-[#d4cbc1] bg-[#f7f3ed] px-6 sm:px-10 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between text-xs font-sans">
            <div className="flex items-center gap-6 sm:gap-10">
              <span className="font-semibold uppercase tracking-[0.22em] text-[#17242c]">
                03 / 05 <span className="ml-1 text-[#c9a15a]">INTENTION</span>
              </span>
              <div className="hidden md:flex items-center gap-5 text-[#17242c]/40 uppercase tracking-[0.18em]">
                {JOURNEY_STEPS.map((s) => (
                  <span key={s.num} className={s.num === 3 ? 'text-[#17242c] font-semibold' : ''}>
                    {`0${s.num}`}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={reflectionIndex === 5 ? () => setReflectionIndex(4) : handlePrev}
              className="text-xs uppercase tracking-[0.2em] text-[#17242c]/50 hover:text-[#17242c] transition-colors flex items-center gap-1.5 cursor-pointer"
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

            {/* Fixed bottom CTA bar — mobile only */}
            <div
              className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-[#faf8f4] border-t border-[#e8e0d8]"
              style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}
            >
              <div className="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#d4cbc1] text-[11px] font-sans uppercase tracking-[0.18em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer shrink-0"
                >
                  <RotateCcw size={12} />
                  <span>Retake</span>
                </button>
                <button
                  type="button"
                  onClick={() => onComplete(activeOutcome)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed] rounded-full text-[11px] font-sans uppercase tracking-[0.2em] font-medium transition-all shadow-sm cursor-pointer group"
                >
                  <Sparkles size={12} />
                  <span>Continue to Craft</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
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
          <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-10 sm:py-14 flex flex-col justify-between animate-fadeIn min-h-[calc(100dvh-140px)]">
            <div className="space-y-8">
              {/* Progress Segmented Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="uppercase tracking-[0.25em] text-[#69635d] font-semibold">
                    {currentDimension.subtitle.toUpperCase()} <span className="mx-1">·</span>{' '}
                    {currentDimension.code}
                  </span>
                  <span className="border border-[#d4cbc1] bg-[#eee6dd] px-3 py-1 rounded-full text-[11px] uppercase tracking-wider text-[#17242c]/70 font-medium">
                    Select one
                  </span>
                </div>

                {/* 5 Segment Progress Bars */}
                <div className="grid grid-cols-5 gap-2">
                  {[0, 1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        step === reflectionIndex
                          ? 'bg-[#13292a]'
                          : step < reflectionIndex
                          ? 'bg-[#c9a15a]'
                          : 'bg-[#d4cbc1]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Header */}
              <div className="space-y-3 pt-2">
                <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-light text-[#17242c] leading-tight">
                  {currentDimension.question}
                </h1>

                {/* Helper text */}
                <div className="bg-[#eee6dd] border border-[#d4cbc1] rounded-xl p-4 sm:p-5 flex items-start gap-3">
                  <Info size={16} className="text-[#17242c]/40 shrink-0 mt-0.5" />
                  <p className="font-sans text-xs sm:text-sm text-[#17242c]/70 font-light leading-relaxed">
                    <strong className="font-semibold text-[#17242c]">Helper:</strong>{' '}
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
                          ? 'bg-[#eee6dd] border-[#13292a] ring-2 ring-[#13292a]/20 shadow-sm'
                          : 'bg-[#eee6dd]/50 border-[#d4cbc1] hover:border-[#4d3023]/50 hover:bg-[#eee6dd]'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Selection Radio Circle */}
                        <span
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-sans shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? 'border-[#4d3023] bg-[#4d3023] text-[#f7f3ed]'
                              : 'border-[#d4cbc1] bg-transparent text-[#17242c]/50 group-hover:border-[#4d3023]/60'
                          }`}
                        >
                          {isSelected ? <Check size={13} strokeWidth={2.5} /> : option.letter}
                        </span>

                        {/* Option Text */}
                        <p
                          className={`font-serif text-lg sm:text-xl leading-snug transition-colors ${
                            isSelected
                              ? 'text-[#17242c] font-medium'
                              : 'text-[#17242c]/80 group-hover:text-[#17242c]'
                          }`}
                        >
                          {option.label}
                        </p>
                      </div>

                      <span
                        className={`text-xs uppercase tracking-widest font-sans transition-opacity shrink-0 pt-1 ${
                          isSelected
                            ? 'text-[#4d3023] font-semibold opacity-100'
                            : 'text-[#17242c]/30 opacity-0 group-hover:opacity-100'
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
            <div className="pt-10 flex items-center justify-between border-t border-[#d4cbc1] mt-10">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#d4cbc1] text-xs font-sans uppercase tracking-[0.2em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer"
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
                    ? 'bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed]'
                    : 'bg-[#d4cbc1] text-[#17242c]/40 cursor-not-allowed'
                }`}
              >
                <span>{reflectionIndex === 4 ? 'Complete & Reveal' : 'Continue'}</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ) : (
          /* ================= REVEAL VIEW (AFTER Q5) =================
             Design spec · Intention screen:
             - eyebrow "YOUR INTENTION"
             - h1: activeOutcome.theme (Cormorant Garamond)
             - body: reading based on reflection result
             - decorative "SAME QUESTIONS. A BRIGHTER YOU."
             - Intention Gem card (gem + name + keywords + description + 4 benefits)
             - handwritten affirmation note
             - "One recommendation. Full permission to choose differently."
             - CTAs: Retake Reflections (outlined) + Continue to Craft → (dark primary)
          ============================================================= */
          <div className="max-w-3xl mx-auto w-full px-6 py-10 sm:py-14 animate-fadeIn">
            {/* Eyebrow + decorative */}
            <div className="flex items-start justify-between gap-4">
              <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold text-[#69635d]">
                Your Intention
              </span>
              <span className="hidden sm:block font-sans text-[10px] uppercase tracking-[0.25em] text-[#17242c]/35">
                Same Questions. A Brighter You.
              </span>
            </div>

            {/* Headline + body */}
            <div className="mt-4 space-y-4">
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[56px] font-light text-[#17242c] leading-[1.05]">
                {activeOutcome.theme}
              </h1>
              <p className="font-serif text-base sm:text-lg text-[#17242c]/75 leading-relaxed max-w-xl">
                {activeOutcome.reading}
              </p>
            </div>

            {/* Intention Gem Card */}
            <div className="mt-10 bg-[#eee6dd] border border-[#d4cbc1] rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Gem visual */}
                <div className="relative shrink-0">
                  {matchedGemstone ? (
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-lg border-4 border-[#f7f3ed]">
                      <img
                        src={matchedGemstone.image}
                        alt={matchedGemstone.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-lg flex items-center justify-center border-4 border-[#f7f3ed]"
                      style={{ backgroundColor: activeOutcome.intentionGem.hex }}
                    >
                      <div
                        className="w-16 h-16 rounded-full opacity-60 blur-[1px]"
                        style={{ backgroundColor: activeOutcome.intentionGem.accentHex }}
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 via-transparent to-white/40 pointer-events-none" />
                    </div>
                  )}
                  <div className="absolute -top-1 -right-1 text-[#17242c]">
                    <NorthStarIcon size={16} />
                  </div>
                </div>

                {/* Gem identity + keywords */}
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#69635d]">
                    Your Intention Gem
                  </p>
                  <h3 className="font-serif-luxury text-3xl font-medium text-[#17242c] mt-1">
                    {matchedGemstone ? matchedGemstone.name : activeOutcome.intentionGem.name}
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-wider text-[#c9a15a] mt-1">
                    {activeOutcome.intentionGem.colorName}
                  </p>

                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-[#17242c] mt-4">
                    {matchedGemstone ? matchedGemstone.keywords : gemKeywords}
                  </p>

                  <p className="font-serif text-sm text-[#17242c]/70 italic leading-relaxed mt-3">
                    "{activeOutcome.intentionGem.symbolism}"
                  </p>

                  {/* 4 benefit icons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                    {gemBenefits.map((benefit) => {
                      const Icon = benefit.icon;
                      return (
                        <div
                          key={benefit.label}
                          className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#f7f3ed] border border-[#d4cbc1] text-center"
                        >
                          <Icon size={16} className="text-[#4d3023]" />
                          <span className="font-sans text-[10px] uppercase tracking-wider text-[#17242c]/60 leading-tight">
                            {benefit.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Handwritten affirmation note */}
            <p className="font-script text-3xl sm:text-4xl text-[#4d3023] mt-8 text-center sm:text-left">
              {activeOutcome.affirmation}
            </p>

            {/* Mandatory choice disclosure */}
            <div className="mt-6 bg-[#eee6dd] border border-[#d4cbc1] rounded-xl p-5 sm:p-6 flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#f7f3ed] border border-[#d4cbc1] flex items-center justify-center shrink-0 mt-0.5 text-[#4d3023]">
                <Info size={16} />
              </div>
              <div className="space-y-1 text-xs sm:text-sm font-sans text-[#17242c]/70 font-light leading-relaxed">
                <p className="font-semibold text-[#17242c] uppercase tracking-wider text-[11px]">
                  One recommendation. Full permission to choose differently.
                </p>
                <p>
                  This reflection is a symbolic mirror designed to help anchor your private intention,
                  not a prediction, medical diagnosis, or psychological assessment. You hold total
                  sovereignty over your story and may choose whichever gem reflects your heart.
                </p>
              </div>
            </div>

            {/* Full Permission to Choose Differently: 8 Approved Intention Gems Palette */}
            <div className="space-y-4 pt-6 pb-[120px] sm:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 border-b border-[#d4cbc1] pb-3">
                <h3 className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-[#17242c]">
                  Choose Differently · 8 Intention Gems
                </h3>
                <span className="text-[11px] font-sans uppercase tracking-wider text-[#69635d] text-right">
                  {activeOutcome.id !== recommendedOutcome.id
                    ? `Chosen by you (Recommended: ${recommendedOutcome.title})`
                    : 'Your recommendation'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
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
                        className={`p-2.5 sm:p-4 rounded-xl border text-left flex flex-col items-center text-center relative min-h-[80px] transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#eee6dd] border-[#4d3023] ring-2 ring-[#4d3023]/15 shadow-sm'
                            : 'bg-[#eee6dd]/50 border-[#d4cbc1] hover:border-[#4d3023]/50'
                        }`}
                      >
                        {isRecommended && (
                          <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#13292a] text-[#f7f3ed] text-[9px] font-sans uppercase tracking-wider font-semibold whitespace-nowrap">
                            Recommended
                          </span>
                        )}

                        <div className="flex flex-col items-center gap-2 mb-3">
                          <div
                            className="w-8 h-8 rounded-full shrink-0 border border-[#f7f3ed] shadow-sm"
                            style={{ backgroundColor: outcome.intentionGem.hex }}
                          />
                          <div className="overflow-hidden">
                            <span className="font-serif text-sm font-medium text-[#17242c] block truncate">
                              {outcome.intentionGem.name}
                            </span>
                            <span className="font-sans text-[10px] uppercase tracking-wider text-[#17242c]/50 block truncate">
                              {outcome.title.split('&')[0].trim()}
                            </span>
                          </div>
                        </div>

                        <div className="w-full flex items-center justify-between text-[11px] font-sans pt-1 border-t border-[#13292a]/5">
                          <span className="text-[#17242c]/60 truncate">{outcome.title}</span>
                          {isSelected && (
                            <Check size={13} className="text-[#4d3023] shrink-0 font-bold" />
                          )}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Bottom CTAs — desktop only (inline) */}
            <div className="hidden sm:flex items-center justify-between gap-4 pt-8 border-t border-[#d4cbc1] mt-8">
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#d4cbc1] text-xs font-sans uppercase tracking-[0.2em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Retake Reflections</span>
              </button>

              <button
                type="button"
                onClick={() => onComplete(activeOutcome)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed] rounded-full text-xs font-sans uppercase tracking-[0.25em] font-medium transition-all shadow-sm cursor-pointer group"
              >
                <Sparkles size={14} />
                <span>Continue to Craft</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Fixed bottom CTA bar — mobile only */}
            <div
              className="lg:hidden fixed inset-x-0 bottom-0 z-50"
              style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)', background: '#faf8f4', borderTop: '1px solid #e8e0d8' }}
            >
              <div className="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#d4cbc1] text-[11px] font-sans uppercase tracking-[0.18em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer shrink-0"
                >
                  <RotateCcw size={12} />
                  <span>Retake</span>
                </button>
                <button
                  type="button"
                  onClick={() => onComplete(activeOutcome)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed] rounded-full text-[11px] font-sans uppercase tracking-[0.2em] font-medium transition-all shadow-sm cursor-pointer group"
                >
                  <Sparkles size={12} />
                  <span>Continue to Craft</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};