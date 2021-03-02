importScripts('/_nuxt/workbox.4c4f5ca6.js', 'customSw.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/012005c62261f2a41b5c.js",
    "revision": "472cbd934426d4fb6d7247a711b03780"
  },
  {
    "url": "/_nuxt/07314265b079e515f7c4.js",
    "revision": "11fd8c1d0e3aa444a69f57451b534161"
  },
  {
    "url": "/_nuxt/0780338f3a404615a8a1.js",
    "revision": "6db3545ea945b623c18c681ff261e370"
  },
  {
    "url": "/_nuxt/0848e8942f624d695cf8.js",
    "revision": "c7a5cb2df89819ea739b3da066b4f31e"
  },
  {
    "url": "/_nuxt/17c1fd8dc3a43adac230.js",
    "revision": "a6a38ac215d22e49a38d4a6af6629e81"
  },
  {
    "url": "/_nuxt/1b1e9aed121f13d1039d.js",
    "revision": "83ee0c7b88b523edf6ad6e69ce2fe407"
  },
  {
    "url": "/_nuxt/1fe5b0be9198821ff49d.js",
    "revision": "777c74f7a64415992d2320a00f2a8530"
  },
  {
    "url": "/_nuxt/2e6349e1141262402759.js",
    "revision": "39ebd53f269765b8a8822807fe59f19a"
  },
  {
    "url": "/_nuxt/2fdf45318fc4589608d7.js",
    "revision": "ecd3f769683f3925bfc13a275ccef024"
  },
  {
    "url": "/_nuxt/33cef8127bc79692c45b.js",
    "revision": "3821ebc06493db6185b93ab7d1699cc7"
  },
  {
    "url": "/_nuxt/35e4388ece7297d8f4bc.js",
    "revision": "f2f566227611cdf86b9ff345eeae45a6"
  },
  {
    "url": "/_nuxt/3c9c5c01a15987c793ab.js",
    "revision": "f3a1b4984768bbb7e7735455a3218e0b"
  },
  {
    "url": "/_nuxt/3cb122d588bc54bb86fe.js",
    "revision": "24859c7e23367364021555896d5e1ed4"
  },
  {
    "url": "/_nuxt/3e8a21fb33d0107651e8.js",
    "revision": "b55ac7f4903770a247f23a0e80fe47b9"
  },
  {
    "url": "/_nuxt/578b0e6c3e3555c5217f.js",
    "revision": "e1588276fac579d2a2b06a102e1886fc"
  },
  {
    "url": "/_nuxt/59126eaeedf239749181.js",
    "revision": "95ff34460cae40359b1cc3d999143392"
  },
  {
    "url": "/_nuxt/602d03c62297180f951a.js",
    "revision": "4fd3a2eb9d3a7a66f05bf2a5324a2b43"
  },
  {
    "url": "/_nuxt/61df8fe1d7df6e03372b.js",
    "revision": "cebcef4fd8fcf390c86c71f14a1f101e"
  },
  {
    "url": "/_nuxt/699b11135626860468a3.js",
    "revision": "73fad6f17c8149294cdb7aa3f710a152"
  },
  {
    "url": "/_nuxt/73f2e98185909c712671.js",
    "revision": "05142cf34f5f6ce011fe68c9c66f3f1e"
  },
  {
    "url": "/_nuxt/8762cbdff2e6134bc4d5.js",
    "revision": "1a51fe19139b3636d9c06954688ca4f8"
  },
  {
    "url": "/_nuxt/88062324be5aa50db4a0.js",
    "revision": "31019f4c818afccebce01611ec01e935"
  },
  {
    "url": "/_nuxt/8cdf28f4ef46033e5a56.js",
    "revision": "91c15d168bb18a4f9b97ee95ff35db30"
  },
  {
    "url": "/_nuxt/9bc18111c681c01f4bb0.js",
    "revision": "0e5214aeb5239b3d818114cb39e1f827"
  },
  {
    "url": "/_nuxt/a106a3e2f148b7ce892f.js",
    "revision": "70c2f12cdddc13449169aa66874be22d"
  },
  {
    "url": "/_nuxt/a683732c63bed974554e.js",
    "revision": "ad86ae3b0a4d4cabf87e8abdf7187edb"
  },
  {
    "url": "/_nuxt/b2cdc1af7716411a93d8.js",
    "revision": "77b1780dc231ac79e60fa52765c2605f"
  },
  {
    "url": "/_nuxt/bb249689f5ccbd1af21d.js",
    "revision": "810f406a11a061b34eaebec9a9833195"
  },
  {
    "url": "/_nuxt/bd01d828ac4ecb288f16.js",
    "revision": "767be714fb36a43ef14ceb77e4dbbd97"
  },
  {
    "url": "/_nuxt/c0fefd1c73e42bcb7029.js",
    "revision": "0b1b800d5c75236b2aa18a05e5182635"
  },
  {
    "url": "/_nuxt/d769f60c1a78ce95d7ae.js",
    "revision": "8f08c4ccd510244af40dee9436c6391b"
  },
  {
    "url": "/_nuxt/dc2714b767947c5ce90e.js",
    "revision": "8878b6a143eaf41256a36182615c14bd"
  },
  {
    "url": "/_nuxt/efad78eb00cc7511df49.js",
    "revision": "1b3e8b84c9279b41231bcf12532a5805"
  },
  {
    "url": "/_nuxt/f8f56583816b601a41d8.js",
    "revision": "6daa8dd8af9aa0aa19694963e695a78b"
  }
], {
  "cacheId": "STYIFpwa",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
