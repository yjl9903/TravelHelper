import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

function setTwo(x) {
  if (x < 10) return "0" + x;
  else return x;
}

Vue.filter("hourMinute", date => {
  const h = date.getHours();
  const m = setTwo(date.getMinutes());
  if (h <= 12) {
    return `上午 ${setTwo(h)}:${m}`;
  } else {
    return `下午 ${setTwo(h - 12)}:${m}`;
  }
});

Vue.filter("date", date => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate() + 1;
  return `${y} 年 ${m} 月 ${d} 日`;
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
