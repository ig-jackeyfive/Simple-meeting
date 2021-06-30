import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import validate from './common/utils/ys-validate.js'//表单验证

//挂载到全局
Vue.prototype.$validate = validate

// main.js

import boboMessage from './components/bobo-message/bobo-message.vue'

// 使用自定义消息提示
Vue.component('message', boboMessage)


import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
