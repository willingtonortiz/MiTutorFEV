<template>
  <div class="home-container">
    <nav class="navbar">
      <div class="logo">
        <img width="64" src="../assets/images/LogoSingle.svg" alt="" />
      </div>
      <div class="search">
        <input
          type="text"
          placeholder="Busca algún curso"
          v-model="courseName"
          v-on:keyup.enter="findTutoringOffersAndTutors"
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
    <div class="home-sub">
      <HomeSideBarComponent
        class="home-side-bar-component"
      ></HomeSideBarComponent>

      <div class="results">
        <TutoringOfferInfoGroupComponent></TutoringOfferInfoGroupComponent>

        <TutorInfoGroupComponent></TutorInfoGroupComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CourseService } from "../Services/CourseService";
import { TutoringOfferService } from "../Services/TutoringOfferService";
import { Course } from "../Models/Course";
import { TutoringOfferInfo } from "../dtos/output/TutoringOfferInfo";
import TutoringOfferInfoGroupComponent from "../components/Home/TutoringOfferInfoGroupComponent.vue";
import HomeSideBarComponent from "@/components/Home/HomeSideBarComponent.vue";
import TutorInfoGroupComponent from "@/components/Home/TutorInfoGroupComponent.vue";
import AuthenticationService from "../Services/AuthenticationService";

@Component({
  components: {
    TutorInfoGroupComponent,
    HomeSideBarComponent,
    TutoringOfferInfoGroupComponent
  },
  props: {},

  filters: {
    firstLetter: function(value: string): string {
      if (!value) return "";

      return value.charAt(0).toUpperCase();
    },
    titlecase: function(value: string): string {
      if (!value) return "";

      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    simpleDate: function(value: Date): string {
      if (!value) return "";

      return (
        value.getDate() +
        "/" +
        (value.getMonth() + 1) +
        "/" +
        value.getFullYear()
      );
    },
    simpleTime: function(value: Date): string {
      if (!value) return "";

      return value.getHours() + ":" + value.getMinutes();
    }
  }
})
export default class Home extends Vue {
  public courseName: string;
  public name: string;

  public constructor() {
    super();
    // Servicios

    this.courseName = "";
    this.name = AuthenticationService.userValue.name;
  }

  public async findTutoringOffersAndTutors() {
    if (this.courseName.length === 0) {
      return;
    }

    try {
      await this.$store.dispatch(
        "fetchTutoringOffers",
        this.courseName.toLowerCase()
      );

      await this.$store.dispatch("fetchTutors", this.courseName.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  }

  created() {}
}
</script>

<style lang="scss" scoped>
.home-container {
  .navbar {
    padding: 16px;
    display: flex;
    flex-flow: row nowrap;

    justify-content: space-around;
    align-items: center;

    .search {
      input {
        padding: 8px;
        border: 1px solid lightgray;
        border-radius: 5px;
        font-size: 16px;
        width: 300px;
      }
    }
  }

  .home-side-bar-component {
    display: none;
  }
}

@media only screen and (min-width: 768px) {
}

@media only screen and (min-width: 1024px) {
  .home-sub {
    display: flex;
  }
  .home-container {
    height: 100vh;
    padding: 16px 32px;

    align-items: flex-start;

    .navbar,
    .home-side-bar-component,
    .results {
      // border: 1px solid blue;

      border-radius: 10px;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
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

    .home-side-bar-component {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20%;
      height: 80vh;
    }

    .results {
      width: 80%;
      grid-column: 2 / span 1;
      align-self: stretch;
      display: flex;
      flex-flow: column wrap;
    }
    .avatar {
      display: flex;
      align-items: center;
      & img {
        border-radius: 50%;
        margin-right: 12px;
      }
    }
  }
}
</style>
