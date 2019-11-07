<template>
  <div class="register_form">
    <div style="margin-top: 20px;"></div>
    <el-form :rules="rules" :model="form" ref="form" label-width="20px">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="form.captcha" placeholder="验证码">
          <template slot="append">
            <div @click="sendCaptcha">发送验证码</div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input v-model="form.password2" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        @click="submitForm"
        style="width:96%;margin-left:17px;margin-bottom:30px"
      >注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password2) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "15976822482",
        captcha: "000000",
        nickname: " 13800138000",
        password: "123456",
        password2: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 11, max: 11, message: "输入正确用户名", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入作者名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请选择密码", trigger: "blur" }],
        password2: [
          {
            validator: validatePass2,
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    sendCaptcha() {
      // console.log(11); 
      //  1 获取 用户的手机号码
      let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
      if (reg.test(this.form.username)) {
        this.$axios.post("/captchas", { tel: this.form.username }).then(res => {
          console.log(res);
        });
      } else {
        this.$message.warning("手机号不符合");
      }
    },
    //点击注册
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //1构造表单，发送异步请求
          // 2删除对象的一个属性
          // delete this.form['password2'];
          // 3resForm等于 this.form对象中除了password2属性外的剩下的属性集合=对象
          let { password2, ...resForm } = this.form;
          // console.log(resForm);

          this.$axios.post("/accounts/register", resForm).then(
            res => {
            console.log(res)
              //4跳转到登录页面
              // 4.1子向父传参 跳转
              // 4.2currentIndex 和路由上的参数参数关联
              //  1 nuxt 中路由的知识 （关于如何创建页面 ）
           this.$message.success('注册成功');
           setTimeout(() => {
             this.$router.push('/user/login/0');
           }, 500);
           }
          );
        } else {
          console.log("输入不合法");

          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.register_form {
  width: 95%;
}
</style>