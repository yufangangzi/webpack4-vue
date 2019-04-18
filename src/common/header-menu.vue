<template>
  <div class="headtab">
    <div class="title-icon">
      <img src="../assets/img/icon.png" alt="">
    </div>
    <div class="title">食安物链管理后台</div>
    <div class="user">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/img/wenti.png" alt="疑问" style="width: 22px; margin-left: 10px; height: 22px; vertical-align: middle;">
        </span>
        <el-dropdown-menu slot="dropdown">
          <span style="color: #AAACB1;fontSize:12px;paddingLeft:15px;">帮助中心</span>
          <el-dropdown-item>
            <i class="head-menu-api"></i>
            <span>API文档</span>
          </el-dropdown-item>
          <el-dropdown-item >
            <i class="head-menu-sdk"></i>
            <span>SDK下载</span>
          </el-dropdown-item>
          <el-dropdown-item >
            <i class="head-menu-wenti"></i>
            <span>常见问题</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="handleCommand" style="marginLeft:30px">
        <span class="el-dropdown-link">
          <img src="../assets/img/user.png" alt="头像" style="width: 30px; margin-left: 10px; height: 30px; vertical-align: middle;">
          <span class="username">{{userName}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="head-menu-info"></i>
            <span>个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item command="loginOut">
            <i class="head-menu-out"></i>
            <span>退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      userName: Cookies.get('food_user') || 'admin'
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'loginOut') {
        this.loginOut()
      }
    },
    loginOut () {
      Cookies.set('food_isLogin', '0')
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/css/header.less";
</style>