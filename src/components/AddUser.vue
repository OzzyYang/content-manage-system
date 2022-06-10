<template>
  <div class="userinfo-edit">
    <el-container>
      <el-header
        ><el-page-header
          @back="$router.back()"
          style="line-height: 60px"
          content="添加新用户"
        >
        </el-page-header
      ></el-header>
      <el-main
        ><el-form
          v-loading="loadingData"
          style="width: 300px"
          label-width="80px"
          ref="userData"
          :model="userData"
        >
          <el-form-item
            style="line-height: 80px"
            label="头像"
            prop="avatar"
            size="large"
          >
            <div style="position: relative">
              <!-- <el-image
                style="width: 80px; height: 80px"
                :src="userData.avatar"
                fit="fill"
              >
                <img
                  src="@/../public/avatar.png"
                  slot="error"
                  class="image-slot"
                />
              </el-image> -->
              <el-avatar :src="userData.avatar" size="large" fit="fill">
                <!-- 头像加载不出来时的默认图片 -->
                <img src="@/../public/avatar.png" />
              </el-avatar>
              <el-button
                icon="el-icon-edit"
                circle
                style="position: absolute; left: 50px"
                size="large"
                @click="$refs.selectAvatar.click()"
              ></el-button>
              <!-- 隐式文件上传框 -->
              <input
                ref="selectAvatar"
                type="file"
                @change="editAvatar"
                style="display: none"
              />
            </div>
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
          <el-form-item prop="age" label="年龄">
            <el-input v-model="userData.age"></el-input>
          </el-form-item>
          <el-form-item prop="gender" label="性别">
            <el-radio-group v-model="userData.gender" size="medium">
              <el-radio :label="'男'">男性</el-radio>
              <el-radio :label="'女'">女性</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="islogin" label="在线">
            <el-radio-group v-model="userData.islogin" size="medium">
              <el-radio :label="'1'">在线</el-radio>
              <el-radio :label="'0'">离线</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="status" label="使用状态">
            <el-radio-group v-model="userData.status" size="medium">
              <el-radio :label="'1'">正常</el-radio>
              <el-radio :label="'0'">注销</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="level" label="权限">
            <el-radio-group v-model="userData.level" size="mini">
              <el-radio-button :label="'1'">管理员</el-radio-button>
              <el-radio-button :label="'2'">用户</el-radio-button>
              <el-radio-button :label="'3'">游客</el-radio-button>
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
            <el-button @click="getUserData">重置</el-button>
          </el-form-item>
        </el-form></el-main
      >
    </el-container>
  </div>
</template>
<script>
export default {
  name: "AddUser",
  data() {
    return {
      userData: {},
      loadingData: false
    };
  },
  methods: {
    /**
     * 获取需要管理的用户数据
     */
    getUserData() {},
    /**
     * 提交用户更新的数据
     */
    async submitUpdate() {
      this.loadingData = true;
      await this.axios
        .post(
          "/manage/user/" + this.$route.params.id + "/update",
          this.userData
        )
        .then(({ data: res }) => {
          if (res.status === 1) {
            this.$alert("用户信息修改成功！", "提示", {
              type: "success",
              confirmButtonText: "好的"
            });
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          this.$alert("网络开小差了，请重试~", "提示", {
            confirmButtonText: "好的"
          });
        })
        .finally(() => {
          this.loadingData = false;
        });
    },
    editAvatar(e) {
      if (e.target.files && e.target.files[0]) {
        const selectedAvatar = e.target.files[0];
        //是否为JPG格式或者PNG格式
        const isJPGOrPng =
          selectedAvatar.type === "image/jpeg" ||
          selectedAvatar.type === "image/png";
        //大小是否小于等于500KB
        const isST100K = selectedAvatar.size / 1024 / 1024 <= 0.1;
        if (!isJPGOrPng) {
          return this.$message.error("图片只能是JPG或者PNG格式！");
        }
        if (!isST100K) {
          return this.$message.error("图片大小不能超过100Kb！");
        }
        const userData = this.userData;
        var reader = new FileReader();
        //监听读取事件
        reader.addEventListener(
          "load",
          function () {
            // 将图片文件转化为Base64格式
            userData.avatar = reader.result;
          },
          false
        );
        reader.readAsDataURL(selectedAvatar); //读取图片
      }
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.userinfo-edit,
.el-container {
  height: 100%;
}

.el-header {
  border: 1px solid #dcdfe6;
}

.el-main {
  background-color: white;
}
</style>
