<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar class="detail-bar" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"/>
      <!-- 基本信息 -->
      <detail-base-info :goods="goods"/>
      <!-- 商品信息 -->
      <detail-shop-info :shops="shops"/>
      <!-- 详情数据信息 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <!-- 参数信息 -->
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <!-- 评论信息 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <!-- 推荐信息 -->
      <detail-recommend-info :recommend-info="recommendInfo" ref="recommend"/>
    </scroll>
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

import { getDetail, getRecommend, Goods, Shops, GoodsParam} from "../../network/detail";

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
    DetailRecommendInfo
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
      infoLoadY: [0]
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
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 2.6.评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }    
    })
    // 3请求推荐信息
    getRecommend().then(res => {
      // console.log(res)
      this.recommendInfo = res.data.data.list
    })
  },

  methods: {
    imageLoad() {
      this.infoLoadY.push(this.$refs.param.$el.offsetTop -44)
      this.infoLoadY.push(this.$refs.comment.$el.offsetTop -44)
      this.infoLoadY.push(this.$refs.recommend.$el.offsetTop -44)
      // console.log(this.infoLoadY)
      this.$refs.scroll.refresh();
    }, 
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.infoLoadY[index], 200)
    }
  }
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
  height: calc(100% - 44px);
}
.detail-bar {
  position: relative;
  z-index: 9;
  background: #fff;
}
</style>