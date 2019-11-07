<template>
  <div class="postList">
    <div class="postList_detail" v-if='data.images.length>1'>
      <!-- <router-link to='/detiail'> -->
      <div class="postList_title">
        <h4>
          <a :href="'/post/detail?id='+`${this.data.id}`" >{{data.title}}</a>
        </h4>
      </div>
      <!-- </router-link> -->
      <div class="postList_content">
        <p class="a">
          <a
            :href="'/post/detail?id='+`${this.data.id}`" >  {{data.summary}} </a>
        </p>
      </div>
      <div class="postList_img">
        <a :href="'/post/detail?id='+`${this.data.id}`" >
          <img
            :src='item' 
            alt v-for="item in data.images" :key='item.id'/>
           
        </a>
      </div>
      <div class="postList_bottom">
        <span>
          {{data.city.name}}&nbsp; by&nbsp;
          <span class="zuozhe">{{data.account.nickname}}&nbsp;</span> {{data.watch}}
        </span>
        <span>{{data.like?data.like:0}}赞</span>
      </div>
    </div>
    <div class="postList_detail2" v-else-if="data.images.length===1">
      <div>
        <div class="postList_img2">
          <a :href="'/post/detail?id='+`${this.data.id}`" >
            <img
              :src="data.images"
              alt
            />
          </a>
        </div>
      </div>
      <div>
        <div class="postList_title">
          <h4>
            <a :href="'/post/detail?id='+`${this.data.id}`" >{{data.title}}</a>
          </h4>
        </div>
        <div class="postList_content">
          <p class="a">
            <a
             :href="'/post/detail?id='+`${this.data.id}`" 
            >{{data.summary}}</a>
          </p>
        </div>

        <div class="postList_bottom">
          <span>
            {{data.city.name}}&nbsp; by&nbsp;
            <span class="zuozhe">{{data.account.nickname}}&nbsp;</span> {{data.watch}}
          </span>
          <span>{{data.like}}赞</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
       default:{}
    }
  },
  data() {
    return {
   
    };
  },
  methods: {
  },
  
};
</script>

<style lang="less" scoped>
.postList_detail,
.postList_detail2 {
  padding-bottom: 15px;

  border-bottom: #ccc 1px solid;
  img {
    height: 180px;
  }
}
h4 {
  font-size: 24px;
  font-weight: 400;
  padding-bottom: 15px;
  padding-top: 15px;
  a:hover {
    color: orange;
  }
}
a {
  text-decoration: none;
  color: #000;
}
.postList_content {
  p {
    font-size: 14px;
    height: 60px;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.postList_img {
  img {
    width: 33%;
    padding-left: 30px;
    padding-bottom: 15px;
  }
}
.postList_bottom {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  .zuozhe {
    color: orange;
  }
  span:nth-child(2) {
    color: orange;
    font-size: 20px;
  }
}
.postList_detail2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .postList_img2 {
    width: 240px;
    padding-top: 18px;
    margin-right: 18px;
    img {
      width: 100%;
    }
  }
}
</style>