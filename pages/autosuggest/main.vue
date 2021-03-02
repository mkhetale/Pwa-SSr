<template>
  <div class="search_wrapper">
    <form @submit.prevent="submitSearch">
      <input type="text"
        class="search_input"
        placeholder="What are you looking for ?"
        @keyup="onSearch"
        ref="searchInput"/>
    </form>
    <span class="global_icon back_arrow" @click="goBack"></span>
    <span class="global_icon close_icon"></span>
    <div class="searchResult">
      <div class="trending_search" v-for="(searchRe, key) in searchResult" :key="key" v-if="searchRe.length">
        <p v-if="key === 'brand_suggestions'">Brands</p>
        <p v-else-if="key === 'category_suggestions'">Categories</p>
        <p v-else-if="key === 'product_suggestions'">Products</p>
        <ul class="search_ul">
          <li class="search_li" v-for="(search) in searchRe" :key="search.entity_id">
            <nuxt-link :to="search.href">
              <span class="global_icon black_search_icon"></span>{{search.display}}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="trending_search">
      <p>TRENDING SEARCHES</p>
      <ul class="search_ul">
        <li class="search_li" v-for="(search) in $store.state.common.trendingSearch" :key="search.content_data_id">
          <nuxt-link :to="search.href">
            <span class="global_icon trending_icon"></span>{{search.content_title}}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import service from './service'
function debounce (func, wait, immediate) {
  let timeOut
  return function () {
    let context = this
    let args = arguments
    let later = function () {
      timeOut = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    var callNow = immediate && !timeOut
    clearTimeout(timeOut)
    timeOut = setTimeout(later, wait)
    if (callNow) {
      func.apply(context, args)
    }
  }
}
export default {
  name: 'AutoSuggest',
  async asyncData({app: {$axios}, store}) {
    try {
      const response = await $axios.get('/api/search/trending');
      store.dispatch('common/saveTrendingSearch', response.data.data[0].section_data)
    } catch (error) {
      console.log(error.response)
    }
  },
  data () {
    return {
      searchResult: {}
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    submitSearch () {
      this.$router.push({path: '/search', query: { phrase: this.$refs.searchInput.value }})
    },
    onSearch: debounce(function (e) {
      if (e.which === 13) {
        return
      }
      service.getSearchResult(e.target.value)
        .then((response) => {
          this.searchResult = response.data.data
        })
    }, 500)
  }
}
</script>
<style lang="scss">
@import '~assets/style/mixin.scss';
@import '~assets/style/search.scss';
</style>
