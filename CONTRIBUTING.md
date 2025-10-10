# 🤝 Contributing to 3DiRenzo Calculator

Obrigado por considerar contribuir com o 3DiRenzo Calculator! Este documento fornece diretrizes e informações para contribuidores.

## 📋 **Índice**

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração de Desenvolvimento](#configuração-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Testes](#testes)
- [Pull Requests](#pull-requests)

## 🤝 **Código de Conduta**

Este projeto adere ao [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você deve seguir essas diretrizes.

## 🚀 **Como Contribuir**

### **Tipos de Contribuição**

- 🐛 **Bug Reports**: Relate problemas encontrados
- 💡 **Feature Requests**: Sugira novas funcionalidades
- 📖 **Documentação**: Melhore a documentação
- 🔧 **Código**: Implemente features ou correções
- 🎨 **Design**: Melhore UI/UX
- 🧪 **Testes**: Adicione ou melhore testes

### **Reportando Bugs**

1. Verifique se o bug já foi reportado nas [Issues](https://github.com/seu-usuario/3DiRenzo_Calculator/issues)
2. Use o template de bug report
3. Inclua informações detalhadas:
   - Versão do sistema operacional
   - Versão do Node.js e PNPM
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots se aplicável

### **Sugerindo Features**

1. Verifique se a feature já foi sugerida
2. Use o template de feature request
3. Descreva claramente:
   - Problema que resolve
   - Solução proposta
   - Alternativas consideradas
   - Impacto nos usuários

## 🛠️ **Configuração de Desenvolvimento**

### **Pré-requisitos**
```bash
Node.js >= 20.0.0
PNPM >= 9.0.0
Git
```

### **Setup Local**
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/3DiRenzo_Calculator.git
cd 3DiRenzo_Calculator

# Instale dependências
pnpm install

# Verifique se tudo está funcionando
pnpm type-check
pnpm dev:mobile
```

### **Estrutura de Branches**
- `main`: Código estável de produção
- `develop`: Código em desenvolvimento
- `feature/nome-da-feature`: Novas funcionalidades
- `bugfix/nome-do-bug`: Correções de bugs
- `docs/nome-da-doc`: Melhorias na documentação

## 📝 **Padrões de Código**

### **TypeScript**
- Use TypeScript strict
- Defina tipos explícitos para APIs públicas
- Evite `any`, prefira `unknown`
- Use interfaces para objetos complexos

```typescript
// ✅ Bom
interface PrinterConfig {
  name: string;
  powerW: number;
  failRatePct: number;
}

// ❌ Evitar
const config: any = { ... };
```

### **Nomenclatura**
- **Arquivos**: kebab-case (`printer-config.ts`)
- **Componentes**: PascalCase (`PrinterCard.tsx`)
- **Funções**: camelCase (`calculatePrice`)
- **Constantes**: UPPER_SNAKE_CASE (`DEFAULT_POWER_W`)

### **Estrutura de Components React**
```typescript
// Template padrão para componentes
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
}

export function ComponentName({ title, onPress }: Props) {
  const [state, setState] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

### **Engine de Cálculo**
- Funções puras sem side effects
- Comentários explicando fórmulas
- Testes unitários obrigatórios
- Validação de inputs

```typescript
/**
 * Calcula preço de impressão FDM
 * Fórmula: Material + Energia + Máquina + Prep + Pós + Extras + Falhas + Markup + Impostos
 */
export function priceFDM(input: QuoteInputFDM): PriceResult {
  // Validação
  if (input.massG <= 0) throw new Error('Mass must be positive');
  
  // Cálculos
  const cMat = (input.massG / 1000) * input.filament.pricePerKg;
  // ...
}
```

## 🏗️ **Estrutura do Projeto**

### **Packages**
- `packages/shared`: Types e modelos compartilhados
- `packages/pricing`: Engine de cálculo pura
- `apps/mobile`: App React Native + Expo
- `apps/desktop-web`: App Web + Vite

### **Convenções de Diretório**
```
src/
├── components/     # Componentes reutilizáveis
├── screens/        # Telas/páginas
├── stores/        # Zustand stores
├── utils/         # Funções utilitárias
├── types/         # Tipos TypeScript específicos
└── constants/     # Constantes da aplicação
```

## 🧪 **Testes**

### **Estratégia de Testes**
1. **Unit Tests**: Engine de cálculo (obrigatório)
2. **Integration Tests**: Stores e APIs
3. **E2E Tests**: Fluxos críticos

### **Executando Testes**
```bash
# Todos os testes
pnpm test

# Testes específicos
pnpm test:unit
pnpm test:integration

# Coverage
pnpm test:coverage
```

### **Exemplo de Teste**
```typescript
import { priceFDM } from '../pricing';

describe('priceFDM', () => {
  it('should calculate basic FDM price correctly', () => {
    const input = {
      printer: mockPrinter,
      filament: mockFilament,
      massG: 100,
      tPrintH: 2,
      // ...
    };

    const result = priceFDM(input);
    
    expect(result.price.final).toBeCloseTo(25.50, 2);
  });
});
```

## 📬 **Pull Requests**

### **Antes de Submeter**
1. Fork o repositório
2. Crie uma branch a partir de `develop`
3. Faça suas alterações
4. Execute testes: `pnpm test`
5. Execute type-check: `pnpm type-check`
6. Atualize documentação se necessário

### **Template de PR**
```markdown
## 📝 Descrição
Breve descrição das mudanças

## 🔄 Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## ✅ Checklist
- [ ] Código segue os padrões do projeto
- [ ] Self-review realizado
- [ ] Comentários adicionados em código complexo
- [ ] Documentação atualizada
- [ ] Testes adicionados/atualizados
- [ ] Testes passando
```

### **Review Process**
1. PR automático executa CI/CD
2. Review por pelo menos 1 maintainer
3. Testes devem passar
4. Coverage não pode diminuir
5. Squash and merge

## 🎯 **Áreas de Contribuição**

### **🔥 High Priority**
- Upload e parsing de G-code
- Geração de PDF
- Sistema de templates
- Testes unitários

### **📊 Medium Priority**
- Multi-idioma
- Melhorias de UI/UX
- Performance optimizations
- Documentação

### **💡 Nice to Have**
- Integrações com slicers
- Sistema de plugins
- Analytics
- Modo offline avançado

## 📞 **Dúvidas?**

- 💬 **Discord**: [Link do servidor]
- 📧 **Email**: desenvolvimento@3direnzo.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/3DiRenzo_Calculator/issues)

---

**Obrigado por contribuir! 🚀**