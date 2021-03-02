<template>
  <transition appear name="filter">
    <div class="filter_wrapper" v-show="$store.state.plp.showFilter">
      <div class="filters_header">
        <span class="global_icon filter_close_icon" @click="closeFilter"></span>
        <span class="filters_heading">Refine</span>
        <span class="filters_reset" @click="resetFilter">Reset</span>
      </div>
      <div class="filter_list">
        <ul class="filter_container">
          <li class="filter_type" :class="{tabActive: selectedTab === index}"
            v-for="(filterObj, index) in $store.state.plp.filters"
            :key="filterObj.index" v-if="filterObj.values.length">
            <div class="filter__name" @click="selectedTab = index">
              {{filterObj.display}}
            </div>
            <div class="filter__options" v-show="selectedTab === index">
              <div class="option_wrapper">
                <ul class="options_list">
                  <filter-option
                    v-for="(optionValue) in filterObj.values"
                    :key="optionValue.display.replace(/\s/g,'')"
                    :parentObj = "reduceObject(filterObj)"
                    :filterOption="optionValue"
                    :checked = "isChecked(optionValue.value, filterObj.filter_key, filterObj.filter_type)"
                  />
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="filter_footer" @click="closeFilter">
        Show {{$store.state.plp.count}} Results
      </div>
    </div>
  </transition>
</template>
<script>
import FilterOption from './microComponents/filterOption'
import EventBus from '../../../../eventBus'
export default {
  name: 'FilterList',
  components: {
    FilterOption
  },
  data () {
    return {
      selectedTab: 0
    }
  },
  methods: {
    resetFilter () {
      EventBus.$emit('clearFilter')
    },
    closeFilter () {
      this.$emit('closeFilter')
    },
    reduceObject (obj) {
      return {
        display: obj.display,
        filter_key: obj.filter_key, // categories.id
        filter_type: obj.filter_type, // and||or
        selection_type: obj.selection_type
      }
    },
    isChecked (value, key, type) {
      let checked = false
      const filterObj = this.$store.state.plp.filterObj
      if (Object.keys(filterObj).length) {
        const typeObject = filterObj[type] // ill get and||or object
        const keyObject = typeObject.find((obj) => { return obj[key] })
        if (keyObject) {
          const keyVal = keyObject[key]
          if (value['inq']) {
            const inqVal = value['inq']
            checked = !!keyVal['inq'].find((val) => { return val === inqVal })
          } else {
            checked = JSON.stringify(value) === JSON.stringify(keyVal)
          }
        }
      }

      return checked
    }
  }
}
</script>
<style lang="scss">
  @import '~assets/style/filters.scss';
  .filter-enter-active, .filter-leave-active {
    transition: transform .2s linear;
  }
  .filter-enter, .filter-leave-to {
    transition: transform .2s linear;
    transform: translateX(-100%);
    opacity: 0;
  }
</style>
