//1定义state函数返回对象 名称不能修改
export const state=()=>({
// this.$store.state.user.userinfo.user.nickname
userinfo:{
    token:'',
    user:{}
}
});
//定义mutations
export const mutations={
    setUser(state,userinfo){
        state.userinfo=userinfo;
    }
}
// 3定义actions负责异步
export const actions={
    setUser(context,form){
        this.$axios.post('accounts/login',form)
        .then(res=>{
            context.commit('setUser',res.data);
              // 把 用户信息 存入 本地存储中
localStorage.setItem('userinfo',JSON.stringify(res.data))
        })
    }
}