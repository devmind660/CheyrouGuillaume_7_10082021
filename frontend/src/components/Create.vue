<template>
  <form id="login"> <!--action="http://localhost:3000/api/posts/createPost" method="POST"-->
    <div class="inputfield">
      <label for="desc">Adresse email :</label>
      <input v-model="" type="text" id="desc" name="email" required />
    </div>
    <div class="inputfield">
      <button @click="create()" type="submit" class="btn" :class="{'button--disabled' : !validatedFields}">
        <!-- TODO : "button--disabled" = class bootstrap : trouver un schéma de remplacement -->
        <span v-if="status === 'loading'">Création du post...</span>
        <span v-else>Publier</span>
      </button>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'Create',
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