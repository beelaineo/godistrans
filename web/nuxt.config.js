export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ART AUCTION FOR TRANS JUSTICE',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Online art auction in memory of Sophie Xeon to benefit the Trans Justice Funding Project. Works by Sparkly Nora Berman, Zoe Chait, Alex Chaves, Eckhaus Latta, Nichole Fitch, Nick Harwood, Matthew Lutz-Kinoy, Blaine O\'Neill, peegirl, Puppies Puppies (Jade Kuriki Olivo), Renata Raksha, Emily Schubert, Analisa Teachworth, Alison Veit, and Jonas Wendelin.' },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/sanity-image-builder.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  generate: {
    fallback: true
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/sanity/module',
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // '@nuxtjs/gtm'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['nuxt-lazy-load', {
      // These are the default values
      images: true,
      videos: true,
      audios: true,
      iframes: true,
      native: true,
      polyfill: true,
      directiveOnly: false,

      // Default image must be in the static folder
      defaultImage: '/preloader.gif',

      // To remove class set value to false
      loadingClass: 'isLoading',
      loadedClass: 'isLoaded',
      appendClass: 'lazyLoad'
    }]
  ],
  // gtm: {
  //   id: 'GTM-MJPHN7H',
  //   pageTracking: true,
  //   pageViewEventName: 'nuxtRoute'
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  }
}
