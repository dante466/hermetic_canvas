import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useControls, button } from 'leva';
import { createNoise3D } from 'simplex-noise';
import { particleFragmentShader, particleVertexShader } from './ParticleEngine.shaders';
import type { ParticleEngineProps } from './ParticleEngine.types';
import { useGeneratorStore } from '@/stores/useGeneratorStore';
import { colorPalettes } from '@/utils/color';

// Temporary constants until file creation is resolved
const SACRED = {
  PHI: 1.618033988749895,
};

function resetParticle(
  i: number,
  positions: Float32Array,
  velocities: Float32Array,
  life: Float32Array,
  emissionShape: 'point' | 'sphere' | 'box' | 'spiral'
) {
  const i3 = i * 3;
  life[i] = 1.0;

  const speed = Math.random() * 0.2 + 0.1;

  switch (emissionShape) {
    case 'point':
      positions[i3 + 0] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;
      break;
    case 'sphere':
      const point = new THREE.Vector3().setFromSphericalCoords(
        5, // radius
        Math.acos(1 - 2 * Math.random()),
        Math.random() * 2 * Math.PI
      );
      positions[i3 + 0] = point.x;
      positions[i3 + 1] = point.y;
      positions[i3 + 2] = point.z;
      break;
    case 'box':
      positions[i3 + 0] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      break;
    case 'spiral':
      const r = Math.sqrt(Math.random()) * 5;
      const theta = Math.random() * SACRED.PHI * Math.PI * 2;
      positions[i3 + 0] = Math.cos(theta) * r;
      positions[i3 + 1] = Math.sin(theta) * r;
      positions[i3 + 2] = 0;
      break;
  }
  
  const angle = Math.random() * Math.PI * 2;
  velocities[i3 + 0] = Math.cos(angle) * speed;
  velocities[i3 + 1] = Math.sin(angle) * speed;
  velocities[i3 + 2] = (Math.random() - 0.5) * speed;
}

export function ParticleEngine({ count = 10000 }: ParticleEngineProps) {
  const shader = useRef<THREE.ShaderMaterial>(null);
  const particleCursor = useRef(0);
  const { 
    particleSpeed, 
    particleSize, 
    emissionShape,
    emissionRate,
    colorPalette,
    isPlaying,
    updateParameter,
  } = useGeneratorStore();

  const { lifetime, gravity, turbulence, windX, windZ } = useControls('Particles', {
    'Play/Pause': button(() => useGeneratorStore.setState({ isPlaying: !useGeneratorStore.getState().isPlaying })),
    'Palette': {
      value: colorPalette,
      options: Object.keys(colorPalettes),
      onChange: (v) => updateParameter('colorPalette', v),
    },
    'Emission Rate': {
      value: emissionRate,
      min: 100,
      max: 20000,
      step: 100,
      onChange: (v) => updateParameter('emissionRate', v),
    },
    'Speed': {
      value: particleSpeed,
      min: 0.1,
      max: 10,
      step: 0.1,
      onChange: (v) => updateParameter('particleSpeed', v),
    },
    'Emitter': {
      value: emissionShape,
      options: ['point', 'sphere', 'box', 'spiral'],
      onChange: (v) => updateParameter('emissionShape', v),
    },
    lifetime: { value: 5, min: 1, max: 20, step: 0.5 },
    gravity: { value: -0.5, min: -5, max: 5, step: 0.1 },
    turbulence: { value: 0.5, min: 0, max: 5, step: 0.1 },
    windX: { value: 0.2, min: -5, max: 5, step: 0.1 },
    windZ: { value: 0.1, min: -5, max: 5, step: 0.1 },
  });

  const noise = useMemo(() => createNoise3D(), []);

  const { geometry, positions, velocities, colors, sizes, life } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const life = new Float32Array(count);

    const activePalette = colorPalettes[colorPalette];

    for (let i = 0; i < count; i++) {
      resetParticle(i, positions, velocities, life, emissionShape);
      life[i] *= Math.random(); // Initialize with random starting life

      const i3 = i * 3;
      const color = activePalette[i % activePalette.length];
      colors[i3 + 0] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      sizes[i] = Math.random() * particleSize + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('life', new THREE.BufferAttribute(life, 1).setUsage(THREE.DynamicDrawUsage));

    return { geometry, positions, velocities, colors, sizes, life };
  }, [count, particleSize, emissionShape, colorPalette]);

  useFrame(({ clock }, delta) => {
    if (!isPlaying) return;

    const clampedDelta = Math.min(delta, 1 / 30);
    const time = clock.getElapsedTime();
    
    // First, update all existing particles
    for (let i = 0; i < count; i++) {
      if (life[i] > 0) {
        life[i] -= clampedDelta / lifetime;

        const i3 = i * 3;

        // Noise field, gravity, wind, and position update...
        const p = positions.slice(i3, i3 + 3);
        const noiseFactor = turbulence * clampedDelta;
        velocities[i3 + 0] += noise(p[0] * 0.1, p[1] * 0.1, time * 0.1) * noiseFactor;
        velocities[i3 + 1] += noise(p[1] * 0.1, p[2] * 0.1, time * 0.1) * noiseFactor;
        velocities[i3 + 2] += noise(p[2] * 0.1, p[0] * 0.1, time * 0.1) * noiseFactor;
        velocities[i3 + 1] += gravity * clampedDelta * 0.1;
        velocities[i3 + 0] += windX * clampedDelta * 0.1;
        velocities[i3 + 2] += windZ * clampedDelta * 0.1;
        positions[i3 + 0] += velocities[i3 + 0] * clampedDelta * particleSpeed;
        positions[i3 + 1] += velocities[i3 + 1] * clampedDelta * particleSpeed;
        positions[i3 + 2] += velocities[i3 + 2] * clampedDelta * particleSpeed;
      }
    }

    // Then, emit new particles
    const particlesToEmit = Math.floor(emissionRate * clampedDelta);
    let emittedThisFrame = 0;
    for (let i = 0; i < count; i++) {
      if (emittedThisFrame >= particlesToEmit) break;
      
      const cursor = (particleCursor.current + i) % count;
      if (life[cursor] <= 0) {
        resetParticle(cursor, positions, velocities, life, emissionShape);
        emittedThisFrame++;
      }
    }
    particleCursor.current = (particleCursor.current + particlesToEmit) % count;

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.life.needsUpdate = true;
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