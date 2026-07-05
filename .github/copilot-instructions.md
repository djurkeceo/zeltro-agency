# Copilot Instructions for `zeltro-agency`

## Build, lint, and test commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

- There is currently **no test runner configured** (`package.json` has no `test` script and no `*.test`/`*.spec` files).
- Single-test execution is not available until a test framework is added.

## High-level architecture

- This repository is a **Vite + React + TypeScript** marketing site for Zeltro Agency (Serbian-language content and SEO metadata).
- Runtime entrypoint is `src/main.tsx`, which uses **path-based branching instead of React Router**:
  - `/admin` renders the lazy-loaded `AdminPanel`
  - any other path renders the public landing page app (`App`)
- Public landing page (`src/App.tsx`) is section-based and heavily optimized for first paint:
  - `Hero` is eagerly rendered
  - other sections (`Navbar`, `About`, `Services`, `Projects`, `Pricing`, `Process`, `Contact`, `Footer`) are `React.lazy` + `Suspense`
  - Framer Motion uses `LazyMotion` with `domAnimation`
- Admin flow spans frontend and serverless API:
  - frontend: `src/components/AdminPanel.tsx`
  - API routes: `api/admin/login.js`, `api/admin/session.js`, `api/admin/logout.js`
  - shared auth helpers: `api/_lib/adminAuth.js`
  - auth is cookie-based (`zeltro_admin_session`) with HMAC signature + expiration, driven by env vars:
    - `ADMIN_USERNAME`
    - `ADMIN_PASSWORD`
    - `ADMIN_SESSION_SECRET`
- Contact form is Formspree-based (`src/components/Contact.tsx`) and reads `VITE_FORMSPREE_FORM_ID` (with fallback).
- Deployment assumptions are Vercel-oriented (`vercel.json`): SPA rewrite to `index.html` plus explicit cache headers.

## Key conventions specific to this codebase

- **No client router:** keep navigation section-based (`id` anchors + `scrollIntoView`) and preserve the `/admin` path switch in `main.tsx`.
- **Animation style is consistent:** Framer Motion components are typically imported as `m`; hover/tap interactions use spring transitions and glassmorphism visuals.
- **Styling pattern:** each UI component has a colocated CSS file (`Component.tsx` + `Component.css`), while shared tokens/utilities live in `src/index.css` and `src/styles/variables.css` (`.container`, `.glass`, `.gradient-text`, spacing/color variables).
- **Performance pattern:** preserve lazy-loading strategy and Vite manual chunking in `vite.config.ts` (`vendor-react`, `vendor-react-dom`, `vendor-motion`, `vendor-formspree`, `vendor`).
- **Admin pricing data is centralized** in `src/data/adminPricingData.ts` and consumed by `AdminPanel`; update this file first for package/offer changes.
- **Content and SEO are Serbian-first:** new public-facing copy, metadata, and structured data should stay aligned with existing Serbian locale (`lang="sr"`, `og:locale="sr_RS"`).
