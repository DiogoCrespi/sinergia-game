/**
 * Botão de salvar durante o jogo
 */

import { useState } from "react";
import { SaveGameModal } from "./SaveGameModal";

export function SaveButton() {
  const [showSaveModal, setShowSaveModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowSaveModal(true)}
        className="fixed top-4 right-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 z-40 shadow-lg"
        title="Salvar jogo"
      >
        💾 Salvar
      </button>

      <SaveGameModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </>
  );
}

