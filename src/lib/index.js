import mycomponent from './v-custom-steps.vue'
const vCustomSteps = {
  install: function(Vue) {
    Vue.component('vCustomSteps', mycomponent)
  }
}
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vCustomSteps)
}
export default vCustomSteps
