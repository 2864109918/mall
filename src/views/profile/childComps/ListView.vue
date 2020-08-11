<template>
    <div id="list">
      <div v-for="(item, index) in listData" :key="index" class="item" @click="itemClick">
        <div class="icon">
          <!-- <img :src="item.icon" alt=""> -->
          <img src="~assets/img/profile/my_news.svg" alt="">
          <!-- <img src="~assets/img/profile/my_news.svg" alt=""> -->
          <!-- <img src="~assets/img/profile/my_news.svg" alt=""> -->
          <!-- <img src="~assets/img/profile/my_news.svg" alt=""> -->
        </div>
        <img src="~assets/img/profile/right.svg" alt="" class="right">
        <div class="info">{{item.info}}</div>
      </div>
    </div>
</template>

<script>
	export default {
		name: "ListView",
    props: {
		  listData: {
		    type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      itemClick() {
        this.$toast.show('客观别急 小主人还在开发中', 1500)
      }
    }
	}
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 14px;
    color: #333;
  }

  #list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .icon img {
    width: 18px;
    height: 18px;
  }

  .item .icon {
    margin-top: 4px;
    position: absolute;
  }

  .item .info {
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 30px;
  }

  .item:last-of-type .info {
    border-bottom: none;
  }

  .right {
    float: right;
    margin: 15px 15px 0;
  }
</style>
