
export default {
  getLookDetails (axios, id) {
    return axios.get('/core/v2/explore/look/details', {params: {id}})
  },
  getLookProducts (axios, id) {
    return axios.get('/core/v2/look/products', {params: {look_id: id}})
  }
}
