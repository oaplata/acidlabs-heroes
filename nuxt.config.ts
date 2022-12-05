// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
          type: 'module'          
        }
      ]
    }
  }
})
