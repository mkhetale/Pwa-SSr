const mixin = {
  data () {
    const { gender } = this.$route.params
    return {
      gender
    }
  },
  props: {
    sectionData: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
export default mixin
