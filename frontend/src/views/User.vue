<template>
  <div class="user">
    <MainTitle title="Accès au forum" />
    <section class="wrapper wrapper__sm">
      <h2 v-if="display === 'login'">Connexion</h2>
      <h2 v-if="display === 'signup'">Inscription</h2>
      <div class="form">
        <div v-if="display === 'signup'" class="text-field">
          <label for="username">Utilisateur :</label>
          <input v-model="username" type="text" id="username" name="username" maxlength="36" required />
        </div>
        <div class="text-field">
          <label for="email">Adresse email :</label>
          <input v-model="email" type="email" id="email" name="email" maxlength="100" required />
        </div>
        <div class="text-field">
          <label for="password">Mot de passe :</label>
          <input v-model="password" type="password" id="password" name="password" maxlength="255" required />
        </div>
        <div v-if="display === 'signup'" class="text-field">
          <label for="confirm">Confirmation :</label>
          <input v-model="confirm" type="password" id="confirm" maxlength="255" required />
        </div>
        <div v-if="display === 'login'" class="text-field text-field__option">
          <p>Je n'ai pas de compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="setSignup">S'inscrire</a></p>
        </div>
        <div v-if="display === 'signup'" class="text-field text-field__option">
          <p>J'ai déjà un compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="setLogin">Se connecter</a></p>
        </div>
        <button v-if="display === 'login'" @click="login()" type="submit" class="btn btn__lg btn__info" :disabled="!validatedFields">
          <span v-if="status === 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>
        </button>
        <button v-if="display === 'signup'" @click="signup()" type="submit" class="btn btn__lg btn__info" :disabled="!validatedFields">
          <span v-if="status === 'loading'">Inscription en cours...</span>
          <span v-else>Inscription</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import MainTitle from "@/components/MainTitle";
import {mapState} from "vuex";

export default {
  name: 'User',
  data() {
    return {
      display: 'login',
      username: null,
      email: null,
      password: null,
      confirm: null
    }
  },
  components: { MainTitle },
  computed: {
    // Vérifie que les champs de saisie ne soient pas vides, et que les mots de passe correspondent
    validatedFields: function () {
      if (this.display === 'signup') {
        return this.username && this.email && this.password && this.password === this.confirm;
      } else {
        return this.email && this.password;
      }
    },
    ...mapState(["status"])
  },
  mounted() {
    // Renvoie l'user connecté sur la page de profil
    if (this.$store.state.user.userId !== -1) {
      this.$router.push('/profile');
    }
  },
  methods: {
    // Affichage de la page de connexion
    setLogin() {
      this.display = 'login'
    },
    // Affichage de la page d'inscription
    setSignup() {
      this.display = 'signup'
    },
    // Inscription
    signup () {
      const self = this;
      this.$store.dispatch('signup', {
        username: this.username,
        email: this.email,
        password: this.password,
      }).then(function () {
        self.login();
      }, function (err) {
        console.log(err);
      })
    },
    // Connection
    login() {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      }).then(function () {
        self.$router.push('/profile');
      }, function (err) {
        console.log(err);
      })
    }
  }
}
</script>