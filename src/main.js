import Vue from 'vue'
import App from './App.vue'
import vSvgChain from 'v-svg-chain'


Vue.use(vSvgChain)
new Vue({
  el: '#app',
  render: h => h(App)
})
