/**
 * Gerenciador de sequência de personagens
 */

/**
 * Sequência padrão de personagens
 * Ordem: Personagens base (1-4) seguidos por personagens de expansão (5-10)
 */
export const DEFAULT_CHARACTER_SEQUENCE = [
  "carlos",    // 1. Funcionário de meia-idade, filha doente
  "sara",      // 2. Desenvolvedora júnior, mãe idosa com Alzheimer
  "ana",       // 3. 58 anos, 30 anos de empresa, sendo substituída por IA
  "marcos",    // 4. 24 anos, recém-contratado, não está performando
  "rafael",    // 5. Gerente de Projetos, burnout severo
  "juliana",   // 6. Analista de Marketing, grávida de 6 meses
  "roberto",   // 7. Analista de Dados, limitação física
  "patricia",  // 8. Contadora Sênior, denunciou irregularidades
  "lucas",     // 9. Designer Gráfico, sofrendo discriminação
  "fernanda",  // 10. Coordenadora de Vendas, doença crônica
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

