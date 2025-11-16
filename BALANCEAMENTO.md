# 📊 Análise de Balanceamento - Sinergia

## Objetivo
Garantir que ambos os finais (bom e ruim) sejam alcançáveis através de escolhas consistentes.

## Thresholds de Finais
- **Final Bom**: Amability > 70 && Efficiency < 30
- **Final Ruim**: Amability < 30 && Efficiency > 70
- **Final Neutro**: Outros casos

## Análise de Pontuação por Personagem

### Carlos
**Caminho Manipulador:**
- Opção 1: Amability -10, Efficiency +15
- Total: Amability -10, Efficiency +15

**Caminho Genuíno:**
- Opção 1: Amability +15, Efficiency -10
- Opção 2 (ajudar): Amability +20, Efficiency -20
- Total: Amability +35, Efficiency -30

### Sara
**Caminho Manipulador:**
- Opção 1: Amability -8, Efficiency +12
- Opção 2 (rejeitar): Amability -15, Efficiency +20
- Total: Amability -23, Efficiency +32

**Caminho Genuíno:**
- Opção 1: Amability +12, Efficiency -8
- Opção 2 (aprovar): Amability +18, Efficiency -15
- Total: Amability +30, Efficiency -23

### Ana
**Caminho Manipulador:**
- Opção 1: Amability -12, Efficiency +18
- Opção 2 (demitir): Amability -18, Efficiency +25
- Total: Amability -30, Efficiency +43

**Caminho Genuíno:**
- Opção 1: Amability +14, Efficiency -12
- Opção 2 (treinar): Amability +20, Efficiency -20
- Total: Amability +34, Efficiency -32

### Marcos
**Caminho Manipulador:**
- Opção 1: Amability -10, Efficiency +14
- Opção 2 (demitir): Amability -16, Efficiency +22
- Total: Amability -26, Efficiency +36

**Caminho Genuíno:**
- Opção 1: Amability +13, Efficiency -11
- Opção 2 (mentor): Amability +17, Efficiency -16
- Total: Amability +30, Efficiency -27

## Cálculo de Totais

### Caminho Totalmente Manipulador (4 personagens)
- Amability: 50 (inicial) - 10 - 23 - 30 - 26 = **-39** (clamp para 0)
- Efficiency: 50 (inicial) + 15 + 32 + 43 + 36 = **176** (clamp para 100)
- **Resultado**: Amability ~0, Efficiency ~100 → **Final Ruim** ✅

### Caminho Totalmente Genuíno (4 personagens)
- Amability: 50 (inicial) + 35 + 30 + 34 + 30 = **179** (clamp para 100)
- Efficiency: 50 (inicial) - 30 - 23 - 32 - 27 = **-62** (clamp para 0)
- **Resultado**: Amability ~100, Efficiency ~0 → **Final Bom** ✅

## Conclusão
Os valores estão balanceados. Ambos os finais são alcançáveis:
- ✅ Caminho totalmente manipulador leva ao Final Ruim
- ✅ Caminho totalmente genuíno leva ao Final Bom
- ✅ Caminhos mistos levam ao Final Neutro

## Notas
- Valores podem precisar de ajustes finos após testes reais
- Thresholds podem ser ajustados se necessário (atualmente 30/70)
- Cada personagem tem impacto similar (~30-40 pontos de diferença)


