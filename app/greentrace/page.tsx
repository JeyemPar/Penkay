'use client';

import { CheckCircle2, Droplets, Eye, FileQuestion, Leaf, MapPinned, ShieldCheck, Trees, Mountain, SatelliteDish } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import { AppShell } from '@/components/penkay/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const indicators = [
  { label: 'Hectáreas monitoreadas', value: '380 ha', source: 'Medido', icon: MapPinned },
  { label: 'Área conservada', value: '86 ha', source: 'Observado', icon: Trees },
  { label: 'Parcelas verificadas', value: '214', source: 'Medido', icon: ShieldCheck },
  { label: 'Carbono potencial', value: '23–31 tCO₂e', source: 'Estimado', icon: Leaf, estimated: true },
];

export default function GreenTracePage() {
  return (
    <AppShell
      active="GreenTrace"
      eyebrow="GreenTrace"
      title="Evidencia ambiental, sin promesas vacías"
      description="Indicadores del escenario piloto. Cada valor señala si fue medido, observado o estimado."
      action={<Button variant="outline"><FileQuestion /> Ver metodología</Button>}
    >
      <section className="environment-metrics" aria-label="Indicadores ambientales">
        {indicators.map((indicator) => {
          const Icon = indicator.icon;
          return (
            <Card className="summary-card" key={indicator.label}>
              <CardContent>
                <div className="detail-icon"><Icon /></div>
                <p className="mt-4">{indicator.label}</p>
                <strong>{indicator.value}</strong>
                <span className={`evidence-pill ${indicator.estimated ? 'estimated' : ''}`}>
                  {indicator.estimated ? <Eye /> : <CheckCircle2 />} {indicator.source}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <div className="workspace-grid mt-4">
        <section className="passport">
          <header className="passport-header">
            <div><p className="eyebrow">Penkay</p><h2>Pasaporte ambiental</h2></div>
            <span>PN-EC-CAR-000123</span>
          </header>
          <div className="passport-body">
            <div className="passport-values">
              <div><span>Parcela</span><strong>El Mirador</strong></div>
              <div><span>Superficie</span><strong>2,4 ha</strong></div>
              <div><span>Plantas</span><strong>1.420</strong></div>
              <div><span>Supervivencia</span><strong>92%</strong></div>
              <div><span>Área conservada</span><strong>0,7 ha</strong></div>
              <div><span>Monitoreo drone</span><strong>Sí · 17 jun 2026</strong></div>
              <div><span>Carbono</span><strong>23–31 tCO₂e estimado</strong></div>
              <div><span>Nivel de confianza</span><strong>Medio</strong></div>
            </div>
            <div className="passport-qr">
              <QRCodeSVG value="https://penkay.ec/pasaporte/PN-EC-CAR-000123" size={145} level="M" marginSize={1} />
              <span>Escanea para verificar la trazabilidad</span>
            </div>
          </div>
        </section>

        <aside className="workspace-stack">
          <Card className="surface-card border-green-200">
            <CardHeader className="bg-green-50/50 rounded-t-lg">
              <div className="flex items-center gap-2 mb-1">
                <SatelliteDish className="size-4 text-green-700" />
                <p className="eyebrow !mb-0 text-green-800">Copernicus Sentinel Hub</p>
              </div>
              <CardTitle className="surface-title">Estado del Suelo y Planta</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="soil-list space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <strong className="flex items-center gap-2"><Droplets className="size-4 text-blue-500"/> Humedad</strong>
                    <p className="text-xs text-muted-foreground mt-1">Índice SAR (S-1): 0.28</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Atención</Badge>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <strong className="flex items-center gap-2"><Leaf className="size-4 text-green-500"/> Cobertura</strong>
                    <p className="text-xs text-muted-foreground mt-1">NDVI Promedio (S-2): 0.75</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Bueno</Badge>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <strong className="flex items-center gap-2"><Mountain className="size-4 text-orange-500"/> Erosión</strong>
                    <p className="text-xs text-muted-foreground mt-1">DEM Slope: 15%</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Bueno</Badge>
                </div>
              </div>
              <div className="status-callout border-green-100 bg-green-50 text-green-800 mt-4">
                <ShieldCheck className="text-green-600" /> Datos validados para Pasaporte Ambiental
              </div>
            </CardContent>
          </Card>
          <Card className="surface-card">
            <CardHeader><CardTitle className="surface-title">Nota de transparencia</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-6 text-muted-foreground">El carbono mostrado es una estimación demostrativa. No representa un crédito certificado ni verificado.</p></CardContent>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
