<template>
  <div class="statistics">
    <div class="menu_title">统计报表</div>
    <div>
      <div class="top-bar">API调用情况</div>
      <el-row>
        <el-col :span="6" class="left">
          <!-- <h5>自定义颜色</h5> -->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            text-color="#000"
            active-text-color="#ffd04b"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <div slot="title">
                <div class="tit">总调用量</div>
                <div> <span class="num">{{totalData.value}}</span> <span class="tb">同比</span> <span :class="totalData.rate > 0 ? 'green':'orange'">{{totalData.rate > 0 ? '+':''}} {{totalData.rate + '%'}}</span></div>
              </div>
            </el-menu-item>
            <el-menu-item index="2">
              <div slot="title">
                <div class="tit">数据上传</div>
                <div> <span class="num">{{updateData.value}}</span> <span class="tb">同比</span> <span :class="updateData.rate > 0 ? 'green':'orange'">{{updateData.rate > 0 ? '+':''}} {{updateData.rate + '%'}}</span></div>
              </div>
            </el-menu-item>
            <el-menu-item index="3">
              <div slot="title">
                <div class="tit">数据查询</div>
                <div> <span class="num">{{queryData.value}}</span> <span class="tb">同比</span> <span :class="queryData.rate > 0 ? 'green':'orange'">{{queryData.rate > 0 ? '+':''}} {{queryData.rate + '%'}}</span></div>
              </div>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18" class="right">
          <div class="chart-t">{{chartT}}API总调用情况</div>
          <div class="date-btns">
            <ul>
              <li :class="currentIndex == 0 ? 'active':''" @click="getAPIByDay(0)">今天</li>
              <li :class="currentIndex == 1 ? 'active':''" @click="getAPIByDay(1)">昨天</li>
              <li :class="currentIndex == 2 ? 'active':''" @click="getAPIByDay(2)">近一周</li>
              <li :class="currentIndex == 3 ? 'active':''" @click="getAPIByDay(3)">近一月</li>
              <li :class="currentIndex == 4 ? 'active':''" @click="getAPIByDay(4)">近一年</li>
            </ul>
          </div>
          <div id="myChart"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
    import echarts from 'echarts';
    import api from '@/feath/api.js';
    export default{
        data(){
            return {
                currentKey: 1,
                currentIndex: 2,
                totalData:{},
                updateData:{},
                queryData:{},
                timeList: [],
                apiData: [],
                chartT: '近一周',
                chartTlist:['今天','昨天','近一周','近一月','近一年']
            }
        },
        components:{
        },
        mounted(){
            this.getAPIData(0,2);
        },
        methods:{
            drawChart(){
                let myChart = echarts.init(document.getElementById('myChart'));
                let option = {
                    tooltip : {
                        trigger: 'axis',
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : this.timeList,
                            axisTick: {show: false},
                            axisLine: {color:'rgba(224, 228, 234, 1)'},
                            boundaryGap: false,  //图表从零刻度开始
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine: {show:false},
                            axisTick: {show:false},
                            //网格样式
                            splitLine: {
                                show: true,
                                lineStyle:{
                                    color: ['rgba(224, 228, 234, 1)'],
                                    width: 1,
                                    type: 'dashed'
                                }
                            }
                        }
                    ],
                    lineStyle:{
                        color:'#0087ED'
                    },
                    itemStyle:{
                        color:'#0087ED'
                    },
                    series : [
                        {
                            name:'API调用量',
                            type:'line',
                            smooth: true,
                            areaStyle:{
                                color:{
                                    type:'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(0, 111, 237, 0.12)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            },
                            data: this.apiData
                        }
                    ]
                };
                myChart.setOption(option);

                //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                window.addEventListener('resize',function() {myChart.resize()});
            },
            handleSelect(key,keyPath){
                // console.log(key, keyPath)
                this.currentKey = key;
                if(key == 1){
                    this.timeList = this.totalData.data.timeList;
                    this.apiData = this.totalData.data.value;
                }else if(key == 2){
                    this.timeList = this.updateData.data.timeList;
                    this.apiData = this.updateData.data.value;
                }else if(key == 3){
                    this.timeList = this.queryData.data.timeList;
                    this.apiData = this.queryData.data.value;
                }
                this.drawChart()
            },
            getAPIByDay(dayType){
                this.currentIndex = dayType;
                this.chartT = this.chartTlist[dayType]
                this.getAPIData(this.currentKey-1,dayType)
            },
            getAPIData(apiType,dayType){
              let param = {
                  apiType: apiType,
                  statisticsType: dayType
              };
              api.getAPI(param).then((res) => {
                  // console.log(res)
                  if(!res.code){
                      let result = res.result;
                      this.totalData = result.totalInvokeMap;
                      this.updateData = result.dataUpdateMap;
                      this.queryData = result.dataQueryMap;
                      if(apiType == 0){
                          this.timeList = this.totalData.data.timeList;
                          this.apiData = this.totalData.data.value;
                      }else if(apiType == 1){
                          this.timeList = this.updateData.data.timeList;
                          this.apiData = this.updateData.data.value;
                      }else if(apiType == 2){
                          this.timeList = this.queryData.data.timeList;
                          this.apiData = this.queryData.data.value;
                      }
                  }
                  this.drawChart()
              })
            }
        }
    }
</script>
<style lang="less" scoped>
@import '../../assets/css/statistics.less';
</style>