<template>
  <div class="container-tutoriaDetail-master">
    <header>
      <div class="avatar-profile" style="margin-bottom:2%">
        <h2 class="avatar-title">Jair Huaman</h2>
        <p class="avatar-rol">Estudiante</p>
      </div>
    </header>
    <div class="container-tutoria-details">
      <div class="details">
        <h2>{{TutoringOffer.course}}</h2>

        <div class="div1">
          <div class="detail">
            <p class="label-detail">Inicio</p>
            <p class="text-detail">{{TutoringOffer.startTime}}</p>
          </div>

          <div class="detail">
            <p class="label-detail">Fin</p>
            <p class="text-detail">{{TutoringOffer.endTime}}</p>
          </div>

          <div class="detail">
            <p class="label-detail">Descripcion</p>
            <p class="text-detail">{{TutoringOffer.description}}</p>
          </div>

          <div class="detail">
             <p class="label-detail">Universidad</p>
            <p class="text-detail">{{TutoringOffer.university}}</p>
          </div>
        </div>

      </div>

    </div>
    
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { TutoringOfferResponse } from "../dtos/output/TutoringOfferResponse";
import { TutoringOfferService } from "../Services/TutoringOfferService";

export default Vue.extend({
  name: "TutoringOffer",
  data() {
    return {
      TutoringOffer: {
        TutoringOfferId: null,
        Course: "",
        Tutor: "",
        Description: "",
        University: "",
        StartTime: null,
        EndTime: null,
        Capacity: null,
        Topics: [],
        Sessions: []
      } as TutoringOfferResponse
    };
  },
  methods: {
      sessionDetail(index){
          this.$router.push({name: 'tutoringSession',  params: { id: index , TutoringSessionAux: this.TutoringOffer.sessions[index]}});
      }
  },

  async created() {
    let offerService: TutoringOfferService = new TutoringOfferService();
    this.TutoringOffer = await offerService.findById(this.$route.params.id);
  }
});
</script>






<style scoped>
.container-tutoriaDetail-master {
  background: var(--main-background);
  margin-top: 2%;
}

.container-tutoria-details {
  text-align: left;
  width: 80%;
  margin: 0 auto;
  justify-content: space-between;
  margin-top: 1em;
}
.container-tutoria-details .details h2 {
  font-size: 2.5em;
  margin-bottom: 1em;
}

.container-tutoria-details .details .detail {
  margin: 1em 0;
}
.container-tutoria-details .details .detail .label-detail {
  font-size: 22px;
  color: var(--primary-text);
  opacity: 0.67;
}

.container-tutoria-details .details .detail .text-detail {
  font-size: 22px;
  font-weight: 600;
  color: var(--primary-text);
}

.container-tutoria-details .details .detail .university-detail {
  font-size: 22px;
  font-weight: 600;
  color: var(--primary-text);
  text-align: center;
}

.container-tutoria-details .submit-reserva {
  margin-top: 2em;
}

.container-tutoria-details .submit-reserva input {
  border: none;
  font-size: 22px;
  font-weight: bold;
  color: var(--white);
  padding: 12px 32px;
  background: var(--primary-color);
  border-radius: 6px;
  opacity: 0.87;
  cursor: pointer;
  transition: all 0.2s ease-in;
}
.container-tutoria-details .submit-reserva input:hover {
  opacity: 1;
}

.container-tutoria-details .info .card-tutor,
.container-tutoria-details .info .card-infotutoria {
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: 6px;
  padding: 2em 3em;
  margin-bottom: 2em;
}

.container-tutoria-details .info .card-tutor .tutor-name,
.card-infotutoria .title {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-text);
  margin: 0.75em 0;
  text-align: center;
}

.container-tutoria-details .info .card-tutor > div,
.card-infotutoria .score {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container-tutoria-details .score-info-tutor .score,
.card-infotutoria .score p:first-child {
  font-size: 32px;
  font-weight: bold;
  color: var(--primary-color);
}
.container-tutoria-details .score-info-tutor p:last-child {
  color: var(--primary-text);
  opacity: 0.67;
}

.container-tutoria-details .card-tutor .navigate-profile {
  margin-top: 2em;
}
.container-tutoria-details .card-tutor .navigate-profile a {
  background: var(--primary-color);
  padding: 0.75em 3em;
  color: var(--white);
  font-size: 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  opacity: 0.87;
  transition: all 0.2s ease-out;
}
.container-tutoria-details .card-tutor .navigate-profile a:hover {
  opacity: 1;
}

.similar .card-tutoria {
  margin: 2em 0;
  display: flex;
  flex-direction: column;
  width: fit-content;
  border-radius: 6px;
  background: var(--white);
  padding: 12px 2em;
  margin-right: 2em;
  transition: all 0.2s ease-out;
  cursor: pointer;
}
.similar .card-tutoria:hover {
  box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.06);
}

.events-afeterReserved {
  margin-top: 2em;
}
.events-afterReserved button {
  background: rgba(78, 131, 237, 0.64);
  color: var(--white);
  font-size: 22px;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  padding: 12px 2em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.events-afterReserved button:hover {
  background: rgba(78, 131, 237, 0.87);
}
</style>