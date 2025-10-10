
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { priceFDM } from '@pricing'
import type { QuoteInputFDM, Printer, Filament } from '@shared/models'

const printer: Printer = { id:'p1', tenantId:'t1', name:'Bambu A1', tech:'FDM', powerW:250, machineRate:12, failRatePct:5 }
const filament: Filament = { id:'f1', tenantId:'t1', name:'PLA', pricePerKg:105, density:1.24, diameterMm:1.75 }

function App() {
  const [massG, setMassG] = useState('120')
  const [hours, setHours] = useState('3.5')
  const [result, setResult] = useState<any>(null)

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
    }
    setResult(priceFDM(input))
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16, maxWidth: 720 }}>
      <h2>Orçamento rápido (FDM) – Desktop</h2>
      <label>Massa (g){' '}
        <input value={massG} onChange={e=>setMassG(e.target.value)} />
      </label>
      <br/>
      <label>Tempo (h){' '}
        <input value={hours} onChange={e=>setHours(e.target.value)} />
      </label>
      <br/>
      <button onClick={calc} style={{ marginTop: 8 }}>Calcular</button>

      {result && (
        <div style={{ marginTop: 16 }}>
          <h3>Resumo</h3>
          <div>Material: R$ {result.breakdown.cMat.toFixed(2)}</div>
          <div>Energia: R$ {result.breakdown.cEnergy.toFixed(2)}</div>
          <div>Prep: R$ {result.breakdown.cPrep.toFixed(2)}</div>
          <div>Pós: R$ {result.breakdown.cPost.toFixed(2)}</div>
          <div>Subtotal: R$ {result.breakdown.subtotal.toFixed(2)}</div>
          <div>Ajustado: R$ {result.breakdown.adjusted.toFixed(2)}</div>
          <h3>Preço final: R$ {result.price.final.toFixed(2)}</h3>
        </div>
      )}
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App/>)
