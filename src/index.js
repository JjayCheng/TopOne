import Vue from 'vue'
import App from './App.vue'

// 全局样式
import './common/style/reset.styl'
import './common/style/base.styl'
import './common/style/animation.styl'
import './common/icon/iconfont.css'

// 类
import SettingTools from './common/js/SettingTools.js'
window.SettingTools = SettingTools

import LinkTools from './common/js/LinkTools.js'
window.LinkTools = LinkTools

import SearchTools from './common/js/SearchTools.js'
window.SearchTools = SearchTools

// 方法组件
import notification from './layer/notification'
import promptBox from './layer/promptBox'
import inputLayer from './layer/inputLayer'
Vue.use(notification)
Vue.use(promptBox)
Vue.use(inputLayer)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})