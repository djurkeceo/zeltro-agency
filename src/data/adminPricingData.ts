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
    name: 'Landing page',
    category: 'Frontend',
    price: '150-300 EUR',
    includes: [
      'Dizajn po brendu klijenta (boje, font, logo)',
      'Do 5 sekcija (hero, o nama, usluge, recenzije, kontakt)',
      'Responsivnost — mobile, tablet, desktop',
      'Kontakt forma (email notifikacija)',
      'Osnovna SEO podešavanja (meta tagovi, OG tagovi)',
      'Google Analytics integracija',
      'Povezivanje sa domenom klijenta',
      'Jedna runda revizija uključena',
    ],
    excludes: ['Hosting', 'Kupovina domena', 'Copywriting', 'Prevod na više jezika'],
  },
  {
    name: 'Višestranični sajt',
    category: 'Frontend',
    price: '350-600 EUR',
    includes: [
      'Sve iz Landing page paketa',
      'Do 6-7 stranica (Home, O nama, Usluge, Blog, Galerija, Kontakt...)',
      'Animacije i tranzicije (Framer Motion)',
      'Navigacija sa hamburger menijem na mobilnom',
      'Galerija slika ili portfolio sekcija',
      'Sitemap.xml i robots.txt',
      'Optimizacija brzine učitavanja (lazy loading, kompresija slika)',
      'Dve runde revizija uključene',
    ],
    excludes: ['Hosting', 'Domen', 'Blog CMS (ručno uređivanje)', 'Višejezičnost'],
  },
  {
    name: 'Web aplikacija',
    category: 'Fullstack',
    price: '800-1800 EUR',
    includes: [
      'Sve iz Višestraničnog sajta',
      'Backend API (.NET / Node.js)',
      'Baza podataka (SQL Server / PostgreSQL)',
      'Sistem za prijavu / registraciju (autentikacija)',
      'Admin panel za upravljanje sadržajem',
      'Korisnički rolovi i permisije',
      'Deployment na cloud server (Railway, Render ili VPS)',
      'Osnovna dokumentacija za korišćenje',
    ],
    excludes: [
      'Mobilna aplikacija',
      'Napredna integracija sa trećim servisima (ERP, platni sistemi)',
    ],
  },
];

export const additionalServices: ExtraService[] = [
  {
    name: 'Web dizajn u Figmi',
    price: '100-200 EUR',
    includes: [
      'Wireframe, Hi-fi mockup, Desktop + mobilna verzija',
      'Odabir tipografije i palete boja, Figma komponente',
    ],
  },
  {
    name: 'Landing page kampanja',
    price: '250-450 EUR',
    includes: ['CTA fokus, brz load time, integracija Pixel-a i GTM-a'],
  },
];

export const monthlyPackages: MonthlyPackage[] = [
  {
    name: 'Basic održavanje',
    price: '35-50 EUR / mes',
    includes: ['Hosting', 'SSL sertifikat', 'Backup', 'Monitoring'],
  },
  {
    name: 'Standard održavanje',
    price: '50-80 EUR / mes',
    includes: ['Sve kao u Basic', 'Sitne izmene', 'Priority support'],
  },
  {
    name: 'SEO paket',
    price: '70-120 EUR / mes',
    includes: [
      'Sve kao u Standard',
      'Keyword istraživanje',
      'On-page optimizacija',
      'Google Search Console',
      'Pagespeed optimizacija',
      'Lokalni SEO',
      'Mesečni izveštaj',
    ],
  },
];
