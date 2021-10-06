import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };q
  }
}

export default createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      username: '',
      email: '',
      password: '',
    }
  },
  getters: {
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    }
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('api/auth/login', userInfos)
            .then(function (response) {
              commit('setStatus', '');
              commit('logUser', response.data);
              resolve(response);
            })
            .catch(function (error) {
              commit('setStatus', 'error_login');
              reject(error);
            });
      });
    },
    signup: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.post('api/auth/signup', userInfos)
            .then(function (response) {
              commit('setStatus', 'success_signup');
              resolve(response);
            })
            .catch(function (error) {
              commit('setStatus', 'error_signup');
              reject(error);
            });
      });
    },
    getUserInfos: ({commit}) => {
      instance.post('api/auth/infos')
          .then(function (response) {
            commit('userInfos', response.data.result[0]);
          })
          .catch(function () {
          });
    }
  },
  modules: {
  }
})
