<template>
  <div class="publish">
    <MainTitle title="Publier un GIF" />
    <section class="wrapper wrapper__sm">
      <h2>Publication</h2>
      <div class="form">
        <div class="text-field">
          <label for="url">URL du GIF :</label>
          <input v-model="url" type="text" id="url" name="url" placeholder="https://…" maxlength="50000" required />
        </div>
        <img class="post-image" v-if="url" :src="url" alt="Prévisualisation de l'image" />
<!--        <div class="text-field">
          <label for="file">Fichier GIF :</label>
          <input type="file" id="file" name="file" />
        </div>-->
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
      url: '',
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
    createPost() {
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
</script>