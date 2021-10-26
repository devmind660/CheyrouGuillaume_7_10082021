<template>
  <div class="post">
    <MainTitle v-if="post.gif_url" title="Détails du post" />
    <section v-if="post.gif_url" class="wrapper wrapper__lg">
      <h2>Post・{{ comments.length }} <i class="far fa-comment-dots"></i></h2>
      <article>
        <button @click="deletePost(post.id)" class="icon" title="Supprimer le post"><i class="fas fa-trash-alt fa-lg"></i></button>
        <div class="text-field">
          <h3>{{ post.username }}</h3>
          <small>{{ 'Le ' + post.publication_date.slice(0, 10).split('-').reverse().join('/') + ' à ' + post.publication_date.slice(11, 16) }}</small><br>
        </div>
        <span>{{ post.gif_url }}</span>
        <p class="text-content">{{ post.gif_desc }}</p>
      </article>
    </section>
    <section v-if="post.gif_url" class="wrapper wrapper__lg">
      <div class="text-field text-field__comment">
        <button @click="createComment()" class="icon" type="submit" :disabled="!comment" title="Publier le commentaire"><i class="fas fa-paper-plane fa-lg"></i></button>
        <label for="comment">Commentaire :</label>
        <textarea v-model="comment" id="comment" name="comment" placeholder="Laisser un commentaire…" maxlength="255" required></textarea>
      </div>
      <div class="text-field text-field__option">
        <p>{{ comment.length }} / 255 caractères</p>
      </div>
      <ul v-if="comments.length">
        <li v-for="comment in comments" :key="comment.id">
          <article>
            <button @click="deleteComment(comment.id)" class="icon" title="Supprimer le commentaire"><i class="fas fa-trash-alt fa-lg"></i></button>
            <div class="text-field">
              <h3>{{ comment.username }}</h3>
              <small>{{ 'Le ' + comment.publication_date.slice(0, 10).split('-').reverse().join('/') + ' à ' + comment.publication_date.slice(11, 16) }}</small>
            </div>
            <p class="text-content">{{ comment.gif_comment }}</p>
          </article>
        </li>
      </ul>
      <h3 v-else>Aucun commentaire</h3>
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
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/');
    }
    this.getComments();
    axios.get('http://localhost:3000/api/posts/:', {
      params: { id: this.id }
    })
        .then(res => this.post = res.data)
  },
  methods: {
    getComments() {
      axios.get('http://localhost:3000/api/comments/:', {
        params: { id: this.id }
      })
          .then(res => this.comments = res.data)
    },
    deletePost(id) {
      axios.delete('http://localhost:3000/api/posts/' + id)
          .then(() => this.$router.push('/feed'))
    },
    deleteComment(id) {
      axios.delete('http://localhost:3000/api/comments/' + id)
          .then(() => this.getComments())
    },
    createComment() {
      axios.post('http://localhost:3000/api/comments/', {
        id: this.id,
        comment: this.comment
      })
          .then(() => {
            this.getComments();
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

  button.icon {
    color: $info;
    position: absolute;
    right: 10px;
    bottom: 10px;
    &:hover {
      color: lighten($info, $hover-gradient);
    }
  }
}

li:first-child {
  margin-top: 15px;
}
</style>