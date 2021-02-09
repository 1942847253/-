// 入口js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import VueLazylode from 'vue-lazyload'

//引入懒加载图片
import loading from './common/imgs/lazyimg.gif'

import './filters' //加载过滤器

import './mock/mockServer' //加载mockServer即可

//注册全局组件
Vue.component(Button.name,Button) //<mt-button>

//图片懒加载配置
Vue.use(VueLazylode,{ //内部自定义了一个指令：lazy
  loading
})

new Vue({
  el:'#app',
  render:h=>h(App),
  router,
  store
})