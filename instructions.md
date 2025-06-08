Hermetic Canvas - Complete Implementation Instructions
Project Overview
Hermetic Canvas is a professional-grade generative art application combining sacred geometry, particle systems, fractals, and audio reactivity into a unified creative tool. Built with React.js and Three.js, it features both beginner-friendly presets and deep customization options for advanced users.
Core Design Principles:

Performance first: 120 FPS desktop, 60 FPS mobile
Dual-mode interface: Simple for beginners, powerful for experts
Real-time everything: All changes reflected instantly
Sacred geometry at its heart: Mathematical beauty made visible
YouTube audio integration for music reactivity

Critical Implementation Rules

ALWAYS use TypeScript - No exceptions
ALWAYS use refs for animation data - Never useState
ALWAYS profile after each feature - Use Chrome DevTools
ALWAYS implement mobile fallbacks - Progressive enhancement
NEVER create objects in render loops - Use object pools
NEVER update uniforms unnecessarily - Cache previous values

Technical Stack
Core Dependencies
json{
  "dependencies": {
    "@react-three/fiber": "^8.x",
    "@react-three/drei": "^9.x",
    "@react-three/postprocessing": "^2.x",
    "@react-three/rapier": "^1.x",
    "three": "^0.160.x",
    "zustand": "^4.x",
    "leva": "^0.9.x",
    "react": "^18.x",
    "typescript": "^5.x",
    "ytdl-core": "^4.x",
    "react-youtube": "^10.x"
  },
  "devDependencies": {
    "@types/three": "^0.160.x",
    "@testing-library/react": "^14.x",
    "jest": "^29.x"
  }
}
Project Structure
src/
├── components/
│   ├── generators/
│   │   ├── ParticleEngine/
│   │   │   ├── ParticleEngine.tsx
│   │   │   ├── ParticleEngine.types.ts
│   │   │   ├── ParticleEngine.shaders.ts
│   │   │   └── ParticleEngine.test.tsx
│   │   ├── FractalEngine/
│   │   ├── GeometryEngine/
│   │   ├── NoiseFieldEngine/
│   │   └── FluidEngine/
│   ├── ui/
│   │   ├── ControlPanel/
│   │   ├── PresetGallery/
│   │   ├── DualModeInterface/
│   │   └── YouTubeAudioInput/
│   └── effects/
│       ├── PostProcessing/
│       └── AudioReactive/
├── stores/
│   ├── useGeneratorStore.ts
│   ├── useAudioStore.ts
│   ├── usePerformanceStore.ts
│   └── useUIStore.ts
├── hooks/
│   ├── useAudioAnalysis.ts
│   ├── useYouTubeAudio.ts
│   ├── useFrameLimiter.ts
│   └── useMobileOptimization.ts
├── shaders/
│   ├── particles.glsl
│   ├── holographic.glsl
│   ├── sacred-geometry.glsl
│   └── fractals.glsl
├── utils/
│   ├── math/
│   │   ├── sacred-geometry.ts
│   │   └── constants.ts
│   ├── audio/
│   │   ├── youtube-extractor.ts
│   │   └── audio-processor.ts
│   └── performance/
├── types/
│   └── global.d.ts
└── tests/
Core Type Definitions
typescript// types/global.d.ts
export interface GeneratorEngine {
  id: string
  name: string
  initialize: () => void
  update: (delta: number, audioData?: AudioData) => void
  dispose: () => void
  parameters: LevaSchema
  presets: Preset[]
  performanceProfile: {
    maxParticles: number
    targetFPS: { desktop: number; mobile: number }
    gpuIntensive: boolean
  }
}

export interface AudioData {
  frequencies: Float32Array
  waveform: Float32Array
  bass: number
  mid: number
  treble: number
  volume: number
  beats: BeatData[]
}

export interface Preset {
  id: string
  name: string
  category: 'psychedelic' | 'sacred' | 'organic' | 'minimal'
  parameters: Record<string, any>
  audioMappings?: AudioMappingConfig
  thumbnail?: string
}

