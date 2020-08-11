<template>
  <div class="item">
    <div  class="item-info" v-for="(item, index) in categoryShow" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="" @load="imgLoad">
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContentCategory",
  props: {
    categoryShow: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      current: 0, 
      imageLength: 0
    }
  },
  methods: {
    imgLoad() {
      if (++this.current === this.imageLength) {
        this.$emit('imgLoad')
      }
    }
  },
  watch: {
    categoryShow() {
      this.imageLength = this.categoryShow.length
    }
  }
}
</script>

<style scoped>

  .item {
    text-align: center;
    font-size: 12px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    
  }

  .item-info {
    margin: 15px 0;
    width: 91px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>