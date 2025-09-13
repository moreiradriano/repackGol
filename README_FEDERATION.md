# RepackApp - Module Federation Demo

Este projeto demonstra a integração do **Module Federation** com **Re.Pack** em uma aplicação React Native, baseado no exemplo `tester-federation` do repositório [callstack/repack](https://github.com/callstack/repack).

## 🚀 Funcionalidades

- **Module Federation**: Carregamento dinâmico de módulos
- **React Navigation**: Navegação entre telas
- **Re.Pack**: Bundler otimizado para React Native
- **Micro-frontends**: Arquitetura de aplicações modulares
- **Lazy Loading**: Carregamento assíncrono de componentes

## 📁 Estrutura do Projeto

```
src/
├── navigation/
│   └── MainNavigator.tsx      # Navegador principal
├── screens/
│   ├── HomeScreen.tsx         # Tela inicial
│   ├── DetailScreen.tsx       # Tela de detalhes
│   ├── MiniAppScreen.tsx      # Tela do MiniApp (carregamento federado)
│   └── MiniAppNavigator.tsx   # Navegador do MiniApp
App.tsx                        # Componente principal
rspack.config.mjs             # Configuração do Re.Pack com Module Federation
```

## ⚙️ Configuração

### Module Federation

O Module Federation está configurado no `rspack.config.mjs`:

```javascript
new Repack.plugins.ModuleFederationPlugin({
  name: 'HostApp',
  shared: {
    react: { singleton: true, eager: true },
    'react-native': { singleton: true, eager: true },
    // ... outras dependências compartilhadas
  },
});
```

### Carregamento Assíncrono

O MiniApp é carregado usando React Suspense:

```javascript
const MiniAppContent = React.lazy(() =>
  Federated.importModule('MiniApp', './MiniAppNavigator'),
);
```

## 🛠️ Como Executar

1. **Instalar dependências**:

   ```bash
   npm install
   ```

2. **Instalar pods (iOS)**:

   ```bash
   cd ios && bundle exec pod install
   ```

3. **Iniciar o servidor de desenvolvimento**:

   ```bash
   npm start
   ```

4. **Executar no dispositivo/simulador**:

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android
   ```

## 📱 Telas da Aplicação

### 1. Home Screen

- Tela inicial com navegação para outras telas
- Botões para acessar Detail e MiniApp

### 2. Detail Screen

- Tela de exemplo com informações sobre a aplicação
- Demonstra navegação básica

### 3. MiniApp Screen

- Demonstra carregamento de módulo federado
- Usa React Suspense para carregamento assíncrono
- Inclui tratamento de erro e retry

## 🔧 Tecnologias Utilizadas

- **React Native 0.81.4**
- **Re.Pack 5.2.0**
- **React Navigation 6.x**
- **TypeScript**
- **Module Federation**

## 📚 Recursos Adicionais

- [Documentação do Re.Pack](https://re-pack.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Exemplo tester-federation](https://github.com/callstack/repack/tree/main/apps/tester-federation)

## 🎯 Próximos Passos

Para expandir este projeto, você pode:

1. **Criar módulos federados externos**
2. **Implementar cache de módulos**
3. **Adicionar testes automatizados**
4. **Configurar CI/CD**
5. **Implementar lazy loading mais avançado**

---

**Nota**: Este projeto é baseado no exemplo `tester-federation` do repositório oficial do Re.Pack e demonstra as melhores práticas para implementar micro-frontends em React Native.
