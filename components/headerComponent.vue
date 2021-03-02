<template>
  <div class="header">
    <div
    id="header_component"
    :class="[this.$store.state.app.headerClass, this.$store.state.app.menuToggle ? 'menu_active': '']">
    <div class="sidebar">
      <ul class="main_menu">
        <li
          :class="selectedGender === 'male'? 'gender_active': ''"
          class="men_menu"
          @click="toogleGender('male')">
          Men
        </li>
        <li
          :class="selectedGender === 'female'? 'gender_active': ''"
          class="women_menu"
          @click="toogleGender('female')">
          Women
        </li>
      </ul>
      <ul
        v-for="(navSection, index) in megaMenu"
        :key="index"
        class="submenu">
        <template v-for="(section, index) in navSection.navigation">
          <li
            v-if="section.childrens.length"
            :key="index"
            class="accordian_wrapper"
          >
            <input
              :id="`${navSection.name}-${section.name}`"
              type="checkbox"
              name="accordion">
            <label :for="`${navSection.name}-${section.name}`">{{ section.name }}
              <span class="open_arrow" />
              <!-- <span class="global_icon close_arrow"></span> -->
            </label>
            <ul class="inner_submenu">
              <li
                v-for="(subSection, index) in section.childrens"
                :key="index">
                <nuxt-link :to="subSection.url">
                  {{ subSection.name }}
                  <!-- <span class="counts">(***)</span> -->
                </nuxt-link>
              </li>
            </ul>
          </li>
          <li
            v-else
            :key="index">
            <nuxt-link :to="section.url">
              {{ section.name }}
            </nuxt-link>
          </li>
        </template>
      </ul>
      <!-- logged in -->
      <ul
        v-if="this.$store.state.loginStatus"
        class="submenu">
        <span class="account_title">ACCOUNT</span>
        <li>
          <a :href="profile">My Profile</a>
        </li>
        <li>
          <a :href="wishlist">My Wishlist</a>
        </li>
        <li>
          <a :href="orders">My Orders</a>
        </li>
        <li>
          <a
            href="#"
            @click="handleLogout">Logout</a>
        </li>
      </ul>
      <!-- non Logged in -->
      <ul
        v-else
        class="submenu">
        <span class="account_title">ACCOUNT</span>
        <li>
          <a :href="loginURL">Login</a>
        </li>
        <li>
          <a :href="signupURL">Signup</a>
        </li>
      </ul>
    </div>
    <div class="nav_section">
      <div class="left_nav">
        <span
          class="global_icon nav_icons nav_icons--burger"
          @click="handleMenu(true)"/>
        <span
          class="global_icon nav_icons nav_icons--backButton"
          @click="goBack"/>
      </div>
      <div class="logo">
        <nuxt-link to="/">
          <img
            src="~/assets/images/styfi_logo.png"
            alt="sytfi logo">
        </nuxt-link>
        <span class="page_title" v-html="this.$store.state.common.title"/>
      </div>
      <div class="right_nav">
        <span
          class="global_icon nav_icons nav_icons--search"
          @click="navigateSearch"/>
        <span
          v-if="nativeShare"
          class="global_icon nav_icons nav_icons--share"
          @click="handleNativeShare" />
        <span
          class="global_icon nav_icons nav_icons--cart"
          @click="handleCartIcon">
          <span id="cart_count">{{ bagCount }}</span>
        </span>
      </div>
    </div>
    <div class="search_bar">
      <div class="search_bar_wrapper">
        <input
          type="text"
          placeholder="What are you looking for?"
          @click="$router.push({path: '/autosuggest'})">
        <span class="global_icon search_icon" />
      </div>
    </div>
    <div
      class="background_fadein"
      @click="handleMenu(false)" />
    </div>
  </div>
</template>
<script>
import { navigation } from '../constant'
import { mapGetters } from 'vuex'
/* import { logOutUser } from '../utils' */
export default {
  name: 'HeaderComponent',
  data() {
    return {
      loginURL: null,
      signupURL: null,
      navigation,
      profile: process.env.VUE_APP_STYFIPROFILE,
      orders: process.env.VUE_APP_STYFIORDER,
      wishlist: process.env.VUE_APP_STYFIWISHLIST,
      signup: `${process.env.VUE_APP_STYFIENGAGE}/Signup`,
      login: `${process.env.VUE_APP_STYFIENGAGE}`
    }
  },
  computed: {
    ...mapGetters({
      bagCount: 'common/bagsProductCount',
      selectedGender: 'getSelectedGender',
      /* megaMenu: 'getMegaMenu' */
    }),
    megaMenu () {
      return this.navigation.filter(obj => obj.name.toLowerCase() === this.selectedGender);
    },
    nativeShare() {
      return false /* !!navigator.share */
    },
    // loginURL() {
    //   if (process.client) {
    //     return `${this.login}/?referer=${location.origin}${this.$route.fullPath}`  
    //   }
    //   // return '#'
    // },
    // signupURL() {
    //   if (process.client) {
    //     console.log(location.origin, 'signup')
    //     return `${this.signup}/?referer=${location.origin}${this.$route.fullPath}`
    //   }
    //   // return '#'
    // }
  },
  mounted() {
    if (process.client) {
      this.loginURL = `${this.login}/?referer=${location.origin}${this.$route.fullPath}`
      this.signupURL = `${this.signup}/?referer=${location.origin}${this.$route.fullPath}`
    }
  },
  methods: {
    test() {
      alert('fdfdsf')
    },
    handleMenu(boolValue) {
      this.$store.dispatch('app/toogleMenu', boolValue)
      this.$store.dispatch('common/updateFixedScroll', boolValue)
    },
    goBack() {
      this.$router.go(-1)
    },
    handleNativeShare() {
      navigator.share({
        title: this.$store.state.common.title,
        url: this.$route.path
      })
    },
    handleCartIcon() {
      window.location = process.env.VUE_APP_CHECKOUT
    },
    navigateSearch() {
      this.$router.push({ path: '/autosuggest' })
    },
    handleLogout() {
      /* logOutUser() */
    },
    toogleGender(gender) {
      this.$store.dispatch('toogleGender', gender);
    }
  }
}
</script>

<style lang="scss">
@import '~assets/style/navigation.scss';
</style>
