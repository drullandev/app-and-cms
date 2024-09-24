import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import visualizer from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ],
  server: {
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
  define: {
    'process.env': process.env,
  },
  optimizeDeps: {
    exclude: ['stuff/*'], // Excluir la carpeta 'stuff' de la optimización de dependencias
  },
  rollupInputOptions: {
    // Opciones de Rollup (opcional)
    input: {
      include: ['src/**', 'core/**'],
      exclude: ['stuff/**'], // Excluir la carpeta 'stuff' de la entrada de Rollup
    },
    output: {
      manualChunks: true, // 2000 kB (2 MB)
    },
  },
  build: {
    chunkSizeWarningLimit: 1536,
  },  
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "core/theme/variables.css";`, // Importa variables globales si es necesario
      },
    },
  },
  
});

