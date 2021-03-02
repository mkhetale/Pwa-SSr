const pageData = {
  foreignId: null,
  foreignType: '',
  metaData: {}
}

export default {
  namespaced: true,
  state: () => Object.assign({}, pageData),
  mutations: {
    updatePageMeta(state, data) {
      state.foreignId = data.foreign_id;
      state.foreignType = data.foreign_type;
      state.metaData = data.meta_data;
    }
  },
  actions: {
    updatePageMeta({commit}, data) {
      commit('updatePageMeta', data);
    }
  }
}