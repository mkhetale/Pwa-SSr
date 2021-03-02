<template>
  <div class="section_wrapper_plane">
    <ScrollWrapper :processing="processing" :isError="isError" :isOver="isOver" @toFetch="getLooksList">
      <look-card v-for="(look, index) in lookList" :key="index" :lookDetail="look" cardType="vertical"/>
    </ScrollWrapper>
    <div class="explore_news_comingup" v-if="isOver">New looks added every week</div>
  </div>
</template>
<script>
import service from './service'
import ScrollWrapper from '../../components/scrollComponent'
import LookCard from '../../components/lookCard'
export default {
  name: 'LooksList',
  async asyncData({app: {$axios}, params, store}) {
    const paramGender = params.gender;
    let gender = 'male';
    if (paramGender === 'women') {
      gender = 'female';
    }
    const id= store.state.page.foreignId;
    let lookList= [];
    let pageCount= 0;
    let processing= true;
    let isError= false;
    try {
      const response = await $axios.get('/core/v2/explore/look', {params: {topic_id: id, gender, pageCount}})
      lookList = response.data.data
      processing = false
      return {
        lookList,
        processing,
        isError
      };
    } catch (error) {
      console.log(error.response, 'asyncError')
    }
  },
  data () {
    return {
      id: this.$store.state.page.foreignId,
      gender: this.$route.params.gender === 'men' ? 'male' : 'female',
      lookList: [],
      pageCount: 0,
      processing: true,
      isError: false,
      isOver: false
    }
  },
  created () {
    // this.getLooksList()
  },
  components: {
    ScrollWrapper,
    LookCard
  },
  methods: {
    async getLooksList () {
      this.processing = true
      try {
        const responseData = await service.getLooksList(this.$axios, this.gender, this.pageCount, this.id)
        const newList = responseData.data.data
        if (newList.length) {
          this.pageCount += 1
          this.lookList = [...this.lookList, ...newList]
        } else {
          this.isOver = true
        }
        this.processing = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
