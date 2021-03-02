
export default {
  getProductDetails (axios, productId) {
    return axios.get('core/v3/product/detail',
      {
        params: {'product_id': productId},
        transformResponse (response) {
          const {errors, data} = JSON.parse(response)
          let transformData
          if (errors.length) {
            transformData = errors
          } else {
            transformData = data
          }
          return transformData
        }
      })
  },
  getSimilarProducts (axios, prodId, brandId) {
    return axios.get('/core/v2/category/similar_products', {params: {product_id: prodId, brand_id: brandId}})
  },
  getSimilarBrandProducts (axios, prodId, brandId) {
    return axios.get('/core/v2/brand/similar_products', {params: {product_id: prodId, brand_id: brandId}})
  },
  getSizeChart (axios, prodId, brandId, categoryId) {
    return axios.get('/core/v2/product/sizechart', {params: {product_id: prodId, brand_id: brandId, category_id: categoryId}})
  },
  wishlistProduct (axios, prodData) {
    return axios.post('/profile/v2/wishlist/customer', prodData)
  },
  checkPincode (axios, pinObj) {
    return axios.get('/core/v1/pincode/check_availability', {params: pinObj})
  }
}
