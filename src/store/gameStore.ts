/**
 * Store Zustand para gerenciamento de estado do jogo
 */

import { create } from "zustand";
import type {
  GameState,
  DialogueNode,
  AmabilityImpact,
  GameStatus,
} from "../types";
import { initialScore, applyImpact } from "../core/AmabilityScore";
import { NarrativeManager } from "../core/NarrativeManager";
import {
  DEFAULT_CHARACTER_SEQUENCE,
  getNextCharacter,
  getTreeId,
} from "../core/CharacterSequence";
import { saveGame as saveGameUtil, loadGame as loadGameUtil } from "../utils/saveManager";

// Instância singleton do NarrativeManager
const narrativeManager = new NarrativeManager();

interface GameStore extends GameState {
  // Loading state
  isLoading: boolean;
  loadingProgress: number;
  
  // Actions
  onChoiceMade: (choiceId: string, impact: AmabilityImpact) => void;
  loadNarrativeTree: (treeId: string) => Promise<void>;
  nextNode: (nodeId: string) => void;
  resetGame: () => void;
  setCurrentNode: (node: DialogueNode | null) => void;
  setCurrentState: (state: GameStatus) => void;
  startGame: () => Promise<void>;
  loadNextCharacter: () => Promise<void>;
  completeCurrentCharacter: () => Promise<void>;
  saveGame: (slot: number) => boolean;
  loadGame: (slot: number) => Promise<boolean>;
  setLoading: (isLoading: boolean, progress?: number) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Estado inicial
  currentState: "menu",
  playthroughCount: 0,
  choicesHistory: [],
  amabilityScore: initialScore,
  currentCharacter: null,
  currentNode: null,
  usedTags: [],
  charactersMet: [],
  currentCharacterIndex: -1,
  characterSequence: DEFAULT_CHARACTER_SEQUENCE,
  isLoading: false,
  loadingProgress: 0,

  // Action: Processa uma escolha do jogador
  onChoiceMade: (choiceId, impact) => {
    const current = get().amabilityScore;
    const newScore = applyImpact(current, impact);

    set((state) => ({
      choicesHistory: [...state.choicesHistory, choiceId],
      amabilityScore: newScore,
    }));
  },

  // Action: Carrega uma árvore de narrativa
  loadNarrativeTree: async (treeId) => {
    try {
      await narrativeManager.loadNarrativeTree(treeId);
      // Após carregar, obter o nó inicial
      const gameState = get();
      const startNode = narrativeManager.getStartNode();
      if (startNode) {
        // Extrair characterId do treeId (ex: "carlos_dialogue" -> "carlos")
        const characterId = treeId.replace("_dialogue", "");
        
        // Rastrear personagem encontrado se ainda não foi encontrado
        let updatedCharactersMet = [...gameState.charactersMet];
        if (!updatedCharactersMet.includes(characterId)) {
          updatedCharactersMet.push(characterId);
        }

        // Processar nó inicial com variações se necessário
        let processedNode = startNode;
        if (startNode.dialogueVariations) {
          processedNode = narrativeManager.applyVariations(
            startNode,
            gameState
          );
          // Rastrear tags da variação selecionada
          const selectedVariation = startNode.dialogueVariations.find(
            (v) => v.text === processedNode.dialogueText
          );
          if (selectedVariation && selectedVariation.tags) {
            const newTags = selectedVariation.tags.filter(
              (tag) => !gameState.usedTags.includes(tag)
            );
            set({
              currentNode: processedNode,
              usedTags: [...gameState.usedTags, ...newTags],
              charactersMet: updatedCharactersMet,
              currentCharacter: characterId,
            });
          } else {
            set({
              currentNode: processedNode,
              charactersMet: updatedCharactersMet,
              currentCharacter: characterId,
            });
          }
        } else {
          set({
            currentNode: processedNode,
            charactersMet: updatedCharactersMet,
            currentCharacter: characterId,
          });
        }
      } else {
        console.warn("Nó inicial não encontrado");
      }
    } catch (error) {
      console.error("Erro ao carregar árvore de narrativa:", error);
      throw error;
    }
  },

  // Action: Avança para o próximo nó
  nextNode: (nodeId) => {
    const gameState = get();
    const nextNode = narrativeManager.getNextNode(nodeId, gameState);
    if (nextNode) {
      // Rastrear tags se o nó tinha variações
      let updatedTags = gameState.usedTags;
      if (nextNode.dialogueVariations) {
        // Encontrar qual variação foi selecionada (baseado no texto)
        const selectedVariation = nextNode.dialogueVariations.find(
          (v) => v.text === nextNode.dialogueText
        );
        if (selectedVariation && selectedVariation.tags) {
          // Adicionar tags novas (evitar duplicatas)
          const newTags = selectedVariation.tags.filter(
            (tag) => !updatedTags.includes(tag)
          );
          updatedTags = [...updatedTags, ...newTags];
        }
      }

      set({
        currentNode: nextNode,
        currentCharacter: nextNode.characterName,
        usedTags: updatedTags,
      });
    } else {
      console.warn(`Nó ${nodeId} não encontrado`);
    }
  },

