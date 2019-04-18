<template>
  <el-row class="tac">
  <el-col :span="24">
    <!-- <h5>自定义颜色</h5> -->
    <el-menu
      :default-active="pathfull || asideList[0].path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="select"
      text-color="#fff"
      active-text-color="#fff">
      <el-menu-item v-for="(item,index) in asideList" :index="item.path" :key="index" >
        <i class="icon" :class="item.iconclass"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template>
<script>
  import {aside} from '@/router/index.js'
  export default {
    data () {
      return {
        asideList: aside,
        pathfull: ''
      }
    },
    watch:{
      $route (val) {
        this.pathfull = val.path
        console.log(val)
      }
    },
    mounted() {
      this.pathfull = this.$route.path
    },
    methods: {
      select (key) {
        this.$router.push({
          path: key
        })
        console.log(key);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style lang="less" scoped>
@import "../assets/css/asidemenu.less";
</style>