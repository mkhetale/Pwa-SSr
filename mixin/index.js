
import commonData from '@/constant/commonData'
// let displayData = null
const mixin = {
  // created() {
  //   if (this.$store.state.page.metaData) {
  //     displayData = this.$store.state.page.metaData
  //     // return
  //   }
  // },
  head () {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [{ innerHTML: JSON.stringify(commonData), type: 'application/ld+json' }],
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
}
export default mixin