  // Action: Reseta o jogo
  resetGame: () => {
    narrativeManager.clearTree();
    set({
      currentState: "playing",
      playthroughCount: get().playthroughCount + 1,
      choicesHistory: [],
      isLoading: false,
      loadingProgress: 0,
      amabilityScore: initialScore,
      currentCharacter: null,
      currentNode: null,
      usedTags: [], // Limpar tags ao reiniciar
      charactersMet: [], // Limpar personagens encontrados
      currentCharacterIndex: 0, // Resetar índice
      characterSequence: DEFAULT_CHARACTER_SEQUENCE, // Resetar sequência
    });
  },

  // Action: Define o nó atual
  setCurrentNode: (node) => {
    set({
      currentNode: node,
      currentCharacter: node?.characterName || null,
    });
  },

  // Action: Define o estado atual do jogo
  setCurrentState: (state) => {
    set({ currentState: state });
  },

  // Action: Inicia o jogo (carrega primeira árvore)
  startGame: async () => {
    set({
      currentState: "playing",
      currentCharacterIndex: 0,
      characterSequence: DEFAULT_CHARACTER_SEQUENCE,
      isLoading: true,
      loadingProgress: 0,
    });
    
    // Simular progresso
    const progressSteps = [20, 40, 60, 80, 100];
    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 150));
      set({ loadingProgress: progressSteps[i] });
    }
    
    // Carregar primeiro personagem da sequência
    const firstCharacter = DEFAULT_CHARACTER_SEQUENCE[0];
    if (firstCharacter) {
      await get().loadNarrativeTree(getTreeId(firstCharacter));
      set({ currentCharacterIndex: 0 });
    }
    
    // Aguardar um pouco antes de esconder loading (manter visível por mais tempo)
    await new Promise(resolve => setTimeout(resolve, 800));
    set({ isLoading: false, loadingProgress: 0 });
  },

  // Action: Define estado de loading
  setLoading: (isLoading, progress = 0) => {
    set({ isLoading, loadingProgress: progress });
  },

  // Action: Carrega o próximo personagem na sequência
  loadNextCharacter: async () => {
    const state = get();
    const nextCharacter = getNextCharacter(
      state.currentCharacterIndex,
      state.characterSequence
    );

    if (nextCharacter) {
      // Mostrar tela de loading
      set({ isLoading: true, loadingProgress: 0 });
      
      // Simular progresso
      const progressSteps = [20, 40, 60, 80, 100];
      for (let i = 0; i < progressSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        set({ loadingProgress: progressSteps[i] });
      }
      
      const nextIndex = state.currentCharacterIndex + 1;
      set({ currentCharacterIndex: nextIndex });
      
      // Carregar árvore de narrativa
      await get().loadNarrativeTree(getTreeId(nextCharacter));
      
      // Aguardar um pouco antes de esconder loading (manter visível por mais tempo)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Esconder tela de loading
      set({ isLoading: false, loadingProgress: 0 });
    } else {
      // Todos os personagens foram vistos, ir para final
      set({ isLoading: false, loadingProgress: 0, currentState: "ending" });
    }
  },

  // Action: Completa o personagem atual e avança para o próximo
  completeCurrentCharacter: async () => {
    const state = get();
    
    // Verificar se chegou ao final do diálogo atual
    if (state.currentNode?.nodeId.includes("end_")) {
      // Pequeno delay antes de avançar (fade out do diálogo)
      await new Promise(resolve => setTimeout(resolve, 1000));
      await get().loadNextCharacter();
    }
  },

  // Action: Salva o jogo em um slot
  saveGame: (slot) => {
    const state = get();
    return saveGameUtil(slot, state);
  },

  // Action: Carrega um jogo de um slot
  loadGame: async (slot) => {
    try {
      const saveData = loadGameUtil(slot);
      
      if (!saveData) {
        console.warn(`Nenhum save encontrado no slot ${slot}`);
        return false;
      }

      // Restaurar estado do jogo
      set({
        currentState: saveData.gameState.currentState,
        playthroughCount: saveData.gameState.playthroughCount,
        choicesHistory: [...saveData.gameState.choicesHistory],
        amabilityScore: { ...saveData.amabilityScore },
        currentCharacter: saveData.gameState.currentCharacter,
        currentNode: null, // Será carregado depois
        usedTags: [...saveData.gameState.usedTags],
        charactersMet: [...saveData.gameState.charactersMet],
        currentCharacterIndex: saveData.gameState.currentCharacterIndex,
        characterSequence: [...saveData.gameState.characterSequence],
      });

      // Carregar árvore de narrativa se houver
      if (saveData.currentTreeId) {
        try {
          await get().loadNarrativeTree(saveData.currentTreeId);
          
          // Restaurar nó atual se houver
          if (saveData.currentNodeId) {
            get().nextNode(saveData.currentNodeId);
          } else {
            // Se não houver nó salvo, tentar começar do início
            const startNode = narrativeManager.getNextNode("start", get());
            if (startNode) {
              set({ currentNode: startNode });
            } else {
              // Se não conseguir carregar o nó inicial, resetar para menu
              console.warn("Não foi possível restaurar o nó inicial do save");
              set({ currentState: "menu" });
            }
          }
        } catch (error) {
          console.error(`Erro ao carregar árvore de narrativa ${saveData.currentTreeId}:`, error);
          // Continuar mesmo se a árvore não carregar - o jogo pode continuar
        }
      }

      return true;
    } catch (error) {
      console.error("Erro ao carregar jogo:", error);
      // Resetar para estado seguro em caso de erro
      set({ currentState: "menu" });
      return false;
    }
  },
}));

