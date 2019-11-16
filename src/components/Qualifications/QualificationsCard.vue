<template>
  <div class="qualification-comment-container">
      <div class="avatar-student">
        <img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" width="48" height="48" alt="">
        <p>{{qualification.fullName}}</p>
      </div>
      <div class="comment">
        <p>{{qualification.comment}}</p>

      </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "QualificationCard",
    props: ["qualification"]
});
</script>

<style>

    .qualification-comment-container{
        width: 400px;
        position: relative;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        padding: 16px 12px;
        border-radius: 4px;
        margin: 1em 0;
        box-shadow: 0 0 24px rgba(0,0,0,.098);
    }
    .qualification-comment-container .avatar-student{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .qualification-comment-container .avatar-student img{
        margin-right: 1em;
    }
    .qualification-comment-container .avatar-student p{
        font-size: 24px;
        font-weight: 600;
    }
    .qualification-comment-container .comment{
        margin-top: .2em;
        font-size: 18px;
        opacity: .67;
        text-align: left;
        margin-left: 68px;
    }

</style>