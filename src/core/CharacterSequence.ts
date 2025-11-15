/**
 * Gerenciador de sequência de personagens
 */

/**
 * Sequência padrão de personagens
 */
export const DEFAULT_CHARACTER_SEQUENCE = [
  "carlos",
  "sara",
  "ana",
  "marcos",
];

/**
 * Obtém o próximo personagem na sequência
 */
export function getNextCharacter(
  currentIndex: number,
  sequence: string[]
): string | null {
  if (currentIndex + 1 >= sequence.length) {
    return null; // Todos os personagens foram vistos
  }
  return sequence[currentIndex + 1];
}

/**
 * Verifica se todos os personagens foram vistos
 */
export function areAllCharactersMet(
  currentIndex: number,
  sequence: string[]
): boolean {
  return currentIndex >= sequence.length - 1;
}

/**
 * Obtém o treeId a partir do characterId
 */
export function getTreeId(characterId: string): string {
  return `${characterId}_dialogue`;
}

