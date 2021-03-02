<template>
  <div v-if="collectionDetails">
    <div class="container">
      <div class="container4_5">
        <figure>
          <img :src="collectionDetails.image_detail.medium" alt="">
        </figure>
      </div>
      <div class="explore_banner_overlay">
        <span class="looks_overlay_title">{{collectionDetails.topic_name}}</span>
        <span class="looks_overlay_detail">{{collectionDetails.name}}</span>
        <span class="explore_overlay_prod">{{collectionDetails.count_products}} Products</span>
      </div>
    </div>
  </div>
</template>
<script>
import service from './service.js'
export default {
  name: 'CollectionDetails',
  data () {
    return {
      collectionId: this.$store.state.page.foreignId,
      collectionDetails: null,
      collectionProducts: []
    }
  },
  created () {
    this.getCollectionDetails()
    this.getCollectionProducts()
  },
  methods: {
    async getCollectionDetails () {
      try {
        const responseData = await service.getCollectionDetails(this.collectionId)
        this.collectionDetails = responseData.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async getCollectionProducts () {
      try {
        const responseData = await service.getCollectionProducts(this.collectionId)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss">
  @import '~assets/style/mixin';
  @import '~assets/style/explore'
</style>
