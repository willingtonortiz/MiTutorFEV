<template>
  <header class="nav">
    <div class="logo">
		<router-link to="/">
      			<img class="web-version-logo" src="../assets/images/logo.png" alt />
      			<img class="mobile-version-logo" src="../assets/images/LogoSingle.png" alt />

		</router-link>
    </div>
    <div class="searchbar">
      <input type="text" placeholder="buscar algun curso" />
    </div>
    <div class="avatar">
      <div class="avatar"></div>
    </div>
  </header>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Header"
});
</script>

<style>
.mobile-version-logo {
  display: none;
}
.nav {
  display: flex;
}
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 999px;
  background: #afafaf;
}

header {
  padding: 1.5em 3em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header .searchbar {
  width: 450px;
  position: relative;
}

header .searchbar input {
  padding: 12px 18px;
  font-size: 18px;
  color: var(--primary-text);
  opacity: 0.87;
  border: 1px solid #afafaf;
  border-radius: 6px;
  width: 100%;
  transition: all 0.2s ease-in-out;
}

header .searchbar input:focus {
  border: 1px solid var(--primary-color);
}

@media (max-width: 720px) {
  header {
    padding: 0.5em 0.25em;
  }
  header .searchbar{
	  width: fit-content;
  }
  .nav {
    display: flex;

    justify-content: space-around;
  }
  .mobile-version-logo {
    display: initial;
  }
  .web-version-logo {
    display: none;
  }
  .avatar {
    width: 36px;
    height: 36px;
  }
  header input {
    width: 220px !important;
  }
}
</style>