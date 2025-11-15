/**
 * Configurações de posição, escala e rotação para cada personagem
 * Ajuste estes valores para posicionar corretamente os personagens na cena
 */

export interface CharacterConfig {
  position: [number, number, number];
  scale: number | [number, number, number];
  rotation: [number, number, number]; // Em radianos
}

/**
 * Configurações padrão para cada personagem
 * Ajuste conforme necessário para cada modelo 3D
 */
export const CHARACTER_CONFIGS: Record<string, CharacterConfig> = {
  // Carlos - ajuste estes valores para posicionar corretament
  carlos: {
    position: [0, 0, -2],      // [X, Y, Z] - X: esquerda/direita, Y: altura, Z: frente/trás
    scale: 4.5,                   // 1 = tamanho original, 0.5 = metade, 2 = dobro
    rotation: [0, 5, 0],        // [X, Y, Z] em radianos - Y: rotação horizontal
  },
  
  // Sara - valores padrão (ajustar quando adicionar modelo)
  sara: {
    position: [0, 0, -2],
    scale: 1,
    rotation: [0, 0, 0],
  },
  
  // Ana - valores padrão (ajustar quando adicionar modelo)
  ana: {
    position: [0, 0, -2],
    scale: 1,
    rotation: [0, 0, 0],
  },
  
  // Marcos - valores padrão (ajustar quando adicionar modelo)
  marcos: {
    position: [0, 0, -2],
    scale: 1,
    rotation: [0, 0, 0],
  },
};

/**
 * Obtém a configuração de um personagem
 */
export function getCharacterConfig(characterId: string): CharacterConfig {
  const normalizedId = characterId.toLowerCase();
  return CHARACTER_CONFIGS[normalizedId] || CHARACTER_CONFIGS.carlos;
}

