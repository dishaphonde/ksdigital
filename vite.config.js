import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about-us/index.html'),
        services: resolve(__dirname, 'services/index.html'),
        pricing: resolve(__dirname, 'pricing/index.html'),
        contact: resolve(__dirname, 'contact-us/index.html'),
      },
    },
  },
});
