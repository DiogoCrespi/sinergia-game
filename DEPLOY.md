# 🚀 Guia de Deploy - Sinergia Game

Este guia explica como publicar o jogo online.

## 📋 Pré-requisitos

- Conta no [GitHub](https://github.com)
- Conta no [Vercel](https://vercel.com) (recomendado) ou [Netlify](https://netlify.com)

---

## Opção 1: Deploy com Vercel (Recomendado - Mais Fácil)

### Passo 1: Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com) e crie um novo repositório
2. Nome sugerido: `sinergia-game`
3. **NÃO** inicialize com README, .gitignore ou licença (já temos)

### Passo 2: Conectar Repositório Local ao GitHub

```bash
# Adicionar remote (substitua SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/sinergia-game.git

# Verificar se foi adicionado
git remote -v

# Fazer commit de todas as mudanças
git add .

# Commit inicial
git commit -m "Initial commit: Sinergia Game - Jogo narrativo 3D"

# Enviar para GitHub
git branch -M main
git push -u origin main
```

### Passo 3: Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório `sinergia-game`
4. Vercel detectará automaticamente que é um projeto Vite
5. Configurações (geralmente automáticas):
   - **Framework Preset**: Vite
   - **Root Directory**: `sinergia-game` (ou `.` se estiver na raiz)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Clique em **"Deploy"**
7. Aguarde o build (pode levar alguns minutos)
8. Pronto! Seu jogo estará online em uma URL como: `sinergia-game.vercel.app`

### Configurações Adicionais no Vercel (Opcional)

Se precisar ajustar configurações:

1. Vá em **Settings** → **General**
2. **Build & Development Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

---

## Opção 2: Deploy com Netlify

### Passo 1 e 2: Mesmos do Vercel (criar repo no GitHub)

### Passo 3: Deploy no Netlify

1. Acesse [netlify.com](https://netlify.com) e faça login com GitHub
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Selecione o repositório `sinergia-game`
4. Configurações:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Clique em **"Deploy site"**
6. Aguarde o build
7. Pronto! URL: `sinergia-game.netlify.app`

---

## Opção 3: GitHub Pages (Alternativa)

### Passo 1: Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

### Passo 2: Adicionar Scripts no package.json

Adicione ao `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://SEU_USUARIO.github.io/sinergia-game"
}
```

### Passo 3: Configurar Vite para GitHub Pages

Atualize `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/sinergia-game/', // Nome do repositório
  // ... resto da configuração
})
```

### Passo 4: Deploy

```bash
npm run deploy
```

---

## ⚠️ Notas Importantes

### Arquivos Grandes (Modelos 3D)

O modelo `carlos.glb` tem ~29MB, o que pode causar:
- Build lento
- Carregamento lento no site

**Soluções:**
1. **Otimizar modelos** (recomendado):
   - Reduzir poly count
   - Comprimir texturas
   - Usar Draco compression

2. **CDN para assets grandes**:
   - Mover modelos para CDN (Cloudflare, AWS S3)
   - Atualizar caminhos no código

### Variáveis de Ambiente

Se usar variáveis de ambiente, configure no painel do Vercel/Netlify:
- **Settings** → **Environment Variables**

### Domínio Customizado

Tanto Vercel quanto Netlify permitem adicionar domínio customizado:
- Vercel: **Settings** → **Domains**
- Netlify: **Domain settings** → **Add custom domain**

---

## 🔄 Atualizações Futuras

Após o deploy inicial, para atualizar:

1. Faça suas mudanças
2. Commit e push:
   ```bash
   git add .
   git commit -m "Descrição das mudanças"
   git push
   ```
3. Vercel/Netlify fará deploy automático!

---

## 📊 Monitoramento

- **Vercel**: Dashboard mostra analytics, logs, etc.
- **Netlify**: Dashboard com analytics e logs

---

## 🆘 Problemas Comuns

### Build Falha
- Verifique logs no dashboard
- Certifique-se que `npm install` funciona localmente
- Verifique se todas as dependências estão no `package.json`

### Modelos Não Carregam
- Verifique caminhos (devem ser relativos: `/models/...`)
- Verifique se arquivos estão em `public/`
- Verifique tamanho dos arquivos (pode precisar de CDN)

### Erro 404
- Verifique configuração de base path no Vite
- Verifique se está usando React Router corretamente

---

## ✅ Checklist de Deploy

- [ ] Repositório criado no GitHub
- [ ] Código commitado e enviado
- [ ] Conta criada no Vercel/Netlify
- [ ] Projeto conectado ao repositório
- [ ] Build configurado corretamente
- [ ] Deploy realizado com sucesso
- [ ] Site acessível online
- [ ] Testado em diferentes navegadores

---

**Boa sorte com o deploy! 🎮**

