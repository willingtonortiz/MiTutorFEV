<template>
  <div class="tutor-info-container">
    <div class="photo-container">
      <div class="photo">
        <img
          src="https://semantic-ui.com/images/avatar2/large/matthew.png"
          width="100"
          height="100"
          alt
        />
      </div>
    </div>

    <div class="data">
      <div class="personal">
        <div class="row">
          <p>{{ tutor.fullName }}</p>
        </div>
        <div class="row">
          <p>{{ tutor.career }}</p>
        </div>
      </div>

      <div class="points">
        <!-- <p class="high">{{ tutor.points | number: "1.1" }} </p>-->
        <p class="high">{{ tutor.points | pointsFilter }}</p>
        <p class="small">Puntuación</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    tutor: Object
  },
  filters: {
    pointsFilter: function(value: number) {
      if (!value) return "";
      let parts: string[] = value.toString().split(".");
      return parts[0][0] + "." + parts[1][0];
    }
  }
})
export default class TutorInfoComponent extends Vue {}
</script>

<style lang="scss" scoped>
.tutor-info-container {
  padding: 16px;
  width: 400px;
  height: 160px;

  display: flex;
  flex-flow: row nowrap;

  .photo-container {
    margin-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    .photo {
      width: 100px;
      height: 100px;
  
      border-radius: 50%;
      & img {
        border-radius: 50%;
        margin-right: 10px;
      }
      .row p {
        font-size: 18px;
      }
    }
  }

  .data {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;

    .personal {
      display: flex;
      flex-flow: column nowrap;

      .row {
        font-size: 20px;
      }
    }

    .points {
      display: flex;
      flex-flow: row wrap;
      align-items: baseline;
      font-size: 30px;
      color: #4e83ed;

      .high {
        font-weight: bold;
      }

      .small {
        margin-left: 8px;
        font-size: 20px;
      }
    }
  }
}
</style>