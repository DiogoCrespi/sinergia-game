/**
 * Componente principal de UI para diálogos
 */

import { useEffect, useMemo, useCallback } from "react";
import { useGameStore } from "../../store/gameStore";
import { OptionButton } from "./OptionButton";
import { ConscienceNarrator } from "./ConscienceNarrator";
import type { DialogueOption } from "../../types/dialogue";

export function DialogueUI() {
  const { currentNode, onChoiceMade, nextNode, setCurrentState, completeCurrentCharacter } = useGameStore();

  // Não iniciar automaticamente - o menu já faz isso
  // O diálogo só aparece quando há um nó atual

  // Lidar com nós automáticos
  useEffect(() => {
    if (currentNode?.isAutomatic && currentNode.nextNodeIds && currentNode.nextNodeIds.length > 0) {
      const timer = setTimeout(() => {
        nextNode(currentNode.nextNodeIds![0]);
      }, 2000); // 2 segundos de delay

      return () => clearTimeout(timer);
    }
    
    // Se chegou ao nó final de um personagem, avançar para o próximo
    if (currentNode && currentNode.nodeId.includes("end_") && !currentNode.options?.length) {
      const timer = setTimeout(() => {
        completeCurrentCharacter();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    // Se chegou ao final geral (sem personagens restantes), mostrar final
    if (currentNode && currentNode.nodeId === "end_all" && !currentNode.options?.length) {
      const timer = setTimeout(() => {
        setCurrentState("ending");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentNode, nextNode, setCurrentState, completeCurrentCharacter]);

  // IMPORTANTE: Todos os hooks devem ser chamados ANTES de qualquer return condicional
  // para seguir as regras dos hooks do React
  
  const handleChoice = useCallback((option: DialogueOption) => {
    // Processar escolha
    onChoiceMade(option.optionId, option.amabilityImpact);
    
    // Avançar para próximo nó
    nextNode(option.nextNodeId);
  }, [onChoiceMade, nextNode]);

  // Determinar qual comentário da consciência exibir
  const conscienceComment = useMemo(() => {
    if (!currentNode) return "";
    return currentNode.conscienceComment?.before || "";
  }, [currentNode?.conscienceComment]);

  // Agora podemos fazer o return condicional DEPOIS de todos os hooks
  // Não mostrar nada durante o carregamento
  if (!currentNode) {
    return null;
  }

  return (
    <>
      {/* Texto do diálogo - posicionado no meio superior, centralizado na página */}
      <div 
        style={{
          position: 'fixed',
          top: '5rem',
          left: '0',
          right: '0',
          width: '100vw',
          zIndex: 40,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0 2rem'
        }}
      >
        <div 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            borderRadius: '0.5rem',
            padding: '1rem 1.5rem',
            pointerEvents: 'auto',
            textAlign: 'center',
            maxWidth: '64rem',
            width: '100%'
          }}
        >
          <h3 className="text-2xl font-bold mb-3 text-blue-300">
            {currentNode.characterName}
          </h3>
          <p className="text-lg leading-relaxed text-gray-100">
            {currentNode.dialogueText}
          </p>
        </div>
      </div>

      {/* Opções - fixadas na parte inferior da página, sobre a mesa */}
      {currentNode.options.length > 0 && (
        <div 
          style={{
            position: 'fixed',
            bottom: '0px',
            left: '0px',
            right: '0px',
            width: '100vw',
            zIndex: 9999,
            padding: '0 2rem 1.5rem 2rem',
            display: 'flex',
            gap: '1rem',
            pointerEvents: 'auto'
          }}
        >
          {(() => {
            // Randomizar a ordem das opções de forma determinística
            // Isso garante que a posição mude entre diálogos diferentes
            // mas seja consistente durante o mesmo diálogo
            const shuffledOptions = [...currentNode.options];
            
            if (shuffledOptions.length === 2) {
              // Criar um hash determinístico baseado no nodeId e nos optionIds
              // Isso garante distribuição mais uniforme
              let hash = 0;
              const hashString = currentNode.nodeId + shuffledOptions[0].optionId + shuffledOptions[1].optionId;
              for (let i = 0; i < hashString.length; i++) {
                hash = ((hash << 5) - hash) + hashString.charCodeAt(i);
                hash = hash & hash; // Convert to 32bit integer
              }
              
              // Trocar a ordem baseado no hash (50% de chance aparente)
              // Usar módulo 2 para distribuição 50/50
              if (Math.abs(hash) % 2 === 0) {
                [shuffledOptions[0], shuffledOptions[1]] = [shuffledOptions[1], shuffledOptions[0]];
              }
            }
            
            return shuffledOptions.map((option, index) => (
              <OptionButton
                key={option.optionId}
                option={option}
                position={index === 0 ? "left" : "right"}
                onClick={() => handleChoice(option)}
              />
            ));
          })()}
        </div>
      )}

      {/* Comentário da Consciência - também na parte inferior */}
      {conscienceComment && (
        <div className="fixed bottom-20 left-0 right-0 z-45 px-8 pointer-events-none">
          <div className="pointer-events-auto">
            <ConscienceNarrator comment={conscienceComment} />
          </div>
        </div>
      )}
    </>
  );
}

