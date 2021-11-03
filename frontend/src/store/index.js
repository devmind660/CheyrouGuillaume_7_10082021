import { createStore } from 'vuex'
// Import du package axios
const axios = require('axios');
// Définition d'une base URL pour les requêtes axios
const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

// Enregistrement de l'objet user dans le localStorage pour avoir accès à ses propriétés
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
  // Définition des états status, user et userInfos
  state: {
    status: '',
    // user est défini plus haut
    user: user,
    userInfos: {
      username: '',
      email: '',
      password: '',
    }
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    // Lors de la connexion, création du token et de user dans la localStorage, le status est alors user
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    // Permet de basculer sur l'état userInfos
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    // Lors de la déconnexion, user est supprimé du localstorage
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    }
  },
  actions: {
    // Connexion
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
    // Inscription
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
    // Affichage du profil
    showProfile: ({commit}) => {
      instance.get('/api/user/')
          .then(function (response) {
            commit('userInfos', response.data);
          })
          .catch(err => console.log(err.message))
    },
  },
})
