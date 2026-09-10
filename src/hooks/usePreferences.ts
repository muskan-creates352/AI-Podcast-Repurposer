'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserPreferences } from '@/types';
import { mockPreferences } from '@/data/mockPreferences';

const PREFS_KEY = 'ai-podcast-repurposer-preferences';

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(mockPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PREFS_KEY);
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    } catch {
      // Use defaults
    }
    setIsLoaded(true);
  }, []);

  const savePreferences = useCallback((newPrefs: UserPreferences) => {
    setPreferences(newPrefs);
    localStorage.setItem(PREFS_KEY, JSON.stringify(newPrefs));
  }, []);

  const updatePreference = useCallback(<K extends keyof UserPreferences>(
    key: K, 
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem(PREFS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { preferences, savePreferences, updatePreference, isLoaded };
}
