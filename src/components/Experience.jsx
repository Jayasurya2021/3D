import { OrbitControls, Center, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import { Model } from './Model/Model';
import { SceneEnvironment } from './SceneEnvironment';
import { useModelStore } from '../store/useModelStore';

export const Experience = () => {
  const { autoRotate, activeEnvironment } = useModelStore();

  return (
    <>
      <color attach="background" args={['#D4D4D4']} />


      <SceneEnvironment environment={activeEnvironment} />
      
      {/* Soft Premium Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />

      <Suspense fallback={null}>
        
        <Model />
      </Suspense>


      <ContactShadows position={[0, -1.2, 0]} opacity={0.3} scale={10} blur={2.5} far={4} color="#000000" />



      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={true}
        minDistance={1.0}
        maxDistance={25.0}
        minPolarAngle={Math.PI / 2} // Lock vertical rotation (look straight on)
        maxPolarAngle={Math.PI / 2} // Lock vertical rotation (look straight on)
        autoRotate={autoRotate}
        autoRotateSpeed={1.5}
        onStart={() => useModelStore.getState().setIsRotating(true)}
        onEnd={() => useModelStore.getState().setIsRotating(false)}
      />
    </>
  );
};
