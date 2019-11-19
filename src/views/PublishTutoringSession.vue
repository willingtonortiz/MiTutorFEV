<template>
  <div class="container-nuevatutoria">
    <div class="form-container">
      <h2>Nueva sesion</h2>

      <form>
        <div class="field">
          <label for>Ubicacion</label>
          <input
            type="text"
            v-model.trim="$v.TutoringSession.Place.$model"
            name="Ubicacion"
            placeholder="Ingrese la ubicacion"
          />
          <span
            v-if="!$v.TutoringSession.Place.required && (this.$v.TutoringSession.Place.$dirty || !validated)"
          >Este campo es obligatorio</span>
        </div>

        <div class="field">
          <label for>Fecha</label>
          <input
            type="date"
            v-model.trim="$v.SessionDate.$model"
            name="FechaSesion"
            placeholder="Ingrese la fecha"
          />
          <span
            v-if="!$v.SessionDate.required && (this.$v.SessionDate.$dirty || !validated)"
          >Este campo es obligatorio</span>
        </div>

        <div class="field">
          <label for>Hora de inicio</label>
          <input
            type="time"
            v-model.trim="$v.StartOfferTime.$model"
            name="HoraInicio"
            placeholder="Ingrese la fecha"
          />

          <div v-if="this.$v.StartOfferTime.$dirty || !validated">
            <span v-if="!$v.StartOfferTime.required">Este campo es obligatorio</span>
          </div>
        </div>

        <div class="field">
          <label for>Hora de fin</label>
          <input
            type="time"
            v-model.trim="$v.EndOfferTime.$model"
            name="HoraFin"
            placeholder="Ingrese la fecha"
          />

          <div v-if="this.$v.EndOfferTime.$dirty || !validated">
            <span v-if="!$v.EndOfferTime.required">Este campo es obligatorio</span>
          </div>
        </div>

        <div class="field">
          <label for>Precio</label>
          <input
            type="text"
            v-model.trim="$v.TutoringSession.Price.$model"
            name="Precio"
            placeholder="Ingrese el precio"
          />

          <div v-if="this.$v.TutoringSession.Price.$dirty || !validated">
            <span v-if="!$v.TutoringSession.Price.required">Este campo es obligatorio</span>
            <span v-if="!$v.TutoringSession.Price.checkPrice">Ingrese un precio valido</span>
          </div>
        </div>

        <div class="field">
          <label for>Descripción</label>
          <textarea
            name="Description"
            v-model.trim="$v.TutoringSession.Description.$model"
            cols="30"
            rows="10"
          >Este campo es obligatorio</textarea>
          <span
            v-if="!$v.TutoringSession.Description.required && (this.$v.TutoringSession.Description.$dirty || !validated)"
          >Este campo es obligatorio</span>
        </div>

        <div class="field">
          <label for>Seleccione un tema</label>
          <v-select
            class="style-chooser"
            v-model="selected"
            :options="TopicsByCourse"
            @input="onSelection"
          ></v-select>
          <span
            v-if="!$v.TopicsSelected.required && (this.$v.TopicsSelected.$dirty || !validated)"
          >Este campo es obligatorio</span>
        </div>
      </form>

      <div v-if="TopicsSelected.length>0">
        <div v-for="topic in TopicsSelected" :key="topic.id">
          <ElementList v-bind:element="topic.name" v-on:del-element="deleteTopic(topic.id)"></ElementList>
        </div>
      </div>

      <div class="field">
        <button class="btn" v-on:click="addSessionAux" style="width:100%; margin-bottom:5%">
          <p v-if="!update">Crear sesion</p>
          <p v-else>Actualizar sesion</p>
        </button>
      </div>

      <div v-if="SessionsCreated.length>0">
        <hr />
        <h2 style="margin-top:5%">Sesiones creadas</h2>
        <div class="sessionscreated" v-for="(e,index) in SessionsCreated" :key="index">
          <p>
            Session N°:
            {{index}}
            <button v-on:click="updateSession(index)" class="upd">x</button>
            <button v-on:click="deleteSessionAux(index)" class="del">x</button>
          </p>
        </div>
      </div>

      <div class="field" style="margin-top:5%;">
        <div style="float:left; margin-right:5%; ">
          <button
            v-on:click="publish"
            class="btn"
            style="width: 325px; margin-top:0%"
          >Publicar oferta</button>
        </div>
        <div>
          <button v-on:click="cancel" class="btn" style="width: 335px; margin-top:0%">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapActions, mapGetters } from "vuex";
