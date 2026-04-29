import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://aestheticiq.co.uk',
  integrations: [
    tailwind({
      applyBaseStyles: false, // we apply our own base in src/styles/global.css
    }),
    sitemap(),
  ],
  build: {
    format: 'directory', // /about/ instead of /about.html (cleaner URLs)
  },
  server: {
    port: 4321,
  },
});
