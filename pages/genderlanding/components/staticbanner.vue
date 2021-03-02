<template>
  <div class="section_wrapper">
    <a v-if="sectionData.section_data[0].href" :href="sectionData.section_data[0].href">
      <div class="container container384_90">
        <figure>
          <img :src="sectionData.section_data[0].content_image.mobile" alt="" class="responsive_image">
        </figure>
      </div>
    </a>
    <div class="container container384_45" v-else>
      <figure>
        <img :src="sectionData.section_data[0].content_image.mobile" alt="" class="responsive_image">
      </figure>
    </div>
  </div>
</template>
<script>
import mixin from '../mixin'
export default {
  mixins: [mixin]
}
</script>
