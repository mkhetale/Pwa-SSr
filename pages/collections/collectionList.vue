<template>
  <div class="section_wrapper_plane">
    <ScrollWrapper :processing="processing" :isError="isError" :isOver="isOver" @toFetch="getCollectionList">
      <collection-card v-for="(collection, index) in collectionList" :key="index" :collectionDetail="collection"/>
    </ScrollWrapper>
    <div class="explore_news_comingup" v-if="isOver">New collections added every week</div>
  </div>
</template>
<script>
import service from './service'
import ScrollWrapper from '../../components/scrollComponent'
import CollectionCard from '../../components/collectionCard'
export default {
  name: 'CollectionList',
  async asyncData({app: {$axios}, params, store}) {
    const paramGender = params.gender;
    let gender = 'male';
    if (paramGender === 'women') {
      gender = 'female';
    }
    const id = store.state.page.foreignId;
    let pageCount = 0;
    try {
      const response = await service.getCollectionsList($axios, gender, pageCount, id)
      const collectionList = responseData.data.data
        if (collectionList.length) {
          pageCount += 1;
        } else {
          const isOver = true;
        }
        const processing = false;
      return {
        collectionList,
        pageCount,
        isOver,
        processing
      };
    } catch (error) {
      console.log(error.response);
    }
  },
  data () {
    return {
      id: this.$store.state.page.foreignId,
      // gender: this.$route.params.gender === 'men' ? 'male' : 'female',
      collectionList: [],
      pageCount: 0,
      processing: true,
      isError: false,
      isOver: false
    }
  },
  created () {
    // this.getCollectionList()
  },
  components: {
    ScrollWrapper,
    CollectionCard
  },
  methods: {
    async getCollectionList () {
      this.processing = true
      try {
        const responseData = await service.getCollectionsList(this.gender, this.pageCount, this.id)
        const newList = responseData.data.data
        if (newList.length) {
          this.pageCount += 1
          this.collectionList = [...this.collectionList, ...newList]
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
