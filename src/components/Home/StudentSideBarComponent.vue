<template>
  <div class="student-side-bar-container">
    <!-- TODO Realizar el link hacia la vista de suscripciones -->
    <div class="img">
      <img src="../../assets/images/classroom.svg" width="64" alt="" />
      <h2>Membresía</h2>
      <p>
        Ayuda a otros estudiantes y serás beneficiado por el conocimiento
        brindado.
      </p>
    </div>
    <router-link class="button" to="/home/subscription"
      >Quiero ser tutor</router-link
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class StudentSideBarComponent extends Vue {}
</script>

<style lang="scss" scoped>
.student-side-bar-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .button {
    padding: 12px 20px;
    background-color: #4e83ed;
    color: white;
    border-radius: 5px;
    border: none;
    font-size: 18px;
    font-weight: normal;
    cursor: pointer;
	margin-top: 2em;
  }
}
.student-side-bar-container .img{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.student-side-bar-container .img p{
	width: 90%;
}
.student-side-bar-container .img h2{
	color: #4e83ed;
	margin-top: .5em;
}
</style>
