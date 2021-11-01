<template>
  <div class="publish">
    <MainTitle title="Publier un GIF" />
    <section class="wrapper wrapper__sm">
      <h2>Publication</h2>
      <div class="form">
        <div id="url-field" class="text-field">
          <i v-if="validUrl === false" @click="url = null; validUrl = null" title="URL invalide. Pour choisir une image : rendez-vous sur Google image ou Bing image, puis faites un clic droit [copier le lien de l'image] sur l'image souhaitée." class="fas fa-times-circle"></i>
          <label for="url">URL du GIF :</label>
          <input v-model="url" @change="checkUrl" type="text" id="url" name="url" placeholder="https://…" maxlength="50000" required />
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
        <button @click="createPost()" type="submit" class="btn btn__lg btn__info" :disabled="!url || validUrl !== true">
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
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/');
    }
  },
  methods: {
    checkUrl() {
      axios.get(this.url)
          .then(() => this.validUrl = true)
          .catch(() => this.validUrl = false)
    },
    createPost() {
      this.checkUrl()
      if (this.validUrl === true) {
        axios.post('http://localhost:3000/api/posts/', {
          user: this.$store.state.user.userId,
          url: this.url,
          description: this.description
        })
            .then(() => {
              this.$router.push('/feed');
            })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/utils";

#url-field {
  position: relative;
  i {
    background: white;
    color: red;
    border-left: 1px $secondary solid;
    padding: 8px;
    position: absolute;
    right: 3px;
  }
}
img {
  margin-bottom: 15px;
}
</style>