<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <div class="goods-list-item">
      <goods-list-item v-for="(item, index) in recommendInfo" :key="index" :goodsitem="item"/>  
    </div>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
  name: "DetailRecommendInfo",
  props: {
    recommendInfo: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style scoped>
 .recommend-info {
    padding: 5px;
    padding-bottom: 35px;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
    
  }

.goods-list-item{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 2px;
}
</style>