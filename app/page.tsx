'use client';

import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircleUserRound,
  Drone,
  Leaf,
  MapPinned,
  Menu,
  PackageOpen,
  Sprout,
  TreePine,
  Users,
} from 'lucide-react';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LabelList, Cell } from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navigation = [
  { label: 'Comunidad', href: '/comunidad' },
  { label: 'GreenTrace', href: '/greentrace' },
  { label: 'Productos', href: '/productos' },
  { label: 'Proveedores', href: '/proveedores' },
];

const metrics = [
  { label: 'Productores', value: '125', detail: 'en la red', icon: Users },
  { label: 'Plantas', value: '72.000', detail: '+8% este año', icon: Sprout },
  { label: 'Hectáreas', value: '380 ha', detail: 'monitoreadas', icon: MapPinned },
  { label: 'Comunidades', value: '18', detail: 'conectadas', icon: TreePine },
];

const ecosystem = [
  {
    eyebrow: 'Territorio',
    title: 'Cultivo sostenible',
    copy: 'Datos claros para acompañar cada etapa del penco.',
    icon: Sprout,
    href: '/perfil',
  },
  {
    eyebrow: 'PencoMRV',
    title: 'Tecnología aplicada',
    copy: 'Monitoreo de parcelas, fotografías y vuelos con drone.',
    icon: Drone,
    href: '/parcelas',
  },
  {
    eyebrow: 'Red',
    title: 'Conocimiento que conecta',
    copy: 'Productores, academia y jóvenes PencoTech en un solo lugar.',
    icon: Users,
    href: '/comunidad',
  },
  {
    eyebrow: 'Mercado',
    title: 'Del territorio al producto',
    copy: 'Origen, disponibilidad y trazabilidad de cada producto.',
    icon: PackageOpen,
    href: '/productos',
  },
];

const resources = [
  {
    kind: 'Manual técnico',
    title: 'Buenas prácticas para el manejo del penco andino',
    source: 'Red Penkay',
    meta: 'Actualizado en septiembre de 2026',
  },
  {
    kind: 'Convocatoria',
    title: 'Becas de formación para jóvenes PencoTech',
    source: 'Programa Academia + Territorio',
    meta: 'Postulaciones hasta el 28 de septiembre',
  },
  {
    kind: 'Investigación',
    title: 'Cobertura vegetal y recuperación de suelos de ladera',
    source: 'Universidad aliada',
    meta: 'Lectura de 6 minutos',
  },
];

