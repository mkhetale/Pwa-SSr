<template>
  <div v-if="brandsList.length">
    <div class="brand_banner">
      <span class="secttion_title">
        {{brandsOfDay.section_title}}
      </span>
      <div class="brand_card_wrapper">
        <div class="brand_card" v-for="(brand, index) in brandsOfDay.section_data" :key="index">
            <div class="brand_cardImg">
                <div class="cardImg_hideOverflow">
                    <nuxt-link :to="brand.href">
                      <img :src="brand.content_image" alt="" class="cardImg">
                    </nuxt-link>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div class="brands_list">
      <ul>
        <li v-for="(brandListObj, index) in brandsList" :key="index">
          <span class="brand_section">{{brandListObj.alphabet}}</span>
          <ul>
            <li class="brand_list_name" v-for="(brand, index) in brandListObj.manufacturers" :key="index">
              <nuxt-link :to="brand.manufacturer_href" v-if="brand.manufacturer_href">
                <span class="brand_logo">
                  <img :src="brand.manufacturer_logo" alt="">
                </span>
                <span class="brand_name">
                  {{brand.manufacturer_name}}
                </span>
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import service from './service'
// import mixin from '@/mixin'

export default {
  name: 'BrandsList',
  // mixins: [mixin],
  async asyncData({app: {$axios}, params}) {
    const paramGender = params.gender;
    let gender_id = 101;
    if (paramGender === 'women') {
      gender_id = 1;
    } else if (paramGender === 'undefined') {
      gender_id = 0
    }
    try {
      const response = await service.getBrandsList($axios, gender_id);
      const responseData = response.data.data;
      return {
        brandsList: responseData.a_z_brands,
        brandsOfDay: responseData.brands_promotion[0],
      };
    } catch (error) {
      console.log(error.response)
    }
  },
  data () {
    return {
      brandsList: [],
      brandsOfDay: []
    }
  },
}
</script>
<style lang="scss">
@import '~assets/style/brand.scss'
</style>
