import Vue from 'vue';
import ViewUI from 'view-design';
import echarts from 'echarts';
import dataV from '@jiaminghi/data-view';
import http from './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'view-design/dist/styles/iview.css';
import './assets/style.scss';
import './plugins/world';

Vue.prototype.$http = http;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.use(dataV);
Vue.config.warnHandler = function (msg) {
  if (!msg.includes('Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.')) { // uniApp bug: https://ask.dcloud.net.cn/question/71966
    return console.warn && console.warn(msg);
  }
};
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
