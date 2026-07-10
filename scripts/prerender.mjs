// scripts/prerender.mjs
//
// Pokrece se NAKON "vite build" (vidi package.json "build" skriptu).
// Servira dist/ lokalno preko Vite preview API-ja, otvara ga u headless
// Playwright Chromium-u, simulira skrolovanje (da bi se aktivirali Framer
// Motion useInView triggeri), i upisuje finalni renderovani HTML nazad u
// dist/index.html.
//
// NAPOMENA: Ova skripta se izvrsava ISKLJUCIVO u okruzenjima koja imaju
// Playwright-ove sistemske biblioteke instalirane preko
// `npx playwright install --with-deps chromium` - lokalno na desktop-u,
// ili u GitHub Actions (ubuntu-latest runner, koji ima apt-get/sudo).
// NE izvrsava se direktno na Vercel-u (njihov build sandbox nema apt-get
// i ne moze da instalira potrebne sistemske biblioteke) - Vercel samo
// deploy-uje vec zavrsen dist/ folder preko "vercel deploy --prebuilt".

import { preview } from "vite";
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const PORT = 4173;
const URL = `http://localhost:${PORT}/`;
const PRODUCTION_ORIGIN = "https://www.zeltro.agency";

async function simulateScroll(page) {
  // Sajt koristi Framer Motion `useInView` (amount: 0.1, once: true) -
  // elementi pocinju kao opacity:0 dok ne udju u viewport. Da bi se u
  // prerenderovanom HTML-u sacuvao FINALNI (vidljiv) izgled stranice,
  // moramo proscrollati celu stranicu pre snimanja HTML-a.
  await page.evaluate(async () => {
    const step = 400;
    const delay = 120;
    while (
      window.scrollY + window.innerHeight <
      document.documentElement.scrollHeight
    ) {
      window.scrollBy(0, step);
      await new Promise((r) => setTimeout(r, delay));
    }
    window.scrollTo(0, 0);
  });
}

async function run() {
  console.log("▶ Pokrecem lokalni preview server za dist/...");
  const server = await preview({ preview: { port: PORT } });

  console.log("▶ Otvaram headless Playwright Chromium...");
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  await page.goto(URL, { waitUntil: "networkidle" });

  console.log("▶ Simuliram skrolovanje da aktiviram useInView animacije...");
  await simulateScroll(page);

  // Sacekaj da se sve tranzicije/animacije zavrse i DOM stabilizuje
  await page.waitForTimeout(1000);

  console.log("▶ Snimam finalni renderovani HTML...");
  let html = await page.content();

  await browser.close();
  await server.httpServer.close();

  // Sigurnosna mreza: ako je bilo koji dinamicki kod (npr. Seo.tsx preko
  // window.location.href) upisao lokalnu adresu (http://localhost:4173)
  // negde u HTML (canonical, og:url, JSON-LD...), zamenimo je pravim
  // produkcionim domenom pre nego sto fajl ode na server.
  const localhostPattern = new RegExp(`https?://localhost:${PORT}`, "g");
  html = html.replace(localhostPattern, PRODUCTION_ORIGIN);

  const outPath = path.resolve("dist", "index.html");
  fs.writeFileSync(outPath, html, "utf-8");

  console.log(`✔ Prerendering zavrsen -> ${outPath}`);
}

run().catch((err) => {
  console.error("✘ Prerender neuspesan:", err);
  process.exit(1);
});
