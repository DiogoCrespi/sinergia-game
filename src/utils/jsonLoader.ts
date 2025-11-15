/**
 * Utilitário para carregar arquivos JSON
 */

import type { NarrativeTree } from "../types";

const cache = new Map<string, any>();

/**
 * Carrega um arquivo JSON genérico
 */
export async function loadJSON<T>(path: string): Promise<T> {
  // Verificar cache primeiro
  if (cache.has(path)) {
    return cache.get(path) as T;
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(
        `Erro ao carregar ${path}: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    cache.set(path, data);
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao carregar JSON de ${path}: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Carrega uma árvore de narrativa
 */
export async function loadNarrativeTree(
  treeId: string
): Promise<NarrativeTree> {
  const path = `/data/narrative-trees/${treeId}.json`;
  console.log(`Tentando carregar JSON de: ${path}`);
  try {
    const result = await loadJSON<NarrativeTree>(path);
    console.log(`JSON carregado com sucesso:`, result);
    return result;
  } catch (error) {
    console.error(`Erro ao carregar árvore ${treeId} de ${path}:`, error);
    throw error;
  }
}

/**
 * Limpa o cache de JSONs carregados
 */
export function clearCache(): void {
  cache.clear();
}

