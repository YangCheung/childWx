import Vue from 'vue'
import App from './App'
import fly from 'flyio'
var AV = require('leancloud-storage')
// import { AV } from '@/leancloud/av-weapp-min.js'
var APP_ID = 'g37Y6E59SabFzqpvGDb7XP8k-gzGzoHsz'
var APP_KEY = '9TCdpv5Ri70jE3HGmkgL8b5k'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

// console.log(AV)

Vue.config.productionTip = false
Vue.prototype.$http = fly // 将fly实例挂在vue原型上
Vue.prototype.$av = AV // 将fly实例挂在vue原型上

App.mpType = 'app'

const app = new Vue(App)
app.$mount()
