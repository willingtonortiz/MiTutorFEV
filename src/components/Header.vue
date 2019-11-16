<template>
  <nav class="navbar">
    <router-link to="/home">
      <div class="logo">
        <img width="64" src="../assets/images/LogoSingle.svg" alt="" />
      </div>
    </router-link>
    <div class="search">
      <input
        type="text"
        placeholder="Busca algún curso"
        v-model="coursename"
        v-on:keyup.enter="findTutoringOffersAndTutors()"
      />
    </div>
    <div class="avatar">
      <img
        src="https://semantic-ui.com/images/avatar2/large/matthew.png"
        width="64"
        height="64"
        alt=""
      />
      <p>{{ name }}</p>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import AuthenticationService from "../Services/AuthenticationService";

export default Vue.extend({
  name: "Header",
  data(): any {
    return {
      name: "",
      coursename: ""
    };
  },

  created() {
    this.name = AuthenticationService.userValue.name;
    this.coursename = "";
  },
  methods: {
    async findTutoringOffersAndTutors() {
      if (this.coursename.length === 0) {
        return;
      }

      try {
        await this.$store.dispatch(
          "fetchTutoringOffers",
          this.coursename.toLowerCase()
        );

        await this.$store.dispatch(
          "fetchTutors",
          this.coursename.toLowerCase()
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
});
</script>

<style lang="scss">
.mobile-version-logo {
  display: none;
}
.nav {
  display: flex;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  & .avatar {
    display: flex;
    align-items: center;
    & img {
      border-radius: 50%;
      margin-right: 12px;
    }
  }

  & input {
    padding: 12px 18px;
    font-size: 18px;
    color: var(--primary-text);
    opacity: 0.87;
    border: 1px solid #afafaf;
    border-radius: 6px;
    width: 100%;
    transition: all 0.2s ease-in-out;
  }
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
  header .searchbar {
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
