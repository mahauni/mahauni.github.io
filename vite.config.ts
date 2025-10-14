import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
  ],
  base: "/",

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],

          // Router (TanStack Router is quite large)
          'router': [
            '@tanstack/react-router',
            '@tanstack/history',
          ],

          // Terminal libraries (xterm is heavy)
          'terminal': [
            '@xterm/xterm',
            '@xterm/addon-fit',
            '@xterm/addon-web-links',
          ],

          // i18n translations
          'i18n': [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
            'i18next-http-backend',
          ],

          // Markdown rendering
          'markdown': ['react-markdown'],

          // File system
          'filesystem': ['@zenfs/core'],

          // State management
          'state': ['zustand'],
        },
      },
    },
  },
});
