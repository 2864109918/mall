<template>
  <div>
    <cart-list-item class="list-item" v-for="(item, index) in cartList" :key="index" :item-info="item"/>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

export default {
  name: "CartList",
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    CartListItem
  }
};
</script>