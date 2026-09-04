'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Download, FileBarChart, FileClock, FileText, Leaf, MapPinned, Printer, Route } from 'lucide-react';

import { AppShell } from '@/components/penkay/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
      {/* VISTA EN PANTALLA NORMAL (Se oculta al imprimir) */}
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

      {/* VISTA EXCLUSIVA DE IMPRESIÓN (Oculta en pantalla normal) */}
      <div className="hidden print:block print:p-8 print:bg-white print:text-black font-sans">
        <header className="border-b-2 border-gray-200 pb-6 mb-8 flex justify-between items-end">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-xl border border-green-200">
              <Leaf className="w-10 h-10 text-green-700" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Penkay</h1>
              <p className="text-lg text-gray-500 font-medium tracking-wide">Plataforma de Trazabilidad</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p><strong>Fecha de emisión:</strong> {mounted ? reportDate : '...'}</p>
            <p><strong>Usuario:</strong> Juan Paredes</p>
            <p><strong>Zona:</strong> Finca San Isidro, Carchi</p>
            <p><strong>ID de Reporte:</strong> {mounted ? reportId : '...'}</p>
          </div>
        </header>

        {ready && (
          <main>
            <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <ready.icon className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800">{ready.title}</h2>
              </div>
              <p className="text-gray-600 text-lg">{ready.detail}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-gray-700 mb-4 border-b pb-2">Información del Polígono</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between"><span>Superficie total:</span> <strong>2,4 hectáreas</strong></li>
                  <li className="flex justify-between"><span>Plantas activas:</span> <strong>1.420 pencos</strong></li>
                  <li className="flex justify-between"><span>Tasa de supervivencia:</span> <strong>92%</strong></li>
                  <li className="flex justify-between"><span>Riesgo de erosión (Copernicus):</span> <strong>Bajo (15% pendiente)</strong></li>
                </ul>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-gray-700 mb-4 border-b pb-2">Estado Biométrico y Ambiental</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between"><span>Índice de Vegetación (NDVI):</span> <strong>0.75 (Saludable)</strong></li>
                  <li className="flex justify-between"><span>Humedad del Suelo (SAR):</span> <strong>0.28 (Requiere atención)</strong></li>
                  <li className="flex justify-between"><span>Carbono estimado:</span> <strong>23–31 tCO₂e</strong></li>
                  <li className="flex justify-between"><span>Último control satelital:</span> <strong>Hace 3 días</strong></li>
                </ul>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-gray-200 pt-8 mt-12 text-center">
              <p className="text-sm text-gray-500 mb-2">Este documento ha sido generado automáticamente por la red descentralizada Penkay y su veracidad está respaldada por los datos criptográficos y satelitales (Copernicus Sentinel Hub) del sistema GreenTrace.</p>
              <p className="text-xs text-gray-400 font-mono">HASH: {mounted ? reportHash : '...'}</p>
            </div>
          </main>
        )}
      </div>
    </>
  );
}
