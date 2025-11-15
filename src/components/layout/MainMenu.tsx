/**
 * Menu principal do jogo
 */

import { useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { LoadGameModal } from "../ui/LoadGameModal";

export function MainMenu() {
  const { startGame, setCurrentState } = useGameStore();
  const [showLoadModal, setShowLoadModal] = useState(false);

  const handleStartGame = async () => {
    try {
      await startGame();
      setCurrentState("playing");
    } catch (error) {
      console.error("Erro ao iniciar jogo:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center z-50">
      <div className="text-center max-w-2xl mx-auto px-8">
        {/* Título */}
        <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          SINERGIA
        </h1>
        
        <p className="text-xl text-gray-300 mb-2">
          Jogo de Narrativa Interativa
        </p>
        
        <p className="text-sm text-gray-400 mb-12 max-w-md mx-auto">
          Você é um funcionário do departamento de "Otimização de Recursos Humanos". 
          Suas escolhas determinarão o destino dos funcionários e o seu próprio.
        </p>

        {/* Botões */}
        <div className="space-y-4">
          <button
            onClick={handleStartGame}
            className="w-full max-w-md px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Iniciar Jogo
          </button>

          <button
            onClick={() => setShowLoadModal(true)}
            className="w-full max-w-md px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Carregar Jogo
          </button>

          <button
            onClick={() => {
              // Placeholder para futuras funcionalidades
              alert("Funcionalidade em desenvolvimento");
            }}
            className="w-full max-w-md px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Créditos
          </button>
        </div>

        {/* Modal de Carregar */}
        <LoadGameModal
          isOpen={showLoadModal}
          onClose={() => setShowLoadModal(false)}
        />

        {/* Instruções */}
        <div className="mt-12 text-left max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">
            Como Jogar
          </h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Leia os diálogos e escolha sua resposta</li>
            <li>• Suas escolhas afetam sua pontuação de Amabilidade</li>
            <li>• Escolhas genuínas vs manipuladoras têm consequências diferentes</li>
            <li>• O final depende das suas escolhas ao longo do jogo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

