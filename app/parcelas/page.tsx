'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, Layers3, MapPin, Plus, Ruler, Satellite } from 'lucide-react';

import { AppShell } from '@/components/penkay/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialParcels = [
  { name: 'El Mirador', area: '1,2 ha', plants: '650 plantas', status: 'Apta', detail: 'Monitoreada el 03 sep 2026' },
  { name: 'La Quebrada', area: '0,8 ha', plants: '420 plantas', status: 'Observación', detail: 'Revisión de suelo pendiente' },
  { name: 'Bosque Alto', area: '0,4 ha', plants: 'Área conservada', status: 'Conservación', detail: 'Cobertura vegetal 86%' },
];

function LargeMap() {
  return <div className="map-canvas" aria-label="Mapa de parcelas">
    <svg viewBox="0 0 640 380" role="img" aria-label="Mapa esquemático con tres zonas de la finca">
      <path className="contour c1" d="M-20 280C90 160 170 340 290 230S500 92 675 206" />
      <path className="contour c2" d="M-35 330C70 210 190 370 330 266S510 145 680 280" />
      <path className="route-line" d="M70 274L150 218L276 244L390 140L550 180" />
      <path className="plot plot-one" d="M114 274l106-90 120 54-82 103z" />
      <path className="plot plot-two" d="M354 219l90-91 89 42-61 101z" />
      <circle className="map-point active" cx="150" cy="218" r="9" />
      <circle className="map-point hub" cx="390" cy="140" r="10" />
    </svg>
    <div className="map-legend"><span><i className="legend-dot productive" /> Apta</span><span><i className="legend-dot conservation" /> Conservación</span><span><i className="legend-dot center" /> Monitoreo</span></div>
  </div>;
}

export default function ParcelsPage() {
  const [open, setOpen] = useState(false);
  const [parcels, setParcels] = useState(initialParcels);
  const [name, setName] = useState('Parcela Nueva');
  const [area, setArea] = useState('0.6');
  const [success, setSuccess] = useState(false);

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
      description="Límites, cultivos, conservación y puntos de monitoreo del escenario piloto."
      action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button size="lg" />}><Plus /> Nueva parcela</DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Registrar parcela</DialogTitle><DialogDescription>Agrega los datos básicos. El polígono geográfico puede completarse después.</DialogDescription></DialogHeader>
            <form className="form-stack" onSubmit={addParcel}>
              <div className="form-field"><Label htmlFor="parcel-name">Nombre</Label><Input id="parcel-name" value={name} onChange={(event) => setName(event.target.value)} /></div>
              <div className="form-grid">
                <div className="form-field"><Label htmlFor="parcel-area">Superficie (ha)</Label><Input id="parcel-area" type="number" min="0.1" step="0.1" value={area} onChange={(event) => setArea(event.target.value)} /></div>
                <div className="form-field"><Label htmlFor="parcel-zone">Zona</Label><select id="parcel-zone"><option>Cultivo</option><option>Conservación</option><option>Mixta</option></select></div>
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
          <CardHeader><div className="section-heading-row"><div><p className="eyebrow">Finca San Isidro</p><CardTitle className="surface-title">Mapa de uso del suelo</CardTitle></div><Button variant="outline" size="sm"><Layers3 /> Capas</Button></div></CardHeader>
          <CardContent><LargeMap /><div className="status-callout"><Satellite /> Última imagen drone: 17 de junio de 2026</div></CardContent>
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
