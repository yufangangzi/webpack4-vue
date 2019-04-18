<template>
  <div>
    <div class="gailan">概览</div>
    <div class="box2">
      <div class="xiaolandian" >
      </div>
      <div class="box3">
      <p class="xinxigailan">信息概览</p>
      </div>
      <h6 class="jibenxinxi">基本信息</h6>
      <div class="table-box">
        <el-table
        :data="tableData"
        class="biaoge"
        :header-cell-style="biaostyle"
        border
        >
        <el-table-column 
          prop="name"
          label="企业名称"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="appid"
          label="AppID"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="lian"
          align="center"
          label="所在链条">
        </el-table-column>
        <el-table-column
          prop="keyapi"
          align="center"
          label="API Key">
          <template slot-scope="scope">
            <span>{{scope.row.keyapi}}</span>
            <span class="copy" 
              v-clipboard:copy="scope.row.keyapi"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="keysecret"
          align="center"
          label="Secret Key"
          type="password"
          > 
          <template slot-scope="scope" >
            {{pwdType?scope.row.keysecret:"******"}}
            

            <img :src="openeye" class="eye"  @click="changeType()" style="float:right">
          </template>
         
          
        </el-table-column>
        <el-table-column
          label="食安认证"
          align="center"
          >
          <template slot-scope="scope">
            <el-button type="text" size="small">提交审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      
      <h6 class='yingyongmiaoshu'>应用描述</h6>
      <el-card :body-style="{ padding: '0px' }" class="card" >
          <img src="../../assets/img/zon.png" class="image"> 
        <div style="padding: 11px ;float:right;margin-left:8px">
          <span >总调用量（次）&nbsp;&nbsp;&nbsp;</span>
          <br>
          <br>
          <span>{{formatNumToThousands(totalsum)}}</span>
          </div>
      </el-card>
      <el-card :body-style="{ padding: '0px'}" class="card" >
        <img src="../../assets/img/ri.png" class="image"> 
        <div style="padding: 11px ;float:right;margin-left:8px">
          <span >今日调用量（次）</span>
          <br>
          <br>
          <span >{{formatNumToThousands( totalday)}}</span>
        </div>
      </el-card>
    

      <h6 class='api'>API列表</h6>
      <div class="table-box">
        <el-table
        :data="tableData2"
        border
        :header-cell-style="biaostyle"
        class="biaoge"
        >
        <el-table-column
          prop="api"
          label="API"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="type"
          label="状态"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="url"
          label="请求地址"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="limit"
          label="调用量限制"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="limitnum"
          label="调用量"
          align="center"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          >
          <template slot-scope="scope">
            <el-button @click="gotolook" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
       
    </div>
  </div>
</template>
<script>
import {toThousands } from '@/util/filter.js'
export default {
  data() {
    return {
      biaostyle: {
        backgroundColor: '#F6F7FB',
        fontSize: '14px',
        color: '#333',
        fontWeight: '400'
      },
      tableData: [{
        name:'青岛岸山农业集团',
        appid:'18519226670',
        lian:'产地/加工/物流/销售',
        keyapi:'6FnB8gKicOtHwLbKvt7eQkK',
        keysecret:'12324'
      }],
      tableData1:[{
        totalsum:'187820',
        totalday:'678',

      }],
      tableData2:[{
        api:'数据上传',
        type:'正常',
        url:'http://vop.baidu.com/server_api',
        limit:'无限量',
        limitnum:'111',
      },{
        api:'数据查询',
        type:'正常',
        url:'http://vop.sinochem.com/sdata_api',
        limit:'无限量',
        limitnum:'111',
      }],
      totalsum:"2187820",
      totalday:"567123",
      pwdType: false, // 密码类型
      openeye: require('../../assets/img/1.png'), //图片地址

    }
  },
  methods: {
    onCopy () {
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
    onError () {
      this.$message({
        message: '复制失败',
        type: 'error'
      });
    },
    gotolook () {
      this.$router.push({
        path: '/statistics'
      })
    },
    changeType() {
        this.pwdType = this.pwdType ? false : true;
        console.log('pwdtype='+this.pwdType)
        this.openeye = this.openeye == require("../../assets/img/2.png") ? require("../../assets/img/1.png") : require("../../assets/img/2.png");
      },
     formatNumToThousands (num) {
      return toThousands(num)
    },
  }
}

</script>

<style scoped >
  .gailan{

    padding-top: 8px;
    padding-left: 16px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:17px;
  }
  .xinxigailan{
    
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  .box2{
    /* margin-top: 41px;
    margin-left: 24px; */
    margin: 41px 0 24px 24px;
    padding-bottom: 60px;
    height:100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(232,236,240,1);
  }
  .jibenxinxi{
    padding-top: 11px;
    padding-left: 24px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  .biaoge{
    margin-top: 8px;
    border:1px solid rgba(229,233,242,1);
  }
  .yingyongmiaoshu{
    padding-top: 32px;
    padding-left: 24px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  .api{
    padding-left: 24px;
    padding-top: 32px;
    height:22px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  .bottom {
    width:222px;
    height:64px;
    border:1px solid rgba(229,233,242,1);
  }
  .image {
    width: 34px;
    height: 34px;
    margin-top:15px ;
    margin-left:45px ;
  }
  .table-box{
    padding: 0 24px;
  }
  .card{
    display: inline-block;
    margin-left: 24px;
    margin-top: 8px;
    width:222px;
    height:64px;
    border:1px solid rgba(229,233,242,1);
  }
  .copy{
    display: inline-block;
    width:12px;
    height: 16px;
    background: url('../../assets/img/copy.png') no-repeat;
    background-size: 12px 16px;
    margin-left: 10px;
    cursor: pointer;
  }
  .xiaolandian{
    width:3px;
    height:10px;
    background:rgba(0,135,237,1);
    display: inline-block;
    margin-top:30px;
    margin-left:24px
  }
  .box3{
    display: inline-block;
    margin-left: 8px;
  }
</style>



