import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import visualizer from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  // Cargamos las variables de entorno según el modo (desarrollo o producción)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    publicDir: 'public',
    plugins: [
      react(),
      visualizer({ open: true })
    ],
    server: {
      port: parseInt(env.VITE_APP_PORT, 10) || 3000,
      hmr: {
        overlay: false,
      },
    },
    optimizeDeps: {
      exclude: ['stuff/*'], // Excluir la carpeta 'stuff' de la optimización de dependencias
      include: ['lodash', 'axios'],
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
    define: {
      'process.env': env, // Definir las variables de entorno cargadas
    },
  };
});
