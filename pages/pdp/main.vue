<template>
  <div v-if="productDetail">
    <div class="pdp_banner_slider">
      <no-ssr>
      <carousel :perPage="1">
        <slide v-for="(image, index) in selectedVariant.image.images" :key="index">
          <div class="container container4_5">
            <figure>
              <img :src="productUrl[index]" alt="">
            </figure>
          </div>
        </slide>
      </carousel>
      </no-ssr>
      <!-- <no-ssr> -->
      <div id="lookBtn" class="global_icon" @click="lookNavigate"></div>
      <!-- </no-ssr> -->
    </div>
    <div class="pdp_product_info" ref="productInfo">
      <span class="pdd_product_brand">{{brand.name}}</span>
      <span class="pdp_product_name">{{name}}</span>
      <span class="pdp_price_wrapper">
        <span class="pdp_product_price">₹ {{offer.sellingPrice}}</span>
        <template v-if="offer.originalPrice > offer.sellingPrice">
          <span class="pdp_product_ogprice">₹ {{offer.originalPrice}}</span>
          <span class="pdp_product_discount">{{offer.perc}}%</span>
        </template>
      </span>
      <span id="sfCash_wrapper">
        <span class="global_icon" id="sf_icon"></span>
        <span>Recive SF Cash worth <b>Rs.{{productDetail.sf_wallet.sf_cash_earned}}</b> on this product</span>
      </span>
    </div>
    <div class="select_size" v-if="variants.length > 1">
      <div class="select_size_heading">
        <span>Available Colors</span>
      </div>
      <ul>
        <li v-for="(variant, index) in variants" :key="index">
          <div class="color-circle" :class="{color_active: (variant.color.id === selectedVariant.color.id)}"
            :style="{backgroundColor:`#${variant.color.hex}`}" @click="selectVariant(variant.color.id)">
          </div>
        </li>
      </ul>
    </div>
    <div class="select_size">
      <div class="select_size_heading">
        <span>Select your size</span>
        <span>
          <button class="size_char" @click="openSizeChart">Size Chart</button>
        </span>
      </div>
      <ul ref="sizeList">
        <li v-for="(size, index) in selectedVariant.sizes" :key="index" :class="{out_of_stock: size.quantity <= 0}">
          <button class="size_button"
            :class="{selected_size: selectedSize.sku === size.sku}"
            :disabled="size.quantity <= 0"
            @click="onSizeClick(size)">{{size.label}}</button>
        </li>
      </ul>
    </div>
    <div class="bag_btn_wrapper">
      <div class="add_to_bag" :class="{btn_fixed:buyBtnFixed}">
        <span class="wishlist_background" @click="addToWishlist">
          <span class="global_icon black_heart_icon" :class="{active: wishlisted}" ref="wishlistIcon"></span>
        </span>
        <button class="add_to_bag_btn" @click="addToBagClick" v-show="buyBtnFixed">
          <span class="global_icon add_to_bag_icon"></span> Add to bag
        </button>
        <button class="add_to_bag_btn" @click="addToBagClick" v-show="!buyBtnFixed">
          <template v-if="!gotoBag">
            <span class="global_icon add_to_bag_icon"></span> Add to bag
          </template>
          <template v-else>
            Go To Bag →
          </template>
        </button>
      </div>
      <div class="btn_tracker" ref="btnTracker"></div>
    </div>
    <div class="product_details">
      <input id="pdp_accordion" class="pdp_accordion_input" name="accordion" type="checkbox">
      <label for="pdp_accordion" class="pdp_accordion_label">Delivery &amp; Returns
        <i class="accor_icon"></i>
      </label>
      <div class="pdp_accord1">
        <div class="deliveryinput">
          <input class="pincode_input" type="number" maxlength="6" placeholder="Enter delivery pincode" v-model="pincode">
          <button class="pin_chkbtn" @click="checkPincode">CHECK</button>
          <!-- <button class="pin_chkbtn pinchange_btn" style="display: none;">CHANGE</button> -->
        </div>
        <div class="delivery_response" v-if="pincodeValidated">
          <div class="delivery_available" v-if="isAvailable">
            <span class="global_icon right_circle_icon"></span>
            <span>Available in your area</span>
          </div>
          <div class="delivery_notavailable" v-else>
            <span class="global_icon cross_circle_icon"></span>
            <span>Sorry! This product is not available in your area.</span>
          </div>
        </div>
        <div class="deliveryterms">
          <ul>
            <li v-for="(text, index) in policy" :key="index">
              {{text}}
            </li>
          </ul>
        </div>
        <div class="deliveryterms">
          <span class="pdp_accordion_label">Return Policy</span>
          <ul>
            <li>
              This product can be returned in 14 days after delivery.
            </li>
          </ul>
          <!-- <span class="viewReturn_policy">return policy</span> -->
        </div>
      </div>
    </div>
    <div class="product_details">
      <input id="pdp_accordion1" class="pdp_accordion_input" name="accordion" type="checkbox">
      <label for="pdp_accordion1" class="pdp_accordion_label">Product Details
        <i class="accor_icon"></i>
      </label>
      <div class="accord1 pdp_accord1">
        <div class="product_description">
          <p>{{description}}</p>
        </div>
      </div>
    </div>
    <div class="product_details">
      <input id="pdp_accordion2" class="pdp_accordion_input" name="accordion" type="checkbox">
      <label for="pdp_accordion2" class="pdp_accordion_label">About Brand
        <i class="accor_icon"></i>
      </label>
      <div class="accord1 pdp_accord1">
        <div class="brand-add">
          <a href="/brand/scarlet-ross" class="brandLink">
            <div class="brand-addinner">
              <img :src="brand.image" :alt="brand.name">
              <span>{{brand.name}}</span>
            </div>
          </a>
          <follow-button :id="brand.id" :following="brand.following"/>
        </div>
        <div class="product_description">
          <p>{{brand.description}}</p>
        </div>
      </div>
    </div>
    <div class="more_product" v-if="similarBrandProducts.length">
      <div class="scroll_section_wrapper">
        <div class="section_header">
          <span>More From {{brand.name}}</span>
          <nuxt-link :to="brand.href">View All</nuxt-link>
        </div>
        <div class="horizontal_scroll margin-left-right">
          <product-card v-for="(product,index) in similarBrandProducts" :key="index" :product="product"/>
        </div>
      </div>
    </div>
    <div class="more_product" v-if="similarProducts.length">
      <div class="scroll_section_wrapper">
        <div class="section_header">
          <span>Similar Products</span>
        </div>
        <div class="horizontal_scroll margin-left-right">
          <product-card v-for="(product,index) in similarProducts" :key="index" :product="product"/>
        </div>
      </div>
    </div>
    <!-- All the modal Wrapper will come here -->
    <size-chart v-if="showSizeChart" @closeChart="closeSizeChart" :sizeChartObj="sizeChartObj"></size-chart>
    <size-modal v-if="showSizeModal"
      :show="showSizeModal"
      :selectedVariant="selectedVariant"
      :productId="productId"
      :sizeChart="true"
      :openSizeChart="openSizeChart"
      @closeSizeModal="closeSizeSelector">
    </size-modal>
  </div>
