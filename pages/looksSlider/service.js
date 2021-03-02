
export default {
  getLookProducts (axios, prodId) {
    return axios.get('core/v1/product/automated_looks', {
      params: {
        product_id: prodId
      },
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
  }
}
