<template>
  <div>
    <div class="product_listing">
      <span class="product_category_counts">
        {{$store.state.plp.count}} Products Found
      </span>
    </div>
    <div class="product_listing_wrapper">
      <div class="row">
        <scroll-wrapper
          :processing="processing"
          :isError="$store.state.plp.scrollError"
          :isOver="$store.state.plp.scrollOver"
          :isInfinite= "false"
          @toFetch="getProductsOnScroll">
          <product-card
            v-for="(product) in $store.state.plp.productsList"
            :key="product.product_id"
            :product="product"
            :scroll='false'></product-card>
        </scroll-wrapper>
      </div>
    </div>
  </div>
</template>
<script>
import ScrollWrapper from '../../../../components/scrollComponent'
import ProductCard from '../../../../components/productCard'
export default {
  name: 'ProductsList',
  components: {
    ScrollWrapper,
    ProductCard
  },
  data () {
    return {
      processing: false,
      isError: false,
      isOver: false
    }
  },
  methods: {
    async getProductsOnScroll () {
      this.processing = true
      this.$store.dispatch('plp/getNextSetProducts')
        .then((prodNumber) => {
          this.processing = false
          if (!prodNumber) {
            this.$store.dispatch('plp/updateScrollOver', true)
          }
        })
        .catch((error) => {
          console.log(error)
          this.$store.dispatch('plp/updateScrollError', true)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .product_listing_wrapper {
    background:var(--white);
    padding:0px 23px;
    & .product_card {
        margin-bottom:20px;
        float: left;
    }
  }
  .product_listing {
    padding-top: 56px;
    background: var(--white);
    text-align: center;
  }
  .product_category_counts {
    font-size: 12px;
    padding: 15px 0;
    display: block;
    color: #928F8F;
  }
</style>
