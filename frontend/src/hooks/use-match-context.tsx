"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type MatchContextType = {
  activeMatchId: string | null;
  setActiveMatchId: (id: string | null) => void;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({ children }: { children: ReactNode }) {
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);

  return (
    <MatchContext.Provider value={{ activeMatchId, setActiveMatchId }}>
      {children}
    </MatchContext.Provider>
  );
}

export function useMatchContext() {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error('useMatchContext must be used within a MatchProvider');
  }
  return context;
}