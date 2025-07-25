import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  server: {
    port: 4321,
    host: true
  },
  // GitHub Pages Configuration
  site: 'https://github.com/IssaGithub',
  base: '/RelaunchManager',
  // Optimize for static site generation
  output: 'static',
  build: {
    assets: 'assets'
  }
}); 