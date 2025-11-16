/**
 * Testes para o sistema de condições
 * 
 * Este arquivo contém testes unitários para validar o funcionamento
 * do engine de condições. Os testes podem ser executados manualmente
 * ou adaptados para um framework de testes como Vitest/Jest.
 */

import { checkConditions, checkConditionRequirement } from "./conditions";
import type { Condition, ConditionRequirement, GameState } from "../types";
import { initialScore } from "../core/AmabilityScore";

/**
 * Cria um GameState de teste com valores customizados
 */
function createTestGameState(overrides: Partial<GameState> = {}): GameState {
  return {
    currentState: "playing",
    playthroughCount: 0,
    choicesHistory: [],
    amabilityScore: initialScore,
    currentCharacter: null,
    currentNode: null,
    usedTags: [],
    charactersMet: [],
    ...overrides,
  };
}

/**
 * Executa um teste e registra o resultado
 */
function runTest(
  name: string,
  testFn: () => boolean,
  expected: boolean = true
): boolean {
  try {
    const result = testFn();
    const passed = result === expected;
    const status = passed ? "✅ PASSOU" : "❌ FALHOU";
    console.log(`${status}: ${name}`);
    if (!passed) {
      console.log(`  Esperado: ${expected}, Obtido: ${result}`);
    }
    return passed;
  } catch (error) {
    console.error(`❌ ERRO: ${name}`, error);
    return false;
  }
}

/**
 * Suite de testes para condições de pontuação
 */
function testScoreConditions(): boolean {
  console.log("\n=== Testes: Condições de Pontuação ===");
  let allPassed = true;

  // Teste: amabilityScore maior que
  allPassed = runTest(
    "amabilityScore > 40 (deve passar com 50)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, totalAmability: 50 },
      });
      const condition: Condition = {
        type: "amabilityScore",
        operator: ">",
        value: 40,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  // Teste: amabilityScore menor que
  allPassed = runTest(
    "amabilityScore < 60 (deve passar com 50)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, totalAmability: 50 },
      });
      const condition: Condition = {
        type: "amabilityScore",
        operator: "<",
        value: 60,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  // Teste: amabilityScore igual
  allPassed = runTest(
    "amabilityScore == 50 (deve passar com 50)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, totalAmability: 50 },
      });
      const condition: Condition = {
        type: "amabilityScore",
        operator: "==",
        value: 50,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  // Teste: amabilityScore maior ou igual
  allPassed = runTest(
    "amabilityScore >= 50 (deve passar com 50)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, totalAmability: 50 },
      });
      const condition: Condition = {
        type: "amabilityScore",
        operator: ">=",
        value: 50,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  // Teste: amabilityScore menor ou igual
  allPassed = runTest(
    "amabilityScore <= 50 (deve passar com 50)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, totalAmability: 50 },
      });
      const condition: Condition = {
        type: "amabilityScore",
        operator: "<=",
        value: 50,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  // Teste: amabilityScore falha quando não atende
  allPassed = runTest(
    "amabilityScore > 60 (deve falhar com 50)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, totalAmability: 50 },
      });
      const condition: Condition = {
        type: "amabilityScore",
        operator: ">",
        value: 60,
      };
      return checkConditions([condition], state);
    },
    false
  ) && allPassed;

  // Teste: empathyScore
  allPassed = runTest(
    "empathyScore > 40 (deve passar com 50)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, empathy: 50 },
      });
      const condition: Condition = {
        type: "empathyScore",
        operator: ">",
        value: 40,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  // Teste: respectScore
  allPassed = runTest(
    "respectScore < 60 (deve passar com 50)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, respect: 50 },
      });
      const condition: Condition = {
        type: "respectScore",
        operator: "<",
        value: 60,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  // Teste: trustScore
  allPassed = runTest(
    "trustScore == 50 (deve passar com 50)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, trust: 50 },
      });
      const condition: Condition = {
        type: "trustScore",
        operator: "==",
        value: 50,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  // Teste: efficiencyScore
  allPassed = runTest(
    "efficiencyScore >= 50 (deve passar com 50)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, efficiency: 50 },
      });
      const condition: Condition = {
        type: "efficiencyScore",
        operator: ">=",
        value: 50,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  return allPassed;
}

/**
 * Suite de testes para condições de progresso
 */
