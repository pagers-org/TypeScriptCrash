import type { UserConfig } from 'vite';

const config: UserConfig = {
  optimizeDeps: {
    include: ['chart.js'],
  },
};

export default config;
