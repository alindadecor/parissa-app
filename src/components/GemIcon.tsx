import React from 'react';
import { DiamondShape } from '../types';

interface GemIconProps {
  shape?: DiamondShape;
  colorHex?: string;
  accentHex?: string;
  size?: number;
  className?: string;
  faceted?: boolean;
}

export const GemIcon: React.FC<GemIconProps> = ({
  shape = 'round',
  colorHex = '#D4AF37',
  accentHex = '#F8DF81',
  size = 40,
  className = '',
  faceted = true,
}) => {
  if (shape === 'round') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="50" cy="50" r="46" fill={colorHex} fillOpacity="0.2" stroke={colorHex} strokeWidth="2" />
        {faceted ? (
          <>
            {/* Brilliant cut facet web */}
            <circle cx="50" cy="50" r="24" fill={accentHex} fillOpacity="0.4" stroke={colorHex} strokeWidth="1.2" />
            <polygon points="50,4 64,26 36,26" fill={colorHex} fillOpacity="0.3" stroke={colorHex} strokeWidth="0.8" />
            <polygon points="96,50 74,64 74,36" fill={colorHex} fillOpacity="0.3" stroke={colorHex} strokeWidth="0.8" />
            <polygon points="50,96 36,74 64,74" fill={colorHex} fillOpacity="0.3" stroke={colorHex} strokeWidth="0.8" />
            <polygon points="4,50 26,36 26,64" fill={colorHex} fillOpacity="0.3" stroke={colorHex} strokeWidth="0.8" />
            <line x1="50" y1="4" x2="50" y2="26" stroke={colorHex} strokeWidth="1" />
            <line x1="96" y1="50" x2="74" y2="50" stroke={colorHex} strokeWidth="1" />
            <line x1="50" y1="96" x2="50" y2="74" stroke={colorHex} strokeWidth="1" />
            <line x1="4" y1="50" x2="26" y2="50" stroke={colorHex} strokeWidth="1" />
            <line x1="18" y1="18" x2="33" y2="33" stroke={colorHex} strokeWidth="0.8" />
            <line x1="82" y1="18" x2="67" y2="33" stroke={colorHex} strokeWidth="0.8" />
            <line x1="82" y1="82" x2="67" y2="67" stroke={colorHex} strokeWidth="0.8" />
            <line x1="18" y1="82" x2="33" y2="67" stroke={colorHex} strokeWidth="0.8" />
            {/* Center star sparkle */}
            <circle cx="50" cy="50" r="4" fill="#FFFFFF" fillOpacity="0.9" />
          </>
        ) : (
          <circle cx="50" cy="50" r="30" fill={colorHex} />
        )}
      </svg>
    );
  }

  if (shape === 'oval') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <ellipse cx="50" cy="60" rx="36" ry="52" fill={colorHex} fillOpacity="0.2" stroke={colorHex} strokeWidth="2" />
        {faceted ? (
          <>
            <ellipse cx="50" cy="60" rx="20" ry="30" fill={accentHex} fillOpacity="0.4" stroke={colorHex} strokeWidth="1.2" />
            <polygon points="50,8 60,30 40,30" fill={colorHex} fillOpacity="0.3" stroke={colorHex} strokeWidth="0.8" />
            <polygon points="50,112 40,90 60,90" fill={colorHex} fillOpacity="0.3" stroke={colorHex} strokeWidth="0.8" />
            <polygon points="14,60 30,48 30,72" fill={colorHex} fillOpacity="0.3" stroke={colorHex} strokeWidth="0.8" />
            <polygon points="86,60 70,48 70,72" fill={colorHex} fillOpacity="0.3" stroke={colorHex} strokeWidth="0.8" />
            <line x1="50" y1="8" x2="50" y2="30" stroke={colorHex} strokeWidth="1" />
            <line x1="50" y1="112" x2="50" y2="90" stroke={colorHex} strokeWidth="1" />
            <line x1="14" y1="60" x2="30" y2="60" stroke={colorHex} strokeWidth="1" />
            <line x1="86" y1="60" x2="70" y2="60" stroke={colorHex} strokeWidth="1" />
            <circle cx="50" cy="60" r="4" fill="#FFFFFF" fillOpacity="0.9" />
          </>
        ) : (
          <ellipse cx="50" cy="60" rx="26" ry="40" fill={colorHex} />
        )}
      </svg>
    );
  }

  // Marquise / The Compass
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50 4 C85 45, 85 95, 50 136 C15 95, 15 45, 50 4 Z"
        fill={colorHex}
        fillOpacity="0.2"
        stroke={colorHex}
        strokeWidth="2"
      />
      {faceted ? (
        <>
          <path
            d="M50 25 C68 50, 68 90, 50 115 C32 90, 32 50, 50 25 Z"
            fill={accentHex}
            fillOpacity="0.4"
            stroke={colorHex}
            strokeWidth="1.2"
          />
          <line x1="50" y1="4" x2="50" y2="136" stroke={colorHex} strokeWidth="1.2" />
          <line x1="20" y1="70" x2="80" y2="70" stroke={colorHex} strokeWidth="1" />
          <line x1="32" y1="45" x2="68" y2="45" stroke={colorHex} strokeWidth="0.8" />
          <line x1="32" y1="95" x2="68" y2="95" stroke={colorHex} strokeWidth="0.8" />
          <circle cx="50" cy="70" r="4" fill="#FFFFFF" fillOpacity="0.9" />
        </>
      ) : (
        <path
          d="M50 20 C75 55, 75 85, 50 120 C25 85, 25 55, 50 20 Z"
          fill={colorHex}
        />
      )}
    </svg>
  );
};

