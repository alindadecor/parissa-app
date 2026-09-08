import React from 'react';
import { RingConfiguration } from '../types';
import { METALS, DIAMOND_SHAPES } from '../data/parissaData';
import { JewelryCanvas } from './JewelryCanvas';
import { PriceDisplay } from './PriceDisplay';
import { X, Trash2, ArrowRight, BookOpen, Printer } from 'lucide-react';

interface MyStoriesModalProps {
  stories: RingConfiguration[];
  onClose: () => void;
  onRemoveStory: (id: string) => void;
  onSelectStoryForAtelier: (config: RingConfiguration) => void;
  onStartNewJourney: () => void;
}

export const MyStoriesModal: React.FC<MyStoriesModalProps> = ({
  stories,
  onClose,
  onRemoveStory,
  onSelectStoryForAtelier,
  onStartNewJourney,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fadeIn overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-[#1A1A1A]/20 max-w-5xl w-full rounded shadow-2xl relative my-auto p-6 md:p-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#1A1A1A]/20 hover:bg-[#E8E4D9] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#1A1A1A]" />
        </button>

        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-[#1A1A1A]/60" />
            <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/60">
              Personal Archive
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl md:text-4xl text-[#1A1A1A] font-light mb-2">
            My Saved Parissa Stories
          </h2>
          <p className="font-serif italic text-sm text-[#1A1A1A]/70">
            "Your astrological readings and consecrated ring configurations preserved in perpetuity."
          </p>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-16 bg-[#E8E4D9]/30 rounded border border-[#1A1A1A]/10 p-8">
            <span className="text-3xl font-serif text-[#1A1A1A]/30 block mb-3">✦</span>
            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] mb-2">No Stories Consecrated Yet</h3>
            <p className="font-sans text-xs text-[#1A1A1A]/60 max-w-sm mx-auto mb-6">
              Begin your 5-step journey to discover your Rising Sign Essence Gem and personal Intention Gem.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartNewJourney();
              }}
              className="px-6 py-3 bg-[#1A1A1A] text-[#F9F7F2] rounded-full text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-[#1A1A1A]/90 transition-all cursor-pointer"
            >
              Begin Journey
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {stories.map((story) => {
              const metal = METALS[story.metal];
              const shape = DIAMOND_SHAPES[story.shape];

              return (
                <div
                  key={story.id}
                  className="bg-[#FAF8F5] border border-[#1A1A1A]/15 p-6 md:p-8 rounded-sm shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                >
                  {/* Canvas Thumbnail */}
                  <div className="md:col-span-4 bg-[#E8E4D9]/40 border border-[#1A1A1A]/10 p-4 rounded flex items-center justify-center">
                    <JewelryCanvas
                      shape={story.shape}
                      metal={story.metal}
                      carat={story.carat}
                      essenceGem={story.essenceArchetype.essenceGem}
                      intentionGem={story.intentionOutcome.intentionGem}
                      showHiddenGems={true}
                      className="w-full max-w-[180px] aspect-square"
                    />
                  </div>

                  {/* Story Text */}
                  <div className="md:col-span-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/50">
                          Saved on {story.savedAt}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveStory(story.id)}
                          className="text-[#1A1A1A]/40 hover:text-red-700 transition-colors p-1"
                          title="Remove from archive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] font-medium mb-1">
                        {story.title}
                      </h3>
                      <p className="font-serif italic text-sm text-[#1A1A1A]/70 mb-3">
                        {story.essenceArchetype.archetypeTitle} ({story.essenceArchetype.sign}) • {story.intentionOutcome.title}
                      </p>

                      <div className="p-3 bg-[#E8E4D9]/40 rounded text-xs font-serif text-[#1A1A1A]/85 mb-4 leading-relaxed">
                        "{story.essenceArchetype.reading.slice(0, 160)}..."
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#1A1A1A]/70 mb-4">
                        <span><strong>Cut:</strong> {shape.name}</span>
                        <span>•</span>
                        <span><strong>Metal:</strong> {metal.name}</span>
                        <span>•</span>
                        <span><strong>Size:</strong> US {story.ringSize}</span>
                        <span>•</span>
                        <span className="font-mono font-semibold text-[#1A1A1A]">
                          <PriceDisplay config={story} />
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="text-xs font-sans uppercase tracking-[0.15em] text-[#1A1A1A]/60 hover:text-[#1A1A1A] flex items-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Reading</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectStoryForAtelier(story);
                        }}
                        className="px-6 py-2.5 bg-[#1A1A1A] text-[#F9F7F2] rounded-full text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-[#1A1A1A]/90 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <span>Add to Atelier Bag</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
