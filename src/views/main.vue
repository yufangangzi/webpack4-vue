<template>
  <div style="height:100%">
    <el-container>
      <el-header>
        <header-menu></header-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <aside-menu></aside-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AsideMenu from '../common/aside-menu.vue'
import HeaderMenu from '../common/header-menu.vue'
export default {
    data() {
        return {
            msg: 'hello vue+webpack'
        }
    },
    components: {
      AsideMenu,
      HeaderMenu
    },
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #000;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #1F2A47;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E8ECF0;
    color: #333;
    padding: 0!important;
  }
  .el-container {
    height: 100%;
  }
</style>