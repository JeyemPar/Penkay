'use client';

import { CheckCircle2, Droplets, Eye, FileQuestion, Leaf, MapPinned, ShieldCheck, Trees } from 'lucide-react';
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

export default function GreenBankPage() {
  return (
    <AppShell
      active="GreenBank"
      eyebrow="GreenBank"
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
          <Card className="surface-card">
            <CardHeader><p className="eyebrow">Parcela El Mirador</p><CardTitle className="surface-title">Cobertura y agua</CardTitle></CardHeader>
            <CardContent>
              <div className="soil-list">
                <div className="soil-row"><div><strong>Cobertura vegetal</strong><p className="source-tag">Drone</p></div><strong>74%</strong></div>
                <div className="soil-row"><div><strong>Retención hídrica</strong><p className="source-tag">Estimado</p></div><strong>Media</strong></div>
                <div className="soil-row"><div><strong>Riesgo de erosión</strong><p className="source-tag">Observado</p></div><strong>Bajo</strong></div>
              </div>
              <div className="status-callout"><Droplets /> Próxima medición: 18 sep</div>
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
