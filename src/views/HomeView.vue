<template>
  <div class="home-view">
    <el-container>
      <el-header class="header">
        <h1>后台管理系统</h1>
        <div class="user-info">
          <h4 class="username">{{ userInfo.username }}</h4>
          <!-- 头像 -->
          <el-avatar
            :size="50"
            src="http://5b0988e595225.cdn.sohucs.com/images/20200101/918f7fdd9b08498eac5651e72dc81162.jpeg"
            @error="avatarErrorHandler"
          >
            <!-- 头像加载不出来时的默认图片 -->
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    ...mapMutations("m_global", ["updateUserToken"]),
    /**
     * 头像出错时进行处理
     */
    avatarErrorHandler() {
      return true;
    },

    /**
     * 获取用户信息
     */
    async getUserInfo() {
      await this.axios.get("/my/get").then(({ data: res }) => {
        if (res.status === 0) {
          if (res.msg === "无效的Token") {
            this.$alert("您的登陆凭证无效或者已过期，请重新登陆！", "提示", {
              type: "warning",
              confirmButtonText: "好的",
              callback: () => {
                console.log(1);
                this.updateUserToken("");
                this.$router.push("/login");
              }
            });
          }
        }
        if (res.status === 1) {
          this.userInfo = res.data;
        }
      });
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.home-view,
.el-container {
  height: 100%;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.header,
.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-info {
    min-width: 110px;

    .username {
    }
  }
}
</style>
