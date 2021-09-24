<template>
  <div class="post">
    <section v-if="post" class="wrapper wrapper__lg">
      <article>
        <h2>{{ post.gif_desc }}</h2>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['id'],
  data() {
    return {
      post: null,
    }
  },
  mounted() {
    fetch('http://localhost:3000/api/posts' + '/:' + this.id)
        .then(res => res.json())
        .then(data => {
          this.post = data
          console.log(data);
        })
        .catch(error => console.log(error.message))
  },
}
</script>
