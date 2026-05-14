import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  path: string; // e.g. "/", "/cgv"
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  /** Optional list of JSON-LD objects to inject into <head>. */
  jsonLd?: Array<Record<string, unknown>>;
}

const SITE_URL = "https://qitconcierge.fr";
const JSONLD_FLAG = "data-seo-jsonld";

const setMetaByName = (name: string, content: string) => {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setMetaByProperty = (property: string, content: string) => {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export const useSEO = ({ title, description, path, ogTitle, ogDescription, ogImage, jsonLd }: SEOOptions) => {
  useEffect(() => {
    document.title = title;
    setMetaByName("description", description);

    const url = `${SITE_URL}${path}`;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    setMetaByProperty("og:title", ogTitle ?? title);
    setMetaByProperty("og:description", ogDescription ?? description);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:type", "website");

    const image = ogImage ?? "https://qitconcierge.fr/og-image.jpg";
    setMetaByProperty("og:image", image);
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", ogTitle ?? title);
    setMetaByName("twitter:description", ogDescription ?? description);
    setMetaByName("twitter:image", image);

    // JSON-LD: replace any previously injected JSON-LD scripts (per route).
    document
      .querySelectorAll(`script[${JSONLD_FLAG}="true"]`)
      .forEach((el) => el.remove());
    if (jsonLd && jsonLd.length > 0) {
      jsonLd.forEach((data) => {
        const script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute(JSONLD_FLAG, "true");
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

    return () => {
      document
        .querySelectorAll(`script[${JSONLD_FLAG}="true"]`)
        .forEach((el) => el.remove());
    };
  }, [title, description, path, ogTitle, ogDescription, ogImage, jsonLd]);
};
