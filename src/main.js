import Vue from 'vue'
import App from './App'
import fly from 'flyio'

Vue.config.productionTip = false
Vue.prototype.$http = fly // 将fly实例挂在vue原型上

App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/index/main', 'pages/user/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#5C6AFF',
      navigationBarTitleText: '少儿成长大全',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#999999',
      selectedColor: '#5C6AFF',
      backgroundColor: '#ffffff',
      borderStyle: '#5C6AFF',
      list: [{
        pagePath: 'pages/index/main',
        text: '首页'
        // iconPath: 'static/images/icon_nav_button.png',
        // selectedIconPath: 'static/images/icon_nav_button.png'
      },
      {
        pagePath: 'pages/logs/main',
        text: '手工'
        // iconPath: 'static/images/icon_nav_cell.png',
        // selectedIconPath: 'static/images/icon_nav_cell.png'
      },
      {
        pagePath: 'pages/user/main',
        text: '我的'
        // iconPath: 'static/images/icon_nav_cell.png',
        // selectedIconPath: 'static/images/icon_nav_cell.png'
      }
      ]
    }
  }
}
