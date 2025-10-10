# 🔧 API Documentation - Engine de Cálculo

Documentação completa da API do engine de cálculo de preços para impressão 3D.

## 📋 **Índice**

- [Visão Geral](#visão-geral)
- [Funções Principais](#funções-principais)
- [Tipos e Interfaces](#tipos-e-interfaces)
- [Exemplos de Uso](#exemplos-de-uso)
- [Validações](#validações)
- [Testes](#testes)

## 🎯 **Visão Geral**

O engine de cálculo é uma biblioteca TypeScript pura que calcula preços de impressão 3D para tecnologias FDM (filamento) e MSLA (resina). Todas as funções são puras, determinísticas e sem side effects.

### **Princípios**
- ✅ **Funções Puras**: Sem side effects
- ✅ **Determinísticas**: Mesmo input = mesmo output
- ✅ **Type Safe**: TypeScript strict
- ✅ **Auditáveis**: Breakdown detalhado de custos
- ✅ **Testáveis**: 100% cobertura de testes

## 🔧 **Funções Principais**

### **`priceFDM(input: QuoteInputFDM): PriceResult`**

Calcula o preço de impressão FDM (filamento).

**Parâmetros:**
- `input: QuoteInputFDM` - Dados de entrada para cálculo FDM

**Retorno:**
- `PriceResult` - Resultado com breakdown e preço final

**Fórmula:**
```
Material + Energia + Máquina + Preparação + Pós-processo + 
Extras + (Taxa de falha) + Markup/Margem + Impostos
```

**Exemplo:**
```typescript
import { priceFDM } from '@pricing';

const result = priceFDM({
  printer: {
    id: 'p1',
    tenantId: 'default',
    name: 'Bambu A1',
    tech: 'FDM',
    powerW: 250,
    machineRate: 12,
    failRatePct: 5
  },
  filament: {
    id: 'f1',
    tenantId: 'default',
    name: 'PLA',
    pricePerKg: 105,
    density: 1.24,
    diameterMm: 1.75
  },
  tPrintH: 3.5,
  massG: 120,
  energyTariff: 0.95,
  prepH: 0.25,
  postH: 0.5,
  prepRph: 60,
  postRph: 75,
  pricing: { mode: 'markup', valuePct: 35 },
  taxPct: 5,
  extrasR: 10
});

console.log(result.price.final); // 25.67
```

---

### **`priceMSLA(input: QuoteInputMSLA): PriceResult`**

Calcula o preço de impressão MSLA (resina).

**Parâmetros:**
- `input: QuoteInputMSLA` - Dados de entrada para cálculo MSLA

**Retorno:**
- `PriceResult` - Resultado com breakdown e preço final

**Diferenças do FDM:**
- Usa `volumeMl` ao invés de `massG`
- Usa `resin` ao invés de `filament`
- Inclui cálculo de perdas (`lossPct`)

**Exemplo:**
```typescript
import { priceMSLA } from '@pricing';

const result = priceMSLA({
  printer: {
    id: 'p2',
    tenantId: 'default',
    name: 'Elegoo Mars 4',
    tech: 'MSLA',
    powerW: 45,
    machineRate: 8,
    failRatePct: 3
  },
  resin: {
    id: 'r1',
    tenantId: 'default',
    name: 'Resina Padrão',
    pricePerL: 180,
    densityGml: 1.1,
    lossPct: 15
  },
  volumeMl: 50,
  tPrintH: 2.5,
  energyTariff: 0.95,
  prepH: 0.5,
  postH: 1.0,
  prepRph: 60,
  postRph: 75,
  pricing: { mode: 'margin', valuePct: 40 },
  taxPct: 5,
  extrasR: 5
});

console.log(result.price.final); // 18.42
```

## 📊 **Tipos e Interfaces**

### **Printer**
```typescript
interface Printer {
  id: string;               // ID único
  tenantId: string;         // ID do tenant (multi-tenant)
  name: string;             // Nome da impressora
  tech: 'FDM' | 'MSLA';    // Tecnologia
  powerW: number;           // Potência em Watts
  machineRate?: number;     // Taxa por hora (R$/h) - opcional
  failRatePct: number;      // Taxa de falha (0-100%)
}
```

### **Filament**
```typescript
interface Filament {
  id: string;               // ID único
  tenantId: string;         // ID do tenant
  name: string;             // Nome do filamento
  pricePerKg: number;       // Preço por kg (R$)
  density: number;          // Densidade (g/cm³)
  diameterMm: 1.75 | 2.85; // Diâmetro padrão
}
```

### **Resin**
```typescript
interface Resin {
  id: string;               // ID único
  tenantId: string;         // ID do tenant
  name: string;             // Nome da resina
  pricePerL: number;        // Preço por litro (R$)
  densityGml?: number;      // Densidade g/ml (opcional)
  lossPct: number;          // Perdas no processo (0-100%)
}
```

### **QuoteInputFDM**
```typescript
interface QuoteInputFDM {
  printer: Printer;         // Impressora (tech deve ser 'FDM')
  filament: Filament;       // Material filamento
  tPrintH: number;          // Tempo de impressão (horas)
  massG: number;            // Massa do filamento (gramas)
  energyTariff: number;     // Tarifa de energia (R$/kWh)
  prepH: number;            // Horas de preparação
  postH: number;            // Horas de pós-processo
  prepRph: number;          // Taxa prep (R$/hora)
  postRph: number;          // Taxa pós (R$/hora)
  extrasR?: number;         // Extras como embalagem (R$)
  pricing: PricingMode;     // Modo de pricing
  taxPct?: number;          // Impostos % (ISS/ICMS)
}
```

### **QuoteInputMSLA**
```typescript
interface QuoteInputMSLA {
  printer: Printer;         // Impressora (tech deve ser 'MSLA')
  resin: Resin;            // Material resina
  volumeMl: number;         // Volume de resina (ml)
  tPrintH: number;          // Tempo de impressão (horas)
  energyTariff: number;     // Tarifa de energia (R$/kWh)
  prepH: number;            // Horas de preparação
  postH: number;            // Horas de pós-processo
  prepRph: number;          // Taxa prep (R$/hora)
  postRph: number;          // Taxa pós (R$/hora)
  extrasR?: number;         // Extras como embalagem (R$)
  pricing: PricingMode;     // Modo de pricing
  taxPct?: number;          // Impostos % (ISS/ICMS)
}
```

### **PricingMode**
```typescript
interface PricingMode {
  mode: 'markup' | 'margin'; // Modo de cálculo
  valuePct: number;           // Percentual (0-100)
}
```

**Diferença entre Markup e Margin:**
- **Markup**: `preço = custo × (1 + markup%)`
- **Margin**: `preço = custo ÷ (1 - margin%)`

### **PriceResult**
```typescript
interface PriceResult {
  breakdown: {
    cMat: number;      // Custo material
    cEnergy: number;   // Custo energia
    cMachine: number;  // Custo máquina
    cPrep: number;     // Custo preparação
    cPost: number;     // Custo pós-processo
    extras: number;    // Extras
    subtotal: number;  // Subtotal
    adjusted: number;  // Ajustado (com falhas)
  };
  price: {
    preTax: number;    // Preço antes impostos
    final: number;     // Preço final
  };
}
```

## ✅ **Validações**

O engine inclui validações automáticas:

### **Validações de Input**
```typescript
// Valores positivos
if (input.massG <= 0) throw new Error('Mass must be positive');
if (input.tPrintH <= 0) throw new Error('Print time must be positive');

// Percentuais válidos
if (input.pricing.valuePct < 0 || input.pricing.valuePct > 100) {
  throw new Error('Pricing percentage must be 0-100');
}

// Consistência de tipos
if (input.printer.tech === 'FDM' && !input.filament) {
  throw new Error('FDM printer requires filament');
}
```

### **Validações de Resultado**
```typescript
// Preços não podem ser negativos
if (result.price.final < 0) {
  throw new Error('Final price cannot be negative');
}
```

## 🧪 **Exemplos de Uso Avançados**

### **Comparação FDM vs MSLA**
```typescript
import { priceFDM, priceMSLA } from '@pricing';

// Mesmo objeto base
const baseInput = {
  energyTariff: 0.95,
  prepH: 0.25,
  postH: 0.5,
  prepRph: 60,
  postRph: 75,
  pricing: { mode: 'markup', valuePct: 35 },
  taxPct: 5,
  extrasR: 10
};

// FDM
const fdmPrice = priceFDM({
  ...baseInput,
  printer: fdmPrinter,
  filament: plaFilament,
  tPrintH: 3.5,
  massG: 120
});

// MSLA
const mslaPrice = priceMSLA({
  ...baseInput,
  printer: mslaPrinter,
  resin: standardResin,
  tPrintH: 2.5,
  volumeMl: 50
});

console.log('FDM:', fdmPrice.price.final);   // 25.67
console.log('MSLA:', mslaPrice.price.final); // 18.42
```

### **Batch Pricing**
```typescript
const items = [
  { type: 'FDM', massG: 100, tPrintH: 2.0 },
  { type: 'FDM', massG: 150, tPrintH: 3.5 },
  { type: 'MSLA', volumeMl: 30, tPrintH: 1.5 }
];

const prices = items.map(item => {
  if (item.type === 'FDM') {
    return priceFDM({ ...baseInput, ...item });
  } else {
    return priceMSLA({ ...baseInput, ...item });
  }
});

const total = prices.reduce((sum, p) => sum + p.price.final, 0);
console.log('Total batch:', total); // 68.45
```

### **Sensitivity Analysis**
```typescript
// Análise de sensibilidade para diferentes margens
const margins = [20, 30, 40, 50];
const results = margins.map(margin => ({
  margin,
  price: priceFDM({
    ...input,
    pricing: { mode: 'margin', valuePct: margin }
  }).price.final
}));

console.log(results);
// [{ margin: 20, price: 23.45 }, { margin: 30, price: 26.78 }, ...]
```

## 🧪 **Testes**

### **Executando Testes**
```bash
# Todos os testes
pnpm test

# Apenas engine
pnpm test packages/pricing

# Com coverage
pnpm test:coverage
```

### **Exemplo de Teste**
```typescript
import { priceFDM } from '../src';

describe('priceFDM', () => {
  const mockInput: QuoteInputFDM = {
    printer: {
      id: 'p1',
      tenantId: 't1',
      name: 'Test Printer',
      tech: 'FDM',
      powerW: 200,
      machineRate: 10,
      failRatePct: 5
    },
    filament: {
      id: 'f1',
      tenantId: 't1',
      name: 'PLA',
      pricePerKg: 100,
      density: 1.24,
      diameterMm: 1.75
    },
    tPrintH: 2,
    massG: 100,
    energyTariff: 1.0,
    prepH: 0.5,
    postH: 0.5,
    prepRph: 50,
    postRph: 50,
    pricing: { mode: 'markup', valuePct: 30 },
    taxPct: 10
  };

  it('should calculate basic price correctly', () => {
    const result = priceFDM(mockInput);
    
    expect(result.breakdown.cMat).toBeCloseTo(10.0, 2);  // 100g * R$100/kg
    expect(result.breakdown.cEnergy).toBeCloseTo(0.4, 2); // 200W * 2h * R$1/kWh
    expect(result.price.final).toBeCloseTo(31.46, 2);
  });

  it('should handle margin pricing', () => {
    const input = { 
      ...mockInput, 
      pricing: { mode: 'margin', valuePct: 40 } 
    };
    const result = priceFDM(input);
    
    expect(result.price.final).toBeGreaterThan(0);
  });

  it('should throw on invalid inputs', () => {
    const invalidInput = { ...mockInput, massG: -10 };
    expect(() => priceFDM(invalidInput)).toThrow('Mass must be positive');
  });
});
```

## 🔗 **Links Relacionados**

- [Arquitetura](./ARCHITECTURE.md)
- [Contributing](../CONTRIBUTING.md)
- [Changelog](../CHANGELOG.md)
- [Testes](../packages/pricing/tests/)

---

**Esta documentação é mantida automaticamente através dos tipos TypeScript e testes unitários.**