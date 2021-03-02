// import store from '../../store'
import service from '@/pages/plp/service'
const defaultState = {
  url: '',
  showSortModal: false,
  showFilter: false,
  fullFilterMode: true,
  queryParams: {},
  queryString: '',
  sortType: null,
  filterObj: {}, // this will contain the array of filter object
  searchAfter: null,
  productsList: [],
  filters: [],
  sorter: [],
  count: 0,
  scrollOver: false,
  scrollError: false,
  scrollProcessing: false
}
const plp = {
	namespaced: true,
	state: () => Object.assign({}, defaultState),
  mutations: {
    resetState (state, baseUrl) {
      state = Object.assign(state, defaultState, {url: baseUrl})
    },
    updateInitProductState (state, initProdData) {
      console.log('product mutation')
      state.sortType = state.sortType || initProdData.sorter[0].key
      state.productsList = initProdData.products
      state.filters = initProdData.filters
      state.searchAfter = initProdData.searchAfter
      state.sorter = initProdData.sorter
      state.count = initProdData.count
      state.scrollOver = false
      state.scrollError = false
      state.scrollProcessing = false
    },
    toggleFullFilterMode (state, bool) {
      state.fullFilterMode = bool
    },
    updateNextProdList (state, newProdInfo) {
      state.productsList = [...state.productsList, ...newProdInfo.products]
      state.searchAfter = newProdInfo.searchAfter
    },
    toogleSortModal (state, boolValue) {
      state.showSortModal = boolValue
    },
    toogleFilter (state, boolValue) {
      state.showFilter = boolValue
    },
    updateSort (state, sortValue) {
      state.sortType = sortValue
      state.queryParams = formQueryParam(state)
      /* state.queryString = formQueryString(state) */
    },
    updateFilterObj (state, obj) {
      state.filterObj = obj
      state.queryParams = formQueryParam(state)
      /* state.queryString = formQueryString(state) */
    },
    updateScrollOver (state, bool) {
      state.scrollOver = bool
    },
    updateScrollError (state, bool) {
      state.scrollError = bool
    }
  },
  actions: {
    resetState ({commit, state}, baseUrl) {
      commit('resetState', baseUrl)
    },
    toggleFullFilterMode ({commit}, bool) {
      commit('toggleFullFilterMode', bool)
    },
    updateInitProductState ({commit}, initProdData) {
      console.log('product action')
      commit('updateInitProductState', initProdData)
    },
    updateNextProdList ({commit}, prodData) {
      commit('updateNextProdList', prodData)
    },
    toogleSortModal ({commit}, boolValue) {
      commit('toogleSortModal', boolValue)
    },
    toogleFilter ({commit}, boolValue) {
      commit('toogleFilter', boolValue)
    },
    updateSort ({commit}, sortValue) {
      commit('updateSort', sortValue)
    },
    inputChecked ({commit, state}, obj) {
      commit('updateFilterObj', generateFilterObj(state, obj))
    },
    updateScrollOver ({commit}, bool) {
      commit('updateScrollOver', bool)
    },
    updateScrollError ({commit}, bool) {
      commit('updateScrollError', bool)
    },
    onRouteChange ({commit}, queryObj) {
      if (Object.keys(queryObj).length) {
        for (let key in queryObj) {
          switch (key) {
            case 'filter': commit('updateFilterObj', JSON.parse(queryObj[key]))
              break
            case 'sort': commit('updateSort', queryObj[key])
          }
        }
      } else {
        commit('updateFilterObj', {})
        commit('updateSort', null)
      }
    },
    async getInitProducts ({commit, state, dispatch}) {
      try {
        const responseData = await service.getProductsList(state.url, state.queryParams)
        const productData = responseData.data
        const initProdData = {
          products: productData.data,
          filters: productData.meta.filters,
          sorter: productData.meta.sorter,
          searchAfter: productData.meta.search_after,
          count: productData.meta.count
        }
        dispatch('updateInitProductState', initProdData)
      } catch (error) {
        console.log(error)
      }
    },
    async getNextSetProducts ({commit, state, dispatch}) {
      return new Promise((resolve, reject) => {
        const params = Object.assign({}, state.queryParams, {search_after: state.searchAfter, aggs: false})
        service.getProductsList(state.url, params)
          .then((responseData) => {
            const productData = responseData.data
            const ProdData = {
              products: productData.data,
              searchAfter: productData.meta.search_after,
              count: productData.meta.count
            }
            dispatch('updateNextProdList', ProdData)
            resolve(ProdData.products.length)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}

function generateFilterObj (state, obj) {
  const {type, selectType} = obj
  const filterObj = Object.assign({}, state.filterObj)
  filterObj[type] = filterObj[type] || []
  switch (selectType) {
    case 'multiple' : handleMultipleType(filterObj, obj)
      break
    case 'single' : handleSingleType(filterObj, obj)
      break
  }
  return filterObj
}

function handleMultipleType (filterObj, obj) {
  const {value} = obj
  if (value['inq']) {
    inqType(filterObj, obj)
  } else {
    regularValue(filterObj, obj)
  }
}
/* {"and":[{"color.name":{"eq":"Black"}},{"categories.id":{"inq":[107,108]}}]}
    type: and || or
    key: color.name || categories.id
*/
function inqType (filterObj, obj) {
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
}
function regularValue (filterObj, obj) {
  const {key, type, value, bool} = obj
  if (bool) {
    filterObj[type].push({[key]: value})
  } else {
    filterObj[type] = filterObj[type].filter((fObj) => {
      return JSON.stringify(fObj) !== JSON.stringify({[key]: value})
    })
  }
}

function handleSingleType (filterObj, obj) {
  const {key, type, value} = obj
  const index = filterObj[type].findIndex((fObj) => {
    return fObj[key]
  })
  if (index !== -1) {
    filterObj[type][index] = {[key]: value}
  } else {
    filterObj[type].push({[key]: value})
  }
}

function formQueryParam (state) {
  const {filterObj, sortType} = state
  const queryParam = {}
  if (Object.keys(filterObj).length) {
    queryParam.filter = filterObj
  }
  if (sortType) {
    queryParam.sort = sortType
  }

  return queryParam
}
function formQueryString (state) {
  const {filterObj, sortType} = state
  const queryParam = {}
  if (Object.keys(filterObj).length) {
    queryParam.filter = JSON.stringify(filterObj)
  }
  if (sortType) {
    queryParam.sort = sortType
  }

  return queryParam
}
export default plp
/* function segreateFilterObj (state, obj) {
  if (obj.select_type === 'multiple') {
    handleMultipleType(state, obj)
  } else {
    handleSingleType(state, obj)
  }
}

function handleMultipleType (state, obj) {
  const {key, type, value, bool} = obj
  if (bool) {
    state.filterObj = [...state.filterObj, {key, type, value}]
  } else {
    state.filterObj = state.filterObj.filter((obj) => {
      return JSON.stringify(obj.value) !== JSON.stringify(value)
    })
  }
}

function handleSingleType (state, obj) {
  const {type, key, value} = obj;
  const i = state.filterObj.findIndex((obj) => {
    return obj.key === key
  })
  if (i !== -1) {
    state.filterObj[i] = {type, key, value}
  } else {
    state.filterObj = [...state.filterObj, {key, type, value}]
  }
} */
