/**
 * Cena do escritório - wrapper que combina Canvas 3D + UI
 */

import { OfficeScene3D } from "../components/3d/OfficeScene";
import { DialogueUI } from "../components/ui/DialogueUI";

export function OfficeScene() {
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, position: "relative" }}>
      {/* Cena 3D em background */}
      <OfficeScene3D />
      
      {/* UI de diálogo sobreposta */}
      <DialogueUI />
    </div>
  );
}

