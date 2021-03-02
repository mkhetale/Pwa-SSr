
export default {
  getBrandDetails (axios, id) {
    return axios.get('/core/v2/brand/detail', {params: {brand_id: id}})
  },
  // getBrandsProducts (id) {
  //   return api.get('/core/v2/brand/products', {params: {brand_id: id}})
  // }
}
