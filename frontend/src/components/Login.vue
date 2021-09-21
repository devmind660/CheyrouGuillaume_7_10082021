<template>
  <form id="login" action="http://localhost:3000/api/auth/login" method="POST">
    <div class="inputfield">
      <label for="emailLogin">Adresse email :</label>
      <input v-model="email" type="email" id="emailLogin" name="email" required />
    </div>
    <div class="inputfield">
      <label for="passwordLogin">Mot de passe :</label>
      <input v-model="password" type="password" id="passwordLogin" name="password" required />
    </div>
    <div class="inputfield inputfield__link">
      <p>Je n'ai pas de compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="$emit('set-signup')">S'inscrire</a></p>
    </div>
    <div class="inputfield">
      <button @click="login()" type="submit" class="btn" :class="{'button--disabled' : !validatedFields}">
        <!-- TODO : "button--disabled" = class bootstrap : trouver un schéma de remplacement -->
        <span v-if="status === 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'Login',
  computed: {
    ...mapState(["status"]),

    validatedFields: function () {
      if (this.display === 'login') {
        return this.email !== "" && this.password !== "";
      }
      return false
    }
  },
  methods: {
    login: function () {
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
