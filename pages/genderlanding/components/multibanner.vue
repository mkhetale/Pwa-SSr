<template>
  <div class="scroll_section_wrapper">
    <span class="section_title">{{sectionData.section_title}}</span>
    <div class="horizontal_scroll">
      <div class="personality_card" v-for="(section, index) in sectionData.section_data" :key="index">
        <nuxt-link :to="section.href">
          <div class="container container4_5 container--radius">
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
