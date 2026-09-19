# Anu Kalakriti — Static Website (No Backend)

A static React + Vite portfolio website for artist **Anu Jha** showcasing Madhubani & Mithila folk art.

## How it works

- **No backend. No database.** All data lives in `/public/data/*.json` files in this repo.
- Images are linked by URL inside the JSON files (Pexels, Unsplash, or direct GitHub raw URLs).
- Deployed on **Vercel** — every push to `main` auto-redeploys.

## Update artworks / content

1. Edit `frontend/public/data/artworks.json`
2. Commit and push to GitHub
3. Vercel redeploys automatically in ~30 seconds

## Data files

| File | What it controls |
|------|-----------------|
| `frontend/public/data/artworks.json` | All artworks (title, price, images, category…) |
| `frontend/public/data/categories.json` | Art categories (Madhubani, Mithila, Godna…) |
| `frontend/public/data/settings.json` | Site title, contact info, hero text, WhatsApp number |
| `frontend/public/data/testimonials.json` | Customer testimonials |

## Local development

```bash
cd frontend
npm install
npm run dev
```

## Deploy

Vercel is connected to this repo. Any push to `main` deploys automatically.
Build settings (already configured in Vercel):
- **Root directory:** `frontend`
- **Build command:** `npm run build`
- **Output directory:** `dist`
