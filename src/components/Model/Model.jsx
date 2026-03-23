import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF, Html } from '@react-three/drei';
import { useModelStore } from '../../store/useModelStore';

export const Model = () => {
  const {
    shirtColor, activeMaterial, shirtVisible,
    pantColor, pantVisible,
    shoesColor, shoesVisible,
    hoveredItem, setHoveredItem,
    isRotating
  } = useModelStore();

  const { scene } = useGLTF('/models/model.glb');

  const { modelObj, scaleFactor, center } = useMemo(() => {
    if (!scene) return { modelObj: null, scaleFactor: 1, center: new THREE.Vector3() };
    const clone = scene.clone();

    // Calculate bounding box for automatic centering and scaling
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Scale model geometry to fit standard R3F viewport (~2 units)
    const maxDim = Math.max(size.x, size.y, size.z);
    const factor = maxDim > 0 ? 2 / maxDim : 1;

    return { modelObj: clone, scaleFactor: factor, center };
  }, [scene]);

  useEffect(() => {
    if (!modelObj) return;

    modelObj.traverse((child) => {
      // HIDE MD/CLO 2D PATTERNS immediately
      if (child.isLine || child.isLineSegments) {
        child.visible = false;
        return;
      }

      if (!child.isMesh) return;

      const n = child.name.toLowerCase();

      let target = null;
      if (n.includes('shirt') || n.includes('pattern2d') || n.includes('collar')) target = 'shirt';
      else if (n.includes('pant')) target = 'pant';
      else if (n.includes('polysurface')) target = 'shoes';
      else if (['body', 'eyelash_r', 'eye_l', 'eyelash_l', 'eye_r', 'tooth'].includes(n)) target = 'body';

      // visibility and update colors
      if (target === 'shirt') {
        child.visible = shirtVisible;
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(shirtColor ? shirtColor.substring(0, 7) : '#ffffff'),
          roughness: activeMaterial === 'silk' ? 0.2 : 0.8,
          metalness: activeMaterial === 'silk' ? 0.3 : 0.0,
          side: THREE.DoubleSide
        });
      } else if (target === 'pant') {
        child.visible = pantVisible;
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(pantColor ? pantColor.substring(0, 7) : '#ffffff'),
          roughness: activeMaterial === 'silk' ? 0.3 : 0.9,
          metalness: 0.0,
          side: THREE.DoubleSide
        });
      } else if (target === 'shoes') {
        child.visible = shoesVisible;
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(shoesColor ? shoesColor.substring(0, 7) : '#ffffff'),
          roughness: 0.6,
          metalness: 0.1,
          side: THREE.DoubleSide
        });
      }

      child.castShadow = true;
      child.receiveShadow = true;
      if (child.geometry) {
        child.geometry.computeVertexNormals();
      }
    });

  }, [modelObj, shirtVisible, pantVisible, shoesVisible, shirtColor, pantColor, shoesColor, activeMaterial]);

  return (
    <>
      {modelObj && (
        <group scale={scaleFactor} position={[0, -0.2, 0]}>
          <primitive
            object={modelObj}
            position={[-center.x, -center.y, -center.z]}
            onPointerOver={(e) => {
              e.stopPropagation();
              const n = e.object.name.toLowerCase();
              if (n.includes('shirt') || n.includes('pattern2d') || n.includes('collar')) setHoveredItem('shirt');
              else if (n.includes('pant')) setHoveredItem('pant');
              else if (n.includes('polysurface')) setHoveredItem('shoes');
            }}
            onPointerOut={() => setHoveredItem(null)}
          />

          {/* 3D Tracked Pricing UI */}
          {shirtVisible && (
            <Html position={[-0.4, 0.45, 0]}>
              <div
                className={`pricing-anchor ${hoveredItem === 'shirt' ? 'active' : ''} ${isRotating ? 'hidden' : ''}`}
                onPointerEnter={() => setHoveredItem('shirt')}
                onPointerLeave={() => setHoveredItem(null)}
              >
                <div className="price-line" />
                <div className="price-box">
                  <span className="price-title">Shirt</span>
                  <span className="price-value">₹1,199</span>
                </div>
              </div>
            </Html>
          )}

          {pantVisible && (
            <Html position={[-0.1, -0.2, 0]}>
              <div
                className={`pricing-anchor ${hoveredItem === 'pant' ? 'active' : ''} ${isRotating ? 'hidden' : ''}`}
                onPointerEnter={() => setHoveredItem('pant')}
                onPointerLeave={() => setHoveredItem(null)}
              >
                <div className="price-line" />
                <div className="price-box">
                  <span className="price-title">Classic Pant</span>
                  <span className="price-value">₹1,499</span>
                </div>
              </div>
            </Html>
          )}

          {shoesVisible && (
            <Html position={[-0.1, -0.8, 0]}>
              <div
                className={`pricing-anchor ${hoveredItem === 'shoes' ? 'active' : ''} ${isRotating ? 'hidden' : ''}`}
                onPointerEnter={() => setHoveredItem('shoes')}
                onPointerLeave={() => setHoveredItem(null)}
              >
                <div className="price-line" />
                <div className="price-box">
                  <span className="price-title">Leather Shoes</span>
                  <span className="price-value">₹2,499</span>
                </div>
              </div>
            </Html>
          )}
        </group>
      )}
    </>
  );
};