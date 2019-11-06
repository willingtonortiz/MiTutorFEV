<template>
    <div class="field">
        <p>
        {{topic.name}}
        <button  @click="$emit('del-topic',topic.id)" class="del">x</button>
        </p>
    </div>

</template>

<script>
export default {
    name:'TopicElement',
    props: ["topic"],
}
</script>

<style scoped>
  .field {
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
</style>