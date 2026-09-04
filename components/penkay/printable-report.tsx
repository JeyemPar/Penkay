import { Leaf } from 'lucide-react';

export function PrintableReport({
  title,
  detail,
  icon: Icon,
  reportDate,
  reportId,
  reportHash,
}: {
  title: string;
  detail: string;
  icon: React.ElementType;
  reportDate: string;
  reportId: string;
  reportHash: string;
}) {
  return (
    <>
      <style>{`
        @media print {
          .printable-report-container { display: block !important; }
        }
      `}</style>
      <div className="hidden printable-report-container print:p-8 print:bg-white print:text-black font-sans">
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
          <p><strong>Fecha de emisión:</strong> {reportDate || '...'}</p>
          <p><strong>Usuario:</strong> Juan Paredes</p>
          <p><strong>Zona:</strong> Finca San Isidro, Carchi</p>
          <p><strong>ID de Reporte:</strong> {reportId || '...'}</p>
        </div>
      </header>

      <main>
        <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Icon className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          </div>
          <p className="text-gray-600 text-lg">{detail}</p>
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
          <p className="text-xs text-gray-400 font-mono">HASH: {reportHash || '...'}</p>
        </div>
      </main>
      </div>
    </>
  );
}
