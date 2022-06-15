/* 全局仓库，可用于每一个页面 */

const GlobalStore = {
  namespaced: true,

  state: () => ({
    userToken:
      localStorage.getItem("token") &&
      localStorage.getItem("token").match(/^".*"$/) //只对包含双引号的字符串进行读取
        ? JSON.parse(localStorage.getItem("token"))
        : "",
    userInfo: {}
  }),
  mutations: {
    updateUserToken(state, newToken) {
      if (newToken === "") {
        state.userToken = "";
      } else {
        state.userToken = "Bearer " + newToken;
      }

      localStorage.setItem("token", JSON.stringify(state.userToken));
    },
    updateUserInfo(state, newInfo) {
      state.userToken = newInfo;
      // localStorage.setItem("token", JSON.stringify(state.userToken));
    }
  },
  actions: {},
  getters: {}
};

export default GlobalStore;
