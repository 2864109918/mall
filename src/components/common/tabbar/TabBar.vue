<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style scoped>
#tabbar {
  display: flex;
  background: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: -1px;
  box-shadow: 0 -2px 1px rgba(44, 41, 41, 0.1);
  z-index: 9;
}
</style>