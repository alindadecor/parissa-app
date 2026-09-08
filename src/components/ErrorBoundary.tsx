import { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <>{children}</>;
}