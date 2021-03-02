import { api } from '../../api'

export default {
  getExploreListing (axios, gender) {
    return axios.get('/core/v2/explore/overview-non-blog', {
      params: {gender: gender}
    })
  },
  getBlogList (axios, gender) {
    return axios.get('/core/v2/explore/overview-blog', {
      params: {gender: gender}
    })
  }
}
