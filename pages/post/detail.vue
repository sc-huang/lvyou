<template>
  <div class="detail">
    <div class="detail_left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div v-for="item in postdetail2" :key="item.id">
        <div class="left_title_top">
          <h1>{{item.title}}</h1>
        </div>
        <p class="left_title_bottom">攻略：2019-11-07 08:18:14 阅读：{{item.watch}}</p>

        <div class="detail_left_title" v-html="item.content"></div>
      </div>

      <!-- 四个图标 -->
      <div class="detail_left_center">
        <i class="el-icon-edit">评论</i>
        <i class="el-icon-star-off">收藏</i>
        <i class="el-icon-share">分享</i>
        <i class="el-icon-bell">点赞</i>
      </div>
      <div class="detail_left_bottom">
        <div class="comment">
          <div class="title">评论</div>
          <div class="tips" v-show="follow">回复 @{{username}}<div class="el-icon-error" @click="quxiao"></div></div>
          <input placeholder="说点什么吧..." style="padding:10px 0" ref="commenttext" />
          <div class="center">
            <!-- 文件上传 -->
            <div class="upload">
              <el-upload
                name="files"
                action="http://127.0.0.1:1337/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="imgsuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" src="dialogImageUrl" alt />
              </el-dialog>
              <!-- 文件上传结束 -->
            </div>
            <i>
              <el-button type="primary" size="mini" @click="submitcomment">提交</el-button>
            </i>
          </div>
        </div>
      </div>
      <div class="info" v-for="item in pagelist" :key="item.id">
        <span class="touxiang">
          
          <img :src="'http://127.0.0.1:1337'+item.account.defaultAvatar" alt />
        </span>
        <span>{{item.account.username}}</span> &nbsp;
        <i>2019-11-04 5:12</i>
        <div class="commentpic">
          <span>{{item.content}}</span>
          <img
            v-for="item2 in item.pics"
            :key="item2.id"
            :src="'http://127.0.0.1:1337'+item2.url"
            alt
          />
          <span class="huifu">
            <a href="javascript:" @click="wirtecomment({id:item.id,username:item.account.username})">回复</a>
          </span>
        </div>

        <!-- 文章评论子组件 -->
        <postcomment v-if="item.parent" :comment="item.parent" @wirtecomment="wirtecomment"></postcomment>
      </div>
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

    <div class="detail_right">
      <h3>相关攻略</h3>

      <div class="right_content" v-for="item in recommend " :key="item.id">
        <a :href="'/post/detail?id='+`${item.id}`">
          <div class="content_left" >
            <img :src="item.images"  alt />
          </div>
          <div class="content_right">
            <div class="content_right_top">{{item.title}}</div>
            <div class="content_right_bottom">2019-11-04 阅读{{item.watch}}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import postcomment from "@/components/post/postcomment.vue";
