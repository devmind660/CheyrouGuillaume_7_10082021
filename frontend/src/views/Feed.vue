<template>
  <div class="home">
    <div id="home__banner">
      <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="logo groupomania">
    </div>
    <MainTitle title="Fil du forum"></MainTitle>
    <section class="wrapper wrapper__lg">
      <h2>Forum・{{ feed.length }} <i class="far fa-comment-dots"></i></h2>
      <ul v-if="feed.length">
        <li v-for="post in feed" :key="post.id">
          <article>
            <div class="text-field">
              <h3 v-if="post.username">{{ post.username }}</h3>
              <h3 v-else class="anonyme">Anonyme</h3>
              <small>{{ post.gif_date }}
                <button v-if="post.author_id === this.$store.state.userInfos.id || this.$store.state.userInfos.admin_rights === 1" @click="deletePost(post.id)" class="icon" title="Supprimer le post"><i class="fas fa-trash-alt fa-lg"></i></button>
              </small>
            </div>
            <p class="text-content">{{ post.gif_title }}</p>
            <div class="img-content">
              <router-link :to="{ name: 'Post', params: { id: post.id } }">
                <img :src="post.gif_url" :alt="post.gif_desc" />
              </router-link>
            </div>
          </article>
        </li>
      </ul>
      <h3 v-else>Il n'y a aucun post pour le moment.</h3>
    </section>
  </div>
</template>

<script>
import MainTitle from "@/components/MainTitle";
import axios from 'axios';

export default {
  name: 'Home',
  components: { MainTitle },
  data() {
    return {
      feed: []
    }
  },
  mounted() {
    // Renvoie l'user non connecté sur la page de connexion
    if (!this.$store.state.user.token) {
      this.$router.push('/');
    }
    // Affichage des posts
    this.getFeed();
  },
  methods: {
    // Affichage des posts
    getFeed() {
      axios.get('http://localhost:3000/api/posts/')
          .then(res => this.feed = res.data)
    },
    // Suppresion d'un post via son id
    deletePost(id) {
      axios.delete('http://localhost:3000/api/posts/' + id)
          .then(() => this.getFeed()) // Actualisation des posts
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/utils";

div#home__banner {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vw;
  max-height: 100vh;

  img {
    width: 50%;
    min-width: 250px;
    max-width: 500px;
  }
}
.img-content img {
  max-height: 60vh;
}
</style>