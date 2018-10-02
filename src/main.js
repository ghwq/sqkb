// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import ElementUI from 'element-ui';
import 'styles/elementui.css'
import 'element-ui/lib/theme-chalk/icon.css'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
