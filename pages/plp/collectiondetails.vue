<template>
  <div v-if="collectionDetails">
    <div class="container">
      <div class="container4_5">
        <figure>
          <img :src="collectionDetails.image_detail.medium" alt="">
        </figure>
      </div>
      <div class="explore_banner_overlay">
        <span class="looks_overlay_title">{{collectionDetails.topic_name}}</span>
        <span class="looks_overlay_detail">{{collectionDetails.name}}</span>
        <span class="explore_overlay_prod">{{collectionDetails.count_products}} Products</span>
      </div>
    </div>
    <PLPWrapper />
  </div>
</template>
<script>
// import store from './store'// eslint-disable-line no-unused-vars
import service from './service'
import PLPWrapper from './components/plpWrapper'
// import mixin from '@/mixin'
export default {
  name: 'CollectionDetails',
  components: {
    PLPWrapper
  },
  // mixins: [mixin],
  async asyncData({app: {$axios}, params, store, route}) {
    const paramGender = params.gender;
    const url = `/core/v2/collection/products?collection_id=${store.state.page.foreignId}`
    store.dispatch('plp/resetState', url)
    store.dispatch('plp/toggleFullFilterMode', false)
    store.dispatch('plp/onRouteChange', route.query)
    try {
      const response = await service.getAsyncProductsList($axios, url, route.query)
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
    // try {
    //   const [responseBrand, responseProd] = await Promise.all([
    //     service.getCollectionDetails(store.state.page.foreignId),
    //     service.getAsyncProductsList($axios, url, route.query)
    //   ]);
    //   const initProdData = {
    //     products: response.data.data,
    //     filters: response.data.meta.filters,
    //     sorter: response.data.meta.sorter,
    //     searchAfter: response.data.meta.search_after,
    //     count: response.data.meta.count
    //   }
    //   store.dispatch('plp/updateInitProductState', initProdData)
    // } catch (error) {
    //   console.log(error.response)
    // }
  },
  data () {
    return {
      collectionId: this.$store.state.page.foreignId,
      collectionDetails: null,
      url: `/core/v2/collection/products?collection_id=${this.$store.state.page.foreignId}`
    }
  },
  created () {
    this.getCollectionDetails()
    // this.$store.dispatch('plp/resetState', this.url)
    // this.$store.dispatch('plp/toggleFullFilterMode', false)
  },
  methods: {
    async getCollectionDetails () {
      try {
        const responseData = await service.getCollectionDetails(this.collectionId)
        this.collectionDetails = responseData.data.data
      } catch (error) {
        console.log(error)
      }
    }
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
<style lang="scss">
  @import '~assets/style/mixin';
  @import '~assets/style/explore'
</style>
