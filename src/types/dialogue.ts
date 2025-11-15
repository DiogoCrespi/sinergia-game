/**
 * Tipos relacionados ao sistema de diálogo
 */

import type { Condition } from "./narrative";

export interface DialogueNode {
  nodeId: string;
  characterName: string;
  dialogueText?: string;
  dialogueVariations?: DialogueVariation[];
  options: DialogueOption[];
  nextNodeIds?: string[];
  amabilityImpact?: AmabilityImpact;
  conditions?: Condition[];
  tags?: string[];
  isAutomatic?: boolean;
  conscienceComment?: ConscienceComment;
}

export interface DialogueVariation {
  text: string;
  weight: number;
  tags: string[];
  requires?: ConditionRequirement;
}

export interface DialogueOption {
  optionId: string;
  text: string;
  position?: "left" | "right" | "random";
  nextNodeId: string;
  amabilityImpact: AmabilityImpact;
  conditions?: Condition[]; // Condições para a opção aparecer
}

export interface AmabilityImpact {
  totalAmability?: number;
  empathy?: number;
  respect?: number;
  trust?: number;
  efficiency?: number;
}

export interface ConscienceComment {
  before?: string;
  after_manipulative?: string;
  after_genuine?: string;
}

export interface ConditionRequirement {
  playthroughCount?: { min?: number; max?: number };
  amabilityScore?: { min?: number; max?: number };
  empathyScore?: { min?: number; max?: number };
  respectScore?: { min?: number; max?: number };
  trustScore?: { min?: number; max?: number };
  efficiencyScore?: { min?: number; max?: number };
  charactersMet?: string[];
  choicesMade?: string[];
}

