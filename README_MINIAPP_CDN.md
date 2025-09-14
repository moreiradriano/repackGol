# MiniApp React Native para CDN

Este projeto implementa um MiniApp React Native que pode ser carregado via CDN usando Module Federation.

## 🚀 O que foi implementado:

### 1. **Estrutura do MiniApp**

- `miniapp-entry.js` - Ponto de entrada específico para o MiniApp
- `rspack.miniapp.config.mjs` - Configuração do Rspack para build do MiniApp
- `src/federation/MiniAppCDN.tsx` - Componente que carrega o MiniApp do CDN
- `src/federation/MiniAppWorking.tsx` - MiniApp principal (já existia)

### 2. **Scripts Disponíveis**

```bash
# Build do MiniApp para CDN
npm run build:miniapp

# Servir o MiniApp localmente
npm run serve:miniapp

# Build + Serve
npm run deploy:miniapp

# Script completo de deploy
./deploy-miniapp.sh
```

### 3. **Como Executar Localmente**

#### **A. App React Native Completo:**

```bash
# Parar servidor existente
lsof -ti:8081 | xargs kill -9

# Iniciar servidor React Native
npm start

# Em outro terminal, executar no dispositivo
npm run ios    # Para iOS
# ou
npm run android # Para Android
```

#### **B. Apenas o MiniApp (quando funcionar o build):**

```bash
# Build do MiniApp
npm run build:miniapp

# Servir localmente
npm run serve:miniapp
# Acesse: http://localhost:3002
```

### 4. **Navegação no App**

O app agora tem 3 telas principais:

- **Home** - Tela inicial com botões
- **Detail** - Tela de detalhes
- **MiniApp** - MiniApp local (simulado)
- **MiniAppCDN** - MiniApp carregado do CDN

### 5. **Configuração do CDN**

#### **A. URL do CDN (linha 47 do rspack.miniapp.config.mjs):**

```javascript
output: {
  publicPath: 'https://seu-cdn.com/miniapp/', // ← AQUI
}
```

#### **B. URL do CDN (linha 15 do MiniAppCDN.tsx):**

```typescript
const [cdnUrl, setCdnUrl] = React.useState('https://seu-cdn.com/miniapp/');
```

### 6. **Arquivos para Subir no CDN**

Após o build bem-sucedido, você terá na pasta `dist/miniapp/`:

```
dist/miniapp/
├── miniapp.[hash].js          # ← Este arquivo vai para o CDN
├── miniapp.vendors.[hash].js  # ← Dependências (se houver)
└── cdn-info.txt              # ← Instruções para CDN
```

### 7. **Como Testar o MiniApp**

1. **Execute o app React Native:**

   ```bash
   npm start
   # Em outro terminal:
   npm run ios
   ```

2. **Na tela inicial, toque em:**

   - "Abrir MiniApp" - Para o MiniApp local
   - "MiniApp do CDN" - Para o MiniApp do CDN

3. **O MiniApp CDN mostrará:**
   - Loading state
   - URL do CDN sendo carregada
   - Tratamento de erro se falhar

### 8. **Problemas Conhecidos**

- O build do MiniApp ainda não está funcionando devido a problemas com o Rspack
- O MiniApp CDN atualmente carrega o componente local como fallback
- Precisa configurar a URL real do CDN

### 9. **Próximos Passos**

1. **Resolver o build do Rspack:**

   - Verificar se o `@rspack/core` está instalado corretamente
   - Ou usar uma abordagem alternativa (Webpack, Metro)

2. **Configurar CDN real:**

   - Fazer upload dos arquivos para um CDN
   - Atualizar as URLs no código
   - Testar o carregamento real

3. **Implementar carregamento real do CDN:**
   - Usar `fetch()` para carregar o script
   - Implementar cache e fallback
   - Adicionar tratamento de erro robusto

### 10. **Estrutura de Arquivos**

```
RepackApp/
├── miniapp-entry.js              # ← Ponto de entrada do MiniApp
├── rspack.miniapp.config.mjs     # ← Configuração do build
├── deploy-miniapp.sh             # ← Script de deploy
├── src/
│   ├── federation/
│   │   ├── MiniAppWorking.tsx    # ← MiniApp principal
│   │   └── MiniAppCDN.tsx        # ← Carregador do CDN
│   ├── navigation/
│   │   └── MainNavigator.tsx     # ← Navegação atualizada
│   └── screens/
│       └── HomeScreen.tsx        # ← Tela inicial atualizada
└── dist/miniapp/                 # ← Build do MiniApp (após build)
```

## 🎯 Resumo

O projeto está configurado para:

- ✅ Executar o MiniApp localmente no React Native
- ✅ Simular carregamento do CDN
- ✅ Gerar bundle para CDN (quando o build funcionar)
- ✅ Navegação entre diferentes versões do MiniApp

**Para usar em produção, você precisa:**

1. Resolver o problema do build do Rspack
2. Fazer upload dos arquivos para um CDN real
3. Atualizar as URLs no código
4. Testar o carregamento real do CDN

---

**Desenvolvido com ❤️ usando React Native + Re.Pack + Module Federation**
