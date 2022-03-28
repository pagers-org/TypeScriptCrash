import { defineConfig } from 'vite';
import * as path from 'path';

const dirPath = path.resolve(__dirname, './');
const sourcePath = `${dirPath}/src`;

export default defineConfig({
  resolve: {
    alias: {
      '~': dirPath,
      '@': sourcePath,
    },
  },
  server: {
    port: 4000,
  },
});
