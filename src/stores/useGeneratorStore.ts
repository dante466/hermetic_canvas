import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import * as THREE from 'three'
import { ColorPalette } from '@/utils/color'

interface GeneratorState {
  // Active state
  activeEngine: string
  activeGenerators: string[]
  isPlaying: boolean
  
  // Parameters (flat for performance)
  particleCount: number
  particleSize: number
  particleSpeed: number
  colorPalette: ColorPalette
  
  // Refs for non-reactive data
  particleData: React.RefObject<Float32Array>
  
  // Blend modes
  blendMode: 'normal' | 'additive' | 'multiply' | 'screen'
  
  // Emitters
  emissionShape: 'point' | 'sphere' | 'box' | 'spiral'
  emissionRate: number
  
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
    particleSize: 1.5,
    particleSpeed: 1,
    colorPalette: 'sacredFire',
    particleData: { current: null },
    blendMode: 'additive',
    emissionShape: 'point',
    emissionRate: 5000,
    qualityTier: 'high',
    autoQuality: true,
    
    setEngine: (engine) => set({ activeEngine: engine }),
    updateParameter: (key, value) => set({ [key]: value })
  }))
) 