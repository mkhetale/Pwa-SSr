<template>
  <div class="looksSlider_wrapper">
    <template v-if="!initData">
      <div class="loading">
        <img src="~assets/images/Loader.gif" alt="">
      </div>
    </template>
    <template v-else>
      <div v-if="productData">
        <div class="mainProd_wrapper container container4_5">
          <figure>
            <img :src="getImageFromObject(lookMainProd, 'jpg', 0, 'medium')" alt="">
          </figure>
        </div>
        <carousel :perPage="1">
          <slide v-for="(singleLook, index) in looksProducts" :key="index">
            <div class="lookProd_wrapper" >
              <div class="singleProd" v-for="(singleProd, index) in singleLook.products" :key="index">
                <div class="container container4_5">
                  <a :href="singleProd.product_url">
                    <figure>
                      <img :src="singleProd.product_image" alt="">
                    </figure>
                  </a>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
      <div v-else class="noLooks">
        <div class="looksIcon global_icon"></div>
        <p>
          No Looks available <br/>
          Our Stylist are wroking on it
        </p>
      </div>
    </template>
  </div>
</template>
<script>
// import { Carousel, Slide } from 'vue-carousel'
import service from './service.js'
import {getImageFromObject} from '@/utils'
export default {
  name: 'LooksSlider',
  // components: {
  //   Carousel,
  //   Slide
  // },
  data () {
    return {
      lookMainProd: null,
      looksProducts: [],
      initData: false,
      productData: false
    }
  },
  async created () {
    this.getLookProducts()
    this.initData = true
  },
  methods: {
    getImageFromObject,
    async getLookProducts () {
      try {
        const responseData = await service.getLookProducts(this.$axios, this.$route.params.productId)
        this.lookMainProd = responseData.data.product_image
        this.looksProducts = responseData.data.looks
        this.productData = true
      } catch (error) {
        console.log(error.response)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@import "~assets/style/mixin";
@import '~assets/style/looksSlider';
</style>
