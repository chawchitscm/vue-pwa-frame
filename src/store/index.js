import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUserData(state, userData) {
      state.user = userData;
    },
    setUserName(state, userData) {
      state.user.name = userData.name;
    }
  },
  actions: {
    login({ commit }, credentials) {
      return axios.post("/auth/login", credentials).then(({ data }) => {
        commit("setUserData", data);
      });
    },
    logout({ commit }, credentials) {
      return axios.post("/auth/logout", credentials).then(() => {
        commit("setUserData", null);
      });
    },
    updateProfile({ commit }, data) {
      commit("setUserName", data);
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    userId: (state) => {
      if (state.user && state.user.id) {
        return state.user.id;
      }
    },
    userName: (state) => {
      if (state.user && state.user.name) {
        return state.user.name;
      }
    },
    userEmail: (state) => {
      if (state.user && state.user.email) {
        return state.user.email;
      }
    },
  },
  plugins: [createPersistedState()],
});
