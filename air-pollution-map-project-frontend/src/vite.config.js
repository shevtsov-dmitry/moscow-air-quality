import { defineConfig } from 'vite';
export default defineConfig({
  entry: 'package.json',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    host: 'localhost',
  },
});
