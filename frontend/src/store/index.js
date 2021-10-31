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
    isAdmin: 0
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
      isAdmin: 0
    };
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
        instance.post('api/user/login', userInfos)
            .then(function (res) {
              commit('setStatus', '');
              commit('logUser', res.data);
              resolve(res);
            })
            .catch(function (err) {
              commit('setStatus', 'error_login');
              reject(err);
            });
      });
    },
    signup: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.post('api/user/signup', userInfos)
            .then(function (res) {
              commit('setStatus', 'success_signup');
              resolve(res);
            })
            .catch(function (err) {
              commit('setStatus', 'error_signup');
              reject(err);
            });
      });
    },
    showProfile: ({commit}) => {
      instance.get('/api/user/')
          .then(function (response) {
            commit('userInfos', response.data);
          })
          .catch(err => console.log(err.message))
    },
  },
  modules: {
  }
})
