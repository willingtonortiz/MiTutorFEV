<template>
<div class="hello">
    <h1>Count: {{counter}}</h1>
    <button @click="add">+</button>
    <button @click="substract">-</button>
</div>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from "vue-property-decorator";

@Component
export default class Counter extends Vue {
    private counter: number;

    constructor() {
        super();
        this.counter = 0;
    }

    add() {
        this.counter++;
    }

    substract() {
        this.counter--;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
</style>
