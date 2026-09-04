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
  const getFilter = () => {
    switch (layer) {
      case 'ndvi': return 'url(#ndviFilter)';
      case 'moisture': return 'url(#moistureFilter)';
      case 'erosion': return 'url(#erosionFilter)';
      default: return 'none';
    }
  };

  return <div className="map-canvas relative" aria-label="Mapa satelital de parcelas">
    <svg viewBox="0 0 640 380" role="img" aria-label="Mapa esquemático con tres zonas de la finca">
      <defs>
        <filter id="ndviFilter"><feColorMatrix type="matrix" values="0 0 0 0 0   0 1 0 0 0   0 0 0 0 0  0 0 0 1 0" /></filter>
        <filter id="moistureFilter"><feColorMatrix type="matrix" values="0 0 0 0 0.1   0 0 0 0 0.4   1 1 1 1 0.8  0 0 0 1 0" /></filter>
        <filter id="erosionFilter"><feColorMatrix type="matrix" values="1 0 0 0 0.8   0.3 0 0 0 0.2   0 0 0 0 0  0 0 0 1 0" /></filter>
      </defs>
      
      {/* Capa Base simulada para Copernicus */}
      <rect width="640" height="380" fill={layer === 'real' ? '#3e4a3b' : '#f0f0f0'} />
      <g filter={getFilter()} style={{ transition: 'filter 0.5s ease' }}>
        <path className="contour c1" d="M-20 280C90 160 170 340 290 230S500 92 675 206" fill={layer === 'real' ? '#4f604b' : '#d2dcd0'} />
        <path className="contour c2" d="M-35 330C70 210 190 370 330 266S510 145 680 280" fill={layer === 'real' ? '#61765c' : '#bdccbb'} />
        <path className="route-line" d="M70 274L150 218L276 244L390 140L550 180" stroke={layer === 'real' ? '#aaa' : '#fff'} />
        <path className="plot plot-one" d="M114 274l106-90 120 54-82 103z" fill={layer === 'real' ? '#a2cf6e' : '#a2cf6e'} fillOpacity={year === '2024' ? 0.3 : 0.8} />
        <path className="plot plot-two" d="M354 219l90-91 89 42-61 101z" fill={layer === 'real' ? '#8bc34a' : '#8bc34a'} fillOpacity={year === '2024' ? 0.4 : 0.9} />
      </g>
      
      <circle className="map-point active" cx="150" cy="218" r="9" fill="#10b981" />
      <circle className="map-point hub" cx="390" cy="140" r="10" fill="#3b82f6" />
    </svg>
    
    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur p-2 rounded-md border text-xs flex gap-2">
      <Badge variant="outline" className="bg-background"><SatelliteDish className="mr-1 size-3" /> Copernicus Data Space</Badge>
      <Badge variant="outline" className="bg-background"><History className="mr-1 size-3" /> Año: {year}</Badge>
    </div>

    <div className="map-legend">
      <span><i className="legend-dot productive" /> Apta</span>
      <span><i className="legend-dot conservation" /> Conservación</span>
      <span><i className="legend-dot center" /> Monitoreo</span>
    </div>
  </div>;
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
