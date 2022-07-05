<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu class="home-menu" mode="horizontal" :ellipsis="false" :router="true">
<!--          <el-image :src="require('../assets/logo.png' )"  style="max-width: 60px;max-height: 60px;"></el-image>-->
          <img src="../assets/logo.png" style="max-width: 60px;max-height: 60px;">
          <p style="vertical-align: auto;margin-left:13px;font-size: 18px;font-weight: bolder;white-space: nowrap">数据库课程平台</p>
          <div class="logo-placeholder"></div>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/about">理论课程</el-menu-item>
          <el-menu-item index="2">课程设计</el-menu-item>
          <el-menu-item index="/forum">讨论区</el-menu-item>
        </el-menu>
      </el-header>
<!--      <el-container>-->
<!--        <el-aside width="200px">Aside</el-aside>-->
<!--        <el-main>Main</el-main>-->
<!--      </el-container>-->
      <router-view></router-view>
    </el-container>
  </div>
<!--  <div class="home">-->
<!--    <img alt="Vue logo" src="../assets/logo.png" />-->
<!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
<!--  </div>-->

</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>

<style>

.home-menu{
  display: flex;
}

.home-menu>el-menu-item{
  width: 200px;
}

.logo-placeholder{
  flex-grow: 0.1;
}

</style>