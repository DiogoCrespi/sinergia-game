/**
 * Tela de carregamento entre personagens
 */

import { useEffect, useState, useRef } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
  progress?: number;
}

export function LoadingScreen({ isLoading, progress = 0 }: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animar progresso suavemente e gerenciar visibilidade
  useEffect(() => {
    if (isLoading) {
      // Fade in quando começar a carregar
      setIsVisible(true);
      setDisplayProgress(0);

      const interval = setInterval(() => {
        setDisplayProgress((prev) => {
          // Aumentar progresso gradualmente até o valor real
          if (prev < progress) {
            return Math.min(prev + 2, progress);
          }
          return prev;
        });
      }, 50);

      return () => clearInterval(interval);
    } else if (isVisible) {
      // Quando terminar de carregar, fazer fade out
      // O delay já está no gameStore (800ms), então fazer fade out imediatamente
      setIsVisible(false);
      const resetTimer = setTimeout(() => {
        setDisplayProgress(0);
      }, 500); // Aguardar fade out completar
      
      return () => clearTimeout(resetTimer);
    }
  }, [isLoading, progress, isVisible]);

  // Renderizar ASCII no Canvas para evitar tradução
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const asciiText = `          _____           _______                   _____                    _____                    _____                    _____                    _____          
         /\\    \\         /::\\    \\                 /\\    \\                  /\\    \\                  /\\    \\                  /\\    \\                  /\\    \\         
        /::\\____\\       /::::\\    \\               /::\\    \\                /::\\    \\                /::\\    \\                /::\\____\\                /::\\    \\        
       /:::/    /      /::::::\\    \\             /::::\\    \\              /::::\\    \\               \\:::\\    \\              /::::|   |               /::::\\    \\       
      /:::/    /      /::::::::\\    \\           /::::::\\    \\            /::::::\\    \\               \\:::\\    \\            /:::::|   |              /::::::\\    \\      
     /:::/    /      /:::/~~\\:::\\    \\         /:::/\\:::\\    \\          /:::/\\:::\\    \\               \\:::\\    \\          /::::::|   |             /:::/\\:::\\    \\     
    /:::/    /      /:::/    \\:::\\    \\       /:::/__\\:::\\    \\        /:::/  \\:::\\    \\               \\:::\\    \\        /:::/|::|   |            /:::/  \\:::\\    \\    
   /:::/    /      /:::/    / \\:::\\    \\     /::::\\   \\:::\\    \\      /:::/    \\:::\\    \\              /::::\\    \\      /:::/ |::|   |           /:::/    \\:::\\    \\   
  /:::/    /      /:::/____/   \\:::\\____\\   /::::::\\   \\:::\\    \\    /:::/    / \\:::\\    \\    ____    /::::::\\    \\    /:::/  |::|   | _____    /:::/    / \\:::\\    \\  
 /:::/    /      |:::|    |     |:::|    | /:::/\\:::\\   \\:::\\    \\  /:::/    /   \\:::\\ ___\\  /\\   \\  /:::/\\:::\\    \\  /:::/   |::|   |/\\    \\  /:::/    /   \\:::\\ ___\\ 
/:::/____/       |:::|____|     |:::|    |/:::/  \\:::\\   \\:::\\____\\/:::/____/     \\:::|    |/::\\   \\/:::/  \\:::\\____\\/:: /    |::|   /::\\____\\/:::/____/  ___\\:::|    |
\\:::\\    \\        \\:::\\    \\   /:::/    / \\::/    \\:::\\  /:::/    /\\:::\\    \\     /:::|____|\\:::\\  /:::/    \\::/    /\\::/    /|::|  /:::/    /\\:::\\    \\ /\\  /:::|____|
 \\:::\\    \\        \\:::\\    \\ /:::/    /   \\/____/ \\:::\\/:::/    /  \\:::\\    \\   /:::/    /  \\:::\\/:::/    / \\/____/  \\/____/ |::| /:::/    /  \\:::\\    /::\\ \\::/    / 
  \\:::\\    \\        \\:::\\    /:::/    /             \\::::::/    /    \\:::\\    \\ /:::/    /    \\::::::/    /                   |::|/:::/    /    \\:::\\   \\:::\\ \\/____/  
   \\:::\\    \\        \\:::\\__/:::/    /               \\::::/    /      \\:::\\    /:::/    /      \\::::/____/                    |::::::/    /      \\:::\\   \\:::\\____\\    
    \\:::\\    \\        \\::::::::/    /                /:::/    /        \\:::\\  /:::/    /        \\:::\\    \\                    |:::::/    /        \\:::\\  /:::/    /    
     \\:::\\    \\        \\::::::/    /                /:::/    /          \\:::\\/:::/    /          \\:::\\    \\                   |::::/    /          \\:::\\/:::/    /     
      \\:::\\    \\        \\::::/    /                /:::/    /            \\::::::/    /            \\:::\\    \\                  /:::/    /            \\::::::/    /      
       \\:::\\____\\        \\::/____/                /:::/    /              \\::::/    /              \\:::\\____\\                /:::/    /              \\::::/    /       
        \\::/    /                                 \\::/    /                \\::/____/                \\::/    /                \\::/    /                \\::/____/        
         \\/____/                                   \\/____/                                           \\/____/                  \\/____/                                  `;

    const renderCanvas = () => {
      if (!canvas) return;

      const lines = asciiText.split('\n').filter(line => line.trim().length > 0);
      
      // Calcular largura disponível (considerando padding do container)
      const containerMaxWidth = Math.min(800, window.innerWidth * 0.95);
      const padding = window.innerWidth < 640 ? 20 : 40;
      const availableWidth = containerMaxWidth - padding;
      
      // Encontrar a linha mais longa
      const maxLineLength = Math.max(...lines.map(line => line.length));
      
      // Calcular tamanho de fonte baseado na largura disponível e comprimento da linha
      // Usar clamp para garantir tamanhos mínimos e máximos responsivos
      const baseFontSize = availableWidth / maxLineLength;
      const fontSize = Math.max(
        window.innerWidth < 640 ? 1.5 : 2, 
        Math.min(window.innerWidth < 640 ? 4 : 6, baseFontSize * 0.9)
      );
      const lineHeight = fontSize * 1.3;
      
      // Calcular dimensões do canvas
      const canvasWidth = availableWidth;
      const canvasHeight = lines.length * lineHeight;
      
      // Ajustar DPI para alta resolução
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Escalar contexto para alta resolução
      ctx.scale(dpr, dpr);
      
      // Limpar canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      // Configurar estilo
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = '#60a5fa';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      
      // Aplicar sombras
      ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Desenhar texto
      lines.forEach((line, index) => {
        ctx.fillText(line, 0, index * lineHeight);
      });
      
      // Aplicar segunda sombra (laranja) - redesenhar com nova sombra
      ctx.shadowColor = 'rgba(251, 155, 0, 0.5)';
      ctx.shadowBlur = 20;
      lines.forEach((line, index) => {
        ctx.fillText(line, 0, index * lineHeight);
      });
      
      // Ajustar estilo do canvas para exibição e centralização
      // Usar largura fixa calculada e centralizar com margin auto, com pequeno offset para direita
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      canvas.style.display = 'block';
      canvas.style.marginLeft = 'auto';
      canvas.style.marginRight = 'auto';
      canvas.style.marginTop = '0';
      canvas.style.marginBottom = 'clamp(0.5rem, 2vw, 2rem)';
      // Adicionar pequeno offset para direita
      canvas.style.transform = 'translateX(70px)';
    };

    // Renderizar inicialmente
    renderCanvas();

    // Adicionar listener para redimensionamento
    const handleResize = () => {
      renderCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible]);

  if (!isLoading && !isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "url(/loading_screen.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {/* Overlay escuro para melhorar legibilidade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      />

      {/* Conteúdo centralizado */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "min(800px, 95vw)",
          padding: "clamp(1rem, 3vw, 2rem)",
          textAlign: "center",
        }}
      >
        {/* Texto ASCII - SINERGIA renderizado como Canvas (não traduzível) */}
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            margin: '0 auto',
            marginBottom: 'clamp(0.5rem, 2vw, 2rem)',
            maxWidth: '100%',
            imageRendering: 'crisp-edges',
          }}
          translate="no"
          data-translate="no"
        />

        {/* Título */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          style={{
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.8)",
            letterSpacing: "0.05em",
            marginBottom: "clamp(1rem, 4vw, 2rem)",
          }}
        >
          Carregando...
        </h2>

        {/* Barra de progresso */}
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "1rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              width: `${displayProgress}%`,
              height: "100%",
              background: "linear-gradient(90deg,rgb(246, 156, 59), #8b5cf6)",
              borderRadius: "4px",
              transition: "width 0.3s ease-out",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
          />
        </div>

        {/* Texto de progresso */}
        <p
          className="text-sm sm:text-base md:text-lg text-gray-200"
          style={{
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          {Math.round(displayProgress)}%
        </p>
      </div>
    </div>
  );
}

