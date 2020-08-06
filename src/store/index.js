import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCount(state, oldInfo) {
      oldInfo.count++
    },
    addToCart(state, info) {
      info.checked = false
      state.cartList.push(info)
    }
  },
  actions: {
    addCart(context, info) {
      return new Promise((resolve, reject) => {
        let oldInfo = context.state.cartList.find(item => item.iid === info.iid)
        if (oldInfo) {
          context.commit('addCount', oldInfo)
          resolve('当前商品数量+1')
        } else {
          info.count = 1
          context.commit('addToCart', info)
          resolve('成功添加新商品')
        }
      })
    }
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartInfo(state) {
      return state.cartList
    }
  }
})
export default store