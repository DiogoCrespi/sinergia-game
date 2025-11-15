import { TestScene } from "./components/3d/TestScene";
import { DialogueUI } from "./components/ui/DialogueUI";
import "./App.css";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, position: "relative" }}>
      {/* Cena 3D em background */}
      <TestScene />
      
      {/* UI de diálogo sobreposta */}
      <DialogueUI />
    </div>
  );
}

export default App;
