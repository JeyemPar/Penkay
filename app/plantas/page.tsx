'use client';

import { FormEvent, useState } from 'react';
import { Camera, CheckCircle2, CircleAlert, Plus, Ruler, Sprout } from 'lucide-react';

import { AppShell } from '@/components/penkay/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const samples = [
  { code: 'PN-001-048', age: '3 años', height: '1,35 m', diameter: '1,80 m', status: 'Saludable' },
  { code: 'PN-001-063', age: '2 años', height: '1,10 m', diameter: '1,42 m', status: 'Atención' },
  { code: 'PN-002-014', age: '4 años', height: '1,62 m', diameter: '2,05 m', status: 'Saludable' },
];

export default function PlantsPage() {
  const [count, setCount] = useState(1306);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState('12');
  const addPlants = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setCount((value) => value + Number(quantity || 0)); setOpen(false); };

  return (
    <AppShell active="Plantas" eyebrow="Monitoreo productivo" title="Plantas y muestras" description="Registra cantidades por lote y usa muestras individuales solo donde aportan evidencia."
      action={<Dialog open={open} onOpenChange={setOpen}><DialogTrigger render={<Button size="lg" />}><Plus /> Registrar plantas</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Nuevo registro de plantas</DialogTitle><DialogDescription>Actualiza la cantidad activa de la parcela seleccionada.</DialogDescription></DialogHeader><form className="form-stack" onSubmit={addPlants}><div className="form-field"><Label htmlFor="plant-quantity">Cantidad nueva</Label><Input id="plant-quantity" type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} /></div><div className="form-field"><Label htmlFor="plant-parcel">Parcela</Label><select id="plant-parcel"><option>El Mirador</option><option>La Quebrada</option></select></div><DialogFooter><Button type="submit">Guardar registro</Button></DialogFooter></form></DialogContent></Dialog>}
    >
      <section className="summary-metrics">
        <Card className="summary-card"><CardContent><p>Plantas activas</p><strong>{count.toLocaleString('es-EC')}</strong><span>escenario piloto</span><em><CheckCircle2 className="inline size-3" /> 92% supervivencia</em></CardContent></Card>
        <Card className="summary-card"><CardContent><p>Establecidas</p><strong>1.420</strong><span>3 parcelas</span><em>Edad media 2,8 años</em></CardContent></Card>
        <Card className="summary-card"><CardContent><p>Pérdidas</p><strong>114</strong><span>últimos 12 meses</span><em><CircleAlert className="inline size-3" /> Revisar zona B</em></CardContent></Card>
        <Card className="summary-card"><CardContent><p>Muestras</p><strong>24</strong><span>individualizadas</span><em><Camera className="inline size-3" /> 18 con fotografía</em></CardContent></Card>
      </section>
      <section className="data-grid">
        {samples.map((sample) => <Card className="detail-card" key={sample.code}><CardContent><div className="detail-icon"><Sprout /></div><Badge variant={sample.status === 'Saludable' ? 'default' : 'secondary'} className="mt-4">{sample.status}</Badge><h3>{sample.code}</h3><p>{sample.age} · Último control: 15/08/2026</p><div className="product-meta"><span><Ruler className="inline size-3" /> Altura {sample.height}</span><span>Diámetro {sample.diameter}</span></div><Button variant="outline" size="sm" className="mt-4 w-full">Ver historial</Button></CardContent></Card>)}
      </section>
    </AppShell>
  );
}
