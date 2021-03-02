import { api } from '../../api'

export default {
  getSearchResult (phrase) {
    return api.get('/core/v2/suggest', {params: {phrase}})
  }
}
