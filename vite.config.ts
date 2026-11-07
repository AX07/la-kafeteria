import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/**
 * SEO plumbing. SITE_URL comes from VITE_SITE_URL, or on Vercel from the
 * production domain it injects at build time. It fills the %SITE_URL% tokens in
 * index.html (canonical, Open Graph, JSON-LD) and emits robots.txt + sitemap.xml.
 */
function seoPlugin(): Plugin {
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const siteUrl = (
    process.env.VITE_SITE_URL ||
    (vercelHost ? `https://${vercelHost}` : '')
  ).replace(/\/+$/, '');

  return {
    name: 'la-kafeteria-seo',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    generateBundle() {
      const robots = [
        'User-agent: *',
        'Allow: /',
        ...(siteUrl ? [`Sitemap: ${siteUrl}/sitemap.xml`] : []),
        '',
      ].join('\n');
      this.emitFile({type: 'asset', fileName: 'robots.txt', source: robots});

      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10);
        const urls = ['/', '/carta']
          .map(
            (p) =>
              `  <url><loc>${siteUrl}${p}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${
                p === '/' ? '1.0' : '0.9'
              }</priority></url>`
          )
          .join('\n');
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), seoPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 700,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
