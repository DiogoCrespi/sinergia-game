/**
 * Hook para parallax baseado no movimento do mouse
 */

import { useState, useEffect } from "react";

interface ParallaxOptions {
  depth: number; // Multiplicador de profundidade (0.05 a 0.6)
  intensity?: number; // Intensidade do movimento (padrão: 0.01)
}

export function useParallax({ depth, intensity = 0.01 }: ParallaxOptions) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = (e.clientX - centerX) * depth * intensity;
      const deltaY = (e.clientY - centerY) * depth * intensity;
      
      setOffset({ x: deltaX, y: deltaY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [depth, intensity]);

  return offset;
}

