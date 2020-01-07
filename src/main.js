import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

function setTwo(x) {
  if (x < 10) return '0' + x;
  else return x;
}

Vue.filter('hourMinute', date => {
  date = new Date(date);
  const h = date.getHours();
  const m = setTwo(date.getMinutes());
  if (h <= 12) {
    return `上午 ${setTwo(h)}:${m}`;
  } else {
    return `下午 ${setTwo(h - 12)}:${m}`;
  }
});

Vue.filter('date', (date, haveYear = true) => {
  date = new Date(date);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return (haveYear ? `${y} 年 ` : '') + `${m} 月 ${d} 日`;
});

Vue.filter('endDate', (date, len) => {
  return new Date(new Date(date).getTime() + len * 24 * 60 * 60 * 1000 - 1);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
