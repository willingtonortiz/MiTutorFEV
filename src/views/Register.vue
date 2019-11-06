<template>
  <div class="register-container">
    <header>
      <div class="logo">
        <a>
          <img src="../assets/images/logo.png" />
        </a>
      </div>

      <div class="field-login">
        <a>
          <button>Ingresar</button>
        </a>
      </div>
    </header>

    <div class="register-body">
      <form @submitForm="checkForm" class="register-cont">
        <h2>Registro</h2>

        <div class="field">
          <label>Nombres</label>
          <input required v-model="name" name="Name" placeholder="Ingrese sus nombres" />
        </div>

        <div class="field">
          <label>Apellidos</label>
          <input required v-model="lastname" name="Lastname" placeholder="Ingrese sus apellidos" />
        </div>
        <div class="field">
          <label>Carrera</label>
          <input required v-model="career" name="Career" placeholder="Ingrese su carrera" />
        </div>

        <div class="field">
          <label>Correo electrónico</label>
          <input
            required
            v-model="email"
            v-bind:class="{'not-valid':isEmailExist}"
            v-on:focusout="validateEmail"
            type="email"
            name="Email"
            placeholder="Ingrese sus email"
          />
          <p
            v-if="isEmailExist"
            style="color:#ff4766; margin-top:0.5em; font-size:16px;"
          >Este correo ya existe, por favor ingrese uno diferente</p>
        </div>

        <div class="field">
          <label>Universidad</label>
          <select required v-model="university" name="University">
            <option v-for="u in universities" :value="u.universityId" v-bind:key="u.id">{{u.name}}</option>
          </select>
        </div>

        <div class="field">
          <label>Semestre</label>
          <select required v-model="semester" name="Semester">
            <option value="1">Primer ciclo</option>
            <option value="2">Segundo ciclo</option>
            <option value="3">Tercer ciclo</option>
            <option value="4">Cuarto ciclo</option>
            <option value="5">Quinto ciclo</option>
            <option value="6">Sexto ciclo</option>
            <option value="7">Septimo ciclo</option>
            <option value="8">Octavo ciclo</option>
            <option value="9">Noveno ciclo</option>
            <option value="10">Décimo ciclo</option>
          </select>
        </div>

        <div class="field">
          <label>Usuario</label>
          <input
            required
            v-model="username"
            name="Username"
            placeholder="Ingrese su nombre de usuario"
            v-on:focusout="validateUsername"
            v-bind:class="{'not-valid':isUsernameExist}"
          />
          <p
            v-if="isUsernameExist"
            style="color:#ff4766; margin-top:0.5em; font-size:16px;"
          >Este usuario ya existe, por favor ingrese uno diferente</p>
        </div>

        <div class="field">
          <label>Contraseña</label>
          <input
            required
            v-model="password"
            type="password"
            name="Password"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div class="field">
          <button v-on:click="checkForm" type="button">Registrarme</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { UserRegister } from "../Models/UserRegister";
import { RegisterUser, isUsername, isEmail } from "../Services/UserService";
import { User } from "../Models/User";
import { Person } from "../Models/Person";

import { UniversityService } from "../Services/UniversityService";
export default Vue.extend({
  name: "Register",
  data(): UserRegister {
    return {
      name: "",
      lastname: "",
      career: "",
      email: "",
      university: 1,
      universities: [],
      semester: 1,
      username: "",
      password: "",
      isUsernameExist: false,
      isEmailExist: false
    };
  },
  async created() {
    let uniService = new UniversityService();

    this.universities = await uniService.getUniversities();
  },

  methods: {
    async checkForm(): Promise<any> {
      if (
        this.name &&
        this.lastname &&
        this.career &&
        this.email &&
        this.university &&
        this.semester &&
        this.username &&
        this.password &&
        !this.isUsernameExist &&
        !this.isEmailExist
      ) {
        type UserCreated = User & Person;

        let newUser: UserCreated = {
          username: this.username,
          password: this.password,
          email: this.email,
          name: this.name,
          lastName: this.lastname,
          semester: this.semester,
          universityId: this.university
        };

        console.log(newUser);
        await RegisterUser(newUser).then(() => {
          this.$router.push("/login");
        });
      }
    },
    async validateUsername(): Promise<any> {
      setTimeout(async () => {
        await isUsername(this.username).then((data: any) => {
          if (data) {
            this.isUsernameExist = true;
          } else {
            this.isUsernameExist = false;
          }
        });
      }, 200);
    },
    async validateEmail(): Promise<any> {
      setTimeout(async () => {
        await isEmail(this.email).then((data: any) => {
          if (data) {
            this.isEmailExist = true;
          } else {
            this.isEmailExist = false;
          }
        });
      }, 200);
    }
  }
});
</script>

<style lang="scss">
.not-valid {
  border: 1px solid #ff4766 !important;
}

.register-container {
  padding: 2.5em;
}

.register-container header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-container .field-login button {
  color: $white;
  background: $primary-color;
  text-align: center;
  padding: 12px 0;
  width: 200px;
  border-radius: 4px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 1.25em;
}

.register-container .register-body .field {
  display: flex;
  flex-direction: column;
  margin: 1.25em 0;
  text-align: left;
}

.register-container .register-body h2 {
  display: flex;
  justify-content: flex-start;
}

.register-container .register-body .register-cont .field label {
  color: $primary-text;
  opacity: 0.67;
  font-weight: 600;
  text-align: left;
  margin-bottom: 0.5em;
}

.register-container .register-body .field input:focus {
  border: 1px solid $primary-color;
}

.register-container .register-body .field input {
  width: 250px;
  padding: 12px;
  border: 1px solid #bfbfbf;
  color: $primary-text;
  font-size: 18px;
  border-radius: 6px;
}

.register-container .register-body .field select {
  width: 450px;
  padding: 12px;
  border: 1px solid #bfbfbf;
  color: $primary-text;
  font-size: 18px;
  border-radius: 6px;
}

.register-body .field:last-child {
  margin-top: 2em !important;
}

.register-container .register-body .field button {
  color: $white;
  background: $primary-color;
  text-align: center;
  padding: 12px 0;
  width: 200px;
  border-radius: 4px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 1.25em;
}
</style>
