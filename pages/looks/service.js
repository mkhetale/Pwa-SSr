
export default {
  getLooksTopics (axios, gender) {
    return axios.get('/core/v2/explore/topic/list', {params: {gender, type: 'looks'}})
  },
  getLooksList (axios, gender, page, id) {
    return axios.get('/core/v2/explore/look', {params: {topic_id: id, gender, page}})
  }
}
