<template>
  <div class="section_wrapper">
    <nuxt-link :to="sectionData.section_data[0].href">
      <div class="container container1_1 container--radius">
        <figure>
          <img :src="sectionData.section_data[0].content_image.mobile" alt="" class="responsive_image">
        </figure>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import mixin from '../mixin'
export default {
  mixins: [mixin]
}
</script>
