import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getRanks, clearRanksCache } from '../services/ranks.js';
import {
  DEFAULT_RANKS,
  getRank as _getRank,
  getNextRank as _getNextRank,
  getRankProgress as _getRankProgress,
} from '../utils/ranks.js';

const RanksContext = createContext(null);

/** Fournit les grades (depuis Supabase, configurables) à toute l'application. */
export function RanksProvider({ children }) {
  const [ranks, setRanks] = useState(DEFAULT_RANKS);

  const reload = useCallback(async () => {
    clearRanksCache();
    setRanks(await getRanks());
  }, []);

  useEffect(() => {
    getRanks().then(setRanks);
  }, []);

  const value = {
    ranks,
    reload,
    getRank: (h) => _getRank(h, ranks),
    getNextRank: (h) => _getNextRank(h, ranks),
    getRankProgress: (h) => _getRankProgress(h, ranks),
  };

  return <RanksContext.Provider value={value}>{children}</RanksContext.Provider>;
}

export function useRanks() {
  const ctx = useContext(RanksContext);
  if (!ctx) throw new Error('useRanks doit être utilisé dans <RanksProvider>');
  return ctx;
}