function testProgressConditions(): boolean {
  console.log("\n=== Testes: Condições de Progresso ===");
  let allPassed = true;

  // Teste: playthroughCount
  allPassed = runTest(
    "playthroughCount == 0 (deve passar com 0)",
    () => {
      const state = createTestGameState({ playthroughCount: 0 });
      const condition: Condition = {
        type: "playthroughCount",
        operator: "==",
        value: 0,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  allPassed = runTest(
    "playthroughCount > 0 (deve passar com 1)",
    () => {
      const state = createTestGameState({ playthroughCount: 1 });
      const condition: Condition = {
        type: "playthroughCount",
        operator: ">",
        value: 0,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  allPassed = runTest(
    "playthroughCount < 2 (deve passar com 1)",
    () => {
      const state = createTestGameState({ playthroughCount: 1 });
      const condition: Condition = {
        type: "playthroughCount",
        operator: "<",
        value: 2,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  return allPassed;
}

/**
 * Suite de testes para condições de histórico
 */
function testHistoryConditions(): boolean {
  console.log("\n=== Testes: Condições de Histórico ===");
  let allPassed = true;

  // Teste: choicesMade
  allPassed = runTest(
    "choicesMade == 0 (deve passar com array vazio)",
    () => {
      const state = createTestGameState({ choicesHistory: [] });
      const condition: Condition = {
        type: "choicesMade",
        operator: "==",
        value: 0,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  allPassed = runTest(
    "choicesMade > 2 (deve passar com 3 escolhas)",
    () => {
      const state = createTestGameState({
        choicesHistory: ["choice1", "choice2", "choice3"],
      });
      const condition: Condition = {
        type: "choicesMade",
        operator: ">",
        value: 2,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  allPassed = runTest(
    "choicesMade < 5 (deve passar com 3 escolhas)",
    () => {
      const state = createTestGameState({
        choicesHistory: ["choice1", "choice2", "choice3"],
      });
      const condition: Condition = {
        type: "choicesMade",
        operator: "<",
        value: 5,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  return allPassed;
}

/**
 * Suite de testes para condições de personagens
 */
function testCharacterConditions(): boolean {
  console.log("\n=== Testes: Condições de Personagens ===");
  let allPassed = true;

  // Teste: charactersMet
  allPassed = runTest(
    "charactersMet == 0 (deve passar com array vazio)",
    () => {
      const state = createTestGameState({ charactersMet: [] });
      const condition: Condition = {
        type: "charactersMet",
        operator: "==",
        value: 0,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  allPassed = runTest(
    "charactersMet >= 2 (deve passar com 2 personagens)",
    () => {
      const state = createTestGameState({
        charactersMet: ["carlos", "sara"],
      });
      const condition: Condition = {
        type: "charactersMet",
        operator: ">=",
        value: 2,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  return allPassed;
}

/**
 * Suite de testes para combinações de condições
 */
function testCombinedConditions(): boolean {
  console.log("\n=== Testes: Combinações de Condições ===");
  let allPassed = true;

  // Teste: múltiplas condições (AND)
  allPassed = runTest(
    "amabilityScore > 40 AND empathyScore > 40 (deve passar)",
    () => {
      const state = createTestGameState({
        amabilityScore: {
          ...initialScore,
          totalAmability: 50,
          empathy: 50,
        },
      });
      const conditions: Condition[] = [
        { type: "amabilityScore", operator: ">", value: 40 },
        { type: "empathyScore", operator: ">", value: 40 },
      ];
      return checkConditions(conditions, state);
    }
  ) && allPassed;

  // Teste: múltiplas condições - uma falha
  allPassed = runTest(
    "amabilityScore > 40 AND empathyScore > 60 (deve falhar)",
    () => {
      const state = createTestGameState({
        amabilityScore: {
          ...initialScore,
          totalAmability: 50,
          empathy: 50,
        },
      });
      const conditions: Condition[] = [
        { type: "amabilityScore", operator: ">", value: 40 },
        { type: "empathyScore", operator: ">", value: 60 },
      ];
      return checkConditions(conditions, state);
    },
    false
  ) && allPassed;

  // Teste: condições complexas
  allPassed = runTest(
    "playthroughCount >= 1 AND choicesMade > 2 (deve passar)",
    () => {
      const state = createTestGameState({
        playthroughCount: 1,
        choicesHistory: ["choice1", "choice2", "choice3"],
      });
      const conditions: Condition[] = [
        { type: "playthroughCount", operator: ">=", value: 1 },
        { type: "choicesMade", operator: ">", value: 2 },
      ];
      return checkConditions(conditions, state);
    }
  ) && allPassed;

  return allPassed;
}

/**
 * Suite de testes para edge cases
 */
function testEdgeCases(): boolean {
  console.log("\n=== Testes: Edge Cases ===");
  let allPassed = true;

  // Teste: condições vazias
  allPassed = runTest(
    "Array vazio de condições (deve passar)",
    () => {
      const state = createTestGameState();
      return checkConditions([], state);
    }
  ) && allPassed;

  // Teste: undefined/null
  allPassed = runTest(
    "undefined conditions (deve passar)",
    () => {
      const state = createTestGameState();
      return checkConditions(undefined, state);
    }
  ) && allPassed;

  // Teste: valores limites - mínimo
  allPassed = runTest(
    "amabilityScore >= 0 (deve passar com 0)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, totalAmability: 0 },
      });
      const condition: Condition = {
        type: "amabilityScore",
        operator: ">=",
        value: 0,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  // Teste: valores limites - máximo
  allPassed = runTest(
    "amabilityScore <= 100 (deve passar com 100)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, totalAmability: 100 },
      });
      const condition: Condition = {
        type: "amabilityScore",
        operator: "<=",
        value: 100,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  // Teste: valores exatos nos limites
  allPassed = runTest(
    "amabilityScore == 0 (deve passar com 0)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, totalAmability: 0 },
      });
      const condition: Condition = {
        type: "amabilityScore",
        operator: "==",
        value: 0,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  allPassed = runTest(
    "amabilityScore == 100 (deve passar com 100)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, totalAmability: 100 },
      });
      const condition: Condition = {
        type: "amabilityScore",
        operator: "==",
        value: 100,
      };
      return checkConditions([condition], state);
    }
  ) && allPassed;

  return allPassed;
}

/**
 * Suite de testes para ConditionRequirement
 */
function testConditionRequirements(): boolean {
  console.log("\n=== Testes: ConditionRequirement ===");
  let allPassed = true;

  // Teste: playthroughCount range
  allPassed = runTest(
    "playthroughCount min/max (deve passar com 1)",
    () => {
      const state = createTestGameState({ playthroughCount: 1 });
      const requirement: ConditionRequirement = {
        playthroughCount: { min: 0, max: 2 },
      };
      return checkConditionRequirement(requirement, state);
    }
  ) && allPassed;

  allPassed = runTest(
    "playthroughCount min/max (deve falhar com 3)",
    () => {
      const state = createTestGameState({ playthroughCount: 3 });
      const requirement: ConditionRequirement = {
        playthroughCount: { min: 0, max: 2 },
      };
      return checkConditionRequirement(requirement, state);
    },
    false
  ) && allPassed;

  // Teste: amabilityScore range
  allPassed = runTest(
    "amabilityScore min/max (deve passar com 50)",
    () => {
      const state = createTestGameState({
        amabilityScore: { ...initialScore, totalAmability: 50 },
      });
      const requirement: ConditionRequirement = {
        amabilityScore: { min: 40, max: 60 },
      };
      return checkConditionRequirement(requirement, state);
    }
  ) && allPassed;

  // Teste: charactersMet
  allPassed = runTest(
    "charactersMet (deve passar com personagens corretos)",
    () => {
      const state = createTestGameState({
        charactersMet: ["carlos", "sara"],
      });
      const requirement: ConditionRequirement = {
        charactersMet: ["carlos", "sara"],
      };
      return checkConditionRequirement(requirement, state);
    }
  ) && allPassed;

  allPassed = runTest(
    "charactersMet (deve falhar com personagem faltando)",
    () => {
      const state = createTestGameState({
        charactersMet: ["carlos"],
      });
      const requirement: ConditionRequirement = {
        charactersMet: ["carlos", "sara"],
      };
      return checkConditionRequirement(requirement, state);
    },
    false
  ) && allPassed;

  // Teste: choicesMade
  allPassed = runTest(
    "choicesMade (deve passar com escolhas corretas)",
    () => {
      const state = createTestGameState({
        choicesHistory: ["choice1", "choice2"],
      });
      const requirement: ConditionRequirement = {
        choicesMade: ["choice1", "choice2"],
      };
      return checkConditionRequirement(requirement, state);
    }
  ) && allPassed;

  allPassed = runTest(
    "choicesMade (deve falhar com escolha faltando)",
    () => {
      const state = createTestGameState({
        choicesHistory: ["choice1"],
      });
      const requirement: ConditionRequirement = {
        choicesMade: ["choice1", "choice2"],
      };
      return checkConditionRequirement(requirement, state);
    },
    false
  ) && allPassed;

  // Teste: undefined requirement
  allPassed = runTest(
    "undefined requirement (deve passar)",
    () => {
      const state = createTestGameState();
      return checkConditionRequirement(undefined, state);
    }
  ) && allPassed;

  return allPassed;
}

/**
 * Executa todos os testes
 */
export function runAllTests(): void {
  console.log("🧪 Iniciando testes do sistema de condições...\n");

  const results = {
    scoreConditions: testScoreConditions(),
    progressConditions: testProgressConditions(),
    historyConditions: testHistoryConditions(),
    characterConditions: testCharacterConditions(),
    combinedConditions: testCombinedConditions(),
    edgeCases: testEdgeCases(),
    conditionRequirements: testConditionRequirements(),
  };

  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter((r) => r).length;

  console.log("\n" + "=".repeat(50));
  console.log("📊 Resumo dos Testes:");
  console.log("=".repeat(50));
  console.log(`✅ Suites passando: ${passedTests}/${totalTests}`);
  console.log(`❌ Suites falhando: ${totalTests - passedTests}/${totalTests}`);

  if (passedTests === totalTests) {
    console.log("\n🎉 Todos os testes passaram!");
  } else {
    console.log("\n⚠️  Alguns testes falharam. Verifique os logs acima.");
  }
}

// Executar testes se este arquivo for executado diretamente
if (typeof window === "undefined" && require.main === module) {
  runAllTests();
}


