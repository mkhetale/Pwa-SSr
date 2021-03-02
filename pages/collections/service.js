// import { api } from '../../api'

export default {
  getCollectionTopics (axios, gender) {
    return axios.get('/core/v2/explore/topic/list', {params: {gender, type: 'collections'}})
  },
  getCollectionsList (axios, gender, page, id) {
    return axios.get('/core/v2/explore/collection/curated', {params: {topic_id: id, gender, page}})
  }
}
