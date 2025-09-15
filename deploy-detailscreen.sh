#!/bin/bash

echo "🚀 Fazendo deploy da DetailScreen para o Netlify..."

# Verificar se o bundle existe
if [ ! -f "dist/detailscreen/detailscreen.7d626b20b99619f180f8.js" ]; then
    echo "❌ Bundle não encontrado. Execute primeiro: ./build-detailscreen.sh"
    exit 1
fi

# Criar diretório temporário para o deploy
mkdir -p temp-deploy/detailscreen

# Copiar arquivos para o diretório de deploy
cp dist/detailscreen/detailscreen.7d626b20b99619f180f8.js temp-deploy/detailscreen/
cp dist/detailscreen/cdn-info.txt temp-deploy/detailscreen/

# Criar _headers para CORS
cat > temp-deploy/_headers << EOF
/detailscreen/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
EOF

# Criar _redirects para SPA
cat > temp-deploy/_redirects << EOF
/*    /index.html   200
EOF

# Criar index.html simples
cat > temp-deploy/index.html << EOF
<!DOCTYPE html>
<html>
<head>
    <title>DetailScreen CDN</title>
</head>
<body>
    <h1>DetailScreen CDN</h1>
    <p>Bundle disponível em: <a href="/detailscreen/detailscreen.7d626b20b99619f180f8.js">detailscreen.7d626b20b99619f180f8.js</a></p>
    <p>Informações: <a href="/detailscreen/cdn-info.txt">cdn-info.txt</a></p>
</body>
</html>
EOF

echo "📁 Arquivos preparados para deploy:"
ls -la temp-deploy/

echo ""
echo "🌐 Para fazer deploy no Netlify:"
echo "1. Acesse: https://app.netlify.com/drop"
echo "2. Arraste a pasta 'temp-deploy' para a área de drop"
echo "3. Aguarde o deploy e copie a URL gerada"
echo "4. Atualize a URL no DetailScreenCDN.tsx"
echo ""
echo "📋 URL do bundle será: https://[seu-site].netlify.app/detailscreen/detailscreen.7d626b20b99619f180f8.js"
echo ""
echo "✅ Arquivos prontos em: temp-deploy/"
