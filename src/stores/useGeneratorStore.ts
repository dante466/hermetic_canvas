import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import * as THREE from 'three'

type GeneratorState = {
  // Active state
  activeEngine: string
  activeGenerators: string[]
  isPlaying: boolean
  
  // Parameters (flat for performance)
  particleCount: number
  particleSize: number
  particleSpeed: number
  colorPalette: string[]
  
  // Refs for non-reactive data
  particleData: React.RefObject<Float32Array>
  
  // Blend modes
  blendMode: 'normal' | 'additive' | 'multiply' | 'screen'
  
  // Actions
  setEngine: (engine: string) => void
  updateParameter: (key: string, value: any) => void
  
  // Performance
  qualityTier: 'low' | 'medium' | 'high' | 'ultra'
  autoQuality: boolean
}

export const useGeneratorStore = create<GeneratorState>()(
  subscribeWithSelector((set) => ({
    activeEngine: 'particles',
    activeGenerators: ['particles'],
    isPlaying: true,
    particleCount: 10000,
    particleSize: 1,
    particleSpeed: 1,
    colorPalette: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'],
    particleData: { current: null },
    blendMode: 'additive',
    qualityTier: 'high',
    autoQuality: true,
    
    setEngine: (engine) => set({ activeEngine: engine }),
    updateParameter: (key, value) => set({ [key]: value })
  }))
) 