<template>
  <div class="landing_section">
    <!-- container414_551 -->
    <div class="home_banner container homeContainer">
      <figure>
        <img src="~assets/images/home-app.jpg" alt="home banner" class="responsive_image">
      </figure>
      <!-- <h1>Welcome <br/> to STYFI</h1> -->
      <div class="home_action_btn">
        <nuxt-link to="/men">Shop Men</nuxt-link>
        <br>
        <nuxt-link to="/women">Shop Women</nuxt-link>
      </div>
    </div>
    <!-- <div class="home_banner container homeContainer">
      <nuxt-link to="/men"></nuxt-link>
      <nuxt-link to="/women"></nuxt-link>
      <figure>
        <img src="~assets/images/home-app.jpg" alt="home banner">
      </figure>
    </div> -->
    <div class="secondBanner container">
      <nuxt-link to="/curated/gift-guide-under-1999"/>
      <nuxt-link to="/curated/gift-guide-under-1999-1000281-1"/>
      <figure>
        <img src="https://image-cdn.styfi.in/curated/13dffbe7-43f5-4b19-9def-fff71e620ec6.jpg">
      </figure>
    </div>
    <!-- <div class="home_two_card">
      <img src="~images/home_card.jpg" alt="" class="responsive_image">
      <img src="~images/home_card.jpg" alt="" class="responsive_image">
    </div> -->

    <!-- <div class="subscription">
      <p>Fear of missing out?</p>
      <span>Subscribe to our newsletter to stay updated</span>
      <input type="text" placeholder="Enter your email address" class="subscribe_input">
      <button type="submit" class="prime_button subscribe_button">Subscribe</button>
    </div> -->
  </div>
</template>
<script>
export default {
  meta: 'djhfbsdhjfdshj'
}
</script>
<style lang="scss">
  @import '~assets/style/home';
</style>
