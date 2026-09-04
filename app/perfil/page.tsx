'use client';

import { useEffect, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  CircleGauge,
  Download,
  FileBarChart,
  FileClock,
  FileText,
  FlaskConical,
  Leaf,
  MapPinned,
  Printer,
  Sprout,
} from 'lucide-react';

import { AppShell } from '@/components/penkay/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { producerMetrics, timeline } from '@/lib/demo-data';

const reportTypes = [
  { id: 'productivo', label: 'Productivo', icon: FileBarChart },
  { id: 'ambiental', label: 'Ambiental', icon: Leaf },
  { id: 'parcela', label: 'Parcela', icon: MapPinned },
  { id: 'cronologico', label: 'Cronológico', icon: FileClock },
];

type ModelContextLike = {
  registerTool: (
    tool: {
      name: string;
      title: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
      execute: (input: unknown) => unknown;
    },
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
};

function ReportDialog() {
  const [selected, setSelected] = useState('productivo');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContextLike }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();

    void Promise.resolve(
      context.registerTool(
        {
          name: 'generate_penco_report',
          title: 'Generar reporte de Penkay',
          description: 'Genera un reporte visible de la parcela piloto en una categoría admitida.',
          inputSchema: {
            type: 'object',
            properties: {
              type: { type: 'string', enum: reportTypes.map((report) => report.id) },
            },
            required: ['type'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute(input) {
            const type = (input as { type?: string })?.type;
            if (!type || !reportTypes.some((report) => report.id === type)) {
              throw new Error('Tipo de reporte no válido.');
            }
            setSelected(type);
            setReady(true);
            return { status: 'ready', type, parcel: 'Parcela El Mirador' };
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(() => undefined);

    return () => lifecycle.abort();
  }, []);

  const generate = () => {
    setReady(true);
    window.setTimeout(() => window.print(), 250);
  };

  return (
    <Dialog onOpenChange={(open) => !open && setReady(false)}>
      <DialogTrigger render={<Button size="lg" />}>
        <FileText data-icon="inline-start" /> Generar reporte
      </DialogTrigger>
      <DialogContent className="report-dialog">
        <DialogHeader>
          <DialogTitle>Generar reporte</DialogTitle>
          <DialogDescription>
            Selecciona el contenido. Se abrirá la vista de impresión para guardarlo como PDF.
          </DialogDescription>
        </DialogHeader>
        <div className="report-options">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <button
                type="button"
                key={report.id}
                className={`report-option ${selected === report.id ? 'active' : ''}`}
                onClick={() => setSelected(report.id)}
              >
                <Icon /> {report.label}
              </button>
            );
          })}
        </div>
        {ready && <div className="success-banner"><CheckCircle2 /> Reporte preparado con datos del escenario piloto.</div>}
        <DialogFooter>
          <Button onClick={generate}><Printer data-icon="inline-start" /> Preparar PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ParcelMap() {
  return (
    <div className="map-canvas" aria-label="Mapa de la parcela El Mirador">
      <svg viewBox="0 0 640 330" role="img" aria-label="Límites, cultivos y áreas de conservación de la parcela">
        <path className="contour c1" d="M-20 250C90 150 170 315 290 215S500 92 675 196" />
        <path className="contour c2" d="M-35 290C70 190 190 340 330 246S510 145 680 250" />
        <path className="route-line" d="M70 244L160 184L282 213L401 126L558 165" />
        <path className="plot plot-one" d="M135 228l86-68 106 48-72 82z" />
        <path className="plot plot-two" d="M350 190l82-72 81 34-58 82z" />
        <circle className="map-point active" cx="160" cy="184" r="8" />
        <circle className="map-point hub" cx="401" cy="126" r="9" />
      </svg>
      <div className="map-legend">
        <span><i className="legend-dot productive" /> Cultivo activo</span>
        <span><i className="legend-dot conservation" /> Conservación</span>
        <span><i className="legend-dot center" /> Punto de monitoreo</span>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AppShell
      active="Resumen"
      eyebrow="Mi producción"
      title="Buenos días, Juan"
      description="Así está tu cultivo hoy. Todos los valores pertenecen al escenario piloto."
      action={<ReportDialog />}
    >
      <section className="summary-metrics" aria-label="Resumen productivo">
        {producerMetrics.map((metric) => (
          <Card key={metric.label} className="summary-card">
            <CardContent>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
              <span>{metric.note}</span>
              <em>{metric.change}</em>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="workspace-grid">
        <div className="workspace-stack">
          <Card className="surface-card dashboard-map">
            <CardHeader>
              <div className="section-heading-row">
                <div>
                  <p className="eyebrow">Parcela seleccionada</p>
                  <CardTitle className="surface-title">El Mirador · 1,2 ha</CardTitle>
                </div>
                <Button render={<a href="/parcelas" />} nativeButton={false} variant="outline" size="sm">Ver detalle</Button>
              </div>
            </CardHeader>
            <CardContent><ParcelMap /></CardContent>
          </Card>

          <Card className="surface-card">
            <CardHeader>
              <div className="section-heading-row">
                <div>
                  <p className="eyebrow">Registro cronológico</p>
                  <CardTitle className="surface-title">Actividad reciente</CardTitle>
                </div>
                <Badge variant="outline">4 eventos</Badge>
              </div>
            </CardHeader>
            <CardContent className="activity-list">
              {timeline.map((event) => (
                <div className="activity-item" key={event.date + event.title}>
                  <span>{event.date}</span>
                  <div>
                    <strong>{event.title}</strong>
                    <p>{event.detail}</p>
                    <small>{event.type}</small>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="workspace-stack">
          <Card className="surface-card">
            <CardHeader>
              <p className="eyebrow">Último control</p>
              <CardTitle className="surface-title">Estado del suelo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="soil-list">
                <div className="soil-row"><div><strong>pH</strong><p className="source-tag">Laboratorio</p></div><strong>6,4</strong></div>
                <div className="soil-row"><div><strong>Humedad</strong><p className="source-tag">Medición de campo</p></div><strong>Media</strong></div>
                <div className="soil-row"><div><strong>Pendiente</strong><p className="source-tag">Drone</p></div><strong>12%</strong></div>
                <div className="soil-row"><div><strong>Erosión</strong><p className="source-tag">Observado</p></div><strong>Baja</strong></div>
              </div>
              <div className="status-callout"><CircleGauge /> Apto con observaciones</div>
            </CardContent>
          </Card>

          <Card className="surface-card">
            <CardHeader>
              <div className="section-heading-row">
                <div>
                  <p className="eyebrow">Calendario</p>
                  <CardTitle className="surface-title">Próximas actividades</CardTitle>
                </div>
                <CalendarDays />
              </div>
            </CardHeader>
            <CardContent className="upcoming-list">
              <div className="upcoming-item"><div className="date-box"><strong>08</strong><span>sep</span></div><div><strong>Vuelo con drone</strong><span>Parcela A · 09:00</span></div></div>
              <div className="upcoming-item"><div className="date-box"><strong>12</strong><span>sep</span></div><div><strong>Capacitación PencoTech</strong><span>GIS básico · 14:30</span></div></div>
              <div className="upcoming-item"><div className="date-box"><strong>18</strong><span>sep</span></div><div><strong>Revisión de suelo</strong><span>Parcela B · 10:00</span></div></div>
            </CardContent>
          </Card>

          <Card className="surface-card">
            <CardHeader><CardTitle className="surface-title">Evidencias pendientes</CardTitle></CardHeader>
            <CardContent>
              <div className="status-callout"><FlaskConical /> Materia orgánica · análisis pendiente</div>
              <Button render={<a href="/plantas" />} nativeButton={false} variant="outline" className="mt-3 w-full"><Sprout /> Registrar plantas</Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
