const defaults = {
  headerClass: 'header_withSearch',
  menuToggle: false,
}

export default {
  state: () => Object.assign({}, defaults),
  mutations: {
    updateHeaderClass(state, newHeaderClass) {
      state.headerClass = newHeaderClass
    },
    toogleMenu(state, boolValue) {
      state.menuToggle = boolValue
    }
  },
  actions: {
    updateHeaderClass({ commit }, newHeaderClass) {
      commit('updateHeaderClass', newHeaderClass)
    },
    toogleMenu({ commit }, boolValue) {
      commit('toogleMenu', boolValue)
    }
  }
}