# Sinergia Game - Jogo de Narrativa Interativa

Um jogo de narrativa interativa desenvolvido em React + TypeScript + Three.js, onde você interpreta um funcionário do departamento de "Otimização de Recursos Humanos". Suas escolhas determinam o destino dos funcionários e o seu próprio.

## 🎮 Sobre o Jogo

Você é um funcionário do departamento de "Otimização de Recursos Humanos". Através de diálogos interativos com diversos personagens, você deve tomar decisões que afetam sua pontuação de **Amabilidade**. Suas escolhas podem ser **genuínas** (mostrando empatia, respeito e confiança) ou **manipuladoras** (priorizando eficiência corporativa).

### Sistema de Pontuação

- **Amabilidade Total**: Média ponderada de Empatia (40%), Respeito (30%) e Confiança (30%)
- **Eficiência**: Inversamente proporcional à Amabilidade
- **Finais**:
  - **Final Genuíno**: Alta Amabilidade (>70) e Baixa Eficiência (<30)
  - **Final Eficiente**: Baixa Amabilidade (<30) e Alta Eficiência (>70)
  - **Final Neutro**: Valores intermediários

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173/`

### Build para Produção

```bash
# Gerar build de produção
npm run build
```

Os arquivos serão gerados na pasta `dist/`

### Preview do Build

```bash
# Visualizar build de produção localmente
npm run preview
```

## 🌐 Configuração Apache para Produção

### Instalação do Apache

O Apache já está instalado nesta máquina. Se precisar reinstalar:

```powershell
# Via Chocolatey
choco install apache-httpd -y
```

### Localização do Apache

```
C:\Users\Admin\AppData\Roaming\Apache24
```

### Iniciar/Parar/Reiniciar Apache

```powershell
# Iniciar Apache
Start-Service -Name Apache

# Parar Apache
Stop-Service -Name Apache

# Reiniciar Apache
Restart-Service -Name Apache

# Verificar status
Get-Service -Name Apache
```

### Configuração

O Apache está configurado para servir a aplicação da pasta `dist/`:

- **DocumentRoot**: `C:/Nestjs/PsicMacrocompetenciaEmocional/sinergia-game/dist`
- **Porta**: 80
- **Módulos habilitados**: `mod_rewrite` (para SPA), `mod_headers`

### Acessar a Aplicação

#### Localmente:
- `http://localhost/`
- `http://127.0.0.1/`

#### Na rede local:
- `http://192.168.5.223/` (IP principal)
- `http://172.29.176.1/` (IP alternativo)
- `http://192.168.56.1/` (IP alternativo)

### Atualizar Aplicação em Produção

Após fazer alterações no código:

```bash
# 1. Fazer build
npm run build

# 2. Reiniciar Apache (opcional, geralmente não é necessário)
Restart-Service -Name Apache
```

O Apache servirá automaticamente os arquivos atualizados da pasta `dist/`.

## 🛠️ Comandos Úteis do Apache

### Verificar sintaxe da configuração
```powershell
& "C:\Users\Admin\AppData\Roaming\Apache24\bin\httpd.exe" -t
```

### Ver logs de erro
```powershell
Get-Content "C:\Users\Admin\AppData\Roaming\Apache24\logs\error.log" -Tail 50
```

### Ver logs de acesso
```powershell
Get-Content "C:\Users\Admin\AppData\Roaming\Apache24\logs\access.log" -Tail 50
```

### Abrir porta 80 no Firewall (se necessário)
```powershell
New-NetFirewallRule -DisplayName "Apache HTTP Server" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
```

## 📁 Estrutura do Projeto

