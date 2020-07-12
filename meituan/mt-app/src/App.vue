<template>
  <div id="app">
    <!-- 头部 -->
    <app-header :poiInfo="poiInfo"></app-header>
    <!-- 导航 -->
    <app-nav :commentNum="commentNum"></app-nav>
    <!-- 内容 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";

export default {
  name: "App",
  components: {
    "app-header": Header,
    "app-nav": Nav
  },
  data() {
    return {
      poiInfo: {},
      commentNum: 0
    };
  },
  created() {
    fetch("/api/goods")
      .then(res => {
        return res.json(); //将拿来的数据JSON改成能使用的格式并返回
      })
      .then(response => {
        // console.log(response)
        if (response.code == 0) {
          this.poiInfo = response.data.poi_info;
          // console.log(this.poiInfo)
        }
      });

    // 请求ratings
    fetch("/api/goods")
      .then(res => {
        return res.json(); //将拿来的数据JSON改成能使用的格式并返回
      })
      .then(response => {
        // console.log(response)
        if (response.code == 0) {
          this.poiInfo = response.data.poi_info;
          // console.log(this.poiInfo)
        }
      });
    // 请求ratings
    fetch("/api/ratings")
      .then(res => {
        return res.json(); //将拿来的数据JSON改成能使用的格式并返回
      })
      .then(response => {
        if (response.code == 0) {
          this.commentNum = response.data.comment_num;
        }
      });
  }
};
</script>

<style>
</style>
