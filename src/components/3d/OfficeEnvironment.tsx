/**
 * Componente que carrega o modelo 3D do escritório
 */

import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";

interface OfficeEnvironmentProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
}

/**
 * Componente interno que carrega o modelo GLTF do escritório
 */
function OfficeModel({ 
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0]
}: OfficeEnvironmentProps) {
  const modelPath = "/models/environment/minimalistic_modern_office.glb";
  
  // Carregar modelo GLTF
  const gltf = useGLTF(modelPath, false);

  // Verificar se o modelo foi carregado
  if (!gltf || !gltf.scene) {
    console.warn(`Modelo de escritório não encontrado: ${modelPath}`);
    return null;
  }

  // Clonar cena para evitar problemas de reutilização
  const scene = gltf.scene.clone();
  
  // Converter scale para array se for número único
  const scaleArray: [number, number, number] = Array.isArray(scale) 
    ? scale as [number, number, number]
    : [scale, scale, scale];

  return (
    <primitive 
      object={scene} 
      position={position}
      scale={scaleArray}
      rotation={rotation}
    />
  );
}

/**
 * Componente principal com Suspense para carregamento assíncrono
 */
export function OfficeEnvironment({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0]
}: OfficeEnvironmentProps) {
  return (
    <Suspense fallback={null}>
      <OfficeModel 
        position={position}
        scale={scale}
        rotation={rotation}
      />
    </Suspense>
  );
}
