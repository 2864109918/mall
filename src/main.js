import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/toast.js'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

// 安装toast
Vue.use(toast)

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  loading: require('assets/img/common/loading-1.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
