/**
 * Cena de final do jogo
 */

import { useGameStore } from "../store/gameStore";
import { calculateFinal } from "../core/AmabilityScore";

export function EndingScene() {
  const { amabilityScore, resetGame, setCurrentState } = useGameStore();
  const final = calculateFinal(amabilityScore);

  const getEndingContent = () => {
    switch (final) {
      case "good":
        return {
          title: "Final Genuíno",
          subtitle: "Você escolheu a Amabilidade verdadeira",
          message: "Você foi demitido por 'incompetência', mas manteve sua humanidade. As escolhas genuínas que você fez - mostrando empatia, respeito e confiança - foram as corretas, mesmo que a corporação não as reconheça.",
          color: "text-green-400",
          bgGradient: "from-green-900/20 to-blue-900/20",
        };
      case "bad":
        return {
          title: "Final Eficiente",
          subtitle: "Você alcançou a eficiência máxima",
          message: "Parabéns! Você demitiu todos os funcionários usando linguagem amável manipuladora. A empresa está satisfeita com sua eficiência. Mas a que custo? Suas escolhas foram eficientes, mas não foram genuínas.",
          color: "text-red-400",
          bgGradient: "from-red-900/20 to-orange-900/20",
        };
      default:
        return {
          title: "Final Neutro",
          subtitle: "Um equilíbrio instável",
          message: "Suas escolhas foram uma mistura de genuínas e manipuladoras. O resultado é ambíguo - nem completamente eficiente, nem completamente humano. Talvez seja hora de refletir sobre o que realmente importa.",
          color: "text-yellow-400",
          bgGradient: "from-yellow-900/20 to-orange-900/20",
        };
    }
  };

  const content = getEndingContent();

  return (
    <div className={`fixed inset-0 bg-gradient-to-b ${content.bgGradient} flex items-center justify-center z-50`}>
      <div className="text-center max-w-3xl mx-auto px-8 py-12">
        {/* Título */}
        <h1 className={`text-5xl font-bold mb-4 ${content.color}`}>
          {content.title}
        </h1>
        
        <h2 className="text-2xl text-gray-300 mb-6">
          {content.subtitle}
        </h2>

        {/* Mensagem */}
        <p className="text-lg text-gray-200 mb-12 leading-relaxed">
          {content.message}
        </p>

        {/* Estatísticas */}
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-300 mb-4">
            Suas Estatísticas
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
        <div className="space-y-4">
          <button
            onClick={() => {
              resetGame();
              setCurrentState("menu");
            }}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Jogar Novamente
          </button>

          <button
            onClick={() => {
              setCurrentState("menu");
            }}
            className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}

