<template>
  <div class="post">
    <div class="post_left">aaa</div>
    <div class="post_right">
      <div class="post_right_title">a</div>
      <div class="post_right_content">
        <postList v-for="(item) 
        in currentPost" :key="item.id" :data="item" />
      </div>
        <!-- 4分页组件 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.pagesizes"
        :page-size="page.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <!-- 4分页组件结束 -->

    </div>
  
  </div>
</template>

<script>
import postList from "@/components/post/postList";
export default {
  data() {
    return {
      postList: [],
      // 被分页后的文章列表
      currentPost:[],
      //分页对象
      page:{
       currentPage: 1,
      pagesizes:[3, 5, 10, 15],
      pagesize:3,
      total:10
      }
      
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pagesize=val
       this.currentPost=this.postList.slice(
        (this.page.currentPage-1)*this.page.pagesize,
        (this.page.currentPage)*this.page.pagesize
      )
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage=val
   this.currentPost=this.postList.slice(
        (this.page.currentPage-1)*this.page.pagesize,
        (this.page.currentPage)*this.page.pagesize
      )
    }
  },
  components: {
    postList
  },
  mounted() {
    // console.log(this.$route)
    let form = this.$route.query;
    this.$axios.get("/posts", { params: form }).then(res => {
      console.log(res);
      //定义所有数据源
      this.postList = res.data.data;
      // console.log(this.postList[0].content)这里是文章详情内容
   this.postList.map(v=>{
    //  console.log(v)
     if(v.images.length>3){
       v.images=v.images.slice(0,3)
      //  console.log(v.images)
     }else if(v.images.length=2){
       v.images=v.images.slice(0,1)

     }
   })
      // 定义过滤后的数据源
      //定义总数
      this.page.total=  this.postList.length
      // console.log(this.page.total)
      this.currentPost=this.postList.slice(
        (this.page.currentPage-1)*this.page.pagesize,
      this.page.currentPage*this.page.pagesize
      )
      // console.log(this.currentPost)
          });
  }
};
</script>

<style lang="less" scoped>
.post {
  width: 1000px;
  margin: 15px auto;
  display: flex;
}
.post_left {
  flex: 2;
  background: #000;
}
.post_right {
  flex: 8;
  margin-left: 45px;
  .post_right_title {
    height: 166px;
    // margin-bottom: 20px;
    background-color: green;
  }
}
</style>