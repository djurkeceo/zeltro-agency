import { useEffect } from "react";

const SITE_URL = "https://zeltro.agency";

const defaultDescription =
  "Zeltro je web agencija iz Srbije za izradu custom web sajtova, web aplikacija, SEO optimizaciju, web dizajn i održavanje sajtova.";

const Seo: React.FC = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "Zeltro",
          url: `${SITE_URL}/`,
          logo: `${SITE_URL}/zeltro-logo.png`,
          sameAs: [
            "https://www.linkedin.com/company/zeltro-agency/",
            "https://github.com/djurkeceo",
          ],
        },
        {
          "@type": "ProfessionalService",
          name: "Zeltro",
          description: defaultDescription,
          areaServed: "RS",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Subotica",
            addressCountry: "RS",
          },
          serviceType: [
            "Izrada custom web sajtova",
            "Izrada web aplikacija",
            "SEO optimizacija",
            "Web dizajn",
            "Održavanje sajtova",
          ],
          url: `${SITE_URL}/`,
        },
      ],
    };

    let scriptTag = document.getElementById("zeltro-schema");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "zeltro-schema";
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);
  }, []);

  return null;
};

export default Seo;
