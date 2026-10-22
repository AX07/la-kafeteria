# La Kafeteria Assets Directory

This directory hosts brand assets, food photography, atmosphere photos, and icons for the La Kafeteria web application.

## Directory Structure

```
/public/assets/
├── logo.svg              # Scalable luxury vector logo (Golden 'K' & 'COFFEE AND BREAKFAST.')
├── logo.png              # High-resolution raster logo mark (2048x2048)
├── logo.jpg              # High-resolution JPEG logo asset
├── branding/             # Brand identity files, banners, vector marks
├── food/                 # Food & dish photography (pitufos, huevos benedict, smoothies)
├── atmosphere/           # Terrace, espresso machine extraction, and interior photos
└── icons/                # Specialty coffee symbols & dietary badges
```

## How to Reference in Code

All files placed inside `/public/assets/` can be directly referenced in the Vite application using absolute root paths:

- Logo: `"/assets/logo.svg"` or `"/assets/logo.png"`
- Food item: `"/assets/food/pitufo-serrano.jpg"`
- Atmosphere: `"/assets/atmosphere/patio-sol.jpg"`

## Logo Palette
- Canvas Base: `#16100c` / `#1b1411`
- Monogram 'K' Gold: `#c89666` (Gradient `#dfa05d` to `#ad7643`)
- Subtitle Cream: `#ede0d0`
