import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '5619d27bc087703e30222b73e1577cdb',
  plugin: ['AMap.autoComplete', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4'
});

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

Vue.filter('formatPos', v => {
  const { formattedAddress, addressComponent } = v;
  let len = 0;
  len += addressComponent.province.length;
  len += addressComponent.city.length;
  len += addressComponent.district.length;
  len += addressComponent.township.length;
  return formattedAddress.slice(len, formattedAddress.length);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
