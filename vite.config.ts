import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    build: {
        // One stylesheet instead of three. The whole design system is ~10 KB gzipped,
        // so splitting it only buys extra round trips on the critical path.
        cssCodeSplit: false,
    },
    server: {
        port: 65083,
    }
})
