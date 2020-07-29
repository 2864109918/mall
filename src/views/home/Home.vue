<template>
  <div id="home" class="wrapper">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">胡小姐家的店</div>
    </nav-bar>
    <!-- scroll操控内容 -->
    <scroll class="content" ref="scroll">
      <!-- 轮播图 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 活动栏 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周推荐 -->
      <feature-view></feature-view>
      <!-- 分类 -->
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <!-- 商品内容 -->
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- 回到顶部 -->
    <back-top @click.native="backClick"></back-top>
  </div>
</template>

<script>
//公共组件注册
import NavBar from "../../components/common/navbar/NavBar.vue";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from "../../components/content/backtop/BackTop.vue";

//子组件注册
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

//方法注册
import { getHomeMultidata, getHomeGoods } from "../../network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop"
    };
  },
  // 创造生命周期函数
  created() {
    // 请求首页数据
    this.getHomeMultidata();

    // 请求goods数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 事件监听相关的方法
    //1.分类的点击
    tabClick(index) {
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    //2.返回顶部的点击
    backClick() {
      //console.log("backClick")
      this.$refs.scroll.scrollTo(0,0)
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res)
        // this.result = res
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
      });
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 43px;
  z-index: 9;
  background: #fff;
}
.content {
  /* height: calc(100% - 93px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>