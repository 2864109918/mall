<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBar-item",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red' 
    }
  },
  data() {
    return{
      //isActive: true
    }
  },
  methods: {
    itemClick() {
        this.$router.push('/location').catch(err=>{console.log(err)})
        this.$router.push(this.path)
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} :{}
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

</style>