<template>
  <div class="login_form">
    <el-form :model="form" label-position="left" ref="form" label-width="20px">
      <el-form-item >
        <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input placeholder="密码" v-model="form.password"></el-input>
      </el-form-item>
       <el-form-item>
    <el-button type="primary"
              style="width:100%;"
     @click="submitLogin">登录</el-button>
  </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
 data(){
   return{
      form: {
    username: 15976822482,
    password: 123456
  }
   }
 },methods:{
   submitLogin(){
     //token和用户信息存储起来
    //  1vuex中 2存到本地存储中
     this.$store.dispatch('user/setUser',this.form)
     //1弹出提示，
    //  2跳转页面
    this.$message.success('登录成功');
    setTimeout(()=>{
      this.$router.push('/');
    },1000)
   }
 }
};
</script>

<style lang="less" scoped>
.login_form {
  width: 95%;
}
</style>