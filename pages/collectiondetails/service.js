import { api } from '../../api'

export default {
  getCollectionDetails (id) {
    return api.get('/core/v2/explore/collection/details', {params: {id}})
  },
  getCollectionProducts (id) {
    return api.get('/core/v2/collection/products', {params: {args: false, collection_id: id}})
  }
}
