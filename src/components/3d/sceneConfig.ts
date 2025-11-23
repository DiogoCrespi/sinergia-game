/**
 * Configurações de distâncias e posições da cena
 * Ajuste estes valores para controlar a posição da câmera e dos objetos
 */

// ============================================
// CONFIGURAÇÃO DA CÂMERA
// ============================================

export const CAMERA_CONFIG = {
  // Posição da câmera [X, Y, Z]
  // Z = 0 significa que a câmera está na origem
  position: [0, 0, 0] as [number, number, number],
  
  // Campo de visão (Field of View)
  // Valores menores = objetos parecem mais distantes
  // Valores maiores = objetos parecem mais próximos
  // Padrão: 70 graus
  fov: 70,
  
  // Rotação da câmera [X, Y, Z] em radianos
  // [0, 0, 0] = olhando para frente
  rotation: [0, 0, 0] as [number, number, number],
};

// ============================================
// CONFIGURAÇÃO DOS OBJETOS - DISTÂNCIAS Z
// ============================================

export const OBJECT_DISTANCES = {
  // Mesa (camada mais próxima, primeira pessoa)
  // Valores menos negativos = mais próximo, mais negativos = mais distante
  desk: -2.5,
  
  // Personagem (depois da mesa)
  character: -5,
  
  // Janela e moldura (depois do personagem)
  window: -10,
  
  // Fundo com prédios (camada mais distante)
  // Valores mais negativos = mais distante
  background: -30,
};

// ============================================
// CONFIGURAÇÃO DOS OBJETOS - POSIÇÕES Y
// ============================================

export const OBJECT_POSITIONS_Y = {
  // Fundo e janela centralizados
  background: 0,
  window: 0,
  
  // Personagem centralizado verticalmente
  character: 0,
  
  // Mesa na parte inferior (valores negativos = mais baixo)
  // Ajustado para aparecer na câmera (primeira pessoa)
  desk: -1.1,
};

// ============================================
// CONFIGURAÇÃO DOS OBJETOS - TAMANHOS
// ============================================

export const OBJECT_SIZES = {
  // Altura do plano do fundo
  // Valores maiores = objeto ocupa mais espaço na tela
  backgroundHeight: 30,
  
  // Altura do plano da janela
  windowHeight: 20,
  
  // Altura do plano da mesa
  deskHeight: 10,
  
  // Altura do sprite do personagem
  characterHeight: 4,
};

// ============================================
// CONFIGURAÇÃO DE PARALLAX
// ============================================

export const PARALLAX_CONFIG = {
  // Intensidade geral do parallax
  // Valores maiores = movimento mais perceptível
  intensity: 0.01,
  
  // Profundidade de cada camada (multiplicador)
  // Valores maiores = movimento mais rápido
  depths: {
    background: 0.01,  // Mais lento (distante)
    window: 0.03,      // Médio (intermediário)
    character: 0.005,  // Muito sutil (próximo)
    desk: 0.001,        // Parallax sutil para mesa (próxima)
  },
};

// ============================================
// COMO USAR
// ============================================

/*
EXEMPLO 1: Afastar o personagem
  OBJECT_DISTANCES.character = -8;  // Era -5, agora -8 (mais distante)

EXEMPLO 2: Aproximar a janela
  OBJECT_DISTANCES.window = -8;  // Era -12, agora -8 (mais próximo)

EXEMPLO 3: Aumentar campo de visão (tudo parece mais próximo)
  CAMERA_CONFIG.fov = 80;  // Era 70, agora 80

EXEMPLO 4: Aumentar tamanho do personagem
  OBJECT_SIZES.characterHeight = 5;  // Era 4, agora 5

EXEMPLO 5: Mover mesa para cima
  OBJECT_POSITIONS_Y.desk = -2;  // Era -3, agora -2 (mais alto)
*/