export const NorthStarIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = 'text-[#1A1A1A]',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Four main points */}
    <path d="M20 0 L23 16 L39 19 L23 22 L20 38 L17 22 L1 19 L17 16 Z" />
    {/* Four minor diagonal rays */}
    <path d="M20 12 L25 15 L28 20 L25 25 L20 28 L15 25 L12 20 L15 15 Z" opacity="0.6" />
    <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
  </svg>
);

// High-fidelity faceted brilliant diamond illustration matching UI/UX mockup
export const FacetedDiamondIllustration: React.FC<{
  shape: DiamondShape;
  size?: number;
  className?: string;
}> = ({ shape, size = 110, className = '' }) => {
  if (shape === 'round') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <radialGradient id="roundGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#E9ECEF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#CED4DA" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        {/* Outer girdle */}
        <circle cx="80" cy="80" r="74" fill="url(#roundGlow)" stroke="#343A40" strokeWidth="1.2" />
        {/* Table octagon */}
        <polygon
          points="62,42 98,42 118,62 118,98 98,118 62,118 42,98 42,62"
          fill="#FFFFFF"
          stroke="#495057"
          strokeWidth="1.2"
        />
        {/* Star facets */}
        <polygon points="80,10 98,42 62,42" fill="#F8F9FA" stroke="#6C757D" strokeWidth="0.8" />
        <polygon points="150,80 118,98 118,62" fill="#E9ECEF" stroke="#6C757D" strokeWidth="0.8" />
        <polygon points="80,150 62,118 98,118" fill="#F1F3F5" stroke="#6C757D" strokeWidth="0.8" />
        <polygon points="10,80 42,62 42,98" fill="#E9ECEF" stroke="#6C757D" strokeWidth="0.8" />
        {/* Kite facets */}
        <polygon points="129,31 98,42 118,62" fill="#FFFFFF" stroke="#6C757D" strokeWidth="0.8" />
        <polygon points="129,129 118,98 98,118" fill="#DEE2E6" stroke="#6C757D" strokeWidth="0.8" />
        <polygon points="31,129 62,118 42,98" fill="#FFFFFF" stroke="#6C757D" strokeWidth="0.8" />
        <polygon points="31,31 42,62 62,42" fill="#DEE2E6" stroke="#6C757D" strokeWidth="0.8" />
        {/* Radial facet lines */}
        <line x1="80" y1="6" x2="80" y2="42" stroke="#495057" strokeWidth="1" />
        <line x1="154" y1="80" x2="118" y2="80" stroke="#495057" strokeWidth="1" />
        <line x1="80" y1="154" x2="80" y2="118" stroke="#495057" strokeWidth="1" />
        <line x1="6" y1="80" x2="42" y2="80" stroke="#495057" strokeWidth="1" />
        {/* Inner center culet highlight */}
        <circle cx="80" cy="80" r="3" fill="#212529" opacity="0.8" />
        <circle cx="78" cy="78" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  if (shape === 'oval') {
    return (
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 140 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <radialGradient id="ovalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#E9ECEF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#CED4DA" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        {/* Outer oval border */}
        <ellipse cx="70" cy="90" rx="64" ry="84" fill="url(#ovalGlow)" stroke="#343A40" strokeWidth="1.2" />
        {/* Central table */}
        <polygon
          points="52,45 88,45 110,70 110,110 88,135 52,135 30,110 30,70"
          fill="#FFFFFF"
          stroke="#495057"
          strokeWidth="1.2"
        />
        {/* Apex star facets */}
        <polygon points="70,6 88,45 52,45" fill="#F8F9FA" stroke="#6C757D" strokeWidth="0.8" />
        <polygon points="70,174 52,135 88,135" fill="#F1F3F5" stroke="#6C757D" strokeWidth="0.8" />
        <polygon points="6,90 30,70 30,110" fill="#E9ECEF" stroke="#6C757D" strokeWidth="0.8" />
        <polygon points="134,90 110,110 110,70" fill="#E9ECEF" stroke="#6C757D" strokeWidth="0.8" />
        {/* Corner facets */}
        <polygon points="118,32 88,45 110,70" fill="#FFFFFF" stroke="#6C757D" strokeWidth="0.8" />
        <polygon points="118,148 110,110 88,135" fill="#DEE2E6" stroke="#6C757D" strokeWidth="0.8" />
        <polygon points="22,148 52,135 30,110" fill="#FFFFFF" stroke="#6C757D" strokeWidth="0.8" />
        <polygon points="22,32 30,70 52,45" fill="#DEE2E6" stroke="#6C757D" strokeWidth="0.8" />
        <line x1="70" y1="6" x2="70" y2="45" stroke="#495057" strokeWidth="1" />
        <line x1="70" y1="174" x2="70" y2="135" stroke="#495057" strokeWidth="1" />
        <line x1="6" y1="90" x2="30" y2="90" stroke="#495057" strokeWidth="1" />
        <line x1="134" y1="90" x2="110" y2="90" stroke="#495057" strokeWidth="1" />
        <circle cx="70" cy="90" r="3" fill="#212529" opacity="0.8" />
      </svg>
    );
  }

  // Marquise shape
  return (
    <svg
      width={size}
      height={size * 1.45}
      viewBox="0 0 130 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="marqGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#E9ECEF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#CED4DA" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      {/* Outer pointed curve */}
      <path
        d="M65 5 C120 50, 120 140, 65 185 C10 140, 10 50, 65 5 Z"
        fill="url(#marqGlow)"
        stroke="#343A40"
        strokeWidth="1.2"
      />
      {/* Table diamond */}
      <polygon
        points="65,36 100,95 65,154 30,95"
        fill="#FFFFFF"
        stroke="#495057"
        strokeWidth="1.2"
      />
      {/* Upper and lower tips */}
      <line x1="65" y1="5" x2="65" y2="36" stroke="#495057" strokeWidth="1.2" />
      <line x1="65" y1="154" x2="65" y2="185" stroke="#495057" strokeWidth="1.2" />
      {/* Lateral ribs */}
      <line x1="10" y1="95" x2="30" y2="95" stroke="#495057" strokeWidth="1.2" />
      <line x1="100" y1="95" x2="120" y2="95" stroke="#495057" strokeWidth="1.2" />
      {/* Facet triangles */}
      <polygon points="65,5 100,95 65,36" fill="#F8F9FA" stroke="#6C757D" strokeWidth="0.8" />
      <polygon points="65,5 30,95 65,36" fill="#E9ECEF" stroke="#6C757D" strokeWidth="0.8" />
      <polygon points="65,185 100,95 65,154" fill="#F1F3F5" stroke="#6C757D" strokeWidth="0.8" />
      <polygon points="65,185 30,95 65,154" fill="#DEE2E6" stroke="#6C757D" strokeWidth="0.8" />
      <circle cx="65" cy="95" r="3" fill="#212529" opacity="0.8" />
    </svg>
  );
};

