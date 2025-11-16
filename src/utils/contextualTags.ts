/**
 * Utilitário para gerar tags contextuais baseadas no estado do jogo
 */

import type { GameState } from "../types";

/**
 * Gera tags contextuais baseadas no estado atual do jogo
 */
export function generateContextualTags(gameState: GameState): string[] {
  const tags: string[] = [];

  // Tags baseadas em playthrough count
  if (gameState.playthroughCount === 0) {
    tags.push("first_playthrough");
  } else if (gameState.playthroughCount === 1) {
    tags.push("second_playthrough");
  } else if (gameState.playthroughCount >= 2) {
    tags.push("third_playthrough");
  }

  // Tags baseadas em pontuação de amabilidade
  const amability = gameState.amabilityScore.totalAmability;
  if (amability >= 70) {
    tags.push("high_amability");
  } else if (amability <= 30) {
    tags.push("low_amability");
  }

  // Tags baseadas em eficiência
  const efficiency = gameState.amabilityScore.efficiency;
  if (efficiency >= 70) {
    tags.push("high_efficiency");
  } else if (efficiency <= 30) {
    tags.push("low_efficiency");
  }

  // Tags baseadas em caminho escolhido
  const genuineChoices = gameState.amabilityScore.genuineChoices;
  const manipulativeChoices = gameState.amabilityScore.manipulativeChoices;
  
  if (genuineChoices > manipulativeChoices) {
    tags.push("genuine_path");
  } else if (manipulativeChoices > genuineChoices) {
    tags.push("manipulative_path");
  }

  // Tags baseadas em escolhas anteriores (últimas 3 escolhas)
  if (gameState.choicesHistory.length > 0) {
    // Se as últimas escolhas foram todas genuínas ou manipuladoras
    const recentChoices = gameState.choicesHistory.slice(-3);
    // Isso pode ser expandido no futuro para análise mais complexa
  }

  return tags;
}

/**
 * Verifica se uma variação deve ser priorizada baseado em tags contextuais
 */
export function shouldPrioritizeVariation(
  variationTags: string[],
  contextualTags: string[]
): boolean {
  // Se a variação tem tags que correspondem ao contexto atual, priorizar
  return variationTags.some((tag) => contextualTags.includes(tag));
}

/**
 * Ajusta o peso de uma variação baseado em tags contextuais
 */
export function adjustWeightByContext(
  baseWeight: number,
  variationTags: string[],
  contextualTags: string[]
): number {
  // Se a variação tem tags contextuais relevantes, aumentar peso
  const hasContextualMatch = shouldPrioritizeVariation(
    variationTags,
    contextualTags
  );

  if (hasContextualMatch) {
    // Aumentar peso em 50% se houver match contextual
    return baseWeight * 1.5;
  }

  return baseWeight;
}


