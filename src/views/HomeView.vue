<template>
  <div class="home-view">
    <el-container>
      <el-header class="header">
        <h1>后台管理系统</h1>
        <div class="user-info">
          <h4 class="username">{{ userInfo.username }}</h4>
          <!-- 头像 -->
          <el-avatar
            class="user-pic"
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
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">绘本管理</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-message"></i>
              <span slot="title">消息管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="logout">
              <i class="el-icon-close"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
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
        console.log(res);
        if (res.status === 0) {
          if (res.msg === "无效的Token") {
            this.$alert("您的登陆凭证无效或者已过期，请重新登陆！", "提示", {
              type: "warning",
              confirmButtonText: "好的",
              callback: () => {
                this.logout();
              }
            });
          }
        }
        if (res.status === 1) {
          this.userInfo = res.data;
        }
      });
    },
    logout(needTip = true) {
      if (needTip) {
        this.$confirm("即将退出登录，是否继续？", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.updateUserToken("");
            this.$router.push("/login");
          })
          .catch(() => {});
      }
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
      float: left;
      margin-right: 20px;
    }
    .user-pic {
      float: right;
    }
  }
}
</style>
