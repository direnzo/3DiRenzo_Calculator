import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useAppStore } from '../src/stores/appStore';

export default function QuotePage() {
  const { getPrintersByTenant, getFilamentsByTenant, getResinsByTenant } = useAppStore();
  
  const printers = getPrintersByTenant();
  const filaments = getFilamentsByTenant();
  const resins = getResinsByTenant();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚧 Orçamento Detalhado</Text>
      <Text style={styles.subtitle}>Próxima atualização</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{printers.length}</Text>
          <Text style={styles.statLabel}>Impressoras</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{filaments.length}</Text>
          <Text style={styles.statLabel}>Filamentos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{resins.length}</Text>
          <Text style={styles.statLabel}>Resinas</Text>
        </View>
      </View>
      
      <Text style={styles.description}>
        🎯 Recursos implementados:
        {'\n'}✅ Expo Router (navegação moderna)
        {'\n'}✅ Zustand (estado global)
        {'\n'}✅ Arquitetura monorepo
        {'\n'}✅ Engine de cálculo FDM/MSLA
        {'\n'}✅ Multi-tenant ready
        {'\n'}
        {'\n'}🚀 Próximos passos:
        {'\n'}• Formulário completo com React Hook Form
        {'\n'}• Seleção de impressoras e materiais
        {'\n'}• Upload de arquivos STL
        {'\n'}• Geração de PDF
        {'\n'}• NativeWind (Tailwind CSS)
      </Text>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>← Voltar para Calculadora</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 32,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#5d6d7e',
    textAlign: 'left',
    lineHeight: 22,
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});