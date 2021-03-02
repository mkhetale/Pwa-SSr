<template>
  <modal-wrapper :show="show" :onClose="close">
    <transition appear name="sizeModal">
      <div class="sortModal">
        <div class="sort_options">
          <span class="sort_heading">
            <i class="checkMark"></i>Sort By
            {{$store.state.plp.sortType}}
          </span>
          <ul>
            <li v-for="(sortOption) in $store.state.plp.sorter"
              :key="sortOption.key"
              @click="onSortClick(sortOption.key)"
              :class="{selected: (sortOption.key === $store.state.plp.sortType)}">
              <i class="checkMark"></i>{{sortOption.name}}
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </modal-wrapper>
</template>
<script>
import ModalWrapper from '../../../../components/modal/modalWrapper'
import EventBus from '../../../../eventBus'
export default {
  name: 'SortFilterModal',
  components: {
    ModalWrapper
  },
  props: ['show'],
  methods: {
    onSortClick (sortType) {
      EventBus.$emit('sortChange', sortType)
      this.$emit('closeSortModal')
      /* this.$store.dispatch('plp/updateSort', sortType) */
    },
    close () {
      this.$emit('closeSortModal')
    }
  }
}
</script>
<style lang="scss" scoped>
  .sortModal {
    position: fixed;
    width: 100%;
    background: #fff;
    bottom: 0;
  }
  .sort_heading {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: var(--primeGray);
    padding: 10px 0px;
    font-size: 0.9375rem;
    border-bottom: 1px solid var(--primebgColor);
  }
  .sort_options{
    & ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    & li {
      border-bottom: 1px solid var(--primebgColor);
      color: var(--primeColor);
      padding: 10px 0px;
      font-size: 0.9375rem;
      font-weight: 400;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .checkMark {
    display: block;
    width: 12px;
    height: 6px;
    border: 1px solid transparent;
    transform: rotate(-40deg);
    margin-right: 8px;
    margin-bottom: 2px;
  }
  .selected {
    & .checkMark {
      border-left-color: #C9A560;
      border-bottom-color: #C9A560;
    }
  }
  .sizeModal-enter-active, .sizeModal-leave-active {
    transition: transform .2s linear;
  }
  .sizeModal-enter, .sizeModal-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
</style>
