/**
 * Tela de carregamento entre personagens
 */

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
  progress?: number;
}

export function LoadingScreen({ isLoading, progress = 0 }: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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
          maxWidth: "800px",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        {/* Texto ASCII - SINERGIA */}
        <pre
          style={{
            fontFamily: "monospace",
            fontSize: "0.3rem",
            lineHeight: "0.45rem",
            color: "#60a5fa",
            textShadow: "0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(251, 155, 0, 0.5)",
            marginBottom: "2rem",
            whiteSpace: "pre",
            overflow: "hidden",
            letterSpacing: "0.05em",
          }}
        >
{`          _____           _______                   _____                    _____                    _____                    _____                    _____          
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
         \\/____/                                   \\/____/                                           \\/____/                  \\/____/                                  `}
        </pre>

        {/* Título */}
        <h2
          className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          style={{
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.8)",
            letterSpacing: "0.05em",
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
          className="text-lg text-gray-200"
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

