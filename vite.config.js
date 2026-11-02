import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps asset paths relative, so the build works on GitHub Pages
// (project subpaths), Netlify, Vercel, or a plain static host without edits.
/* The entry stylesheet only discovers the font after it has been parsed, which
   delays first paint by roughly the font's own download time. Emitting a
   preload for it recovers that. Reading the filename from the bundle keeps the
   hash and the `base` correct instead of hardcoding a path. */
function preloadEntryFont() {
  return {
    name: 'preload-hero-assets',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      const files = Object.keys(ctx.bundle || {})
      const font = files.find((f) => /jetbrains-mono.*\.woff2$/.test(f))
      /* The hero portrait is the LCP element, and its CSS mask is only
         discovered after the stylesheet parses, preloading both moves LCP
         earlier by about half a second on throttled 4G. */
      const shot = files.find((f) => /portrait-cut-[^.]*\.jpg$/.test(f))
      const mask = files.find((f) => /portrait-cut-mask.*\.png$/.test(f))
      const tags = []
      if (font) tags.push({ tag: 'link', attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: './' + font, crossorigin: '' }, injectTo: 'head-prepend' })
      if (shot) tags.push({ tag: 'link', attrs: { rel: 'preload', as: 'image', href: './' + shot, fetchpriority: 'high' }, injectTo: 'head-prepend' })
      if (mask) tags.push({ tag: 'link', attrs: { rel: 'preload', as: 'image', href: './' + mask }, injectTo: 'head-prepend' })
      if (!tags.length) return html
      return { html, tags }
    },
  }
}

/* robots.txt and sitemap.xml are emitted from VITE_SITE_URL rather than kept
   as static files, because a stale copy of either is invisible until someone
   checks a crawler, and three files disagreeing about the domain is exactly
   how link previews and analytics break. */
function siteFiles(origin) {
  return {
    name: 'emit-site-files',
    /* Vite substitutes %VITE_*% in index.html from real env vars only, so the
       bare host, which Plausible's data-domain needs, without the scheme, is
       derived here rather than duplicated in .env. */
    transformIndexHtml(html) {
      return html.replaceAll('%VITE_SITE_HOST%', origin.replace(/^https?:\/\//, ''))
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source:
`# Allow all crawlers
User-agent: *
Allow: /
Disallow:

Sitemap: ${origin}/sitemap.xml
` })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source:
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Single-page site: sections are fragments, which crawlers ignore as
       separate URLs. The case studies are hash routes for the same reason. -->
  <url>
    <loc>${origin}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
` })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const origin = (env.VITE_SITE_URL || '').replace(/\/$/, '')
  if (!origin) {
    console.warn('\n  [site] VITE_SITE_URL is unset, og:url, canonical and the sitemap will be wrong.\n')
  }
  return baseConfig(origin)
})

function baseConfig(origin) {
  return ({
  base: './',
  plugins: [react(), preloadEntryFont(), siteFiles(origin)],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
}
