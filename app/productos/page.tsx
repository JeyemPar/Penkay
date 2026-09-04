'use client';

import { useMemo, useState } from 'react';
import { MapPin, QrCode, Search, ShoppingBag } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import { AppShell } from '@/components/penkay/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { products } from '@/lib/demo-data';

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [selected, setSelected] = useState<(typeof products)[number] | null>(null);
  const categories = ['Todos', ...Array.from(new Set(products.map((product) => product.category)))];

  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'Todos' || product.category === category;
    const needle = query.toLowerCase();
    const matchesText = `${product.name} ${product.producer} ${product.community}`.toLowerCase().includes(needle);
    return matchesCategory && matchesText;
  }), [category, query]);

  return (
    <AppShell
      active="Productos"
      eyebrow="Mercado con origen"
      title="Productos del penco"
      description="Explora productos demostrativos y consulta su origen y trazabilidad."
      action={<Button variant="outline"><ShoppingBag /> Mi lista</Button>}
    >
      <div className="catalog-toolbar">
        <div className="catalog-search"><Search /><Input aria-label="Buscar productos" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar producto, productor o comunidad" /></div>
        <select aria-label="Filtrar por categoría" value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <Card className="product-card" key={product.trace}>
            <div className="product-art">
              <Badge className="product-category">{product.category}</Badge>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
              )}
            </div>
            <CardContent>
              <h3>{product.name}</h3>
              <p className="producer">{product.producer}</p>
              <div className="product-meta"><span><MapPin className="inline size-3" /> {product.community}</span><span>{product.availability}</span></div>
              <div className="product-actions">
                <Button variant="outline" size="sm" onClick={() => setSelected(product)}><QrCode /> Trazabilidad</Button>
                <Button size="sm">Contactar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="report-dialog">
          <DialogHeader><DialogTitle>Trazabilidad del producto</DialogTitle><DialogDescription>Información demostrativa de origen y disponibilidad.</DialogDescription></DialogHeader>
          {selected && <div className="trace-detail">
            <QRCodeSVG value={`https://penkay.ec/trazabilidad/${selected.trace}`} size={130} level="M" marginSize={1} />
            <div className="trace-list">
              <div><span>Producto</span><strong>{selected.name}</strong></div>
              <div><span>Productor</span><strong>{selected.producer}</strong></div>
              <div><span>Comunidad</span><strong>{selected.community}</strong></div>
              <div><span>Código</span><strong>{selected.trace}</strong></div>
            </div>
          </div>}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
