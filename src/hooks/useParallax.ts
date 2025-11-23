/**
 * Hook para parallax baseado no movimento do mouse (desktop) ou giroscópio (mobile)
 */

import { useState, useEffect, useRef } from "react";

interface ParallaxOptions {
  depth: number; // Multiplicador de profundidade (0.05 a 0.6)
  intensity?: number; // Intensidade do movimento (padrão: 0.01)
}

export function useParallax({ depth, intensity = 0.01 }: ParallaxOptions) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const gyroActiveRef = useRef(false);
  const lastGyroTimeRef = useRef(0);

  useEffect(() => {
    // Detectar se é dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    // Detectar se é desktop (mesmo com touch, se tiver mouse é desktop)
    const isDesktop = !isMobile && (window.matchMedia('(pointer: fine)').matches || window.matchMedia('(hover: hover)').matches);

    // Detectar suporte para DeviceOrientationEvent (giroscópio)
    const supportsGyro = typeof DeviceOrientationEvent !== 'undefined';
    const needsPermission = isIOS && typeof (DeviceOrientationEvent as any).requestPermission === 'function';

    // Handler para movimento do mouse (desktop)
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = (e.clientX - centerX) * depth * intensity;
      const deltaY = (e.clientY - centerY) * depth * intensity;
      
      setOffset({ x: deltaX, y: deltaY });
    };

    // Handler para giroscópio (mobile)
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      // Verificar se os valores são válidos
      if (e.gamma !== null && e.beta !== null && !isNaN(e.gamma) && !isNaN(e.beta)) {
        gyroActiveRef.current = true;
        lastGyroTimeRef.current = Date.now();
        
        // gamma: inclinação esquerda/direita (-90 a 90)
        // beta: inclinação frente/trás (-180 a 180)
        // Ajustar valores para criar efeito parallax suave
        const maxTilt = 25; // Máximo de inclinação esperado
        const normalizedGamma = Math.max(-1, Math.min(1, e.gamma / maxTilt));
        const normalizedBeta = Math.max(-1, Math.min(1, (e.beta - 90) / maxTilt));
        
        const deltaX = normalizedGamma * depth * intensity * 40; // Multiplicador para mobile
        const deltaY = normalizedBeta * depth * intensity * 40;
        
        setOffset({ x: deltaX, y: deltaY });
      }
    };

    // Handler para touch (fallback se giroscópio não funcionar)
    const handleTouchMove = (e: TouchEvent) => {
      // Usar touch apenas se giroscópio não estiver recebendo eventos recentemente
      const timeSinceLastGyro = Date.now() - lastGyroTimeRef.current;
      const shouldUseTouch = !gyroActiveRef.current || timeSinceLastGyro > 1000;
      
      if (shouldUseTouch && e.touches.length > 0) {
        const touch = e.touches[0];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const deltaX = (touch.clientX - centerX) * depth * intensity * 0.3;
        const deltaY = (touch.clientY - centerY) * depth * intensity * 0.3;
        
        setOffset({ x: deltaX, y: deltaY });
      }
    };

    // Função para ativar giroscópio
    let gyroListenerAdded = false;
    const orientationHandlers: Array<(e: DeviceOrientationEvent) => void> = [];
    
    const activateGyro = () => {
      if (gyroListenerAdded || !supportsGyro) return;
      
      try {
        const orientationHandler = (e: DeviceOrientationEvent) => {
          handleDeviceOrientation(e);
        };
        
        orientationHandlers.push(orientationHandler);
        
        // Tentar deviceorientation (padrão)
        window.addEventListener('deviceorientation', orientationHandler, { passive: true });
        
        // No Android, também tentar deviceorientationabsolute (mais preciso, se disponível)
        if (isAndroid) {
          try {
            // Verificar se está disponível antes de adicionar
            if ('ondeviceorientationabsolute' in window || 'DeviceOrientationAbsoluteEvent' in window) {
              window.addEventListener('deviceorientationabsolute' as any, orientationHandler, { passive: true });
            }
          } catch (e) {
            // deviceorientationabsolute pode não estar disponível
          }
        }
        
        gyroListenerAdded = true;
        
        // Debug
        if (process.env.NODE_ENV === 'development') {
          console.log('Giroscópio ativado. Incline o dispositivo para testar.');
        }
      } catch (error) {
        console.warn('Erro ao ativar giroscópio:', error);
      }
    };

    // Solicitar permissão para giroscópio (iOS 13+)
    const requestGyroPermission = async () => {
      if (needsPermission) {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            activateGyro();
          }
        } catch (error) {
          console.warn('Erro ao solicitar permissão do giroscópio:', error);
        }
      } else if (supportsGyro) {
        // Android: ativar diretamente
        activateGyro();
      }
    };

    // Configurar listeners baseado no tipo de dispositivo
    // Priorizar desktop se detectado
    if (isDesktop || (!isMobile && !isTouchDevice)) {
      // Desktop: usar mouse
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    } else if (isMobile || isTouchDevice) {
      // Mobile: tentar giroscópio primeiro
      // No Android, tentar ativar imediatamente e também após primeira interação
      if (isAndroid && supportsGyro) {
        // Tentar ativar imediatamente
        activateGyro();
        
        // Também tentar após primeira interação do usuário (alguns navegadores requerem isso)
        const handleFirstInteraction = () => {
          activateGyro();
          document.removeEventListener('touchstart', handleFirstInteraction);
          document.removeEventListener('click', handleFirstInteraction);
        };
        
        document.addEventListener('touchstart', handleFirstInteraction, { once: true });
        document.addEventListener('click', handleFirstInteraction, { once: true });
      } else {
        // iOS e outros: solicitar permissão
        requestGyroPermission();
      }
      
      // Fallback: usar touchmove
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      
      return () => {
        // Remover todos os handlers de orientação
        orientationHandlers.forEach(handler => {
          window.removeEventListener('deviceorientation', handler);
          if (isAndroid) {
            try {
              window.removeEventListener('deviceorientationabsolute' as any, handler);
            } catch (e) {
              // Ignorar erro se não estiver disponível
            }
          }
        });
        window.removeEventListener('touchmove', handleTouchMove);
      };
    } else {
      // Fallback: usar mouse mesmo que não detectado como desktop
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [depth, intensity]);

  return offset;
}
