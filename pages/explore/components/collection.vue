<template>
  <div class="section_wrapper">
    <div class="explore_header">
      <span>Curated Collections</span>
      <nuxt-link :to="'/collections/'+gender">View All</nuxt-link>
    </div>
    <collection-card v-for="(section, index) in sectionData.section_data" :key="index" :collectionDetail="section"/>
  </div>
</template>
<script>
import mixin from '../mixin'
import CollectionCard from '../../../components/collectionCard'
export default {
  name: 'CuratedCollection',
  mixins: [mixin],
  components: {
    CollectionCard
  }
}
</script>
