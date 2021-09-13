<template>
  <header>
    <img alt="Groupomania logo" src="./assets/logos/icon-left-font-monochrome-black.svg">
    <div id="nav">
      <router-link to="/">Accueil</router-link>&emsp;
      <router-link to="/user">Compte</router-link>
    </div>
  </header>
  <router-view />
</template>

<style lang="scss">
  #app {
    background-color: #2A52BE;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;

    header {
      background-color: white;
      line-height: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;

      img {
        width: 200px
      }

      #nav {
          display: flex;

        a {
          color: #2A52BE;
          font-weight: bold;
          text-decoration: none;
          border: 2px #2A52BE solid;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          width: 80px;

          &.router-link-exact-active {
            background-color: #2A52BE;
            color: white;
          }
        }
      }
    }
  }
</style>
