<template>
  <div class="explore_curated_wrapper container--radius container--shadow" >
    <div class="explore_curated_image">
      <nuxt-link :to="collectionDetail.href">
        <div class="container container4_5">
          <figure>
            <img :src="collectionDetail.image_detail.small" alt="">
          </figure>
        </div>
      </nuxt-link>
    </div>
    <div class="explore_product_details explore_cutrated_section">
      <div class="explore_collection_cart">
        <div class="explore_trending_title">{{collectionDetail.topic_name}}</div>
        <div class="explore_curated_detail">{{collectionDetail.name}}</div>
        <div class="explore_trending_count">{{collectionDetail.count_products}} Products</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CollectionCard',
  props: {
    collectionDetail: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
