<template>
  <div class="section_wrapper">
    <span class="section_title">{{sectionData.section_title}}</span>
    <div class="brand_car_wrapper">
      <div class="brand_card_full" v-for="(section,index) in sectionData.section_data" :key="index">
        <nuxt-link :to="section.href">
          <div class="container container--radius" :class="index > 0 ? 'container4_5': 'container16_9'">
            <figure>
              <img :src="section.content_image.mobile" alt="" class="responsive_image">
            </figure>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '../mixin'
export default {
  mixins: [mixin]
}
</script>
