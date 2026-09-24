import React, { useEffect, useState } from 'react';

export const CosmicCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = 
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('button') !== null || 
          target.closest('a') !== null ||
          target.classList.contains('cursor-pointer');
        setIsPointer(isClickable);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth trailing animation frame
    let animId: number;
    const animateTrailing = () => {
      setTrailing((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animId = requestAnimationFrame(animateTrailing);
    };
    animId = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [position.x, position.y]);

  if (isTouch) return null;

  return (
    <>
      {/* Primary pointer dot */}
      <div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-cyan-400 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-screen shadow-[0_0_12px_rgba(0,242,254,0.9)] transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isPointer ? 1.6 : 1})`,
        }}
      />

      {/* Trailing cosmic glow aura */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-pink-500/70 pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out shadow-[0_0_20px_rgba(255,0,128,0.5)]"
        style={{
          transform: `translate3d(${trailing.x}px, ${trailing.y}px, 0) scale(${isPointer ? 1.8 : 1})`,
        }}
      />
    </>
  );
};
