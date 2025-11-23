/**
 * Componente que renderiza o ambiente do escritório usando imagens 2D
 * Usa as imagens geradas: fundo com prédios, janela e mesa
 */

import { Suspense } from "react";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useParallax } from "../../hooks/useParallax";
import { OBJECT_DISTANCES, OBJECT_POSITIONS_Y, OBJECT_SIZES, PARALLAX_CONFIG, CAMERA_CONFIG } from "./sceneConfig";

interface OfficeEnvironment2DProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
}

/**
 * Componente que renderiza o fundo com prédios (camada mais distante)
 */
function BackgroundLayer({ 
  position = [0, 0, OBJECT_DISTANCES.background],
  scale = 1
}: OfficeEnvironment2DProps) {
  const texture = useTexture("/models/environment/fundo_predios_completo.jpeg");
  const { camera, size } = useThree();
  
  // Parallax mais lento (camada distante) - valores conforme Visual.md
  const parallax = useParallax({ 
    depth: PARALLAX_CONFIG.depths.background, 
    intensity: PARALLAX_CONFIG.intensity 
  });
  
  const scaleArray: [number, number, number] = Array.isArray(scale) 
    ? scale as [number, number, number]
    : [scale, scale, scale];
  
  // Calcular dimensões baseadas no aspect ratio da textura
  const textureImage = (texture as any).image;
  const textureAspectRatio = textureImage && textureImage.width && textureImage.height 
    ? textureImage.width / textureImage.height 
    : 16/9; // Default 16:9
  
  // Calcular tamanho do plano baseado no FOV da câmera e distância
  const distance = Math.abs(position[2]);
  const fov = (camera as any).fov || CAMERA_CONFIG.fov;
  const fovRad = (fov * Math.PI) / 180;
  const viewportHeight = 2 * distance * Math.tan(fovRad / 2);
  const viewportWidth = viewportHeight * (size.width / size.height);
  
  // Usar o maior entre o tamanho calculado e o tamanho mínimo configurado
  const planeHeight = Math.max(viewportHeight, OBJECT_SIZES.backgroundHeight);
  const planeWidth = Math.max(viewportWidth, planeHeight * textureAspectRatio);
  
  return (
    <mesh 
      position={[position[0] + parallax.x, position[1] + parallax.y, position[2]]} 
      scale={scaleArray}
    >
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial map={texture} transparent={false} />
    </mesh>
  );
}

/**
 * Componente que renderiza a janela (camada intermediária)
 */
function WindowLayer({ 
  position = [0, OBJECT_POSITIONS_Y.window, OBJECT_DISTANCES.window],
  scale = 1
}: OfficeEnvironment2DProps) {
  const texture = useTexture("/models/environment/janela_moldura.png");
  const { camera, size } = useThree();
  
  // Parallax médio (camada intermediária)
  const parallax = useParallax({ 
    depth: PARALLAX_CONFIG.depths.window, 
    intensity: PARALLAX_CONFIG.intensity 
  });
  
  const scaleArray: [number, number, number] = Array.isArray(scale) 
    ? scale as [number, number, number]
    : [scale, scale, scale];
  
  // Calcular dimensões baseadas no aspect ratio da textura
  const textureImage = (texture as any).image;
  const textureAspectRatio = textureImage && textureImage.width && textureImage.height 
    ? textureImage.width / textureImage.height 
    : 16/9; // Default 16:9
  
  // Calcular tamanho do plano baseado no FOV da câmera e distância
  const distance = Math.abs(position[2]);
  const fov = (camera as any).fov || CAMERA_CONFIG.fov;
  const fovRad = (fov * Math.PI) / 180;
  const viewportHeight = 2 * distance * Math.tan(fovRad / 2);
  const viewportWidth = viewportHeight * (size.width / size.height);
  
  // Usar tamanho proporcional ao viewport, mas manter proporção mínima
  const baseHeight = viewportHeight * 0.8; // 80% da altura do viewport
  const planeHeight = Math.max(baseHeight, OBJECT_SIZES.windowHeight);
  const planeWidth = Math.max(viewportWidth * 0.8, planeHeight * textureAspectRatio);
  
  return (
    <mesh 
      position={[position[0] + parallax.x, position[1] + parallax.y, position[2]]} 
      scale={scaleArray}
    >
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial map={texture} transparent={true} />
    </mesh>
  );
}

/**
 * Componente que renderiza a mesa (camada próxima, primeira pessoa)
 */
function DeskLayer({ 
  position = [0, OBJECT_POSITIONS_Y.desk, OBJECT_DISTANCES.desk],
  scale = 1
}: OfficeEnvironment2DProps) {
  const texture = useTexture("/models/environment/mesa_escritorio_primeira_pessoa.png");
  const { camera, size } = useThree();
  
  // Mesa fixa (sem parallax ou parallax mínimo)
  const parallax = useParallax({ 
    depth: PARALLAX_CONFIG.depths.desk, 
    intensity: PARALLAX_CONFIG.intensity 
  });
  
  const scaleArray: [number, number, number] = Array.isArray(scale) 
    ? scale as [number, number, number]
    : [scale, scale, scale];
  
  // Calcular dimensões baseadas no aspect ratio da textura
  const textureImage = (texture as any).image;
  const textureAspectRatio = textureImage && textureImage.width && textureImage.height 
    ? textureImage.width / textureImage.height 
    : 16/9; // Default 16:9
  
  // Calcular tamanho do plano baseado no FOV da câmera e distância
  const distance = Math.abs(position[2]);
  const fov = (camera as any).fov || CAMERA_CONFIG.fov;
  const fovRad = (fov * Math.PI) / 180;
  const viewportHeight = 2 * distance * Math.tan(fovRad / 2);
  const viewportWidth = viewportHeight * (size.width / size.height);
  
  // Mesa ocupa parte inferior do viewport
  const baseHeight = viewportHeight * 0.3; // 30% da altura do viewport
  const planeHeight = Math.max(baseHeight, OBJECT_SIZES.deskHeight);
  const planeWidth = Math.max(viewportWidth * 0.5, planeHeight * textureAspectRatio);
  
  return (
    <mesh 
      position={[position[0] + parallax.x, position[1] + parallax.y, position[2]]} 
      scale={scaleArray}
    >
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial map={texture} transparent={true} />
    </mesh>
  );
}

/**
 * Componente principal que renderiza todas as camadas do ambiente
 */
export function OfficeEnvironment2D({
  position = [0, 0, 0],
  scale = 1
}: OfficeEnvironment2DProps) {
  return (
    <Suspense fallback={null}>
      <group position={position} scale={scale}>
        {/* Fundo com prédios (camada mais distante) - renderizar primeiro */}
        <BackgroundLayer position={[0, OBJECT_POSITIONS_Y.background, OBJECT_DISTANCES.background]} />
        
        {/* Janela e moldura (depois dos prédios, antes do personagem) */}
        <WindowLayer position={[0, OBJECT_POSITIONS_Y.window, OBJECT_DISTANCES.window]} />
        
        {/* Mesa (camada mais próxima, primeira pessoa) - renderizar por último */}
        <DeskLayer position={[0, OBJECT_POSITIONS_Y.desk, OBJECT_DISTANCES.desk]} />
      </group>
    </Suspense>
  );
}

