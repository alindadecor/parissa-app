import React, { useState, useEffect } from 'react';
import { EssenceArchetype, ZodiacSign } from '../types';
import {
  ESSENCE_ARCHETYPES,
  calculateRisingSign,
  getZodiacSignFromDate,
  getZodiacMetadata,
} from '../data/parissaData';
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Lock,
  Sun,
  Compass,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { NorthStarIcon } from './GemIcon';

interface Step02Props {
  initialBirthData?: {
    date: string;
    city: string;
    time?: string;
    isExactTimeKnown: boolean;
  };
  initialEssence?: EssenceArchetype;
  onComplete: (data: {
    birthData: {
      date: string;
      city: string;
      time?: string;
      isExactTimeKnown: boolean;
    };
    essenceArchetype: EssenceArchetype;
  }) => void;
  onBack: () => void;
}

type Step02Mode =
  | 'form' // 02-1, 02-2, 02-3: Where did your story begin?
  | 'fallback_not_sure' // 02-alt: Not sure about your exact time?
  | 'calculating' // 02-4: Finding your Essence...
  | 'result' // 02-5: YOUR ESSENCE result
  | 'choose_another'; // Explore all 12 archetypes manually

export const Step02Essence: React.FC<Step02Props> = ({
  initialBirthData = {
    date: '1998-08-14',
    city: 'Melbourne, Australia',
    time: '06:45',
    isExactTimeKnown: true,
  },
  initialEssence,
  onComplete,
  onBack,
}) => {
  // Mode state
  const [mode, setMode] = useState<Step02Mode>('form');

  // Form Fields
  const [date, setDate] = useState(initialBirthData.date || '1998-08-14');
  const [time, setTime] = useState(initialBirthData.time || '06:45');
  const [city, setCity] = useState(initialBirthData.city || 'Melbourne, Australia');
  const [isExactTimeKnown, setIsExactTimeKnown] = useState(initialBirthData.isExactTimeKnown);

  // Fallback options state (when time is unknown)
  // 'sun_sign' | 'manual_archetype'
  const [fallbackMethod, setFallbackMethod] = useState<'sun_sign' | 'manual_archetype'>('sun_sign');

  // Resolved Archetype State
  const [activeArchetype, setActiveArchetype] = useState<EssenceArchetype>(
    initialEssence || ESSENCE_ARCHETYPES.Leo
  );
  const [isSunSignReading, setIsSunSignReading] = useState(false);

  // Element filter for choose_another view
  const [elementFilter, setElementFilter] = useState<'All' | 'Fire' | 'Earth' | 'Air' | 'Water'>('All');

  // Calculation Timer Effect: triggers smooth transition from 'calculating' to 'result'
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mode === 'calculating') {
      timer = setTimeout(() => {
        setMode('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1600);
    }
    return () => clearTimeout(timer);
  }, [mode]);

  // Primary calculation handler
  const handleStartCalculation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let targetSign: ZodiacSign;
    if (isExactTimeKnown && time) {
      targetSign = calculateRisingSign(date, time, city);
      setIsSunSignReading(false);
    } else {
      targetSign = getZodiacSignFromDate(date);
      setIsSunSignReading(true);
    }

    const archetype = ESSENCE_ARCHETYPES[targetSign] || ESSENCE_ARCHETYPES.Leo;
    setActiveArchetype(archetype);
    setMode('calculating');
  };

  // Fallback submit handler
  const handleFallbackContinue = () => {
    if (fallbackMethod === 'sun_sign') {
      const sunSign = getZodiacSignFromDate(date);
      const archetype = ESSENCE_ARCHETYPES[sunSign] || ESSENCE_ARCHETYPES.Leo;
      setActiveArchetype(archetype);
      setIsSunSignReading(true);
      setMode('calculating');
    } else {
      setMode('choose_another');
    }
  };

  // Confirm final essence
  const handleConfirmEssence = () => {
    onComplete({
      birthData: {
        date,
        city,
        time: isExactTimeKnown ? time : undefined,
        isExactTimeKnown,
      },
      essenceArchetype: activeArchetype,
    });
  };

  // Metadata for current archetype
  const activeMeta = getZodiacMetadata(activeArchetype.sign);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#F9F7F2] text-[#1A1A1A] flex flex-col">
      {/* Top Stepper Navigation Bar */}
      <div className="border-b border-[#1A1A1A]/10 bg-[#FAF8F5]/80 px-6 sm:px-12 py-3.5 sticky top-0 z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-6 sm:gap-10">
            <span className="font-semibold uppercase tracking-[0.22em] text-[#1A1A1A]">
              02 / 05 &nbsp;ESSENCE
            </span>
            <div className="hidden md:flex items-center gap-6 text-[#1A1A1A]/40 uppercase tracking-[0.2em]">
              <span className="text-[#1A1A1A]/70 flex items-center gap-1.5">
                <Check size={12} strokeWidth={2.5} /> 01
              </span>
              <div className="flex items-center gap-1.5 text-[#1A1A1A] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
                <span>02</span>
              </div>
              <NorthStarIcon size={12} className="text-[#1A1A1A]/30" />
              <span>03</span>
              <span>04</span>
              <span>05</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (mode === 'fallback_not_sure') setMode('form');
              else if (mode === 'choose_another') setMode('result');
              else if (mode === 'result') setMode('form');
              else onBack();
            }}
            className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>
              {mode === 'fallback_not_sure'
                ? 'Back to Birth Details'
                : mode === 'choose_another'
                ? 'Back to Result'
                : mode === 'result'
                ? 'Edit Birth Details'
                : 'Back to Place & Shape'}
            </span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          SCREEN 1: BIRTH DETAILS FORM ("Where did your story begin?")
          Matches Desktop Left Panel & Mobile 02-1 / 02-2 / 02-3
         ========================================================================= */}
      {mode === 'form' && (
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center animate-fadeIn">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[46px] font-light text-[#1A1A1A] leading-[1.15]">
                Where did your <br className="hidden sm:inline" />
                story begin?
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed max-w-lg">
                Your birth details help us reveal the essence that has always been within you. If
                you're not sure about the exact time, that's okay — we'll guide you another way.
              </p>
            </div>

            <form onSubmit={handleStartCalculation} className="space-y-6 pt-2">
              {/* Field 1: Date of Birth */}
              <div className="space-y-2">
                <label className="block font-sans text-[11px] uppercase tracking-[0.22em] font-semibold text-[#1A1A1A]/80">
                  DATE OF BIRTH
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1A1A1A]/40">
                    <Calendar size={16} />
                  </span>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-[#FAF8F5] border border-[#1A1A1A]/20 rounded-xl text-sm font-sans text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-all"
                  />
                </div>
              </div>

              {/* Field 2: Exact Local Time */}
              <div className="space-y-2.5">
                <label className="block font-sans text-[11px] uppercase tracking-[0.22em] font-semibold text-[#1A1A1A]/80">
                  EXACT LOCAL TIME
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1A1A1A]/40">
                    <Clock size={16} />
                  </span>
                  <input
                    type="time"
                    disabled={!isExactTimeKnown}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 bg-[#FAF8F5] border rounded-xl text-sm font-sans text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-all ${
                      isExactTimeKnown
                        ? 'border-[#1A1A1A]/20'
                        : 'border-[#1A1A1A]/10 bg-[#FAF8F5]/50 text-[#1A1A1A]/40 cursor-not-allowed'
                    }`}
                  />
                </div>

                {/* Exact time radio toggle buttons matching mockup */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsExactTimeKnown(true)}
                    className={`py-3 px-4 rounded-xl border text-xs font-sans transition-all flex items-center gap-2.5 cursor-pointer ${
                      isExactTimeKnown
                        ? 'bg-[#FAF8F5] border-[#1A1A1A] ring-1 ring-[#1A1A1A] text-[#1A1A1A] font-medium'
                        : 'bg-[#FAF8F5]/60 border-[#1A1A1A]/15 text-[#1A1A1A]/60 hover:border-[#1A1A1A]/40'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isExactTimeKnown
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                          : 'border-[#1A1A1A]/40'
                      }`}
                    >
                      {isExactTimeKnown && <Check size={10} strokeWidth={3} />}
                    </span>
                    <span>I know my exact time</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsExactTimeKnown(false);
                      setMode('fallback_not_sure');
                    }}
                    className={`py-3 px-4 rounded-xl border text-xs font-sans transition-all flex items-center gap-2.5 cursor-pointer ${
                      !isExactTimeKnown
                        ? 'bg-[#FAF8F5] border-[#1A1A1A] ring-1 ring-[#1A1A1A] text-[#1A1A1A] font-medium'
                        : 'bg-[#FAF8F5]/60 border-[#1A1A1A]/15 text-[#1A1A1A]/60 hover:border-[#1A1A1A]/40'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        !isExactTimeKnown
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                          : 'border-[#1A1A1A]/40'
                      }`}
                    >
                      {!isExactTimeKnown && <Check size={10} strokeWidth={3} />}
                    </span>
                    <span>I'm not sure</span>
                  </button>
                </div>
              </div>

              {/* Field 3: Birth City / Country */}
              <div className="space-y-2">
                <label className="block font-sans text-[11px] uppercase tracking-[0.22em] font-semibold text-[#1A1A1A]/80">
                  BIRTH CITY / COUNTRY
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1A1A1A]/40">
                    <MapPin size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Search city or country"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-[#FAF8F5] border border-[#1A1A1A]/20 rounded-xl text-sm font-sans text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-all placeholder:text-[#1A1A1A]/30"
                  />
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#4A3B32] hover:bg-[#1A1A1A] text-[#FAF8F5] rounded-full text-xs font-sans uppercase tracking-[0.22em] font-medium transition-all shadow-sm flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span>Reveal My Essence</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Privacy Footnote */}
              <div className="flex items-center justify-center gap-2 pt-1 text-[#1A1A1A]/50 text-xs font-sans font-light">
                <Lock size={12} className="shrink-0" />
                <span>Your information is private and only used to create your personalised experience.</span>
              </div>
            </form>
          </div>

          {/* Right Column: Editorial Atmosphere Archway Visual */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] rounded-2xl overflow-hidden shadow-sm border border-[#1A1A1A]/10 bg-gradient-to-b from-[#FAF8F5] via-[#EAE6DD] to-[#DDD7CA] flex flex-col justify-between p-8 group">
              <div className="flex justify-between items-start">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/40 font-medium">
                  Celestial Arch
                </span>
                <NorthStarIcon className="w-5 h-5 text-[#1A1A1A]/40" />
              </div>

              {/* Decorative Arch Silhouette */}
              <div className="mx-auto w-48 h-64 border-t border-x border-[#1A1A1A]/15 rounded-t-full flex items-center justify-center relative">
                <div className="w-36 h-52 border-t border-x border-[#1A1A1A]/10 rounded-t-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#1A1A1A]/30" />
                  </div>
                </div>
              </div>

              {/* Inscription Overlay at bottom right */}
              <div className="text-right text-[#1A1A1A]/80 select-none">
                <p className="font-serif-luxury text-sm sm:text-base tracking-[0.18em] leading-relaxed uppercase font-light">
                  SOME THINGS <br />
                  FIND YOU. <br />
                  OTHERS <br />
                  HAVE ALWAYS <br />
                  BEEN YOURS.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 2: FALLBACK (02-alt: "Not sure about your exact time?")
          Matches Mockup 02-alt with Sun Sign and Manual Archetype options
         ========================================================================= */}
      {mode === 'fallback_not_sure' && (
        <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 lg:py-20 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-[#1A1A1A]/50 block">
                02 / 05 · TIME GUIDANCE
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-light text-[#1A1A1A] leading-tight">
                Not sure about <br className="hidden sm:inline" />
                your exact time?
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed max-w-xl">
                That's okay. We can still help you explore your essence. Choose how you would like to
                uncover your light today:
              </p>
            </div>

            {/* Two Selectable Choice Cards */}
            <div className="space-y-4 pt-2">
              {/* Option 1: Sun Sign */}
              <button
                type="button"
                onClick={() => setFallbackMethod('sun_sign')}
                className={`w-full p-6 sm:p-7 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-5 group ${
                  fallbackMethod === 'sun_sign'
                    ? 'bg-[#FAF8F5] border-[#1A1A1A] ring-2 ring-[#1A1A1A] shadow-xs'
                    : 'bg-[#FAF8F5]/80 border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                }`}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      fallbackMethod === 'sun_sign'
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                        : 'border-[#1A1A1A]/20 bg-white text-[#1A1A1A]/70 group-hover:border-[#1A1A1A]/50'
                    }`}
                  >
                    <Sun size={22} strokeWidth={1.75} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-medium">
                      Discover through your Sun Sign
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-wider text-[#1A1A1A]/50 font-medium">
                      (A simpler reading)
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed pt-1">
                      We anchor your talisman to your cardinal solar degree and dawn baseline using
                      your date of birth ({date}).
                    </p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    fallbackMethod === 'sun_sign'
                      ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                      : 'border-[#1A1A1A]/30'
                  }`}
                >
                  {fallbackMethod === 'sun_sign' && <Check size={12} strokeWidth={3} />}
                </div>
              </button>

              {/* Option 2: Choose Archetype Manually */}
              <button
                type="button"
                onClick={() => setFallbackMethod('manual_archetype')}
                className={`w-full p-6 sm:p-7 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-5 group ${
                  fallbackMethod === 'manual_archetype'
                    ? 'bg-[#FAF8F5] border-[#1A1A1A] ring-2 ring-[#1A1A1A] shadow-xs'
                    : 'bg-[#FAF8F5]/80 border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                }`}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      fallbackMethod === 'manual_archetype'
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                        : 'border-[#1A1A1A]/20 bg-white text-[#1A1A1A]/70 group-hover:border-[#1A1A1A]/50'
                    }`}
                  >
                    <Compass size={22} strokeWidth={1.75} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-medium">
                      Choose your own archetype
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-wider text-[#1A1A1A]/50 font-medium">
                      (Explore manually)
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed pt-1">
                      Browse all 12 astrological alignments freely and select the archetype that
                      speaks directly to your spirit.
                    </p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    fallbackMethod === 'manual_archetype'
                      ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                      : 'border-[#1A1A1A]/30'
                  }`}
                >
                  {fallbackMethod === 'manual_archetype' && <Check size={12} strokeWidth={3} />}
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-10 flex items-center justify-between border-t border-[#1A1A1A]/10 mt-12">
            <button
              type="button"
              onClick={() => {
                setIsExactTimeKnown(true);
                setMode('form');
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#1A1A1A]/20 text-xs font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleFallbackContinue}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#4A3B32] hover:bg-[#1A1A1A] text-[#FAF8F5] rounded-full text-xs font-sans uppercase tracking-[0.22em] font-medium transition-all shadow-sm cursor-pointer group"
            >
              <span>Continue</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 3: CALCULATION ANIMATION (02-4: "Finding your Essence...")
          Celestial sun with orbital rings and pulse animation
         ========================================================================= */}
      {mode === 'calculating' && (
        <div className="flex-1 flex flex-col items-center justify-between px-6 py-16 sm:py-24 text-center animate-fadeIn max-w-xl mx-auto w-full">
          <div className="w-full" />

          {/* Celestial Animation Centerpiece */}
          <div className="space-y-8 flex flex-col items-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
              {/* Outer pulsing astrolabe rings */}
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/30 animate-ping opacity-30" />
              <div className="absolute inset-2 rounded-full border border-[#D4AF37]/40 animate-spin [animation-duration:12s]" />
              <div className="absolute inset-6 rounded-full border border-[#1A1A1A]/20 border-dashed animate-spin [animation-duration:20s] [animation-direction:reverse]" />

              {/* Glowing celestial center */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#FFF9E6] shadow-xl flex items-center justify-center relative z-10 border-2 border-white/80">
                <Sun size={32} className="text-[#8B5E14] animate-pulse" />
              </div>

              {/* Cardinal Sparkles */}
              <span className="absolute -top-1 text-[#D4AF37]">✦</span>
              <span className="absolute -bottom-1 text-[#D4AF37]">✦</span>
              <span className="absolute -left-1 text-[#D4AF37]">✦</span>
              <span className="absolute -right-1 text-[#D4AF37]">✦</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] font-light">
                Finding your Essence...
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed">
                Reading the stars, aligning your unique story.
              </p>
            </div>

            {/* Subtle progress loading bar */}
            <div className="w-48 h-1 bg-[#1A1A1A]/10 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-[#4A3B32] rounded-full animate-[loadingBar_1.6s_ease-in-out_infinite]" />
            </div>
          </div>

          {/* Footer Quote matching Mockup 02-4 */}
          <div className="pt-12 text-[#1A1A1A]/50 text-xs font-serif tracking-[0.2em] uppercase max-w-xs mx-auto leading-relaxed">
            SOME THINGS FIND YOU. <br />
            OTHERS HAVE ALWAYS <br />
            BEEN YOURS.
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 4: ESSENCE RESULT (02-5: "Leo Rising / THE LEADER")
          Matches Desktop Right Panel & Mobile 02-5 layout
         ========================================================================= */}
      {mode === 'result' && (
        <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 lg:py-16 space-y-10 animate-fadeIn">
          {/* Main Card Container */}
          <div className="bg-[#FAF8F5] border border-[#1A1A1A]/15 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
            {/* Subtle Astrological Constellation Wheel in background */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full border border-[#1A1A1A]/[0.06] pointer-events-none select-none flex items-center justify-center">
              <div className="w-56 h-56 rounded-full border border-[#1A1A1A]/[0.05] border-dashed" />
            </div>

            {/* Top Row: YOUR ESSENCE + Zodiac Glyph Emblem */}
            <div className="flex items-start justify-between gap-4 border-b border-[#1A1A1A]/10 pb-6">
              <div className="space-y-1.5">
                <span className="font-sans text-xs uppercase tracking-[0.28em] font-semibold text-[#1A1A1A]/50 block">
                  YOUR ESSENCE
                </span>
                <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-[52px] font-light text-[#1A1A1A] leading-tight">
                  {activeArchetype.sign} {isSunSignReading ? 'Sun' : 'Rising'}
                </h1>
                <p className="font-serif text-lg sm:text-xl text-[#1A1A1A] tracking-wider uppercase font-medium pt-1">
                  {activeMeta.archetypeLabel}
                </p>
                <p className="font-sans text-xs uppercase tracking-[0.22em] text-[#1A1A1A]/60 pt-0.5">
                  {activeMeta.traitsFormatted}
                </p>
              </div>

              {/* Zodiac Glyph & Element Pillars Badge */}
              <div className="flex flex-col items-end text-right shrink-0">
                <span className="font-serif text-4xl sm:text-5xl text-[#1A1A1A]/80 leading-none">
                  {activeMeta.glyph}
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 pt-2 font-medium">
                  {activeMeta.pillars}
                </span>
              </div>
            </div>

            {/* Narrative Paragraph */}
            <div className="py-6 border-b border-[#1A1A1A]/10">
              <p className="font-serif text-base sm:text-lg text-[#1A1A1A]/85 leading-relaxed font-light">
                {activeArchetype.reading}
              </p>
            </div>

            {/* Centerpiece Gem Visual + Gem Section */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left: Gemstone Visual Spotlight */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group">
                  {/* Faceted gem orb visual with ambient reflections */}
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl bg-gradient-to-br from-[#F9F7F2] to-[#EAE6DD] border border-[#1A1A1A]/10 flex items-center justify-center shadow-md">
                    <div
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-lg flex items-center justify-center border-4 border-white transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundColor: activeArchetype.essenceGem.hex }}
                    >
                      <div
                        className="w-16 h-16 rounded-full opacity-60 filter blur-[1px]"
                        style={{ backgroundColor: activeArchetype.essenceGem.accentHex }}
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 via-transparent to-white/40 pointer-events-none" />
                    </div>
                    <div className="absolute top-3 right-3 text-[#1A1A1A]/60">
                      <NorthStarIcon size={16} />
                    </div>
                  </div>

                  <div className="absolute -bottom-2.5 -right-2.5 bg-[#FAF8F5] border border-[#1A1A1A]/10 px-2.5 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest text-[#1A1A1A]/60 shadow-xs">
                    Talisman
                  </div>
                </div>
              </div>

              {/* Right: Gem Details Block matching Mockup */}
              <div className="md:col-span-7 space-y-4">
                <div className="space-y-1">
                  <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A]/50 font-semibold block">
                    YOUR ESSENCE GEM
                  </span>
                  <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] font-light">
                    {activeArchetype.essenceGem.name}
                  </h2>
                  <p className="font-sans text-xs uppercase tracking-[0.22em] text-[#1A1A1A]/70 font-semibold pt-0.5">
                    {activeMeta.gemTagline}
                  </p>
                </div>

                <p className="font-serif text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed font-light">
                  {activeMeta.gemDescription}
                </p>

                <div className="inline-flex items-center gap-2 pt-1 text-xs font-sans text-[#1A1A1A]/60">
                  <span
                    className="w-3 h-3 rounded-full border border-black/10"
                    style={{ backgroundColor: activeArchetype.essenceGem.hex }}
                  />
                  <span>Color: {activeArchetype.essenceGem.colorName}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons matching Mockup 02-5 */}
            <div className="pt-6 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setMode('choose_another')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#1A1A1A]/20 text-xs font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw size={13} />
                <span>Choose Another Essence</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmEssence}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#4A3B32] hover:bg-[#1A1A1A] text-[#FAF8F5] rounded-full text-xs font-sans uppercase tracking-[0.25em] font-medium transition-all shadow-sm cursor-pointer group"
              >
                <span>This Feels Like Me</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Bottom Right Stamp Hallmark */}
            <div className="pt-8 flex items-center justify-end gap-2 text-[#1A1A1A]/45 text-[11px] font-sans uppercase tracking-[0.22em] select-none">
              <NorthStarIcon size={12} />
              <span>DIFFERENT STORIES. THE SAME BRIGHTER YOU.</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 5: CHOOSE ANOTHER ESSENCE (12 Archetypes Browser)
          Allows customer to select any of the 12 approved archetypes
         ========================================================================= */}
      {mode === 'choose_another' && (
        <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 lg:py-16 space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-[0.28em] font-semibold text-[#1A1A1A]/50 block">
              The 12 Astrological Alignments
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#1A1A1A]">
              Choose Your Essence Archetype
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed">
              If another archetype or stone speaks more clearly to your inner nature, you have full
              freedom to select it directly.
            </p>
          </div>

          {/* Element Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            {(['All', 'Fire', 'Earth', 'Air', 'Water'] as const).map((elem) => (
              <button
                key={elem}
                type="button"
                onClick={() => setElementFilter(elem)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-[0.18em] transition-all cursor-pointer ${
                  elementFilter === elem
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-[#FAF8F5] border border-[#1A1A1A]/15 text-[#1A1A1A]/70 hover:border-[#1A1A1A]/40'
                }`}
              >
                {elem}
              </button>
            ))}
          </div>

          {/* 12 Archetypes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {(Object.keys(ESSENCE_ARCHETYPES) as ZodiacSign[])
              .filter((sign) => {
                if (elementFilter === 'All') return true;
                return ESSENCE_ARCHETYPES[sign].element === elementFilter;
              })
              .map((sign) => {
                const item = ESSENCE_ARCHETYPES[sign];
                const meta = getZodiacMetadata(sign);
                const isSelected = activeArchetype.sign === sign;

                return (
                  <button
                    key={sign}
                    type="button"
                    onClick={() => {
                      setActiveArchetype(item);
                      setMode('result');
                    }}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-[#FAF8F5] border-[#1A1A1A] ring-2 ring-[#1A1A1A] shadow-xs'
                        : 'bg-[#FAF8F5]/80 border-[#1A1A1A]/15 hover:border-[#1A1A1A]/50 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {/* Top Row: Glyph & Sign */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-2xl text-[#1A1A1A]/80 leading-none">
                          {meta.glyph}
                        </span>
                        <div>
                          <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                            {item.archetypeTitle}
                          </h3>
                          <span className="font-sans text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 block">
                            {item.sign} · {item.element}
                          </span>
                        </div>
                      </div>

                      {/* Gem Swatch */}
                      <div
                        className="w-7 h-7 rounded-full border-2 border-white shadow-xs shrink-0"
                        style={{ backgroundColor: item.essenceGem.hex }}
                        title={item.essenceGem.name}
                      />
                    </div>

                    {/* Poetic Core */}
                    <p className="font-serif text-xs text-[#1A1A1A]/75 italic line-clamp-2 mb-3">
                      "{item.coreLight}"
                    </p>

                    {/* Bottom Gem & Action Tag */}
                    <div className="pt-2 border-t border-[#1A1A1A]/5 flex items-center justify-between text-[11px] font-sans">
                      <span className="text-[#1A1A1A]/60">{item.essenceGem.name}</span>
                      <span
                        className={`uppercase tracking-wider font-medium text-[10px] ${
                          isSelected ? 'text-[#1A1A1A] font-semibold' : 'text-[#1A1A1A]/40'
                        }`}
                      >
                        {isSelected ? 'Active' : 'Select'}
                      </span>
                    </div>
                  </button>
                );
              })}
          </div>

          {/* Bottom return button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={() => setMode('result')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#1A1A1A]/20 text-xs font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Return to Essence Result</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