export interface YouTubeAudioConfig {
  url: string
  videoId: string
  isPlaying: boolean
  currentTime: number
}
State Management Architecture
typescript// stores/useGeneratorStore.ts
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface GeneratorState {
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
  subscribeWithSelector((set, get) => ({
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
Sacred Geometry Constants
typescript// utils/math/constants.ts
export const SACRED = {
  PHI: 1.618033988749895, // Golden ratio
  PI: Math.PI,
  E: Math.E,
  
  // Sacred angles in radians
  ANGLES: {
    TRIANGLE: (2 * Math.PI) / 3,
    SQUARE: Math.PI / 2,
    PENTAGON: (2 * Math.PI) / 5,
    HEXAGON: Math.PI / 3,
    OCTAGON: Math.PI / 4,
    ENNEAGON: (2 * Math.PI) / 9,
    DODECAGON: Math.PI / 6
  },
  
  // Platonic solids vertices
  SOLIDS: {
    TETRAHEDRON: 4,
    CUBE: 8,
    OCTAHEDRON: 6,
    DODECAHEDRON: 20,
    ICOSAHEDRON: 12
  },
  
  // Fibonacci sequence generator
  fibonacci: function* (n: number = Infinity) {
    let [a, b] = [0, 1]
    for (let i = 0; i < n; i++) {
      yield a;
      [a, b] = [b, a + b]
    }
  },
  
  // Sacred geometry patterns
  flowerOfLife: (radius: number, circles: number = 7) => {
    const points = []
    for (let i = 0; i < circles; i++) {
      const angle = (i / circles) * Math.PI * 2
      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      })
    }
    return points
  }
}
YouTube Audio Integration
typescript// hooks/useYouTubeAudio.ts
import { useRef, useCallback, useState } from 'react'
import { useAudioStore } from '@/stores/useAudioStore'

export function useYouTubeAudio() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const [videoId, setVideoId] = useState<string>('')
  
  const extractVideoId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : ''
  }
  
  const initializeYouTubeAudio = useCallback(async (url: string) => {
    const id = extractVideoId(url)
    if (!id) return
    
    setVideoId(id)
    
    // Initialize audio context if needed
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 2048
      analyserRef.current.smoothingTimeConstant = 0.8
    }
  }, [])
  
  const connectAudioElement = useCallback((audioElement: HTMLAudioElement) => {
    if (!audioContextRef.current || !analyserRef.current) return
    
    // Disconnect previous source
    if (sourceRef.current) {
      sourceRef.current.disconnect()
    }
    
    // Create and connect new source
    sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement)
    sourceRef.current.connect(analyserRef.current)
    analyserRef.current.connect(audioContextRef.current.destination)
  }, [])
  
  return { videoId, initializeYouTubeAudio, connectAudioElement, analyser: analyserRef.current }
}

Implementation Chunks
Chunk 1: Project Setup and Basic Scene
Create a new React app with Three.js and essential dependencies:
- Set up React project with TypeScript
- Install all dependencies from Technical Stack section
- Create folder structure as specified above
- Create basic App.tsx with Canvas component from @react-three/fiber
- Set up a simple rotating cube with sacred geometry proportions to verify Three.js works
- Implement basic Zustand stores (useGeneratorStore, usePerformanceStore, useUIStore)
- Add Leva controls panel with a test slider
- Configure performance monitor from Drei
- Create WebGLErrorBoundary component
- Add basic responsive layout with CSS Grid
Key Implementation Details:

Use npx create-react-app hermetic-canvas --template typescript
Canvas should use gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
Set up performance monitoring immediately to track FPS from the start
Error boundary should handle WebGL context loss gracefully

Chunk 2: Particle System Foundation
Build the core particle system:
- Create ParticleEngine component structure with TypeScript interfaces
- Implement particle data structure using Float32Arrays for position, velocity, life
- Add sacred geometry emission patterns (spiral, flower of life, golden ratio)
- Create 10,000 particles with optimized buffer geometry
- Add basic physics update loop in useFrame with delta clamping
- Implement particle recycling with object pooling
- Add color attributes using vertex colors
- Create simple size attenuation based on camera distance
- Use instanced rendering if particle count > 1000
Performance Requirements:

Must maintain 120 FPS with 10,000 particles
Use geometry.setAttribute() with setUsage(THREE.DynamicDrawUsage)
Implement frame time monitoring to ensure < 8.33ms per frame