// Silhouette Emblem matching 07 / JOURNEY SCREEN 01B and 05 / COLLECTION ENTRY
export const SilhouetteEmblem: React.FC<{
  shape: DiamondShape;
  size?: number;
  color?: string;
  fillOpacity?: number;
  className?: string;
}> = ({
  shape,
  size = 72,
  color = '#B38E5A',
  className = '',
}) => {
  if (shape === 'round') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1.5" strokeOpacity="0.85" />
        <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="2 3" />
        {/* Central North Star */}
        <g transform="translate(35, 35) scale(0.75)">
          <path d="M20 0 L23 16 L39 20 L23 24 L20 40 L17 24 L1 20 L17 16 Z" fill={color} />
          <path d="M20 10 L24 14 L28 20 L24 26 L20 30 L16 26 L12 20 L16 14 Z" fill={color} opacity="0.6" />
          <circle cx="20" cy="20" r="2.5" fill="#FFFFFF" />
        </g>
      </svg>
    );
  }

  if (shape === 'oval') {
    return (
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <ellipse cx="50" cy="65" rx="38" ry="56" stroke={color} strokeWidth="1.5" strokeOpacity="0.85" />
        <ellipse cx="50" cy="65" rx="32" ry="48" stroke={color} strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="2 3" />
        {/* Central North Star */}
        <g transform="translate(35, 50) scale(0.75)">
          <path d="M20 0 L23 16 L39 20 L23 24 L20 40 L17 24 L1 20 L17 16 Z" fill={color} />
          <path d="M20 10 L24 14 L28 20 L24 26 L20 30 L16 26 L12 20 L16 14 Z" fill={color} opacity="0.6" />
          <circle cx="20" cy="20" r="2.5" fill="#FFFFFF" />
        </g>
      </svg>
    );
  }

  // Marquise
  return (
    <svg
      width={size}
      height={size * 1.45}
      viewBox="0 0 100 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50 4 C85 46, 85 99, 50 141 C15 99, 15 46, 50 4 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.85"
      />
      <path
        d="M50 16 C76 52, 76 93, 50 129 C24 93, 24 52, 50 16 Z"
        stroke={color}
        strokeWidth="0.75"
        strokeOpacity="0.3"
        strokeDasharray="2 3"
      />
      {/* Central North Star */}
      <g transform="translate(35, 57.5) scale(0.75)">
        <path d="M20 0 L23 16 L39 20 L23 24 L20 40 L17 24 L1 20 L17 16 Z" fill={color} />
        <path d="M20 10 L24 14 L28 20 L24 26 L20 30 L16 26 L12 20 L16 14 Z" fill={color} opacity="0.6" />
        <circle cx="20" cy="20" r="2.5" fill="#FFFFFF" />
      </g>
    </svg>
  );
};
