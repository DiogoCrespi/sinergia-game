import { useState, useEffect } from "react";
import { useGameStore } from "./store/gameStore";
import { MainMenu } from "./components/layout/MainMenu";
import { OfficeScene } from "./scenes/OfficeScene";
import { EndingScene } from "./scenes/EndingScene";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import type { GameStatus } from "./types/game";
import "./App.css";

function App() {
  const { currentState, isLoading, loadingProgress } = useGameStore();
  const [showContent, setShowContent] = useState(!isLoading);
  const [displayState, setDisplayState] = useState<GameStatus>(currentState);

  // Atualizar displayState quando currentState mudar (sem loading)
  useEffect(() => {
    if (!isLoading) {
      setDisplayState(currentState);
    }
  }, [currentState, isLoading]);

  // Gerenciar fade entre estados
  useEffect(() => {
    if (isLoading) {
      // Quando começar a carregar, fazer fade out do conteúdo atual
      setShowContent(false);
    } else {
      // Quando terminar de carregar, fazer fade in do novo conteúdo
      // Pequeno delay para garantir que o estado foi atualizado antes do fade in
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }
  }, [isLoading]);

  return (
    <>
      {/* Tela de carregamento - aparece sobre tudo */}
      <LoadingScreen isLoading={isLoading} progress={loadingProgress} />

      {/* Conteúdo principal com fade */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          width: "100%",
          height: "100%",
          pointerEvents: showContent ? "auto" : "none",
        }}
      >
        {/* Mostrar menu quando estado for "menu" */}
        {displayState === "menu" && <MainMenu />}

        {/* Mostrar tela de final quando estado for "ending" */}
        {displayState === "ending" && <EndingScene />}

        {/* Mostrar cena do jogo quando estado for "playing" */}
        {displayState === "playing" && <OfficeScene />}
      </div>
    </>
  );
}

export default App;
