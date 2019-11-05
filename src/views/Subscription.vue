<template>
  <div class="container-subscription">
    <div class="subscription-body">
      <h2>Bienvenido a la membresía mi tutor</h2>
      <p>Necesitamos que completes algunos datos para el pago de tu suscripción como tutor</p>
      <form @submitForm="subscription" class="subscription-form">
        <div class="field">
          <label>Tarjeta de crédito</label>
          <input
            type="number"
            required
            v-model="creditCard"
            placeholder="Ingrese su tarjeta de crédito"
          />
        </div>

        <div class="field">
          <label>CCV</label>
          <input type="number" required v-model="ccv" placeholder="Ingrese su CCV" />
        </div>

        <div class="field">
          <label>Fecha de expireacion</label>
          <input
            type="text"
            required
            v-model="expirationDate"
            placeholder="Ingrese su fecha de expiracion"
          />
        </div>

        <button v-on:click="subscription" type="button">Subscribirme</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SubscriptionDTO } from "../Interfaces/SubscriptionDTO";
import {  subscription} from "../Services/UserService";
export default Vue.extend({
  name: "Subscription",
  data(): SubscriptionDTO {
    return {
      userId: 8,
      creditCard: "",
      ccv: "",
      expirationDate: ""
    };
  },
  methods: {
    async subscription(): Promise<any> {

        if(
            this.userId &&
            this.creditCard &&
            this.ccv &&
            this.expirationDate 
        ){
            let subscriptionDTO:SubscriptionDTO = {
                userId:this.userId,
                ccv:this.ccv,
                expirationDate:this.expirationDate,
                creditCard:this.creditCard
            }

            await subscription(subscriptionDTO);
        }
    }
  }
});
</script>

<style lang="scss">
    .container-subscription{
        width: 80%;
        margin: 0 auto;



    }
    .subscription-body h2{
        color: $primary-color;

    }
    .subscription-body p{
        color: $primary-text;
        opacity: .87;
    }
    .subscription-body .subscription-form{
        
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: fit-content;
        margin:  4em auto 0 auto;
    }

    .subscription-body .subscription-form .field{
        display: flex;
        flex-direction: column;
        margin: .5em 0;
    }
    .subscription-body .subscription-form .field label{
        text-align: left;
        margin-bottom: .5em;
    }
    .subscription-body .subscription-form .field input{
        width: 300px;
        border-radius: 4px;
        border: 1px solid #bfbdbf;
        padding: 12px 12px;
        
    }
    .subscription-body .subscription-form button{
        margin-top: 1em;
        background: $primary-color;
        color: $white;
        border: none;
        width: 300px;
        padding:  12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 18px;
        font-weight: 600;

    }
</style>