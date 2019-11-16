<template>
  <div style="padding:1em">
    <header>
      <router-link to="/">
        <img src="../assets/images/logo.png" />
      </router-link>
    </header>
    <div class="container-subscription">
      <div class="subscription-body">

        
        <img src="../assets/images/Suscripcion.png" alt="">

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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SubscriptionDTO } from "../Models/SubscriptionDTO";
import { subscription } from "../Services/UserService";
import AuthenticationService from "../Services/AuthenticationService";
import { UserCredentials } from "../dtos/UserCredentials";
export default Vue.extend({
  name: "Subscription",
  data(): SubscriptionDTO {
    return {
      userId: AuthenticationService.userValue.id,
      creditCard: "",
      ccv: "",
      expirationDate: ""
    };
  },
  methods: {
    async subscription(): Promise<any> {
      if (this.userId && this.creditCard && this.ccv && this.expirationDate) {
        let subscriptionDTO: SubscriptionDTO = {
          userId: this.userId,
          ccv: this.ccv,
          expirationDate: this.expirationDate,
          creditCard: this.creditCard
        };

        await subscription(subscriptionDTO).then(() => {
          const user: UserCredentials = AuthenticationService.userValue;
          user.role = "tutor";
          localStorage.setItem("currentUser", JSON.stringify(user));

          this.$router.push("/home");
        });
      }
    }
  }
});
</script>

<style lang="scss">
.container-subscription {
  width: 80%;
  margin: 0 auto;
}
.subscription-body h2 {
  color: $green;
}
.subscription-body p {
  color: $primary-text;
  opacity: 0.87;
}
.subscription-body .subscription-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  margin: 1em auto 0 auto;
}

.subscription-body .subscription-form .field {
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;
}
.subscription-body .subscription-form .field label {
  text-align: left;
  margin-bottom: 0.5em;
}
.subscription-body .subscription-form .field input {
  width: 300px;
  border-radius: 4px;
  border: 1px solid #bfbdbf;
  padding: 12px 22px;
  font-size: 18px
}
.subscription-body .subscription-form button {
  margin-top: 1em;
  background: $green;
  color: $white;
  border: none;
  width: 300px;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 8px 24px #2fe49aaa
}
@media (max-width: 720px) {
  header {
    margin-bottom: 1em !important;
  }
  .container-subscription {
    width: 100%;
  }

  .subscription-body .subscription-form {
    margin: 1em auto 0 auto;
  }
  .container-subscription h2 {
    margin: 0.5em 0;
  }
}
</style>