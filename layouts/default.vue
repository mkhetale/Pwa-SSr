<template>
  <div>
    <header-component />
    <!-- <ul class="breadcrumb">
      <li><a href="#">Home</a></li>
      <li><a href="#">test</a></li>
    </ul> -->
    <nuxt/>
  </div>
</template>
<script>
import HeaderComponent from '~/components/headerComponent'
import commonData from '@/constant/commonData'
import localBusiness from '@/constant/localBusiness'
export default {
  components: {
    HeaderComponent
  },
  head () {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(commonData), type: 'application/ld+json' },
        { innerHTML: JSON.stringify(localBusiness), type: 'application/ld+json' }
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
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
ul.breadcrumb {
  padding: 10px 16px;
  padding-top: 10%;
  list-style: none;
}
ul.breadcrumb li {
  display: inline;
  font-size: 18px;
}
ul.breadcrumb li+li:before {
  padding: 8px;
  color: black;
  content: "/\00a0";
}
ul.breadcrumb li a {
  color: #0275d8;
  text-decoration: none;
}
ul.breadcrumb li a:hover {
  color: #01447e;
  text-decoration: underline;
}
</style>
