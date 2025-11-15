import { useGameStore } from "./store/gameStore";
import { MainMenu } from "./components/layout/MainMenu";
import { OfficeScene } from "./scenes/OfficeScene";
import { EndingScene } from "./scenes/EndingScene";
import "./App.css";

function App() {
  const { currentState } = useGameStore();

  // Mostrar menu quando estado for "menu"
  if (currentState === "menu") {
    return <MainMenu />;
  }

  // Mostrar tela de final quando estado for "ending"
  if (currentState === "ending") {
    return <EndingScene />;
  }

  // Mostrar cena do jogo quando estado for "playing"
  return <OfficeScene />;
}

export default App;
