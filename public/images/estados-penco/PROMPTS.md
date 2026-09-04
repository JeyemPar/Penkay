# Estados visuales del penco

Serie cuadrada para tarjetas o indicadores del dashboard. Las tres piezas conservan la misma planta, perspectiva, escala, fondo y estilo visual.

## Penco saludable

```text
Use case: stylized-concept
Asset type: square UI dashboard illustration
Primary request: a single extremely healthy Andean agave plant growing in soil, isolated on a clean white background
Subject: centered agave rosette with symmetrical plump leaves, vibrant green color and a small mound of rich dark moist soil
Style: minimalist modern flat-vector-like illustration for a corporate agriculture application, soft colors, crisp shapes and subtle depth
Constraints: one plant only; entire plant and soil visible; no text, logo, watermark or additional scene elements
```

## Estrés térmico

```text
Use case: precise-object-edit
Input image: healthy-state illustration as the visual anchor
Primary request: transform the same agave into a plant suffering moderate heat stress
Changes: leaves become yellowish olive-green, slightly thinner and drooping, with a few dry brown tips; soil becomes pale, dry and cracked; add a subtle warm glare
Invariants: preserve plant identity, leaf arrangement, viewpoint, scale, soil footprint, square canvas, white background and UI illustration style
Constraints: recoverable stress, not dead; no text, icons, logo or watermark
```

## Recuperación

```text
Use case: precise-object-edit
Input images: heat-stressed state as edit target and healthy state as green-color anchor
Primary request: show the same agave in early recovery after receiving water and care
Changes: restore most leaves to medium agave green and partial firmness; retain a few dry tips; soil becomes dark and moderately moist; remove warm glare
Invariants: preserve plant identity, leaf arrangement, viewpoint, scale, soil footprint, square canvas, white background and UI illustration style
Constraints: recovering but not fully healthy; no puddles, water drops, text, icons, logo or watermark
```

Generadas con el modo integrado de `imagegen`.

