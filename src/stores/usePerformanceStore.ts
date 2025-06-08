import { create } from 'zustand'

type PerformanceState = {
  fps: number;
  setFps: (fps: number) => void;
  quality: 'low' | 'medium' | 'high';
  setQuality: (quality: 'low' | 'medium' | 'high') => void;
}

export const usePerformanceStore = create<PerformanceState>((set) => ({
  fps: 0,
  setFps: (fps) => set({ fps }),
  quality: 'high',
  setQuality: (quality) => set({ quality }),
})) 