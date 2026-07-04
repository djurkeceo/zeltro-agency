// scripts/prerender.mjs
//
// Pokrece se NAKON "vite build". Servira dist/ lokalno preko Vite preview
// API-ja, otvara ga u headless browseru, simulira skrolovanje (da bi se
// aktivirali Framer Motion useInView triggeri), i upisuje finalni
// renderovani HTML nazad u dist/index.html.
//
// VAZNA NAPOMENA O BROWSER-U:
// Standardni Playwright Chromium radi odlicno lokalno, ali NE RADI na
// Vercel-ovom build kontejneru - nedostaju mu sistemske biblioteke
// (libnspr4.so i slicne) koje taj minimalni Linux image nema, a
// "playwright install chromium" ih ne instalira (samo preuzima browser
// binary, ne OS-level dependency-je).
//
// Zato: na Vercel-u (VERCEL=1, automatski postavljen env var) koristimo
// @sparticuz/chromium - Chromium build koji dolazi sa svim potrebnim
// bibliotekama "upakovanim" unutra, pravljen bas za ova ogranicena
// build/serverless okruzenja. Lokalno i dalje koristimo obican Playwright.

import { preview } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

const PORT = 4173
const URL = `http://localhost:${PORT}/`

async function simulateScroll(page) {
  // Sajt koristi Framer Motion `useInView` (amount: 0.1, once: true) -
  // elementi pocinju kao opacity:0 dok ne udju u viewport. Da bi se u
  // prerenderovanom HTML-u sacuvao FINALNI (vidljiv) izgled stranice,
  // moramo proscrollati celu stranicu pre snimanja HTML-a.
  await page.evaluate(async () => {
    const step = 400
    const delay = 120
    while (
      window.scrollY + window.innerHeight <
      document.documentElement.scrollHeight
    ) {
      window.scrollBy(0, step)
      await new Promise((r) => setTimeout(r, delay))
    }
    window.scrollTo(0, 0)
  })
}

async function renderWithPlaywright() {
  const { chromium } = await import('playwright')
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  await page.goto(URL, { waitUntil: 'networkidle' })
  await simulateScroll(page)
  await page.waitForTimeout(1000)

  const html = await page.content()
  await browser.close()
  return html
}

async function renderWithSparticuz() {
  const chromium = (await import('@sparticuz/chromium')).default
  const puppeteer = (await import('puppeteer-core')).default

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  })
  const page = await browser.newPage()

  await page.goto(URL, { waitUntil: 'networkidle2' })
  await simulateScroll(page)
  await new Promise((r) => setTimeout(r, 1000))

  const html = await page.content()
  await browser.close()
  return html
}

async function renderPage() {
  if (process.env.VERCEL) {
    console.log('▶ Detektovan Vercel build - koristim @sparticuz/chromium...')
    return renderWithSparticuz()
  }
  console.log('▶ Lokalno okruzenje - koristim Playwright...')
  return renderWithPlaywright()
}

async function run() {
  console.log('▶ Pokrecem lokalni preview server za dist/...')
  const server = await preview({ preview: { port: PORT } })

  const html = await renderPage()

  await server.httpServer.close()

  const outPath = path.resolve('dist', 'index.html')
  fs.writeFileSync(outPath, html, 'utf-8')

  console.log(`✔ Prerendering zavrsen -> ${outPath}`)
}

run().catch((err) => {
  console.error('✘ Prerender neuspesan:', err)
  process.exit(1)
})
