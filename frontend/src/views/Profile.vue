<template>
  <div class="profile">
    <MainTitle title="Mes informations"></MainTitle>
    <section class="wrapper wrapper__sm">
      <h2>Profil</h2>
      <div class="form">
        <div class="text-field">
          <p>Nom d'utilisateur : {{ this.$store.state.userInfos.username }}</p>
        </div>
        <div class="text-field">
          <p>Adresse email : {{ this.$store.state.userInfos.email }}</p>
        </div>
        <div class="text-field">
          <p>Inscrit le : {{ this.$store.state.userInfos.user_date }}</p>
        </div>
        <div class="text-field">
          <p v-if="this.$store.state.userInfos.admin_rights === 1">Privilèges du compte : Administrateur</p>
          <p v-else>Privilèges du compte : Membre</p>
        </div>
        <div class="text-field text-field__option">
          <p v-if="!deleteConfirm">Gérer mon compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="setDelete">Supprimer</a></p>
          <p v-if="deleteConfirm">Supprimer mon compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="setRead">Annuler</a></p>
        </div>
        <button v-if="!deleteConfirm" @click="logout()" class="btn btn__lg btn__danger">Déconnexion</button>
        <button v-if="deleteConfirm" @click="deleteUser(this.$store.state.user.userId)" class="btn btn__lg btn__danger">Supprimer</button>
      </div>
    </section>
  </div>
</template>

<script>
import MainTitle from "@/components/MainTitle";
import { mapState } from "vuex"
import axios from "axios";

export default {
  name: 'Profile',
  components: { MainTitle },
  data() {
    return {
      deleteConfirm: false,
    }
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  mounted() {
    // Renvoie l'user non connecté sur la page de connexion
    if (!this.$store.state.user.token) {
      this.$router.push('/');
      return ;
    }
    // Affichage du profil
    this.$store.dispatch('showProfile');
  },
  methods: {
    // Déconnexion
    logout() {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    // Suppression de l'user via son id
    deleteUser(id) {
      axios.delete('http://localhost:3000/api/user/' + id)
          .then(() => this.logout())
    },
    setRead() {
      this.deleteConfirm = false
    },
    // Affichage de la confirmation de suppression du compte
    setDelete() {
      this.deleteConfirm = true
    }
  }
}
</script>