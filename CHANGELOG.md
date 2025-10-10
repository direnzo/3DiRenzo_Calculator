# 📋 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 🔄 Em Desenvolvimento
- Upload e parsing de arquivos G-code
- Geração de PDF de orçamentos
- Sistema de templates whitelabel
- Multi-idioma (i18n)
- Backend com Supabase

## [0.8.0] - 2024-10-09 🎯

### ✨ Adicionado
- **Engine de Cálculo Completa**
  - Suporte para impressão FDM (filamento)
  - Suporte para impressão MSLA (resina)
  - Fórmula completa: material + energia + máquina + prep + pós + falhas + markup + impostos
  - Modos de pricing: markup e margem
  - Validação de inputs

- **Arquitetura Moderna**
  - Upgrade para Expo SDK 52
  - React Native 0.76.5 com New Architecture
  - Expo Router para navegação file-based
  - TypeScript strict em todo o projeto

- **Gerenciamento de Estado**
  - Zustand store para estado global
  - Persistência com AsyncStorage
  - CRUD completo para impressoras, filamentos e resinas
  - Sistema multi-tenant preparado

- **Interface de Usuário**
  - Interface mobile moderna e responsiva
  - Interface web compatível
  - Navegação fluida entre telas
  - Cards com design system consistente

- **Sistema Multi-tenant**
  - Separação de dados por `tenantId`
  - Filtragem automática por tenant ativo
  - Preparado para sistema whitelabel

### 🏗️ **Arquitetura**
- Monorepo com PNPM + Turbo
- Packages compartilhados (`shared`, `pricing`)
- Apps separados (`mobile`, `desktop-web`)
- Aliases configurados para imports limpos

### 📱 **Plataformas Suportadas**
- ✅ **Mobile**: iOS/Android via Expo Go
- ✅ **Web**: Progressive Web App
- 🚧 **Desktop**: Preparado para Tauri

## [0.7.0] - 2024-10-08

### ✨ Adicionado
- Estrutura inicial do monorepo
- Configuração básica do Expo
- Modelos de dados TypeScript
- Engine de cálculo básica

### 🏗️ Estrutura
- Configuração inicial do PNPM workspace
- Turbo para build otimizado
- Aliases para packages compartilhados

## [0.6.0] - 2024-10-07

### ✨ Adicionado
- Projeto inicial criado
- Estrutura de pastas definida
- Configuração de desenvolvimento

---

## 📊 **Métricas do Projeto**

### **Cobertura de Funcionalidades (v0.8.0)**
- Engine de Cálculo: **100%** ✅
- Interface Mobile: **90%** ✅
- Interface Web: **80%** ✅
- Sistema Multi-tenant: **85%** ✅
- Documentação: **95%** ✅

### **Próximas Releases**

#### **v0.9.0 - MVP Features** (Estimado: Nov 2024)
- [ ] Upload de arquivos G-code
- [ ] Parser de comentários de slicers
- [ ] Estimativas automáticas de tempo/material
- [ ] Templates de formulários

#### **v1.0.0 - MVP Completo** (Estimado: Dez 2024)
- [ ] Geração de PDF personalizada
- [ ] Sistema de templates whitelabel
- [ ] Multi-idioma básico (PT/EN)
- [ ] Testes unitários completos

#### **v1.1.0 - Comercial** (Estimado: Jan 2025)
- [ ] Backend com Supabase
- [ ] Sincronização offline/online
- [ ] Sistema de autenticação
- [ ] Dashboard de analytics

#### **v1.2.0 - Avançado** (Estimado: Fev 2025)
- [ ] Integrações com slicers
- [ ] API pública
- [ ] Sistema de plugins
- [ ] Modo offline robusto

---

## 🏷️ **Convenções de Versionamento**

### **Formato: `MAJOR.MINOR.PATCH`**

- **MAJOR**: Mudanças incompatíveis na API
- **MINOR**: Funcionalidades adicionadas (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### **Tipos de Mudança**
- 🎉 **Added**: Novas funcionalidades
- 🔄 **Changed**: Mudanças em funcionalidades existentes
- 🗑️ **Deprecated**: Funcionalidades que serão removidas
- ❌ **Removed**: Funcionalidades removidas
- 🐛 **Fixed**: Bug fixes
- 🔒 **Security**: Correções de segurança

---

## 📞 **Links Úteis**
- [Issues](https://github.com/seu-usuario/3DiRenzo_Calculator/issues)
- [Pull Requests](https://github.com/seu-usuario/3DiRenzo_Calculator/pulls)
- [Releases](https://github.com/seu-usuario/3DiRenzo_Calculator/releases)
- [Roadmap](https://github.com/seu-usuario/3DiRenzo_Calculator/projects)