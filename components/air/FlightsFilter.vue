<template>
  <div class="flights_filter">
    <div class="filter_main">
      <div class="main_path">单程: {{info.destCity}}-{{info.departCity}}/ {{info.departDate}}</div>
      <div class="main_selects">
        <div class="select_item">
          <el-select @change='filterChange' placeholder="起飞机场" size="mini" v-model='airport'>
            <el-option
              v-for="item in 
              filterOptions.airport"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select_item">
          <el-select @change='filterChange' placeholder="起飞时间" size="mini" v-model='flightTimes'>
            <el-option
              v-for="item in 
       filterOptions.flightTimes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select_item">
          <el-select @change='filterChange' placeholder="航空公司" size="mini" v-model='company'>
            <el-option
              v-for="item in  filterOptions.company"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select_item">
          <el-select @change='filterChange' placeholder="机型" size="mini" v-model="sizes">
            <el-option
              v-for="item in filterOptions.sizes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="filters_btns">
      筛选:
      <el-button type="primary" round size="mini">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: {}
    },
    options:{
   type: Object,
      default: {}
    }
  },
computed:{
// airport(){}//直接拿或者对象.属性都可以
filterOptions(){
  //起飞机场
  // this.options.airport原生是数组，要变成数组对象模式，map里面v=字符串
  // filter过滤掉空字符串，先过滤，再循环不建议，数据原大很耗费性能，所有用常规for做
//     let airport=this.options.airport.filter(v=>v).map(v=>({value:v,label:v}))
let airport=[]
this.options.airport.forEach(v => {
  v&&airport.push({value:v,label:v})
});
//起飞时间
let flightTimes=this.options.flightTimes.map(v=>({
label:`${v.from}:00-${v.to}:00`,
value:v.from + '|' + v.to
}));
//公司
      let company=this.options.company.map(v=>({
        value:v,label:v
      }))
      //大小
      let sizes=[
        {value:'L',label:'大'},
        {value:'M',label:'中'},
        {value:'S',label:'小'}
      ]
      return{airport,flightTimes,company,sizes}
    }
  },
  methods:{
    // 下拉框值改变事件
    filterChange() {
      // 把选中的值 发送到父组件中
      // console.log(this.airport,this.flightTimes,this.company,this.sizes)
      let filter = {
        airport: this.airport,
        flightTimes: this.flightTimes,
        company: this.company,
        sizes: this.sizes
      };
      this.$emit("filterChange", filter);
    }
  },
  data(){
    return{
  // 起飞机场默认值
      airport: "",
      // 起飞时间
      flightTimes: "",
      // 航空公司
      company: "",
      // 机型
      sizes: ""
    }
  }
//   mounted(){
//        let airport1=this.options.airport.filter(v=>v)
//     let airport=this.options.airport.filter(v=>v).map(v=>({value:v,label:v}))
// console.log(airport)
// console.log(airport1)
//   }
};
</script>
<style lang="less" scoped>
.flights_filter {
  .filter_main {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .main_path {
      font-size: 13px;
    }
    .main_selects {
      display: flex;

      .select_item {
        width: 120px;
        margin-left: 5px;
      }
    }
  }
  .filters_btns {
    padding: 10px 0;
  }
}
</style>