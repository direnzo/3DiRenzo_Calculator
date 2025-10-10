
import { QuoteInputFDM, QuoteInputMSLA } from '@shared/models';

export function priceFDM(i: QuoteInputFDM) {
  const cMat = (i.massG/1000) * i.filament.pricePerKg;
  const cEnergy = (i.printer.powerW/1000) * i.tPrintH * i.energyTariff;
  const cMachine = (i.printer.machineRate ?? 0) * i.tPrintH;
  const cPrep = i.prepH * i.prepRph;
  const cPost = i.postH * i.postRph;
  const extras = i.extrasR ?? 0;

  const subtotal = cMat + cEnergy + cMachine + cPrep + cPost + extras;
  const adjusted = subtotal * (1 + (i.printer.failRatePct/100));
  const preTax = i.pricing.mode === 'markup'
    ? adjusted * (1 + i.pricing.valuePct/100)
    : adjusted / (1 - i.pricing.valuePct/100);

  const taxPct = i.taxPct ?? 0;
  const finalPrice = preTax * (1 + taxPct/100);

  return {
    breakdown: { cMat, cEnergy, cMachine, cPrep, cPost, extras, subtotal, adjusted },
    price: { preTax, final: finalPrice }
  };
}

export function priceMSLA(i: QuoteInputMSLA) {
  const cMat = (i.volumeMl/1000) * i.resin.pricePerL * (1 + i.resin.lossPct/100);
  const cEnergy = (i.printer.powerW/1000) * i.tPrintH * i.energyTariff;
  const cMachine = (i.printer.machineRate ?? 0) * i.tPrintH;
  const cPrep = i.prepH * i.prepRph;
  const cPost = i.postH * i.postRph;
  const extras = i.extrasR ?? 0;

  const subtotal = cMat + cEnergy + cMachine + cPrep + cPost + extras;
  const adjusted = subtotal * (1 + (i.printer.failRatePct/100));
  const preTax = i.pricing.mode === 'markup'
    ? adjusted * (1 + i.pricing.valuePct/100)
    : adjusted / (1 - i.pricing.valuePct/100);

  const finalPrice = preTax * (1 + (i.taxPct ?? 0)/100);

  return {
    breakdown: { cMat, cEnergy, cMachine, cPrep, cPost, extras, subtotal, adjusted },
    price: { preTax, final: finalPrice }
  };
}
