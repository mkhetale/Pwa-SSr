<template>
  <PLPWrapper />
</template>
<script>
// import store from './store'// eslint-disable-line no-unused-vars
import service from './service'
// import mixin from '@/mixin'
import PLPWrapper from './components/plpWrapper'
export default {
  name: 'PLP',
  // mixins: [mixin],
  components: {
    PLPWrapper
  },
  async asyncData({app: {$axios}, params, store, route}) {
    const paramGender = params.gender;
    const url = `/core/v2/category/products?gender=${paramGender === 'men' ? 'M' : 'F'}&category_id=${store.state.page.foreignId}`
    store.dispatch('plp/resetState', url)
    store.dispatch('plp/onRouteChange', route.query)
    try {
      const response = await service.getAsyncProductsList($axios, url, route.query)
      const initProdData = {
        products: response.data.data,
        filters: response.data.meta.filters,
        sorter: response.data.meta.sorter,
        searchAfter: response.data.meta.search_after,
        count: response.data.meta.count
      }
      store.dispatch('plp/updateInitProductState', initProdData)
      return {
        breadcrumb: response.data.meta.bread_crumbs
      }
    } catch (error) {
      console.log(error.response)
    }
  },
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(this.ldBreadData), type: 'application/ld+json' }
        ],
      titleTemplate: this.$store.state.page.metaData? this.$store.state.page.metaData.title : '%s' ,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: this.$store.state.page.metaData? this.$store.state.page.metaData.description : 'Default'},
        { name: 'copyright', content: this.$store.state.page.metaData? this.$store.state.page.metaData.copyright : 'Default'},
      ],
      link: [
        { rel: 'canonical', href: this.$store.state.page.metaData? this.$store.state.page.metaData.canonical : 'Default' }
      ]
    }
  },
  data () {
    return {
      breadcrumb: null,
      gender: this.$route.params.gender === 'men' ? 'M' : 'F',
      categoryId: this.$store.state.page.foreignId,
      url: `/core/v2/category/products?gender=${this.$route.params.gender === 'men' ? 'M' : 'F'}&category_id=${this.$store.state.page.foreignId}`
    }
  },
  computed: {
    ldBreadData() {
      const breadcrumb = this.breadcrumb
      let breadcrumbData = []
      for (let i = 0; i < breadcrumb.length; i += 1) {
        const data = {
          "@type": "ListItem",
          "position": i + 1,
          "name": breadcrumb[i].name,
          "item": `https://www.styfi.in${breadcrumb[i].href}`
        }
        breadcrumbData.push(data)
      }
      const obj = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbData
      }
      return obj
    }
  },
  created () {
    console.log('created PLP')
  },
  mounted () {
    console.log('Mounted')
    // this.$store.dispatch('plp/resetState', this.url)
  },
  // methods: {
  //   async getProducts () {
  //     try {
  //       store.dispatch('plp/onRouteChange', query)
  //       const url = this.$store.state.plp.url
  //       const params = this.$store.state.plp.queryParams
  //       const responseData = await service.getProductsList(url, params)
  //       const productData = responseData.data
  //       const initProdData = {
  //         products: productData.data,
  //         filters: productData.meta.filters,
  //         sorter: productData.meta.sorter,
  //         searchAfter: productData.meta.search_after,
  //         count: productData.meta.count
  //       }
  //       this.$store.dispatch('plp/updateInitProductState', initProdData)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   },
  //   getFilterObject () {
  //     return {gender: this.gender, category_id: this.categoryId}
  //   }
  // },
  // beforeRouteEnter (to, from, next) {
  //   console.log(to, 'routeEnter')
  //   const query = to.query
  //   next((vm) => {
  //     console.log('next')
  //     vm.$store.dispatch('plp/onRouteChange', query)
  //       .then(() => {
  //         vm.$store.dispatch('plp/getInitProducts')
  //       })
  //   })
  // },
  beforeRouteUpdate (to, from, next) {
    console.log(to.query, 'routeUpdate')
    const query = to.query
    this.$store.dispatch('plp/onRouteChange', query)
      .then(() => {
        this.$store.dispatch('plp/getInitProducts')
      })
    next()
  }
}
</script>
