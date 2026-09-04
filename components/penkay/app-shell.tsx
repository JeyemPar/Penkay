'use client';

import type { ReactNode } from 'react';
import {
  Bell,
  BookOpen,
  FileText,
  Home,
  Leaf,
  LogOut,
  Map,
  Menu,
  PackageOpen,
  Sprout,
  Store,
  UserRound,
  Fingerprint,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const links = [
  { label: 'Resumen', href: '/perfil', icon: Home },
  { label: 'Parcelas', href: '/parcelas', icon: Map },
  { label: 'Plantas', href: '/plantas', icon: Sprout },
  { label: 'GreenTrace', href: '/greentrace', icon: Fingerprint },
  { label: 'Productos', href: '/productos', icon: PackageOpen },
  { label: 'Proveedores', href: '/proveedores', icon: Store },
  { label: 'Comunidad', href: '/comunidad', icon: BookOpen },
  { label: 'Reportes', href: '/reportes', icon: FileText },
];

function AppBrand() {
  return (
    <a className="app-brand" href="/">
      <span><Leaf /></span>
      <strong>Penkay</strong>
    </a>
  );
}

function AppNavigation({ active, mobile = false }: { active: string; mobile?: boolean }) {
  return (
    <nav className={mobile ? 'app-mobile-links' : 'app-side-links'} aria-label="Módulos Penkay">
      {links.map((link) => {
        const Icon = link.icon;
        return mobile ? (
          <SheetClose key={link.href} render={<a href={link.href} />} nativeButton={false} className={active === link.label ? 'active' : ''}>
            <Icon /> {link.label}
          </SheetClose>
        ) : (
          <a key={link.href} href={link.href} className={active === link.label ? 'active' : ''}>
            <Icon /> <span>{link.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export function AppShell({
  active,
  eyebrow,
  title,
  description,
  action,
  children,
}: {
  active: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="app-frame">
      <aside className="app-sidebar">
        <AppBrand />
        <div className="app-user-card">
          <Avatar className="app-avatar"><AvatarFallback>JP</AvatarFallback></Avatar>
          <div>
            <strong>Juan Paredes</strong>
            <span>Productor · Carchi</span>
          </div>
          <Badge>piloto</Badge>
        </div>
        <AppNavigation active={active} />
        <a className="app-logout" href="/"><LogOut /> Volver al sitio público</a>
      </aside>

      <div className="app-main-column">
        <header className="app-topbar">
          <div className="app-mobile-brand"><AppBrand /></div>
          <div className="app-network-status"><i /> Sincronizado hace 2 min</div>
          <Button variant="ghost" size="icon-lg" aria-label="Notificaciones" className="notification-button">
            <Bell />
            <span>3</span>
          </Button>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon-lg" className="app-menu-trigger" aria-label="Abrir navegación" />}>
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="mobile-sheet">
              <SheetHeader>
                <SheetTitle>Mi Penkay</SheetTitle>
                <SheetDescription>Productor piloto · Carchi</SheetDescription>
              </SheetHeader>
              <AppNavigation active={active} mobile />
            </SheetContent>
          </Sheet>
        </header>

        <main className="app-content">
          <div className="app-page-heading">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              {description && <p>{description}</p>}
            </div>
            {action && <div className="app-page-action">{action}</div>}
          </div>
          {children}
        </main>

        <nav className="bottom-nav" aria-label="Navegación rápida">
          <a href="/perfil" className={active === 'Resumen' ? 'active' : ''}><Home /><span>Inicio</span></a>
          <a href="/parcelas" className={active === 'Parcelas' || active === 'Plantas' ? 'active' : ''}><Sprout /><span>Cultivo</span></a>
          <a href="/comunidad" className={active === 'Comunidad' ? 'active' : ''}><BookOpen /><span>Comunidad</span></a>
          <a href="/perfil"><UserRound /><span>Perfil</span></a>
        </nav>
      </div>
    </div>
  );
}
