<template>
  <div class="post">
    <Banner title="Détails du post" />
    <section class="wrapper wrapper__lg">
      <h2>Post #{{ post.id }}</h2>
      <article v-if="post.id">
        <h3>{{ post.gif_desc }}</h3>
        <small>{{ 'posté par ' + post.username + ', le ' + post.publication_date.slice(0, 10).split('-').reverse().join('/') + ' à ' + post.publication_date.slice(11, 16) }}</small><br>
        <div class="inputfield inputfield__option">
          <p v-if="!this.delete">Gérer le post&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="this.delete = true">Supprimer</a></p>
          <p v-if="this.delete">Supprimer le post&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="deletePost()">Confirmer</a>&ensp;<i class="fas fa-angle-right"></i>&ensp;<a role="button" @click="this.delete = false">Annuler</a></p>
        </div>
        <div class="inputfield">
          <button @click="leaveComment()" type="submit" class="btn btn__info" :disabled="!validatedFields"><i class="fas fa-paper-plane"></i></button>
          <label for="comment">Commentaire :</label>
          <textarea v-model="comment" id="comment" name="comment" placeholder="Laisser un commentaire…" maxlength="255" required></textarea>
        </div>
        <div class="inputfield inputfield__option">
          <p>{{ comment.length }} / 255 caractères</p>
        </div>
      </article>
      <p v-else>Une erreur s'est produite</p>
    </section>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import axios from 'axios';
import {mapState} from "vuex";

export default {
  name: 'Post',
  components: { Banner },
  data() {
    return {
      delete: false,
      post: {},
      comment: '',
      comments: []
    }
  },
  computed: {
    validatedFields: function () {
      return this.comment !== "";
    },
    ...mapState(["status"])
  },
  mounted() {
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/');
      return;
    }
    axios.get('http://localhost:3000/api/posts/:' + this.id)
        .then(res => this.post = res.data)
        .catch(err => console.log(err.message))
  },
  methods: {
    deletePost() {
      this.$router.push('/feed');
    },
    leaveComment() {
      axios.post('http://localhost:3000/api/posts/')
          .then (res => {
            this.feed = res.data
            self.$router.push('/profile');
          })
          .catch(err => console.log(err.message))
    }
  }
}
</script>

<style scoped lang="scss">
.inputfield {
  position: relative;

  button {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
}
small {
  display: block;
  text-align: right;
}
</style>