<template>
  <div class="user">
    <Banner title="Informations du compte" />
    <Signup />
    <Login />
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import Signup from "@/components/Signup";
import Login from "@/components/Login";

export default {
  name: 'User',
  components: {
    Banner, Signup, Login
  }
}
</script>

<style scoped lang="scss">
</style>
