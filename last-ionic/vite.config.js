import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [
        react(),
    ],
    server: {
        port: 3000
    },
    define: {
        'process.env': process.env
    },
    optimizeDeps: {
        exclude: ['stuff/*'], // Excluir la carpeta 'stuff' de la optimización de dependencias
    },
    rollupInputOptions: {
        // Opciones de Rollup (opcional)
        input: {
            include: ['src/**'],
            exclude: ['stuff/**'] // Excluir la carpeta 'stuff' de la entrada de Rollup
        },
        output: {
            manualChunks: true, // 2000 kB (2 MB)
        }
    },
    build: {
        chunkSizeWarningLimit: 2000,
    }
});
