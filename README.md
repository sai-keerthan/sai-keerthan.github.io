# Sai Keerthan Kasula — Portfolio

Cryptographic infrastructure engineer portfolio. Static site, React + Vite + Tailwind, deployed on GitHub Pages.

## Local development

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # produces /dist for deployment
npm run preview  # preview the production build locally
```

## Deployment — GitHub Pages

This repo is configured for **automatic deployment** to `https://sai-keerthan.github.io/` via GitHub Actions. Every push to `main` triggers a build and publishes to GitHub Pages.

### One-time setup

1. **Create the repository on GitHub** named exactly `sai-keerthan.github.io` (must match your username exactly — this is what tells GitHub it's a user site).

2. **Push this project to it:**

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/sai-keerthan/sai-keerthan.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Repo → **Settings** → **Pages**
   - Under **Build and deployment** → **Source**, select **GitHub Actions**
   - The workflow in `.github/workflows/deploy.yml` handles the rest

4. **Wait ~90 seconds** for the first deploy. Watch progress in the **Actions** tab. Once green, the site is live at `https://sai-keerthan.github.io/`.

### Custom domain (optional, later)

If you ever buy a domain (e.g. `keerthankasula.dev`):

1. In your DNS provider, add these records:

   ```
   A    @    185.199.108.153
   A    @    185.199.109.153
   A    @    185.199.110.153
   A    @    185.199.111.153
   CNAME  www  sai-keerthan.github.io.
   ```

2. Add a file at `public/CNAME` containing just your domain on one line.

3. Repo → Settings → Pages → Custom domain → enter your domain → enable **Enforce HTTPS**.

4. The Vite `base` stays at `'/'` — no other changes needed.

## Project structure

```
.
├── .github/workflows/deploy.yml   # Auto-deploy to Pages on push to main
├── public/                        # Static assets (favicon, resume.pdf, CNAME)
├── src/
│   ├── components/                # React components per section
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                  # Tailwind + base styles
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Resume

Place your résumé PDF at `public/resume.pdf` — it will be served at `<site-url>/resume.pdf` and is wired into the "Résumé" button in the navigation.

## Design system

- **Palette**: Editorial Dark — `#0a0a0b` background, `#f5f5f3` text, restrained `#5eead4` accent.
- **Typography**: Cabinet Grotesk (display) + Satoshi (body) + JetBrains Mono (technical captions), loaded from Fontshare.
- **Motion**: Spring-eased entrances on initial render; no perpetual ambient motion.
- **Glass**: Dark glass — `rgba(255,255,255,0.04)` with 20px backdrop blur and 1px subtle border.
