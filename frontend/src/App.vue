<template>
  <header>
    <img alt="Groupomania logo" src="./assets/logos/icon-left-font-monochrome-black.svg">
    <div id="nav">
      <router-link to="/feed">Forum</router-link>
      <router-link to="/">Compte</router-link>
      <router-link to="/profile">Profil</router-link>
    </div>
  </header>
  <router-view />
</template>

<style lang="scss">
@import "assets/styles/utils";

  * {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #2A52BE;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;

    li {
      list-style-type: none;
    }
    header {
      background-color: white;
      line-height: 0;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.125);
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
          border: 2px solid $primary;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          width: 80px;
          &:last-child {
            margin-left: 15px;
          }
          &.router-link-exact-active {
            background-color: $primary;
            color: white;
          }
        }
      }
    }
    .btn {
      background: $primary;
      color: white;
      border: 0;
      border-radius: 3px;
      cursor: pointer;
      outline: none;
      padding: 8px 10px;
      width: 100%;
      &:hover {
        background: $secondary;
      }
    }
  }
</style>
