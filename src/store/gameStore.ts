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

// Instância singleton do NarrativeManager
const narrativeManager = new NarrativeManager();

interface GameStore extends GameState {
  // Actions
  onChoiceMade: (choiceId: string, impact: AmabilityImpact) => void;
  loadNarrativeTree: (treeId: string) => Promise<void>;
  nextNode: (nodeId: string) => void;
  resetGame: () => void;
  setCurrentNode: (node: DialogueNode | null) => void;
  setCurrentState: (state: GameStatus) => void;
  startGame: () => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Estado inicial
  currentState: "menu",
  playthroughCount: 0,
  choicesHistory: [],
  amabilityScore: initialScore,
  currentCharacter: null,
  currentNode: null,

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
      const startNode = narrativeManager.getStartNode();
      if (startNode) {
        set({ currentNode: startNode });
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
    const nextNode = narrativeManager.getNextNode(nodeId);
    if (nextNode) {
      set({
        currentNode: nextNode,
        currentCharacter: nextNode.characterName,
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
      amabilityScore: initialScore,
      currentCharacter: null,
      currentNode: null,
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
    set({ currentState: "playing" });
    // Por padrão, carregar a árvore do Carlos
    await get().loadNarrativeTree("carlos_dialogue");
  },
}));

