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
        flex-1 p-6 rounded-lg border-2 border-blue-500/80 
        bg-gray-900/95 backdrop-blur-md shadow-2xl
        text-white text-left
        transition-all duration-200
        hover:border-blue-400 hover:bg-gray-800/95 hover:scale-105 hover:shadow-blue-500/50
        active:scale-100
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
        ${position === "left" ? "mr-2" : "ml-2"}
      `}
    >
      <p className="text-lg font-medium leading-relaxed">{option.text}</p>
    </button>
  );
});

