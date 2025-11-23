/**
 * Cena 3D do escritório - ambiente principal do jogo
 */

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { OfficeEnvironment2D } from "./OfficeEnvironment2D";
import { Character } from "./Character";
import { Effects } from "./Effects";
import { CAMERA_CONFIG } from "./sceneConfig";

export function OfficeScene3D() {
  return (
    <Canvas
      gl={{ 
        antialias: true,
        toneMappingExposure: 1.0,
      }}
      style={{ 
        width: "100vw", 
        height: "100vh", 
        position: "fixed", 
        top: 0, 
        left: 0,
        margin: 0,
        padding: 0
      }}
    >
      {/* Câmera - primeira pessoa, posição sentada */}
      <PerspectiveCamera
        makeDefault
        position={CAMERA_CONFIG.position}
        fov={CAMERA_CONFIG.fov}
        rotation={CAMERA_CONFIG.rotation}
      />

      {/* Iluminação melhorada */}
      {/* Luz ambiente suave */}
      <ambientLight intensity={0.5} />
      
      {/* Luz principal (simulando janelas) */}
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Luz de preenchimento */}
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
      
      {/* Luz pontual para iluminação artificial do escritório */}
      <pointLight position={[0, 3, 0]} intensity={0.6} />

      {/* Ambiente do escritório - Imagens 2D */}
      <OfficeEnvironment2D 
        position={[0, 0, 0]}
        scale={1}
      />

      {/* Personagem */}
      <Character />

      {/* Efeitos visuais (post-processing) */}
      <Effects />
    </Canvas>
  );
}

