import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface ThreeCoffeeCanvasProps {
  className?: string;
  onInteract?: () => void;
}

export const ThreeCoffeeCanvas: React.FC<ThreeCoffeeCanvasProps> = ({
  className = '',
  onInteract,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [steamIntensity, setSteamIntensity] = useState<'normal' | 'boost'>('normal');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 280;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 4.5);
    camera.lookAt(0, 0.1, 0);

    // 3. Renderer with strict performance constraints
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Lighting (Warm Atelier Palette)
    const ambientLight = new THREE.AmbientLight(0xf7f1e5, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xd98236, 2.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc89666, 1.2);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const bottomGlow = new THREE.PointLight(0xa66a38, 1.0, 5);
    bottomGlow.position.set(0, -0.5, 0);
    scene.add(bottomGlow);

    // 5. Cup Model Construction Group
    const cupGroup = new THREE.Group();
    scene.add(cupGroup);

    // Ceramic cup body
    const cupGeo = new THREE.CylinderGeometry(0.85, 0.65, 1.2, 36, 1, true);
    const cupMat = new THREE.MeshStandardMaterial({
      color: 0x231a15,
      roughness: 0.35,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });
    const cupMesh = new THREE.Mesh(cupGeo, cupMat);
    cupGroup.add(cupMesh);

    // Cup bottom base
    const bottomGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.08, 36);
    const bottomMat = new THREE.MeshStandardMaterial({
      color: 0x1b1411,
      roughness: 0.4,
    });
    const bottomMesh = new THREE.Mesh(bottomGeo, bottomMat);
    bottomMesh.position.y = -0.58;
    cupGroup.add(bottomMesh);

    // Golden Espresso Crema surface
    const cremaGeo = new THREE.CircleGeometry(0.82, 36);
    const cremaMat = new THREE.MeshStandardMaterial({
      color: 0xd98236,
      roughness: 0.5,
      metalness: 0.2,
    });
    const cremaMesh = new THREE.Mesh(cremaGeo, cremaMat);
    cremaMesh.rotation.x = -Math.PI / 2;
    cremaMesh.position.y = 0.46;
    cupGroup.add(cremaMesh);

    // Crema inner latte art heart/rosetta swirl
    const swirlGeo = new THREE.RingGeometry(0.12, 0.45, 32);
    const swirlMat = new THREE.MeshStandardMaterial({
      color: 0xf7f1e5,
      roughness: 0.6,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
    });
    const swirlMesh = new THREE.Mesh(swirlGeo, swirlMat);
    swirlMesh.rotation.x = -Math.PI / 2;
    swirlMesh.position.y = 0.465;
    cupGroup.add(swirlMesh);

    // Cup Handle (Torus)
    const handleGeo = new THREE.TorusGeometry(0.38, 0.09, 16, 32, Math.PI * 1.15);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0x231a15,
      roughness: 0.35,
      metalness: 0.15,
    });
    const handleMesh = new THREE.Mesh(handleGeo, handleMat);
    handleMesh.position.set(0.85, 0.0, 0);
    handleMesh.rotation.z = -Math.PI * 0.55;
    cupGroup.add(handleMesh);

    // Ceramic Saucer
    const saucerGeo = new THREE.CylinderGeometry(1.4, 1.15, 0.12, 42);
    const saucerMat = new THREE.MeshStandardMaterial({
      color: 0x2c211b,
      roughness: 0.3,
      metalness: 0.1,
    });
    const saucerMesh = new THREE.Mesh(saucerGeo, saucerMat);
    saucerMesh.position.y = -0.66;
    cupGroup.add(saucerMesh);

    // Floating Roasted Coffee Beans (3D Particles)
    const beansGroup = new THREE.Group();
    cupGroup.add(beansGroup);

    const beanGeo = new THREE.SphereGeometry(0.12, 16, 16);
    beanGeo.scale(1.4, 0.9, 0.7);
    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x5a3419,
      roughness: 0.55,
      metalness: 0.05,
    });

    const beanMeshes: THREE.Mesh[] = [];
    const beanAngles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
    const beanRadii = [1.8, 1.6, 1.9];

    beanAngles.forEach((ang, i) => {
      const bean = new THREE.Mesh(beanGeo, beanMat);
      bean.position.set(
        Math.cos(ang) * beanRadii[i],
        0.3 + (i % 2) * 0.4,
        Math.sin(ang) * beanRadii[i]
      );
      bean.rotation.set(Math.random(), Math.random(), Math.random());
      beansGroup.add(bean);
      beanMeshes.push(bean);
    });

    // 6. Rising Steam Particles (Point Sprite Cloud)
    const steamCount = 38;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamVelocities: { y: number; drift: number }[] = [];

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.5;
      steamPositions[i * 3 + 1] = 0.5 + Math.random() * 1.5;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      steamVelocities.push({
        y: 0.008 + Math.random() * 0.012,
        drift: (Math.random() - 0.5) * 0.003,
      });
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xf7f1e5,
      size: 0.14,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    cupGroup.add(steamParticles);

    // 7. Interactive Drag & Momentum Physics
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      setIsInteracting(true);
      if (onInteract) onInteract();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      targetRotationY += deltaX * 0.012;
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const canvasEl = renderer.domElement;
    canvasEl.style.cursor = 'grab';
    canvasEl.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW && newH) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };
    window.addEventListener('resize', handleResize);

    // 8. 60fps Animation Loop with Spring Damping
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped rotation
      if (!isDragging) {
        targetRotationY += 0.006; // Idle smooth rotation
      }
      cupGroup.rotation.y += (targetRotationY - cupGroup.rotation.y) * 0.08;
      cupGroup.rotation.x = Math.sin(elapsedTime * 1.2) * 0.04;
      cupGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.04;

      // Orbit floating beans
      beanMeshes.forEach((bean, idx) => {
        const offset = beanAngles[idx] + elapsedTime * 0.6;
        bean.position.x = Math.cos(offset) * beanRadii[idx];
        bean.position.z = Math.sin(offset) * beanRadii[idx];
        bean.position.y = 0.3 + Math.sin(elapsedTime * 2 + idx) * 0.15;
        bean.rotation.x += 0.02;
        bean.rotation.y += 0.03;
      });

      // Animate Steam upward drift
      const positions = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < steamCount; i++) {
        positions[i * 3 + 1] += steamVelocities[i].y;
        positions[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.002;
        if (positions[i * 3 + 1] > 2.3) {
          positions[i * 3 + 1] = 0.5;
          positions[i * 3] = (Math.random() - 0.5) * 0.35;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. CLEAN DISPOSAL (Three.js Engineering Law: Zero Memory Leaks)
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvasEl.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      // Recursive disposal of all geometries and materials
      cupGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else if (object.material) {
            object.material.dispose();
          }
        }
      });

      steamGeo.dispose();
      steamMat.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Three.js Container */}
      <div
        ref={containerRef}
        className="w-full h-full min-h-[260px] sm:min-h-[300px] touch-none"
      />

      {/* Floating Micro-Controller Bar */}
      <div className="absolute bottom-2 inset-x-2 flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#1b1411]/85 backdrop-blur-md border border-[#a66a38]/30 text-[10px] font-mono text-[#c89666]">
        <div className="flex items-center gap-1.5">
          <RotateCw className="w-3 h-3 text-[#d98236] animate-spin" style={{ animationDuration: '6s' }} />
          <span>{isInteracting ? 'Girando 3D...' : 'Arrastra para rotar 360°'}</span>
        </div>
        <div className="flex items-center gap-1 text-[#f7f1e5]">
          <Sparkles className="w-3 h-3 text-[#d98236]" />
          <span>Arábica 100%</span>
        </div>
      </div>
    </div>
  );
};
