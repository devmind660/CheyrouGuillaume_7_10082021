<template>
  <div class="profile">
    <section class="wrapper wrapper__sm">
      <h2>Mon profil</h2>
      <div class="form">
        <div v-if="display !== 'modify'" class="inputfield">
          <p>Création du compte :</p>
        </div>
        <div v-if="display !== 'modify'" class="inputfield">
          <label for="username">Utilisateur :</label>
          <input type="text" id="username" name="username" disabled/>
        </div>
        <div v-if="display !== 'modify'" class="inputfield">
          <label for="email">Adresse email :</label>
          <input type="email" id="email" name="email" disabled />
        </div>
        <div v-if="display === 'modify'" class="inputfield">
          <label for="password">Mot de passe :</label>
          <input v-model="password" type="password" id="password" name="password" maxlength="255" :required="display === 'modify'" :disabled="display !== 'modify'" />
        </div>
        <div v-if="display === 'modify'" class="inputfield">
          <label for="confirm">Confirmation :</label>
          <input v-model="confirm" type="password" id="confirm" maxlength="255" :required="display === 'modify'" :disabled="display !== 'modify'" />
        </div>
        <div class="inputfield inputfield__option">
          <p v-if="display === 'read'">Gérer mon compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="setModify">Modifier</a>&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="setDelete">Supprimer</a></p>
          <p v-if="display === 'modify'">Modifier mon compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="setRead">Annuler</a></p>
          <p v-if="display === 'delete'">Supprimer mon compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="setRead">Annuler</a></p>
        </div>
        <div class="inputfield">
          <button v-if="display === 'read'" @click="logout()" class="btn btn__lg btn__danger">Déconnexion</button>
          <button v-if="display === 'modify'" @click="setRead()" type="submit" class="btn btn__lg btn__success" :disabled="!validatedFields">Enregistrer</button>
          <button v-if="display === 'delete'" class="btn btn__lg btn__danger">Supprimer</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'Profile',
  data() {
    return {
      display: 'read',
      username: '',
      email: '',
      password: '',
      confirm: ''
    }
  },
  computed: {
    validatedFields: function () {
      return this.password !== "" && this.password === this.confirm;
    },
    ...mapState({
      user: 'userInfos',
    })
  },
  mounted() {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/');
      return ;
    }
    this.$store.dispatch('showProfile');
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    setRead() {
      this.display = 'read'
    },
    setModify() {
      this.display = 'modify'
    },
    setDelete() {
      this.display = 'delete'
    }
  }
}
</script>