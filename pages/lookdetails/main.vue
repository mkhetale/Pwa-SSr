<template>
  <div v-if="lookDetails">
    <div class="container">
      <div class="container1_1">
        <figure>
          <img :src="lookDetails.image.medium" alt="">
        </figure>
      </div>
      <div class="explore_banner_overlay">
        <span class="looks_overlay_title">{{lookDetails.topic_name}}</span>
        <span class="looks_overlay_detail">{{lookDetails.name}}</span>
      </div>
    </div>
    <div class="looks_inner_wrapper">
      <h-product-card v-for="(product,index) in  lookProducts" :key="index" :product="product" @addToBag="addtoBagClick(product)"/>
    </div>
    <size-modal v-if="showSizeModal"
      :show="showSizeModal"
      :selectedVariant="selectedProduct"
      :productId="selectedProduct.product_id"
      :sizeChart="false"
      @closeSizeModal="closeSizeSelector">
    </size-modal>
  </div>
</template>
<script>
import HProductCard from '../../components/hProductCard'
import SizeModal from '../../components/modal/sizeModal'
import service from './service'
// import mixin from '@/mixin'
export default {
  components: {
    HProductCard,
    SizeModal
  },
  // mixins: [mixin],
  async asyncData({app: {$axios}, params, store}) {
    const lookId = store.state.page.foreignId
    try {
      const [responseDetails] = await Promise.all([
        service.getLookDetails($axios, lookId),
        // service.getLookProducts($axios, lookId)
      ]);
      return {
        lookDetails: responseDetails.data.data,
        // lookProducts: responseProducts.data.data,
      };
    } catch (error) {
      console.log(error.response)
    }
  },
  data () {
    return {
      lookId: this.$store.state.page.foreignId,
      lookDetails: null,
      lookProducts: [],
      selectedProduct: null,
      showSizeModal: false
    }
  },
  created () {
    // this.getLookDetails()
    // this.getLookProducts()
  },
  methods: {
    async getLookDetails () {
      try {
        const responseData = await service.getLookDetails(this.lookId)
        this.lookDetails = responseData.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async getLookProducts () {
      try {
        const responseData = await service.getLookProducts(this.lookId)
        this.lookProducts = responseData.data.data
      } catch (error) {
        console.log(error)
      }
    },
    addtoBagClick (product) {
      this.selectedProduct = product
      this.showSizeModal = true
    },
    closeSizeSelector () {
      this.showSizeModal = false
      this.selectedProduct = null
    }
  }
}
</script>
<style lang="scss">
  @import '~assets/style/mixin';
  @import '~assets/style/explore'
</style>
