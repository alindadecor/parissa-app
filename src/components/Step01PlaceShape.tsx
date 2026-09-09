import React, { useState } from 'react';
import { Hand, Finger, DiamondShape } from '../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Step01Props {
  initialHand?: Hand;
  initialFinger?: Finger;
  initialShape?: DiamondShape;
  onComplete: (data: { hand: Hand; finger: Finger; shape: DiamondShape }) => void;
  onBackToHome: () => void;
}

const HAND_IMAGES: Record<Hand, string> = {
  left: 'https://cdn.shopify.com/s/files/1/1011/5058/9226/files/left-hand_6c47e33d-d942-4168-a96a-704c5b7c89e1.png?v=1788723046',
  right: 'https://cdn.shopify.com/s/files/1/1011/5058/9226/files/right-hand.png?v=1788722733',
};

const SHAPE_META: Record<DiamondShape, { name: string; title: string; copy: string }> = {
  round: { name: 'Round', title: 'The Centre', copy: 'Timeless, balanced, luminous' },
  oval: { name: 'Oval', title: 'The Continuum', copy: 'Graceful, evolving, elongated' },
  marquise: { name: 'Marquise', title: 'The Compass', copy: 'Directional, distinct, bold' },
};

const SHAPE_IMAGES: Record<DiamondShape, string> = {
  round: 'https://cdn.shopify.com/s/files/1/1011/5058/9226/files/round.png?v=1788934646',
  oval: 'https://cdn.shopify.com/s/files/1/1011/5058/9226/files/oval.png?v=1788934646',
  marquise: 'https://cdn.shopify.com/s/files/1/1011/5058/9226/files/marquise.png?v=1788934645',
};

function FingerVisual() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path
        d="M55 91C38 83 33 67 35 50l4-31c1-6 10-5 9 1l-2 25 4-35c1-6 10-5 9 1l-3 34 5-29c1-6 10-5 9 1l-4 31 6-22c2-6 10-3 8 3l-8 31c-4 16-9 25-17 31z"
        fill="#c9aa95"
        opacity=".8"
      />
    </svg>
  );
}

