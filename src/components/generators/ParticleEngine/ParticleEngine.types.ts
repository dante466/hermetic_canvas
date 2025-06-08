export interface ParticleEngineProps {
  count: number;
}

export interface ParticleShaderUniforms {
  uTime: { value: number };
  uParticleSize: { value: number };
} 