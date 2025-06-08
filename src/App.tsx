import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Leva } from 'leva'

import './index.css'
import { useGeneratorStore } from './stores/useGeneratorStore'
import { ParticleEngine } from './components/generators/ParticleEngine/ParticleEngine'
import WebGLErrorBoundary from './components/ui/WebGLErrorBoundary'

function App() {
  const { particleCount } = useGeneratorStore()

  return (
    <WebGLErrorBoundary>
      <Leva collapsed />
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 15], fov: 75 }}
      >
        <color attach="background" args={['#000000']} />
        <ParticleEngine count={particleCount} />
      </Canvas>
      <Stats />
    </WebGLErrorBoundary>
  )
}

export default App 