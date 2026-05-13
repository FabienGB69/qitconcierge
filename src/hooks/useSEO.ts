import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  path: string; // e.g. "/", "/cgv"
  ogTitle?: string;
  ogDescription?: string;
}

const SITE_URL = "https://qitconcierge.com";

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

export const useSEO = ({ title, description, path, ogTitle, ogDescription }: SEOOptions) => {
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
  }, [title, description, path, ogTitle, ogDescription]);
};
