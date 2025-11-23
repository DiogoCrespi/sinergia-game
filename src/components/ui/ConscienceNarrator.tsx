/**
 * Componente para exibir comentários da "Consciência"
 */

import { memo } from "react";

interface ConscienceNarratorProps {
  comment?: string;
}

export const ConscienceNarrator = memo(function ConscienceNarrator({ comment }: ConscienceNarratorProps) {
  if (!comment) return null;

  return (
    <div 
      className="absolute left-0 right-0"
      style={{
        bottom: 'clamp(0.5rem, 2vw, 1rem)',
        padding: '0 clamp(0.5rem, 2vw, 1rem)'
      }}
    >
      <div 
        className="bg-black/60 backdrop-blur-sm border-l-4 border-yellow-500 rounded-r-lg"
        style={{
          padding: 'clamp(0.5rem, 2vw, 1rem)'
        }}
      >
        <p className="text-xs sm:text-sm text-gray-300 italic font-light break-words">
          <span className="text-yellow-400 font-semibold">Consciência:</span>{" "}
          {comment}
        </p>
      </div>
    </div>
  );
});