export default {
  data() {
    return {
      // file:[],
      // token1: {},
      pics: [],
      postdetail: "",
      postdetail2: "",
      ruleForm: {
        name: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      commentList: [], //总的评论
      pagelist: [], //分页后的列表
      page: {
        pagesizes: [2, 4, 6, 8],
        currentPage: 1,
        pagesize: 2,
        total: 10
      },
      follow: null,
      username:'',
      recommend:[],
      images:'',
      
    };
  },
  watch: {},
  components: {
    postcomment
  },
  mounted() {
    console.dir(this.$axios)
    // console.log(this.$store.state.user.userinfo.token);
    // this.token1.Authorization = "Bearer"[this.$store.state.user.userinfo.token];
    //     console.log(this.$route);
    let id = this.$route.query;
    // console.log(id);
//获取推荐文章
this.$axios.get('/posts/recommend',{params:id})
.then(res=>{
  console.log(res)
  // this.recommend.push(res.data.data)
  this.recommend=res.data.data
  //如果图片大于一张只显示一张
 this.recommend.map(v=>{
   if(v.images.length>1){
    v.images= v.images.slice(0,1)
   }
 })
  console.log(this.recommend)  
})
    //获取文章详情
    this.$axios.get("/posts", { params: id }).then(res => {
      console.log(res);
      this.postdetail2 = res.data.data;
      this.postdetail = res.data.data[0];
    });
    //获取评论
    // console.log(id.id)
    // let follow=this.pagelist .id
    // console.log(follow)
    this.$axios
      .get("/posts/comments", { params: { post: id.id } })
      .then(res => {
        console.log(res);

        if (res.status === 200) {
          // 总的评论
          this.commentList = res.data.data;
          // console.log(this.commentList)
          this.page.total = this.commentList.length;
          //分页后的列表
          this.pagelist = this.commentList.slice(
            (this.page.currentPage - 1) * this.page.pagesize,
            this.page.currentPage * this.page.pagesize
          );
          //  console.log(this.pagelist)
        }
      });
  },

  methods: {
    //取消发表
    quxiao(){
this.follow=null
    },
    //  // 重置 当前的评论对象
    // resetValue () {
    //   this.replayobj = null
    // },
    // 写评论
    wirtecomment({ id,username }) {
      // console.log(this.artical)
      // console.log(id,account);
      this.follow = id;
      this.username=username

       
    },
    //图片添加
    imgsuccess(response, file, fileListfile) {
      console.log(file);
      // this.pics.push(file.id)
      this.pics = response;
      console.log(this.pics);
      //       const token = this.$store.state.user.userinfo.token;
      //  this.$axios.post('/upload',{files:file.raw.uid},{headers:{Authorization:`Bearer ${token}`}})
      //       .then(res=>{
      //         console.log(res)
      //       })
    },

    handleRemove(file, fileList) {
      console.log(111);
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.pagesize = val;
      this.pagelist = this.commentList.slice(
        (this.page.currentPage - 1) * this.page.pagesize,
        this.page.currentPage * this.page.pagesize
      );
      //  console.log(this.pagelist)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.pagelist = this.commentList.slice(
        (this.page.currentPage - 1) * this.page.pagesize,
        this.page.currentPage * this.page.pagesize
      );
    },
    //发表评论和图片
    submitcomment() {
      let post = this.$route.query.id;
      // console.log(post)
      // console.log(this.file)
      // let files=this.file
      const pics = this.pics;
      const form = {
        pics,
        post,
        content: this.$refs.commenttext.value,
        follow: this.follow
      };
      const token = this.$store.state.user.userinfo.token;
      console.log(this.pics);
      //提交评论
      this.$axios
        .post("/comments", form, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          console.log(res);
          this.$message.success('评论成功')
          //重新获取
          this.$axios.get("/posts/comments", { params: { post } }).then(res => {
            console.log(res);
            // if (res.status === 200) {
            // 新的总的评论
            this.commentList = res.data.data;
            // console.log(this.commentList)
            this.page.total = this.commentList.length;
            this.pagelist = this.commentList.slice(
              (this.page.currentPage - 1) * this.page.pagesize,
              this.page.currentPage * this.page.pagesize
            );
            //  console.log(this.pagelist)
            // }
          });
          this.$refs.commenttext.value = "";
        });
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  width: 1000px;
  margin: 10px auto;
  display: flex;
  // justify-content: space-between;
}
.detail_left {
  flex: 3;
  .detail_left_title {
    border-bottom: 1px #ccc solid;
    padding-bottom: 10px;
    max-width: 700px !important;
    /deep/ p {
      img {
        width: 100%;
      }
    }
    /deep/ p:nth-child(7) {
      //  background-color: #000;
      img {
        width: 10%;
      }
    }
  }
  .detail_left_center {
    display: flex;
    // background-color: #000;
    i {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // padding-left: 60px;
      color: orange;
      font-size: 20px;
      text-align: center;
      padding: 20px 0 30px 80px;
    }
  }
}
.left_title_top {
  border-bottom: 1px #ccc solid;
  padding: 15px 0;
}
.left_title_bottom {
  text-align: right;
  padding: 20px 0;
  font-size: 15px;
  color: #66666c;
}
.detail_right {
  flex: 2;
  padding-left: 30px;
}
.title {
  padding: 10px 0;
}
input {
  display: block;
  width: 627px;
}
.center {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.info {
  border: 1px solid red;
  padding: 10px;
}
.touxiang {
  img {
    border-radius: 50%;
    width: 16px;
    height: 16px;
  }
}

.commentpic {
  padding: 10px 0 20px 40px;
  // box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .huifu {
    text-align: right;
    a{
      color: #fff;
      font-size: 12px;
      padding-right: 10px;
   
    }
      &:hover{
        display: block;
        a{
color:#ccc;
      }
        }

  }
  img {
    border: 1px dashed #ccc;
    width: 90px;
    height: 90px;
    padding: 5px;
    // box-sizing: border-box;
  }
}
i {
  font-style: normal;
  color: #666;
  font-size: 12px;
  font-weight: 300;
}
.detail_right {
  h3 {
    padding-bottom: 15px;
    border-bottom: 1px solid #000;
  }
  .right_content {
    display: flex;
    a {
      display: flex;
      text-decoration: none;
      color: #000;
    }
  }
  .content_left {
    display: flex;
    width: 100px;
    height: 80px;
    margin: 15px 0;
    img {
      width: inherit;
    }
  }

 

  .content_right {
    margin-left: 10px;
    .content_right_top {
      padding: 10px 0 49px 0;
    }
    .content_right_bottom {
      font-size: 9px;
      color: #666;
    }
  }
  
}
.tips{
  display: flex;
    background-color: #ccc;
    height: 30px;
    width: 180px;
  }
</style>