<template>
  <div class="user">
    <Banner title="Accès au forum" />
    <section class="wrapper wrapper__sm">
      <h2 v-if="display === 'signup'">Connexion<small @click="setLogin"> / Inscription</small></h2>
      <h2 v-if="display === 'login'"><small @click="setSignup">Connexion / </small>Inscription</h2>
      <Signup v-if="display === 'signup'" />
      <Login v-if="display === 'login'" />
    </section>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import Signup from "@/components/Login";
import Login from "@/components/Signup";
import {mapState} from "vuex";

export default {
  name: 'User',
  data() {
    return {
      display: 'login',
    }
  },
  components: {
    Banner, Signup, Login
  },
  mounted: function () {
    if (this.$store.state.user.userId !== -1) {
      this.$router.push('/profile');
    }
  },
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    setLogin() {
      this.display = 'login'
    },
    setSignup() {
      this.display = 'signup'
    },
  }
}
</script>

<style lang="scss">
@import "../assets/styles/utils";

.wrapper__sm {
  max-width: 400px;
}
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

  form, div#profile, ul {
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
        flex-direction: column;
        align-items: flex-start;
      }

      label {
        margin-right: 10px;
        width: 200px;
        @media (max-width: 420px) {
          margin-bottom: 5px;
        }
      }
      input {
        font-size: 1rem;
        outline: none;
        border-radius: 3px;
        padding: 8px 10px;
        width: 100%;
        transition: all 0.3s ease;
      }
      input[required] {
        border: 1px solid $primary;
        &:focus {
          border: 1px solid silver;
        }
      }
      input[disabled] {
        background-color: ghostwhite;
        border: 1px solid lightgray;
      }
    }
    .inputfield__link p {
      margin-left: auto;
      a:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
