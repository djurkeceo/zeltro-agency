// scripts/prerender.mjs
//
// Pokrece se NAKON "vite build" (vidi package.json). Uzima vec izgradjen
// dist/ folder, servira ga lokalno preko Vite preview API-ja, otvara ga u
// headless Chromium-u, simulira skrolovanje (da bi se aktivirali svi
// Framer Motion `useInView` triggeri), i onda finalni renderovani HTML
// upisuje nazad u dist/index.html.
//
// Rezultat: crawleri i korisnici odmah dobijaju kompletan tekst stranice u
// raw HTML-u, bez potrebe da izvrsavaju JavaScript.

import { preview } from 'vite'
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const PORT = 4173

async function run() {
  console.log('▶ Pokrecem lokalni preview server za dist/...')
  const server = await preview({ preview: { port: PORT } })

  const url = `http://localhost:${PORT}/`

  console.log('▶ Otvaram headless browser...')
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  await page.goto(url, { waitUntil: 'networkidle' })

  console.log('▶ Simuliram skrolovanje da aktiviram useInView animacije...')
  await page.evaluate(async () => {
    const step = 400
    const delay = 120
    // Skroluj do dna, korak po korak, da svaka useInView (amount: 0.1)
    // sekcija stigne da udje u viewport i aktivira svoju animaciju.
    while (
      window.scrollY + window.innerHeight <
      document.documentElement.scrollHeight
    ) {
      window.scrollBy(0, step)
      await new Promise((r) => setTimeout(r, delay))
    }
    // Vrati na vrh stranice pre snimanja HTML-a
    window.scrollTo(0, 0)
  })

  // Sacekaj da se sve tranzicije/animacije zavrse i DOM stabilizuje
  await page.waitForTimeout(1000)

  console.log('▶ Snimam finalni renderovani HTML...')
  const html = await page.content()

  await browser.close()
  await server.httpServer.close()

  const outPath = path.resolve('dist', 'index.html')
  fs.writeFileSync(outPath, html, 'utf-8')

  console.log(`✔ Prerendering zavrsen -> ${outPath}`)
}

run().catch((err) => {
  console.error('✘ Prerender neuspesan:', err)
  process.exit(1)
})
