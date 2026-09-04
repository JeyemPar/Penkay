import type { Metadata } from 'next';
import { DM_Sans, Manrope } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-display',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Penkay | Territorio, producción y conocimiento',
  description:
    'Plataforma para la gestión sostenible, trazable e inclusiva del penco andino.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
