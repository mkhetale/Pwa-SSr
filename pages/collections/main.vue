<template>
  <div>
    <topics-list :topicsList="topicsList" :topicType="topicType"/>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>
<script>
import TopicsList from '../../components/topic'
import service from './service'
export default {
  async asyncData({app: {$axios}, params}) {
    const paramGender = params.gender;
    let gender = 'male';
    if (paramGender === 'women') {
      gender = 'female';
    }
    try {
      const response = await service.getCollectionTopics($axios, gender)
      return {
        blogsList: response.data.data
      };
    } catch (error) {
      console.log(error.response)
    }
  },
  data () {
    return {
      gender: this.$route.params.gender === 'men' ? 'male' : 'female',
      topicsList: [],
      topicType: 'collections'
    }
  },
  components: {
    TopicsList
  },
  created () {
    // this.getCollectionTopics()
  },
  methods: {
    async getCollectionTopics () {
      try {
        const responseData = await service.getCollectionTopics(this.gender)
        this.topicsList = responseData.data.data
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
