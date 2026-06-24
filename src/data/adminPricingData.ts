export type ProjectPackage = {
  name: string;
  category: string;
  price: string;
  includes: string[];
  excludes?: string[];
};

export type ExtraService = {
  name: string;
  price: string;
  includes: string[];
};

export type MonthlyPackage = {
  name: string;
  price: string;
  includes: string[];
};

export const projectPackages: ProjectPackage[] = [
  {
    name: "Landing page",
    category: "Frontend",
    price: "150-300 EUR",
    includes: [
      "Dizajn po brendu klijenta (boje, font, logo)",
      "Do 5 sekcija (hero, o nama, usluge, recenzije, kontakt)",
      "Responsivnost — mobile, tablet, desktop",
      "Kontakt forma (email notifikacija)",
      "Osnovna SEO podešavanja (meta tagovi, OG tagovi)",
      "Google Analytics integracija",
      "Povezivanje sa domenom klijenta",
    ],
    excludes: [
      "Hosting",
      "Kupovina domena",
      "Copywriting",
      "Prevod na više jezika",
    ],
  },
  {
    name: "Višestranični sajt",
    category: "Frontend",
    price: "350-600 EUR",
    includes: [
      "Sve iz Landing page paketa",
      "Do 15 stranica (Home, O nama, Usluge, Blog, Galerija, Kontakt...)",
      "Animacije i tranzicije (Framer Motion)",
      "Navigacija sa hamburger menijem na mobilnom",
      "Galerija slika ili portfolio sekcija",
      "Sitemap.xml i robots.txt",
      "Optimizacija brzine učitavanja (lazy loading, kompresija slika)",
    ],
    excludes: [
      "Hosting",
      "Domen",
      "Blog CMS (ručno uređivanje)",
      "Višejezičnost",
    ],
  },
  {
    name: "Web aplikacija",
    category: "Fullstack",
    price: "800-1800 EUR",
    includes: [
      "Sve iz Višestraničnog sajta",
      "Backend API (.NET / Node.js)",
      "Baza podataka (SQL Server / PostgreSQL)",
      "Sistem za prijavu / registraciju (autentikacija)",
      "Admin panel za upravljanje sadržajem",
      "Korisnički rolovi i permisije",
      "Deployment na cloud server (Railway, Render ili VPS)",
      "Osnovna dokumentacija za korišćenje",
    ],
    excludes: [
      "Mobilna aplikacija",
      "Napredna integracija sa trećim servisima (ERP, platni sistemi)",
    ],
  },
];

export const additionalServices: ExtraService[] = [
  {
    name: "Web dizajn u Figmi",
    price: "100-200 EUR",
    includes: [
      "Wireframe, Hi-fi mockup, Desktop + mobilna verzija",
      "Odabir tipografije i palete boja, Figma komponente",
    ],
  },
  {
    name: "Landing page kampanja",
    price: "250-450 EUR",
    includes: ["CTA fokus, brz load time, integracija Pixel-a i GTM-a"],
  },
  {
    name: "Google PageSpeed Insights optimizacija",
    price: "80-150 EUR",
    includes: [
      "Audit performansi i Core Web Vitals preporuke",
      "Optimizacija slika, fontova i JS/CSS resursa",
    ],
  },
];

export const monthlyPackages: MonthlyPackage[] = [
  {
    name: "Basic održavanje",
    price: "30-45 EUR / mes",
    includes: [
      "Hosting",
      "SSL sertifikat",
      "Nedeljni backup",
      "Uptime monitoring",
      "Tehnička podrška (email, 24h response)",
    ],
  },
  {
    name: "Standard održavanje",
    price: "60-80 EUR / mes",
    includes: [
      "Sve iz Basica",
      "Do 2h sitnih izmena mesečno (tekst, slike, cene)",
      "Priority support (24h response)",
      "Mesečni izveštaj poseta (Google Analytics)",
      "Google My Business — ažuriranje podataka i fotografija",
      "Jedna runda bezbednosnih provera mesečno",
    ],
  },
  {
    name: "SEO paket",
    price: "100-150 EUR / mes",
    includes: [
      "Keyword istraživanje i strategija",
      "On-page SEO optimizacija (naslovi, meta opisi, struktura)",
      "Google Search Console — praćenje i greške",
      "Pagespeed optimizacija",
      "Lokalni SEO (Google Maps rang)",
      "Link building — osnovan (direktorijumi, lokalni sajtovi)",
      "2 SEO blog posta mesečno",
      "Detaljni mesečni izveštaj — rangovi, promet, preporuke",
    ],
  },
];
