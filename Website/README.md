# 7PAX Virtual Railway Travel Website

Immersive Next.js + Three.js travel website with a cinematic railway station hero. The opening scene has a moving train, platform passengers, station architecture, greenery, layered mountains and a scroll-controlled journey from city station into countryside.

## Run

From the `Website` directory, use Node.js 18.18 or newer and npm:

```bash
npm ci
npm run dev
```

Open http://localhost:3000

## Production

```bash
npm ci
npm run build
npm start
```

## Deploy to Vercel

Import the repository in Vercel and set **Root Directory** to `Website`. Vercel will detect Next.js and use the included `vercel.json` configuration.

The project does not require environment variables for the enquiry form in its current configuration. Add `NEXT_PUBLIC_SITE_URL` in Vercel when a custom production domain is available, then update the metadata URL in `app/layout.tsx` if the domain differs from `https://7pax.in`.
