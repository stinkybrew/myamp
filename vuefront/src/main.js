import Vue from 'vue'
import App from './App.vue'
//import App2 from './components/login'  //testausta varten

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