export const Step01PlaceShape: React.FC<Step01Props> = ({
  initialHand = 'left',
  initialFinger = 'ring',
  initialShape = 'oval',
  onComplete,
  onBackToHome,
}) => {
  const [hand, setHand] = useState<Hand>(initialHand);
  const [finger, setFinger] = useState<Finger>(initialFinger);
  const [shape, setShape] = useState<DiamondShape>(initialShape);

  const selectInGroup = <T extends string>(group: string, value: T, setter: (v: T) => void) => () => {
    setter(value);
  };

  return (
    <main className="min-h-[100dvh] w-full overflow-x-hidden bg-[#FAF6F0] text-[#3e3027] grid lg:grid-cols-[31%_69%]">
      {/* ============================================================
          EDITORIAL PANEL
      ============================================================ */}
      <aside
        className="relative min-h-[330px] lg:min-h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-9 lg:p-[50px] text-[#f8f0e7]"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(17,12,9,.22), rgba(17,12,9,.62)), url(https://cdn.shopify.com/s/files/1/1011/5058/9226/files/parissa-hero-woman-editorial.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="text-xs tracking-[0.24em] uppercase">The Journey</div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[42px] xl:text-[54px] font-medium leading-[0.98] max-w-[390px] mt-6 mb-9">
            A different<br />kind of meaning<br />lives here.
          </h2>
          <div className="w-8 h-px bg-white/70 mb-7" />
          <div className="text-xs tracking-[0.22em] uppercase leading-[1.8]">
            Same questions.<br />A brighter you.
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-3xl leading-none mb-5">✧</div>
          <div className="text-xs tracking-[0.22em] uppercase leading-[1.8]">
            Not just a ring.<br />A brighter you.
          </div>
        </div>
      </aside>

      {/* ============================================================
          CONTENT
      ============================================================ */}
      <section className="min-w-0 px-4 sm:px-[4.4vw] pt-8 sm:pt-9 pb-10">
        {/* Top Stepper */}
        <div className="flex items-center gap-3 sm:gap-[42px] flex-wrap sm:flex-nowrap mb-8 sm:mb-14">
          <div className="text-sm tracking-[0.16em] whitespace-nowrap">01 / 05</div>
          <div className="flex-1 max-w-[680px] min-w-[220px] sm:min-w-0">
            <div className="relative h-px bg-[#A99079]/70">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-[#6E5A49]" />
            </div>
            <div className="flex justify-between mt-2.5 text-[11px] text-[#75675c] tracking-[0.12em]">
              <span>01</span><span>02</span><span>03</span><span>04</span><span>05</span>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <span className="hidden sm:inline w-3 h-3 rounded-full border border-[#A99079] bg-[#FAF6F0]" />
            <button
              type="button"
              onClick={onBackToHome}
              className="ml-auto underline underline-offset-4 text-[13px] whitespace-nowrap cursor-pointer text-[#3e3027]"
            >
              ♡&nbsp; Save &amp; Exit
            </button>
          </div>
        </div>

        {/* ============================================================
            MAIN GRID: PLACE | SHAPE
        ============================================================ */}
        <div className="grid gap-7 sm:gap-12 lg:grid-cols-2 lg:gap-[52px]">
          {/* ---- COLUMN 1: PLACE ---- */}
          <section className="min-w-0">
            <div className="text-[13px] tracking-[0.2em] mb-4">01. PLACE</div>
            <h1 className="font-serif-luxury text-[42px] sm:text-5xl xl:text-[66px] leading-[0.9] text-[#433329] mt-0 mb-5 max-w-[600px] font-medium">
              Where will you<br />wear your light?
            </h1>
            <p className="text-base leading-[1.55] text-[#75675c] max-w-[530px] mb-0">
              There is no wrong answer. Choose the place that feels most natural to you.
            </p>

            <div className="text-[13px] font-medium tracking-[0.2em] mt-7 mb-3.5">1. HAND</div>
            <div className="grid grid-cols-2 gap-3">
              {(['left', 'right'] as Hand[]).map((h) => {
                const isSelected = hand === h;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={selectInGroup('hand', h, setHand)}
                    className={`relative rounded-[11px] border text-left overflow-hidden cursor-pointer bg-white/20 transition-all hover:-translate-y-px hover:border-[#6E5A49] ${
                      isSelected ? 'border-[1.5px] border-[#6E5A49] shadow-[0_0_0_1px_rgba(110,90,73,.04)]' : 'border border-[rgba(110,90,73,.24)]'
                    }`}
                  >
                    <span
                      className={`absolute left-3 top-3 z-[2] w-[23px] h-[23px] rounded-full border text-xs grid place-items-center ${
                        isSelected ? 'bg-[#6E5A49] border-[#6E5A49] text-white' : 'border-[#A99079] bg-[#FAF6F0] text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <div className="p-[7px]">
                      <div className="h-[185px] rounded-[7px] overflow-hidden">
                        <img
                          src={HAND_IMAGES[h]}
                          alt={`${h === 'left' ? 'Left' : 'Right'} hand`}
                          width={1024}
                          height={1536}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-center text-sm py-2.5 pb-2">{h === 'left' ? 'Left Hand' : 'Right Hand'}</div>
                  </button>
                );
              })}
            </div>

            <div className="text-[13px] font-medium tracking-[0.2em] mt-7 mb-3.5">2. FINGER</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {(['index', 'middle', 'ring', 'pinky'] as Finger[]).map((f) => {
                const isSelected = finger === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={selectInGroup('finger', f, setFinger)}
                    className={`relative rounded-[11px] border cursor-pointer transition-all hover:-translate-y-px hover:border-[#6E5A49] p-[5px] pb-1 bg-white/20 ${
                      isSelected ? 'border-[1.5px] border-[#6E5A49]' : 'border border-[rgba(110,90,73,.24)]'
                    }`}
                  >
                    <span
                      className={`absolute left-2.5 top-2.5 z-[2] w-[23px] h-[23px] rounded-full border text-xs grid place-items-center ${
                        isSelected ? 'bg-[#6E5A49] border-[#6E5A49] text-white' : 'border-[#A99079] bg-[#FAF6F0] text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <div className="h-[100px] rounded-[6px] bg-gradient-to-br from-[#eee4d9] to-[#f8f1e9] grid place-items-center overflow-hidden p-2">
                      <div className="w-[92%] h-[92%] opacity-80">
                        <FingerVisual />
                      </div>
                    </div>
                    <div className="text-center text-[13px] mt-2 mb-1 capitalize">{f}</div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ---- COLUMN 2: SHAPE ---- */}
          <section className="min-w-0 lg:border-l lg:border-[rgba(110,90,73,.24)] lg:pl-[52px] lg:mt-10 lg:pb-2 mt-10 lg:mt-0">
            <div className="text-[13px] tracking-[0.2em] mb-4">02. SHAPE</div>
            <h1 className="font-serif-luxury text-[42px] sm:text-5xl xl:text-[66px] leading-[0.9] text-[#433329] mt-0 mb-5 max-w-[600px] font-medium">
              Choose your shape.
            </h1>
            <p className="text-base leading-[1.55] text-[#75675c] max-w-[530px] mb-3.5">
              How do you want your diamond to feel? Choose the silhouette you are drawn to. You can
              change it later.
            </p>

            <div className="grid sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-2.5 sm:gap-4 mt-4">
              {(['round', 'oval', 'marquise'] as DiamondShape[]).map((s) => {
                const isSelected = shape === s;
                const meta = SHAPE_META[s];
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={selectInGroup('shape', s, setShape)}
                    className={`relative rounded-[11px] border text-left overflow-hidden cursor-pointer transition-all hover:-translate-y-px hover:border-[#6E5A49] ${
                      isSelected ? 'border-[1.5px] border-[#6E5A49] shadow-[0_0_0_1px_rgba(110,90,73,.04)]' : 'border border-[rgba(110,90,73,.24)]'
                    }`}
                  >
                    <span
                      className={`absolute left-3 top-3 z-[2] w-[23px] h-[23px] rounded-full border text-xs grid place-items-center ${
                        isSelected ? 'bg-[#6E5A49] border-[#6E5A49] text-white' : 'border-[#A99079] bg-[#FAF6F0] text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <div className="p-1.5 px-[10px] pb-4 min-h-[290px] xl:min-h-[320px]">
                      <div className="relative h-[140px] xl:h-[155px] rounded-[7px] overflow-hidden mb-4">
                        <img
                          src={SHAPE_IMAGES[s]}
                          alt={meta.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute bottom-2 left-2 rounded-full bg-[#FAF6F0]/90 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.18em] uppercase text-[#433329]">
                          {meta.name}
                        </span>
                      </div>
                      <div className="text-center text-[13px] font-medium tracking-[0.2em] uppercase">{meta.name}</div>
                      <div className="text-center font-serif-luxury text-[22px] font-medium mt-2">{meta.title}</div>
                      <div className="text-center text-xs leading-[1.55] text-[#77695e] mt-3 pb-1">{meta.copy}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quote Divider */}
            <div className="flex items-center gap-4 my-6 text-[#5f5148]">
              <span className="h-px bg-[rgba(110,90,73,.24)] flex-1" />
              <span className="font-serif-luxury italic text-[19px] whitespace-nowrap">
                &ldquo;A different kind of meaning lives here.&rdquo;
              </span>
              <span className="h-px bg-[rgba(110,90,73,.24)] flex-1" />
            </div>

            <button
              type="button"
              onClick={() => onComplete({ hand, finger, shape })}
              className="w-full rounded-full bg-[#6E5A49] text-white py-[18px] text-[15px] cursor-pointer flex items-center justify-center gap-2 hover:bg-[#5f4c3d] transition-colors"
            >
              Continue to Essence
              <ArrowRight size={17} />
            </button>
            <div className="flex justify-center items-center gap-2.5 mt-[23px] text-[13px]">
              <button
                type="button"
                onClick={onBackToHome}
                className="cursor-pointer inline-flex items-center gap-2.5 text-[#3e3027]"
              >
                <span className="w-[34px] h-[34px] border border-[#A99079] rounded-full grid place-items-center">
                  <ArrowLeft size={18} />
                </span>
                Back to Home
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};