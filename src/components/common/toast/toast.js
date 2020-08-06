import Toast from './Toast.vue'

const obj = {};

obj.install = function(Vue) {
  // 1.创造组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.根据组件构造器用new的方式创建组件对象
  const toast = new toastContrustor()

  // 3.将组件对象手动挂载自己创造的元素上
  toast.$mount(document.createElement('div'))

  // 4.将自己创建的元素加入到组件对象中 toast.$el为自己创建的div
  document.body.appendChild(toast.$el)

  // 5.将组件挂载到全局
  Vue.prototype.$toast = toast
}

export default obj