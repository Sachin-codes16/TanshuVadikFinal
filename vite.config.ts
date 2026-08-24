import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: true,
      watch: {},
      proxy: {
        '/api': {
          // Backend only serves over plain HTTP; port 443 is unreachable.
          target: 'http://api.tanshuvaidik.com',
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // Stray cookies from unrelated local projects sharing the
              // `localhost` domain get attached by the browser and trip the
              // upstream WAF (ModSecurity) on some routes. This API needs
              // no cookie auth, so never forward the browser's cookie jar.
              proxyReq.removeHeader('cookie');
            });
          },
        },
      },
    },
  };
});