Chunk 3: Particle System Controls
Add interactive controls for particles:
- Add Leva controls for particle count (100-100,000) with performance warnings
- Add emission rate and emission shape controls (point, sphere, box, spiral)
- Implement particle lifetime with smooth fade out using vertex shader
- Add velocity randomization with Perlin noise
- Create gravity, wind, and turbulence force controls
- Add particle size and size variance controls with GPU-based calculation
- Implement sacred geometry color modes (chakra colors, golden ratio hues)
- Add play/pause functionality with proper cleanup
- Create quality presets that adjust based on device capabilities
Sacred Geometry Integration:

Emission shapes should include Flower of Life, Sri Yantra patterns
Color modes based on sacred number sequences (3, 7, 12)

Chunk 4: Particle Trails and Connections
Enhance particles with trails and connections:
- Implement particle trail system using instanced LineSegments
- Create circular buffer for trail history (last 20 positions)
- Add trail length and fade controls with smooth interpolation
- Implement spatial hashing for efficient nearest-neighbor search
- Add connection lines between particles within threshold
- Create connection opacity based on distance and particle age
- Optimize with GPU-based distance calculations
- Add sacred geometry connection patterns (triangular, hexagonal grids)
- Implement trail color gradients based on velocity
Optimization Requirements:

Use spatial partitioning (octree or grid) for connection calculations
Limit connections to 6 per particle maximum
Trail geometry should use BufferGeometryUtils.mergeBufferGeometries

Chunk 5: Advanced Particle Physics
Integrate Rapier physics for particles:
- Install and set up @react-three/rapier with proper TypeScript types
- Create physics world with configurable gravity and damping
- Add collision boundaries (box, sphere, custom sacred geometry shapes)
- Implement optional particle-particle collisions for specific effects
- Add force field system with multiple attractors/repellers
- Create vortex force with logarithmic spiral (golden ratio based)
- Add turbulence using curl noise for organic movement
- Implement physics LOD system (full physics for nearest 1000 particles)
- Add physics presets for different material behaviors (gas, liquid, sand)
Sacred Geometry Physics:

Attractor positions based on Platonic solid vertices
Force fields following sacred geometry patterns

Chunk 6: Shader System Foundation
Create custom shader system:
- Build modular vertex/fragment shader system with includes
- Implement time-based animations with smooth functions
- Add velocity-based color gradients with HSL interpolation
- Create size pulsation based on audio input preparation
- Implement multiple blending modes (additive, screen, multiply)
- Add shader hot-reload for development using Vite
- Create ShaderMaterial wrapper with automatic uniform updates
- Build sacred geometry shader functions library
- Implement GPU-based particle sorting for transparency
Shader Templates:

Include golden ratio spirals in vertex animations
Fragment shader with sacred geometry color harmonics
Holographic and iridescent material effects

Chunk 7: Fractal Generator Base
Implement fractal generation system:
- Create FractalEngine component with modular architecture
- Implement Mandelbrot set with smooth coloring algorithm
- Add real-time zoom/pan with mouse controls (up to 10^15 zoom)
- Create iteration count control with performance auto-adjust
- Implement Julia set with parameter morphing
- Add fractal coloring modes (escape time, orbit trap, distance estimation)
- Create GPU-accelerated fractal computation using compute shaders
- Add sacred geometry fractals (Sierpinski triangle, Sacred Pentagon)
Performance Optimization:

Use progressive rendering for deep zooms
Implement tile-based computation for large resolutions
Cache computed regions for smooth panning

Chunk 8: 3D Fractals and L-Systems
Extend fractals to 3D:
- Implement 3D Mandelbulb with ray marching
- Create IFS (Iterated Function System) renderer
- Add L-system grammar parser with turtle graphics
- Implement 3D turtle graphics for plant generation
- Create growth animation with time parameter
- Add sacred geometry L-system presets (Tree of Life patterns)
- Implement fractal detail LOD based on camera distance
- Add fractal mesh export using marching cubes
- Create hybrid fractals combining multiple algorithms
L-System Presets:

Sacred trees with golden angle branching
Crystalline growth patterns
DNA helix spirals

Chunk 9: Noise Field Visualizer
Build noise-based field visualization:
- Create NoiseFieldEngine with multiple algorithms
- Implement 4D Perlin/Simplex noise with time evolution
- Visualize as animated terrain mesh with adaptive subdivision
- Add noise octave layering with lacunarity control
- Create flow field visualization using line integral convolution
- Implement curl noise for incompressible fluid flow
- Add reaction-diffusion system (Gray-Scott model)
- Create multiple visualization modes (height field, vector field, volume)
- Add sacred geometry noise patterns (spiral flows, mandala noise)
Visualization Modes:

