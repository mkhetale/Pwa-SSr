// import {api, getNewToken} from '../api'
// import Cookies from 'js-cookie'
// import store from '../store'

// function setAuthCookie (token) {
//   Cookies.set(process.env.VUE_APP_AUTHCOOKIE, token, {domain: process.env.VUE_APP_COOKIE}) // save according to target
// }

// function setAuthHeader (token) {
//   api.defaults.headers.common.Authorization = `bearer ${token}`
// }
// function checkToken () {
//   return new Promise((resolve, reject) => {
//     const authToken = Cookies.get()[process.env.VUE_APP_AUTHCOOKIE] // make authentication const
//     if (authToken) {
//       setAuthHeader(authToken)
//     }
    // getNewToken()
//       .then((response) => {
//         const token = response.data.access_token
//         setAuthCookie(token)
//         setAuthHeader(token)
//         resolve(response.data)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }

// /* CART SYNC SECTION */
// function saveNewCartID (newCartID) {
//   Cookies.set(process.env.VUE_APP_CARTID, newCartID, {domain: process.env.VUE_APP_COOKIE})
// }
// function syncCart (axios) {
//   // cartInit(axios)
//   //   .then((CartId) => {
//   //     store.dispatch('common/updateCartId', CartId)
//   //     // peekCartProducts(CartId)
//   //   })
// }

// function cartInit (axios) {
//   return new Promise((resolve, reject) => {
//     api.get(`${process.env.VUE_APP_CARTSYNC}/cart_api/v3/initialize`)
//       .then((response) => {
//         const newCartId = response.data.data.cart_id
//         // saveNewCartID(newCartId)
//         resolve(newCartId)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }

// function peekCartProducts (cartId) {
//   api.get(`${process.env.VUE_APP_CARTSYNC}/cart_api/v3/peek`, {params: {cart_id: cartId}})
//     .then((response) => {
//       const {products} = response.data.data
//       store.dispatch('common/updateBag', products)
//       console.log(products)
//     })
//     .catch((error) => {
//       console.log(error)
//       Cookies.remove(process.env.VUE_APP_CARTID, {domain: process.env.VUE_APP_COOKIE})
//       syncCart()
//     })
// }



// function getTrendingSearch () {
//   api.get('/api/search/trending')
//     .then((response) => {
//       const {data} = response.data
//       store.dispatch('common/saveTrendingSearch', data[0].section_data)
//       console.log(data)
//     })
// }

// function logOutUser () {
//   api.post('/auth/logout')
//     .then((response) => {
//       debugger
//       const {data} = response.data
//       handleLogedOutUser(data)
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// }

// function handleLogedOutUser (data) {
//   setAuthHeader(data.access_token)
//   setAuthCookie(data.access_token)
//   Cookies.remove(process.env.VUE_APP_CARTID, {domain: process.env.VUE_APP_COOKIE})
//   // store.dispatch('common/tokenVerification', data.is_login)
//   //   .then(() => {
//   //     cartInit()
//   //   })
// }
function getImageFromObject (obj, ext, i, size) {
  // i as 0 if first image is required
  // dont pass size if original big image is required
  let url = ''
  if (obj) {
    const baseUrl = size ? obj.cdnCacheUrl : obj.cdnUrl
    const extension = obj.ext[ext]
    const imgSize = size ? obj.sizes[size] : ''
    const imagePath = obj.imagePath
    const image = i ? obj.images[i] : obj.images[i]
    url = `${baseUrl}${imagePath}${image}${imgSize}${extension}`
  }
  return url
}

export {getImageFromObject}
