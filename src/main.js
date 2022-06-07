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
//导入时间格式化工具
var dayjs = require("dayjs");

/* 配置axios */
// axios.defaults.baseURL = "http://1.13.253.86:3007";
axios.defaults.baseURL = "http://127.0.0.1:3007";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
//对请求数据进行application/x-www-form-urlencoded编码
axios.defaults.transformRequest = [
  (data) => {
    return new URLSearchParams(data);
  }
];
//请求和响应拦截器
axios.interceptors.request.use(
  /**
   * 根据URL地址自动添加Token请求头
   * @param {axios的请求配置} config
   * @returns
   */
  (config) => {
    if (!config.url.match(/\/login\/?/g)) {
      config.headers.Authorization =
        localStorage.getItem("token") === '""' //读取空字符串时，实际上包含两个双引号
          ? ""
          : JSON.parse(localStorage.getItem("token"));
    } else {
      config.headers.Authorization = "";
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
/* 在这里挂载导入的全局模块 */
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.prototype.dayjs = dayjs;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
