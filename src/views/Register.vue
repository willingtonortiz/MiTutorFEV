<template>
    <div class="register-container">
        <header>
            <div class="logo">
                <a>
                    <img src="../assets/Logo.svg" />
                </a>
            </div>

            <div class="field-login">
                <a>
                    <button>Ingresar</button>
                </a>
            </div>
        </header>

        <div class="register-body">
            <form
                method="post"
                class="register-cont"
                action="http://localhost:3000/ga"
                enctype="application/json"
            >
                <h2>Registro</h2>

                <div class="field">
                    <label>Nombres</label>
                    <input  name="Name" placeholder="Ingrese sus nombres" />
                </div>

                <div class="field">
                    <label>Apellidos</label>
                    <input  name="Lastname" placeholder="Ingrese sus apellidos" />
                </div>
                <div class="field">
                    <label>Carrera</label>
                    <input name="Career" placeholder="Ingrese su carrera" />
                </div>

                <div class="field">
                    <label>Correo electrónico</label>
                    <input name="Email" placeholder="Ingrese sus email" />
                </div>

                <div class="field">
                    <label>Universidad</label>
                    <select name="University">
                        <option
                            value="Universidad Peruana de Ciencias Aplicadas"
                        >Universidad Peruana de Ciencias Aplicadas</option>
                    </select>
                </div>

                <div class="field">
                    <label>Semestre</label>
                    <select name="Semester">
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
                    <input name="Username" placeholder="Ingrese su nombre de usuario" />
                </div>

                <div class="field">
                    <label>Contraseña</label>
                    <input type="password" name="Password" placeholder="Ingrese su contraseña" />
                </div>
                <div class="field">
                    <button type="submit">Registrarme</button>
                </div>
            </form>
        </div>
    </div>
</template>



<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Register",
 
});
</script>


<style lang="scss">
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
}
.register-container .register-body h2{
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


.register-body .field:last-child{
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