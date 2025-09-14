#!/bin/bash

# Script para build e deploy do MiniApp React Native para CDN
echo "🚀 MiniApp React Native CDN Deploy Script"
echo "=========================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir com cor
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    print_error "Execute este script no diretório raiz do projeto"
    exit 1
fi

print_status "Iniciando processo de build do MiniApp..."

# 1. Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    print_status "Instalando dependências..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Falha ao instalar dependências"
        exit 1
    fi
fi

# 2. Limpar build anterior
print_status "Limpando build anterior..."
rm -rf dist/miniapp

# 3. Build do MiniApp
print_status "Fazendo build do MiniApp para CDN..."
npm run build:miniapp

if [ $? -ne 0 ]; then
    print_error "Falha no build do MiniApp"
    exit 1
fi

# 4. Verificar se o build foi bem-sucedido
if [ -d "dist/miniapp" ]; then
    print_success "Build do MiniApp concluído com sucesso!"
    echo ""
    
    # 5. Mostrar informações do build
    print_status "📁 Arquivos gerados:"
    ls -la dist/miniapp/
    echo ""
    
    # 6. Calcular tamanhos dos arquivos
    print_status "📊 Tamanhos dos arquivos:"
    du -h dist/miniapp/*
    echo ""
    
    # 7. Criar arquivo de informações para CDN
    cat > dist/miniapp/cdn-info.txt << EOF
MiniApp React Native CDN Information
===================================

Arquivos principais:
- miniapp.[hash].js (bundle principal)
- miniapp.vendors.[hash].js (dependências, se houver)

Para usar em um host app:
1. Faça upload de todos os arquivos para seu CDN
2. Configure CORS para permitir acesso de outros domínios
3. Use a URL do miniapp.[hash].js como entry point

Exemplo de configuração CORS (Apache):
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type"

Exemplo de configuração CORS (Nginx):
add_header Access-Control-Allow-Origin "*";
add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
add_header Access-Control-Allow-Headers "Content-Type";

Teste local:
npm run serve:miniapp

Build gerado em: $(date)
EOF
    
    print_success "Arquivo cdn-info.txt criado com instruções"
    echo ""
    
    # 8. Instruções para deploy
    print_status "🌐 Próximos passos para CDN:"
    echo "1. Faça upload da pasta dist/miniapp/ para seu CDN"
    echo "2. Configure CORS conforme instruções em cdn-info.txt"
    echo "3. Teste o acesso à URL do miniapp.[hash].js"
    echo "4. Atualize a URL no código (MiniAppCDN.tsx)"
    echo ""
    
    # 9. Teste local
    print_status "🧪 Para testar localmente:"
    echo "   npm run serve:miniapp"
    echo "   Acesse: http://localhost:3002"
    echo ""
    
    # 10. Informações de uso
    print_status "📋 Informações de uso:"
    echo "   - MiniApp React Native otimizado"
    echo "   - Bundle minificado e com hash para cache"
    echo "   - Compatível com Module Federation"
    echo "   - Pronto para CDN"
    
else
    print_error "Erro: Pasta dist/miniapp/ não foi criada"
    exit 1
fi

print_success "Processo concluído! 🎉"
