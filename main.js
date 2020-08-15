import Vue from 'vue'
import App from './App'
import store from './store'

import utils from './utils';

Vue.config.productionTip = false
App.mpType = 'app'

// 挂载所有工具方法到Vue实例
Object.keys(utils).forEach(key => {
    Vue.prototype[`$${key}`] = utils[key];
});

const app = new Vue({
    ...App,
    store
})

// 注册http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from './utils/http.interceptor.js'
Vue.use(httpInterceptor, app)

app.$mount()
