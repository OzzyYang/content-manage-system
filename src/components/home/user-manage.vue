<template>
  <el-table
    :data="userData"
    style="width: 100%"
    height="99.9%"
    fit
    highlight-current-row
  >
    <el-table-column type="selection"> </el-table-column>
    <el-table-column prop="id" label="序号" width="60"> </el-table-column>
    <el-table-column prop="username" label="用户名" width="120">
    </el-table-column>
    <el-table-column prop="phone" label="手机号码" width="120">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="120"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column prop="nickname" label="昵称" width="120">
    </el-table-column>
    <el-table-column prop="gender" label="性别" width="60"> </el-table-column>
    <el-table-column prop="age" label="年龄" width="60"> </el-table-column>
    <el-table-column
      prop="createtime"
      label="创建时间"
      :formatter="formateDate"
      show-overflow-tooltip
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="lastlogin"
      label="上次登陆"
      show-overflow-tooltip
      :formatter="formateDate"
      width="120"
    >
    </el-table-column>
    <el-table-column prop="avatar" label="头像" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="level" label="权限"> </el-table-column>
    <el-table-column prop="islogin" label="在线"> </el-table-column>
    <el-table-column prop="status" label="状态"> </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      userData: []
    };
  },
  methods: {
    async getUserData() {
      await this.axios
        .get("/manage/user/get")
        .then(({ data: res }) => {
          if (res.status === 1) {
            this.userData = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formateDate(row, column, value) {
      if (value === "" || value == null) return "未登录过";
      return this.dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
    this.getUserData();
  }
};
</script>
<style lang="scss" scoped></style>
