/**
 * Componente 3D de personagem
 * Suporta modelos GLTF/GLB e fallback para placeholder
 */

import { Suspense, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGameStore } from "../../store/gameStore";
import type { Emotion } from "../../types/character";
import { getCharacterConfig } from "./characterConfig";
import * as THREE from "three";

interface CharacterProps {
  characterId?: string;
  emotion?: Emotion;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
}

// Cache de modelos carregados
const modelCache = new Map<string, any>();

// Lista de personagens válidos que têm modelos 3D disponíveis
const VALID_CHARACTERS = ["carlos", "sara", "ana", "marcos"];

// Personagens especiais que não devem renderizar modelo 3D
const SPECIAL_CHARACTERS = ["sistema", "consciência", "consciencia"];

/**
 * Verifica se um personagem é válido para renderização 3D
 */
function isValidCharacter(characterId: string | null | undefined): boolean {
  if (!characterId) return false;
  const normalized = characterId.toLowerCase();
  return VALID_CHARACTERS.includes(normalized) && !SPECIAL_CHARACTERS.includes(normalized);
}

/**
 * Componente de placeholder (fallback quando modelo não carrega)
 */
function CharacterPlaceholder({ position = [0, 0, -2] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
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

/**
 * Componente interno que carrega o modelo GLTF
 * IMPORTANTE: Este componente só deve ser renderizado com personagens válidos
 * (verificado no componente Character antes de renderizar)
 */
function CharacterModel({ 
  characterId, 
  emotion = "neutral",
  position = [0, 0, -2],
  scale = 1,
  rotation = [0, 0, 0]
}: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Tentar carregar modelo GLTF
  // useGLTF precisa ser chamado sempre no topo (regra dos hooks)
  // Normalizar characterId para minúsculas para garantir consistência
  // NOTA: Este componente só deve ser renderizado com personagens válidos
  // (verificado no componente Character antes de renderizar)
  const normalizedCharacterId = characterId?.toLowerCase() || "";
  const modelPath = `/models/characters/${normalizedCharacterId}.glb`;
  
  // Debug: log do caminho do modelo
  useEffect(() => {
    console.log(`Tentando carregar modelo: ${modelPath}`);
  }, [modelPath]);
  
  // useGLTF retorna um objeto com scene e animations
  // IMPORTANTE: useGLTF é um hook e deve ser chamado sempre no topo
  // Segundo parâmetro false = usar cache (recomendado)
  // Nota: Como já verificamos que o personagem é válido antes de renderizar,
  // o useGLTF não deve tentar carregar arquivos inexistentes
  const gltf = useGLTF(modelPath, false);

  // Verificar se o modelo foi carregado corretamente
  if (!gltf || !gltf.scene) {
    // Modelo não encontrado, usar placeholder
    console.warn(`Modelo não encontrado ou inválido: ${modelPath}. Verifique se o arquivo existe em public/models/characters/`);
    return <CharacterPlaceholder position={position} />;
  }

  // Clonar cena para evitar problemas de reutilização
  const scene = gltf.scene.clone();
  const animations = gltf.animations || [];
  
  // Armazenar no cache se ainda não estiver
  if (!modelCache.has(modelPath)) {
    modelCache.set(modelPath, { scene: gltf.scene, animations: gltf.animations });
  }

  // Sistema de animações (se disponível)
  const { actions, names } = useAnimations(animations, groupRef);
  
  // Mapear emoção para animação
  const getAnimationForEmotion = (emotion: Emotion): string | null => {
    const emotionMap: Record<Emotion, string> = {
      neutral: "idle",
      worried: "worried",
      relieved: "relieved",
      angry: "angry",
      happy: "happy",
      sad: "sad",
    };
    
    const animationName = emotionMap[emotion];
    return names.includes(animationName) ? animationName : "idle";
  };

  // Aplicar animação baseada em emoção
  useEffect(() => {
    if (!actions || animations.length === 0) return;
    
    const animationName = getAnimationForEmotion(emotion);
    if (animationName && actions[animationName]) {
      // Fade out animação atual
      Object.values(actions).forEach((action) => {
        if (action?.isRunning()) {
          action.fadeOut(0.3);
        }
      });
      
      // Fade in nova animação
      const newAction = actions[animationName];
      if (newAction) {
        newAction.reset().fadeIn(0.3).play();
      }
    }
    
    return () => {
      Object.values(actions).forEach((action) => {
        action?.fadeOut(0.3);
      });
    };
  }, [emotion, actions, animations.length, names]);

  // Renderizar modelo carregado
  // Converter scale para array se for número único
  const scaleArray: [number, number, number] = Array.isArray(scale) 
    ? scale as [number, number, number]
    : [scale, scale, scale];
  
  return (
    <group 
      ref={groupRef} 
      position={position}
      scale={scaleArray}
      rotation={rotation}
    >
      <primitive object={scene} />
    </group>
  );
}

/**
 * Componente principal de personagem
 */
export function Character({ 
  characterId: propCharacterId,
  emotion: propEmotion,
  position: propPosition,
  scale: propScale,
  rotation: propRotation
}: CharacterProps = {}) {
  const { currentCharacter } = useGameStore();
  
  // Usar prop ou store, normalizando para minúsculas
  const characterId = (propCharacterId || currentCharacter)?.toLowerCase();
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(propEmotion || "neutral");
  
  // Obter configuração do personagem (ou usar props se fornecidas)
  const config = characterId ? getCharacterConfig(characterId) : null;
  const position = propPosition || config?.position || [0, 0, -2];
  const scale = propScale !== undefined ? propScale : (config?.scale || 1);
  const rotation = propRotation || config?.rotation || [0, 0, 0];

  // Se não houver personagem, não renderizar
  if (!characterId) {
    return null;
  }

  // Se o personagem é especial (como "Sistema") ou não é válido, não renderizar modelo 3D
  if (!isValidCharacter(characterId)) {
    return null;
  }

  // Atualizar emoção quando prop mudar
  useEffect(() => {
    if (propEmotion) {
      setCurrentEmotion(propEmotion);
    }
  }, [propEmotion]);

  return (
    <Suspense fallback={<CharacterPlaceholder position={position} />}>
      <CharacterModel 
        characterId={characterId}
        emotion={currentEmotion}
        position={position}
        scale={scale}
        rotation={rotation}
      />
    </Suspense>
  );
}

