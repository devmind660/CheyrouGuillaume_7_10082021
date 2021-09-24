<template>
  <div class="home">
    <div id="home__banner">
      <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="logo groupomania">
      <Banner title="Forum des salariés" />
    </div>
    <section class="wrapper wrapper__lg">
      <h2>Fil du forum – {{ feed.length }} post<span v-if="feed.length > 1">s</span></h2>
      <ul v-if="feed.length">
        <li v-for="post in feed" :key="post.id">
          <article>
            <router-link :to="{ name: 'Post', params: { id: post.id } }">
              <h3>{{ post.gif_desc }}</h3>
              <small>{{ 'posté par #' + post.author_id + ' le ' + post.publication_date.slice(0, 10).split('-').reverse().join('/') + ' à ' + post.publication_date.slice(11, 16) }}</small>
            </router-link>
          </article>
        </li>
      </ul>
      <p v-else>Chargement du fil…</p>
      <div class="inputfield">
        <label for="newPost">Nouveau GIF :</label>
        <input type="text" id="newPost" name="newPost" required />
      </div>
    </section>
  </div>
</template>

<script>
import Banner from "@/components/Banner";

export default {
  name: 'Home',
  components: { Banner },
  data() {
    return {
      feed: [],
    }
  },
  mounted() {
    fetch('http://localhost:3000/api/posts/')
        .then(res => res.json())
        .then(data => {
          this.feed = data
          console.log(data);
        })
        .catch(error => console.log(error.message))
  },
}
</script>

<style lang="scss">
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

.wrapper__lg {
  max-width: 800px;
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
