import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GooddollarSavingsWidget',
      fileName: 'gooddollar-savings-widget',
      formats: ['es', 'umd']
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['lit', 'viem'],
      output: {
        globals: {
          lit: 'Lit',
          viem: 'Viem'
        }
      }
    }
  }
}); 