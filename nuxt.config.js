const webpack = require('webpack');
const pkg = require('./package')
const test = `.env.${process.env.MODE}`

const baseURL = process.env.MODE === 'production' ? 'https://service.styfi.in' : 'http://service.lightbuzz.in'

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  router: {
    middleware: ["route"]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["~assets/style/common.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.js',
    { src: '~/plugins/vueCarousel.js', ssr: false },
    // { src: '~/plugins/sw.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/dotenv', { filename: test }],
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/router',
    '@nuxtjs/pwa',
    // '@nuxtjs/dotenv',
  ],

  // /*
  //  ** manifest
  //  */
  workbox: {
    // autoRegister : true,
    // dev : true,
    importScripts: [
      'customSw.js'
    ],
    // config : {
    //   debug : true
    // }
  // Workbox options
  },
  // manifest: {
  //   "name" : "STYFI - Curated Fashion",
  //   "short_name" : "STYFI",
  //   "theme_color" : "#323A45",
  //   "background_color" : "#323A45",
  //   "display" : "standalone",
  //   "orientation" : "portrait",
  //   "Scope" : ".",
  //   "start_url" : "/",
  //   "lang" : "English",
  //   "description" : "Curated online shopping platform in India. Buy clothing, footwear, and accessories handpicked by stylists for men & women",
  //   "icons" : [
  //     {
  //       "src": "https://www.styfi.in/images/icons/icon-72x72.png",
  //       "sizes": "72x72"
  //     },
  //     {
  //       "src": "https://www.styfi.in/images/icons/icon-96x96.png",
  //       "sizes": "96x96"
  //     },
  //     {
  //       "src": "https://www.styfi.in/images/icons/icon-128x128.png",
  //       "sizes": "128x128"
  //     },
  //     {
  //       "src": "https://www.styfi.in/images/icons/icon-144x144.png",
  //       "sizes": "144x144"
  //     },
  //     {
  //       "src": "https://www.styfi.in/images/icons/icon-152x152.png",
  //       "sizes": "152x152"
  //     },
  //     {
  //       "src": "https://www.styfi.in/images/icons/icon-192x192.png",
  //       "sizes": "192x192"
  //     },
  //     {
  //       "src": "https://www.styfi.in/images/icons/icon-384x384.png",
  //       "sizes": "384x384"
  //     },
  //     {
  //       "src": "https://www.styfi.in/images/icons/icon-512x512.png",
  //       "sizes": "512x512"
  //     }
  //   ]
  // },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: baseURL,
    proxyHeaders: true
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        });
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        // 'process.BASERURL': '"http://service.lightbuzz.in"',
        // 'process.env.VUE_APP_APIURL' : '"http://service.lightbuzz.in"',
        // 'process.env.VUE_APP_CHECKOUT' : '"http://checkout.lightbuzz.in"',
        // 'process.env.VUE_APP_STYFIPROFILE' : '"http://profile.lightbuzz.in"',
        // 'process.env.VUE_APP_STYFIORDER' : '"http://profile.lightbuzz.in/orders"',
        // 'process.env.VUE_APP_STYFIWISHLIST' : '"http://profile.lightbuzz.in/wishlist"',
        // 'process.env.VUE_APP_STYFIENGAGE' : '"http://engage.lightbuzz.in"',
        // 'process.env.VUE_APP_CARTSYNC' : '"http://service.lightbuzz.in"',
        // 'process.env.VUE_APP_CARTID' : 'cartId',
        
      })
    ]
  }
};
