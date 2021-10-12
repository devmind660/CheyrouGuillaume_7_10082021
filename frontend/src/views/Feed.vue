<template>
  <div class="home">
    <div id="home__banner">
      <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="logo groupomania">
      <Banner title="Forum des salariés" />
    </div>
    <section class="wrapper wrapper__lg">
      <h2>Fil du forum – {{ feed.length }} post<span v-if="feed.length > 1">s</span></h2>
      <ul v-if="feed.length">
        <li v-for="(post, index) in feed" :key="index">
          <article>
            <router-link :to="{ name: 'Post', params: { id: post.id } }">
              <h3>{{ post.gif_desc }}</h3>
            </router-link>
            <small>{{ 'posté par ' + post.username + ', le ' + post.publication_date.slice(0, 10).split('-').reverse().join('/') + ' à ' + post.publication_date.slice(11, 16) }}</small>
          </article>
        </li>
      </ul>
      <p v-else>Une erreur s'est produite</p>
    </section>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import axios from 'axios';

export default {
  name: 'Home',
  components: { Banner },
  data() {
    return {
      feed: []
    }
  },
  mounted() {
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/');
      return;
    }
    axios.get('http://localhost:3000/api/posts/')
      .then(res => this.feed = res.data)
      .catch(err => console.log(err.message))
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/utils";

div#home__banner {
  background-image: url("../assets/images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;

  img {
    width: 50%;
    min-width: 350px;
    max-width: 500px;
    @media all and (max-width: 500px) {
      display: none;
    }
  }
}

li {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}

article {
  border: 1px solid $primary;
  border-radius: 3px;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }

  h3 {
    color: $primary;
    font-size: 1.2rem;
    padding: 8px 10px;
    @media (max-width: 600px) {
      padding-bottom: 0;
    }
  }
  small {
    padding: 8px 10px;
  }
}
</style>