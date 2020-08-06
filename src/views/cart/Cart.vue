<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar>
      <div slot="center" class="nav-bar">购物车({{Length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <cart-list :cart-list="cartInfo" />
    </scroll>
    <!-- 底部工具栏 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,

    Scroll,
  },
  computed: {
    // 1.直接拿到store里的getters方法
    // Length() {
    //   return this.$store.getters.cartLength
    // }
    // 2.通过vuex中的辅助方法
    // 2.1. 可以是多个数组
    // ...mapGetters([cartLength])
    // 2.2. 可以为对象，可自定义name
    ...mapGetters({
      Length: "cartLength",
      cartInfo: "cartInfo",
    }),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background: var(--color-tint);
  color: #fff;
  justify-content: center;
}

.content {
  height: calc(100% - 93px);
  overflow: hidden;
}
</style>