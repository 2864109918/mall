<template>
  <div id="category">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!-- 菜单栏 -->
    <tab-menu :categories="categories"></tab-menu>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import TabMenu from "./childComps/TabMenu"

import { getCategory, } from "network/category.js";

export default {
  name: "Category",
  components: {
    NavBar,

    TabMenu
  },
  data() {
    return {
      categories: [],
    };
  },
  created() {
    // 请求分类数据
    this.getCategory();
    // this.getSubcategory()
  },
  methods: {
    // 网络请求的相关方法
    getCategory() {
      getCategory().then((res) => {
        // console.log(res);
        const data = res.data.data
        // 1.获取分类数据
        this.categories = data.category.list
      });
    },
    // getSubcategory() {
    //   getSubcategory().then((res) => {
    //     console.log(res)
    //   })
    // }
  },
};
</script>

<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
  border-bottom: var(--color-tint)
}
</style>