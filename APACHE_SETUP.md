# Configuração Apache - Sinergia Game

## ✅ Status da Instalação

- **Apache instalado**: ✅
- **Build da aplicação**: ✅
- **Apache configurado**: ✅
- **Apache rodando**: ✅

## 📍 Informações de Acesso

### Na sua máquina:
- **URL Local**: `http://localhost/`
- **URL Local (alternativa)**: `http://127.0.0.1/`

### Na rede local:
Outros computadores na mesma rede podem acessar usando um dos seguintes IPs:

- **IP Principal**: `http://192.168.5.223/`
- **IP Alternativo 1**: `http://172.29.176.1/`
- **IP Alternativo 2**: `http://192.168.56.1/`

## 🔧 Configurações Aplicadas

### DocumentRoot
```
C:/Nestjs/PsicMacrocompetenciaEmocional/sinergia-game/dist
```

### Porta
- **Porta**: 80 (HTTP padrão)

### Módulos Habilitados
- ✅ `mod_rewrite` - Para suporte a SPA (Single Page Application)
- ✅ `mod_headers` - Para CORS (se necessário)

### Regras de Rewrite
Configurado para redirecionar todas as rotas para `index.html`, permitindo que o React Router funcione corretamente.

## 🔄 Como Atualizar a Aplicação

Sempre que você fizer alterações no código, execute:

```bash
cd C:\Nestjs\PsicMacrocompetenciaEmocional\sinergia-game
npm run build
```

O Apache servirá automaticamente os arquivos atualizados da pasta `dist`.

## 🛠️ Comandos Úteis

### Reiniciar Apache
```powershell
Restart-Service -Name Apache
```

### Verificar status do Apache
```powershell
Get-Service -Name Apache
```

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

## 🔥 Firewall

O firewall do Windows já tem regras para o Apache (`httpd.exe`). Se outros computadores não conseguirem acessar, verifique:

1. **Firewall do Windows**: Certifique-se de que a porta 80 está aberta para conexões de entrada
2. **Rede**: Verifique se os computadores estão na mesma rede
3. **Antivírus**: Alguns antivírus podem bloquear conexões de rede

### Abrir porta 80 no Firewall (se necessário)
```powershell
New-NetFirewallRule -DisplayName "Apache HTTP Server" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
```

## 📝 Notas

- O Apache está configurado para servir arquivos estáticos da pasta `dist`
- Todas as rotas são redirecionadas para `index.html` (necessário para React Router)
- A aplicação está pronta para ser acessada por múltiplos usuários na rede local

## 🚀 Próximos Passos

1. Teste localmente: Acesse `http://localhost/` no seu navegador
2. Teste na rede: Acesse `http://192.168.5.223/` de outro computador na mesma rede
3. Compartilhe o IP com outros usuários: `http://192.168.5.223/`

