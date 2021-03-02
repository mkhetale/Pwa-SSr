<template>
  <div class="section_wrapper trending_cards">
    <span class="section_title">{{sectionData.section_title}}</span>
    <div class="trending_card" v-for="(section,index) in sectionData.section_data" :key="index">
      <div class="container--radius container--shadow">
        <nuxt-link :to="section.href">
          <div class="container container4_5">
            <figure>
              <img :src="section.content_image.mobile" alt="" class="responsive_image">
            </figure>
          </div>
          <div class="card_details">
            <span class="card_title">{{section.content_title}}</span>
            <!-- <span class="card_subtitle">Statement Pieces</span> -->
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
