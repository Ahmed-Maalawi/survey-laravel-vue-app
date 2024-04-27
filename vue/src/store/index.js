import {createStore} from "vuex";
import axiosClient from "../axios.js";
import {resolveTransitionHooks} from "vue";

const tempSurveys = [
  {
    id: 100,
    title: "testing new survey",
    slug: "testing-new-survey",
    status: "draft",
    image: "https://img.freepik.com/free-photo/3d-illustration-pen-putting-blue-ticks-paper_107791-15675.jpg?w=1060&t=st=1712102344~exp=1712102944~hmac=363f76fbee4da9a9bdd8a8a892010f636ddfb131f9003e870d53433075e4cea4",
    description: "testing new description for survey",
    created_at: "2024-03-30 18:00:00",
    updated_at: "2024-03-30 18:00:00",
    question: [
      {
        id: 1,
        type: "select",
        question: "first question",
        description: null,
        data: {
          options: [
            {
              uuid: "asdf34-23sadf23-lkaj345klj",
              text: "answer1"
            }, {
              uuid: "asdf34-23sadf23-lkcj345klj",
              text: "answer2"
            }, {
              uuid: "asdf34-23sadf23-lkkj345klj",
              text: "answer3"
            }, {
              uuid: "asdf34-23sadf23-lkj3k45klj",
              text: "answer4"
            },
          ]
        }
      }
    ]
  }, {
    id: 149,
    title: "testing new survey",
    slug: "testing-new-survey",
    status: "draft",
    image: "https://img.freepik.com/free-photo/3d-illustration-pen-putting-blue-ticks-paper_107791-15675.jpg?w=1060&t=st=1712102344~exp=1712102944~hmac=363f76fbee4da9a9bdd8a8a892010f636ddfb131f9003e870d53433075e4cea4",
    description: "testing new description for survey",
    created_at: "2024-03-30 18:00:00",
    updated_at: "2024-03-30 18:00:00",
    question: [
      {
        id: 6,
        type: "select",
        question: "first question",
        description: null,
        data: {
          options: [
            {
              uuid: "asdf34-23sadf23-lkj3w45klj",
              text: "answer1"
            }, {
              uuid: "asdf34-23sadf23-lkjw345klj",
              text: "answer2"
            }, {
              uuid: "asdf34-23sadf23-lkjf345klj",
              text: "answer3"
            }, {
              uuid: "asdf34-23sadf23-lkjv345klj",
              text: "answer4"
            },
          ]
        }
      }
    ]
  }, {
    id: 234,
    title: "testing new survey",
    slug: "testing-new-survey",
    status: "draft",
    image: "https://img.freepik.com/free-photo/3d-illustration-pen-putting-blue-ticks-paper_107791-15675.jpg?w=1060&t=st=1712102344~exp=1712102944~hmac=363f76fbee4da9a9bdd8a8a892010f636ddfb131f9003e870d53433075e4cea4",
    description: "testing new description for survey",
    created_at: "2024-03-30 18:00:00",
    updated_at: "2024-03-30 18:00:00",
    question: [
      {
        id: 2,
        type: "select",
        question: "first question",
        description: null,
        data: {
          options: [
            {
              uuid: "asdf34-23sadf2f3-lkj34q5klj",
              text: "answer1"
            }, {
              uuid: "asdf34-23sadf2a3-lkj34w5klj",
              text: "answer2"
            }, {
              uuid: "asdf34-23sadf2d3-lkj34s5klj",
              text: "answer3"
            }, {
              uuid: "asdf34-23sadf23g-lkj345klj",
              text: "answer4"
            },
          ]
        }
      }
    ]
  }
]


const store = createStore({
  state: {

    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },

    surveys: [...tempSurveys],
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],

  },
  getters: {},
  actions: {
    saveSurvey( { commit }, survey) {
      let response;
      if (survey.id) {
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit("updateSurvey", res.data);
            return res;
          });
      } else {
        response = axiosClient
          .post(`/survey`, survey)
          .then((res) => {
            commit("updateSurvey", res.data);
            return res;
          });
      }
    },
    register({ commit }, user) {
      // return axiosClient.post('/register', user)
      //   .then(({data}) => {
      //     commit('setUser', data.user);
      //     commit('setToken', data.token)
      //     return data;
      //   });
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
      //   .then(({data}) => {
      //     commit('setUser', data.user);
      //     commit('setToken', data.token)
      //     return data;
      //   })
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
    },

    logout({commit}, user) {
      // return axiosClient.post('/logout')
      //   .then(response => {
      //     commit('logout');
      //     return response;
      //   });
      return fetch('http://survey-app.test/api/login', {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      })
        .then(res => {
          commit('logout');
          return res;
        });
    },

    getUser({commit}) {
      return axiosClient.get('/user')
        .then(res => {
          console.log(res);
          commit('setUser', res.data)
        })
    }
  },
  mutations: {
    saveSurvey: (state, survey) => {
      state.surveys = [...state.surveys, survey.data]
    },
    updateSurvey: (state, survey) => {
      state.surveys = state.surveys.map((s) => {
        if (s.id == survey.data.id) {
          return survey.data;
        }
        return s;
      });
    },
    logout: (state) => {
      state.user.token = null;
      state.user.data = [];
      sessionStorage.clear();
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
