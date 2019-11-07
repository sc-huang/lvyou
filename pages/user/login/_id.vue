<template>
  <div class="login">
    <div class="login_main">
      <div class="login_main_title">
        <div class="title_item" 
        
        :class="currIndex==index? 'active':''"
        @click="$router.push('/user/login/'+index)"
        v-for="(item,index) in ['登录','注册']" 
        :key="index">{{item}}</div>
      </div>
      <div class="login_main_content">
<!-- 登录组件 -->
<div v-if="currIndex==0">
<LoginForm/>
</div>
<div v-else>
  <RegisterForm/>

</div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/user/LoginForm'
import RegisterForm from '@/components/user/RegisterForm'
export default {
  data(){
    return{
      currIndex:this.$route.params.id
    }
  },
  components:{
    LoginForm,
    RegisterForm
  }
};
</script>
<style lang="less" scoped>
.login {
  height: 700px;
  min-width: 1000px;
  background: url(http://127.1:1337/assets/images/th03.jfif) center center;
  position: relative;
}
.login_main {
  position: absolute;
  background-color: #fff;
  width: 400px;
  top: 50%;
  left: 60%;
  transform: translate(-30%, -50%);
  .login_main_title {
    display: flex;
    flex: 1;
    height: 50px;
  }
  .title_item {
    color: #666;
    display: flex;
    width: 200px;
    justify-content: center;
    align-items: center;
    background-color: #eee;
  }
  .active{
    color:orange;
    background: #fff;

  }
  .login_main_content{
    width: 100%;
    // height: 100px;
    background-color: #fff;
  }
}
</style>