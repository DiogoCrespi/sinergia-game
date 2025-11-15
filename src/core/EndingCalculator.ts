/**
 * Calculadora de finais do jogo
 */

import type { AmabilityScore } from "../types";

export type EndingType = "good" | "bad" | "neutral";

/**
 * Calcula o tipo de final baseado na pontuação
 */
export function calculateEnding(score: AmabilityScore): EndingType {
  const { totalAmability, efficiency } = score;

  // Final ruim: Alta eficiência, baixa amabilidade
  // Você foi eficiente em demitir todos, mas perdeu sua humanidade
  if (totalAmability < 30 && efficiency > 70) {
    return "bad";
  }

  // Final bom: Alta amabilidade, baixa eficiência
  // Você foi genuíno e humano, mas foi demitido por "incompetência"
  if (totalAmability > 70 && efficiency < 30) {
    return "good";
  }

  // Final neutro: Valores intermediários
  // Você tentou equilibrar, mas não foi nem completamente eficiente nem completamente humano
  return "neutral";
}

/**
 * Obtém a mensagem do final
 */
export function getEndingMessage(ending: EndingType): string {
  switch (ending) {
    case "good":
      return "Você foi demitido por 'incompetência'. Mas você manteve sua humanidade.";
    case "bad":
      return "Parabéns! Você foi promovido. Todos foram demitidos. Você venceu.";
    case "neutral":
      return "Você sobreviveu. Mas a que custo?";
    default:
      return "";
  }
}

/**
 * Obtém a descrição detalhada do final
 */
export function getEndingDescription(
  ending: EndingType,
  score: AmabilityScore
): string {
  switch (ending) {
    case "good":
      return `Você escolheu a Amabilidade verdadeira. Suas escolhas genuínas - mostrando empatia (${Math.round(score.empathy)}), respeito (${Math.round(score.respect)}) e confiança (${Math.round(score.trust)}) - foram as corretas, mesmo que a corporação não as reconheça. Você foi demitido por "incompetência", mas manteve sua humanidade. Esta é a verdadeira vitória.`;

    case "bad":
      return `Você alcançou a eficiência máxima (${Math.round(score.efficiency)}). Você demitiu todos os funcionários usando linguagem amável manipuladora. A empresa está satisfeita. Você foi promovido. Mas a que custo? Suas escolhas foram eficientes, mas não foram genuínas. Você perdeu sua humanidade em troca de eficiência.`;

    case "neutral":
      return `Suas escolhas foram uma mistura de genuínas e manipuladoras. O resultado é ambíguo - nem completamente eficiente (${Math.round(score.efficiency)}), nem completamente humano (${Math.round(score.totalAmability)}). Você sobreviveu, mas talvez seja hora de refletir sobre o que realmente importa.`;

    default:
      return "";
  }
}

/**
 * Obtém o título do final
 */
export function getEndingTitle(ending: EndingType): string {
  switch (ending) {
    case "good":
      return "Final Genuíno";
    case "bad":
      return "Final Eficiente";
    case "neutral":
      return "Final Neutro";
    default:
      return "Fim do Jogo";
  }
}

/**
 * Obtém o subtítulo do final
 */
export function getEndingSubtitle(ending: EndingType): string {
  switch (ending) {
    case "good":
      return "A verdadeira vitória é manter sua humanidade";
    case "bad":
      return "Eficiência acima de tudo";
    case "neutral":
      return "Um equilíbrio instável";
    default:
      return "";
  }
}

