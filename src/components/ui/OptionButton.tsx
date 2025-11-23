/**
 * Componente de botão para opções de diálogo
 */

import { memo } from "react";
import type { DialogueOption } from "../../types";

interface OptionButtonProps {
  option: DialogueOption;
  position: "left" | "right";
  onClick: () => void;
}

export const OptionButton = memo(function OptionButton({ option, position, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 rounded-lg border-2 border-blue-500/80 
        bg-gray-900/95 backdrop-blur-md shadow-2xl
        text-white text-left
        transition-all duration-200
        hover:border-blue-400 hover:bg-gray-800/95 hover:shadow-blue-500/50
        sm:hover:scale-100
        active:scale-95 sm:active:scale-100
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
        w-full sm:w-auto
        ${position === "left" ? "sm:mr-2" : "sm:ml-2"}
      `}
      style={{
        padding: 'clamp(0.75rem, 3vw, 1.5rem)',
        minHeight: 'fit-content'
      }}
    >
      <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed break-words">
        {option.text}
      </p>
    </button>
  );
});

