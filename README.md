# SovereignDent AI Website

Single-page marketing website for SovereignDent AI, the on-premise AI dental receptionist.

## Quick Start

Open `index.html` in any modern web browser. No build step, no dependencies, no server required.

## File Structure

```
website/
├── index.html                 Single-page site (11 sections + footer)
├── thank-you.html             Post-form submission page
├── 404.html                   Custom error page
├── robots.txt                 Search engine directives
├── sitemap.xml                Search engine sitemap
├── css/
│   └── main.css               All styles (custom properties, responsive)
├── js/
│   └── main.js                Navigation, filters, modals, pricing, FAQ
├── images/                    OG image, avatars (placeholder)
│   └── avatars/               Voice avatar images
├── audio/
│   ├── voices/                Voice sample audio files
│   └── demos/                 Full conversation recordings
├── deploy.sh                  Deployment helper script
├── CLOUDFLARE_TUNNEL_SETUP.md Cloudflare tunnel guide (Windows)
├── DEPLOYMENT_STEPS.md        45-minute deployment checklist
└── README.md                  This file
```

## Sections

1. **Hero** — Headline, CTA buttons, key stats
2. **Problem** — 3 pain-point cards with statistics
3. **Solution** — 6 feature cards for Susie
4. **Voice Gallery** — 10 voice personas with filters and player modal
5. **Live Demo** — Glowing CTA button linking to Cloudflare tunnel
6. **Demo Conversations** — 5 audio players for sample calls
7. **How It Works** — 3-step process
8. **Pricing** — 3 tiers with monthly/annual toggle
9. **FAQ** — 8 accordion items
10. **CTA** — Final call to action with trust badges
11. **Footer** — Links and copyright

## Design

- **Colors:** Indigo (#4F46E5), Cyan (#06B6D4), Slate (#0F172A)
- **Typography:** Inter (Google Fonts)
- **Effects:** Scroll reveal, gradient text, glow animations
- **Responsive:** Mobile (375px), Tablet (768px), Desktop (1200px+)
- **Dependencies:** Zero frameworks. One font (Inter via Google Fonts).

## Deploy

See `DEPLOYMENT_STEPS.md` for full instructions. Quick version:

```bash
# GitHub Pages
git init && git add -A && git commit -m "Deploy"
# Push to GitHub, enable Pages in Settings
```

## Live Demo Setup

See `CLOUDFLARE_TUNNEL_SETUP.md` for step-by-step instructions to set up a permanent, free HTTPS URL that connects to your running SovereignDent AI server.

## Cost

| Service | Cost |
|---------|------|
| Hosting (GitHub Pages) | $0/month |
| Live demo (Cloudflare Tunnel) | $0/month |
| SSL | $0 (auto) |
| Domain | ~$12/year |
