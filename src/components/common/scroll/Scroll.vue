<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 2.监听滑动位置
    this.scroll.on("scroll", position => {
      // console.log(position)
      this.$emit("scroll", position);
      this.$emit("scroll1", position)
    });
    // 3.上拉加载
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y: 0
    }
  }
};
</script>

<style scoped>
</style>