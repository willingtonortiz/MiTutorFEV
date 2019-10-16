<template>
    
   <div class="containerLogin">

    <div class="login-view">
        <header>
            <img src="../assets/logo.png" />
        </header>

        <div class="form-login">
            <div class="header-login">
                <h2>Login</h2>
                <div class="line"></div>
            </div>

            <form  method="post">

                <div></div>

                <div class="field">
                    <label>Usuario o correo</label>
                    <input placeholder="Ingrese su usuario o correo" />
                    
                </div>

                <div class="field">
                    <label>Contraseña</label>
                    <input type="password" placeholder="Ingrese su contraseña" />
                    
                </div>

                <div class="field">
                    <button type="submit">Ingresar</button>
                </div>

            </form>
        </div>
    </div>

    <div class="register-view">
        <img src="../assets/RegisterArt1.svg" />

        <h2>Estudiante Nuevo</h2>
        <p>Puedes registrarte de manera gratuita y disfrutar de muchos beneficios</p>

        
        <router-link to="/register">
        <button>Registrarme</button>
        </router-link>
    </div>

</div>



</template>


<style lang="scss">


.containerLogin{
    & .login-view header{ 
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
}

.containerLogin{
    width: 100vw;
    height: 100vh;
    display: flex;
    background: #ffffff;
}
.containerLogin > div{
    width: 50%;
    padding: 3em;
}


.form-login{
    margin-top: 120px;
    margin-left: 180px;
}

.form-login h2{
    color: $primary-color;
    font-size: 39px;
    margin-bottom: .15em;
    text-align: left;
}
.form-login .line{
    width: 100px;
    border-radius: 100px;
    height: 6px;
    background: $primary-color;
    opacity: .3;

}
.form-login form{
    margin-top: 3em;
    

}
.form-login form .field{
    display: flex;
    flex-direction: column;
    margin: 1.25em 0;
}
.form-login form .field label{
    font-size: 18px;
    font-weight: 600;
    color: $primary-text;
    opacity:.67;
    margin-bottom: .5em;
    text-align: left;
}

.form-login form .field input{
    padding: 12px 24px;
    width: 360px;
    font-size: 18px;
    color: $primary-text;
    border-radius: 6px;
    border: 1px solid #bfbfbf;
}

.form-login form .field input:focus{
    border: 1px solid $primary-color;
}

.form-login form .field button{
    margin-top: 4em;
    width: 360px;
    border-radius: 5px;
    border: none;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color: $white;
    background: linear-gradient(45deg, $gradient-left, $gradient-right);
    padding: .74em 0;
    cursor: pointer;
}

.containerLogin .register-view{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 3em;
}

.register-view h2{
    margin: 1em 0 0 0;
    font-size: 24px;
    color: $primary-text;
}
.register-view p{
    color: $primary-text;
    opacity: .87;
    font-size: 18px;
    width: 540px;
    text-align: center;
}

.register-view button{
    margin-top: 4em;
    width: 360px;
    border-radius: 5px;
    border: none;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color: $white;
    background: $green; 
    padding: .74em 0;
    cursor: pointer;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";


export default class Login extends Vue{}
</script>