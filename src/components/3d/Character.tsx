/**
 * Componente 2D de personagem
 * Renderiza personagens como imagens PNG em vez de modelos 3D
 */

import { Suspense } from "react";
import { useTexture } from "@react-three/drei";
import { useGameStore } from "../../store/gameStore";
import { useParallax } from "../../hooks/useParallax";
import { OBJECT_DISTANCES, OBJECT_SIZES, PARALLAX_CONFIG } from "./sceneConfig";

interface CharacterProps {
  characterId?: string;
  position?: [number, number, number];
  scale?: number | [number, number, number];
}

// Lista de todos os personagens disponíveis (com imagens PNG)
const ALL_CHARACTERS = [
  "carlos", "sara", "ana", "marcos", 
  "rafael", "juliana", "roberto", "patricia", "lucas", "fernanda"
];

// Personagens especiais que não devem renderizar
const SPECIAL_CHARACTERS = ["sistema", "consciência", "consciencia"];

/**
 * Verifica se um personagem é válido para renderização
 */
function isValidCharacter(characterId: string | null | undefined): boolean {
  if (!characterId) return false;
  const normalized = characterId.toLowerCase();
  return ALL_CHARACTERS.includes(normalized) && !SPECIAL_CHARACTERS.includes(normalized);
}

/**
 * Componente interno que renderiza personagem como sprite 2D
 */
function CharacterSprite({ 
  characterId, 
  position = [0, 0, OBJECT_DISTANCES.character],
  scale = 1
}: CharacterProps) {
  const normalizedCharacterId = characterId?.toLowerCase() || "";
  const imagePath = `/models/characters/${normalizedCharacterId}.png`;
  
  // Carregar textura da imagem
  const texture = useTexture(imagePath);
  
  // Parallax muito sutil para personagem (camada próxima) - valores conforme Visual.md
  const parallax = useParallax({ 
    depth: PARALLAX_CONFIG.depths.character, 
    intensity: PARALLAX_CONFIG.intensity 
  });
  
  // Converter scale para array se for número único
  const scaleArray: [number, number, number] = Array.isArray(scale) 
    ? scale as [number, number, number]
    : [scale, scale, scale];
  
  // Calcular dimensões do sprite baseado na textura
  // useTexture retorna uma textura Three.js, acessar dimensões via image se disponível
  const textureImage = (texture as any).image;
  const aspectRatio = textureImage && textureImage.width && textureImage.height 
    ? textureImage.width / textureImage.height 
    : 0.75; // Default para personagem em pé
  
  // Ajustar tamanho do sprite para proporção adequada
  const spriteHeight = OBJECT_SIZES.characterHeight;
  const spriteWidth = spriteHeight * aspectRatio;
  
  return (
    <sprite 
      position={[position[0] + parallax.x, position[1] + parallax.y, position[2]]} 
      scale={[spriteWidth * scaleArray[0], spriteHeight * scaleArray[1], 1]}
    >
      <spriteMaterial map={texture} transparent={true} />
    </sprite>
  );
}

/**
 * Componente principal de personagem
 */
export function Character({ 
  characterId: propCharacterId,
  position: propPosition,
  scale: propScale
}: CharacterProps = {}) {
  const { currentCharacter } = useGameStore();
  
  // Usar prop ou store, normalizando para minúsculas
  const characterId = (propCharacterId || currentCharacter)?.toLowerCase();
  
  // Posição ajustada para melhor visibilidade (camada próxima, mas não muito perto)
  const position = propPosition || [0, 0, OBJECT_DISTANCES.character];
  const scale = propScale !== undefined ? propScale : 1;

  // Se não houver personagem, não renderizar (DEPOIS de todos os hooks)
  if (!characterId) {
    return null;
  }

  // Se o personagem é especial ou não é válido, não renderizar
  if (!isValidCharacter(characterId)) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <CharacterSprite 
        characterId={characterId}
        position={position}
        scale={scale}
      />
    </Suspense>
  );
}

