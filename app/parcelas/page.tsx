'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, Layers3, MapPin, Plus, Ruler, Satellite, SatelliteDish, History, Droplets, Leaf, Mountain } from 'lucide-react';

import { AppShell } from '@/components/penkay/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const initialParcels = [
  { name: 'El Mirador', area: '1,2 ha', plants: '650 plantas', status: 'Apta', detail: 'Monitoreada satelitalmente hoy' },
  { name: 'La Quebrada', area: '0,8 ha', plants: '420 plantas', status: 'Observación', detail: 'Humedad baja (Sentinel-1)' },
  { name: 'Bosque Alto', area: '0,4 ha', plants: 'Área conservada', status: 'Conservación', detail: 'Cobertura vegetal 86%' },
];

function LargeMap({ layer, year }: { layer: string, year: string }) {
  const getImageUrl = () => {
    switch (layer) {
      case 'ndvi':
        return '/images/satelite/vegetacion-real.png';
      case 'moisture':
        return '/images/satelite/humedad.png';
      case 'erosion':
        return '/images/satelite/erosion.png';
      case 'real':
      default:
        return '/images/satelite/color-real.png';
    }
  };

  return (
    <div className="map-canvas relative overflow-hidden rounded-md border" aria-label="Mapa satelital de parcelas">
      <img
        src={getImageUrl()}
        alt={`Vista satelital de capa ${layer}`}
        className="w-full h-[380px] object-cover transition-opacity duration-500"
      />
      
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur p-2 rounded-md border text-xs flex gap-2 shadow-sm">
        <Badge variant="outline" className="bg-background"><SatelliteDish className="mr-1 size-3" /> Copernicus Data Space</Badge>
        <Badge variant="outline" className="bg-background"><History className="mr-1 size-3" /> Año: {year}</Badge>
      </div>

      <div className="map-legend absolute bottom-4 left-4 bg-background/90 backdrop-blur p-2 rounded-md border shadow-sm flex flex-col gap-1 text-xs">
        <span className="flex items-center gap-2"><i className="legend-dot productive" /> Apta</span>
        <span className="flex items-center gap-2"><i className="legend-dot conservation" /> Conservación</span>
        <span className="flex items-center gap-2"><i className="legend-dot center" /> Monitoreo</span>
      </div>
    </div>
  );
}

export default function ParcelsPage() {
  const [open, setOpen] = useState(false);
  const [parcels, setParcels] = useState(initialParcels);
  const [name, setName] = useState('Parcela Nueva');
  const [area, setArea] = useState('0.6');
  const [success, setSuccess] = useState(false);
  
  // Controles Copernicus
  const [layer, setLayer] = useState('real');
  const [year, setYear] = useState('2026');

  const addParcel = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || Number(area) <= 0) return;
    setParcels((items) => [...items, { name, area: `${area} ha`, plants: 'Sin registro', status: 'Por evaluar', detail: 'Agregada en esta sesión' }]);
    setSuccess(true);
    window.setTimeout(() => { setOpen(false); setSuccess(false); }, 750);
  };

  return (
    <AppShell
      active="Parcelas"
      eyebrow="Gestión territorial"
      title="Mis parcelas"
      description="Integración con satélites Sentinel-1 y Sentinel-2 de Copernicus para monitoreo remoto."
      action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button size="lg" />}><Plus /> Nueva parcela</DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Registrar parcela</DialogTitle><DialogDescription>Agrega los datos básicos. El polígono geográfico puede completarse después.</DialogDescription></DialogHeader>
            <form className="form-stack" onSubmit={addParcel}>
              <div className="form-field"><Label htmlFor="parcel-name">Nombre</Label><Input id="parcel-name" value={name} onChange={(event) => setName(event.target.value)} /></div>
              <div className="form-grid">
                <div className="form-field"><Label htmlFor="parcel-area">Superficie (ha)</Label><Input id="parcel-area" type="number" min="0.1" step="0.1" value={area} onChange={(event) => setArea(event.target.value)} /></div>
                <div className="form-field"><Label htmlFor="parcel-zone">Zona</Label><select id="parcel-zone" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"><option>Cultivo</option><option>Conservación</option><option>Mixta</option></select></div>
              </div>
              {success && <div className="success-banner"><CheckCircle2 /> Parcela registrada en el prototipo.</div>}
              <DialogFooter><Button type="submit">Guardar parcela</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="parcel-layout">
        <Card className="surface-card parcel-map-large">
          <CardHeader>
            <div className="section-heading-row">
              <div><p className="eyebrow">Finca San Isidro</p><CardTitle className="surface-title">Visor de Parcela</CardTitle></div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}><History className="mr-2 size-4" /> {year}</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup value={year} onValueChange={setYear}>
                      <DropdownMenuRadioItem value="2024">2024</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="2025">2025</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="2026">2026</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}><Layers3 className="mr-2 size-4" /> Capas OGC WMS</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup value={layer} onValueChange={setLayer}>
                      <DropdownMenuRadioItem value="real"><Satellite className="mr-2 size-4" /> Sentinel-2 (Color Real)</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="ndvi"><Leaf className="mr-2 size-4 text-green-500" /> Índice de Vegetación (NDVI)</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="moisture"><Droplets className="mr-2 size-4 text-blue-500" /> Humedad del Suelo (S-1 Radar)</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="erosion"><Mountain className="mr-2 size-4 text-orange-500" /> Riesgo de Erosión</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <LargeMap layer={layer} year={year} />
            <div className="status-callout border-blue-100 bg-blue-50/50 text-blue-900 mt-4">
              <SatelliteDish className="text-blue-600" /> Última pasada del Sentinel-2: hace 3 días
            </div>
          </CardContent>
        </Card>

        <div className="workspace-stack">
          <Card className="surface-card">
            <CardHeader><div className="section-heading-row"><CardTitle className="surface-title">Zonas registradas</CardTitle><Badge>{parcels.length}</Badge></div></CardHeader>
            <CardContent className="parcel-list">
              {parcels.map((parcel) => <article className="parcel-item" key={parcel.name}>
                <header><div><h3>{parcel.name}</h3><p>{parcel.detail}</p></div><Badge variant={parcel.status === 'Apta' ? 'default' : 'secondary'}>{parcel.status}</Badge></header>
                <footer><span><Ruler className="inline size-3" /> {parcel.area}</span><span><MapPin className="inline size-3" /> {parcel.plants}</span></footer>
              </article>)}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
