<template>
  <div class="scroll_section_wrapper">
    <div class="explore_header">
      <span>{{sectionData.section_title}}</span>
      <nuxt-link :to="'/looks/'+gender">View all</nuxt-link>
    </div>
    <div class="horizontal_scroll">
      <LookCard v-for="(section,index) in sectionData.section_data" :key="index" :lookDetail="section" />
    </div>
  </div>
</template>
<script>
import mixin from '../mixin'
import LookCard from '../../../components/lookCard'
export default {
  name: 'TrendingLooks',
  mixins: [mixin],
  components: {
    LookCard
  }
}
</script>