function Brand() {
  return (
    <a className="brand" href="/" aria-label="Penkay, inicio">
      <span className="brand-mark" aria-hidden="true">
        <Leaf />
      </span>
      <span>
        <strong>Penkay</strong>
      </span>
    </a>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <Button
            render={<a href="/login" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="login-button"
          >
            <CircleUserRound data-icon="inline-start" />
            Ingresar
          </Button>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-lg"
                  className="mobile-menu-button"
                  aria-label="Abrir menú"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="mobile-sheet">
              <SheetHeader>
                <SheetTitle>Explorar Penkay</SheetTitle>
                <SheetDescription>
                  Territorio, producción y comunidad.
                </SheetDescription>
              </SheetHeader>
              <nav className="mobile-nav" aria-label="Navegación móvil">
                <SheetClose render={<a href="/" />} nativeButton={false}>Inicio</SheetClose>
                {navigation.map((item) => (
                  <SheetClose key={item.href} render={<a href={item.href} />} nativeButton={false}>
                    {item.label}
                  </SheetClose>
                ))}
                <SheetClose render={<a href="/perfil" />} nativeButton={false}>Mi perfil</SheetClose>
                <SheetClose render={<a href="/reportes" />} nativeButton={false}>Reportes</SheetClose>
              </nav>
              <div className="sheet-login">
                <Button render={<a href="/login" />} nativeButton={false} size="lg">
                  Ingresar a mi cuenta
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="page-shell hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <Badge className="pilot-badge">Escenario piloto · Carchi</Badge>
        <p className="hero-kicker">Cultivo, evidencia y futuro</p>
        <h1 id="hero-title">
          El territorio se entiende mejor cuando sus datos tienen raíces.
        </h1>
        <p className="hero-lede">
          Penkay conecta productores, tecnología y conocimiento para cuidar
          el penco andino desde la parcela hasta el mercado.
        </p>
        <div className="hero-actions">
          <Button render={<a href="/perfil" />} nativeButton={false} size="lg" className="primary-cta">
            Ver mi producción
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button render={<a href="#dashboard" />} nativeButton={false} variant="outline" size="lg">
            Explorar la red
          </Button>
        </div>
      </div>
      <div className="hero-visual" aria-label="Cultivo de penco en los Andes">
        <img src="/penco-andes-hero.png" alt="Cultivo de penco en una ladera de los Andes al amanecer" />
        <div className="hero-data-card">
          <span className="live-dot" />
          <div>
            <strong>18 zonas monitoreadas</strong>
            <span>Datos agregados de la red</span>
          </div>
        </div>
        <div className="hero-coordinate" aria-hidden="true">
          00°48′ N · 77°43′ O
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  return (
    <section className="page-shell metric-grid" aria-label="Indicadores de la red">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.label} className="metric-card">
            <CardContent className="metric-content">
              <div className="metric-icon"><Icon /></div>
              <div>
                <p>{metric.label}</p>
                <strong>{metric.value}</strong>
                <span>{metric.detail}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}

function NetworkMap() {
  return (
    <Card className="map-card">
      <CardHeader>
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Vista territorial</p>
            <CardTitle className="panel-title">Red productiva</CardTitle>
          </div>
          <Badge variant="outline">Datos agregados</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="map-canvas" aria-label="Mapa esquemático de comunidades productoras">
          <svg viewBox="0 0 640 330" role="img" aria-label="Zonas productivas, parcelas y centros de acopio">
            <path className="contour c1" d="M-20 250C90 150 170 315 290 215S500 92 675 196" />
            <path className="contour c2" d="M-35 290C70 190 190 340 330 246S510 145 680 250" />
            <path className="route-line" d="M90 220L195 154L324 188L438 112L550 150" />
            <path className="plot plot-one" d="M138 205l55-44 62 30-46 55z" />
            <path className="plot plot-two" d="M345 175l70-58 66 24-47 65z" />
            <circle className="map-point active" cx="90" cy="220" r="8" />
            <circle className="map-point" cx="195" cy="154" r="7" />
            <circle className="map-point" cx="324" cy="188" r="7" />
            <circle className="map-point hub" cx="438" cy="112" r="10" />
            <circle className="map-point" cx="550" cy="150" r="7" />
          </svg>
          <div className="map-legend">
            <span><i className="legend-dot productive" /> Zona productiva</span>
            <span><i className="legend-dot conservation" /> Conservación</span>
            <span><i className="legend-dot center" /> Centro de acopio</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function GrowthChart() {
  return (
    <Card className="growth-card">
      <CardHeader>
        <p className="eyebrow">Evolución 2022–2026</p>
        <CardTitle className="panel-title">Plantación de la red</CardTitle>
        <CardDescription>Plantas registradas por año</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="chart-summary">
          <strong>72.000</strong>
          <span>+12,4% frente a 2025</span>
        </div>
        <div className="line-chart" aria-label="Gráfico ascendente de plantas registradas de 2022 a 2026">
          <svg viewBox="0 0 520 230" role="img">
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#abc75a" stopOpacity="0.42" />
                <stop offset="1" stopColor="#abc75a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="grid-line" d="M25 45H500M25 100H500M25 155H500M25 210H500" />
            <path className="chart-area" d="M30 182C95 170 110 146 165 150S240 112 285 118S374 76 407 83S463 48 495 38V210H30Z" />
            <path className="chart-line" d="M30 182C95 170 110 146 165 150S240 112 285 118S374 76 407 83S463 48 495 38" />
            {[['30','182'],['165','150'],['285','118'],['407','83'],['495','38']].map(([cx, cy]) => (
              <circle key={cx} className="chart-point" cx={cx} cy={cy} r="5" />
            ))}
          </svg>
          <div className="chart-years"><span>2022</span><span>2023</span><span>2024</span><span>2025</span><span>2026</span></div>
        </div>
        <div className="evidence-note">
          <span>i</span>
          Cifras de demostración del escenario piloto.
        </div>
      </CardContent>
    </Card>
  );
}

const topProductsData = [
  { name: 'Shampoo orgánico', value: 65.0 },
  { name: 'Jarabes medicinales', value: 57.5 },
  { name: 'Vinagre', value: 55.1 },
  { name: 'Mermelada', value: 51.9 },
  { name: 'Helados caseros', value: 51.0 },
];

function MarketStudyChart() {
  return (
    <section className="page-shell mt-16 mb-8">
      <div className="section-intro">
        <div>
          <p className="eyebrow">Análisis Académico</p>
          <h2>Top de Productos Derivados</h2>
        </div>
        <p>Potencial de aceptación en el mercado, según el estudio referencial de Fernando Javier Villarreal Salazar (Docente UPEC).</p>
      </div>
      <Card className="surface-card max-w-3xl mx-auto shadow-md">
        <CardContent className="pt-8">
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData} layout="vertical" margin={{ top: 20, right: 70, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" />
                <XAxis type="number" hide domain={[0, 70]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={160} tick={{ fill: 'currentColor', fontSize: 14, fontWeight: 500 }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={40}>
                  <LabelList dataKey="value" position="right" formatter={(value: number) => `${value}%`} style={{ fill: 'currentColor', fontWeight: 700, fontSize: 18 }} />
                  {
                    topProductsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#34d399' : '#3b82f6'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Metrics />

        <section id="dashboard" className="page-shell dashboard-section">
          <div className="section-intro">
            <div>
              <p className="eyebrow">Panorama de la red</p>
              <h2>Una lectura compartida del territorio</h2>
            </div>
            <p>Información pública y agregada, sin exponer la ubicación exacta de productores.</p>
          </div>
          <div className="dashboard-grid">
            <NetworkMap />
            <GrowthChart />
          </div>
        </section>

        <MarketStudyChart />

        <section className="ecosystem-section">
          <div className="page-shell">
            <div className="section-intro light-intro">
              <div>
                <p className="eyebrow">Ecosistema Penkay</p>
                <h2>Todo empieza en la parcela. Todo se conecta.</h2>
              </div>
            </div>
            <div className="ecosystem-grid">
              {ecosystem.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a className="ecosystem-card" href={item.href} key={item.title}>
                    <span className="ecosystem-index">0{index + 1}</span>
                    <Icon />
                    <p>{item.eyebrow}</p>
                    <h3>{item.title}</h3>
                    <span>{item.copy}</span>
                    <ChevronRight className="ecosystem-arrow" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-shell resources-section">
          <div className="section-intro">
            <div>
              <p className="eyebrow">Conocimiento abierto</p>
              <h2>Información para decidir mejor</h2>
            </div>
            <Button render={<a href="/comunidad" />} nativeButton={false} variant="outline">
              Ver comunidad <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <div className="resources-grid">
            {resources.map((resource) => (
              <Card className="resource-card" key={resource.title}>
                <CardHeader>
                  <div className="resource-icon"><BookOpen /></div>
                  <Badge variant="secondary">{resource.kind}</Badge>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="resource-source">{resource.source}</p>
                  <p className="resource-meta">{resource.meta}</p>
                  <a className="text-link" href="/comunidad">Leer más <ArrowRight /></a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <Brand />
          <p>Territorio · conocimiento · sostenibilidad</p>
          <span>Prototipo funcional 2026</span>
        </div>
      </footer>
    </>
  );
}

export default Home;
