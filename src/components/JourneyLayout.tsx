import React from 'react';

export const JourneyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <a
        href="https://parissa-diamond-tta2zg1y.myshopify.com"
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 100,
          fontSize: '11px',
          letterSpacing: '0.1em',
          color: '#69635d',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        ← PARISSA
      </a>
      {children}
    </div>
  );
};