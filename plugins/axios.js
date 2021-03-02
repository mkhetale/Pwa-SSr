export default ({ $axios, store }) => {
  if (process.server) {
    return
  }
  $axios.interceptors.request.use(request => {    // Get token from auth.js store
    const token = store.state.authToken;
    // Update token axios header
    if (token) {
      request.headers.common['Authorization'] = `bearer ${token}`
    }
    return request
  })
}