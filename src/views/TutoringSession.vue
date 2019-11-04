<template>
 
</template>


<script lang="ts">
import Vue from "vue";
import { TutoringSessionResponse } from "../dtos/output/TutoringSessionResponse";

export default Vue.extend( {

     name: "TutoringSession",
     data() {
       return {
         TutoringSession: {
           Place: "",
           StartTime: null,
           EndTime: null,
           StudentCount: null,
           Description: "",
           Price: null,
           Topics: []
         } as TutoringSessionResponse
       };
     },
     props: ["TutoringSessionAux"],
     created(){
          console.log(this.TutoringSessionAux);
          this.TutoringSession = this.TutoringSessionAux;
     }
})
</script>

<style scoped>
</style>