<template>
  <div class="filterWrapper">
    <filter-list @closeFilter="closeFilter" v-if="$store.state.plp.fullFilterMode"></filter-list>
    <sort-filter-modal :show="$store.state.plp.showSortModal" @closeSortModal="closeSortModal"></sort-filter-modal>
    <div class="sort_refine">
        <button type="button" class="sort" @click="openSortModal">
          <span class="sort_refine_active"></span>Sort
        </button>
        <button type="button" class="refine" @click="openFilter" v-if="$store.state.plp.fullFilterMode">
          <span class="sort_refine_active" v-show="showFilterIcon"></span>Refine
        </button>
    </div>
  </div>
</template>
<script>
import SortFilterModal from './sortFilterModal'
/* import FilterList from './filters' */
export default {
  name: 'FilterWrapper',
  components: {
    SortFilterModal,
    FilterList: () => import(/* webpackChunkName: "filterList" */ './filters').then(m => m.default || m)
  },
  methods: {
    openSortModal () {
      this.$store.dispatch('plp/toogleSortModal', true)
    },
    closeSortModal () {
      this.$store.dispatch('plp/toogleSortModal', false)
    },
    openFilter () {
      this.$store.dispatch('plp/toogleFilter', true)
    },
    closeFilter () {
      this.$store.dispatch('plp/toogleFilter', false)
    }
  },
  computed: {
    showFilterIcon () {
      const filterObject = this.$store.state.plp.filterObj
      return Object.keys(filterObject).length
    }
  }
  /* watch: {
    '$store.state.plp.queryString' (val) {
      this.$router.push({query: val})
    }
  } */
}
</script>
<style lang="scss" scoped>
  .sort_refine{
    position: fixed;
    width: 260px;
    height: 40px;
    border-radius: 34px;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 20px;
    box-shadow: 0px 0px 5px 0px rgba(176,176,176,.4);
    background: #fff;
    display: flex;
    & > button {
      flex: 1;
      display: inline;
      line-height: 40px;
      margin: 0;
      padding: 0;
      background: transparent;
      border:none;
      &:nth-child(2){
        border-left: 2px solid #efefef;
      }
    }
  }
  .sort_refine_active {
    display: inline-block;
    width: 5px;
    height: 5px;
    background: var(--goldenColor);
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 5px;
  }
</style>
