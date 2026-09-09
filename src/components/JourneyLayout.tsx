import React from 'react';

export const JourneyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="min-h-screen">{children}</div>;
};