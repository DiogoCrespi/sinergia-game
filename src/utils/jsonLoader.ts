/**
 * Utilitário para carregar arquivos JSON
 */

import type { NarrativeTree } from "../types";

const cache = new Map<string, any>();

/**
 * Carrega um arquivo JSON genérico
 */
export async function loadJSON<T>(path: string): Promise<T> {
  if (!path || typeof path !== "string") {
    throw new Error("Caminho do arquivo inválido");
  }

  // Verificar cache primeiro
  if (cache.has(path)) {
    return cache.get(path) as T;
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Arquivo não encontrado: ${path}`);
      }
      throw new Error(
        `Erro ao carregar ${path}: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    
    if (!data) {
      throw new Error(`Arquivo JSON vazio: ${path}`);
    }

    cache.set(path, data);
    return data as T;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(`Erro de rede ao carregar ${path}. Verifique sua conexão.`);
    }
    if (error instanceof SyntaxError) {
      throw new Error(`Erro ao parsear JSON de ${path}: arquivo inválido`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Erro desconhecido ao carregar ${path}`);
  }
}

/**
 * Carrega uma árvore de narrativa
 */
export async function loadNarrativeTree(
  treeId: string
): Promise<NarrativeTree> {
  const path = `/data/narrative-trees/${treeId}.json`;
  return loadJSON<NarrativeTree>(path);
}

/**
 * Limpa o cache de JSONs carregados
 */
export function clearCache(): void {
  cache.clear();
}

