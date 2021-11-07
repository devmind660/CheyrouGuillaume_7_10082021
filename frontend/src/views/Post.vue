<template>
  <div class="post">
    <MainTitle v-if="post.gif_url" title="Détails du post" />
    <section v-if="post.gif_url" class="wrapper wrapper__lg">
      <h2>Post・{{ comments.length }} <i class="far fa-comment-dots"></i></h2>
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
          <img :src="post.gif_url" :alt="post.gif_desc" />
        </div>
      </article>
    </section>
    <section v-if="post.gif_url" class="wrapper wrapper__lg">
      <div class="text-field text-field__comment">
        <button @click="createComment()" type="submit" :disabled="!comment" title="Publier le commentaire"><i class="fas fa-paper-plane fa-lg"></i></button>
        <label for="comment">Commentaire :</label>
        <textarea v-model="comment" id="comment" name="comment" placeholder="Laisser un commentaire…" maxlength="255" required></textarea>
      </div>
      <div class="text-field text-field__option">
        <p>{{ comment.length }} / 255 caractères</p>
      </div>
      <ul v-if="comments.length">
        <li v-for="comment in comments" :key="comment.id">
          <article>
            <div class="text-field">
              <h3 v-if="comment.username">{{ comment.username }}</h3>
              <h3 v-else class="anonyme">Anonyme</h3>
              <small>{{ comment.comment_date }}
                <button v-if="comment.author_id === this.$store.state.userInfos.id || this.$store.state.userInfos.admin_rights === 1" @click="deleteComment(comment.id)" class="icon" title="Supprimer le commentaire"><i class="fas fa-trash-alt fa-lg"></i></button>
              </small>
            </div>
            <p class="text-content">{{ comment.gif_comment }}</p>
          </article>
        </li>
      </ul>
      <h3 v-else>Il n'y a aucun commentaire pour le moment.</h3>
    </section>
    <ErrorMessage v-else error="404" message="Le post demandé n'a pas été trouvé ou n'existe pas"></ErrorMessage>
  </div>
</template>

<script>
import MainTitle from "@/components/MainTitle";
import ErrorMessage from "@/components/ErrorMessage";
import axios from 'axios';
import {mapState} from "vuex";

export default {
  name: 'Post',
  components: { MainTitle, ErrorMessage },
  props: ['id'], // On récupère l'id dans l'url en ayant autorisé les props dans le routeur
  data() {
    return {
      post: {},
      comment: '',
      comments: []
    }
  },
  computed: {
    ...mapState(["status"])
  },
  mounted() {
    // Renvoie l'user non connecté sur la page de connexion
    if (!this.$store.state.user.token) {
      this.$router.push('/');
    }
    // Affichage des commentaires
    this.getComments();
    // Affichage du post via son id
    axios.get('http://localhost:3000/api/posts/:', {
      params: { id: this.id }
    })
        .then(res => this.post = res.data)
  },
  methods: {
    // Affichage des commentaires
    getComments() {
      axios.get('http://localhost:3000/api/comments/:', {
        params: { id: this.id }
      })
          .then(res => this.comments = res.data)
    },
    // Suppression d'un post via son id
    deletePost(id) {
      axios.delete('http://localhost:3000/api/posts/' + id)
          .then(() => this.$router.push('/feed'))
    },
    // Suppression d'un commentaire via son id
    deleteComment(id) {
      axios.delete('http://localhost:3000/api/comments/' + id)
          .then(() => this.getComments()) // Actualisation des commentaires
    },
    // Publication d'un commentaire
    createComment() {
      axios.post('http://localhost:3000/api/comments/', {
        user: this.$store.state.userInfos.id,
        id: this.id,
        comment: this.comment
      })
          .then(() => {
            this.getComments(); // Actualisation des commentaires
            this.comment = '';
          })
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/utils";

.text-field__comment {
  position: relative;

  button {
    background-color: transparent;
    color: $info;
    position: absolute;
    right: 10px;
    bottom: 10px;
    &:hover {
      color: lighten($info, $hover-gradient);
    }
    &[disabled] {
      color: $secondary;
      cursor: not-allowed;
    }
  }
}

li:first-child {
  margin-top: 15px;
}
</style>