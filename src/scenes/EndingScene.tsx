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

  // Determinar qual imagem de fundo usar baseado no tipo de final
  const getBackgroundImage = () => {
    switch (ending) {
      case 'bad':
        return 'url(/final_ruim.png)';
      case 'good':
      case 'neutral':
      default:
        return 'url(/final_medio_bom.png)';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: getBackgroundImage(),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 50
      }}
      className="flex items-center justify-center transition-all duration-1000"
    >
      {/* Overlay escuro com gradiente baseado no tipo de final */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b ${content.bgGradient}`}
        style={{
          backgroundColor: ending === 'good' 
            ? 'rgba(0, 0, 0, 0.5)' 
            : ending === 'bad' 
            ? 'rgba(0, 0, 0, 0.6)' 
            : 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)'
        }}
      />
      
      {/* Conteúdo centralizado */}
      <div 
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '56rem',
          margin: '0 auto',
          padding: '2rem',
          textAlign: 'center',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Título */}
        <h1
          className={`text-6xl md:text-7xl font-bold mb-4 ${content.color}`}
          style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)',
            letterSpacing: '0.05em'
          }}
        >
          {content.title}
        </h1>

        <h2 
          className="text-2xl md:text-3xl text-gray-200 mb-8 font-light"
          style={{
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
          }}
        >
          {content.subtitle}
        </h2>

        {/* Descrição */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '2rem',
            border: `2px solid ${ending === 'good' 
              ? 'rgba(34, 197, 94, 0.4)' 
              : ending === 'bad' 
              ? 'rgba(239, 68, 68, 0.4)' 
              : 'rgba(234, 179, 8, 0.4)'}`,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}
        >
          <p 
            className="text-lg md:text-xl text-gray-100 leading-relaxed"
            style={{
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
            }}
          >
            {content.description}
          </p>
        </div>

        {/* Estatísticas */}
        <div 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(55, 65, 81, 0.6)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}
        >
          <h3 
            className="text-2xl md:text-3xl font-semibold text-white mb-6"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
            }}
          >
            Suas Estatísticas Finais
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div 
              style={{
                backgroundColor: 'rgba(30, 58, 138, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}
            >
              <p className="text-gray-300 text-sm mb-2">Amabilidade Total</p>
              <p className="text-3xl font-bold text-blue-400" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
                {Math.round(amabilityScore.totalAmability)}
              </p>
            </div>
            <div 
              style={{
                backgroundColor: 'rgba(20, 83, 45, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}
            >
              <p className="text-gray-300 text-sm mb-2">Empatia</p>
              <p className="text-3xl font-bold text-green-400" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
                {Math.round(amabilityScore.empathy)}
              </p>
            </div>
            <div 
              style={{
                backgroundColor: 'rgba(88, 28, 135, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem',
                border: '1px solid rgba(168, 85, 247, 0.3)'
              }}
            >
              <p className="text-gray-300 text-sm mb-2">Respeito</p>
              <p className="text-3xl font-bold text-purple-400" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
                {Math.round(amabilityScore.respect)}
              </p>
            </div>
            <div 
              style={{
                backgroundColor: 'rgba(22, 78, 99, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem',
                border: '1px solid rgba(34, 211, 238, 0.3)'
              }}
            >
              <p className="text-gray-300 text-sm mb-2">Confiança</p>
              <p className="text-3xl font-bold text-cyan-400" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
                {Math.round(amabilityScore.trust)}
              </p>
            </div>
            <div 
              style={{
                backgroundColor: 'rgba(127, 29, 29, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              <p className="text-gray-300 text-sm mb-2">Eficiência</p>
              <p className="text-3xl font-bold text-red-400" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
                {Math.round(amabilityScore.efficiency)}
              </p>
            </div>
            <div 
              style={{
                backgroundColor: 'rgba(20, 83, 45, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}
            >
              <p className="text-gray-300 text-sm mb-2">Escolhas Genuínas</p>
              <p className="text-3xl font-bold text-green-400" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
                {amabilityScore.genuineChoices}
              </p>
            </div>
            <div 
              style={{
                backgroundColor: 'rgba(127, 29, 29, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              <p className="text-gray-300 text-sm mb-2">Escolhas Manipuladoras</p>
              <p className="text-3xl font-bold text-red-400" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
                {amabilityScore.manipulativeChoices}
              </p>
            </div>
            <div 
              style={{
                backgroundColor: 'rgba(30, 58, 138, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}
            >
              <p className="text-gray-300 text-sm mb-2">Personagens Ajudados</p>
              <p className="text-3xl font-bold text-blue-400" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
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
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
            className="px-10 py-4 bg-blue-600/90 hover:bg-blue-700/90 text-white text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-xl"
          >
            Jogar Novamente
          </button>

          <button
            onClick={() => {
              setCurrentState("menu");
            }}
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
            className="px-10 py-4 bg-gray-700/90 hover:bg-gray-600/90 text-white text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-xl"
          >
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}

