<template>
  <div class="brand_profile_wrapper" v-if="brandDetail">
    <div class="container container16_9">
      <figure>
        <img :src="brandDetail.mobile_cover_image" alt="">
      </figure>
    </div>
    <div class="brand_profile">
      <div class="brand_profile_logo">
        <figure>
          <img :src="brandDetail.image" alt="">
        </figure>
      </div>
      <p class="brand_profile_name">
        {{brandDetail.name}}
      </p>
      <follow-button :id="brandDetail.brand_id" :following="brandDetail.is_followed" />
    </div>
    <div class="product_details brand_details">
      <input id="pdp_accordion1" class="pdp_accordion_input" name="accordion" type="checkbox">
      <label for="pdp_accordion1" class="pdp_accordion_label brand_profile_label">Brand Details
        <i class="accor_icon"></i>
      </label>
      <div class="accord1 pdp_accord1">
        <div class="product_description">
          <p>{{brandDetail.description}}</p>
        </div>
      </div>
    </div>
    <PLPWrapper />
  </div>
</template>
<script>
// import store from './store'// eslint-disable-line no-unused-vars
import service from './service'
import PLPWrapper from './components/plpWrapper'
import FollowButton from '../../components/followButton'
// import mixin from '@/mixin'
export default {
  name: 'BrandsProducts',
  // mixins: [mixin],
  components: {
    PLPWrapper,
    FollowButton
  },
  async asyncData({app: {$axios}, params, store, route}) {
    const paramGender = params.gender;
    let gender = 'male';
    if (paramGender === 'women') {
      gender = 'female';
    }
    const url = `/core/v2/brand/products?brand_id=${store.state.page.foreignId}`
    store.dispatch('plp/resetState', url)
    store.dispatch('plp/onRouteChange', route.query)
    const brandId = store.state.page.foreignId;
    try {
      const [responseBrand, responseProd] = await Promise.all([
        service.getBrandDetails(brandId),
        service.getAsyncProductsList($axios, url, route.query)
      ]);
      const initProdData = {
        products: responseProd.data.data,
        filters: responseProd.data.meta.filters,
        sorter: responseProd.data.meta.sorter,
        searchAfter: responseProd.data.meta.search_after,
        count: responseProd.data.meta.count
      }
      store.dispatch('plp/updateInitProductState', initProdData)
      return {
        brandDetail: responseBrand.data.data
      };
    } catch (error) {
      console.log(error.response)
    }
  },
  data () {
    return {
      brandId: this.$store.state.page.foreignId,
      brandDetail: null,
      url: `/core/v2/brand/products?brand_id=${this.$store.state.page.foreignId}`
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
<style lang="scss">
@import '~assets/style/mixin.scss';
@import '~assets/style/brandprofile.scss'
</style>
