<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.check-button{
  
  border-radius: 50%;
  border: 1.5px solid #aaa;
}
.check{
  border-color: rgb(255,87,119);
  background-color: rgb(255,87,119);
}
</style>