import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import mix from 'vite-plugin-mix';

export default defineConfig({
  server: {
    port: 5510,
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          injectOptions: {
            data: { title: '메인' },
          },
          entry: '/src/main.js',
          template: 'index.html',
          filename: 'index.html',
        },
        {
          injectOptions: {
            data: { title: '로그인' },
          },
          entry: '/src/login.js',
          template: 'login.html',
          filename: 'login.html',
        },
      ],
    }),
    mix({
      handler: '../server/main.ts',
    }),
  ],
});
