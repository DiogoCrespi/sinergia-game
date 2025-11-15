/**
 * Tipos relacionados ao estado do jogo
 */

import type { DialogueNode } from "./dialogue";

export type GameStatus = "menu" | "playing" | "ending";

export interface AmabilityScore {
  totalAmability: number;
  empathy: number;
  respect: number;
  trust: number;
  efficiency: number;
  genuineChoices: number;
  manipulativeChoices: number;
  charactersHelped: number;
}

export interface GameState {
  currentState: GameStatus;
  playthroughCount: number;
  choicesHistory: string[];
  amabilityScore: AmabilityScore;
  currentCharacter: string | null;
  currentNode: DialogueNode | null;
  usedTags: string[]; // Tags de variações já usadas
  charactersMet: string[]; // IDs dos personagens encontrados
  currentCharacterIndex: number; // Índice do personagem atual na sequência
  characterSequence: string[]; // Sequência de personagens a serem encontrados
}

