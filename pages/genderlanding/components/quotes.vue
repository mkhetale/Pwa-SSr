<template>
  <div class="section_wrapper">
    <div class="quote_wrapper container--shadow container--radius">
      <span class="global_icon quotation_icon"></span>
      <p>{{sectionData.section_description}}</p>
      <span class="quote_author">
        {{sectionData.section_title}}
      </span>
    </div>
  </div>
</template>
<script>
import mixin from '../mixin'
export default {
  mixins: [mixin]
}
</script>
