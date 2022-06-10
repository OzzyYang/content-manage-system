<template>
  <el-container style="height: 100%">
    <el-main>
      <el-table
        :data="userData"
        style="width: 100%"
        height="99.9%"
        fit
        highlight-current-row
        v-loading="loadingData"
      >
        <el-table-column type="selection" fixed="left"> </el-table-column>
        <el-table-column prop="id" label="序号" width="50"> </el-table-column>
        <el-table-column label="头像" width="60">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.avatar" size="large" fit="fill">
              <!-- 头像加载不出来时的默认图片 -->
              <img src="@/../public/avatar.png" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="手机号码" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="60">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="60"> </el-table-column>
        <el-table-column
          prop="createtime"
          label="创建时间"
          :formatter="formatter"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="lastlogin"
          label="上次登陆"
          show-overflow-tooltip
          :formatter="formatter"
        >
        </el-table-column>

        <el-table-column
          prop="level"
          label="权限"
          width="90"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column
          prop="islogin"
          label="在线"
          width="60"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="90"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑 | 删除"
              placement="top-start"
              :enterable="false"
            >
              <el-button-group>
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  plain
                  @click="goToEdit(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                ></el-button>
              </el-button-group>
            </el-tooltip>
          </template>
        </el-table-column> </el-table
    ></el-main>
    <el-footer>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="$router.push('/home/um/user/add')"
        >添加用户</el-button
      >
    </el-footer>
  </el-container>
</template>
<script>
export default {
  name: "ManageUser",
  data() {
    return {
      userData: [],
      loadingData: false
    };
  },
  methods: {
    async getAllUserData() {
      await this.axios
        .get("/manage/user/getAll")
        .then(({ data: res }) => {
          if (res.status === 1) {
            this.userData = res.data;
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loadingData = false;
        });
    },
    formatter(row, column, value) {
      switch (column.property) {
        case "level":
          switch (value) {
            case "1":
              return "管理员";
            case "2":
              return "用户";
            case "3":
              return "游客";
            default:
              return "未知权限";
          }
        case "status":
          return value === "0" ? "已注销" : "正常使用";
        case "islogin":
          return value === "0" ? "离线" : "在线";
        default:
          if (value === "" || value == null) return "未登录过";
          return this.dayjs(value).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    goToEdit(user) {
      this.$router.push("/home/um/user/" + user.id);
    }
  },
  created() {},
  mounted() {
    this.loadingData = true;
    this.getAllUserData();
  }
};
</script>
<style lang="scss" scoped>
.el-main {
  padding: 0;
}

.el-footer {
  line-height: 60px;
}
</style>