```
sinergia-game/
├── public/
│   ├── data/
│   │   └── narrative-trees/     # Árvores de diálogo dos personagens (JSON)
│   └── models/
│       ├── characters/           # Sprites dos personagens
│       └── environment/         # Imagens do ambiente (fundo, janela, mesa)
├── src/
│   ├── components/
│   │   ├── 3d/                   # Componentes 3D (React Three Fiber)
│   │   ├── layout/               # Componentes de layout (Menu principal)
│   │   └── ui/                   # Componentes de UI (Diálogos, Loading, etc.)
│   ├── core/                     # Lógica central do jogo
│   │   ├── AmabilityScore.ts     # Sistema de pontuação
│   │   ├── CharacterSequence.ts  # Sequência de personagens
│   │   ├── EndingCalculator.ts   # Cálculo de finais
│   │   └── NarrativeManager.ts   # Gerenciador de narrativas
│   ├── hooks/                    # Custom hooks
│   ├── scenes/                   # Cenas do jogo
│   ├── store/                    # Estado global (Zustand)
│   ├── types/                    # Definições TypeScript
│   └── utils/                    # Utilitários
└── dist/                         # Build de produção (gerado)
```

## 🎨 Funcionalidades Implementadas

### Interface
- ✅ Menu principal com fundo personalizado
- ✅ Tela de carregamento com texto ASCII "SINERGIA" (renderizado em Canvas para evitar tradução)
- ✅ Diálogos com fundo escuro e blur para melhor legibilidade
- ✅ Opções de escolha randomizadas (posição muda entre diálogos)
- ✅ Tela de final com diferentes backgrounds baseados no tipo de final
- ✅ Sistema de save/load com múltiplos slots

### Sistema de Narrativa
- ✅ 10 personagens com diálogos únicos
- ✅ Sistema de variações de diálogo baseado em tags
- ✅ Comentários da "Consciência" que aparecem durante diálogos
- ✅ Condições contextuais para variações de diálogo

### Sistema de Pontuação
- ✅ Cálculo de Amabilidade (Empatia, Respeito, Confiança)
- ✅ Rastreamento de escolhas genuínas vs manipuladoras
- ✅ Sistema de finais baseado em pontuação
- ✅ Estatísticas detalhadas na tela final

### Visual
- ✅ Ambiente 2D com efeito parallax
- ✅ Camadas: Fundo (prédios) → Janela → Personagem → Mesa
- ✅ Responsivo para mobile e desktop
- ✅ Transições suaves (fade in/out)

## 📱 Responsividade

A aplicação é totalmente responsiva:

- **Mobile**: Layout vertical, fontes menores, opções empilhadas
- **Tablet**: Layout intermediário
- **Desktop**: Layout horizontal, fontes maiores, opções lado a lado

## 🔧 Tecnologias Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **React Three Fiber** - Renderização 3D
- **Three.js** - Biblioteca 3D
- **Zustand** - Gerenciamento de estado
- **Tailwind CSS** - Estilização
- **Apache HTTP Server** - Servidor web para produção

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Preview do build local
npm run lint     # Executa linter
```

## 🐛 Troubleshooting

### Apache não inicia
```powershell
# Verificar erros na configuração
& "C:\Users\Admin\AppData\Roaming\Apache24\bin\httpd.exe" -t

# Ver logs de erro
Get-Content "C:\Users\Admin\AppData\Roaming\Apache24\logs\error.log" -Tail 50
```

### Aplicação não carrega no navegador
1. Verifique se o build foi feito: `npm run build`
2. Verifique se o Apache está rodando: `Get-Service -Name Apache`
3. Verifique os logs do Apache para erros

### Outros computadores não conseguem acessar
1. Verifique o firewall do Windows
2. Certifique-se de que estão na mesma rede
3. Use o IP correto: `http://192.168.5.223/`

## 📄 Licença

Este projeto é privado.

## 👥 Personagens

O jogo inclui 10 personagens únicos:
- Carlos
- Sara
- Ana
- Marcos
- Rafael
- Juliana
- Roberto
- Patricia
- Lucas
- Fernanda

Cada personagem tem sua própria árvore de diálogo com múltiplas escolhas e variações.

---

**Desenvolvido com ❤️ para explorar questões de humanidade vs eficiência corporativa**

