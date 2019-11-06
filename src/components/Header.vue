<template>
  <header class="nav">
    <div class="logo">
        <img src="../assets/images/logo.png" alt="" />
    </div>
    <div class="searchbar">

        <input type="text" placeholder="buscar algun curso">
    </div>
    <div class="avatar">
        <h2>Jair Huaman Bellido</h2>
    </div>
  </header>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Heade"
});
</script>

<style>
.nav{
    display: flex;
}

</style>