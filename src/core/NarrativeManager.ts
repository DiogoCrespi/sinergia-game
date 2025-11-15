/**
 * Gerenciador de narrativa - controla a árvore de diálogos
 */

import type {
  DialogueNode,
  GameState,
  Condition,
} from "../types";
import { loadNarrativeTree } from "../utils/jsonLoader";

export class NarrativeManager {
  private narrativeTree: Map<string, DialogueNode> = new Map();

  /**
   * Carrega uma árvore de narrativa do JSON
   */
  async loadNarrativeTree(treeId: string): Promise<void> {
    try {
      const tree = await loadNarrativeTree(treeId);

      // Construir Map de nós
      this.narrativeTree.clear();
      tree.nodes.forEach((node) => {
        this.narrativeTree.set(node.nodeId, node);
      });
    } catch (error) {
      console.error(`Erro ao carregar árvore de narrativa ${treeId}:`, error);
      throw error;
    }
  }

  /**
   * Obtém o próximo nó da narrativa
   * Versão simples - sem condições ainda
   */
  getNextNode(nodeId: string): DialogueNode | null {
    const node = this.narrativeTree.get(nodeId);
    if (!node) {
      console.warn(`Nó ${nodeId} não encontrado na árvore de narrativa`);
      return null;
    }

    // Se o nó é automático, retornar diretamente
    if (node.isAutomatic) {
      return node;
    }

    // Randomizar posições das opções se necessário
    return this.randomizeOptions(node);
  }

  /**
   * Randomiza a posição das opções (esquerda/direita)
   */
  private randomizeOptions(node: DialogueNode): DialogueNode {
    if (node.options.length !== 2) {
      return node;
    }

    // Se ambas as opções têm position "random", randomizar
    const shouldRandomize =
      node.options[0].position === "random" ||
      node.options[1].position === "random" ||
      (!node.options[0].position && !node.options[1].position);

    if (shouldRandomize && Math.random() > 0.5) {
      return {
        ...node,
        options: [node.options[1], node.options[0]],
      };
    }

    return node;
  }

  /**
   * Verifica se as condições de um nó são satisfeitas
   * Versão simplificada - será expandida depois
   */
  checkConditions(conditions: Condition[] | undefined, _gameState: GameState): boolean {
    if (!conditions || conditions.length === 0) {
      return true;
    }

    // Implementação básica - será expandida no Sprint 3
    // Por enquanto, sempre retorna true
    return true;
  }

  /**
   * Obtém o nó inicial da árvore carregada
   */
  getStartNode(): DialogueNode | null {
    // Procurar por nó com nodeId "start"
    const startNode = this.narrativeTree.get("start");
    if (startNode) {
      return startNode;
    }

    // Se não encontrar "start", retornar o primeiro nó
    const firstNode = Array.from(this.narrativeTree.values())[0];
    return firstNode || null;
  }

  /**
   * Verifica se uma árvore está carregada
   */
  isTreeLoaded(): boolean {
    return this.narrativeTree.size > 0;
  }

  /**
   * Limpa a árvore carregada
   */
  clearTree(): void {
    this.narrativeTree.clear();
  }
}

