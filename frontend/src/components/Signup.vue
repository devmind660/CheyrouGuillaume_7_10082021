<template>
  <div id="signup"> <!--action="http://localhost:3000/api/auth/signup" method="POST"-->
    <div class="inputfield">
      <label for="usernameSignup">Utilisateur :</label>
      <input v-model="username" type="text" id="usernameSignup" name="username" required />
    </div>
    <div class="inputfield">
      <label for="emailSignup">Adresse email :</label>
      <input v-model="email" type="email" id="emailSignup" name="email" required />
    </div>
    <div class="inputfield">
      <label for="passwordSignup">Mot de passe :</label>
      <input v-model="password" type="password" id="passwordSignup" name="password" required /><br>
    </div>
    <div class="inputfield inputfield__link">
      <p>J'ai déjà un compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="$emit('set-login')">Se connecter</a></p>
    </div>
    <div class="inputfield">
      <button @click="signup()" type="submit" class="btn" :disabled="!validatedFields">
        <span v-if="status === 'loading'">Inscription en cours...</span>
        <span v-else>Inscription</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'Signup',
  data: function () {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  computed: {
    validatedFields: function () {
      return this.username !== "" && this.email !== "" && this.password !== "";
    },
    ...mapState(["status"])
  },
  methods: {
    signup: function () {
      const self = this;
      this.$store.dispatch('signup', {
        username: this.username,
        email: this.email,
        password: this.password,
      }).then(function () {
        self.login();
      }, function (error) {
        console.log(error);
      })
    },
    login() {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      }).then(function () {
        self.$router.push('/profile');
      }, function (error) {
        console.log(error);
      })
    }
  }
}
</script>
