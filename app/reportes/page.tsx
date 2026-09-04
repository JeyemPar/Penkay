'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Download, FileBarChart, FileClock, FileText, Leaf, MapPinned, Printer, Route } from 'lucide-react';

import { AppShell } from '@/components/penkay/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PrintableReport } from '@/components/penkay/printable-report';

const reports = [
  { title: 'Reporte productivo', detail: 'Plantas, supervivencia, crecimiento y parcelas.', icon: FileBarChart, updated: '03 sep 2026' },
  { title: 'Reporte territorial', detail: 'Mapa, superficie, uso del suelo y conservación.', icon: MapPinned, updated: '17 jun 2026' },
  { title: 'Reporte ambiental', detail: 'Cobertura, suelo, estimaciones y metodología.', icon: Leaf, updated: '28 jul 2026' },
  { title: 'Reporte cronológico', detail: 'Historia completa de actividades y evidencias.', icon: FileClock, updated: '03 sep 2026' },
  { title: 'Reporte logístico', detail: 'Rutas, distancias, cargas y productores.', icon: Route, updated: '01 sep 2026' },
  { title: 'Pasaporte ambiental', detail: 'Ficha verificable con QR de trazabilidad.', icon: FileText, updated: '03 sep 2026' },
];

export default function ReportsPage() {
  const [ready, setReady] = useState<typeof reports[0] | null>(null);
  
  // Client-side only state to avoid hydration errors with Date/Random
  const [mounted, setMounted] = useState(false);
  const [reportDate, setReportDate] = useState('');
  const [reportId, setReportId] = useState('');
  const [reportHash, setReportHash] = useState('');

  useEffect(() => {
    setMounted(true);
    setReportDate(new Date().toLocaleDateString('es-EC'));
    setReportId(`PKY-RPT-${Math.floor(Math.random() * 10000)}`);
    setReportHash(`0x${Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')}`);
  }, []);
  
  const prepare = (report: typeof reports[0]) => {
    setReady(report);
    // Un pequeño delay para que React renderice la vista de impresión antes de abrir el diálogo
    window.setTimeout(() => window.print(), 300);
  };

  return (
    <>
      <div className="print:hidden">
        <AppShell active="Reportes" eyebrow="Documentos" title="Centro de reportes" description="Prepara resúmenes imprimibles con los datos demostrativos de la parcela piloto.">
          {ready && <div className="success-banner mb-4"><CheckCircle2 /> {ready.title} preparado. Usa el diálogo del navegador para guardarlo como PDF.</div>}
          <section className="data-grid">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <Card className="detail-card" key={report.title}>
                  <CardContent>
                    <div className="detail-icon"><Icon /></div>
                    <Badge variant="secondary" className="mt-4">Actualizado {report.updated}</Badge>
                    <h3>{report.title}</h3>
                    <p>{report.detail}</p>
                    <div className="product-actions">
                      <Button variant="outline" size="sm" onClick={() => prepare(report)}><Printer /> Preparar PDF</Button>
                      <Button size="sm"><Download /> Datos</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>
        </AppShell>
      </div>

      {mounted && ready && (
        <PrintableReport
          title={ready.title}
          detail={ready.detail}
          icon={ready.icon}
          reportDate={reportDate}
          reportId={reportId}
          reportHash={reportHash}
        />
      )}
    </>
  );
}
