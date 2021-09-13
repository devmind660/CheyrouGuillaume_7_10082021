<template>
  <form id="login" action="http://localhost:3000/api/user/login" method="POST">
    <fieldset>
      <legend>Connexion</legend>
      <label for="email2">Adresse email : </label>
      <input v-model="user.email" type="email" id="email2" required />
      <small></small>&ensp;
      <label for="password2">Mot de passe : </label>
      <input v-model="user.password" type="password" id="password2" required />
      <small></small>&emsp;
      <input type="submit" value="Se connecter">
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'Signup',
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
