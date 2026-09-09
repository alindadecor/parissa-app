import React from 'react';
import { Check } from 'lucide-react';

export interface SelectionCardProps {
  image?: string;
  emoji?: string;
  letter?: string;
  swatch?: string;
  label: string;
  sublabel?: string;
  description?: string;
  selected: boolean;
  recommended?: boolean;
  onClick: () => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  image,
  emoji,
  letter,
  swatch,
  label,
  sublabel,
  description,
  selected,
  recommended,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left transition-all cursor-pointer relative"
      style={{
        minHeight: '64px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        border: selected ? '2px solid #4d3023' : '1px solid #e0d8cf',
        borderRadius: '10px',
        background: selected ? '#f5f0ea' : '#faf8f4',
      }}
    >
      {recommended && (
        <span
          className="absolute -top-2 left-3 font-sans font-semibold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded text-[9px]"
          style={{ background: '#2c1810', color: '#fff' }}
        >
          Recommended
        </span>
      )}

      <span
        className="shrink-0 grid place-items-center"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          overflow: 'hidden',
          ...(swatch
            ? { border: '1px solid #d4cbc1', backgroundColor: swatch }
            : { backgroundColor: '#e8e0d8' }),
        }}
      >
        {swatch && <span className="w-full h-full rounded-full" style={{ backgroundColor: swatch }} />}
        {!swatch && image && (
          <img src={image} alt={label} className="w-full h-full object-cover" />
        )}
        {!swatch && !image && letter && (
          <span
            className="w-full h-full grid place-items-center text-[15px] font-semibold"
            style={{ backgroundColor: '#3a2819', color: '#fff' }}
          >
            {letter}
          </span>
        )}
        {!swatch && !image && !letter && emoji && (
          <span className="text-[26px] leading-none grid place-items-center">{emoji}</span>
        )}
      </span>

      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="text-[14px] font-semibold leading-snug" style={{ color: '#2c1810' }}>
          {label}
        </span>
        {sublabel && (
          <span className="text-[11px] leading-snug truncate" style={{ letterSpacing: '0.08em', color: '#8a7968' }}>
            {sublabel}
          </span>
        )}
        {description && (
          <span className="text-[11px] leading-snug" style={{ color: '#a09080' }}>
            {description}
          </span>
        )}
      </div>

      {selected && <Check size={16} strokeWidth={2.5} className="shrink-0" style={{ color: '#4d3023' }} />}
    </button>
  );
};
