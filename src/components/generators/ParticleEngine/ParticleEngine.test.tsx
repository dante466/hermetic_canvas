import { render, screen } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { ParticleEngine } from './ParticleEngine';
import { Leva } from 'leva';

// Mock Leva to handle both the component and the hook
jest.mock('leva', () => ({
  __esModule: true,
  Leva: () => null, // A dummy component for rendering
  useControls: jest.fn(),
  button: jest.fn((_label, onClick) => onClick),
}));

describe('ParticleEngine', () => {
  beforeEach(() => {
    // Clear mock history before each test
    const { useControls } = require('leva');
    (useControls as jest.Mock).mockClear();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <Canvas>
        <ParticleEngine count={100} />
      </Canvas>
    );
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('creates Leva controls for particle properties', () => {
    render(
      <>
        <Leva />
        <Canvas>
          <ParticleEngine count={100} />
        </Canvas>
      </>
    );
    
    // Note: Since leva renders to a portal, we can't easily query the controls.
    // We rely on the mock to ensure useControls is called with the correct config.
    const { useControls } = require('leva');

    // Check for the call in ParticleEngine.tsx
    expect(useControls).toHaveBeenCalledWith(
      'Particles',
      expect.objectContaining({
        'Play/Pause': expect.anything(),
        'Palette': expect.any(Object),
        'Emission Rate': expect.any(Object),
        'Speed': expect.any(Object),
        'Emitter': expect.any(Object),
        lifetime: expect.any(Object),
        gravity: expect.any(Object),
        turbulence: expect.any(Object),
        windX: expect.any(Object),
        windZ: expect.any(Object),
      })
    );

    // Also check for the global controls from App.tsx
    expect(useControls).toHaveBeenCalledWith(
      expect.objectContaining({
        'Count': expect.any(Object),
        'Size': expect.any(Object),
      })
    );
  });
}); 