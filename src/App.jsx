import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Experience } from './components/Experience';
import { ControlPanel } from './components/ui/ControlPanel';

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="#eeeeee" roughness={0.1} />
    </mesh>
  );
}

function App() {
  return (
    <div className="app-root">
      {/* 3D Canvas */}
      <div className="canvas-area">
        <Canvas
          shadows
          camera={{ position: [0, 0, 4.5], fov: 35 }}
          gl={{ antialias: true, toneMappingExposure: 1.1 }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Experience />
          </Suspense>
        </Canvas>

        {/* Floating header badge */}
        <div className="canvas-badge">
          <span className="badge-dot" />
          Model Showcase
        </div>
      </div>

      {/* Control Panel */}
      <ControlPanel />
    </div>
  );
}

export default App;
