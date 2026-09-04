'use client';

import { FormEvent, useState } from 'react';
import { Camera, CheckCircle2, CircleAlert, Droplets, Plus, Ruler, Sprout, Sun, ThermometerSun } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { AppShell } from '@/components/penkay/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const samples = [
  { code: 'PN-001-048', age: '3 años', height: '1,35 m', diameter: '1,80 m', status: 'Saludable' },
  { code: 'PN-001-063', age: '2 años', height: '1,10 m', diameter: '1,42 m', status: 'Atención' },
  { code: 'PN-002-014', age: '4 años', height: '1,62 m', diameter: '2,05 m', status: 'Saludable' },
];

const climateForecast = [
  { day: 'Lun', temp: 24, hum: 40, status: 'Saludable', action: 'Monitoreo normal', soil: '45% (Óptimo)', alert: 'Clima estable sin riesgo hídrico.', img: '/images/estados-penco/penco-saludable.png', color: 'green' },
  { day: 'Mar', temp: 28, hum: 35, status: 'Saludable', action: 'Monitoreo normal', soil: '38% (Adecuado)', alert: 'Aumento ligero de temperatura.', img: '/images/estados-penco/penco-saludable.png', color: 'green' },
  { day: 'Mié', temp: 31, hum: 25, status: 'Atención', action: 'Preparar riego', soil: '25% (Seco)', alert: 'Temperatura en ascenso rápido.', img: '/images/estados-penco/penco-recuperacion.png', color: 'yellow' },
  { day: 'Jue', temp: 33, hum: 15, status: 'Crítico', action: 'Riego de auxilio', soil: '18% (Crítico)', alert: 'Pico de 33°C con baja humedad.', img: '/images/estados-penco/penco-estres-termico.png', color: 'orange' },
  { day: 'Vie', temp: 27, hum: 45, status: 'Recuperación', action: 'Evaluar respuesta', soil: '35% (Mejorando)', alert: 'Temperatura baja, humedad sube.', img: '/images/estados-penco/penco-recuperacion.png', color: 'yellow' },
  { day: 'Sáb', temp: 22, hum: 60, status: 'Saludable', action: 'Monitoreo normal', soil: '48% (Óptimo)', alert: 'Condiciones óptimas restauradas.', img: '/images/estados-penco/penco-saludable.png', color: 'green' },
  { day: 'Dom', temp: 21, hum: 65, status: 'Saludable', action: 'Monitoreo normal', soil: '50% (Óptimo)', alert: 'Día fresco y húmedo.', img: '/images/estados-penco/penco-saludable.png', color: 'green' },
];

const chartConfig = {
  temp: {
    label: "Temp. (°C)",
    color: "var(--chart-1)",
  },
  hum: {
    label: "Humedad (%)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

import { CameraCapture } from '@/components/penkay/camera-capture';

export default function PlantsPage() {
  const [count, setCount] = useState(1306);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState('12');
  
  const [hoveredData, setHoveredData] = useState(climateForecast[3]);

  const addPlants = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setCount((value) => value + Number(quantity || 0)); setOpen(false); };

  return (
    <AppShell active="Plantas" eyebrow="Monitoreo productivo" title="Plantas y muestras" description="Registra cantidades por lote y usa muestras individuales solo donde aportan evidencia."
      action={<div className="flex gap-2"><CameraCapture /><Dialog open={open} onOpenChange={setOpen}><DialogTrigger render={<Button size="lg" />}><Plus /> Registrar plantas</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Nuevo registro de plantas</DialogTitle><DialogDescription>Actualiza la cantidad activa de la parcela seleccionada.</DialogDescription></DialogHeader><form className="form-stack" onSubmit={addPlants}><div className="form-field"><Label htmlFor="plant-quantity">Cantidad nueva</Label><Input id="plant-quantity" type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} /></div><div className="form-field"><Label htmlFor="plant-parcel">Parcela</Label><select id="plant-parcel" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"><option>El Mirador</option><option>La Quebrada</option></select></div><DialogFooter><Button type="submit">Guardar registro</Button></DialogFooter></form></DialogContent></Dialog></div>}
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

      <section className="mt-12 space-y-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Gemelo Digital: Proyección Biofísica</h2>
          <p className="text-muted-foreground">Desliza el ratón sobre la gráfica climática para visualizar el impacto proyectado en la planta.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-[2fr_1.2fr]">
          <Card>
            <CardHeader>
              <CardTitle>Pronóstico de Variables</CardTitle>
              <CardDescription>Evolución de temperatura y humedad en el microclima de la parcela.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                <AreaChart 
                  accessibilityLayer 
                  data={climateForecast} 
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  onMouseMove={(e: any) => {
                    if (e.activePayload && e.activePayload.length > 0) {
                      setHoveredData(e.activePayload[0].payload);
                    }
                  }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis yAxisId="left" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area yAxisId="left" type="monotone" dataKey="temp" stroke="var(--color-temp)" fill="var(--color-temp)" fillOpacity={0.2} strokeWidth={2} />
                  <Area yAxisId="right" type="monotone" dataKey="hum" stroke="var(--color-hum)" fill="var(--color-hum)" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Estado Proyectado: {hoveredData.day}</CardTitle>
              <CardDescription>Impacto simulado en parcela &quot;El Mirador&quot;</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between gap-4">
              
              <div className="relative w-full h-[180px] rounded-lg overflow-hidden border bg-white flex items-center justify-center p-2">
                <img 
                  src={hoveredData.img} 
                  alt={`Estado de la planta el día ${hoveredData.day}`}
                  className="max-h-full object-contain transition-all duration-300"
                />
              </div>

              <div className={`flex items-center gap-3 rounded-lg p-3 border ${
                hoveredData.color === 'orange' ? 'bg-orange-50 border-orange-200 text-orange-900' :
                hoveredData.color === 'yellow' ? 'bg-yellow-50 border-yellow-200 text-yellow-900' :
                'bg-green-50 border-green-200 text-green-900'
              }`}>
                <div className={`rounded-full p-2 ${
                  hoveredData.color === 'orange' ? 'bg-orange-100' :
                  hoveredData.color === 'yellow' ? 'bg-yellow-100' :
                  'bg-green-100'
                }`}>
                  {hoveredData.color === 'orange' ? <ThermometerSun className="size-5" /> : <Sprout className="size-5" />}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{hoveredData.status}</h4>
                  <p className="text-xs opacity-90">{hoveredData.alert}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm mt-2">
                <div className="flex justify-between items-center border-b pb-1">
                  <span className="text-muted-foreground flex items-center gap-2"><Sun className="size-3.5" /> Temperatura proj.</span>
                  <span className="font-medium">{hoveredData.temp}°C</span>
                </div>
                <div className="flex justify-between items-center border-b pb-1">
                  <span className="text-muted-foreground flex items-center gap-2"><Droplets className="size-3.5" /> Humedad del suelo est.</span>
                  <span className={`font-medium ${hoveredData.color === 'orange' ? 'text-orange-600' : ''}`}>{hoveredData.soil}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2"><Sprout className="size-3.5" /> Acción sugerida</span>
                  <span className="font-medium text-xs">{hoveredData.action}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}
