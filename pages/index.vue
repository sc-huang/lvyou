<template>
  <div class="xyly_index">
     <el-carousel height="700px">
      <el-carousel-item v-for="(item,index) in swiperList" :key="index">
          <div :style="`background:url(${$axios.defaults.baseURL+item.url}) center center  ;height:700px;`"> </div>
      </el-carousel-item>
    </el-carousel>
    <div class="index_tabs">
      <TypesTab/>
    </div>
  </div>

</template>

<script>
import TypesTab from '@/components/index/TypesTab'
export default {
data(){
  return{
    swiperList:[]
  }

},
asyncData(context){
const $axios=context.app.$axios;
return $axios.get('/scenics/banners')
.then(res=>{
  console.log(res)
  return{
    swiperList:res.data.data
  }
});
 
},
components:{
  TypesTab
},
// mounted() {
//     // 获取首页 轮播图 数据
//     this.$axios.get("/scenics/banners").then(res => {
//       console.log(res);
//       console.log(222);
//       this.swiperList = res.data.data;
//     });
//   },
}
</script>
<style lang="less" scoped>
.xyly_index{
  min-width: 1000px;
  position: relative
}
.index_tabs{
position: absolute;
top: 50%;
left: 50%;
z-index: 1000;  
transform: translate(-50%,-50%)

}
</style>