/**
 * Componente 3D da vista da janela (fundo)
 */

interface WindowViewProps {
  position?: [number, number, number];
}

export function WindowView({ position = [0, 2, -5] }: WindowViewProps) {
  return (
    <group position={position}>
      {/* Céu (plano de fundo) */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>

      {/* Edifícios (simplificados) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[-8 + i * 4, -2, -0.5]}
        >
          <boxGeometry args={[2, 4 + Math.random() * 3, 1]} />
          <meshStandardMaterial color={`#${Math.floor(Math.random() * 0x666666 + 0x333333).toString(16)}`} />
        </mesh>
      ))}

      {/* Janela (moldura) */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

