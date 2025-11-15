# Sinergia - Jogo de Narrativa Interativa

Jogo narrativo em primeira pessoa onde o jogador assume o papel de um funcionário do departamento de "Otimização de Recursos Humanos" em uma megacorporação. O jogo utiliza a mecânica de **Amabilidade** de forma invertida: escolhas que parecem "corretas" (eficientes para a empresa) levam ao final ruim, enquanto escolhas genuinamente amáveis levam ao final bom.

## 🎮 Conceito

- **Final Ruim (aparentemente "bom")**: Demitir todos os funcionários usando linguagem amável manipuladora
- **Final Bom (verdadeiro)**: Usar Amabilidade genuína (Empatia, Respeito, Confiança) e ser demitido por "incompetência"

## 🚀 Tecnologias

- **React 19** + **TypeScript** - Framework e tipagem
- **Vite** - Build tool e dev server
- **React Three Fiber** - Renderização 3D
- **Zustand** - Gerenciamento de estado
- **Tailwind CSS** - Estilização
- **Three.js** - Engine 3D

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🛠️ Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd sinergia-game

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O jogo estará disponível em `http://localhost:5173`

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Linting
npm run lint
```

## 📁 Estrutura do Projeto

```
sinergia-game/
├── public/
│   ├── data/
│   │   └── narrative-trees/    # Árvores de narrativa (JSON)
│   └── models/                  # Modelos 3D (futuro)
├── src/
│   ├── components/
│   │   ├── 3d/                  # Componentes 3D (React Three Fiber)
│   │   │   ├── OfficeScene.tsx
│   │   │   ├── Character.tsx
│   │   │   ├── Desk.tsx
│   │   │   └── WindowView.tsx
│   │   └── ui/                  # Componentes de UI
│   │       ├── DialogueUI.tsx
│   │       ├── OptionButton.tsx
│   │       ├── ConscienceNarrator.tsx
│   │       └── ErrorBoundary.tsx
│   ├── core/                    # Lógica central
│   │   ├── NarrativeManager.ts
│   │   └── AmabilityScore.ts
│   ├── scenes/                  # Cenas do jogo
│   │   └── OfficeScene.tsx
│   ├── store/                   # Estado global (Zustand)
│   │   └── gameStore.ts
│   ├── types/                   # Tipos TypeScript
│   │   ├── dialogue.ts
│   │   ├── character.ts
│   │   ├── game.ts
│   │   └── narrative.ts
│   ├── utils/                   # Utilitários
│   │   └── jsonLoader.ts
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

## 🎯 Sistema de Narrativa

O jogo utiliza um sistema de árvore de decisões baseado em nós (nodes). Cada nó contém:
- Texto do diálogo
- Opções de resposta (máximo 2)
- Impacto na pontuação de Amabilidade
- Comentários da "Consciência"

### Estrutura de um Nó

```json
{
  "nodeId": "carlos_intro",
  "characterName": "Carlos",
  "dialogueText": "Eu estou preocupado...",
  "options": [
    {
      "optionId": "opt_manipulative",
      "text": "Opção manipuladora",
      "nextNodeId": "carlos_signed",
      "amabilityImpact": {
        "totalAmability": -10,
        "efficiency": 15
      }
    }
  ]
}
```

## 🎨 Sistema de Pontuação

O jogo rastreia múltiplas métricas:
- **Total Amability**: Média ponderada de Empatia, Respeito e Confiança
- **Empathy**: Nível de empatia
- **Respect**: Nível de respeito
- **Trust**: Nível de confiança
- **Efficiency**: Eficiência corporativa (inversamente proporcional à Amabilidade)

### Determinação de Final

- **Final Bom**: Amabilidade > 70, Eficiência < 30
- **Final Ruim**: Amabilidade < 30, Eficiência > 70
- **Final Neutro**: Valores intermediários

## 🐛 Tratamento de Erros

O projeto inclui:
- Error Boundary para capturar erros React
- Validação de dados JSON
- Mensagens de erro amigáveis
- Fallbacks para dados faltantes

## 🚧 Status do Projeto

**Fase 1: Prototipagem e Core Systems** - ✅ Completo

- ✅ Setup do projeto
- ✅ Sistema de estado e narrativa
- ✅ UI de diálogo
- ✅ Cena 3D básica
- ✅ Personagem placeholder

## 📝 Desenvolvimento

### Adicionar Nova Árvore de Narrativa

1. Crie um arquivo JSON em `public/data/narrative-trees/`
2. Siga a estrutura definida em `src/types/narrative.ts`
3. Use `loadNarrativeTree(treeId)` no gameStore

### Adicionar Novo Personagem

1. Crie a árvore de narrativa do personagem
2. Adicione dados do personagem em `src/types/character.ts`
3. O sistema carregará automaticamente baseado no `characterId`

## 📄 Licença

Este projeto é parte de um projeto educacional sobre competência emocional.

## 👥 Contribuindo

Este é um projeto em desenvolvimento. Para contribuir, consulte a documentação de desenvolvimento em `DOCS_PROJETO/`.

---

**Desenvolvido como parte do projeto de Macrocompetência Emocional**
