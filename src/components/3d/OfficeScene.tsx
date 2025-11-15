/**
 * Cena 3D do escritório - ambiente principal do jogo
 */

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Desk } from "./Desk";
import { WindowView } from "./WindowView";
import { Character } from "./Character";
import { Effects } from "./Effects";

export function OfficeScene3D() {
  return (
    <Canvas
      gl={{ 
        antialias: true,
        toneMappingExposure: 1.0,
      }}
      style={{ width: "100%", height: "100vh", position: "absolute", top: 0, left: 0 }}
    >
      {/* Câmera - primeira pessoa, posição sentada */}
      <PerspectiveCamera
        makeDefault
        position={[0, 1.6, 0]}
        fov={75}
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

      {/* Ambiente do escritório */}
      <Desk position={[0, 0, 0]} />
      <WindowView position={[0, 2, -5]} />

      {/* Chão */}
      <mesh position={[0, -0.5, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Parede traseira */}
      <mesh position={[0, 2, -5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Paredes laterais */}
      <mesh position={[-5, 2, -2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[5, 2, -2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Personagem */}
      <Character />

      {/* Efeitos visuais (post-processing) */}
      <Effects />
    </Canvas>
  );
}

