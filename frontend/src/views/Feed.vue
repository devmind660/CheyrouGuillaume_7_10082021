<template>
  <div class="home">
    <div id="home__banner">
      <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="logo groupomania">
    </div>
    <MainTitle title="Forum des salariés"></MainTitle>
    <section class="wrapper wrapper__lg">
      <h2>Forum・{{ feed.length }} <i class="far fa-comment-dots"></i></h2>
      <ul v-if="feed.length">
        <li v-for="post in feed" :key="post.id">
          <article>
            <div class="text-field">
              <h3 v-if="post.username">{{ post.username }}</h3>
              <h3 v-else class="anonyme">Anonyme</h3>
              <small>{{ 'Le ' + post.publication_date.slice(0, 10).split('-').reverse().join('/') + ' à ' + post.publication_date.slice(11, 16) }}
                <button v-if="post.author_id === this.$store.state.user.userId || this.$store.state.user.isAdmin === 1" @click="deletePost(post.id)" class="icon" title="Supprimer le post"><i class="fas fa-trash-alt fa-lg"></i></button>
              </small>
            </div>
            <p class="text-content">{{ post.gif_desc }}</p>
            <router-link :to="{ name: 'Post', params: { id: post.id } }">
              <img class="post-image" :src="post.gif_url" alt="{{ post.gif_desc }}" />
            </router-link>
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
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/');
    }
    this.getFeed();
  },
  methods: {
    getFeed() {
      axios.get('http://localhost:3000/api/posts/')
          .then(res => this.feed = res.data)
    },
    deletePost(id) {
      axios.delete('http://localhost:3000/api/posts/' + id)
          .then(() => this.getFeed())
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
article img {
  max-height: 60vh;
}
</style>