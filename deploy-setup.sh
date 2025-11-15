#!/bin/bash
# Script helper para configurar deploy
# Execute: bash deploy-setup.sh

echo "🚀 Configurando deploy do Sinergia Game..."
echo ""

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na pasta sinergia-game"
    exit 1
fi

# Verificar se git está inicializado
if [ ! -d ".git" ]; then
    echo "❌ Erro: Git não está inicializado"
    echo "Execute: git init"
    exit 1
fi

echo "✅ Verificações básicas OK"
echo ""

# Perguntar sobre repositório remoto
read -p "Você já criou o repositório no GitHub? (s/n): " has_repo

if [ "$has_repo" = "s" ] || [ "$has_repo" = "S" ]; then
    read -p "Digite a URL do repositório (ex: https://github.com/usuario/sinergia-game.git): " repo_url
    
    # Verificar se remote já existe
    if git remote get-url origin > /dev/null 2>&1; then
        echo "⚠️  Remote 'origin' já existe"
        read -p "Deseja atualizar? (s/n): " update_remote
        if [ "$update_remote" = "s" ] || [ "$update_remote" = "S" ]; then
            git remote set-url origin "$repo_url"
            echo "✅ Remote atualizado"
        fi
    else
        git remote add origin "$repo_url"
        echo "✅ Remote adicionado"
    fi
else
    echo ""
    echo "📝 Passos para criar repositório:"
    echo "1. Acesse https://github.com/new"
    echo "2. Nome: sinergia-game"
    echo "3. NÃO marque 'Initialize with README'"
    echo "4. Clique em 'Create repository'"
    echo "5. Execute este script novamente"
    exit 0
fi

echo ""
echo "📦 Preparando commit..."

# Verificar se há mudanças
if git diff --quiet && git diff --cached --quiet; then
    echo "⚠️  Nenhuma mudança para commitar"
else
    git add .
    read -p "Mensagem do commit (ou Enter para padrão): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Deploy: Sinergia Game"
    fi
    git commit -m "$commit_msg"
    echo "✅ Commit criado"
fi

echo ""
read -p "Deseja fazer push para GitHub? (s/n): " do_push

if [ "$do_push" = "s" ] || [ "$do_push" = "S" ]; then
    # Verificar branch
    current_branch=$(git branch --show-current)
    if [ -z "$current_branch" ]; then
        git branch -M main
        current_branch="main"
    fi
    
    echo "📤 Fazendo push para $current_branch..."
    git push -u origin "$current_branch"
    echo "✅ Push concluído!"
    echo ""
    echo "🎉 Próximos passos:"
    echo "1. Acesse https://vercel.com"
    echo "2. Faça login com GitHub"
    echo "3. Clique em 'Add New Project'"
    echo "4. Selecione o repositório sinergia-game"
    echo "5. Clique em 'Deploy'"
    echo ""
    echo "Ou siga as instruções em DEPLOY.md"
else
    echo ""
    echo "📝 Para fazer push manualmente:"
    echo "git push -u origin main"
fi

echo ""
echo "✅ Setup concluído!"

