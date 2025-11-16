/**
 * Sistema de pontuação de Amabilidade
 */

import type { AmabilityScore, AmabilityImpact } from "../types";

/**
 * Aplica um impacto na pontuação de amabilidade
 */
export function applyImpact(
  score: AmabilityScore,
  impact: AmabilityImpact
): AmabilityScore {
  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const newScore: AmabilityScore = {
    ...score,
    totalAmability: clamp(
      score.totalAmability + (impact.totalAmability || 0),
      0,
      100
    ),
    empathy: clamp(score.empathy + (impact.empathy || 0), 0, 100),
    respect: clamp(score.respect + (impact.respect || 0), 0, 100),
    trust: clamp(score.trust + (impact.trust || 0), 0, 100),
    efficiency: clamp(score.efficiency + (impact.efficiency || 0), 0, 100),
    genuineChoices:
      impact.totalAmability && impact.totalAmability > 0
        ? score.genuineChoices + 1
        : score.genuineChoices,
    manipulativeChoices:
      impact.totalAmability && impact.totalAmability < 0
        ? score.manipulativeChoices + 1
        : score.manipulativeChoices,
  };

  // Recalcular totalAmability como média ponderada
  newScore.totalAmability = calculateTotal(newScore);

  return newScore;
}

/**
 * Calcula a pontuação total de amabilidade como média ponderada
 * de empatia, respeito e confiança
 */
export function calculateTotal(score: AmabilityScore): number {
  const weights = {
    empathy: 0.4,
    respect: 0.3,
    trust: 0.3,
  };

  const total =
    score.empathy * weights.empathy +
    score.respect * weights.respect +
    score.trust * weights.trust;

  return Math.round(Math.max(0, Math.min(100, total)));
}

/**
 * Determina o final do jogo baseado nas pontuações
 */
export function calculateFinal(
  score: AmabilityScore
): "good" | "bad" | "neutral" {
  if (score.totalAmability > 70 && score.efficiency < 30) {
    return "good";
  } else if (score.totalAmability < 30 && score.efficiency > 70) {
    return "bad";
  } else {
    return "neutral";
  }
}

/**
 * Pontuação inicial padrão
 */
export const initialScore: AmabilityScore = {
  totalAmability: 50,
  empathy: 50,
  respect: 50,
  trust: 50,
  efficiency: 50,
  genuineChoices: 0,
  manipulativeChoices: 0,
  charactersHelped: 0,
};


