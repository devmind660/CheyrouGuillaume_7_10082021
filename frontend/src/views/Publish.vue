<template>
  <div class="publish">
    <MainTitle title="Publier un GIF" />
    <section class="wrapper wrapper__sm">
      <h2>Publication</h2>
      <div class="form">
        <div id="url-field" class="text-field">
          <div v-if="url && validUrl === null" class="info"><i title="Vérification de l'URL en cours…" class="fas fa-spinner"></i></div>
          <div v-if="validUrl === false" class="error"><i @click="url = null; validUrl = null" title="URL invalide | Effacer la saisie" class="fas fa-unlink"></i></div>
          <div v-if="url && validUrl === true" class="success"><i @click="url = null; validUrl = null" title="URL valide | Effacer la saisie" class="fas fa-link"></i></div>
          <label for="url">URL du GIF :</label>
          <input v-model="url" @input="checkUrl()" type="text" id="url" name="url" placeholder="https://…" required />
        </div>
        <div v-if="validUrl === false" class="text-field text-field__option">
          <p>Pour choisir une image : rendez-vous sur Google image ou Bing image, puis faites un clic droit [copier le lien de l'image] sur l'image souhaitée.</p>
        </div>
        <div v-if="url && validUrl === true" class="img-content">
          <img :src="url" alt="Prévisualisation de l'image" />
        </div>
        <div class="text-field">
          <label for="description">Description :</label>
          <textarea v-model="description" id="description" name="description" placeholder="Aucune description" maxlength="255"></textarea>
        </div>
        <div class="text-field text-field__option">
          <p>{{ description.length }} / 255 caractères</p>
        </div>
        <button @click="createPost()" type="submit" class="btn btn__lg btn__info" :disabled="!url">
          <span v-if="status === 'loading'">Publication en cours...</span>
          <span v-else>Publication</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import MainTitle from "@/components/MainTitle";
import {mapState} from "vuex";
import axios from "axios";

export default {
  name: 'Publish',
  data() {
    return {
      url: null,
      validUrl: null,
      description: ''
    }
  },
  components: { MainTitle },
  computed: {
    ...mapState(["status"])
  },
  mounted() {
    // Renvoie l'user non connecté sur la page de connexion
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/');
    }
  },
  methods: {
    // Vérifie que l'URL est accessible
    checkUrl() {
      return axios.get(this.url)
          .then(() => this.validUrl = true)
          .catch(() => this.validUrl = false)
    },
    // Publication du post si l'URL est validée
    createPost() {
      this.checkUrl()
          .then(() => {
                if (this.url && this.validUrl === true) {
                  axios.post('http://localhost:3000/api/posts/', {
                    user: this.$store.state.user.userId,
                    url: this.url,
                    description: this.description
                  })
                  this.$router.push('/feed');
                }
              }
          )
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/utils";

#url-field {
  position: relative;
  div {
    background-color: white;
    border-left: 1px $secondary solid;
    position: absolute;
    right: 3px;
    bottom: 3px;
    i {
      margin: 8px;
    }
  }
}
img {
  margin-bottom: 15px;
}
</style>