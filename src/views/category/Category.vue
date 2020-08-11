<template>
  <div id="category">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <!-- 菜单栏 -->
      <tab-menu :categories="categories" @selectItem="selectItem" />
      <scroll id="tab-content" ref="scroll">
        <tab-content-category :categoryShow="categoryList" @imgLoad="imgLoad"></tab-content-category>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";

import { getCategory, getSubcategory } from "network/category.js";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabContentCategory,
    TabMenu,
  },
  data() {
    return {
      categories: [],
      categoryList: [],
      categoryData: {},
      currentIndex: -1,
    };
  },
  created() {
    // 请求分类数据
    this._getCategory();
  },

  methods: {
    // 网络请求的相关方法
    _getCategory() {
      getCategory().then((res) => {
        // console.log(res);
        const data = res.data.data;
        // 1.获取分类数据
        this.categories = data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
        
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryList = res.data.list;
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
      });
    },

    // 点击事件相关的方法
    selectItem(index) {
      this._getSubcategories(index);      
    },
    imgLoad() {
      this.$refs.scroll.refresh();
    }
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  background: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 1;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
  overflow: hidden;
}

#tab-content {
  height: calc(100% -0px);
  flex: 1;
  overflow: hidden;
}
</style>