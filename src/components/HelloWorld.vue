<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ reversedMessage }}</h1>

    <input type="text" v-model="msg" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  private msg: string;

  constructor() {
    super();
    this.msg = "";
  }

  get reversedMessage(): string {
    return this.msg
      .split("")
      .reverse()
      .join("");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
