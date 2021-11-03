<template>
  <header>
    <img class="desktop" alt="Groupomania logo" src="./assets/logos/icon-left-font-monochrome-black.svg">
    <img class="mobile" alt="Groupomania logo" src="./assets/logos/icon-monochrome-black.png">
    <nav>
      <router-link to="/feed" v-if="this.$store.state.user.userId !== -1"><i class="fas fa-comments"></i><span>Forum</span></router-link>
      <router-link to="/publish" v-if="this.$store.state.user.userId !== -1"><i class="fas fa-pen"></i><span>Publier</span></router-link>
      <router-link to="/" v-if="this.$store.state.user.userId === -1"><i class="fas fa-user-circle"></i><span>Compte</span></router-link>
      <router-link to="/profile" v-if="this.$store.state.user.userId !== -1"><i class="fas fa-user-circle"></i><span>Profil</span></router-link>
    </nav>
  </header>
  <!-- VIEWS HERE -->
  <router-view />
</template>

<style lang="scss">
@import "assets/styles/utils";

// ---------- GENERAL | PRESETS ----------
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: $primary;
}

// ---------- GENERAL | APP ----------
#app {
  color: $primary;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  // ---------- GENERAL | HEADER MENU ----------
  header {
    background-color: white;
    line-height: 0;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.125);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    width: 100%;

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
  }
  nav {
    display: flex;

    a {
      color: $primary;
      font-weight: bold;
      text-decoration: none;
      border: 2px solid $primary;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 15px;
      height: 34px;
      @media all and (min-width: 600px) {
        width: 84px;
      }
      @media all and (max-width: 599px){
        width: 34px;
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

  // ---------- GENERAL | MAIN STRUCTURE ----------
  .wrapper__sm {
    max-width: 400px;
  }
  .wrapper__lg {
    max-width: 800px;
  }
  .wrapper {
    background-color: white;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.125);
    margin: 50px auto;
    padding: 30px;
    @media (max-width: 420px) {
      padding: 15px;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 25px;
      text-transform: uppercase;
      text-align: center;
      margin-top: 0;
    }

    div.form, article, ul {
      width: 100%;
    }
  }
  li {
    list-style-type: none;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  article {
    background-color: white;
    border: 1px solid $primary;
    border-radius: 3px;

    button.icon {
      background-color: transparent;
      color: $danger;
      padding-left: 8px;
      &:hover {
        color: lighten($danger, $hover-gradient);
      }
    }
    .text-field {
      margin-bottom: 0;

      h3 {
        font-size: 1.2rem;
        white-space: nowrap;
        padding: 8px 10px;
        @media (max-width: 420px) {
          padding-bottom: 0;
        }
        &.anonyme {
          color: $secondary;
          font-style: italic;
        }
      }
      small {
        padding: 5px 10px;
        width: 100%;
        @media (min-width: 421px) {
          text-align: right;
        }
      }
    }
  }

  // ---------- GENERAL | COMPONENTS ----------
  .text-field {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    @media (max-width: 420px) {
      flex-wrap: wrap;
    }
    &__option p {
      text-align: right;
      margin-left: auto;

      a:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    label {
      min-width: 120px;
      @media (max-width: 420px) {
        margin-bottom: 5px;
      }
    }
    input, textarea {
      font-size: 1rem;
      outline: none;
      border-radius: 3px;
      padding: 8px 10px;
      width: 100%;
      transition: all 0.3s ease;
      border: 1px solid $primary;
      &:focus {
        border: 1px solid $secondary;
      }
    }
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
  .text-content {
    margin: 8px 10px;
  }
  .img-content {
    line-height: 0;
    img {
      object-fit: cover;
      overflow: hidden;
      object-position: center;
      width: 100%;
    }
  }
  button {
    border: none;
    cursor: pointer;
  }
  .btn {
    color: white;
    border-radius: 3px;
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
      background-color: $secondary;
      cursor: default;
    }
  }
  .error-list {
    color: $danger;
    font-size: 0.9rem;
    margin-bottom: 15px;
    p, li {
      margin-bottom: 5px;
    }
  }
  .success {
    color: $success;
  }
  .error {
    color: $danger;
  }
  .info {
    color: $info;
  }
}
</style>