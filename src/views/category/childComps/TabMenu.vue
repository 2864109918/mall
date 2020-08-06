<template>
  <div id="menu">
    <div class="menu-list">
      <div class="menu-list-item" 
      v-for="(item, index) in categories" :key="index"
      :class="{active: index === currentIndex}"
      @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabMenu",
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('selectItem', index)
    }
  }
};
</script>

<style scoped>
#menu{
  background: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
}

.active{
  font-weight: 600;
  background: var(--color-tint);
  color: #fff;
}
</style>