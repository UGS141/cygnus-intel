import { useEffect } from 'react';

const CANONICAL_ORIGIN = 'https://www.cygnuslabs.si';
const DEFAULT_IMAGE = 'https://www.cygnuslabs.si/brand/cygnus-logo.png';

export const SEO = ({
  title,
  description,
  canonicalPath = '/',
  ogType = 'website',
  schema,
}) => {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
    }

    // Helper for updating or creating meta tag
    const setMetaTag = (attribute, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', 'index, follow');

    // 3. Canonical Link
    const normalizedPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = `${CANONICAL_ORIGIN}${normalizedPath === '/' ? '/' : normalizedPath}`;
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Cygnus AI Labs');
    setMetaTag('property', 'og:image', DEFAULT_IMAGE);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', DEFAULT_IMAGE);

    // 6. JSON-LD Structured Data
    let scriptEl = document.getElementById('seo-jsonld');
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'seo-jsonld';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, canonicalPath, ogType, schema]);

  return null;
};

export default SEO;
