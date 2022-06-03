import Vue from "vue";
import Vuex from "vuex";

/* 导入模块化的Store */
import moduleGS from "@/store/GlobalStore.js";

Vue.use(Vuex);

//创建Store的实例对象
const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    m_global: moduleGS
  }
});

export default store;
