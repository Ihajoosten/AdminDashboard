import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = process.env.NODE_ENV === 'development'

Vue.use(Buefy)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
