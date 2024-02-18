import { createStore } from 'vuex'

export default createStore({
  state: {
    drawer: false,
    isLoggedIn: !!localStorage.getItem('token'),
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
      localStorage.removeItem('token'); // Clear token from localStorage upon logout
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const response = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token); // Store token in localStorage upon successful login
          commit('login');
        } else {
          throw new Error(data.message);
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
