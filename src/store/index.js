import { createStore } from 'vuex'

export default createStore({
  state: {
    drawer: false,
  },
  getters: {
  },
  mutations: {
    stop(state){
      state.drawer = !state.drawer;
    },
  },
  actions: {
  },
  modules: {
  }
})
