/**
 * Componente 3D de personagem (placeholder)
 */

import { useGameStore } from "../../store/gameStore";

export function Character() {
  const { currentCharacter } = useGameStore();

  // Se não houver personagem atual, não renderizar
  if (!currentCharacter) {
    return null;
  }

  // Por enquanto, usar geometria simples como placeholder
  return (
    <group position={[0, 0, -2]}>
      {/* Cabeça */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      {/* Corpo */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>

      {/* Braços */}
      <mesh position={[-0.4, 1.2, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      <mesh position={[0.4, 1.2, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      {/* Pernas */}
      <mesh position={[-0.15, 0.5, 0]}>
        <boxGeometry args={[0.2, 0.5, 0.2]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      <mesh position={[0.15, 0.5, 0]}>
        <boxGeometry args={[0.2, 0.5, 0.2]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
    </group>
  );
}

