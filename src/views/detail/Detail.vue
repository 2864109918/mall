<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar class="detail-bar" @titleClick="titleClick" ref="navBar" />
    <scroll class="content" ref="scroll" :probe-style="3" @scroll="titleSwitch" @scroll1="backTopScroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages" />
      <!-- 基本信息 -->
      <detail-base-info :goods="goods" />
      <!-- 商品信息 -->
      <detail-shop-info :shops="shops" />
      <!-- 详情数据信息 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <!-- 参数信息 -->
      <detail-param-info :param-info="paramInfo" ref="param" />
      <!-- 评论信息 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <!-- 推荐信息 -->
      <detail-recommend-info :recommend-info="recommendInfo" ref="recommend" />
      <ul>
        <li></li>
      </ul>
    </scroll>
    <!-- 底部导航栏 -->
    <detail-bottom-bar @addCart="addToCart"/>
    <!-- 返回顶部 -->
    <detail-back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import Scroll from "../../components/common/scroll/Scroll";


import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import DetailBackTop from "components/content/backtop/BackTop";

import {
  getDetail,
  getRecommend,
  Goods,
  Shops,
  GoodsParam,
} from "../../network/detail";

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components: {
    Scroll,

    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    DetailBackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      infoLoadY: [0],
      currentIndex: 0,
      isShowBackTop: false
    };
  },

  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.1.根据iid请求数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.data.result;
      // console.log(data.itemInfo, data.columns, data.shopInfo.services)
      this.topImages = res.data.result.itemInfo.topImages;
      // 2.2.请求基本信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 2.3.请求商品信息
      this.shops = new Shops(data.shopInfo);
      // 2.4.请求详情数据信息
      this.detailInfo = data.detailInfo;
      // 2.5.产品参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 2.6.评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3请求推荐信息
    getRecommend().then((res) => {
      // console.log(res)
      this.recommendInfo = res.data.data.list;
    });
  },

  methods: {
    ...mapActions(['addCart']),

    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    // 1.1添加每个组件距顶部的距离
    imageLoad() {
      this.$refs.scroll.refresh();
      this.infoLoadY.push(this.$refs.param.$el.offsetTop -44);
      this.infoLoadY.push(this.$refs.comment.$el.offsetTop -44);
      this.infoLoadY.push(this.$refs.recommend.$el.offsetTop -44);
      this.infoLoadY.push(Number.MAX_VALUE);
      // console.log(this.infoLoadY)
    },
    // 1.2.点击顶部导航栏跳转对应位置
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.infoLoadY[index], 200);
    },
    // 2.1.监听滑动距离并判断跳转哪个位置
    titleSwitch(position) {
      // console.log(position)
      const positionY = -position.y;
      for (let i = 0; i < this.infoLoadY.length - 1; i++) {
        if (
          this.currentIndex !== i && positionY >= this.infoLoadY[i] && positionY < this.infoLoadY[i + 1]) {
          // console.log(i)
          // this.debounce(console.log(i), 50)
          this.currentIndex = i
          this.$refs.navBar.currentIndex = this.currentIndex
        }
      }
    },
    // 3.1.返回顶部的点击
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    backTopScroll(position) {
      this.isShowBackTop = -position.y > 1500
    },
    // 4.1.点击添加到购物车
    addToCart() {
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      this.addCart(product).then(res => {
        this.$toast.show(res, 1500)
      })
    }
  }, 
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background: #fff;
  height: 100vh;
}
#detail .content {
  height: calc(100% - 44px );
  overflow: hidden;
}
.detail-bar {
  position: relative;
  z-index: 9;
  background: #fff;
}
</style>