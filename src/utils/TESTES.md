# 🧪 Testes do Sistema de Condições

Este documento descreve como executar os testes do sistema de condições.

## 📋 Suites de Testes Implementadas

### 1. Condições de Pontuação
- ✅ `amabilityScore` - Testa todos os operadores (>, <, ==, >=, <=)
- ✅ `empathyScore` - Testa comparações numéricas
- ✅ `respectScore` - Testa valores limites
- ✅ `trustScore` - Testa igualdade
- ✅ `efficiencyScore` - Testa maior ou igual

### 2. Condições de Progresso
- ✅ `playthroughCount` - Testa contagem de jogatinas
- ✅ Valores zero, positivos e limites

### 3. Condições de Histórico
- ✅ `choicesMade` - Testa tamanho do histórico de escolhas
- ✅ Arrays vazios e com múltiplos elementos

### 4. Condições de Personagens
- ✅ `charactersMet` - Testa número de personagens encontrados
- ✅ Arrays vazios e com múltiplos personagens

### 5. Combinações de Condições
- ✅ Múltiplas condições com AND lógico
- ✅ Condições complexas (playthroughCount + choicesMade)
- ✅ Casos de falha quando uma condição não é atendida

### 6. Edge Cases
- ✅ Condições vazias (array vazio)
- ✅ undefined/null conditions
- ✅ Valores limites (0 e 100)
- ✅ Valores exatos nos limites

### 7. ConditionRequirement
- ✅ Ranges (min/max) para playthroughCount
- ✅ Ranges para amabilityScore
- ✅ Verificação de personagens encontrados
- ✅ Verificação de escolhas feitas
- ✅ undefined requirement

## 🚀 Como Executar os Testes

### Opção 1: Via Console do Navegador

1. Abra o jogo no navegador (desenvolvimento: `npm run dev`)
2. Abra o Console do Desenvolvedor (F12)
3. Execute:

```javascript
import { runAllTests } from './utils/conditions.test';
runAllTests();
```

### Opção 2: Via Componente React

1. Adicione uma rota ou botão temporário no App.tsx:

```tsx
import { ConditionsTestRunner } from "./components/test/ConditionsTestRunner";

// No App.tsx, adicione uma condição para mostrar o test runner
if (currentState === "test") {
  return <ConditionsTestRunner />;
}
```

2. Ou importe diretamente no componente que deseja testar

### Opção 3: Via Node.js (se configurado)

```bash
# Se tiver ts-node instalado
npx ts-node src/utils/conditions.test.ts
```

## 📊 Resultados Esperados

Todos os testes devem passar. O output mostra:
- ✅ Para testes que passaram
- ❌ Para testes que falharam
- 📊 Resumo final com contagem de suites passando/falhando

## 🔍 Exemplo de Teste

```typescript
// Teste: amabilityScore maior que 40
const state = createTestGameState({
  amabilityScore: { ...initialScore, totalAmability: 50 },
});
const condition: Condition = {
  type: "amabilityScore",
  operator: ">",
  value: 40,
};
const result = checkConditions([condition], state);
// Esperado: true (50 > 40)
```

## 📝 Adicionando Novos Testes

Para adicionar novos testes, edite `src/utils/conditions.test.ts`:

1. Crie uma nova função de teste (ex: `testNewFeature()`)
2. Use `runTest()` para cada caso de teste
3. Adicione a função ao `runAllTests()`

Exemplo:

```typescript
function testNewFeature(): boolean {
  console.log("\n=== Testes: Nova Funcionalidade ===");
  let allPassed = true;

  allPassed = runTest(
    "Descrição do teste",
    () => {
      // Seu código de teste aqui
      return checkConditions([...], state);
    }
  ) && allPassed;

  return allPassed;
}

// Em runAllTests(), adicione:
const results = {
  // ... outros testes
  newFeature: testNewFeature(),
};
```

## ⚠️ Notas

- Os testes são executados síncronamente
- Cada teste cria um novo GameState para isolamento
- Erros são capturados e reportados sem interromper outros testes
- Logs de debug são exibidos apenas em modo desenvolvimento

## 🎯 Cobertura de Testes

- ✅ Todos os tipos de condições
- ✅ Todos os operadores de comparação
- ✅ Valores limites e edge cases
- ✅ Combinações de condições
- ✅ ConditionRequirement completo
- ✅ Tratamento de erros


