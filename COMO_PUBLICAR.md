# 🚀 Como Publicar o Sinergia Game Online

## Método Rápido (Vercel - Recomendado)

### Passo 1: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. **Nome do repositório**: `sinergia-game`
3. **IMPORTANTE**: NÃO marque "Add a README file"
4. Clique em **"Create repository"**

### Passo 2: Conectar seu Código ao GitHub

Abra o terminal na pasta `sinergia-game` e execute:

```bash
# Adicionar os arquivos novos
git add .

# Fazer commit
git commit -m "Preparar para deploy"

# Adicionar repositório remoto (SUBSTITUA SEU_USUARIO pelo seu username)
git remote add origin https://github.com/SEU_USUARIO/sinergia-game.git

# Renomear branch para main (se necessário)
git branch -M main

# Enviar para GitHub
git push -u origin main
```

**Substitua `SEU_USUARIO` pelo seu username do GitHub!**

### Passo 3: Deploy no Vercel (Gratuito)

1. Acesse: https://vercel.com
2. Clique em **"Sign Up"** e faça login com sua conta GitHub
3. Clique em **"Add New Project"**
4. Selecione o repositório **sinergia-game**
5. O Vercel detectará automaticamente que é um projeto Vite
6. **Configurações** (geralmente já vem correto):
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Clique em **"Deploy"**
8. Aguarde 2-3 minutos
9. **Pronto!** Seu jogo estará online! 🎉

A URL será algo como: `sinergia-game.vercel.app`

---

## ⚠️ Importante: Arquivo Grande

O modelo `carlos.glb` tem ~29MB, o que pode:
- Tornar o carregamento mais lento
- Aumentar o tempo de build

**Solução temporária**: O jogo funcionará, mas pode demorar para carregar.

**Solução definitiva** (futuro): Otimizar o modelo no Blender.

---

## 🔄 Atualizar o Site

Sempre que fizer mudanças:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

O Vercel atualizará automaticamente! ✨

---

## 📱 Outras Opções

### Netlify (Alternativa)

1. Acesse: https://netlify.com
2. Login com GitHub
3. "Add new site" → "Import an existing project"
4. Selecione o repositório
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

---

## ❓ Problemas?

- **Erro no push**: Verifique se o repositório foi criado no GitHub
- **Build falha**: Verifique os logs no dashboard do Vercel
- **Site não carrega**: Aguarde alguns minutos após o deploy

---

**Pronto! Seu jogo estará online em poucos minutos! 🎮**


