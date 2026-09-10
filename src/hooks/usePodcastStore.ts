'use client';

import { useState, useEffect, useCallback } from 'react';
import { Podcast, NewPodcastForm } from '@/types';
import { mockPodcasts } from '@/data/mockPodcasts';

const STORAGE_KEY = 'ai-podcast-repurposer-podcasts';

export function usePodcastStore() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load podcasts from localStorage on mount, fallback to mock data
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPodcasts(JSON.parse(stored));
      } else {
        setPodcasts(mockPodcasts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockPodcasts));
      }
    } catch {
      setPodcasts(mockPodcasts);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever podcasts change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(podcasts));
    }
  }, [podcasts, isLoaded]);

  const addPodcast = useCallback((form: NewPodcastForm) => {
    const newPodcast: Podcast = {
      id: `podcast-${Date.now()}`,
      podcastTitle: form.podcastTitle,
      episodeTitle: form.episodeTitle,
      episodeNumber: form.episodeNumber,
      description: form.description,
      duration: `${Math.floor(Math.random() * 40 + 20)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      uploadDate: new Date().toISOString(),
      status: 'processing',
      audioFile: form.audioFile?.name,
      podcastUrl: form.podcastUrl || undefined,
      contentCount: 0,
    };
    setPodcasts(prev => [newPodcast, ...prev]);
    
    // Simulate processing -> ready after 5 seconds
    setTimeout(() => {
      setPodcasts(prev => prev.map(p => 
        p.id === newPodcast.id ? { ...p, status: 'ready' as const, contentCount: 8 } : p
      ));
    }, 5000);
  }, []);

  const deletePodcast = useCallback((id: string) => {
    setPodcasts(prev => prev.filter(p => p.id !== id));
  }, []);

  const updatePodcast = useCallback((id: string, updates: Partial<Podcast>) => {
    setPodcasts(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates } : p
    ));
  }, []);

  return { podcasts, addPodcast, deletePodcast, updatePodcast, isLoaded };
}
