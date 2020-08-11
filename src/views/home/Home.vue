<template>
  <div id="home" class="wrapper">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">胡小姐家的店</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isFiexd"
    />
    <!-- scroll操控内容 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners"/>
      <!-- 活动栏 -->
      <recommend-view :recommends="recommends"/>
      <!-- 本周推荐 -->
      <feature-view/>
      <!-- 分类 -->
      <tab-control
        class="tab-control"
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl"
      />
      <!-- 商品内容 -->
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
//公共组件注册
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backtop/BackTop.vue";

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
    FeatureView,
  },
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      isFiexd: false,
      tabOffsetTop: 0,
      saveY: 0,
    };
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },

  // 创造生命周期函数
  created() {
    // 1.请求首页数据
    this.getHomeMultidata();

    // 2.请求goods数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = this.debounce(
      this.$refs.scroll && this.$refs.scroll.refresh,
      50
    );
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
    // 利用定时器来计算图片都加载后的距离顶部的高度,用$el拿到组件上的元素
    setTimeout(() => {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    }, 300);
  },
  methods: {
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    // 事件监听相关的方法
    //1.分类的点击
    tabClick(index) {
      // console.log(index)
      // switch (index) {
      //   case 0:
      //     this.currentType = "pop";
      //     break;
      //   case 1:
      //     this.currentType = "new";
      //     break;
      //   case 2:
      //     this.currentType = "sell";
      //     break;
      // }
      this.currentType = Object.keys(this.goods)[index]
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    //2.返回顶部的点击
    backClick() {
      //console.log("backClick")
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // console.log(position)
      // 返回顶部的显示
      this.isShowBackTop = -position.y > 1000;
      // 显示分类栏
      this.isFiexd = -position.y > this.tabOffsetTop;
    },
    // 3.上拉加载更多
    loadMore() {
      // console.log("loadMore")
      this.getHomeGoods(this.currentType);
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res)
        // this.result = res
        const data = res.data.data
        this.banners = data.banner.list;
        this.recommends = data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.refresh();
      });
    },
  },
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