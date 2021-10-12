<template>
  <div class="publish">
    <Banner title="Publier un GIF" />
    <section class="wrapper wrapper__sm">
      <h2>Publication</h2>
      <div class="form">
        <div class="inputfield">
          <label for="gif">Fichier GIF :</label>
          <input type="file" id="gif" name="gif" accept="image/*" required /> <!-- #imageInput (change)="onFileAdded($event)" -->
        </div>
        <div class="inputfield">
          <label for="description">Description :</label>
          <textarea v-model="description" id="description" name="description" placeholder="Aucune description" maxlength="255" required></textarea>
        </div>
        <div class="inputfield inputfield__option">
          <p>{{ description.length }} / 255 caractères</p>
        </div>
        <!-- <img [src]="imagePreview" *ngIf="imagePreview" style="max-height: 100px;display:block;margin-top:10px"> -->
        <div class="inputfield">
          <button @click="publishPost()" type="submit" class="btn btn__lg btn__info" :disabled="!validatedFields">
            <span v-if="status === 'loading'">Publication en cours...</span>
            <span v-else>Publication</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import {mapState} from "vuex";
import axios from "axios";

export default {
  name: 'Publish',
  data() {
    return {
      description: ''
    }
  },
  components: { Banner },
  computed: {
    validatedFields: function () {
      return this.description !== "";
    },
    ...mapState(["status"])
  },
  mounted() {
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/');
    }
  },
  methods: {
    publishPost() {
      axios.post('http://localhost:3000/api/posts/')
          .then (res => {
            this.feed = res.data
            self.$router.push('/feed');
          })
          .catch(err => console.log(err.message))
    }
  }
}
</script>