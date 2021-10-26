<template>
  <div class="main-title">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'MainTitle',
  props: { title: String }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/utils";

  h1 {
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    border-bottom: 3px white solid;
    margin: 30px 15px;
  }
</style>