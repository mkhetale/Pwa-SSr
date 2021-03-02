<template>
  <PLPWrapper />
</template>
<script>
// import store from './store'// eslint-disable-line no-unused-vars
import PLPWrapper from './components/plpWrapper'
// import mixin from '@/mixin'
import service from './service'
export default {
  name: 'Curated',
  // mixins: [mixin],
  components: {
    PLPWrapper
  },
  async asyncData({app: {$axios}, params, store, route}) {
    const paramGender = params.gender;
    const url = `/core/v2/curated/products?content_id=${store.state.page.foreignId}`
    store.dispatch('plp/resetState', url)
    store.dispatch('plp/onRouteChange', route.query)
    const response = await service.getAsyncProductsList($axios, url, route.query)
    const initProdData = {
      products: response.data.data,
      filters: response.data.meta.filters,
      sorter: response.data.meta.sorter,
      searchAfter: response.data.meta.search_after,
      count: response.data.meta.count
    }
    store.dispatch('plp/updateInitProductState', initProdData)
  },
  data () {
    return {
      contentId: this.$store.state.page.foreignId,
      url: `/core/v2/curated/products?content_id=${this.$store.state.page.foreignId}`
    }
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('Mounted')
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
    console.log(to.query, 'routeUpdate')
    const query = to.query
    this.$store.dispatch('plp/onRouteChange', query)
      .then(() => {
        this.$store.dispatch('plp/getInitProducts')
      })
    next()
  }

}
</script>
