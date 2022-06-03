import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 完整引入Element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//导入axios
import axios from "axios";
import VueAxios from "vue-axios";

/* 配置axios */
axios.defaults.baseURL = "http://1.13.253.86:3007";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
//对请求数据进行application/x-www-form-urlencoded编码
axios.defaults.transformRequest = [
  (data) => {
    return new URLSearchParams(data);
  }
];

/* 在这里挂载导入的全局模块 */
Vue.use(ElementUI);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