</template>
<script>
// import { Carousel, Slide } from 'vue-carousel'
import {getImageFromObject} from '@/utils'
import service from './service'
import ProductCard from '../../components/productCard'
import FollowButton from '../../components/followButton'
import SizeChart from './components/sizeChart'
import SizeModal from '../../components/modal/sizeModal'
// import mixin from '@/mixin'
export default {
  name: 'PDP',
  // mixins: [mixin],
  components: {
    ProductCard,
    FollowButton,
    SizeChart,
    SizeModal
  },
  async asyncData({app: {$axios}, store}) {
    const productId = store.state.page.foreignId
    try {
      const response = await service.getProductDetails($axios, productId)
      const productDetail = response.data
      return {
        productDetail,
        productId
      };
    } catch (error) {
      console.log(error)
    }
  },
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(this.ldProductData), type: 'application/ld+json' },
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
      // ldProductData: null,
      productUrl: [],
      productId: null,
      productDetail: null,
      name: null,
      description: null,
      selectedVariant: {},
      brand: {},
      offer: {},
      productCategory: {},
      variants: [],
      similarProducts: [],
      similarBrandProducts: [],
      sizeChartObj: {},
      btnTracker: null,
      prodInfoWrapper: null,
      ticking: false,
      buyBtnFixed: true,
      transparentHeader: true,
      showSizeChart: false,
      showSizeModal: false,
      selectedSize: {},
      gotoBag: false,
      wishlisted: false,
      pincode: '',
      policy: [],
      pincodeValidated: false,
      isAvailable: true
    }
  },
  created () {
    // if (this.$store.state.common.tokenChecked) {
    //   this.getProductDetails()
    // }
    this.onInitalProductData()
    // this.getProductDetails()
  },
  methods: {
    sendGAEvents (actionType, event = [], addObj = {}) {
      const prodObj = Object.assign({}, {
        id: this.productId,
        name: this.name,
        price: this.offer.sellingPrice,
        variant: this.selectedVariant.color.name,
        brand: this.brand.name,
        category: this.productCategory.name
      }, addObj)
      this.$ga.ecommerce.addProduct(prodObj)
      this.$ga.ecommerce.setAction(actionType)
      // window.ga('send', ...event)
    },
    async getProductDetails () {
      this.productId = this.$store.state.page.foreignId
      try {
        const response = await service.getProductDetails(this.$axios, this.productId)
        this.productDetail = response.data
        this.onInitalProductData()
      } catch (error) {
        console.log(error)
      }
    },
    onInitalProductData () {
      this.mapData()
      // this.sendGAEvents('detail', ['pageview'])
      this.getSimilarProducts()
      this.getSimilarBrandProducts()
      this.getSizeChart()
      if (process.client) {
        this.$nextTick()
        .then(() => {
          this.btnTracker = this.$refs.btnTracker
          this.prodInfoWrapper = this.$refs.productInfo
          window.addEventListener('scroll', this.onPDPScroll.bind(this))
        })
      }
    },
    mapData () {
      this.name = this.productDetail.name || 'Product Name'
      this.description = this.productDetail.description || 'Product Description'
      this.brand = {
        id: this.productDetail.brand.id || 0,
        href: this.productDetail.brand.href || '/',
        image: this.productDetail.brand.image || '',
        description: this.productDetail.brand.description || 'Brand Description',
        name: this.productDetail.brand.name || 'Brand Name',
        following: this.productDetail.brand.is_followed || false
      }
      this.offer = {
        originalPrice: this.productDetail.offer.original_price || 0,
        sellingPrice: this.productDetail.offer.selling_price || 0,
        value: this.productDetail.offer.value || 0,
        perc: this.productDetail.offer.perc || 0,
        enum: this.productDetail.offer.enum || 'D'
      }
      this.productCategory = this.productDetail.categories ? this.productDetail.categories.find((cat) => {
        return cat.is_leaf
      }) : {}
      this.variants = this.productDetail.variants || []
      this.selectedColorVariant()
    },
    selectedColorVariant () {
      const colorId = this.$route.query.color_id
      this.selectedVariant = this.variants[0] // variant is always preselected
      if (colorId) {
        const colorVariant = this.variants.find((variant) => (variant.color.id === colorId))
        if (colorVariant) {
          this.selectedVariant = colorVariant
        }
      }
      this.getImgUrls(this.selectedVariant)
      this.wishlisted = this.selectedVariant.is_wishlisted
    },
    async getSimilarProducts () {
      try {
        const responseData = await service.getSimilarProducts(this.$axios, this.productId, this.brand.id)
        this.similarProducts = responseData.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async getSimilarBrandProducts () {
      try {
        const responseData = await service.getSimilarBrandProducts(this.$axios, this.productId, this.brand.id)
        this.similarBrandProducts = responseData.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async getSizeChart () {
      try {
        const responseData = await service.getSizeChart(this.$axios, this.productId, this.brand.id, this.productCategory.id)
        this.sizeChartObj = responseData.data.data
      } catch (error) {
        console.log(error)
      }
    },
    onPDPScroll () {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.scrollAction()
          this.ticking = false
        })
      }
      this.ticking = true
    },
    scrollAction () {
      /* const currentPos = window.scrollY */
      this.checkCartBtnPosition()
      this.checkHeaderTansparentStatus()
    },
    checkCartBtnPosition (currentPos) {
      const windHeight = window.innerHeight
      const btnPos = this.btnTracker.getBoundingClientRect().top
      if (windHeight >= btnPos) {
        this.buyBtnFixed = false
      } else {
        this.buyBtnFixed = true
      }
    },
    checkHeaderTansparentStatus () {
      const proInfoPos = this.prodInfoWrapper.getBoundingClientRect().top
      if (proInfoPos <= 60) { // here 60 header height make it dynamic
        this.transparentHeader = false
      } else {
        this.transparentHeader = true
      }
    },
    selectVariant (colorId) {
      this.$router.push({query: {color_id: colorId}})
    },
    addToBagClick () {
      if (this.buyBtnFixed) {
        this.showSizeModal = true
      } else {
        this.performAddToCart()
      }
    },
    performAddToCart () {
      if (this.gotoBag) {
        // this.sendGAEvents('checkout', ['event', 'UX', 'click', 'go to bag'], {sku: this.selectedSize.sku})
        window.location = process.env.VUE_APP_CHECKOUT
      } else {
        if (Object.keys(this.selectedSize).length) {
          const obj = {
            product: this.productObject,
            axios: this.$axios
          }
          this.$store.dispatch('common/addProduct', obj)
            .then(() => {
              console.log('productObject')
              // this.sendGAEvents('add', ['event', 'UX', 'click', 'add to bag'], {sku: this.selectedSize.sku})
            })
          this.gotoBag = true
        } else {
          const sizeList = this.$refs.sizeList
          sizeList.classList.add('shake-size')
          setTimeout(() => {
            sizeList.classList.remove('shake-size')
          }, 900)
        }
      }
    },
    openSizeChart () {
      this.showSizeChart = true
    },
    closeSizeChart () {
      this.showSizeChart = false
    },
    openSizeSelector () {
      this.showSizeModal = true
    },
    closeSizeSelector () {
      this.showSizeModal = false
    },
    onSizeClick (size) {
      this.selectedSize = size
      this.$store.dispatch('common/getDuplicateProduct', this.productObject)
        .then((status) => {
          this.gotoBag = status
        })
    },
    wishlistClicked () {
      if (this.$store.state.loginStatus) {
        this.addToWishlist()
      } else {
        window.location = `${process.env.VUE_APP_STYFIENGAGE}/?referer=${window.location.href}`
      }
    },
    async addToWishlist () {
      try {
        const status = this.wishlisted ? 0 : 1
        const prodData = {product_id: this.productId, status, color_id: this.selectedVariant.color.id}
        await service.wishlistProduct(this.$axios, prodData)
        this.wishlisted = !this.wishlisted
        // this.sendGAEvents(this.wishlisted ? 'addedToWishlist' : 'removeWishlist')
        /* if (status) {
          this.$refs.wishlistIcon.classList.add('active')
        } else {
          this.$refs.wishlistIcon.classList.remove('active')
        } */
      } catch (error) {
        console.log(error)
      }
    },
    getImage(image, type, index, size) {
      const url = getImageFromObject(image, type, index, size)
      if (this.productUrl.length < 6) {
         
      }
      return url
    },
    getImgUrls(obj) {
      for (let i = 0; i < obj.image.images.length; i += 1) {
        const url = getImageFromObject(obj.image, 'jpg', i, 'large')
        this.productUrl.push(url)
      }
    },
    checkPincode () {
      if (/^[1-9][0-9]{5}$/.test(this.pincode)) {
        this.validatePincode()
      } else {
        alert('Please enter a valid 6 digit pin code')
      }
    },
    async validatePincode () {
      try {
        const pinObj = {
          pincode: this.pincode,
          product_id: this.productId
        }
        const responseData = await service.checkPincode(this.$axios, pinObj)
        const deliverData = responseData.data.data
        this.pincodeValidated = true
        this.policy = deliverData.policy
        this.isAvailable = deliverData.is_available
      } catch (error) {
        console.log(error.response)
      }
    },
    lookNavigate () {
      this.$router.push({name: 'LooksSlider', params: {productId: this.productId}})
    }
  },
  computed: {
    ldProductData () {
      const obj = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": this.productDetail.name,
        "image": this.productUrl,
        "description": this.productDetail.description,
        "brand": {
          "@type": "Thing",
          "name": this.productDetail.brand.name,
        }
      }
      return obj
    },
    ldBreadData() {
      const breadcrumb = this.productDetail.bread_crumbs
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
    },
    productObject () {
      const prodBagObject = {
        product_id: this.productId,
        color_id: this.selectedVariant.color.id,
        size_label: this.selectedSize.label,
        sku: this.selectedSize.sku
      }

      /* const prodBagObject = {
        id: this.productId,
        selected_quantity: 1,
        selected_size: {
          variant_id: this.selectedSize.sku,
          label: this.selectedSize.label,
          color: {
            id: this.selectedVariant.color.id
          }
        }
      } */
      return prodBagObject
    }
  },
  watch: {
    transparentHeader (val) {
      if (val) {
        this.$store.dispatch('common/updateHeaderClass', 'header_transparent_backbutton_withShare')
      } else {
        this.$store.dispatch('common/updateHeaderClass', 'header_backbutton_withShareIcon')
      }
    },
    '$store.state.common.tokenChecked' (val) {
      if (val) {
        this.getProductDetails()
      }
    }
  }
  /* beforeRouteUpdate (to, from, next) {
    console.log(to)
    console.log(from)
    this.getProductDetails()
    next()
  } */
}
</script>
<style lang="scss">
  @import "~assets/style/mixin";
  @import '~assets/style/pdp';
  #lookBtn {
    width: 34px;
    height: 34px;
    background-color: rgba(255,255,255,.3);
    position: absolute;
    border-radius: 50%;
    bottom: 15px;
    right: 15px;
    background-position: -211px -31px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  }
  .pdp_banner_slider {
    position: relative;
  }
  #sfCash_wrapper {
    display: flex;
    font-size: 13px;
    align-items: center;
    margin-top: 10px;
  }
  span#sf_icon {
      display: block;
      width: 25px;
      height: 25px;
      background-position: -178px -36px;
      margin-right: 5px;
  }
  .pdp_banner_slider {
    & .VueCarousel-pagination {
      position: absolute;
      bottom: 0;
    }
  }
  .selected_size {
    background: #323a45;
    color: #fff;
    border: 1px solid #323a45;
  }
  .shake-size {
    animation: shake-list 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
  @keyframes shake-list {
  10%,
  90% {
    -webkit-transform: translate3d(-1px, 0, 0);
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    -webkit-transform: translate3d(2px, 0, 0);
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    -webkit-transform: translate3d(-4px, 0, 0);
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    -webkit-transform: translate3d(4px, 0, 0);
    transform: translate3d(4px, 0, 0);
  }
}
</style>
