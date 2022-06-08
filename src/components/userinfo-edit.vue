<template>
  <div>
    <el-container>
      <el-header
        ><el-page-header
          @back="goBack"
          style="line-height: 60px"
          content="用户详情"
        >
        </el-page-header
      ></el-header>
      <el-main style="justify-content='center'"
        ><el-form
          style="width: 300px;text-align='none';"
          label-width="80px"
          ref="userData"
          :model="userData"
        >
          <el-form-item label="头像" prop="avatar">
            <el-avatar size="mini" :src="userData.avatar"></el-avatar>
          </el-form-item>
          <el-form-item label="序号" prop="id">
            <el-input v-bind:value="userData.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userData.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="userData.phone"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="userData.email"></el-input>
          </el-form-item>
          <el-form-item prop="nickname" label="昵称">
            <el-input v-model="userData.nickname"></el-input>
          </el-form-item>
          <el-form-item prop="gender" label="性别">
            <el-radio-group v-model="userData.gender" size="medium">
              <el-radio :label="'男'">男性</el-radio>
              <el-radio :label="'女'">女性</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="islogin" label="在线">
            <el-radio-group v-model="userData.islogin" size="medium">
              <el-radio :label="1">在线</el-radio>
              <el-radio :label="0">离线</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="status" label="使用状态">
            <el-radio-group v-model="userData.status" size="medium">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="0">注销</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="level" label="权限">
            <el-radio-group v-model="userData.level" size="mini">
              <el-radio-button :label="1">管理员</el-radio-button>
              <el-radio-button :label="2">用户</el-radio-button>
              <el-radio-button :label="3">游客</el-radio-button>
            </el-radio-group></el-form-item
          >
          <el-form-item prop="createtime" label="创建日期">
            <el-input
              placeholder="请选择日期"
              suffix-icon="el-icon-date"
              v-bind:value="
                userData.createtime
                  ? dayjs(userData.createtime).format('YYYY-MM-DD HH:mm:ss')
                  : ''
              "
              disabled
            >
            </el-input
          ></el-form-item>
          <el-form-item prop="lastlogin" label="上次登陆">
            <el-input
              placeholder="请选择日期"
              suffix-icon="el-icon-date"
              v-bind:value="
                userData.lastlogin
                  ? dayjs(userData.lastlogin).format('YYYY-MM-DD HH:mm:ss')
                  : '未登录过'
              "
              disabled
            >
            </el-input
          ></el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpdate">提交</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form></el-main
      >
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {}
    };
  },
  methods: {
    async getUserData() {
      await this.axios
        .get("/manage/user/" + this.$route.params.id + "/get")
        .then(({ data: res }) => {
          console.log(res);
          if (res.status === 1) {
            this.userData = res.data;
          }
        })
        .catch(() => {
          this.$alert("网络开小差了，请重试~", "提示", {
            confirmButtonText: "好的",
            callback: () => {
              this.getUserData();
            }
          });
        });
    },
    goBack() {
      this.$router.back();
    },
    async submitUpdate() {
      await this.axios
        .post(
          "/manage/user/" + this.$route.params.id + "/update",
          this.userData
        )
        .then(({ data: res }) => {
          if (res.status === 1) {
            this.$alert("用户信息修改成功！", "提示", {
              confirmButtonText: "好的"
            });
          }
        })
        .catch(() => {
          this.$alert("网络开小差了，请重试~", "提示", {
            confirmButtonText: "好的"
          });
        });
    }
  },
  created() {
    this.getUserData();
  }
};
</script>
<style lang="scss" scoped></style>
