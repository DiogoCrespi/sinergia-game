/**
 * Componente de botão para opções de diálogo
 */

import type { DialogueOption } from "../../types";

interface OptionButtonProps {
  option: DialogueOption;
  position: "left" | "right";
  onClick: () => void;
}

export function OptionButton({ option, position, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 p-6 rounded-lg border-2 border-gray-600 
        bg-gray-800/90 backdrop-blur-sm
        text-white text-left
        transition-all duration-200
        hover:border-gray-400 hover:bg-gray-700/90 hover:scale-105
        active:scale-100
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
        ${position === "left" ? "mr-2" : "ml-2"}
      `}
    >
      <p className="text-lg leading-relaxed">{option.text}</p>
    </button>
  );
}

