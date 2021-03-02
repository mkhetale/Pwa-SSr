<template>
  <div class="section_wrapper section_margin" v-if="blogsList">
    <div class="explore_news_card" v-for="(article,index) in blogsList" :key="index">
      <div class="brand_card_full">
        <div class="full_width_img_card">
          <div class="cardImg_hideOverflow">
            <nuxt-link :to="article.href">
              <img :src="article.blog_image" alt="" class="cardImg">
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="explore_news_details">
        <span class="explore_news_date">{{article.date}}</span>
        <span class="explore_curated_detail" v-html="article.name"></span>
        <p class="explore_news_content" v-html="article.description">
        </p>
        <nuxt-link :to="article.href">
          <span class="explore_news_readmore">READ MORE</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import service from './service'
export default {
  async asyncData({app: {$axios}, params}) {
    const paramGender = params.gender;
    let gender = 'male';
    if (paramGender === 'women') {
      gender = 'female';
    }
    try {
      const response = await service.getBlogArticlesList($axios, gender)
      return {
        blogsList: response.data.data
      };
    } catch (error) {
      console.log(error.response)
    }
  },
  data () {
    return {
      blogsList: null
    }
  },
}
</script>
<style lang="scss">
@import '~assets/style/mixin.scss';
@import '~assets/style/explore.scss'
</style>
