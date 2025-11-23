/**
 * Engine de condições para verificar requisitos do jogo
 */

import type { Condition, ConditionRequirement, GameState } from "../types";

/**
 * Verifica se todas as condições são satisfeitas
 * @param conditions Array de condições a verificar
 * @param gameState Estado atual do jogo
 * @returns true se todas as condições são satisfeitas, false caso contrário
 */
export function checkConditions(
  conditions: Condition[] | undefined,
  gameState: GameState
): boolean {
  // Se não há condições ou array vazio, sempre retorna true
  if (!conditions || conditions.length === 0) {
    return true;
  }

  // Verificar se todas as condições são satisfeitas (AND lógico)
  return conditions.every((condition) => {
    try {
      const value = getConditionValue(condition, gameState);
      const result = compareValues(
        value,
        condition.operator,
        condition.value
      );

      // Log para debug (apenas em desenvolvimento)
      if (import.meta.env.DEV && !result) {
        console.log(
          `Condição falhou: ${condition.type} ${condition.operator} ${condition.value} (atual: ${value})`
        );
      }

      return result;
    } catch (error) {
      console.error(`Erro ao verificar condição:`, condition, error);
      // Em caso de erro, retornar false para segurança
      return false;
    }
  });
}

/**
 * Verifica se um requisito de variação é satisfeito
 * @param requirement Requisito da variação
 * @param gameState Estado atual do jogo
 * @returns true se o requisito é satisfeito, false caso contrário
 */
export function checkConditionRequirement(
  requirement: ConditionRequirement | undefined,
  gameState: GameState
): boolean {
  // Se não há requisito, sempre válido
  if (!requirement) {
    return true;
  }

  try {
    // Verificar playthroughCount
    if (requirement.playthroughCount !== undefined) {
      const { min, max } = requirement.playthroughCount;
      const count = gameState.playthroughCount;

      if (min !== undefined && count < min) {
        return false;
      }
      if (max !== undefined && count > max) {
        return false;
      }
    }

    // Verificar amabilityScore
    if (requirement.amabilityScore !== undefined) {
      const { min, max } = requirement.amabilityScore;
      const score = gameState.amabilityScore.totalAmability;

      if (min !== undefined && score < min) {
        return false;
      }
      if (max !== undefined && score > max) {
        return false;
      }
    }

    // Verificar empathyScore
    if (requirement.empathyScore !== undefined) {
      const { min, max } = requirement.empathyScore;
      const score = gameState.amabilityScore.empathy;

      if (min !== undefined && score < min) {
        return false;
      }
      if (max !== undefined && score > max) {
        return false;
      }
    }

    // Verificar respectScore
    if (requirement.respectScore !== undefined) {
      const { min, max } = requirement.respectScore;
      const score = gameState.amabilityScore.respect;

      if (min !== undefined && score < min) {
        return false;
      }
      if (max !== undefined && score > max) {
        return false;
      }
    }

    // Verificar trustScore
    if (requirement.trustScore !== undefined) {
      const { min, max } = requirement.trustScore;
      const score = gameState.amabilityScore.trust;

      if (min !== undefined && score < min) {
        return false;
      }
      if (max !== undefined && score > max) {
        return false;
      }
    }

    // Verificar efficiencyScore
    if (requirement.efficiencyScore !== undefined) {
      const { min, max } = requirement.efficiencyScore;
      const score = gameState.amabilityScore.efficiency;

      if (min !== undefined && score < min) {
        return false;
      }
      if (max !== undefined && score > max) {
        return false;
      }
    }

    // Verificar charactersMet
    if (requirement.charactersMet !== undefined) {
      const required = requirement.charactersMet;
      const met = gameState.charactersMet;

      // Verificar se todos os personagens requeridos foram encontrados
      const allMet = required.every((charId) => met.includes(charId));
      if (!allMet) {
        return false;
      }
    }

    // Verificar choicesMade
    if (requirement.choicesMade !== undefined) {
      const required = requirement.choicesMade;
      const made = gameState.choicesHistory;

      // Verificar se todas as escolhas requeridas foram feitas
      const allMade = required.every((choiceId) => made.includes(choiceId));
      if (!allMade) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error(`Erro ao verificar requisito:`, requirement, error);
    return false;
  }
}

/**
 * Obtém o valor atual de uma condição baseado no estado do jogo
 * @param condition Condição a verificar
 * @param gameState Estado atual do jogo
 * @returns Valor atual da condição
 */
function getConditionValue(
  condition: Condition,
  gameState: GameState
): number | string {
  switch (condition.type) {
    case "amabilityScore":
      return gameState.amabilityScore.totalAmability;

    case "empathyScore":
      return gameState.amabilityScore.empathy;

    case "respectScore":
      return gameState.amabilityScore.respect;

    case "trustScore":
      return gameState.amabilityScore.trust;

    case "efficiencyScore":
      return gameState.amabilityScore.efficiency;

    case "playthroughCount":
      return gameState.playthroughCount;

    case "choicesMade":
      return gameState.choicesHistory.length;

    case "charactersMet":
      return gameState.charactersMet.length;

    default:
      console.warn(`Tipo de condição desconhecido: ${condition.type}`);
      return 0;
  }
}

/**
 * Compara dois valores usando um operador
 * @param actual Valor atual
 * @param operator Operador de comparação
 * @param expected Valor esperado
 * @returns true se a comparação é verdadeira, false caso contrário
 */
function compareValues(
  actual: number | string,
  operator: string,
  expected: number | string
): boolean {
  // Converter para números se ambos forem numéricos
  const actualNum =
    typeof actual === "number" ? actual : parseFloat(String(actual));
  const expectedNum =
    typeof expected === "number" ? expected : parseFloat(String(expected));

  // Se ambos são números válidos, fazer comparação numérica
  if (!isNaN(actualNum) && !isNaN(expectedNum)) {
    switch (operator) {
      case ">":
        return actualNum > expectedNum;
      case "<":
        return actualNum < expectedNum;
      case "==":
        return actualNum === expectedNum;
      case ">=":
        return actualNum >= expectedNum;
      case "<=":
        return actualNum <= expectedNum;
      default:
        console.warn(`Operador desconhecido: ${operator}`);
        return false;
    }
  }

  // Se não são números, fazer comparação de string
  const actualStr = String(actual);
  const expectedStr = String(expected);

  switch (operator) {
    case "==":
      return actualStr === expectedStr;
    case "!=":
      return actualStr !== expectedStr;
    default:
      console.warn(
        `Operador ${operator} não suportado para comparação de strings`
      );
      return false;
  }
}

