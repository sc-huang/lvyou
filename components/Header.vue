<template>
  <div class="header">
    <div class="main">
      <div class="main_pages">
        <nuxt-link class="page_logo" to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
        <nuxt-link class="pages_item" to="/">首页</nuxt-link>
        <nuxt-link class="pages_item" to="/post">旅游攻略</nuxt-link>
        <nuxt-link class="pages_item" to="/hotel">酒店</nuxt-link>
        <nuxt-link class="pages_item" to="/air">国内机票</nuxt-link>
      </div>
      <div class="main_login">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-bell"></i>
            消息
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>粟果园</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
       
        <nuxt-link class="login_link" to="/user/login">
          <div v-if="userinfo.token" class="login_user">
            <el-dropdown>
              <div class="el-dropdown-link">
                <img :src="$axios.defaults.baseURL+userinfo.user.defaultAvatar" alt />
                <span>{{userinfo.user.nickname}}</span>
                <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>
                  <div @click="handleLogout">退出</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
           <div
            v-else
            class="login_text"
          >登录 / 注册</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userinfo() {
      return this.$store.state.user.userinfo;
    }
  },
  mounted() {
    let userStr = localStorage.getItem("userinfo");
    if (userStr) {
      // 存在
      let userinfo = JSON.parse(userStr);
      // 把值设置到vuex
      this.$store.commit("user/setUser", userinfo);
    }
  },
  methods: {
    handleLogout() {
      // 1 删除 vuex中的用户信息
      // 2 删除本地存储的数据
      this.$store.commit("user/setUser", { token: "", user: {} });
      localStorage.removeItem("userinfo");
      this.$message.success("退出成功");
      setTimeout(() => {
        this.$router.push("/user/login/0");
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  a {
    text-decoration: none;
    color: inherit;
  }
  .main {
    width: 1000px;
    margin: 0 auto;
    height: 60px;
    display: flex;
    justify-content: space-between;
  }
  .pages_item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    &:hover {
      color: #0099ff;
      position: relative;

      // border-bottom: #0099ff 5px solid
      &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0%;
        width: 100%;
        height: 5px;
        background-color: #0099ff;
      }
    }
  }
  .main_pages {
    display: flex;
  }
  .nuxt-link-exact-active {
    color: #fff !important;
    background-color: #0094ff !important;
  }
  .page_logo {
    background-color: #fff !important;
    padding-right: 10px;

    display: flex;
    align-items: center;
    img {
      width: 156px;
    }
  }
  .main_login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login_link {
      padding-left: 8px;
      font-size: 14px;
      color: #666;
      &:hover {
        color: #0099ff;
      }
    }
  }
}
.login_user {
  .el-dropdown-link {
    img {
      width: 36px;
    }
    display: flex;
    align-items: center;
  }
}
</style>