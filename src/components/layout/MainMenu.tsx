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
      // O estado já é atualizado dentro de startGame
    } catch (error) {
      console.error("Erro ao iniciar jogo:", error);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'url(/home_scren.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 50
      }}
      className="flex items-center justify-center"
    >
      {/* Overlay escuro para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      
      {/* Conteúdo centralizado */}
      <div 
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '42rem',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center'
        }}
      >
        {/* Título */}
        <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          SINERGIA
        </h1>
        
        {/* Container com fundo para o texto descritivo */}
        <div 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            padding: '1.5rem 2rem',
            marginBottom: '3rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
          }}
          className="max-w-md mx-auto"
        >
          <p 
            className="text-xl text-white mb-3 font-semibold"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
            }}
          >
            Jogo de Narrativa Interativa
          </p>
          
          <p 
            className="text-base text-gray-100 leading-relaxed"
            style={{
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
            }}
          >
            Você é um funcionário do departamento de "Otimização de Recursos Humanos". 
            Suas escolhas determinarão o destino dos funcionários e o seu próprio.
          </p>
        </div>

        {/* Botões */}
        <div className="space-y-4 flex flex-col items-center">
          <button
            onClick={handleStartGame}
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
            className="w-full max-w-md px-8 py-4 bg-blue-600/90 hover:bg-blue-700/90 text-white text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Iniciar Jogo
          </button>

          <button
            onClick={() => setShowLoadModal(true)}
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
            className="w-full max-w-md px-8 py-4 bg-green-600/90 hover:bg-green-700/90 text-white text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Carregar Jogo
          </button>

          <button
            onClick={() => {
              // Placeholder para futuras funcionalidades
              alert("Funcionalidade em desenvolvimento");
            }}
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
            className="w-full max-w-md px-8 py-4 bg-gray-700/90 hover:bg-gray-600/90 text-white text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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
        <div 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            padding: '1.5rem 2rem',
            marginTop: '3rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
          }}
          className="text-left max-w-md mx-auto"
        >
          <h3 
            className="text-lg font-semibold text-white mb-3"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
            }}
          >
            Como Jogar
          </h3>
          <ul 
            className="text-base text-gray-100 space-y-2 leading-relaxed"
            style={{
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
            }}
          >
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

