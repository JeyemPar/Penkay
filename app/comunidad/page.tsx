import { ArrowRight, Award, BookOpen, Building2, GraduationCap, HandHeart, Users } from 'lucide-react';

import { AppShell } from '@/components/penkay/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const paths = [
  { name: 'Nivel 1 · Explorador', value: 100 },
  { name: 'Nivel 2 · Monitor', value: 70 },
  { name: 'Nivel 3 · Operador tecnológico', value: 20 },
  { name: 'Nivel 4 · Analista', value: 0 },
];

const opportunities = [
  { title: 'Taller GIS básico', type: 'Capacitación', detail: '12 sep · Centro comunitario San Isidro', icon: GraduationCap },
  { title: 'Monitoreo de cobertura vegetal', type: 'Investigación', detail: 'Universidad aliada · Cupos para 8 jóvenes', icon: BookOpen },
  { title: 'Asistencia técnica de parcela', type: 'Beneficio', detail: 'Convocatoria abierta hasta el 28 sep', icon: HandHeart },
];

export default function CommunityPage() {
  return (
    <AppShell active="Comunidad" eyebrow="Comunidad y academia" title="El conocimiento circula" description="Aprendizaje, alianzas y oportunidades para fortalecer la cadena del penco.">
      <section className="community-highlight">
        <p className="eyebrow">Academia + PencoTech</p>
        <h2>Formación tecnológica con los pies en el territorio.</h2>
        <p>La ruta PencoTech prepara a jóvenes para registrar datos, mapear parcelas y apoyar el monitoreo ambiental de sus comunidades.</p>
      </section>

      <div className="workspace-grid mt-4">
        <Card className="surface-card">
          <CardHeader><div className="section-heading-row"><div><p className="eyebrow">Mi ruta PencoTech</p><CardTitle className="surface-title">Progreso de formación</CardTitle></div><Award /></div></CardHeader>
          <CardContent className="course-list">
            {paths.map((path) => <div className="course-progress" key={path.name}><strong>{path.name}</strong><Progress value={path.value} /><span>{path.value}%</span></div>)}
          </CardContent>
        </Card>
        <Card className="surface-card">
          <CardHeader><div className="section-heading-row"><div><p className="eyebrow">Red activa</p><CardTitle className="surface-title">Conectados este mes</CardTitle></div><Users /></div></CardHeader>
          <CardContent className="soil-list">
            <div className="soil-row"><strong>Jóvenes PencoTech</strong><strong>34</strong></div>
            <div className="soil-row"><strong>Instituciones aliadas</strong><strong>12</strong></div>
            <div className="soil-row"><strong>Investigaciones</strong><strong>8</strong></div>
          </CardContent>
        </Card>
      </div>

      <section className="data-grid mt-4">
        {opportunities.map((item) => {
          const Icon = item.icon;
          return <Card className="detail-card" key={item.title}><CardContent><div className="detail-icon"><Icon /></div><Badge variant="secondary" className="mt-4">{item.type}</Badge><h3>{item.title}</h3><p>{item.detail}</p><a className="text-link" href="#detalle">Ver oportunidad <ArrowRight /></a></CardContent></Card>;
        })}
      </section>

      <Card className="surface-card mt-4">
        <CardHeader><div className="section-heading-row"><div><p className="eyebrow">Alianzas estratégicas</p><CardTitle className="surface-title">12 organizaciones trabajando en red</CardTitle></div><Building2 /></div></CardHeader>
        <CardContent><p className="text-sm leading-6 text-muted-foreground">Universidades, gobiernos locales, asociaciones productivas y centros de investigación articulan formación, asistencia técnica y conservación.</p><Button variant="outline" className="mt-4">Conocer las alianzas</Button></CardContent>
      </Card>
    </AppShell>
  );
}
