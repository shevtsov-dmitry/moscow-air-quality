import { defineConfig } from 'vite';
export default defineConfig({
  // entry: 'node-modules-openlayers-vite',
  // resolve: {
  //   alias: {
  //     // create an alias for the renamed node_modules folder
  //     'openlayers': path.resolve(__dirname, 'node-modules-openlayers-vite')
  //   }
  // },
  entry: 'package.json',
  //root: '../air-pollution-map-project-frontend/script',
  // root: path.resolve(__dirname, '../air-pollution-map-project-frontend'),
  // base: './',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  // optimizeDeps: {
  //   include: [
  //     // 'ol/Map.js',
  //     // 'ol/View.js',
  //     './main.js',
  //   ],
  // },
});
