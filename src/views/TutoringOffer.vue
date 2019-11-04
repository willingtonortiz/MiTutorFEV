<template>
    
  <div class="container-tutoriaDetail-master">
   
    <Header></Header>

    <div class="container-tutoria-details">
      <div class="details">
        <h2>{{TutoringOffer.course}}</h2>

        <div class="div1">
          <div class="detail">
            <p class="label-detail">Inicio</p>
            <p class="text-detail">{{TutoringOffer.startTime | simpleDate}}</p>
          </div>

          <div class="detail">
            <p class="label-detail">Fin</p>
            <p class="text-detail">{{TutoringOffer.endTime | simpleDate}}</p>
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
import  Header from "../components/Header.vue";

export default Vue.extend({
  name: "TutoringOffer",
  components :{Header},
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
  filters:{
    simpleDate: function(value: Date): string {    
        return new Date(value).toLocaleString();
    }
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




</style>