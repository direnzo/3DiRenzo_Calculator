
# 🎯 3DiRenzo Calculator

**Calculadora de preços e geração de orçamentos para impressão 3D multiplataforma**

Uma solução completa para bureaus de impressão 3D, designers e empresas que precisam calcular custos precisos de impressão FDM e MSLA/Resina com sistema whitelabel.

[![React Native](https://img.shields.io/badge/React%20Native-0.76.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2052-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 **Features Implementadas**

### ✅ **Engine de Cálculo Completa**
- **FDM**: Cálculo baseado em massa de filamento e tempo de impressão
- **MSLA/Resina**: Cálculo baseado em volume e tempo de impressão
- **Custos inclusos**: Material, energia, máquina, preparação, pós-processo, falhas, markup/margem, impostos

### ✅ **Multiplataforma Real**
- 📱 **Mobile**: Android/iOS nativo com Expo
- 🌐 **Web**: Progressive Web App
- 🖥️ **Desktop**: Preparado para Tauri (Windows/Mac/Linux)

### ✅ **Arquitetura Moderna (2024/2025)**
- **Expo SDK 52** com New Architecture
- **Expo Router** para navegação file-based
- **Zustand** para gerenciamento de estado
- **TypeScript** strict em todo o projeto
- **Monorepo** com compartilhamento de código

### ✅ **Sistema Whitelabel**
- Multi-tenant com separação de dados
- Customização por tenant (impressoras, materiais, configurações)
- Preparado para branding personalizado

## 📊 **Fórmula de Cálculo**

```typescript
Custo Total = Material + Energia + (Hora máquina × tarifa) + 
              (Preparação × R$/h) + (Pós-processo × R$/h) + 
              Extras + (Taxa de falha %) + Markup/Margem + Impostos
```

### **FDM (Filamento)**
- **Material**: `(massaG / 1000) × preçoPerKg`
- **Energia**: `(potênciaW / 1000) × tempoH × tarifaKWh`
- **Tempo**: Do G-code ou manual

### **MSLA (Resina)**
- **Material**: `(volumeMl / 1000) × preçoPerL × (1 + perdas%)`
- **Energia**: `(potênciaW / 1000) × tempoH × tarifaKWh`
- **Volume**: Do slicer ou manual

## 🏗️ **Estrutura do Projeto**

```
📦 3DiRenzo_Calculator/
├── 📱 apps/
│   ├── mobile/          # Expo + React Native
│   │   ├── app/         # Expo Router (file-based routing)
│   │   ├── src/stores/  # Zustand stores
│   │   └── src/         # Componentes e utils
│   └── desktop-web/     # Vite + React (web/desktop)
├── 📦 packages/
│   ├── shared/          # Types e modelos compartilhados
│   └── pricing/         # Engine de cálculo pura
└── 📋 docs/            # Documentação técnica
```

## ⚡ **Setup Rápido**

### **Pré-requisitos**
- Node.js 20+
- PNPM 9+
- Expo Go app (para teste mobile)

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/3DiRenzo_Calculator.git
cd 3DiRenzo_Calculator

# Instale as dependências
pnpm install

# Inicie o desenvolvimento
pnpm dev:mobile     # Mobile (iOS/Android)
pnpm dev:desktop    # Web/Desktop
```

### **Scripts Disponíveis**
```bash
pnpm dev:mobile     # Expo para mobile
pnpm dev:desktop    # Vite para web
pnpm build          # Build de produção
pnpm type-check     # Verificação de tipos
```

## 📱 **Como Usar**

### **Mobile**
1. Instale o Expo Go no seu celular
2. Execute `pnpm dev:mobile`
3. Escaneie o QR code

### **Web**
1. Execute `pnpm dev:mobile`
2. Pressione `w` no terminal ou acesse `http://localhost:8081`

## 🎯 **Status do MVP (85% Completo)**

### ✅ **Implementado**
- [x] Engine de cálculo FDM/MSLA
- [x] Interface mobile e web
- [x] Gerenciamento de impressoras e materiais
- [x] Sistema multi-tenant
- [x] Navegação moderna (Expo Router)
- [x] Estado global (Zustand)
- [x] Persistência offline

### 🚧 **Em Desenvolvimento**
- [ ] Upload e parsing de G-code
- [ ] Geração de PDF de orçamentos
- [ ] Sistema de templates whitelabel
- [ ] Multi-idioma e multi-moeda
- [ ] Sincronização com backend

## 🛠️ **Stack Tecnológica**

| Categoria | Tecnologia | Versão |
|-----------|------------|--------|
| **Frontend Mobile** | React Native | 0.76.5 |
| **Runtime Mobile** | Expo | SDK 52 |
| **Frontend Web** | React + Vite | 18.3.1 |
| **Linguagem** | TypeScript | 5.9 |
| **Estado Global** | Zustand | 5.0 |
| **Navegação** | Expo Router | 6.0 |
| **Monorepo** | PNPM + Turbo | 9.0 + 2.5 |
| **Persistência** | AsyncStorage | 2.2 |

## 📈 **Roadmap**

### **v0.8 (Atual) - MVP Core**
- ✅ Engine de cálculo
- ✅ Interface básica
- ✅ Multi-tenant

### **v1.0 - MVP Completo**
- [ ] Upload G-code
- [ ] PDF Generation
- [ ] Templates whitelabel

### **v1.1 - Comercial**
- [ ] Backend/Sync
- [ ] Multi-idioma
- [ ] Sistema de pagamentos

### **v2.0 - Avançado**
- [ ] IA para otimização
- [ ] Integrações ERP
- [ ] Analytics avançados

## 🤝 **Contribuindo**

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes.

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

## 👥 **Autores**

- **DiRenzo** - *Desenvolvimento inicial* - [GitHub](https://github.com/seu-usuario)

## 📞 **Suporte**

- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/3DiRenzo_Calculator/issues)
- 📧 **Email**: seu-email@exemplo.com
- 💬 **Discord**: [Link do servidor]

---

⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐
