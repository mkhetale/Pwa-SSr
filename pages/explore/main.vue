<template>
  <div v-if="exploreData">
    <no-ssr>
      <template v-for="(exploreSection,index) in exploreData">
        <component :is="`${exploreSection.section_topic_type}_${exploreSection.section_id}`" :sectionData="exploreSection" :key="index"/>
      </template>
    </no-ssr>
    <!-- <no-ssr> -->
      <component :is="blogComponent" :sectionData="blogList"></component>
    <!-- </no-ssr> -->
  </div>
</template>
<script>
import service from './service'
import TrendingSlider from './components/slider'
import TrendingLooks from './components/looks'
import CuratedCollection from './components/collection'
// import mixin from '@/mixin'
export default {
  name: 'ExploreList',
  // mixins: [mixin],
  components: {
    'collections_1': TrendingSlider,
    'looks_2': TrendingLooks,
    'collections_4': CuratedCollection
  },
  async asyncData({app: {$axios}, params}) {
    const paramGender = params.gender;
    let gender = 'male';
    if (paramGender === 'women') {
      gender = 'female';
    }
    try {
      const [responseExplore, responseBlog] = await Promise.all([
        service.getExploreListing($axios, gender),
        service.getBlogList($axios, gender)
      ]);
      // const blogComponent = () => import(/* webpackChunkName "blogList" */ './components/blog').then(m => m.default || m)
      return {
        blogList: responseBlog.data.data[0],
        exploreData: responseExplore.data.data,
        // blogComponent
      };
    } catch (error) {
      console.log(error.response)
    }
  },
  data () {
    return {
      gender: null,
      exploreData: null,
      blogList: null,
      blogComponent: null
    }
  },
  mounted() {
    if(this.blogList) {
      this.blogComponent = () => import(/* webpackChunkName "blogList" */ './components/blog').then(m => m.default || m)
    }
  }
}
</script>
<style lang="scss">
@import '~assets/style/mixin.scss';
@import '~assets/style/explore.scss'
</style>
