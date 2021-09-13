<template>
  <div class="banner">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: { title: String }
}
</script>

<style scoped lang="scss">
  h1 {
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    border-bottom: 3px white solid;
    margin: 30px 15px;
  }
</style>
