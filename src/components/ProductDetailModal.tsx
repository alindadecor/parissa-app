import React, { useState } from 'react';
import { ProductListing, MetalType } from '../types';
import { METALS, COLLECTIONS, DIAMOND_SHAPES, ESSENCE_ARCHETYPES, INTENTION_OUTCOMES } from '../data/parissaData';
import { JewelryCanvas } from './JewelryCanvas';
import { X, Sparkles, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductListing;
  onClose: () => void;
  onPersonalize: (product: ProductListing) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onPersonalize,
}) => {
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(product.metalDefault);
  const collectionInfo = COLLECTIONS[product.collection];
  const shapeInfo = DIAMOND_SHAPES[product.shape];

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fadeIn overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-[#1A1A1A]/20 max-w-4xl w-full rounded shadow-2xl relative my-auto overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 rounded-full border border-[#1A1A1A]/20 hover:bg-[#E8E4D9] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-[#1A1A1A]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Visual Showcase */}
          <div className="md:col-span-6 bg-[#E8E4D9]/40 p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#1A1A1A]/10 flex flex-col items-center justify-between min-h-[440px]">
            <div className="w-full flex justify-between text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/50">
              <span>{product.collection}</span>
              <span>{shapeInfo.name}</span>
            </div>

            <JewelryCanvas
              shape={product.shape}
              metal={selectedMetal}
              carat={product.carat}
              essenceGem={ESSENCE_ARCHETYPES.Leo.essenceGem}
              intentionGem={INTENTION_OUTCOMES.emerald_sovereignty.intentionGem}
              showHiddenGems={true}
              className="w-full max-w-[300px] aspect-square py-4"
            />

            {/* Metal Alloy Selector in PDP */}
            <div className="w-full pt-4 border-t border-[#1A1A1A]/10">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]/60 block mb-2 text-center">
                Preview in Noble Metal
              </span>
              <div className="flex justify-center gap-3">
                {(['18k-yellow-gold', '18k-rose-gold', '18k-white-gold', 'platinum'] as MetalType[]).map((mKey) => (
                  <button
                    key={mKey}
                    type="button"
                    onClick={() => setSelectedMetal(mKey)}
                    className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                      selectedMetal === mKey ? 'ring-2 ring-[#1A1A1A] scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: METALS[mKey].hex }}
                    title={METALS[mKey].name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Details & Personalize Bridge */}
          <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/50 block mb-2">
                Atelier Silhouette
              </span>
              <h2 className="font-serif-luxury text-3xl md:text-4xl text-[#1A1A1A] font-light mb-2">
                {product.name}
              </h2>
              <p className="font-sans text-xs text-[#1A1A1A]/60 mb-6">
                {product.subtitle}
              </p>

              <p className="font-serif text-base text-[#1A1A1A]/80 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Architectural Detail Highlight */}
              <div className="bg-[#E8E4D9]/30 border border-[#1A1A1A]/10 p-4 rounded text-xs mb-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] block mb-1">
                  Atelier Architecture:
                </span>
                <p className="font-sans text-[#1A1A1A]/70 leading-relaxed">
                  {collectionInfo.architecturalDetail}
                </p>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-2 text-xs font-sans text-[#1A1A1A]/80 pb-6 border-b border-[#1A1A1A]/10">
                <div className="flex justify-between">
                  <span className="text-[#1A1A1A]/50">Diamond Geometry:</span>
                  <span className="font-medium">{shapeInfo.name} ({shapeInfo.title})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1A1A1A]/50">Carat Weight:</span>
                  <span className="font-medium">{product.carat.toFixed(1)} Carats (Customizable 1.0 - 3.0ct)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1A1A1A]/50">Hidden Shank:</span>
                  <span className="font-medium">Personalized Essence + Intention Gems + North Star</span>
                </div>
              </div>

              {/* Price & Lead Time */}
              <div className="py-4 flex items-center justify-between">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/50 block">Investment</span>
                  <span className="font-mono text-sm font-semibold text-[#1A1A1A] tracking-wider">
                    {product.priceDisplay || 'Price on request'}
                  </span>
                </div>
                <div className="text-right text-xs text-[#1A1A1A]/60 font-serif italic">
                  Handcrafted in 4–6 Weeks
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-[#1A1A1A]/10 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onPersonalize(product);
                }}
                className="w-full py-4 bg-[#1A1A1A] text-[#F9F7F2] rounded-full text-xs font-sans uppercase tracking-[0.25em] font-medium hover:bg-[#1A1A1A]/90 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#F9F7F2]" />
                <span>Personalize With Your Essence</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-6 pt-2 text-[10px] font-sans uppercase tracking-[0.15em] text-[#1A1A1A]/40">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> GIA / IGI Certified
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Melbourne Atelier
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3 h-3" /> 100% Recycled Gold
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
