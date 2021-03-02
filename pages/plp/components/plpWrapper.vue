<template>
  <div>
    <product-list></product-list>
    <filter-wrapper></filter-wrapper>
  </div>
</template>
<script>
import ProductList from './productList/productList'
import FilterWrapper from './filterComponent'
import EventBus from '../../../eventBus'
export default {
  name: 'PLPWrapper',
  data () {
    return {
      filterObj: this.$store.state.plp.filterObj,
      sort: '',
      queryParam: {}
    }
  },
  components: {
    ProductList,
    FilterWrapper
  },
  mounted () {
    EventBus.$on('inputChecked', this.handleInputEvent)
    EventBus.$on('sortChange', this.handleSortChange)
    EventBus.$on('clearFilter', this.clearFilter)
    console.log(this.filterObj)
    console.log(this.$store.state.plp.filterObj)
  },
  methods: {
    clearFilter () {
      this.filterObj = {}
      this.sort = ''
      this.changeRoute(this.getqueryObject())
    },
    handleInputEvent (obj) {
      this.filterObj = this.generateFilterObj(obj)
      this.changeRoute(this.getqueryObject())
    },
    handleSortChange (val) {
      this.sort = val
      this.changeRoute(this.getqueryObject())
    },
    generateFilterObj (obj) {
      const {type, selectType} = obj
      const filterObj = Object.assign({}, this.filterObj)
      filterObj[type] = filterObj[type] || []
      switch (selectType) {
        case 'multiple' : this.handleMultipleType(filterObj, obj)
          break
        case 'single' : this.handleSingleType(filterObj, obj)
          break
      }
      if (!filterObj[type].length) {
        delete filterObj[type]
      }
      return filterObj
    },
    handleMultipleType (filterObj, obj) {
      const {value} = obj
      if (value['inq']) {
        this.inqType(filterObj, obj)
      } else {
        this.regularValue(filterObj, obj)
      }
    },
    inqType (filterObj, obj) {
      const {key, type, value, bool} = obj
      let inqObj = filterObj[type].find((fObj) => {
        return fObj[key]
      })
      if (!inqObj) {
        inqObj = {[key]: {'inq': []}}
        filterObj[type].push(inqObj)
      }
      if (bool) {
        inqObj[key]['inq'].push(value['inq'])
      } else {
        inqObj[key]['inq'] = inqObj[key]['inq'].filter((inqVal) => {
          return inqVal !== value['inq']
        })
      }
      if (!inqObj[key]['inq'].length) {
        filterObj[type] = filterObj[type].filter((obj) => { return !obj[key] })
      }
    },
    regularValue (filterObj, obj) {
      const {key, type, value, bool} = obj
      if (bool) {
        filterObj[type].push({[key]: value})
      } else {
        filterObj[type] = filterObj[type].filter((fObj) => {
          return JSON.stringify(fObj) !== JSON.stringify({[key]: value})
        })
      }
    },
    handleSingleType (filterObj, obj) {
      const {key, type, value, bool} = obj
      const index = filterObj[type].findIndex((fObj) => {
        return fObj[key]
      })
      if (bool) {
        if (index !== -1) {
          filterObj[type][index] = {[key]: value}
        } else {
          filterObj[type].push({[key]: value})
        }
      } else {
        filterObj[type].splice(index, 1)
      }
    },
    getqueryObject () {
      const {filterObj, sort} = this.$data
      const queryParam = {}
      if (Object.keys(filterObj).length !== 0 && filterObj.constructor === Object) {
        queryParam.filter = filterObj
      }
      if (sort !== '') {
        queryParam.sort = sort
      }

      return queryParam
    },
    changeRoute (queryObject) {
      const queryString = {}
      for (let prop in queryObject) {
        if (queryObject.hasOwnProperty(prop)) {
          if (queryObject[prop] && typeof queryObject[prop] === 'object' && queryObject.constructor === Object) {
            queryString[prop] = JSON.stringify(queryObject[prop])
          } else {
            queryString[prop] = queryObject[prop]
          }
        }
      }
      this.$router.push({query: queryString})
    }
  },
  computed: {
    /* queryParms () {
      const {filterObj} = this.$data
      const queryParam = {}
      if (Object.keys(filterObj).length !== 0 && filterObj.constructor === Object) {
        queryParam.filter = filterObj
      }

      return queryParam
    } */
  },
  watch: {
    /* queryParms (val) {
      const queryString = {}
      for (let prop in val) {
        if (val.hasOwnProperty(prop)) {
          if (val[prop] && typeof val[prop] === 'object' && val.constructor === Object) {
            queryString[prop] = JSON.stringify(val[prop])
          }
        }
      }
      this.$router.push({query: queryString})
    }, */
    '$store.state.plp.filterObj' (val) {
      this.filterObj = val
    }
  }
}
/* {"and":[{"color.name":{"eq":"Black"}},{"categories.id":{"inq":[107,108]}}]}
    type: and || or
    key: color.name || categories.id
*/
</script>
