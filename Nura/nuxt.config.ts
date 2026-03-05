// https://nuxt.com/docs/api/configuration/nuxt-config
const baseURL = process.env.NUXT_APP_BASE_URL || '/nura-app/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['/home/ubuntu/ux/Nura/assets/css/main.css'],
  app: {
    baseURL,
    head: {
      title: 'ALIA - Jornada de Vida',
      link: [
        { rel: 'icon', type: 'image/png', href: `${baseURL}favicon.png`.replace('//', '/') },
      ],
    },
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
})
