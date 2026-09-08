import React, { useState } from 'react';
import { RingConfiguration } from '../types';
import { METALS, DIAMOND_SHAPES } from '../data/parissaData';
import { GemIcon, NorthStarIcon } from './GemIcon';
import { PriceDisplay } from './PriceDisplay';
import { X, Trash2, ArrowRight, ShieldCheck, Clock, Loader2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: RingConfiguration[];
  onRemoveItem: (id: string) => void;
  onStartJourney: () => void;
  onCheckout?: () => Promise<string | null>;
  isCheckoutReady?: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onStartJourney,
  onCheckout,
  isCheckoutReady = false,
}) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!onCheckout) {
      onStartJourney();
      return;
    }
    setCheckingOut(true);
    setCheckoutError(null);
    try {
      const url = await onCheckout();
      if (url) {
        window.location.assign(url);
      } else {
        setCheckoutError(
          'Unable to start checkout. Please contact our atelier for a private consultation.'
        );
      }
    } catch (err) {
      setCheckoutError(
        err instanceof Error ? err.message : 'Checkout is temporarily unavailable.'
      );
    } finally {
      setCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between border-l border-[#1A1A1A]/10 animate-slideLeft">
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl text-[#1A1A1A]">Your Bag</span>
            <span className="text-xs font-sans text-[#1A1A1A]/50">({cartItems.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
              <NorthStarIcon size={24} className="text-[#1A1A1A]/30" />
              <p className="font-serif text-xl text-[#1A1A1A]/60">Your bag is empty.</p>
              <p className="font-sans text-xs text-[#1A1A1A]/40 max-w-xs leading-relaxed">
                Begin a journey to discover your rising essence and private intention.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const metalInfo = METALS[item.metal];
                const shapeInfo = DIAMOND_SHAPES[item.shape];

                return (
                  <div
                    key={item.id}
                    className="bg-[#FAF8F5] p-4 rounded-xl border border-[#1A1A1A]/10 space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C9A15A] font-semibold block">
                          {item.title || 'Bespoke Ring'}
                        </span>
                        <h4 className="font-serif text-lg font-medium text-[#1A1A1A]">
                          {shapeInfo.name} Solitaire · {item.carat}ct
                        </h4>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#1A1A1A]/40 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="text-xs font-sans text-[#1A1A1A]/70 space-y-1">
                      <p>
                        <span className="text-[#1A1A1A]/50">Metal:</span> {metalInfo.name} · US {item.ringSize}
                      </p>
                      <p>
                        <span className="text-[#1A1A1A]/50">Placement:</span>{' '}
                        {item.hand === 'left' ? 'Left' : 'Right'}{' '}
                        {item.finger} finger
                      </p>
                      {item.essenceGem && item.intentionGem && (
                        <div className="flex items-center gap-3 pt-1 text-[11px]">
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2 h-2 rounded-full inline-block"
                              style={{ backgroundColor: item.essenceGem.hex }}
                            />
                            {item.essenceGem.name}
                          </span>
                          <span>+</span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2 h-2 rounded-full inline-block"
                              style={{ backgroundColor: item.intentionGem.hex }}
                            />
                            {item.intentionGem.name}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-[#1A1A1A]">
                        <PriceDisplay config={item} />
                      </span>
                      <span className="text-[10px] font-sans uppercase tracking-wider text-[#1A1A1A]/50">
                        Handmade in Melbourne
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#1A1A1A]/10 bg-[#FAF8F5] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-wider text-[#1A1A1A]/60">
                Subtotal
              </span>
              <span className="font-serif text-lg font-medium text-[#1A1A1A]">
                {isCheckoutReady ? 'Calculated at checkout' : 'Price on request'}
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] font-sans text-[#1A1A1A]/60">
              <div className="flex items-center gap-2">
                <Clock size={12} />
                <span>Made to order (2–4 weeks crafting time)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} />
                <span>Complimentary insured courier delivery</span>
              </div>
            </div>

            {checkoutError && (
              <p className="text-[11px] font-sans text-red-700 leading-relaxed">
                {checkoutError}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full py-4 rounded-full bg-[#1A1A1A] text-[#FAF8F5] font-sans text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#1A1A1A]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkingOut ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Preparing Checkout…</span>
                </>
              ) : (
                <>
                  <span>
                    {isCheckoutReady
                      ? 'Proceed to Checkout'
                      : 'Request Private Consultation'}
                  </span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