Height mapped terrain with normal mapping
Particle flow following vector fields
Volumetric ray marching for 3D noise

Chunk 10: Geometric Pattern Engine
Create geometric pattern generator:
- Build GeometryEngine with rule-based generation
- Implement radial symmetry with kaleidoscope effects
- Create mandala generator with nested geometry layers
- Add shape primitive library (including sacred geometry shapes)
- Implement Conway's Game of Life on geometric surfaces
- Create tessellation engine with Penrose tiling
- Add sacred geometry presets (Metatron's Cube, Flower of Life)
- Build morphing system between geometric patterns
- Implement crystalline growth simulation
Sacred Geometry Features:

All Platonic and Archimedean solids
Dynamic Flower of Life with expanding circles
Sri Yantra construction with precise angles
Fibonacci spiral generators

Chunk 11: Material and Lighting System
Develop advanced materials:
- Create material preset library with hot-swapping
- Implement holographic shader with animated interference
- Build iridescent material with viewing angle color shift
- Add crystalline refraction with chromatic dispersion
- Create dynamic light system with orbit paths
- Implement area lights with soft shadows
- Add light color temperature controls
- Build material mixing with node-based blending
- Create sacred geometry light patterns
Special Effects:

Subsurface scattering for organic materials
Volumetric lighting with god rays
Caustics rendering for crystal materials

Chunk 12: Post-Processing Pipeline
Set up post-processing:
- Install and configure @react-three/postprocessing
- Create effect composer with proper render order
- Implement bloom with HDR support and custom kernel
- Add chromatic aberration with lens distortion
- Create custom glitch effects with datamoshing
- Implement temporal effects (motion blur, echo)
- Add film emulation (grain, halation, color grading)
- Create kaleidoscope and mirror effects
- Build effect parameter animation system
Performance Considerations:

Use half-resolution rendering for expensive effects
Implement effect LOD based on GPU capabilities
Add toggle for mobile-optimized effect stack

Chunk 13: Audio Analysis System
Build audio reactivity:
- Create AudioAnalyzer class with WebAudio API
- Implement FFT with configurable band separation
- Build multi-band beat detection with onset detection
- Create frequency visualizer with logarithmic scaling
- Add YouTube audio integration with iframe API
- Implement audio file loading with drag-and-drop
- Create smoothing algorithms for visual stability
- Build audio feature extraction (spectral centroid, RMS)
- Add microphone input with permission handling
YouTube Integration:

Extract audio using YouTube IFrame API
Handle CORS restrictions properly
Implement buffering and sync management

Chunk 14: Audio Reactive Integration
Connect audio to visuals:
- Create audio reactive mapping system in Zustand
- Map frequency bands to all generator parameters
- Implement beat-triggered particle bursts
- Add audio-driven color palette morphing
- Create bass-reactive camera movements
- Implement spectrum visualization overlay
- Add waveform distortion to geometries
- Build preset audio mapping templates
- Create MIDI-style envelope followers
Mapping Features:

Low frequencies → particle size/gravity
Mids → rotation speeds/color hue
Highs → emission rate/connection distance
Beats → burst effects/scene transitions

Chunk 15: UI System Architecture
Build advanced UI framework:
- Create dual-mode UI with smooth transitions
- Implement beginner mode with card-based presets
- Build advanced mode with grouped controls
- Create custom Leva theme matching app aesthetics
- Build collapsible panel system with memory
- Create touch-optimized controls for mobile
- Implement search/filter for presets
- Add keyboard shortcuts with help modal
- Create responsive grid layout system
UI Components:

Radial sliders for cyclic parameters
2D/3D parameter space controls
Color palette builder with harmony rules
Preset preview with animated thumbnails

Chunk 16: Advanced Controls
Implement sophisticated controls:
- Build bezier curve editor for animation paths
- Create gradient editor with multiple color stops
- Implement envelope generator (ADSR) for parameters
- Add 4x4 matrix control for transformations
- Create node-based visual programming interface
- Build timeline with keyframe animation
- Add parameter automation recording
- Implement comprehensive undo/redo system
- Create macro recording for complex actions
Animation Features:

Parameter morphing with easing functions
LFO generators for cyclic animations
Step sequencer for rhythmic changes

Chunk 17: Preset Management
Create preset system:
- Design preset JSON schema with versioning
- Implement indexed DB storage for local presets
- Create real-time preset thumbnail generation
- Add preset categories with custom tags
- Build smooth preset interpolation system
- Create AI-powered preset generator
- Implement preset sharing via URL encoding
- Add preset pack import/export
- Create community preset browser
Preset Features:

Animated transitions between presets
Preset "genes" for evolutionary generation
Version migration for backwards compatibility
Preset performance profiling

Chunk 18: Performance Optimization
Optimize for smooth performance:
- Implement GPU instancing for all repeated geometry
- Create multi-level LOD system with smooth transitions
- Add aggressive frustum and occlusion culling
- Implement temporal upsampling for expensive effects
- Create frame time-based quality adjustment
- Add GPU memory monitoring and limits
- Implement worker-based background computation
- Create render pipeline optimizer
- Add performance profiler overlay
Optimization Targets:

120 FPS on RTX 3060 or better
60 FPS on integrated graphics
< 500MB GPU memory usage
< 16ms total frame time

Chunk 19: Mobile Optimization
Adapt for mobile devices:
- Create comprehensive touch gesture system
- Implement pinch/rotate/pan with inertia
- Add mobile-specific simplified UI
- Create reduced complexity shader variants
- Implement thermal throttling detection
- Add orientation change handling
- Create mobile-optimized presets
- Implement progressive web app features
- Add haptic feedback for interactions
Mobile Features:

Gesture-based preset switching
Tilt controls for camera
Reduced particle counts with maintained visuals
Battery usage optimization

Chunk 20: Export and Sharing
Build export functionality:
- Implement 8K screenshot capture with supersampling
- Create video recording with WebCodecs API
- Add animated GIF export with optimization
- Implement GLTF/GLB export for 3D scenes
- Create social media integration (Twitter, Instagram)
- Build shareable URL system with compression
- Add QR code generator for mobile sharing
- Create embeddable widget generator
- Implement cloud storage integration
Export Features:

Batch export for animation sequences
Watermark/signature options
Metadata embedding
Export queue with progress tracking

Chunk 21: Polish and Final Integration
Final polish phase:
- Add sophisticated loading animations
- Implement comprehensive error boundaries
- Create interactive onboarding tutorial
- Add contextual help system
- Implement full accessibility (WCAG 2.1)
- Add analytics with privacy controls
- Optimize bundle size with code splitting
- Create production build pipeline
- Implement A/B testing framework
- Add feature flags for gradual rollout
Testing Strategy
Test Coverage Requirements
Each chunk must include:

Unit tests for all utility functions
Integration tests for React components
Performance benchmarks
Visual regression tests
E2E tests for critical paths

Testing Stack
typescript// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
Performance Testing Example
typescriptdescribe('Performance Benchmarks', () => {
  it('maintains 120 FPS with all effects', async () => {
    const stats = new Stats()
    let frames = 0
    let totalTime = 0
    
    const measure = () => {
      stats.begin()
      // Render frame
      stats.end()
      frames++
      
      if (frames >= 1000) {
        const avgFPS = frames / (totalTime / 1000)
        expect(avgFPS).toBeGreaterThan(120)
      }
    }
  })
})
Performance Monitoring Implementation
typescript// hooks/usePerformanceMonitor.ts
export function usePerformanceMonitor() {
  const samples = useRef<number[]>([])
  
  useFrame((state, delta) => {
    samples.current.push(1 / delta)
    if (samples.current.length > 60) samples.current.shift()
    
    const avgFPS = samples.current.reduce((a, b) => a + b) / samples.current.length
    
    // Auto quality adjustment
    if (avgFPS < 55 && quality === 'high') {
      setQuality('medium')
    } else if (avgFPS < 115 && quality === 'ultra') {
      setQuality('high')
    }
  })
}
Success Metrics
Your implementation is successful when:

 120 FPS sustained on desktop with all effects
 60 FPS on iPhone 12 or equivalent Android
 Less than 3 second initial load time
 Smooth preset transitions with no frame drops
 No memory leaks over 1 hour session
 All 5 generator engines working simultaneously
 Audio reactivity with < 50ms latency
 YouTube audio integration working
 Export works at 8K resolution
 Sacred geometry renders with mathematical precision
 UI is intuitive for both beginners and experts
 All tests passing with > 80% coverage