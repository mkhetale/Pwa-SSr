<template>
  <button class="following-btn" :class="{following: status}" @click="followBrands">
    <span class="loadingSpinner" v-if="processing"></span>
    <span v-else>{{buttonText}}</span>
  </button>
</template>
<script>
export default {
  name: 'FollowButton',
  props: ['id', 'following'],
  data () {
    return {
      status: this.following,
      processing: false
    }
  },
  methods: {
    followBrands () {
      if (this.$store.state.loginStatus) {
        this.toogleBrandFollow()
      } else {
        window.location = `${process.env.VUE_APP_STYFIENGAGE}/?referer=${window.location.href}`
      }
    },
    async toogleBrandFollow () {
      const data = {
        manufacturer_id: this.id,
        status: this.status ? 0 : 1
      }
      this.processing = true
      try {
        const responseData = await this.$axios.post('/profile/v2/brand/customer', data)
        this.status = !this.status
      } catch (error) {
        console.log(error)
      }
      this.processing = false
    }
  },
  computed: {
    buttonText () {
      return this.status ? 'Following' : 'Follow'
    }
  }
}
</script>
