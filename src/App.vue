<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Nunito Sans", sans-serif;
  outline: none;
  text-decoration: none;
}

::placeholder {
  color: #afafaf;
}


body {
  background: var(--main-background);
}
</style>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #dfe5fb;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-size: 150%;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}
</style>