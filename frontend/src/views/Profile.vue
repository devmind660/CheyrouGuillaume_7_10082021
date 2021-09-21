<template>
  <div class="profile">
    <section class="wrapper wrapper__sm">
      <h2>Mon profil</h2>
        <div class="inputfield">
          <label for="username">Utilisateur :</label>
          <input v-model="user.username" type="text" id="username" name="username" disabled /><br>
        </div>
        <div class="inputfield">
          <label for="email">Adresse email :</label>
          <input v-model="user.email" type="email" id="email" name="email" disabled />
        </div>
        <div class="inputfield">
          <label for="password">Adresse email :</label>
          <input v-model="user.password" type="password" id="password" name="email" disabled />
        </div>
        <div class="inputfield inputfield__link">
          <p>Gérer mon compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button">Modifier</a>&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="$emit('set-signup')">Supprimer</a></p>
        </div>
        <div class="inputfield">
          <input @click="logout()" type="submit" value="Déconnexion" class="btn">
        </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'Profile',
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/');
      return ;
    }
    this.$store.dispatch('getUserInfos');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    }
  }
}
</script>
