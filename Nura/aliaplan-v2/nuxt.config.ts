// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt'],
  css: ['/home/ubuntu/ux/Nura/aliaplan-v2/assets/css/main.css'],
  vite: {
    server: {
      allowedHosts: true,
    },
    optimizeDeps: {
      include: ['html-to-image', 'jspdf'],
    },
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
})
