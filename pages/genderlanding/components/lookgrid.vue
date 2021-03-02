<template>
  <div class="scroll_section_wrapper inner_category_cards">
    <span class="section_title">{{sectionData.section_title}}</span>
    <div class="horizontal_scroll">
      <div class="category_card scroll_ProductCard" v-for="(section, index) in sectionData.section_data" :key="index">
        <div class="container--radius container--shadow">
          <nuxt-link :to="section.href">
            <div class="container container4_5">
              <figure>
                <img :src="section.content_image.mobile" alt="" class="">
              </figure>
            </div>
            <div class="card_details">
              <span class="card_title">{{section.content_title}}</span>
            </div>
          </nuxt-link>
        </div>
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
