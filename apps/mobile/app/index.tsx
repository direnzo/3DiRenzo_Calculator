import { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { priceFDM } from '@pricing';
import { useAppStore } from '../src/stores/appStore';
import type { QuoteInputFDM } from '@shared/models';

export default function HomePage() {
  const [massG, setMassG] = useState('120');
  const [hours, setHours] = useState('3.5');
  const [result, setResult] = useState<any>(null);
  
  const { getPrintersByTenant, getFilamentsByTenant } = useAppStore();
  
  // Get first printer and filament for demo
  const printers = getPrintersByTenant();
  const filaments = getFilamentsByTenant();
  const printer = printers[0];
  const filament = filaments[0];

  const calc = () => {
    if (!printer || !filament) return;
    
    const input: QuoteInputFDM = {
      printer,
      filament,
      tPrintH: parseFloat(hours),
      massG: parseFloat(massG),
      energyTariff: 0.95,
      prepH: 0.25,
      postH: 0.5,
      prepRph: 60,
      postRph: 75,
      pricing: { mode: 'markup', valuePct: 35 },
      taxPct: 5,
      extrasR: 10
    };
    setResult(priceFDM(input));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>🎯 Calculadora 3D</Text>
          <Text style={styles.subtitle}>
            Orçamento rápido para impressão FDM {'\n'}
            📱 Com Expo Router + Zustand modernos
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Massa do filamento (g)</Text>
            <TextInput 
              value={massG} 
              onChangeText={setMassG} 
              keyboardType="numeric"
              style={styles.input}
              placeholder="120"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tempo de impressão (h)</Text>
            <TextInput 
              value={hours} 
              onChangeText={setHours} 
              keyboardType="numeric"
              style={styles.input}
              placeholder="3.5"
            />
          </View>

          <TouchableOpacity onPress={calc} style={styles.button}>
            <Text style={styles.buttonText}>💰 Calcular Preço</Text>
          </TouchableOpacity>

          {result && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>📊 Breakdown de Custos</Text>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Material:</Text>
                <Text style={styles.resultValue}>R$ {result.breakdown.cMat.toFixed(2)}</Text>
              </View>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Energia:</Text>
                <Text style={styles.resultValue}>R$ {result.breakdown.cEnergy.toFixed(2)}</Text>
              </View>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Preparação:</Text>
                <Text style={styles.resultValue}>R$ {result.breakdown.cPrep.toFixed(2)}</Text>
              </View>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Pós-processamento:</Text>
                <Text style={styles.resultValue}>R$ {result.breakdown.cPost.toFixed(2)}</Text>
              </View>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Subtotal:</Text>
                <Text style={styles.resultValue}>R$ {result.breakdown.subtotal.toFixed(2)}</Text>
              </View>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Ajustado (falhas):</Text>
                <Text style={styles.resultValue}>R$ {result.breakdown.adjusted.toFixed(2)}</Text>
              </View>
              
              <View style={styles.finalPriceRow}>
                <Text style={styles.finalPriceLabel}>💰 Preço Final:</Text>
                <Text style={styles.finalPriceValue}>R$ {result.price.final.toFixed(2)}</Text>
              </View>
            </View>
          )}

          <Link href="/quote" asChild>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>➕ Novo Orçamento Detalhado</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 24,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  resultLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  finalPriceRow: {
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  finalPriceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#15803d',
  },
  finalPriceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#15803d',
  },
  secondaryButton: {
    backgroundColor: '#6b7280',
    borderRadius: 12,
    paddingVertical: 16,
  },
  secondaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});