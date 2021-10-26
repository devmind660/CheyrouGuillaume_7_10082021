<template>
  <div class="profile">
    <MainTitle title="Mes informations"></MainTitle>
    <section class="wrapper wrapper__sm">
      <h2>Profil</h2>
      <div class="form">
        <div class="text-field">
          <p>Nom d'utilisateur : {{ userProfile.username }}</p>
        </div>
        <div class="text-field">
          <p>Adresse email : {{ userProfile.email }}</p>
        </div>
        <div class="text-field">
          <p>Date de création : {{ userProfile.creation_date }}</p>
        </div>
        <div class="text-field text-field__option">
          <p v-if="!deleteConfirm">Gérer mon compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="setDelete">Supprimer</a></p>
          <p v-if="deleteConfirm">Supprimer mon compte&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="setRead">Annuler</a></p>
        </div>
        <button v-if="!deleteConfirm" @click="logout()" class="btn btn__lg btn__danger">Déconnexion</button>
        <button v-if="deleteConfirm" @click="deleteUser(user.id)" class="btn btn__lg btn__danger">Supprimer</button>
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
      userProfile: {}
    }
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  mounted() {
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/');
      return ;
    }
/*
    axios.get('http://localhost:3000/api/user/:', {
      params: { user: userProfile.username }
    })
        .then(res => this.user = res.data)
*/
    this.$store.dispatch('showProfile');
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    deleteUser(id) {
      axios.delete('http://localhost:3000/api/user/:' + id)
          .then(() => this.$router.push('/'))
    },
    setRead() {
      this.deleteConfirm = false
    },
    setDelete() {
      this.deleteConfirm = true
    }
  }
}
</script>