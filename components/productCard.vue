<template>
  <div class="product_card" :class="scroll ? 'scroll_ProductCard': 'half_ProductCard'">
    <div :class="card ? 'container--shadow container--radius' : ''">
      <div class="productCard_img" @click="routeToProduct">
        <div class="ooStock_overlay" v-if="!product.status.enum">Out Of Stock</div>
        <div class="cardImg_hideOverflow">
          <nuxt-link :to="`${product.href}?color_id=${product.color.id}`">
          <!-- <a :href="`${product.href}?color_id=${product.color.id}`"> -->
          <img
            :src="getImageFromObject(product.image, 'jpg', 0, 'small')"
            alt=""
            class="cardImg">
          <!-- </a> -->
          </nuxt-link>
          <!-- <nuxt-link :to="product.href">
          </nuxt-link> -->
        </div>
      </div>
      <div class="productCard_info">
        <div class="productCard_brand">
          <span>
            {{product.brand.name}}
          </span>
        </div>
        <div class="productCard_name" style="">
          <span>
            {{product.name}}
          </span>
        </div>
        <div class="productCard_price">
          <div>
            <span class="ogPrice" v-if="(product.offer.original_price > product.offer.selling_price)">
              Rs.{{product.offer.original_price}}
            </span>
            <span>
              Rs.{{product.offer.selling_price}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getImageFromObject} from '@/utils'
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      default () {
        return {}
      }
    },
    card: {
      type: Boolean,
      default () {
        return false
      }
    },
    scroll: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  methods: {
    routeToProduct () {
      const routeObj = {
        url: `${this.product.href}`,
        foreignKey: this.product.product_id
      }
      this.$store.dispatch('common/updateTitle', this.product.name)
      this.$store.dispatch('common/updateRouteData', routeObj)
        // .then(() => {
        //   this.$router.push({path: `${this.product.href}?color_id=${this.product.color.id}`})
        // })
    },
    getImageFromObject
  }
}
</script>
<style lang="scss" scoped>
  .ooStock_overlay {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 100;
    font-size: 14px;
    background: rgba(0,0,0,.5);
    z-index: 1;
  }
</style>
