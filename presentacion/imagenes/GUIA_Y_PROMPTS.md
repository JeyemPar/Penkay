# Imágenes para la presentación de Penkay

Las siete imágenes fueron generadas con el modo integrado de `imagegen`, en formato panorámico 16:9 y con la identidad visual de Penkay: verde bosque, oliva, lima, ocre y crema.

## Uso sugerido

1. `01-portada-penkay-campo-satelite.png`: portada o diapositiva de propuesta de valor. Deja espacio visual a la izquierda para título y subtítulo.
2. `02-arquitectura-tecnologica-penkay.png`: arquitectura del sistema. Representa Sentinel-1/2, captura móvil, React + TypeScript, Vinext + Vite, Cloudflare Workers, Python + YOLO y salidas QR/PDF.
3. `03-machine-learning-vision-artificial.png`: diapositiva específica de machine learning. Explica captura, preparación, visión artificial y decisión asistida.
4. `04-impacto-ambiental-medible.png`: impacto ambiental y trazabilidad. Representa NDVI, humedad, Carbono Orgánico del Suelo (COS), erosión y huella hash.
5. `05-drones-calibracion-multiespectral.png`: operación periódica de dron para calibrar y complementar observaciones satelitales y mediciones de campo.
6. `06-academia-comunidad-productores-campo.png`: intervención de la academia en territorio como trabajo horizontal con productores, comunidad y jóvenes PencoTech.
7. `07-ecosistema-comunidad-academia-productores.png`: relación bidireccional entre comunidad, academia y productores, articulada por Penkay.

## Prompts finales

### 01 · Portada

```text
Use case: photorealistic-natural
Asset type: 16:9 presentation hero image for the Penkay environmental technology platform
Primary request: portray Penkay connecting an Andean agave farmer with satellite environmental intelligence
Scene/backdrop: high-altitude Carchi, Ecuador landscape with terraced penco/agave plots and distant Andes at soft sunrise
Subject: a local adult farmer in practical field clothing, holding a smartphone and inspecting a healthy penco; subtle geospatial overlays suggest parcel boundaries, NDVI and a Sentinel connection
Style/medium: premium photorealistic editorial technology-and-sustainability photography
Composition/framing: farmer and penco on the right third; atmospheric negative space on the left for presentation copy
Color palette: deep forest green, agave olive, warm ochre-gold, cream and natural earth tones
Constraints: scientifically plausible; no readable UI text, logos or watermark; avoid futuristic holograms and visual clutter
```

### 02 · Arquitectura tecnológica

```text
Use case: infographic-diagram
Asset type: 16:9 Penkay technology architecture visual
Primary request: connect field evidence, Earth observation, the web platform and machine learning
Subject: satellite and geolocated mobile inputs feed a central agave/parcel digital twin; the web/cloud platform connects to Python + YOLO and produces QR traceability and PDF reports
Style/medium: refined flat vector-like infographic with slightly dimensional paper-cut layers and Andean contour-map texture
Text (verbatim): "SENTINEL-1 / SENTINEL-2", "CAPTURA MÓVIL", "REACT + TYPESCRIPT", "VINEXT + VITE", "CLOUDFLARE WORKERS", "PYTHON + YOLO", "QR", "PDF"
Constraints: Sentinel-1 depicts SAR through clouds; Sentinel-2 depicts optical vegetation monitoring; no extra text or watermark
```

### 03 · Machine learning

```text
Use case: scientific-educational
Asset type: 16:9 presentation illustration explaining Penkay's machine-learning layer
Primary request: explain how geolocated penco images become actionable crop intelligence through computer vision
Subject: four-stage horizontal pipeline: smartphone capture; image preparation and geolocation; YOLO-style detection with boxes for healthy, stressed or diseased agaves; producer dashboard with risk zones, plant count and recommended inspection
Style/medium: premium hybrid infographic combining realistic botanical imagery with crisp vector overlays
Text (verbatim): "1  CAPTURA", "2  PREPARACIÓN", "3  VISIÓN ARTIFICIAL", "4  DECISIÓN"
Constraints: plausible agave anatomy; boxes align with plants; include small SAR and vegetation-map cues; ML supports rather than replaces the producer; no logos or watermark
```

