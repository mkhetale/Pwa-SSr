<template>
  <div class="article_inner_wrapper">
    <template v-for="(blogSection,index) in articleData">
      <div :key="index" v-if="blogSection.section_image">
        <div class="article_inner_header">
          <span class="trending_title">{{blogSection.section_heading}}</span>
          <span class="article_inner_date">{{blogSection.section_date}}</span>
        </div>
        <div class="brand_card_full">
          <div class="full_width_img_card">
            <div class="cardImg_hideOverflow">
              <img :src="blogSection.section_image" alt="" class="cardImg">
            </div>
          </div>
        </div>
      </div>
      <div :key="index" v-else>
        <div class="article_inner_para">
          <p>{{blogSection.section_content}}</p>
        </div>
        <div class="inner_category_cards article_inner_cards" v-if="blogSection.section_products">
          <span class="section_title">{{blogSection.section_sub_heading}}</span>
          <div class="horizontal_scroll">
            <div class="product_card scroll_ProductCard" v-for="(product,index) in blogSection.section_products" :key="index">
              <div class="container--shadow container--radius">
                <nuxt-link :to="product.href">
                  <div class="container container4_5">
                    <figure>
                      <img :src="getImageFromObject(product.image, 'jpg', 0, 'small')" alt="" class="cardImg">
                    </figure>
                  </div>
                </nuxt-link>
                <div class="productCard_info">
                  <div class="productCard_brand">
                    <span>{{product.brand.name}}</span>
                  </div>
                  <div class="productCard_name">
                    <span>{{product.name}}</span>
                  </div>
                  <div class="productCard_price">
                    <div>
                      <span class="ogPrice" v-if="(product.offer.original_price > product.offer.selling_price)">
                        {{product.offer.original_price}}
                      </span>
                      <span>
                        {{product.offer.selling_price}}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import service from './service'
// import mixin from '@/mixin'
import {getImageFromObject} from '@/utils'
export default {
  async asyncData({app: {$axios}, params, store}) {
    const paramGender = params.gender;
    let gender = 'male';
    if (paramGender === 'women') {
      gender = 'female';
    }
    const blogId = store.state.page.foreignId
    try {
      const response = await service.getBlogArticle($axios, blogId)
      return {
        articleData: response.data.data
      };
    } catch (error) {
      console.log(error.response)
    }
  },
  // mixins: [mixin],
  data () {
    return {
      articleData: null
    }
  },
  created () {
    // this.getArticleData()
  },
  methods: {
    getImageFromObject,
  }
}
</script>
<style lang="scss">
@import '~assets/style/mixin.scss';
@import '~assets/style/explore.scss'
</style>
