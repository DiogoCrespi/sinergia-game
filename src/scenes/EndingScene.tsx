/**
 * Cena de final do jogo
 */

import { useGameStore } from "../store/gameStore";
import {
  calculateEnding,
  getEndingTitle,
  getEndingSubtitle,
  getEndingDescription,
  type EndingType,
} from "../core/EndingCalculator";

export function EndingScene() {
  const { amabilityScore, resetGame, setCurrentState } = useGameStore();
  const ending: EndingType = calculateEnding(amabilityScore);

  const getEndingContent = () => {
    const title = getEndingTitle(ending);
    const subtitle = getEndingSubtitle(ending);
    const description = getEndingDescription(ending, amabilityScore);

    switch (ending) {
      case "good":
        return {
          title,
          subtitle,
          description,
          color: "text-green-400",
          bgGradient: "from-green-900/30 via-blue-900/20 to-green-900/30",
          borderColor: "border-green-500/50",
        };
      case "bad":
        return {
          title,
          subtitle,
          description,
          color: "text-red-400",
          bgGradient: "from-red-900/30 via-orange-900/20 to-red-900/30",
          borderColor: "border-red-500/50",
        };
      default:
        return {
          title,
          subtitle,
          description,
          color: "text-yellow-400",
          bgGradient: "from-yellow-900/30 via-orange-900/20 to-yellow-900/30",
          borderColor: "border-yellow-500/50",
        };
    }
  };

  const content = getEndingContent();

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-b ${content.bgGradient} flex items-center justify-center z-50 transition-all duration-1000`}
    >
      <div className="text-center max-w-4xl mx-auto px-8 py-12">
        {/* Título */}
        <h1
          className={`text-6xl font-bold mb-4 ${content.color} drop-shadow-lg`}
        >
          {content.title}
        </h1>

        <h2 className="text-2xl text-gray-300 mb-8 font-light">
          {content.subtitle}
        </h2>

        {/* Descrição */}
        <div
          className={`bg-black/70 backdrop-blur-md rounded-xl p-8 mb-8 border-2 ${content.borderColor} shadow-2xl`}
        >
          <p className="text-lg text-gray-200 leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Estatísticas */}
        <div className="bg-black/70 backdrop-blur-md rounded-xl p-8 mb-8 border border-gray-700/50 shadow-xl">
          <h3 className="text-2xl font-semibold text-gray-200 mb-6">
            Suas Estatísticas Finais
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Amabilidade Total</p>
              <p className="text-2xl font-bold text-blue-400">
                {Math.round(amabilityScore.totalAmability)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Empatia</p>
              <p className="text-2xl font-bold text-green-400">
                {Math.round(amabilityScore.empathy)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Respeito</p>
              <p className="text-2xl font-bold text-purple-400">
                {Math.round(amabilityScore.respect)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Confiança</p>
              <p className="text-2xl font-bold text-cyan-400">
                {Math.round(amabilityScore.trust)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Eficiência</p>
              <p className="text-2xl font-bold text-red-400">
                {Math.round(amabilityScore.efficiency)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Escolhas Genuínas</p>
              <p className="text-2xl font-bold text-green-400">
                {amabilityScore.genuineChoices}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Escolhas Manipuladoras</p>
              <p className="text-2xl font-bold text-red-400">
                {amabilityScore.manipulativeChoices}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Personagens Ajudados</p>
              <p className="text-2xl font-bold text-blue-400">
                {amabilityScore.charactersHelped}
              </p>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => {
              resetGame();
              setCurrentState("menu");
            }}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
          >
            Jogar Novamente
          </button>

          <button
            onClick={() => {
              setCurrentState("menu");
            }}
            className="px-10 py-4 bg-gray-700 hover:bg-gray-600 text-white text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
          >
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}

