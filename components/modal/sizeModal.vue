<template>
  <modal-wrapper :show="show" :onClose="close">
    <transition appear name="sizeModal">
      <div class="sizeList_wrapper">
        <div class="select_size_heading">
          <span>Select your size</span>
          <span v-if="sizeChart">
            <button class="size_char" @click="openSizeChart">Size Chart</button>
          </span>
        </div>
        <ul class="size_list">
          <li v-for="(size, index) in selectedVariant.sizes" :key="index" :class="{out_of_stock: size.quantity <= 0}">
            <button class="selectSize_button"
              :class="{selected_size: selectedSize.sku === size.sku}"
              :disabled="size.quantity <= 0"
              @click="onSizeClick(size)">
                {{size.label}}
            </button>
          </li>
        </ul>
        <button class="sizeModal_addtobag" :disabled="Object.keys(selectedSize).length === 0" @click="addToBag">
          <template v-if="!gotoBag">
            <span class="global_icon add_to_bag_icon"></span> Add to bag
          </template>
          <template v-else>
            Go To Bag →
          </template>
        </button>
      </div>
    </transition>
  </modal-wrapper>
</template>
<script>
import ModalWrapper from './modalWrapper'
export default {
  name: 'SizeModal',
  components: {
    ModalWrapper
  },
  props: ['show', 'selectedVariant', 'productId', 'sizeChart', 'openSizeChart'],
  data () {
    return {
      selectedSize: {},
      gotoBag: false
    }
  },
  mounted () {
    this.$store.dispatch('common/updateFixedScroll', true)
  },
  destroyed () {
    this.$store.dispatch('common/updateFixedScroll', false)
  },
  methods: {
    onSizeClick (size) {
      this.selectedSize = size
      this.$store.dispatch('common/getDuplicateProduct', this.productObject)
        .then((status) => {
          this.gotoBag = status
        })
    },
    addToBag () {
      if (!this.gotoBag) {
        this.$store.dispatch('common/addProduct', this.productObject)
        this.gotoBag = true
        this.close()
      } else {
        window.location = process.env.VUE_APP_CHECKOUT
      }
    },
    close () {
      this.$emit('closeSizeModal')
    }
  },
  computed: {
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
  }
}
</script>
<style lang="scss" scoped>
  @import "~assets/style/mixin";
  .sizeList_wrapper {
    width: 100%;
    min-height: 160px;
    padding: 25px 15px;
    position: absolute;
    bottom: 0;
    background: #fff
  }
  .size_list{
    list-style: none;
    padding: 0;
    margin: 0;
    & li {
      display: inline;
    }
  }
  .selectSize_button {
    height:34px;
    min-width:34px;
    border-radius: 34px;
    background:var(--white);
    border:1px solid var(--primeColor);
    font-size:12px;
    margin-right:10px;
    &:disabled {
      opacity: .5;
      cursor: not-allowed;
      background: #b3b3b3;
      color: #fff;
      border: 1px solid #b3b3b3;
    }
  }
  .size_char {
    color: var(--goldenColor);
    background: none;
    border: none;
    font-size: 0.9375rem;
    font-weight: 400;
  }
  .select_size_heading {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .sizeModal_addtobag{
    background: #C9A560;
    color: #fff;
    width: 100%;
    padding: 10px 0px;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 43px;
    &:disabled {
      background: #d2d2d2;
    }
  }
  .selected_size {
    background: #323a45;
    color: #fff;
    border: 1px solid #323a45;
  }
  .sizeModal-enter-active, .sizeModal-leave-active {
    transition: transform .2s linear;
  }
  .sizeModal-enter, .sizeModal-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
</style>
