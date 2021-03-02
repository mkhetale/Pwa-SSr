<template>
  <div class="section_wrapper">
    <div class="explore_header">
      <span>New Reads</span>
      <nuxt-link :to="`/reads/${gender}`">View All</nuxt-link>
    </div>
    <div class="explore_news_card container--radius container--shadow" v-for="(section,index) in sectionData.section_data" :key="index">
      <div class="brand_card_full">
        <nuxt-link :to="section.href">
          <div class="container container16_9">
            <figure>
              <img :src="section.blog_image" alt="">
            </figure>
          </div>
        </nuxt-link>
      </div>
      <div class="explore_news_details">
        <span class="explore_news_date">{{section.date}}</span>
        <span class="explore_curated_detail" v-html="section.name"></span>
        <p class="explore_news_content" v-html="section.description">
        </p>
        <nuxt-link :to="section.href">
          <span class="explore_news_readmore">READ MORE</span>
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
