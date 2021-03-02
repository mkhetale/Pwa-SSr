export default {
  getLandingData (axios, gender) {
    const payload = {
      container_for: 'mobile',
      gender,
      view_name: 'home',
      version: 1
    }
    return axios.get('core/v1/view', {
      params: payload,
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
