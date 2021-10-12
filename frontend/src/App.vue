<template>
  <header>
    <img class="desktop" alt="Groupomania logo" src="./assets/logos/icon-left-font-monochrome-black.svg">
    <img class="mobile" alt="Groupomania logo" src="./assets/logos/icon-monochrome-black.png">
    <div id="nav">
      <router-link to="/feed" v-if="this.$store.state.user.userId !== -1"><i class="fas fa-comments"></i><span>Forum</span></router-link>
      <router-link to="/publish" v-if="this.$store.state.user.userId !== -1"><i class="fas fa-pen"></i><span>Publier</span></router-link>
      <router-link to="/" v-if="this.$store.state.user.userId === -1"><i class="fas fa-user-circle"></i><span>Compte</span></router-link>
      <router-link to="/profile" v-if="this.$store.state.user.userId !== -1"><i class="fas fa-user-circle"></i><span>Profil</span></router-link>
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
    .wrapper__sm {
      max-width: 400px;
    }
    .wrapper__lg {
      max-width: 800px;
    }
    textarea {
      resize: vertical;
      @media all and (min-width: 600px) {
        min-height: 50px;
      }
      @media all and (max-width: 599px) {
        min-height: 80px;
      }
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
        height: 34px;
        &.mobile {
          @media all and (min-width: 421px) {
            display: none;
          }
        }
        &.desktop {
          @media all and (max-width: 420px) {
            display: none;
          }
        }
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
          margin-left: 15px;
          height: 30px;
          @media all and (min-width: 600px) {
            width: 80px;
          }
          @media all and (max-width: 599px){
            width: 30px;
          }
          &:first-child {
            margin-left: 0;
          }
          &.router-link-exact-active {
            background-color: $primary;
            color: white;
          }

          i {
            @media all and (min-width: 600px){
              display: none;
            }
          }
          span {
            @media all and (max-width: 599px){
              display: none;
            }
          }
        }
      }
    }
    .btn {
      color: white;
      border: 0;
      border-radius: 3px;
      cursor: pointer;
      outline: none;
      padding: 8px 10px;
      &__lg {
        width: 100%;
      }
      &__info {
        background: $info;
        &:hover {
          background-color: lighten($info, $hover-gradient);
        }
      }
      &__success {
        background-color: $success;
        &:hover {
          background-color: lighten($success, $hover-gradient);
        }
      }
      &__danger {
        background-color: $danger;
        &:hover {
          background-color: lighten($danger, $hover-gradient);
        }
      }
      &[disabled] {
        background-color: lightgray;
        cursor: default;
      }
    }
  }
</style>