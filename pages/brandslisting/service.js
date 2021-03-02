// import { api } from '../../api'

export default {
  getBrandsList (axios, genderId) {
    return axios.get('api/brands', {
      params: {gender_id: genderId}
    })
  }
}
