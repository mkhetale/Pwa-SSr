import { api } from '../../api'

export default {
  getBlogArticlesList (axios, gender) {
    return axios.get('/core/v2/explore/blog/list', {
      params: { gender }
    })
  },
  getBlogArticle (axios, id) {
    return axios.get('/core/v2/explore/blog', {
      params: { id }
    })
  }
}
