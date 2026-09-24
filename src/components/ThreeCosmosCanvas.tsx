import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Compass } from 'lucide-react';
import { playFuturisticClick } from '../utils/sound';

interface ThreeCosmosCanvasProps {
  className?: string;
}

export const ThreeCosmosCanvas: React.FC<ThreeCosmosCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAntigravityActive, setIsAntigravityActive] = useState(false);
  const shockwaveRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Stars
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color('#00f2fe');
    const magentaColor = new THREE.Color('#ff0080');
    const purpleColor = new THREE.Color('#7928ca');
    const goldColor = new THREE.Color('#ffd166');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 120;
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 70;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      // Color distribution: 40% cyan, 30% magenta, 20% purple, 10% gold
      const rand = Math.random();
      let chosenColor = cyanColor;
      if (rand > 0.7) chosenColor = magentaColor;
      else if (rand > 0.4) chosenColor = purpleColor;
      else if (rand > 0.3) chosenColor = goldColor;

      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const particleMaterial = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // Cosmic Orbiting Neon Rings (representing BNK Emblem Rings)
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // Ring 1: Cyan Inner Glow
    const ringGeo1 = new THREE.TorusGeometry(12, 0.08, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: false,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.3;
    ringGroup.add(ring1);

    // Ring 2: Magenta Middle Ring
    const ringGeo2 = new THREE.TorusGeometry(16, 0.06, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff0080,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 2.8;
    ring2.rotation.y = Math.PI / 6;
    ringGroup.add(ring2);

    // Ring 3: Golden Spiritual Outer Aura Ring
    const ringGeo3 = new THREE.TorusGeometry(20, 0.05, 16, 120);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xf5a623,
      transparent: true,
      opacity: 0.3,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 4;
    ringGroup.add(ring3);

    // Central Floating Energy Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    ringGroup.add(coreMesh);

    // Inner glowing sphere
    const sphereGeo = new THREE.SphereGeometry(1.8, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xff0080,
      transparent: true,
      opacity: 0.5,
    });
    const innerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    ringGroup.add(innerSphere);

    // Mouse Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x;
      targetMouseY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Rotate ring group
      ringGroup.rotation.y = elapsedTime * 0.15 + currentMouseX * 0.6;
      ringGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15 - currentMouseY * 0.4;
      ringGroup.position.y = Math.sin(elapsedTime * 0.8) * 1.2;

      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.25;
      ring3.rotation.z = elapsedTime * 0.12;

      coreMesh.rotation.y = elapsedTime * 0.4;
      coreMesh.rotation.x = elapsedTime * 0.3;

      // Particle physics & antigravity shockwave
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      const shockwave = shockwaveRef.current;
      if (shockwave > 0) {
        shockwaveRef.current = Math.max(0, shockwave - 0.02);
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        // Drift slowly
        const driftX = Math.sin(elapsedTime * 0.2 + i) * 0.8;
        const driftY = Math.cos(elapsedTime * 0.25 + i * 0.5) * 0.8;

        if (shockwave > 0) {
          // Push particles out explosively
          const factor = 1 + shockwave * 2.2;
          posArray[i3] = ox * factor;
          posArray[i3 + 1] = oy * factor;
          posArray[i3 + 2] = oz * factor;
        } else {
          // Return smoothly to orbit
          posArray[i3] += (ox + driftX - posArray[i3]) * 0.05;
          posArray[i3 + 1] += (oy + driftY - posArray[i3 + 1]) * 0.05;
          posArray[i3 + 2] += (oz - posArray[i3 + 2]) * 0.05;
        }
      }

      posAttr.needsUpdate = true;
      particleSystem.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
    };
  }, []);

  const triggerAntigravityPulse = () => {
    playFuturisticClick();
    shockwaveRef.current = 1.0;
    setIsAntigravityActive(true);
    setTimeout(() => setIsAntigravityActive(false), 1400);
  };

  return (
    <div className={`relative w-full h-full pointer-events-none ${className}`}>
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      
      {/* Interactive Antigravity Pulse Trigger Widget */}
      <div className="absolute bottom-6 right-6 pointer-events-auto z-20">
        <button
          onClick={triggerAntigravityPulse}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide backdrop-blur-md transition-all duration-300 border ${
            isAntigravityActive
              ? 'bg-bnk-magenta/30 border-bnk-magenta text-white shadow-neon-magenta scale-105'
              : 'bg-bnk-card/80 border-slate-700/60 text-slate-300 hover:text-white hover:border-bnk-cyan hover:shadow-neon-cyan'
          }`}
          title="Trigger Antigravity Kinetic Pulse"
        >
          <Compass className={`w-3.5 h-3.5 text-bnk-cyan ${isAntigravityActive ? 'animate-spin' : ''}`} />
          <span>{isAntigravityActive ? 'Antigravity Inverted' : 'Pulse 3D Gravity'}</span>
          <Sparkles className="w-3 h-3 text-bnk-gold animate-pulse" />
        </button>
      </div>
    </div>
  );
};
