<template>
  <div class="hello">
    <h1>Weather Forest</h1>

    <div v-for="(item, index) in items" v-bind:key="index">
      <p>TemperatureC: {{item.temperatureC}}</p>
      <p>TemperatureF: {{item.temperatureF}}</p>
      <p>Summary: {{item.summary}}</p>
      <p>Datetime: {{item.date}}</p>
    </div>

    <button @click="reload">Reload</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
  props: {}
})
export default class WeatherForest extends Vue {
  private items: Array<any>;

  constructor() {
    super();
    this.items = [];
  }

  mounted() {
    this.fetchData();
  }

  reload() {
    this.fetchData();
  }

  fetchData() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
