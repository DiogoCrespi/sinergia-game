# 🐛 Bugs Conhecidos e Issues

## Bugs Críticos
Nenhum bug crítico conhecido no momento.

## Bugs Menores

### 1. Comentários da Consciência após escolhas
**Status:** ⚠️ Conhecido  
**Descrição:** Os comentários `after_manipulative` e `after_genuine` não estão sendo exibidos após as escolhas.  
**Prioridade:** Baixa  
**Workaround:** Nenhum necessário - funcionalidade não crítica

### 2. Função `calculateFinal` duplicada
**Status:** ✅ Resolvido  
**Descrição:** Existe `calculateFinal` em `AmabilityScore.ts` e `calculateEnding` em `EndingCalculator.ts`.  
**Solução:** Usar apenas `calculateEnding` do `EndingCalculator`.

## Melhorias Futuras

### 1. Mensagens de transição entre personagens
**Status:** 📋 Planejado  
**Descrição:** Adicionar mensagens de transição quando mudando de personagem.  
**Prioridade:** Baixa

### 2. Animações de transição
**Status:** 📋 Planejado  
**Descrição:** Adicionar animações suaves entre diálogos.  
**Prioridade:** Baixa

### 3. Feedback visual de pontuação
**Status:** 📋 Planejado  
**Descrição:** Mostrar mudanças de pontuação em tempo real durante o jogo.  
**Prioridade:** Média

### 4. Histórico de escolhas
**Status:** 📋 Planejado  
**Descrição:** Permitir revisar escolhas anteriores durante o jogo.  
**Prioridade:** Baixa

## Notas de Teste

### Testes Realizados
- ✅ Save/Load funciona corretamente
- ✅ Múltiplos slots funcionam
- ✅ Condições funcionam corretamente
- ✅ Variações de diálogo aparecem
- ✅ Sistema de finais funciona

### Testes Pendentes
- ⬜ Teste completo de jogabilidade (múltiplas jogatinas)
- ⬜ Teste de todos os caminhos possíveis
- ⬜ Teste de edge cases (localStorage cheio, dados corrompidos)
- ⬜ Teste de performance com múltiplas árvores carregadas

