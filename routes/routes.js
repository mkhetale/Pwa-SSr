/**
 * Every route becomes a chunk, loaded only when used.
 * Reduces size of initial App load.
 */
const routes = [
  {
    name: 'main',
		path: '/',
		component: () => import(/* webpackChunkName: "landing" */'@/pages/landing/main.vue').then(m => m.default || m),
    meta: { header: 'header_withSearch', title: 'Landing', foreignKey: false },
    title: 'STYFI'
  },
  {
    name: 'MenLanding',
    path: '/:gender(men|women)',
    component: () => import(/* webpackChunkName: "genderLanding" */ '@/pages/genderlanding/main.vue').then(m => m.default || m),
    meta: { header: 'header_withSearch', title: 'Landing', foreignKey: false },
    title: 'STYFI'
  },
  {
    name: 'Brands',
    path: '/:gender?/brands',
    component: () => import(/* webpackChunkName: "brandListing" */ '@/pages/brandslisting/main.vue').then(m => m.default || m),
    meta: { header: 'header_backbutton_withSearchIcon', title: 'Brands', foreignKey: false },
    title: 'STYFI'
  },
  {
    name: 'Explore',
    path: '/explore/:gender',
    component: () => import(/* webpackChunkName: "explore" */ '@/pages/explore/main.vue').then(m => m.default || m),
    meta: { header: 'header_burger_withSearchIcon', title: 'Explore', foreignKey: false },
    title: 'STYFI'
  },
  {
    name: 'ReadsList',
    path: '/reads/:gender',
    component: () => import(/* webpackChunkName: "readList" */ '@/pages/reads/main.vue').then(m => m.default || m),
    meta: { header: 'header_burger_withSearchIcon', title: 'ReaderList', foreignKey: true },
    title: 'STYFI'
  },
  {
    name: 'Article',
    path: '/read/:article_slug',
    component: () => import(/* webpackChunkName: "article" */ '@/pages/reads/blogArticle.vue').then(m => m.default || m),
    meta: { header: 'header_backButton_withShareIcon', title: 'Articles', foreignKey: true },
    title: 'STYFI'
  },
  {
    name: 'Collections',
    path: '/collections/:gender(men|women)',
    component: () => import(/* webpackChunkName: "collections" */ '@/pages/collections/main.vue').then(m => m.default || m),
    meta: { header: 'header_burger_withSearchIcon', title: 'Collection', foreignKey: true },
    children: [
      {
        path: ':topic_slug?',
        component: () => import(/* webpackChunkName: "collectionList" */ '@/pages/collections/collectionList.vue').then(m => m.default || m),
        meta: { header: 'header_burger_withSearchIcon', title: 'Collection', foreignKey: true }
      }
    ],
    title: 'STYFI'
  },
  {
    name: 'Looks',
    path: '/looks/:gender(men|women)',
    component: () => import(/* webpackChunkName: "looks" */ '@/pages/looks/main.vue').then(m => m.default || m),
    meta: { header: 'header_burger_withSearchIcon', title: 'Looks', foreignKey: true },
    children: [
      {
        path: ':topic_slug?',
        component: () => import(/* webpackChunkName: "looksList" */ '@/pages/looks/looksList.vue').then(m => m.default || m),
        meta: { header: 'header_burger_withSearchIcon', title: 'Looks', foreignKey: true }
      }
    ],
    title: 'STYFI'
  },
  {
    name: 'LookDetail',
    path: '/looks/:name_slug',
    component: () => import(/* webpackChunkName: "lookdetail" */ '@/pages/lookdetails/main.vue').then(m => m.default || m),
    meta: { header: 'header_transparent_backButton_withOutShare', title: 'Looks', foreignKey: true }
  },
  {
    name: 'LooksSlider',
    path: '/proudctLooks/:productId',
    component: () => import(/* webpackChunkName: "pdp" */ '@/pages/looksSlider/main.vue').then(m => m.default || m),
    meta: { header: 'header_backbutton_withOutSearchIcon', title: 'Looks', foreignKey: false },
    title: 'STYFI'
  },
  /*----------------- Plp-------------------- */
  {
    name: 'Curated',
    path: '/curated/:content_slug',
    component: () => import(/* webpackChunkName: "plp" */ '@/pages/plp/curated.vue').then(m => m.default || m),
    meta: { header: 'header_backbutton_withSearchIcon', foreignKey: true },
    title: 'STYFI'
  },
  {
    name: 'PDP',
    path: '/product/:product_slug',
    component: () => import(/* webpackChunkName: "pdp" */ '@/pages/pdp/main.vue').then(m => m.default || m),
    meta: { header: 'header_transparent_backbutton_withShare', foreignKey: true },
    title: 'STYFI'
  },
  {
    name: 'BrandProfile',
    path: '/brand/:brand_name',
    component: () => import(/* webpackChunkName: "brandProfile" */ '@/pages/plp/brands.vue').then(m => m.default || m),
    meta: { header: 'header_backbutton_withSearchIcon', title: 'BrandProfile', foreignKey: true },
    title: 'STYFI'
  },
  // {
  //   name: 'Curated',
  //   path: '/exclusive/thrasher',
  //   component: () => import(/* webpackChunkName: "plp" */ '@/pages/plp/curated.vue').then(m => m.default || m),
  //   meta: { header: 'header_backbutton_withSearchIcon', foreignKey: true },
  //   title: 'STYFI'
  // },
  // {
  //   name: 'Curated',
  //   path: '/exclusive/thrasher-tshirt',
  //   component: () => import(/* webpackChunkName: "plp" */ '@/pages/plp/curated.vue').then(m => m.default || m),
  //   meta: { header: 'header_backbutton_withSearchIcon', foreignKey: true },
  //   title: 'STYFI'
  // },
  // {
  //   name: 'Curated',
  //   path: '/exclusive/thrasher-hoodies',
  //   component: () => import(/* webpackChunkName: "plp" */ '@/pages/plp/curated.vue').then(m => m.default || m),
  //   meta: { header: 'header_backbutton_withSearchIcon', foreignKey: true },
  //   title: 'STYFI'
  // },
  // {
  //   name: 'Curated',
  //   path: '/exclusive/thrasher-accessories',
  //   component: () => import(/* webpackChunkName: "plp" */ '@/pages/plp/curated.vue').then(m => m.default || m),
  //   meta: { header: 'header_backbutton_withSearchIcon', foreignKey: true },
  //   title: 'STYFI'
  // },
  {
    name: 'PLP',
    path: '/:gender(men|women)-:category_slug',
    component: () => import(/* webpackChunkName: "plp" */ '@/pages/plp/main.vue').then(m => m.default || m),
    meta: { header: 'header_backbutton_withSearchIcon', foreignKey: true },
    title: 'STYFI'
  },
  {
    name: 'CollectionDetail',
    path: '/collections/:name_slug',
    component: () => import(/* webpackChunkName: "collectiondetail" */ '@/pages/plp/collectiondetails.vue').then(m => m.default || m),
    meta: { header: 'header_transparent_backButton_withOutShare', title: 'Looks', foreignKey: true }
  },
  {
    name: 'Search',
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '@/pages/plp/search.vue').then(m => m.default || m),
    meta: { header: 'header_backbutton_withSearchIcon', title: 'Search', foreignKey: true },
    title: 'STYFI'
  },
  {
    name: 'AutoSuggest',
    path: '/autosuggest',
    component: () => import(/* webpackChunkName: "autosuggest" */ '@/pages/autosuggest/main.vue').then(m => m.default || m),
    meta: { header: 'header_hide', title: 'Looks', foreignKey: true }
  },
]
export default routes
