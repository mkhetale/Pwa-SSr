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
  </div>
</template>
<script>
import service from './service'
import FollowButton from '../../components/followButton'
export default {
  name: 'BrandProfile',
  components: {
    FollowButton
  },
  data () {
    return {
      brandId: this.$store.state.page.foreignId,
      brandDetail: null
    }
  },
  created () {
    this.getBrandsDetails()
  },
  methods: {
    async getBrandsDetails () {
      try {
        const responseData = await service.getBrandDetails(this.$axios, this.brandId)
        this.brandDetail = responseData.data.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss">
@import '~assets/style/mixin.scss';
@import '~assets/style/brandprofile.scss'
</style>
