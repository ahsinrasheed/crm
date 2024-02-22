import { createStore } from 'vuex'

export default createStore({
  state: {
    drawer: false,
    isLoggedIn: !!localStorage.getItem('token'),
    type:true,
    imageData:''
  },
  getters: {
  },
  mutations: {
    stop(state){
      state.drawer = !state.drawer;
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    }
  },
  actions: {
    async login({ commit }, { userName, password }) {
      try {

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.userName === userName && user.password === password );

        if (user) {

          localStorage.setItem('token', "thisistoken");
          localStorage.setItem('loggedIn', JSON.stringify(user));
          commit('login');
          return Promise.resolve(); 

        } else {
          throw new Error('Invalid userName or password');
        }
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  modules: {
  }
})
