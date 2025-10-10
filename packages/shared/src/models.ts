
export type Tech = 'FDM' | 'MSLA';

export interface Printer {
  id: string;
  tenantId: string;
  name: string;
  tech: Tech;
  powerW: number;          // potência média (W)
  machineRate?: number;    // R$/h (opcional)
  failRatePct: number;     // %
}

export interface Filament {
  id: string;
  tenantId: string;
  name: string;
  pricePerKg: number;      // R$/kg
  density: number;         // g/cm3 (PLA ~1.24)
  diameterMm: 1.75 | 2.85;
}

export interface Resin {
  id: string;
  tenantId: string;
  name: string;
  pricePerL: number;       // R$/L
  densityGml?: number;     // opcional
  lossPct: number;         // perdas (%)
}

export interface QuoteInputFDM {
  printer: Printer;
  filament: Filament;
  tPrintH: number;         // horas (do gcode ou manual)
  massG: number;           // g (do gcode ou manual)
  energyTariff: number;    // R$/kWh
  prepH: number;           // horas
  postH: number;           // horas
  prepRph: number;         // R$/h
  postRph: number;         // R$/h
  extrasR?: number;        // embalagem, etc.
  pricing: { mode: 'markup'|'margin'; valuePct: number; };
  taxPct?: number;         // ISS/ICMS
}

export interface QuoteInputMSLA {
  printer: Printer;
  resin: Resin;
  volumeMl: number;
  tPrintH: number;
  energyTariff: number;
  prepH: number;
  postH: number;
  prepRph: number;
  postRph: number;
  extrasR?: number;
  pricing: { mode: 'markup'|'margin'; valuePct: number; };
  taxPct?: number;
}
