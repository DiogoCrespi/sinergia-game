/**
 * Componente 3D da mesa do escritório
 */

interface DeskProps {
  position?: [number, number, number];
}

export function Desk({ position = [0, 0, 0] }: DeskProps) {
  return (
    <group position={position}>
      {/* Tampo da mesa */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[2, 0.05, 1]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>

      {/* Perna esquerda frontal */}
      <mesh position={[-0.9, 0.2, 0.4]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Perna direita frontal */}
      <mesh position={[0.9, 0.2, 0.4]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Perna esquerda traseira */}
      <mesh position={[-0.9, 0.2, -0.4]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Perna direita traseira */}
      <mesh position={[0.9, 0.2, -0.4]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  );
}





