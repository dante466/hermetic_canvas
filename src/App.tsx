import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Leva, useControls } from 'leva'

import './index.css'
import { useGeneratorStore } from './stores/useGeneratorStore'
import { ParticleEngine } from './components/generators/ParticleEngine/ParticleEngine'
import WebGLErrorBoundary from './components/ui/WebGLErrorBoundary'

function App() {
  const { particleCount, particleSize, updateParameter } = useGeneratorStore()

  useControls({
    'Count': {
      value: particleCount,
      min: 100,
      max: 100000,
      step: 100,
      onChange: (v) => updateParameter('particleCount', v),
    },
    'Size': {
      value: particleSize,
      min: 0.1,
      max: 10,
      step: 0.1,
      onChange: (v) => updateParameter('particleSize', v),
    },
  })

  return (
    <WebGLErrorBoundary>
      <Leva />
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 15], fov: 75 }}
      >
        <color attach="background" args={['#000000']} />
        <ParticleEngine key={particleCount} count={particleCount} />
      </Canvas>
      <Stats />
    </WebGLErrorBoundary>
  )
}

export default App 