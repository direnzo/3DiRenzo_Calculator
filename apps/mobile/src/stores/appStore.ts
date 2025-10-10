import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Printer, Filament, Resin } from '@shared/models';

interface AppState {
  // Data
  printers: Printer[];
  filaments: Filament[];
  resins: Resin[];
  
  // Current tenant (for whitelabel)
  currentTenant: string;
  
  // UI State
  isLoading: boolean;
  
  // Actions
  addPrinter: (printer: Printer) => void;
  removePrinter: (id: string) => void;
  updatePrinter: (id: string, updates: Partial<Printer>) => void;
  
  addFilament: (filament: Filament) => void;
  removeFilament: (id: string) => void;
  updateFilament: (id: string, updates: Partial<Filament>) => void;
  
  addResin: (resin: Resin) => void;
  removeResin: (id: string) => void;
  updateResin: (id: string, updates: Partial<Resin>) => void;
  
  setCurrentTenant: (tenantId: string) => void;
  setLoading: (loading: boolean) => void;
  
  // Getters
  getPrintersByTenant: (tenantId?: string) => Printer[];
  getFilamentsByTenant: (tenantId?: string) => Filament[];
  getResinsByTenant: (tenantId?: string) => Resin[];
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      printers: [
        {
          id: 'p1',
          tenantId: 'default',
          name: 'Bambu A1',
          tech: 'FDM',
          powerW: 250,
          machineRate: 12,
          failRatePct: 5,
        },
        {
          id: 'p2',
          tenantId: 'default',
          name: 'Elegoo Mars 4',
          tech: 'MSLA',
          powerW: 45,
          machineRate: 8,
          failRatePct: 3,
        }
      ],
      filaments: [
        {
          id: 'f1',
          tenantId: 'default',
          name: 'PLA Premium',
          pricePerKg: 105,
          density: 1.24,
          diameterMm: 1.75,
        },
        {
          id: 'f2',
          tenantId: 'default',
          name: 'PETG',
          pricePerKg: 140,
          density: 1.27,
          diameterMm: 1.75,
        }
      ],
      resins: [
        {
          id: 'r1',
          tenantId: 'default',
          name: 'Resina Padrão',
          pricePerL: 180,
          densityGml: 1.1,
          lossPct: 15,
        }
      ],
      currentTenant: 'default',
      isLoading: false,
      
      // Actions
      addPrinter: (printer) =>
        set((state) => ({
          printers: [...state.printers, printer],
        })),
      
      removePrinter: (id) =>
        set((state) => ({
          printers: state.printers.filter((p) => p.id !== id),
        })),
      
      updatePrinter: (id, updates) =>
        set((state) => ({
          printers: state.printers.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      
      addFilament: (filament) =>
        set((state) => ({
          filaments: [...state.filaments, filament],
        })),
      
      removeFilament: (id) =>
        set((state) => ({
          filaments: state.filaments.filter((f) => f.id !== id),
        })),
      
      updateFilament: (id, updates) =>
        set((state) => ({
          filaments: state.filaments.map((f) =>
            f.id === id ? { ...f, ...updates } : f
          ),
        })),
      
      addResin: (resin) =>
        set((state) => ({
          resins: [...state.resins, resin],
        })),
      
      removeResin: (id) =>
        set((state) => ({
          resins: state.resins.filter((r) => r.id !== id),
        })),
      
      updateResin: (id, updates) =>
        set((state) => ({
          resins: state.resins.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),
      
      setCurrentTenant: (tenantId) =>
        set({ currentTenant: tenantId }),
      
      setLoading: (loading) =>
        set({ isLoading: loading }),
      
      // Getters
      getPrintersByTenant: (tenantId) => {
        const tenant = tenantId || get().currentTenant;
        return get().printers.filter((p) => p.tenantId === tenant);
      },
      
      getFilamentsByTenant: (tenantId) => {
        const tenant = tenantId || get().currentTenant;
        return get().filaments.filter((f) => f.tenantId === tenant);
      },
      
      getResinsByTenant: (tenantId) => {
        const tenant = tenantId || get().currentTenant;
        return get().resins.filter((r) => r.tenantId === tenant);
      },
    }),
    {
      name: '3dquote-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);