<template>
  <li class="filter_option">
    <label>
      <!-- :type="parentObj.selection_type === 'multiple' ? 'checkbox' : 'radio'" -->
      <input
        type="checkbox"
        :name="parentObj.display"
        @change="inputChecked"
        :checked="checked"
        class="option_input">
      <div class="option_color" :style="{backgroundColor:`#${filterOption.display}`}" v-if="isColorInput()"></div>
      <div class="option_checkbox" v-else></div>
      <span v-if="isColorInput()" class="filterText">
        {{filterOption.value.eq}}
      </span>
      <span v-else class="filterText">
        {{filterOption.display}}
      </span>
      <span class="filter-count">
        ({{filterOption.count}})
      </span>
    </label>
  </li>
</template>
<script>
import EventBus from '../../../../../eventBus'
export default {
  name: 'FilterOption',
  props: {
    parentObj: {
      type: Object,
      default () {
        return {}
      }
    },
    filterOption: {
      type: Object,
      default () {
        return {}
      }
    },
    checked: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    isColorInput () {
      return this.parentObj.display === 'Color'
    },
    inputChecked (e) {
      const obj = {
        key: this.parentObj.filter_key,
        type: this.parentObj.filter_type,
        selectType: this.parentObj.selection_type,
        value: this.filterOption.value,
        bool: e.target.checked
      }
      EventBus.$emit('inputChecked', obj)
      /* this.$store.dispatch('plp/inputChecked', obj) */
    }
  }
}
</script>
