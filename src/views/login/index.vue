<template>
  <div class="login">
    <div class="weblogo">
      <img src="../../assets/img/icon.png" alt="">
      <span>食安物链</span>
    </div>
    <div class="bottom_container">
      <span class="xian"></span>
      <span>copyright &#169 2019 食安物链 All rights Reserved</span>
      <span class="xian xian-right"></span>
    </div>
    <div class="login-box">
      <el-row>
        <el-col :span="12">
          <div class="box-left">
            <img src="../../assets/img/loginicon.png" alt="">
          </div>
        </el-col>
        <el-col :span="12">
          <div class="box-right">
            <h2>食安物链后台管理系统</h2>
            <div class="loginForm">
              <div class="form-item" :class="{formItemError : nameError!==''}">
                <i class="user-icon"></i>
                <input class="username" @blur="userNameBlur" v-model="loginform.name" placeholder="请输入登陆账号" type="text">
                <span class="error">{{nameError}}</span>
              </div>
            </div>
            <div class="loginForm">
              <div class="form-item" :class="{formItemError : passWordError!==''}">
                <i class="user-icon pass-icon"></i>
                <input class="username" @blur="passWordBlur" v-model="loginform.password" placeholder="请输入登陆密码" type="password">
                <span class="error">{{passWordError}}</span>
              </div>
            </div>
            <div class="loginForm">
              <div class="form-item form-item-last">
                <i @click="savePass" class="user-icon passsave-icon" :class="{passsaved : passsave}"></i>
                <span>记住密码</span>
              </div>
            </div>
             <div class="loginForm">
              <span @click="logining" class="loginBtn">登陆</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      loginform: {
        name: '',
        password: ''
      },
      nameError: '',
      passWordError: '',
      passsave: false
    }
  },
  methods: {
    logining () {
      const userflag = this.userNameBlur()
      const passflag = this.passWordBlur()
      if (userflag && passflag) {
        Cookies.set('food_isLogin', '1')
        Cookies.set('food_user', this.loginform.name)
        this.$router.push({
          path: '/'
        })
      }
    },
    savePass () {
      this.passsave = ! this.passsave
    },
    userNameBlur() {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (this.loginform.name === '') {
        this.nameError = '请输入登陆账号'
        return false
      }
      if (!reg.test(this.loginform.name)) {
        this.nameError = '请输入6-18位英文字母，数字组合'
        return false
      }
      this.nameError = ''
      return true
    },
    passWordBlur() {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (this.loginform.password === '') {
        this.passWordError = '请输入登陆密码'
        return false
      }
      if (!reg.test(this.loginform.password)) {
        this.passWordError = '请输入6-18位英文字母，数字组合'
        return false
      }
      this.passWordError = ''
      return true
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/login.less';
</style>