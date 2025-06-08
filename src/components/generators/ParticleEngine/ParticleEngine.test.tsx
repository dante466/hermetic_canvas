import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { ParticleEngine } from './ParticleEngine';

describe('ParticleEngine', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Canvas>
        <ParticleEngine count={100} />
      </Canvas>
    );
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
}); 