import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { particleFragmentShader, particleVertexShader } from './ParticleEngine.shaders';
import type { ParticleEngineProps } from './ParticleEngine.types';
import { useGeneratorStore } from '@/stores/useGeneratorStore';

// Temporary constants until file creation is resolved
const SACRED = {
  PHI: 1.618033988749895,
};

export function ParticleEngine({ count = 10000 }: ParticleEngineProps) {
  const shader = useRef<THREE.ShaderMaterial>(null);
  const { particleSpeed, updateParameter } = useGeneratorStore();

  useControls('Particles', {
    'Particle Speed': {
      value: particleSpeed,
      min: 0.1,
      max: 10,
      step: 0.1,
      onChange: (v) => updateParameter('particleSpeed', v),
    },
  });

  const { geometry, positions, velocities, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorPalette = [
      new THREE.Color('#FF006E'),
      new THREE.Color('#FB5607'),
      new THREE.Color('#FFBE0B'),
      new THREE.Color('#8338EC'),
      new THREE.Color('#3A86FF'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Golden Angle Spiral (Phyllotaxis)
      const r = Math.sqrt(i / count) * 5;
      const theta = i * SACRED.PHI * Math.PI * 2;
      
      positions[i3 + 0] = Math.cos(theta) * r;
      positions[i3 + 1] = Math.sin(theta) * r;
      positions[i3 + 2] = 0; // Start in 2D plane

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.2;
      velocities[i3 + 0] = Math.cos(angle) * speed;
      velocities[i3 + 1] = Math.sin(angle) * speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.2; // Add some z velocity

      const color = colorPalette[Math.floor(i / count * colorPalette.length)];
      colors[i3 + 0] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return { geometry, positions, velocities, colors, sizes };
  }, [count]);

  useFrame((_, delta) => {
    const clampedDelta = Math.min(delta, 1 / 30); // Delta clamping
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3 + 0] += velocities[i3 + 0] * clampedDelta * particleSpeed;
      positions[i3 + 1] += velocities[i3 + 1] * clampedDelta * particleSpeed;
      positions[i3 + 2] += velocities[i3 + 2] * clampedDelta * particleSpeed;

      // Particle Recycling
      if (positions[i3 + 1] < -10) {
        positions[i3 + 0] = (Math.random() - 0.5) * 10;
        positions[i3 + 1] = 10;
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
      }
    }
    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={shader}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
        uniforms={{}}
        vertexColors
      />
    </points>
  );
} 