<template>
  <div class="comment">
     <!-- 通过名称可以调用组件,调用的方式与使用标签无异 -->
       <!-- @wirtecomment='sendcomment':说明以后这个组件会发起这样的事件，相当于一个事件注册 -->
    <mypostcomment v-if="comment.parent" :comment="comment.parent"
    @wirtecomment='wirtecomment(comment)'
    ></mypostcomment>

    <span>{{comment.account.username}}</span> &nbsp;
    <i>2019-11-04 5:12</i>
    <div class="commentpic">
      <!-- <img :src="'http://127.0.0.1:1337'+comment.pics" alt/> -->
      <!-- <div class="img"><img src="@/static/1.png" alt /></div> -->
      <div class="twocomment">{{comment.content}}</div>
    </div>
   <div class="huifu" @click='wirtecomment(comment)'> <a href="javascript:" >回复</a></div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
  name: "mypostcomment",
  data() {
    return {
      show: false
      //   commentList: [],
      //   comment:{}
    };
  },
  mounted() {
    //   console.log(this.comment)
    if (this.comment.pics.length >= 1) {
      this.show = true;
    }
   
  },
  methods:{
    wirtecomment(comment){
      console.log(comment)
let follow=comment.id
let username=comment.account.username
// console.log(username)
// console.log(follow)
      this.$emit('wirtecomment',{id:follow,username:username})
    }
  },
}

</script>
<style lang="less" scoped>
.comment {
  // height: 100px;
  // background-color: #000;
  margin: 3px 20px;
  border: 1px #ccc solid;
  background-color: rgb(249, 249, 249);
 

  .commentpic {
    padding: 10px 0 20px 40px;
    // box-sizing: border-box;
    display: flex;

    .img {
      border: 1px dashed #ccc;
      width: 190px;
      height: 190px;
      padding: 5px;
      // box-sizing: border-box;
    }
  }
  .huifu{
    text-align: right;
  padding-right: 10px;
  font-size: 12px;
  a{
  color: rgb(249, 249, 249);

  }
  &:hover{
    a{
    color: #ccc;
    }
  }
  }
  i {
    font-style: normal;
    color: #666;
    font-size: 12px;
    font-weight: 300;
  }
}
</style>