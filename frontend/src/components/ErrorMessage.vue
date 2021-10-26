<template>
  <div class="error-message">
    <section class="wrapper wrapper__sm error-msg">
      <h2>Erreur {{ error }}</h2>
      <h3>{{ message }}</h3>
      <button @click="goBack()" class="btn btn__lg btn__info">Retourner à la page précédente</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    error: String,
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/utils";

h3 {
  text-align: center;
  margin-bottom: 15px;
}
</style>