<template>
  <div class="looks_inner_border">
    <div class="looks_inner_image">
      <nuxt-link :to="product.href">
        <div class="container container4_5">
          <figure>
            <img :src="getImageFromObject(product.image, 'jpg', 0, 'small')"  alt="">
          </figure>
        </div>
      </nuxt-link>
    </div>
    <div class="looks_inner_prod_detail">
      <span class="looks_inner_Prod_name">{{product.name}}</span>
      <span class="looks_inner_prod_brand">by {{product.brand.name}}</span>
      <div class="looks_inner_prod_price">
        <span class="ogPrice" v-if="(product.offer.original_price > product.offer.selling_price)">
          Rs. {{product.offer.original_price}}/-
        </span>
        <span>
          Rs.{{product.offer.selling_price}}
        </span>
      </div>
      <button class="looks_add_to_bag add_bag_btn" @click="addToBag">
        <span class="global_icon cart_icon_white"></span>
        <span class="add_bag_text">Add to Bag</span>
      </button>
    </div>
  </div>
</template>
<script>
import {getImageFromObject} from '@/utils'
export default {
  name: 'HProductCard',
  props: {
    product: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    addToBag () {
      this.$emit('addToBag')
    },
    getImageFromObject
  }
}
</script>
