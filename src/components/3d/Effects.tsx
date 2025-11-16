/**
 * Componente de efeitos visuais (post-processing)
 * Adiciona bloom, color grading e outros efeitos à cena
 */

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

export function Effects() {
  return (
    <EffectComposer>
      {/* Bloom sutil para suavizar iluminação */}
      <Bloom
        intensity={0.3}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.9}
        height={300}
      />
      
      {/* Vignette sutil para focar atenção no centro */}
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={0.3}
      />
    </EffectComposer>
  );
}


