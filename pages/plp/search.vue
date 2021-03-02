<template>
  <PLPWrapper />
</template>
<script>
// import store from './store'// eslint-disable-line no-unused-vars
import PLPWrapper from './components/plpWrapper'
import service from './service'
export default {
  name: 'Search',
  components: {
    PLPWrapper
  },
  async asyncData({app: {$axios}, params, store, route}) {
    const paramGender = params.gender;
    const url = `core/v2/search?phrase=${route.query.phrase}`
    store.dispatch('plp/resetState', url)
    store.dispatch('plp/onRouteChange', route.query)
    try {
      const response = await service.getAsyncProductsList($axios, url, null)
      const initProdData = {
        products: response.data.data,
        filters: response.data.meta.filters,
        sorter: response.data.meta.sorter,
        searchAfter: response.data.meta.search_after,
        count: response.data.meta.count
      }
      store.dispatch('plp/updateInitProductState', initProdData)
    } catch (error) {
      console.log(error.response)
    }
  },
  data () {
    return {
      url: `core/v2/search?phrase=${this.$route.query.phrase}`
    }
  },
  created () {
    // this.$store.dispatch('plp/resetState', this.url)
  },
  // beforeRouteEnter (to, from, next) {
  //   console.log(to.query)
  //   const query = to.query
  //   next((vm) => {
  //     console.log('next')
  //     vm.$store.dispatch('plp/onRouteChange', query)
  //       .then(() => {
  //         vm.$store.dispatch('plp/getInitProducts')
  //       })
  //   })
  // },
  beforeRouteUpdate (to, from, next) {
    console.log(to.query)
    const query = to.query
    this.$store.dispatch('plp/onRouteChange', query)
      .then(() => {
        this.$store.dispatch('plp/getInitProducts')
      })
    next()
  }
}
</script>
