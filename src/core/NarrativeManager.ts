/**
 * Gerenciador de narrativa - controla a árvore de diálogos
 */

import type {
  DialogueNode,
  DialogueVariation,
  GameState,
  Condition,
} from "../types";
import { loadNarrativeTree } from "../utils/jsonLoader";
import {
  checkConditions as checkConditionsUtil,
  checkConditionRequirement,
} from "../utils/conditions";
import {
  generateContextualTags,
  adjustWeightByContext,
} from "../utils/contextualTags";

export class NarrativeManager {
  private narrativeTree: Map<string, DialogueNode> = new Map();

  /**
   * Carrega uma árvore de narrativa do JSON
   */
  async loadNarrativeTree(treeId: string): Promise<void> {
    try {
      if (!treeId || typeof treeId !== "string") {
        throw new Error("treeId deve ser uma string válida");
      }

      const tree = await loadNarrativeTree(treeId);

      // Validar estrutura básica
      if (!tree || !tree.nodes || !Array.isArray(tree.nodes)) {
        throw new Error("Árvore de narrativa inválida: estrutura de dados incorreta");
      }

      if (tree.nodes.length === 0) {
        throw new Error("Árvore de narrativa vazia: nenhum nó encontrado");
      }

      // Construir Map de nós
      this.narrativeTree.clear();
      tree.nodes.forEach((node) => {
        if (!node.nodeId) {
          console.warn("Nó sem nodeId encontrado, ignorando:", node);
          return;
        }
        this.narrativeTree.set(node.nodeId, node);
      });

      if (this.narrativeTree.size === 0) {
        throw new Error("Nenhum nó válido encontrado na árvore de narrativa");
      }
    } catch (error) {
      console.error(`Erro ao carregar árvore de narrativa ${treeId}:`, error);
      throw error;
    }
  }

