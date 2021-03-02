<template>
  <div class="scroll_section_wrapper" v-if="sectionData.section_data[0].href">
    <div class="section_header">
      <span>{{sectionData.section_title}}</span>
      <nuxt-link :to="sectionData.section_data[0].href">View All</nuxt-link>
    </div>
    <div class="horizontal_scroll margin-left-right">
      <template v-for="(product, index) in sectionData.section_data[0].content_products">
        <ProductCard :product="product" :card=true :key="index"/>
      </template>
    </div>
  </div>
</template>
<script>
import ProductCard from '../../../components/productCard'
import mixin from '../mixin'
export default {
  mixins: [mixin],
  components: {
    ProductCard
  }
}
</script>
