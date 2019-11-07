<template>
  <div class="flights">
    <!-- 正文 开始 -->
    <div class="flights_main">
      <!-- 1 筛选模块 开始 -->
      <FlightsFilter
      
        v-if="flightsData.flights.length"
        :info="flightsData.info"
        :options="flightsData.options"
          @filterChange="filterChange"
      />
      <!-- 1 筛选模块 结束 -->

      <!-- 2 表单的头部 开始 -->
      <FlightsHead />
      <!-- 2 表单的头部 结束 -->

      <!-- 3 机票列表 开始 -->
      <!--v-for="(item) in flightsData.flights" -->
      <div class="air_list">
        <FlightsItem v-for="(item) 
        in currentFlights" :key="item.id" :data="item" />
      </div>
      <!-- 3 机票列表 结束 -->
      <!-- 4分页组件开始 -->
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
    <!-- 正文 结束 -->

    <!-- 侧边栏 开始 -->
    <div class="flights_aside">
      <div class="history">
        <div class="history_title">历史搜索</div>
        <div class="history_content">
          <div class="history_row" v-for="(item,index) in historyList"
           :key='index'>
        <div class="his_left">
          <p>{{item.departCity}} -{{item.destCity}} </p>
          <p>{{item.departDate}} </p>
        </div>
        <div class="his_right">
          <el-button type="warning">选择</el-button>
        </div>
        </div>
      </div>
</div>
    </div>
    <!-- 侧边栏 结束 -->
  </div>
</template>

<script>
import FlightsFilter from "@/components/air/FlightsFilter";
import FlightsHead from "@/components/air/FlightsHead";
import FlightsItem from "@/components/air/FlightsItem";
export default {
  components: {
    FlightsFilter,
    FlightsHead,
    FlightsItem
  },
  data() {
    return {
      //这里在f12network看
      // 01总的数据，拿来筛选
      flightsData: {
        // 机票列表数组
        flights: [],
        info: {},
        options: {}
      },

      // 01这是列表筛选后的数据源 第一次加载页面的时候  值 === 总的数据源
      // 页面显示的第几页从筛选后的数据源显示
      filterList: [],
      //被分页后的机票列表
      currentFlights: [],
      //分页对象
      page: {
        //页容量
        pagesize: 1,
        pagesizes: [1, 2, 5, 10, 20, 100],
        currentPage: 1,
        total: 5
      },
      //在mounted加载缓存数据在循环
      historyList:[]
    };
  },
  methods: {
    //1获取机票数据
    //01优化分页给变量ifFirst，数据第一次使用
    getList(isFirst) {
      console.log(this.$route)
      if (isFirst) {
        let form = this.$route.query;
        // get提交参数用 params：参数对象（在url里）
        this.$axios.get("/airs", { params: form }).then(res => {
          console.log(res);
          //在data(){return}定义flightsData,写完后
          //定义所有数据源
          this.flightsData = res.data;
          //01定义过滤后数组的数据源，还没筛选跟原数据一样
          this.filterList = this.flightsData.flights;
          //总条数
          this.page.total = this.filterList.total;
          // console.log(this.page.total)
          // 分页使用，筛选要优化
          this.currentFlights = this.filterList.slice(
            (this.page.currentPage - 1) * this.page.pagesize,
            this.page.currentPage * this.page.pagesize
          );
          // console.log( this.currentFlights )
        });
      }else{
   // 第二次获取数据只会对旧的数据源来分页,不管第几次,数据源都来自于filterList
        //定义总条数(属于过滤后的总条数)
        this.page.total=this.filterList.length;
        //分页
          // 分页使用
          this.currentFlights = this.filterList.slice(
            (this.page.currentPage - 1) * this.page.pagesize,
            this.page.currentPage * this.page.pagesize
          );
      }
    },

    //2页容量改变事件
    handleSizeChange(val) {
      // console.log(val)
      // console.log(`每页 ${val} 条`);
      this.page.pagesize = val;
      // this.currentFlights = this.flightsData.flights.slice(
      //   (this.page.currentPage - 1) * this.page.pagesize,
      //   this.page.currentPage * this.page.pagesize
      // );
      //01,做第二次第三次不用再发起请求
            this.getList();
    },
    //3当前页码改变事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // this.page.currentPage = val;
      // this.currentFlights = this.flightsData.flights.slice(
      //   (this.page.currentPage - 1) * this.page.pagesize,
      //   this.page.currentPage * this.page.pagesize
      // );
      //01
          this.getList();
    },

  filterChange(filterObj) {
    // filterObj是选择下拉框的值
    console.log(filterObj)
    //打印的值 filterObj： {airport: "首都机场", flightTimes: "6|12", company: "国航", sizes: "M"}
    //或者 {airport: "", flightTimes: "", company: "国航", sizes: ""}

    //011 1 先过滤 第一个条件 航空公司
    //011 2 当 航空公司 等于 空字符串的时候 表示 不用过滤

     let filterList = this.flightsData.flights.filter(v => {
        // company == "";
        // if (filterObj.company === "") {
        //   return true;
        // }
       //优化成下面代码

        // 1 航空公司的条件
        //这样写就不用if'else嵌套还有return直接加 return isok1&&isok2
        let isOk1 =
          filterObj.company === "" || v.airline_name === filterObj.company;
        // return isOk1;
        // if (isOk1) {
        //   return true;
        // } else {
        //   return false;
        // }
        // 2起飞机场
        // let isok2=false;
        // if(filterObj.airport===v.org_airport_name|| filterObj.company === "" ){
        //  isok2=true;
        // }else{
        //   isok2=false 
        // }
        //  return isok2
        // 2优化
        let isok2=filterObj.airport===v.org_airport_name|| filterObj.company === "" ;
       //3机型
        let isok3=filterObj.sizes===v.plane_size|| filterObj.sizes === "" ;

        //4起飞时间  拿完整数据中起飞时间dep_time和筛选条件的from|to(6|12)做比较
      let from=filterObj.flightTimes.split('|')[0]
      let to=filterObj.flightTimes.split('|')[1]
        //4.2 把完整数据06:30变成6.5
let hour=(+v.dep_time.split(':')[0])+(+ v.dep_time.split(':')[1]/60)
// console.log(hour)
// debugger  
// 通过代码方式打断点
// 4.3做比较
// if(hour>=from&&hour<=to){
//   return true
// }else{
//   return false
// }
// 4.4优化
let isok4=(filterObj.flightTimes==='')||(hour>=from&&hour<=to)
      return isok2&&isOk1&&isok3&&isok4
         
      });
    this.filterList = filterList;
    this.getList()
}
},
  mounted() {
    // 01加了true判断是不是第一次
    this.getList(true);
  
  this.historyList=JSON.parse(localStorage.getItem('city'))
  }
};
</script>

<style lang="less" scoped>
.flights {
  width: 1000px;
  margin: 0 auto;
  display: flex;
}
.flights_main {
  flex: 5;
}
.flights_aside {
  flex: 2;
}
.history {
  border: 1px solid #ccc;
  padding: 20px;
  .history_title {
    font-size: 26px;
    padding: 20px 0;
  }

  .history_content {
    .history_row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .his_left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: left;
        p:nth-child(1) {
          font-size: 18px;
        }
        p:nth-child(2) {
          color: #666;
          font-size: 13px;
        }

      }

      .his_right {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>