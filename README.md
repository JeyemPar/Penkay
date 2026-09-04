# Penkay

Prototipo funcional responsive de Penkay, basado en el documento fuente `PencoNexo_Wireframe_Funcional_TS_JS.md`.

## Requisitos

- Node.js 22.13 o superior
- pnpm 11

## Iniciar en desarrollo

```bash
pnpm install
pnpm dev
```

Abre `http://localhost:3000`.

### Desde VS Code sin `pnpm` global

Con la carpeta `D:\Terraventure_Hackaton` abierta en VS Code:

1. Presiona `Ctrl+Shift+P`.
2. Selecciona **Tasks: Run Task** / **Tareas: Ejecutar tarea**.
3. Ejecuta **Penkay: iniciar**.

También puedes iniciarlo desde PowerShell dentro de la carpeta `penkay`:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\iniciar.ps1 dev
```

El iniciador usa Node.js instalado en el sistema o el runtime local disponible y no requiere que `pnpm` esté agregado al `PATH` cuando las dependencias ya existen.

## Acceso de demostración

- Usuario: `productor@penkay.ec`
- Contraseña: `Penkay2026`

La autenticación es simulada para el prototipo y no requiere variables de entorno. Los datos visibles son genéricos y están marcados como escenario piloto.

## Rutas implementadas

- `/` — sitio público y panorama de la red
- `/login` — acceso de demostración por rol
- `/perfil` — dashboard del productor
- `/parcelas` — mapa y registro local de parcelas
- `/plantas` — métricas y registro local de plantas
- `/productos` — catálogo filtrable y trazabilidad QR
- `/proveedores` — insumos, servicios y distribución
- `/comunidad` — academia, PencoTech y alianzas
- `/greenbank` — indicadores y pasaporte ambiental
- `/reportes` — generación de vistas imprimibles

## Producción

```bash
pnpm build
pnpm start
```

Las integraciones con Supabase, PostGIS, MapLibre, almacenamiento y autenticación real quedan desacopladas del prototipo para que pueda levantarse sin credenciales externas.
