/**
 * Componente principal de UI para diálogos
 */

import { useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { OptionButton } from "./OptionButton";
import { ConscienceNarrator } from "./ConscienceNarrator";

export function DialogueUI() {
  const { currentNode, onChoiceMade, nextNode, startGame } = useGameStore();

  // Iniciar o jogo quando o componente montar pela primeira vez
  useEffect(() => {
    // Sempre tentar iniciar se não houver nó atual
    if (!currentNode) {
      console.log("Iniciando jogo...");
      startGame()
        .then(() => {
          console.log("Jogo iniciado com sucesso");
        })
        .catch((error) => {
          console.error("Erro ao iniciar jogo:", error);
        });
    }
  }, []);

  // Lidar com nós automáticos
  useEffect(() => {
    if (currentNode?.isAutomatic && currentNode.nextNodeIds && currentNode.nextNodeIds.length > 0) {
      const timer = setTimeout(() => {
        nextNode(currentNode.nextNodeIds![0]);
      }, 2000); // 2 segundos de delay

      return () => clearTimeout(timer);
    }
  }, [currentNode]);

  if (!currentNode) {
    return (
      <div className="fixed bottom-0 left-0 right-0 p-8 bg-black/80 text-white z-50">
        <div className="text-center">
          <p className="text-lg">Carregando diálogo...</p>
        </div>
      </div>
    );
  }

  const handleChoice = (option: typeof currentNode.options[0]) => {
    // Processar escolha
    onChoiceMade(option.optionId, option.amabilityImpact);
    
    // Avançar para próximo nó
    nextNode(option.nextNodeId);
  };

  // Determinar qual comentário da consciência exibir
  const conscienceComment = currentNode.conscienceComment?.before || "";

  return (
    <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/95 to-black/80 text-white z-50">
      {/* Texto do diálogo */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-3 text-blue-300">
          {currentNode.characterName}
        </h3>
        <p className="text-lg leading-relaxed text-gray-100">
          {currentNode.dialogueText}
        </p>
      </div>

      {/* Opções */}
      {currentNode.options.length > 0 && (
        <div className="flex gap-4 mb-4">
          {currentNode.options.map((option, index) => (
            <OptionButton
              key={option.optionId}
              option={option}
              position={index === 0 ? "left" : "right"}
              onClick={() => handleChoice(option)}
            />
          ))}
        </div>
      )}

      {/* Comentário da Consciência */}
      {conscienceComment && (
        <ConscienceNarrator comment={conscienceComment} />
      )}
    </div>
  );
}

