/**
 * Gerenciador de saves do jogo
 */

import type { GameState, AmabilityScore } from "../types";

export interface SaveData {
  timestamp: number;
  version: string; // Versão do formato de save
  gameState: {
    currentState: GameState["currentState"];
    playthroughCount: number;
    choicesHistory: string[];
    currentCharacter: string | null;
    currentCharacterIndex: number;
    characterSequence: string[];
    charactersMet: string[];
    usedTags: string[];
  };
  amabilityScore: AmabilityScore;
  currentNodeId: string | null;
  currentTreeId: string | null; // treeId da árvore atual
}

const SAVE_PREFIX = "sinergia_save_";
const MAX_SAVES = 5;
const SAVE_VERSION = "1.0.0";

/**
 * Salva o estado do jogo em um slot
 */
export function saveGame(slot: number, gameState: GameState): boolean {
  if (slot < 0 || slot >= MAX_SAVES) {
    console.error(`Slot inválido: ${slot}. Deve estar entre 0 e ${MAX_SAVES - 1}`);
    return false;
  }

  try {
    const saveData: SaveData = {
      timestamp: Date.now(),
      version: SAVE_VERSION,
      gameState: {
        currentState: gameState.currentState,
        playthroughCount: gameState.playthroughCount,
        choicesHistory: [...gameState.choicesHistory],
        currentCharacter: gameState.currentCharacter,
        currentCharacterIndex: gameState.currentCharacterIndex,
        characterSequence: [...gameState.characterSequence],
        charactersMet: [...gameState.charactersMet],
        usedTags: [...gameState.usedTags],
      },
      amabilityScore: { ...gameState.amabilityScore },
      currentNodeId: gameState.currentNode?.nodeId || null,
      currentTreeId: gameState.currentCharacter
        ? `${gameState.currentCharacter}_dialogue`
        : null,
    };

    const key = `${SAVE_PREFIX}${slot}`;
    localStorage.setItem(key, JSON.stringify(saveData));

    return true;
  } catch (error) {
    console.error("Erro ao salvar jogo:", error);
    // Verificar se é erro de quota excedida
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      console.error("LocalStorage está cheio. Não foi possível salvar.");
    }
    return false;
  }
}

/**
 * Carrega um save de um slot
 */
export function loadGame(slot: number): SaveData | null {
  if (slot < 0 || slot >= MAX_SAVES) {
    console.error(`Slot inválido: ${slot}`);
    return null;
  }

  try {
    const key = `${SAVE_PREFIX}${slot}`;
    const data = localStorage.getItem(key);

    if (!data) {
      return null; // Slot vazio
    }

    const saveData: SaveData = JSON.parse(data);

    // Validar dados
    if (!validateSaveData(saveData)) {
      console.error("Dados de save inválidos ou corrompidos");
      return null;
    }

    return saveData;
  } catch (error) {
    console.error("Erro ao carregar save:", error);
    return null;
  }
}

/**
 * Valida os dados de um save
 */
function validateSaveData(data: any): data is SaveData {
  if (!data || typeof data !== "object") {
    return false;
  }

  // Verificar campos obrigatórios
  if (
    typeof data.timestamp !== "number" ||
    !data.gameState ||
    !data.amabilityScore
  ) {
    return false;
  }

  // Validar estrutura do gameState
  const { gameState } = data;
  if (
    !["menu", "playing", "ending"].includes(gameState.currentState) ||
    typeof gameState.playthroughCount !== "number" ||
    !Array.isArray(gameState.choicesHistory) ||
    typeof gameState.currentCharacterIndex !== "number"
  ) {
    return false;
  }

  // Validar estrutura do amabilityScore
  const { amabilityScore } = data;
  if (
    typeof amabilityScore.totalAmability !== "number" ||
    typeof amabilityScore.empathy !== "number" ||
    typeof amabilityScore.respect !== "number" ||
    typeof amabilityScore.trust !== "number" ||
    typeof amabilityScore.efficiency !== "number"
  ) {
    return false;
  }

  // Validar valores (0-100 para pontuações)
  if (
    amabilityScore.totalAmability < 0 ||
    amabilityScore.totalAmability > 100 ||
    amabilityScore.empathy < 0 ||
    amabilityScore.empathy > 100 ||
    amabilityScore.respect < 0 ||
    amabilityScore.respect > 100 ||
    amabilityScore.trust < 0 ||
    amabilityScore.trust > 100 ||
    amabilityScore.efficiency < 0 ||
    amabilityScore.efficiency > 100
  ) {
    return false;
  }

  return true;
}

/**
 * Deleta um save de um slot
 */
export function deleteSave(slot: number): boolean {
  if (slot < 0 || slot >= MAX_SAVES) {
    return false;
  }

  try {
    const key = `${SAVE_PREFIX}${slot}`;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Erro ao deletar save:", error);
    return false;
  }
}

/**
 * Lista todos os saves disponíveis
 */
export function listSaves(): (SaveData | null)[] {
  const saves: (SaveData | null)[] = [];

  for (let i = 0; i < MAX_SAVES; i++) {
    saves.push(loadGame(i));
  }

  return saves;
}

/**
 * Formata timestamp para exibição
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Obtém informações resumidas de um save para preview
 */
export function getSavePreview(saveData: SaveData | null): {
  exists: boolean;
  timestamp: string;
  amabilityScore: number;
  charactersMet: number;
  totalCharacters: number;
  progress: string;
} {
  if (!saveData) {
    return {
      exists: false,
      timestamp: "",
      amabilityScore: 0,
      charactersMet: 0,
      totalCharacters: 0,
      progress: "",
    };
  }

  return {
    exists: true,
    timestamp: formatTimestamp(saveData.timestamp),
    amabilityScore: Math.round(saveData.amabilityScore.totalAmability),
    charactersMet: saveData.gameState.charactersMet.length,
    totalCharacters: saveData.gameState.characterSequence.length,
    progress: `${saveData.gameState.charactersMet.length}/${saveData.gameState.characterSequence.length} personagens`,
  };
}





