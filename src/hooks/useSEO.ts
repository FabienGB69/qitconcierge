import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  path: string; // e.g. "/", "/cgv"
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  /** Open Graph type, e.g. "website" or "article". */
  ogType?: string;
  /** Optional list of JSON-LD objects to inject into <head>. */
  jsonLd?: Array<Record<string, unknown>>;
  /** Relative path of the previous document in a sequence (rel="prev"). */
  prevPath?: string;
  /** Relative path of the next document in a sequence (rel="next"). */
  nextPath?: string;
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

/** Ensure exactly one <link rel="..."> with the given href, removing stale ones. */
const setLinkRel = (rel: string, href: string | undefined) => {
  const selector = `link[rel="${rel}"]`;
  if (!href) {
    document.querySelectorAll(selector).forEach((el) => el.remove());
    return;
  }
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export const useSEO = ({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  ogImage,
  ogType,
  jsonLd,
  prevPath,
  nextPath,
}: SEOOptions) => {
  useEffect(() => {
    document.title = title;
    setMetaByName("description", description);

    const url = `${SITE_URL}${path}`;
    setLinkRel("canonical", url);

    setMetaByProperty("og:title", ogTitle ?? title);
    setMetaByProperty("og:description", ogDescription ?? description);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:type", ogType ?? "website");

    const image = ogImage ?? "https://qitconcierge.fr/og-image.jpg";
    setMetaByProperty("og:image", image);
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", ogTitle ?? title);
    setMetaByName("twitter:description", ogDescription ?? description);
    setMetaByName("twitter:image", image);

    // Blog sequence navigation (rel=prev / rel=next).
    setLinkRel("prev", prevPath ? `${SITE_URL}${prevPath}` : undefined);
    setLinkRel("next", nextPath ? `${SITE_URL}${nextPath}` : undefined);

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
  }, [title, description, path, ogTitle, ogDescription, ogImage, ogType, jsonLd, prevPath, nextPath]);
};
