<template>
  <div>
    <topics-list :topicsList="topicsList" :topicType="topicType"/>
    <router-view :key="$route.path"></router-view>
  </div>
</template>
<script>
import TopicsList from '../../components/topic'
import service from './service'
export default {
  components: {
    TopicsList
  },
  async asyncData({app: {$axios}, params}) {
    const paramGender = params.gender;
    let gender = 'male';
    if (paramGender === 'women') {
      gender = 'female';
    }
    try {
      const response = await service.getLooksTopics($axios, gender)
      console.log(response.data.data)
      return {
        topicsList: response.data.data
      };
    } catch (error) {
      console.log(error.response)
    }
  },
  data () {
    return {
      gender: this.$route.params.gender === 'men' ? 'male' : 'female',
      topicsList: [],
      topicType: 'looks'
    }
  },
  created () {
    console.log('created LOOKs')
    // this.getLooksTopics()
  },
  methods: {
    async getLooksTopics () {
      try {
        const responseData = await service.getLooksTopics(this.gender)
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
