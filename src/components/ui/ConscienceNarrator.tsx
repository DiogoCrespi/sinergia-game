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
    <div className="absolute bottom-4 left-4 right-4">
      <div className="bg-black/60 backdrop-blur-sm border-l-4 border-yellow-500 p-4 rounded-r-lg">
        <p className="text-sm text-gray-300 italic font-light">
          <span className="text-yellow-400 font-semibold">Consciência:</span>{" "}
          {comment}
        </p>
      </div>
    </div>
  );
});

