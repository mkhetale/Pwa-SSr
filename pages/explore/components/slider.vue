<template>
  <div class="section_wrapper">
    <div class="explore_title">
      <span class="trending_title">{{sectionData.section_title}}</span>
    </div>
    <div class="explore_slider">
      <carousel :perPage="1">
        <slide v-for="(section,index) in sectionData.section_data" :key="index">
          <div class="explore_card">
            <nuxt-link :to="section.href">
              <div class="container container16_9">
                <figure>
                  <img class="responsive_image" :src="section.image.small" alt="">
                </figure>
              </div>
            </nuxt-link>
            <div class="explore_product_details">
              <div class="explore_trending_title">OCCASSIONAL WEAR</div>
              <div class="explore_trending_detail"><a href="#" tabindex="0">Special Details That Celebrate Summer wear</a></div>
              <div class="explore_trending_count">56 Products</div>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>
<script>
import mixin from '../mixin'
// import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'TrendingSlider',
  // components: {
  //   Carousel,
  //   Slide
  // },
  mixins: [mixin]
}
</script>
<style lang="scss">
  .VueCarousel-wrapper {
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,.15);
  }
</style>
