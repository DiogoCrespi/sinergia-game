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
}

