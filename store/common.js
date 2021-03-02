
const defaults = {
  snackBar: {
    visible: false,
    message: '',
    color: '',
    timeout: 4000
  },
  isLogin: false,
  tokenChecked: false,
  menuToggle: false,
  title: '',
  foreignKey: null,
  headerClass: 'header_withSearch',
  gender: null,
  bagProducts: [],
  cartId: null,
  fixedScroll: false,
  trendingSearch: [],
  routeData: {
    url: '',
    foreignKey: ''
  },
  metaData: {
    content_type: 'text/html; charset=utf-8',
    copyright: '2017 STYFI Created by Stylabs',
    description:
      'Curated online shopping platform in India. Buy clothing, footwear, and accessories handpicked by stylists for men & women. Free Shipping, COD Available &amp; Easy 7-Day Returns.',
    keywords:
      'Online shopping platform, online shopping site, online shopping india, Online shopping, fashion for men, fashion for women',
    robots: 'index,follow',
    title:
      'Curated Fashion Online Shopping Site - Shop for Men & Women Fashion - STYFI'
  }
}

export default {
  namespaced: true,
  state: () => Object.assign({}, defaults),
  mutations: {
    tokenVerification(state, authStatus) {
      state.isLogin = authStatus
      state.tokenChecked = true
    },
    updateHeaderClass(state, newHeaderClass) {
      state.headerClass = newHeaderClass
    },
    updateTitle(state, title) {
      state.title = title
    },
    updateForeignKey(state, foreignKey) {
      state.foreignKey = foreignKey
    },
    updateRouteData(state, obj) {
      state.routeData = Object.assign({}, defaults.routeData, obj)
    },
    updateSnackbar(state, options) {
      state.snackBar = Object.assign({}, defaults.snackBar, options)
    },
    updateGender(state, gender) {
      state.gender = gender
    },
    updateMetaData(state, metaData) {
      state.metaData = Object.assign({}, defaults.metaData, metaData)
    },
    toogleMenu(state, boolValue) {
      state.menuToggle = boolValue
    },
    updateBag(state, products) {
      state.bagProducts = products
      /* state.bagProducts = [...state.bagProducts, product] */
    },
    initBag(state, products) {
      state.bagProducts = products
    },
    updateFixedScroll(state, bool) {
      state.fixedScroll = bool
    },
    updateCartId(state, newCartId) {
      // this.$cookies.set('cartId', newCartId, {domain: process.env.VUE_APP_COOKIE})
      // Cookies.set('cartId', newCartId)
      state.cartId = newCartId
    },
    saveTrendingSearch(state, trendingSearch) {
      state.trendingSearch = trendingSearch
    }
  },
  actions: {
    tokenVerification({ commit }, authStatus) {
      commit('tokenVerification', authStatus)
    },
    updateHeaderClass({ commit }, newHeaderClass) {
      commit('updateHeaderClass', newHeaderClass)
    },
    updateTitle({ commit }, title) {
      commit('updateTitle', title)
    },
    updateForeignKey({ commit }, foreignKey) {
      commit('updateForeignKey', foreignKey)
    },
    updateRouteData({ commit }, obj) {
      commit('updateRouteData', obj)
    },
    updateSnackBar({ commit }, options) {
      commit('updateSnackbar', options)
    },
    updateGender({ commit }, gender) {
      commit('updateGender', gender)
    },
    updateMetaData({ commit }, metaData) {
      commit('updateMetaData', metaData)
    },
    toogleMenu({ commit }, boolValue) {
      commit('toogleMenu', boolValue)
    },
    updateFixedScroll({ commit }, boolValue) {
      commit('updateFixedScroll', boolValue)
    },
    initBag({ commit }) {
      /* const bagObject = Cookies.get('bag') // change bag string to constant from webpack or create a constant file
      if(bagObject) {
        commit('initBag', JSON.parse(bagObject).products)
      } */
    },
    addProduct({ commit, state, dispatch }, obj) {
      return new Promise((resolve, reject) => {
        obj.axios.put(`${process.env.VUE_APP_CARTSYNC}/cart_api/v3/add`, obj.product, {params: {cart_id: state.cartId}})
          .then((response) => {
            const {products} = response.data.data
            dispatch('updateBag', products)
            resolve()
          })
          .catch((error) => {
            console.log(error)
          })
      })
    },
    updateBag({ commit }, products) {
      commit('updateBag', products)
      /* dispatch('updateCookie') */
    },
    updateCookie({ state }) {
      /* console.log(state.bagProducts)
      const currentBagObj = {products: state.bagProducts}
      Cookies.set('bag', JSON.stringify(currentBagObj), 'localhost') // change bag string to constant from webpack or create a constant file */
    },
    getDuplicateProduct({ state }, product) {
      /* return new Promise((resolve, reject) => {
        const currentBag = state.bagProducts
        const duplicateProduct = currentBag.length
          ? currentBag.find(singleProduct => {
              return (
                singleProduct.product_id === product.product_id && 
                singleProduct.sku === product.sku
              )
            })
        ) : false
        resolve(!!duplicateProduct)
      }) */
    },
    updateCartId({ commit }, newCartId) {
      commit('updateCartId', newCartId)
    },
    saveTrendingSearch({ commit }, trendingSearch) {
      commit('saveTrendingSearch', trendingSearch)
    }
  },
  getters: {
    bagsProductCount(state) {
      return state.bagProducts.length
    }
  }
}
