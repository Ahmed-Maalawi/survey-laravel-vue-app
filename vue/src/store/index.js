import {createStore} from "vuex";
import axiosClient from "../axios.js";

const store = createStore({
  state: {
    user: {
      data: {
        name: 'ahmed',
        email: "ahmed@gmail.com",
        imageUrl: 'https:images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixi'
      },
      token: sessionStorage.getItem('TOKEN'),
    }
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      // return axiosClient.post('/register', user)
      return fetch('http://survey-app.test/api/register', {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => {
          commit("setUser", res);
          return res;
        })
    },

    login({commit}, user) {

      // return axiosClient.post('/login', user)
      return fetch('http://survey-app.test/api/login', {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => {
          commit('setUser', res);
          return res;
        });
    }
  },
  mutations: {
    logout: (state) => {
      state.user.token = null
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules: {}
})

export default store;
