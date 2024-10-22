import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import visualizer from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    publicDir: 'public',
    root: 'src',
    plugins: [
      react(),
      visualizer({ open: true })
    ],
    resolve: {
      // alias: {
      //   '@components': path.resolve(__dirname, './core/components'),
      //   '@models': path.resolve(__dirname, './core/classes/strapi/models'),
      //   '@my-utils': path.resolve(__dirname, './core/classes/utils'),
      //   '@form': path.resolve(__dirname, './core/components/main/Form'),
      //   '@stores': path.resolve(__dirname, './core/integrations/stores'),
      //   '@validations': path.resolve(__dirname, './core/classes/strapi/validations')
      // }
    },
    server: {
      port: parseInt(env.VITE_APP_PORT, 10) || 3000,
      hmr: {
        overlay: false,
      },
    },
    optimizeDeps: {
      exclude: [],
      include: ['lodash', 'axios'],
    },
    rollupInputOptions: {
      input: {
        include: ['src/**'],
        exclude: [],
      },
      output: {
        manualChunks: true,
      },
    },
    build: {
      chunkSizeWarningLimit: 1536,
      rollupOptions: external,
    },
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `@import "src/theme/variables.css";`,
        },
      },
    },
    define: {
      'process.env': env,
    },
  };
});