### 04 · Impacto ambiental medible

```text
Use case: scientific-educational
Asset type: 16:9 presentation image about measurable environmental impact in Penkay
Primary request: visualize the environmental indicators monitored across an Andean penco parcel
Subject: sloped agave field with runoff reduction, rainwater infiltration, roots and soil carbon; remote-sensing overlays for vegetation vigor and surface moisture; environmental passport with QR and tamper-evident hash
Style/medium: scientific editorial illustration blending photorealistic terrain with clean vector data overlays
Text (verbatim): "NDVI", "HUMEDAD", "COS", "EROSIÓN", "HASH"
Constraints: monitoring and estimation, not guaranteed certification; no carbon-credit coins, blockchain-chain imagery, drone, logos or watermark
```

### 05 · Drones para calibración

```text
Use case: photorealistic-natural
Asset type: 16:9 presentation image about periodic drone calibration in Penkay
Primary request: show a technically credible drone survey that calibrates satellite observations and field measurements over an Andean penco parcel
Subject: one professional mapping quadcopter flying a grid mission; a local producer and an academic researcher collaborate beside a ground-control target, tablet, multispectral calibration panel and compact soil tools
Style/medium: premium photorealistic documentary agritech photography
Constraints: communicate calibration rather than permanent surveillance; realistic drone, gimbal, equipment and scale; no spraying, logos, readable screen text or watermark
```

### 06 · Academia, comunidad y productores en campo

```text
Use case: photorealistic-natural
Asset type: 16:9 presentation image about collaboration in Penkay
Primary request: portray a reciprocal field-learning session where community knowledge, academic methods and producer experience shape Penkay together
Subject: two producers, two university researchers and two young PencoTech participants jointly examine an agave, soil sample, tablet image, parcel map and measuring tape
Style/medium: respectful photorealistic documentary photography with candid participation and authentic Andean context
Constraints: all participants work as peers; no savior narrative, lab coats, graduation caps, staged handshake, logos or watermark
```

### 07 · Ecosistema colaborativo

```text
Use case: infographic-diagram
Asset type: 16:9 ecosystem relationship slide for Penkay
Primary request: visualize the direct, reciprocal relationship between community, academia and producers, coordinated through Penkay
Subject: three equal stakeholder nodes in a triangle connected by bidirectional arrows; Penkay is a compact digital agave/parcel hub at the center
Text (verbatim): "COMUNIDAD", "ACADEMIA", "PRODUCTORES", "PENKAY", "DATOS DE CAMPO", "CONOCIMIENTO APLICADO", "DECISIONES PRODUCTIVAS"
Constraints: all stakeholder groups have equal visual weight; community contributes local knowledge and youth participation; academia validates and trains; producers contribute evidence and apply decisions; no hierarchy, logos or watermark
```

## Base técnica usada

- Sentinel-2: NDVI y SAVI para salud vegetal y biomasa foliar.
- Sentinel-1 SAR: humedad superficial, rugosidad y apoyo al análisis de erosión bajo nubosidad.
- Captura móvil geolocalizada: evidencia de campo y futura base de entrenamiento.
- Machine learning: Python y detección tipo YOLO para estrés hídrico, enfermedad y conteo de plantas.
- Frontend actual: React 19, TypeScript, Vinext, Vite, Tailwind CSS y componentes Shadcn/Base UI.
- Runtime objetivo: Cloudflare Workers.
- Trazabilidad: QR, PDF y huella hash para integridad de reportes.
- Drones: levantamientos periódicos de alta resolución para calibración, no como mecanismo rutinario permanente.
- Academia y PencoTech: validación metodológica, formación de jóvenes, análisis y devolución de conocimiento aplicable en territorio.
- Comunidad y productores: conocimiento local, evidencias de campo y adopción de decisiones productivas y ambientales.
