import { useEffect } from "react";

const defaultTitle = "Zeltro | Izrada web sajtova i web aplikacija u Srbiji";
const defaultDescription =
  "Zeltro je web agencija iz Srbije za izradu custom web sajtova, web aplikacija, SEO optimizaciju, web dizajn i održavanje sajtova.";
const defaultKeywords =
  "izrada sajtova, custom websites, web apps, SEO optimizacija, web dizajn, održavanje sajtova, Srbija, Zeltro";

const upsertMeta = (
  key: string,
  content: string,
  attribute: "name" | "property" = "name",
) => {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertCanonical = (url: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", url);
};

const Seo: React.FC = () => {
  useEffect(() => {
    const canonicalUrl = `${window.location.origin}/`;

    document.title = defaultTitle;

    upsertMeta("description", defaultDescription);
    upsertMeta("keywords", defaultKeywords);
    upsertMeta("robots", "index, follow, max-image-preview:large");
    upsertMeta("og:type", "website", "property");
    upsertMeta("og:locale", "sr_RS", "property");
    upsertMeta("og:site_name", "Zeltro", "property");
    upsertMeta("og:title", defaultTitle, "property");
    upsertMeta("og:description", defaultDescription, "property");
    upsertMeta("og:url", canonicalUrl, "property");
    upsertMeta(
      "og:image",
      `${window.location.origin}/src/assets/zeltro%20logo.png`,
      "property",
    );
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", "Zeltro | Web agencija Srbija");
    upsertMeta("twitter:description", defaultDescription);
    upsertCanonical(canonicalUrl);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "Zeltro",
          url: canonicalUrl,
          logo: `${window.location.origin}/src/assets/zeltro%20logo.png`,
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
          url: canonicalUrl,
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
