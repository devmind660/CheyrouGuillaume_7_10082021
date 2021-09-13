<template>
  <form id="login" action="http://localhost:3000/api/user/signup" method="POST">
    <fieldset>
      <legend>Inscription</legend>
      <label for="username">Nom d'utilisateur : </label>
      <input v-model="user.username" type="text" id="username" required />
      <small></small>&ensp;
      <label for="email">Adresse email : </label>
      <input v-model="user.email" type="email" id="email" required />
      <small></small>&emsp;
      <label for="password">Mot de passe : </label>
      <input v-model="user.password" type="password" id="password" required />
      <small></small>&emsp;
      <input type="submit" value="S'inscrire">
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      }
    }
  }
}
</script>
