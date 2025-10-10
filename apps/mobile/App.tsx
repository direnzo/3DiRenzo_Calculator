
import { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, ScrollView } from 'react-native';
import { priceFDM } from '@pricing';
import type { QuoteInputFDM, Printer, Filament } from '@shared/models';

const printer: Printer = {
  id: 'p1', tenantId: 't1', name: 'Bambu A1', tech: 'FDM', powerW: 250, machineRate: 12, failRatePct: 5
};
const filament: Filament = {
  id: 'f1', tenantId: 't1', name: 'PLA', pricePerKg: 105, density: 1.24, diameterMm: 1.75
};

export default function App() {
  const [massG, setMassG] = useState('120');
  const [hours, setHours] = useState('3.5');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    const input: QuoteInputFDM = {
      printer, filament,
      tPrintH: parseFloat(hours),
      massG: parseFloat(massG),
      energyTariff: 0.95,
      prepH: 0.25, postH: 0.5,
      prepRph: 60, postRph: 75,
      pricing: { mode: 'markup', valuePct: 35 },
      taxPct: 5,
      extrasR: 10
    };
    setResult(priceFDM(input));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Orçamento rápido (FDM)</Text>

        <Text style={{ marginTop: 12 }}>Massa do filamento (g)</Text>
        <TextInput value={massG} onChangeText={setMassG} keyboardType="numeric"
          style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />

        <Text style={{ marginTop: 12 }}>Tempo de impressão (h)</Text>
        <TextInput value={hours} onChangeText={setHours} keyboardType="numeric"
          style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />

        <View style={{ marginTop: 12 }}>
          <Button title="Calcular" onPress={calc} />
        </View>

        {result && (
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontWeight: 'bold' }}>Resumo</Text>
            <Text>Material: R$ {result.breakdown.cMat.toFixed(2)}</Text>
            <Text>Energia: R$ {result.breakdown.cEnergy.toFixed(2)}</Text>
            <Text>Prep: R$ {result.breakdown.cPrep.toFixed(2)}</Text>
            <Text>Pós: R$ {result.breakdown.cPost.toFixed(2)}</Text>
            <Text>Subtotal: R$ {result.breakdown.subtotal.toFixed(2)}</Text>
            <Text>Ajustado: R$ {result.breakdown.adjusted.toFixed(2)}</Text>
            <Text style={{ marginTop: 8, fontSize: 16 }}>Preço final: R$ {result.price.final.toFixed(2)}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
