<template>
  <div class="user">
    <Banner title="Accès au forum" />
    <section class="wrapper wrapper__sm">
      <h2 v-if="display === 'login'">Connexion</h2>
      <h2 v-if="display === 'signup'">Inscription</h2>
      <div class="form">
        <div v-if="display === 'signup'" class="inputfield">
          <label for="username">Utilisateur :</label>
          <input v-model="username" type="text" id="username" name="username" maxlength="36" required />
        </div>
        <div class="inputfield">
          <label for="email">Adresse email :</label>
          <input v-model="email" type="email" id="email" name="email" maxlength="100" required />
        </div>
        <div class="inputfield">
          <label for="password">Mot de passe :</label>
          <input v-model="password" type="password" id="password" name="password" maxlength="255" required />
        </div>
        <div v-if="display === 'signup'" class="inputfield">
          <label for="confirm">Confirmation :</label>
          <input v-model="confirm" type="password" id="confirm" maxlength="255" required />
        </div>
        <div v-if="display === 'login'" class="inputfield inputfield__option">
          <p>Je n'ai pas de compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="setSignup">S'inscrire</a></p>
        </div>
        <div v-if="display === 'signup'" class="inputfield inputfield__option">
          <p>J'ai déjà un compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="setLogin">Se connecter</a></p>
        </div>
        <div class="inputfield">
          <button v-if="display === 'login'" @click="login()" type="submit" class="btn btn__lg btn__info" :disabled="!validatedFields">
            <span v-if="status === 'loading'">Connexion en cours...</span>
            <span v-else>Connexion</span>
          </button>
          <button v-if="display === 'signup'" @click="signup()" type="submit" class="btn btn__lg btn__info" :disabled="!validatedFields">
            <span v-if="status === 'loading'">Inscription en cours...</span>
            <span v-else>Inscription</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import {mapState} from "vuex";

export default {
  name: 'User',
  data() {
    return {
      display: 'login',
      username: '',
      email: '',
      password: '',
      confirm: ''
    }
  },
  components: { Banner },
  computed: {
    validatedFields: function () {
      if (this.display === 'signup') {
        return this.username !== "" && this.email !== "" && this.password !== "" && this.password === this.confirm;
      } else {
        return this.email !== "" && this.password !== "";
      }
    },
    ...mapState(["status"])
  },
  mounted() {
    if (this.$store.state.user.userId !== -1) {
      this.$router.push('/profile');
    }
  },
  methods: {
    setLogin() {
      this.display = 'login'
    },
    setSignup() {
      this.display = 'signup'
    },
    signup: function () {
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

<style lang="scss">
@import "../assets/styles/utils";

.wrapper {
  @include white-bloc;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 25px;
    color: $primary;
    text-transform: uppercase;
    text-align: center;
    margin-top: 0;

    small {
      color: silver;
      cursor: pointer;
    }
  }

  div.form, article, ul {
    width: 100%;

    .inputfield {
      color: $primary;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
      @media (max-width: 420px) {
        flex-wrap: wrap;
      }
      &__option p {
        margin-left: auto;

        a:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
      label {
        min-width: 120px;
        @media (max-width: 420px) {
          margin-bottom: 5px;
        }
      }
      input, textarea {
        font-size: 1rem;
        outline: none;
        border-radius: 3px;
        padding: 8px 10px;
        width: 100%;
        transition: all 0.3s ease;
        &[required] {
          border: 1px solid $primary;
          &:focus {
            border: 1px solid silver;
          }
        }
        &[disabled] {
          background-color: ghostwhite;
          border: 1px solid lightgray;
        }
      }
    }
  }
}
</style>