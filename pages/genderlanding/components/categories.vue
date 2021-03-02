<template>
  <div class="scroll_section_wrapper category_wrapper">
    <div class="horizontal_scroll">
      <div class="category" v-for="(category, index) in sectionData.section_data" :key="index">
        <nuxt-link :to="category.href">
          <img :src="category.content_image.mobile" alt="" class="responsive_image">
          <span>{{category.content_title}}</span>
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
