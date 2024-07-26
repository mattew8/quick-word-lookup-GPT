import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        'service-worker': resolve(__dirname, 'src/app/service-worker.ts'),
        'side-panel': resolve(__dirname, 'src/app/side-panel.html'),
        'content-scripts': resolve(__dirname, 'src/app/content-scripts.ts'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (
            chunkInfo.name === 'service-worker' ||
            chunkInfo.name === 'content-scripts'
          ) {
            return `src/app/[name].js`;
          }
          return 'assets/[name].[hash].js'; // Default for other entries
        },
      },
    },
  },
});
