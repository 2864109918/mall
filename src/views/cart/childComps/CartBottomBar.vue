<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-all" @click.native="allClick" :is-checked="isSelectAll" />
      <span>全选</span>
    </div>
    <div class="all-price">
      合计:
      <span>{{'￥'+ allPrice}}</span>
    </div>
    <div class="calculate" @click="calcClick">
      结算
      <span v-show="isShowCount">({{shopLenght}})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "Cart-BottomBar",
  components: {
    CheckButton,
  },
  data() {
    return {
      isShowCount: false,
    };
  },
  computed: {
    ...mapGetters({
      Length: "cartLength",
      cartInfo: "cartInfo",
    }),
    allPrice() {
      return this.cartInfo
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    shopLenght() {
      let len = this.cartInfo.filter((item) => {
        return item.checked;
      }).length;
      if (len > 0) {
        this.isShowCount = true;
      } else {
        this.isShowCount = false;
      }
      return len;
    },
    isSelectAll() {
      if(this.Length === 0) return false;
      return !this.cartInfo.find(item => !item.checked)
    }
  },
  methods: {
    allClick() {
      if(this.isSelectAll) {
        this.cartInfo.forEach(item => item.checked = false);
      }else {
        this.cartInfo.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请添加商品', 1500)
      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  bottom: 40px;
  height: 40px;
  line-height: 40px;
  background: rgb(250, 250, 250);
}

.check-content {
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 60px;
}

.check-all {
  width: 16px;
  height: 16px;
  line-height: 20px;
  margin: 0 10px 0 5px;
}

.all-price {
  font-size: 15px;
  flex: 1;
  margin-left: 70px;
}

.all-price span {
  color: rgb(255, 87, 119);
}

.calculate {
  text-align: center;
  height: 40px;
  width: 100px;
  background: rgb(255, 129, 152);
  color: #fff;
  border-radius: 20px;
}
</style>