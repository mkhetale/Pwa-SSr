<template>
  <div class="personality_card container--radius container--shadow" :class="cardType==='vertical' ? 'card_vertical' :''">
    <div class="container container1_1">
      <nuxt-link :to="lookDetail.href">
        <figure>
            <img :src="lookDetail.image.small" alt="" class="cardImg">
        </figure>
        <div class="explore_banner_overlay">
          <span class="looks_overlay_title">{{lookDetail.topic_name}}</span>
          <span class="looks_overlay_detail">{{lookDetail.name}}</span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LookCard',
  props: {
    lookDetail: {
      type: Object,
      default () {
        return {}
      }
    },
    cardType: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>
