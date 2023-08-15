import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./style.css"
import store from "./store/store.js"

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
