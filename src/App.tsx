import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import * as THREE from 'three'

import WebGLErrorBoundary from '@/components/ui/WebGLErrorBoundary'
import { SACRED } from '@/utils/math/constants'

function Scene() {
  const cubeRef = useRef<THREE.Mesh>(null!)

  const { rotationSpeed } = useControls({
    rotationSpeed: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.1,
      label: 'Rotation Speed'
    }
  })

  useFrame((_state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * rotationSpeed;
      cubeRef.current.rotation.y += delta * rotationSpeed;
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={cubeRef}>
        <boxGeometry args={[1, SACRED.PHI, 1 / SACRED.PHI]} />
        <meshStandardMaterial color="gold" />
      </mesh>
    </>
  )
}

function App() {
  return (
    <WebGLErrorBoundary>
      <Leva collapsed />
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4] }}
        style={{ background: '#000000' }}
      >
        <Scene />
      </Canvas>
      <Stats />
    </WebGLErrorBoundary>
  )
}

export default App 