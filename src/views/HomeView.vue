<template>
  <div class="home-view">
    <el-container style="height: 9%">
      <!-- 顶栏 -->
      <el-header class="header" height="100%">
        <!-- Logo和标题区域 -->
        <div class="logo all-in-center">
          <img src="@/../public/logo.png" />
          <h1>后台管理系统</h1>
        </div>
        <!-- 用户信息区域 -->
        <div class="user-info">
          <h4 class="username">{{ userInfo.nickname || userInfo.username }}</h4>
          <!-- 头像 -->
          <el-avatar
            class="user-pic"
            :size="50"
            :src="userInfo.avatar"
            @error="avatarErrorHandler"
          >
            <!-- 头像加载不出来时的默认图片 -->
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
        </div>
      </el-header>
    </el-container>
    <!-- 侧边栏和内容栏 -->
    <el-container style="height: 91%">
      <el-aside width="200px">
        <el-menu
          default-active="um"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border: 0"
          :collapse="isCollapse"
          :unique-opened="true"
          router
        >
          <el-menu-item index="um" route="/home/um">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-submenu index="cm">
            <template slot="title"
              ><i class="el-icon-document"></i><span> 内容管理</span></template
            >
            <el-menu-item index="bm" route="/home/bm">
              <i class="el-icon-notebook-1"></i>
              <span slot="title">绘本管理</span>
            </el-menu-item>
            <el-menu-item index="tm" route="/home/tm">
              <i class="el-icon-collection-tag s"></i>
              <span slot="title">标签管理</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3" disabled>
            <i class="el-icon-message"></i>
            <span slot="title">消息管理</span>
          </el-menu-item>
          <!-- <el-menu-item @click="collapseMenu">
            <i ref="collapseIcon" class="el-icon-d-arrow-left"></i>
            <span slot="title">折叠菜单</span>
          </el-menu-item> -->
          <el-menu-item @click="logout">
            <i class="el-icon-close"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="padding: 0px"><router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      userInfo: {},
      fullscreenLoading: false,
      isCollapse: false
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
                this.updateUserToken("");
                this.$router.push("/login");
              }
            });
          } else {
            this.$alert("未知错误，请重新登陆", "提示", {
              type: "warning",
              confirmButtonText: "好的",
              callback: () => {
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
    },
    /**
     * 退出登陆
     */
    async logout() {
      await this.$confirm("即将退出登录，是否继续？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          /* 点击了确定 */
          const loading = this.$loading({
            lock: true,
            text: "退出登陆中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.axios
            .get("/my/logout")
            .then(({ data: res }) => {
              if (res.status === 1) {
                this.updateUserToken("");
                this.$router.push("/login");
              } else {
                this.$alert("退出登录失败，请稍后重试！", "提示", {
                  type: "warning",
                  confirmButtonText: "好的"
                });
              }
            })
            .catch((err) => {
              console.log("axios请求", err);
              this.$alert("网络开小差了，请稍后重试！", "提示", {
                type: "warning",
                confirmButtonText: "好的"
              });
            })
            .finally(() => {
              loading.close();
            });
        })
        .catch(() => {
          /* 点击了取消 */
        });
    },
    collapseMenu() {
      this.isCollapse = this.isCollapse ? false : true;
      const comp = this.$refs.collapseIcon;
      const isColl = this.isCollapse;
      this.$nextTick(() => {
        comp.className = isColl
          ? "el-icon-d-arrow-left"
          : "el-icon-d-arrow-right";
      });
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.home-view {
  height: 100%;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0px;
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

.logo {
  width: 180px;
  justify-content: space-between;
}
.header,
.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-info {
    min-width: 110px;

    .username {
      float: left;
      margin-right: 20px;
    }
    .user-pic {
      float: right;
    }
  }
}
</style>
