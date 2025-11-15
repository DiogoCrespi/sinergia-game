import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

/**
 * Cena de teste básica para verificar se React Three Fiber está funcionando
 */
export function TestScene() {
  return (
    <Canvas
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100vh", position: "absolute", top: 0, left: 0 }}
    >
      {/* Câmera - primeira pessoa, posição sentada */}
      <PerspectiveCamera
        makeDefault
        position={[0, 1.6, 0]}
        fov={75}
      />

      {/* Iluminação */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />

      {/* Geometrias de teste */}
      <mesh position={[0, 0, -3]} rotation={[0.2, 0.3, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh position={[2, 1, -3]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      {/* Plano de referência (chão) */}
      <mesh position={[0, -1, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </Canvas>
  );
}

