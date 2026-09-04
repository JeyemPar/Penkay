import { MapPin, PackageCheck, Phone, Route, Store, Truck, Wrench } from 'lucide-react';

import { AppShell } from '@/components/penkay/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const supplies = [
  { name: 'Vivero Semilla Andina', detail: 'Hijuelos seleccionados · 850 disponibles', place: 'Bolívar, Carchi', icon: Store },
  { name: 'Agroinsumos del Norte', detail: 'Herramientas e insumos permitidos', place: 'Tulcán, Carchi', icon: Wrench },
  { name: 'PencoMRV Servicios', detail: 'Mapeo, drone y asistencia técnica', place: 'Cobertura provincial', icon: PackageCheck },
  { name: 'Laboratorio Suelo Vivo', detail: 'Análisis de pH y materia orgánica', place: 'Ibarra, Imbabura', icon: Store },
];

const distributors = [
  { name: 'Ruta Norte 01', detail: 'Capacidad 2,5 t · Recolección semanal', place: 'Mira → Tulcán', icon: Truck },
  { name: 'Andes Logística', detail: 'Transporte refrigerado · 1,8 t', place: 'Carchi e Imbabura', icon: Route },
];

function SupplierList({ items }: { items: typeof supplies }) {
  return <div className="supplier-list">{items.map((item) => {
    const Icon = item.icon;
    return <div className="supplier-row" key={item.name}>
      <div className="detail-icon"><Icon /></div>
      <div><strong>{item.name}</strong><span>{item.detail}</span><span><MapPin className="inline size-3" /> {item.place}</span></div>
      <Button variant="outline" size="sm"><Phone /> Contactar</Button>
    </div>;
  })}</div>;
}

export default function ProvidersPage() {
  return (
    <AppShell active="Proveedores" eyebrow="Cadena de valor" title="Proveedores y distribución" description="Directorio demostrativo de insumos, servicios y rutas disponibles para productores.">
      <Tabs defaultValue="insumos" className="filter-tabs">
        <TabsList>
          <TabsTrigger value="insumos">Materias primas y servicios</TabsTrigger>
          <TabsTrigger value="distribuidores">Distribuidores</TabsTrigger>
        </TabsList>
        <TabsContent value="insumos"><SupplierList items={supplies} /></TabsContent>
        <TabsContent value="distribuidores">
          <SupplierList items={distributors} />
          <div className="status-callout mt-4"><Route /> Próxima ruta colectiva: 14 de septiembre · 6 productores confirmados <Badge>Ruta 03</Badge></div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
