/**
 * Tipos relacionados à narrativa e árvore de decisões
 */

import type { DialogueNode } from "./dialogue";

export interface NarrativeTree {
  treeId: string;
  characterId: string;
  nodes: DialogueNode[];
}

export interface Condition {
  type: ConditionType;
  parameter?: string;
  operator: ComparisonOperator;
  value: number | string;
}

export type ConditionType =
  | "amabilityScore"
  | "empathyScore"
  | "respectScore"
  | "trustScore"
  | "efficiencyScore"
  | "charactersMet"
  | "choicesMade"
  | "playthroughCount";

export const ConditionType = {
  AmabilityScore: "amabilityScore" as const,
  EmpathyScore: "empathyScore" as const,
  RespectScore: "respectScore" as const,
  TrustScore: "trustScore" as const,
  EfficiencyScore: "efficiencyScore" as const,
  CharactersMet: "charactersMet" as const,
  ChoicesMade: "choicesMade" as const,
  PlaythroughCount: "playthroughCount" as const,
} as const;

export type ComparisonOperator = ">" | "<" | "==" | ">=" | "<=";

export const ComparisonOperator = {
  GreaterThan: ">" as const,
  LessThan: "<" as const,
  Equals: "==" as const,
  GreaterOrEqual: ">=" as const,
  LessOrEqual: "<=" as const,
} as const;

