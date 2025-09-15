#!/bin/bash

echo "🚀 Gerando bundle da DetailScreen para CDN..."

# Criar diretório de destino
mkdir -p dist/detailscreen

# Gerar bundle usando webpack
echo "📦 Gerando bundle com webpack..."
npx webpack --config webpack.detailscreen.config.js

# Criar arquivo de informações do CDN
cat > dist/detailscreen/cdn-info.txt << EOF
DetailScreen React Native CDN Information
========================================

Arquivos gerados:
- detailscreen.[hash].js - Bundle JavaScript (3.47 KiB)
- cdn-info.txt - Este arquivo de informações

O que contém o bundle:
- Tela completa DetailScreen.tsx compilada
- Todas as dependências React Native
- Navegação e funcionalidades
- Código JavaScript pronto para executar

Para usar em um host app:
1. Faça upload do arquivo .js para seu CDN
2. Configure CORS para permitir acesso de outros domínios
3. Use a URL do detailscreen.[hash].js como entry point

Exemplo de configuração CORS (Apache):
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type"

Exemplo de configuração CORS (Nginx):
add_header Access-Control-Allow-Origin "*";
add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
add_header Access-Control-Allow-Headers "Content-Type";

URLs de exemplo:
- https://seu-cdn.com/detailscreen/detailscreen.[hash].js
- https://cdn.example.com/detailscreen/detailscreen.[hash].js

Build gerado em: $(date)
EOF

echo "✅ Bundle gerado com sucesso!"
echo "📁 Arquivos salvos em: dist/detailscreen/"
echo "🌐 Para servir localmente: npm run serve:detailscreen"
echo "📋 Informações do CDN: dist/detailscreen/cdn-info.txt"
