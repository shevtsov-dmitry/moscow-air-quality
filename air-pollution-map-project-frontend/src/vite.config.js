import { defineConfig } from 'vite';
export default defineConfig({
  entry: 'package.json',
  build: {
    outDir: 'dist',
  },
  server: { // Настройка IP
    port: 3000,
    host: 'localhost',
  },
});
