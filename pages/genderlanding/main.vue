<template>
  <div class="landing_section">
    <!-- <no-ssr> -->
      <template v-for="(sectionData, index) in pageData">
        <component :is="sectionData.section_type" :key="index" :sectionData="sectionData" />
      </template>
    <!-- </no-ssr> -->
  </div>
</template>
<script>
import service from './service'
// import mixin from '@/mixin'

const components = {
  'APP-CIRCLE-GRID-1': () => import('./components/categories'),
  'APP-HORIZONTAL-BANNERS': () => import('./components/horizontalbanner'),
  'APP-THREE-GRID': () => import('./components/threegridbanner'),
  'APP-BANNER-LOGIN-STRIP': () => import('./components/staticbanner'),
  'APP-MULTI-BANNERS': () => import('./components/multibanner'),
  'APP-FOUR-LOOK-GRID': () => import('./components/fourgrid'),
  'APP-BANNER-NON-CLICKABLE-STRIP': () => import('./components/staticbanner'),
  'APP-MULTI-LOOK-GRID': () => import('./components/lookgrid'),
  'APP-SQUARE-BANNER': () => import('./components/squarebanner'),
  'APP-PRODUCT-GRID-1': () => import('./components/productgrid'),
  'APP-BANNER-STRIP': () => import('./components/staticbanner'),
  'APP-QUOTE-STRIP': () => import('./components/quotes')
}
const SECTIONTYPES = [
  'APP-CIRCLE-GRID-1',
  'APP-HORIZONTAL-BANNERS',
  'APP-THREE-GRID',
  'APP-BANNER-LOGIN-STRIP',
  'APP-MULTI-BANNERS',
  'APP-FOUR-LOOK-GRID',
  'APP-BANNER-NON-CLICKABLE-STRIP',
  'APP-MULTI-LOOK-GRID',
  'APP-SQUARE-BANNER',
  'APP-PRODUCT-GRID-1',
  'APP-BANNER-STRIP',
  'APP-QUOTE-STRIP'
]
/* 'APP-PRODUCT-RECENTLY-VIEWED', */
export default {
  name: 'GenderLandingPage',
  // mixins: [mixin],
  async asyncData({app: {$axios}, params}) {
    const paramGender = params.gender;
    let gender = 'male';
    if (paramGender === 'women') {
      gender = 'female';
    }
    try {
      const response = await service.getLandingData($axios, gender);
      const filterData = response.data.filter(n => n.section_type !== 'APP-PRODUCT-RECENTLY-VIEWED')
      return {
        pageData: filterData
      };
    } catch (error) {
      console.log(error.response)
    }
  },
  components,
  data () {
    return {
      structuredData: {
        "@context": "http://schema.org",
        "@type": "Recipe",
      },
      gender: null,
      pageData: []
    }
  },
  created () {
    const {gender} = this.$route.params
    this.initData(gender)
  },
  // head() {
  //   return {
  //     __dangerouslyDisableSanitizers: ['script'],
  //     script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }]
  //   }
  // },
  methods: {
    initData (gender) {
      if (gender === 'men') {
        this.gender = 'male'
      } else if (gender === 'women') {
        this.gender = 'female'
      } else {
        // redirect;
      }
    },
    checkSectionType (sectionType) {
      const index = SECTIONTYPES.findIndex(sectionType)
      return index > 0
    }
  }
}
</script>
<style lang="scss">
  @import "~assets/style/mixin";
  @import '~assets/style/genderlanding';
</style>