import { TutoringOfferRequest } from "../Models/TutoringOfferRequest";
import { TutoringSessionRequest } from "../Models/TutoringSessionRequest";
import { TutoringOfferService } from "../Services/TutoringOfferService";
import { Topic } from "../Models/Topic";
import { required } from "vuelidate/lib/validators";
import ElementList from "../components/PublishTutoring/ElementList.vue";
import AuthenticationService from "../Services/AuthenticationService";

function containsTopic(id, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return true;
    }
  }
  return false;
}

function checkPrice(price) {
  let testPrice = +price;

  if (!isNaN(testPrice)) {
    return true;
  } else {
    return false;
  }
}

const addLeft0 = number => {
  number = number.toString();
  number.length > 1 ? number : (number = "0" + number);

  return number;
};

const checkTimes = (start,end) => {
  
};

export default Vue.extend({
  name: "PublishTutoringSession",
  computed: mapGetters(["TutoringOfferCourse", "GetTutoringOffer"]),
  components: { vSelect, ElementList },

  data() {
    return {
      TutoringSession: {
        Place: "",
        StartTime: null,
        EndTime: null,
        Description: "",
        Price: null,
        Topics: [],
        TutorId: AuthenticationService.userValue.id
      } as TutoringSessionRequest,

      SessionDate: null,
      StartOfferTime: null,
      EndOfferTime: null,
      TopicsByCourse: [],
      TopicsSelected: [],
      selected: null,
      validated: true,
      SessionsCreated: [],
      update: false,
      sessionUpdateIndex: null
    };
  },

  validations: {
    TutoringSession: {
      Place: {
        required
      },
      Price: {
        required,
        checkPrice
      },
      Description: {
        required
      }
    },
    SessionDate: {
      required
    },
    EndOfferTime: {
      required
    },
    StartOfferTime: {
      required
    },
    TopicsSelected: {
      required
    }
  },

  methods: {
    ...mapActions(["addSession", "deleteSession", "reset"]),

    checkForm: function() {
      if (
       ((this.$v.TutoringSession.Place.$error ||
        this.$v.TutoringSession.Price.$error ||
        this.$v.TutoringSession.Description.$error ||
        this.$v.SessionDate.$error ||
        this.$v.EndOfferTime.$error ||
        this.$v.StartOfferTime.$error ||
        this.$v.TopicsSelected.$error) ||
        (!this.$v.TutoringSession.Place.$dirty ||
          !this.$v.TutoringSession.Price.$dirty ||
          !this.$v.TutoringSession.Description.$dirty ||
          !this.$v.SessionDate.$dirty ||
          !this.$v.EndOfferTime.$dirty ||
          !this.$v.StartOfferTime.$dirty ||
          this.TopicsSelected.length==0)) 
          && !this.update 
      )
        this.validated = false;
      else this.validated = true;
    },

    clean() {
      this.TutoringSession = {
        Place: "",
        StartTime: null,
        EndTime: null,
        Description: "",
        Price: null,
        Topics: [],
        TutorId: null
      };

      this.SessionDate = null;
      this.EndOfferTime = null;
      this.StartOfferTime = null;
      this.TopicsSelected = [];
      this.selected = null;
      this.validated = true;
      this.$v.$reset();
    },

    addSessionAux() {
      this.checkForm();

      if (this.validated) {

        let startTimeAux: Date = new Date(
          this.SessionDate + " " + this.StartOfferTime
        );
        let endTimeAux: Date = new Date(
          this.SessionDate + " " + this.EndOfferTime
        );

        console.log(startTimeAux.getUTCDate);
        console.log( endTimeAux);

        this.TutoringSession.StartTime = startTimeAux;
        this.TutoringSession.EndTime = endTimeAux;

        for (let i = 0; i < this.TopicsSelected.length; ++i) {
          this.TutoringSession.Topics.push(this.TopicsSelected[i].id);
        }

        if (this.update) {
          this.SessionsCreated[this.sessionUpdateIndex] = this.TutoringSession;
          this.sessionUpdateIndex = null;
          this.update = false;
        } else {
          this.SessionsCreated.push(this.TutoringSession);
        }

        this.clean();
      }
    },

    onSelection(value) {
      console.log(value);

      if (!containsTopic(this.selected.value, this.TopicsSelected)) {
        this.TopicsSelected.push({
          id: this.selected.value,
          name: this.selected.label
        });
      }
    },

    deleteTopic(id) {
      this.TopicsSelected = this.TopicsSelected.filter(x => x.id !== id);
    },

    deleteSessionAux(index) {
      this.SessionsCreated.splice(index, 1);
    },

    publish() {
      if (this.SessionsCreated.length > 0) {
        let tutoringOfferObj: TutoringOfferRequest = this.$store.getters
          .GetTutoringOffer;
        let offerService = new TutoringOfferService();

        tutoringOfferObj.TutoringSessionRequests = this.SessionsCreated;
        console.log("Publicando la oferta completa");
        console.log(tutoringOfferObj);
        offerService.createTutoringOffer(tutoringOfferObj);
        this.cancel();
      } else {
        this.errors.push("Debe de haber minimo una sesion");
      }
    },

    cancel() {
      this.reset();
      this.$router.push({ name: "home" });
    },

    updateSession(index) {
      this.TutoringSession = this.SessionsCreated[index];

      for (let i = 0; i < this.TopicsByCourse.length; ++i) {
        for (let j = 0; j < this.TutoringSession.Topics.length; ++j) {
          if (this.TopicsByCourse[i].value === this.TutoringSession.Topics[j]) {
            this.TopicsSelected.push({
              id: this.TopicsByCourse[i].value,
              name: this.TopicsByCourse[i].label
            });
          }
        }
      }
      this.TutoringSession.Topics = [];

      this.update = true;
      this.sessionUpdateIndex = index;

      this.SessionDate =
        this.TutoringSession.StartTime.getFullYear() +
        "-" +
        addLeft0(this.TutoringSession.StartTime.getMonth()) +
        "-" +
        addLeft0(this.TutoringSession.StartTime.getDate());

      this.StartOfferTime =
        addLeft0(this.TutoringSession.StartTime.getHours()) +
        ":" +
        addLeft0(this.TutoringSession.StartTime.getMinutes());
      this.EndOfferTime =
        addLeft0(this.TutoringSession.EndTime.getHours()) +
        ":" +
        addLeft0(this.TutoringSession.EndTime.getMinutes());
    }
  },

  async created() {



    let offerService = new TutoringOfferService();
    let topics: Array<Topic> = await offerService.findTopicsByCourse(
      this.$store.getters.TutoringOfferCourse
    );

    for (let i = 0; i < topics.length; ++i) {
      this.TopicsByCourse.push({
        value: topics[i].id,
        label: topics[i].name
      });
    }
  },

  destroyed() {
    this.reset();
    this.clean();

    (this.TopicsByCourse = []),
      (this.SessionsCreated = []),
      (this.update = false),
      (this.sessionUpdateIndex = null);
  }
});
</script>



<style scoped>
.sessionscreated {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}

.del {
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}

.upd {
  background: #0105f3;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}

.container-nuevatutoria-master {
  background: var(--main-background);
  width: 100%;
  position: relative;
}

.container-nuevatutoria {
  overflow: auto;
  width: 100%;
  position: relative;
  text-align: left;
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
}

.container-nuevatutoria .form-container form .field input,
.container-nuevatutoria .form-container form .field select {
  border: 1px solid #afafaf;
  border-radius: 6px;
  padding: 12px 18px;
  font-size: 20px;
  color: var(--primary-text);
  width: 400px;
}

.container-nuevatutoria .form-container form .field textarea {
  font-size: 1.3em;
  padding: 12px 18px;
  border-radius: 6px;
  border: 1px solid #afafaf;
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
  .v-select,
  .v-select *,
  .container-nuevatutoria .btn {
    width: 300px !important;
  }
}
</style>
