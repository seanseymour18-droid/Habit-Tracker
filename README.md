# Daymark

A habit tracker PWA with daily check-offs, a week grid, a monthly streak calendar, and per-habit stats. Data stays in **localStorage** on your device — no account, no cloud sync.

**Live (GitHub Pages):** after the first deploy from `main`, open  
`https://<your-username>.github.io/Habit-Tracker/`

## Features

- Add, edit, and delete habits with color coding
- Week view for fast daily check-offs
- Month view for scannable streaks
- Current streak, best streak, 30-day rate, and total check-offs
- Installable PWA (service worker + offline app shell)
- Persistence via `localStorage` (`daymark:v1`)

## Local development

```bash
npm install
npm run dev
```

Build and preview production output (includes the `/Habit-Tracker/` base path):

```bash
npm run build
npm run preview
```

## GitHub Pages

1. In the repo **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).
3. Open `https://<your-username>.github.io/Habit-Tracker/`.

The Vite `base` is `/Habit-Tracker/` to match this repository name. If you rename the repo, update `base` in `vite.config.ts` and `start_url` / `scope` in the PWA manifest there.

## Add to Home Screen

- **iOS Safari:** Share → Add to Home Screen.
- **Android Chrome:** Menu → Install app / Add to Home Screen.
- **Desktop Chrome/Edge:** install icon in the address bar when available.

Check-offs and habits remain on that device’s browser storage, including when offline after the first visit.
