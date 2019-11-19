<template>
  <div class="container-nuevatutoria">
    <div class="form-container">
      <h2>Nueva oferta</h2>

       <p v-if="errors.length">
           <b>Por favor corrija los siguientes errores:</b>
           <ul style="margin-left:5%">
             <li v-for="error in errors" :key="error">{{ error }}</li>
           </ul>
       </p>

      <form>
        
    
        <div class="field">
          <label >Seleccione el curso</label>
          <v-select
            class="style-chooser"
            v-model="selected"
            :options="courses"
            @input="onSelection"
            
          ></v-select>
        </div>


        <div class="field">
          <label >Participantes máximos en cada sesión</label>
          <input
            type="number"
            v-model="TutoringOffer.Capacity"
            name="Capacity"
            placeholder="Ingrese el numero de participantes máximos"
            :max="5"
          />
        </div>

        <div class="field">
          <label >Descripción</label>
          <textarea name="Description" cols="30" rows="10" v-model="TutoringOffer.Description"></textarea>
        </div>

   
        
      </form>

      <div class="field">
        <button
          class="btn"
          v-on:click="addOfferAux"
          style=" margin-bottom:5%; width:100%;">Crear Oferta</button>
      </div>

      

    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapActions, mapGetters} from "vuex";
import {TutoringOfferRequest} from "../Models/TutoringOfferRequest"
import { TutoringOfferService } from "../Services/TutoringOfferService";
import  AuthenticationService  from "../Services/AuthenticationService";
import { Course } from '../Models/Course';
import { TutorService } from '../Services/TutorService';
import { UniversityResponse } from '../Models/UniversityResponse';

export default Vue.extend ({

  name: "PublishTutoringOffer",
  computed: mapGetters(["GetTutoringOffer"]),
  components: { vSelect },
  data() {
    return {

        TutoringOffer: {   
            Capacity: null,
            Description: '',
            CourseId: null,
            UniversityId: null,
            TutorId: AuthenticationService.userValue.id,
            TutoringSessionRequests: [],
            
        } as TutoringOfferRequest,

        courses: [],
        selected: null,
        validated: false,
        errors: [],
    };
  },
  methods: {
    ...mapActions(["addOffer"]),

    onSelection() {
      
    },

    checkForm: function() {

        this.errors=[];
        let val = true;

        if(this.TutoringOffer.Capacity == null ){
          this.errors.push('Establezca la capacidad');
          val = false;
        } else if(this.TutoringOffer.Capacity.length == 0){
           this.errors.push('Establezca la capacidad');
          val = false;
        }

        if(this.TutoringOffer.Capacity > 5){
          this.errors.push('La capacidad no debe ser mayor a 5');
          val = false;
        }

        if(this.TutoringOffer.Description.length == 0){
          this.errors.push('Complete la descripcion');
          val = false;
        }

        if(this.selected == null){
          this.errors.push('Seleccione un curso');
          val = false;
        }

        if(val==true){
          this.validated=true;
        } 

        
    },

    addOfferAux() {

      this.checkForm();

      if(this.validated){ 
        this.TutoringOffer.CourseId = this.selected.value;
        this.addOffer(this.TutoringOffer);
        this.$router.push({name: 'publishTutoringSession'});
      }
    },


  },

  async created() {

    this.TutoringOffer = this.$store.getters.GetTutoringOffer;

    let offerService = new TutoringOfferService();
    let tutorService = new TutorService();
    let tutorUniversity: UniversityResponse = await tutorService.findUniversity(AuthenticationService.userValue.id);
    console.log(tutorUniversity);

    this.TutoringOffer.UniversityId = tutorUniversity.id;

    let courses: Array<Course> = await offerService.findAllCoursesByUniversity(this.TutoringOffer.UniversityId);


    for (let i = 0; i <courses.length; ++i) {
      this.courses.push({
            value: courses[i].id,
            label: courses[i].name
          });

      if(this.TutoringOffer.CourseId !==null && courses[i].id === this.TutoringOffer.CourseId) {
        this.selected = {
           value: courses[i].id,
          label: courses[i].name
        }
      }
    }

  },

  destroyed(){

      this.TutoringOffer = {   
            Capacity: null,
            Description: '',
            CourseId: null,
            UniversityId: null,
            TutorId: null,
            TutoringSessionRequests: [],
            
        } as TutoringOfferRequest,

      this.courses= [];
      this.selected= null;
      this.validate= false;
      this.errors= [];

  }

});
</script>



<style scoped>


.container-nuevatutoria-master {
  background: var(--main-background);
  width: 100%;
  position: relative;
}

.container-nuevatutoria {
  text-align: left;
  overflow: auto;
  width: 100%;
  position: relative;
}

.container-nuevatutoria .form-container {
  width: 40%;
  margin: 0 auto;
  background: var(--white);
  box-shadow: 0 6px 24px 7px rgba(0, 0, 0, 0.01);
  padding: 1em 1.75em;
  border-radius: 6px;
}

.container-nuevatutoria .form-container h2 {
  font-size: 30px;
  font-weight: bold;
  color: var(--primary-text);
  margin-bottom: 1.5em;
}

.container-nuevatutoria .form-container form .field {
  margin: 2em 0;
  display: flex;
  flex-direction: column;

}

.container-nuevatutoria .form-container form .field label {

  font-size: 20px;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 0.5em;
  display:block;

}

.container-nuevatutoria .form-container form .field input,
.container-nuevatutoria .form-container form .field select {
  border: 1px solid #afafaf;
  border-radius: 6px;
  padding: 12px 18px;
  font-size: 20px;
  color: var(--primary-text);
  width: 400px;
  display:block;

}

.container-nuevatutoria .form-container form .field textarea {
  padding: 12px 18px;
  border-radius: 6px;
  border: 1px solid #afafaf;
   font-size: 1.3em;

}
.container-nuevatutoria .form-container form .field button {
  padding: 16px 25px;
  background: linear-gradient(
    45deg,
    var(--gradient-left),
    var(--gradient-right)
  );
  color: var(--white);
  font-size: 22px;
  font-weight: 700;
  border: none;
  border-radius: 6px;
  opacity: 0.87;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.container-nuevatutoria .form-container form .field button:hover {
  opacity: 1;
}

.container-nuevatutoria .btn {
    margin-top: 4em;
    width: 360px;
    border-radius: 5px;
    border: none;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color: #ffffff;
    background: linear-gradient(45deg, #4959ec, #52a4ec);
    padding: 0.74em 0;
    cursor: pointer;
}

@media (max-width: 720px) {
  .container-nuevatutoria .form-container {
    margin: 0;
    padding: 1em;
  }
  .container-nuevatutoria .form-container form .field input,
  .container-nuevatutoria .form-container form .field select,
  .container-nuevatutoria .form-container form .field label,
  .container-nuevatutoria .form-container form .field textarea,
  .container-nuevatutoria .form-container form .field button {
    width: 300px;
  }

  .container-nuevatutoria .btn{
    width: 300px !important;
  }
  .v-select, .v-select *{
    width: 300px !important;
  }
}


</style>
