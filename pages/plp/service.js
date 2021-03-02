import { api } from '../../api'

export default {
  getProductsList (url, query) {
    return api.get(url, {params: query})
  },
  getAsyncProductsList (axios, url, query) {
    return axios.get(url, {params: query})
  },
  getCuratedProducts (query) {
    return api.get('/core/v2/curated/products', {params: query})
  },
  getBrandDetails (id) {
    return api.get('/core/v2/brand/detail', {params: {brand_id: id}})
  },
  getCollectionDetails (id) {
    return api.get('/core/v2/explore/collection/details', {params: {id}})
  }
}