  /**
   * Obtém o próximo nó da narrativa
   * Agora com suporte a variações e condições
   */
  getNextNode(nodeId: string, gameState?: GameState): DialogueNode | null {
    if (!nodeId || typeof nodeId !== "string") {
      console.warn("nodeId inválido:", nodeId);
      return null;
    }

    const node = this.narrativeTree.get(nodeId);
    if (!node) {
      console.warn(`Nó ${nodeId} não encontrado na árvore de narrativa`);
      return null;
    }

    // Validar estrutura do nó
    if (!node.characterName) {
      console.warn(`Nó ${nodeId} sem characterName, usando padrão`);
      node.characterName = "Sistema";
    }

    // Verificar condições do nó (se gameState fornecido)
    if (gameState && node.conditions) {
      if (!this.checkConditions(node.conditions, gameState)) {
        console.log(`Condições não atendidas para nó ${nodeId}`);
        return null;
      }
    }

    // Aplicar variações de diálogo (se gameState fornecido)
    let processedNode = node;
    if (gameState && node.dialogueVariations) {
      processedNode = this.applyVariations(node, gameState);
    }

    // Se o nó é automático, retornar diretamente
    if (processedNode.isAutomatic) {
      return processedNode;
    }

    // Validar opções
    if (processedNode.options && processedNode.options.length > 0) {
      // Filtrar opções baseado em condições (se gameState fornecido)
      let validOptions = processedNode.options;
      if (gameState) {
        validOptions = processedNode.options.filter((opt) => {
          // Verificar condições da opção (se existir)
          if (opt.conditions && opt.conditions.length > 0) {
            return checkConditionsUtil(opt.conditions, gameState);
          }
          return true;
        });
      }

      // Validar estrutura de cada opção
      const structuredOptions = validOptions.filter((opt) => {
        if (!opt.optionId || !opt.text || !opt.nextNodeId) {
          console.warn(`Opção inválida no nó ${nodeId}:`, opt);
          return false;
        }
        return true;
      });

      // Garantir que sempre há pelo menos uma opção válida
      if (structuredOptions.length === 0) {
        if (processedNode.options.length > 0) {
          console.warn(
            `Nó ${nodeId}: Todas as opções foram filtradas por condições. Usando primeira opção como fallback.`
          );
          // Fallback: usar primeira opção mesmo que não passe nas condições
          processedNode.options = [processedNode.options[0]];
        } else {
          console.error(`Nó ${nodeId} não tem opções válidas`);
          return null;
        }
      } else {
        processedNode.options = structuredOptions;
      }
    }

    // Randomizar posições das opções se necessário
    return this.randomizeOptions(processedNode);
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
   * Aplica variações de diálogo ao nó
   * Seleciona uma variação baseada em peso, tags e condições
   * Método público para uso externo
   */
  public applyVariations(
    node: DialogueNode,
    gameState: GameState
  ): DialogueNode {
    // Se não há variações, retornar nó original
    if (!node.dialogueVariations || node.dialogueVariations.length === 0) {
      return node;
    }

    // Filtrar variações válidas baseado em condições
    const validVariations = node.dialogueVariations.filter((variation) => {
      // Se não tem requires, sempre válida
      if (!variation.requires) {
        return true;
      }

      // Verificar requisitos da variação
      return checkConditionRequirement(variation.requires, gameState);
    });

    // Se nenhuma variação é válida, usar fallback
    if (validVariations.length === 0) {
      console.warn(
        `Nenhuma variação válida para nó ${node.nodeId}, usando primeira variação`
      );
      return {
        ...node,
        dialogueText: node.dialogueVariations[0].text,
      };
    }

    // Gerar tags contextuais baseadas no estado do jogo
    const contextualTags = generateContextualTags(gameState);

    // Ajustar pesos baseado em tags usadas E tags contextuais
    const adjustedVariations = validVariations.map((variation) => {
      // Primeiro ajustar por tags usadas (reduzir peso de tags já usadas)
      let adjustedWeight = this.adjustWeightByUsedTags(
        variation.weight,
        variation.tags || [],
        gameState.usedTags
      );

      // Depois ajustar por tags contextuais (aumentar peso de tags relevantes)
      adjustedWeight = adjustWeightByContext(
        adjustedWeight,
        variation.tags || [],
        contextualTags
      );

      return {
        ...variation,
        weight: adjustedWeight,
      };
    });

    // Selecionar variação baseada em peso
    const selected = this.selectByWeight(adjustedVariations);

    // Rastrear tags usadas (adicionar ao gameState)
    if (selected.tags && selected.tags.length > 0) {
      // Nota: Isso será feito no store, não aqui
      // Por enquanto, apenas log
      if (process.env.NODE_ENV === "development") {
        console.log(`Tags usadas: ${selected.tags.join(", ")}`);
      }
    }

    return {
      ...node,
      dialogueText: selected.text,
    };
  }

  /**
   * Ajusta peso de uma variação baseado em tags já usadas
   * Reduz peso de variações com tags já usadas
   */
  private adjustWeightByUsedTags(
    baseWeight: number,
    variationTags: string[],
    usedTags: string[]
  ): number {
    if (variationTags.length === 0) {
      return baseWeight;
    }

    // Contar quantas tags desta variação já foram usadas
    const usedTagCount = variationTags.filter((tag) =>
      usedTags.includes(tag)
    ).length;

    // Reduzir peso proporcionalmente
    // Se todas as tags foram usadas, reduzir peso em 50%
    // Se metade, reduzir em 25%
    const reductionFactor = usedTagCount / variationTags.length;
    const adjustedWeight = baseWeight * (1 - reductionFactor * 0.5);

    return Math.max(0.1, adjustedWeight); // Mínimo de 0.1
  }

  /**
   * Seleciona uma variação baseada em peso (seleção aleatória ponderada)
   */
  private selectByWeight(variations: DialogueVariation[]): DialogueVariation {
    if (variations.length === 0) {
      throw new Error("Nenhuma variação fornecida para seleção");
    }

    // Calcular peso total
    const totalWeight = variations.reduce(
      (sum, variation) => sum + variation.weight,
      0
    );

    if (totalWeight <= 0) {
      console.warn("Peso total inválido, usando primeira variação");
      return variations[0];
    }

    // Seleção aleatória ponderada
    let random = Math.random() * totalWeight;

    for (const variation of variations) {
      random -= variation.weight;
      if (random <= 0) {
        return variation;
      }
    }

    // Fallback (não deveria chegar aqui)
    return variations[0];
  }

  /**
   * Verifica se as condições de um nó são satisfeitas
   * Usa o engine de condições
   */
  checkConditions(conditions: Condition[] | undefined, gameState: GameState): boolean {
    return checkConditionsUtil(conditions, gameState);
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

