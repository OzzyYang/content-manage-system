<template>
  <div id="login-view">
    <!-- 登陆框 -->
    <div class="login-box">
      <!-- 标题 -->
      <h1 class="title">后台管理系统</h1>
      <!-- 输入表单 -->
      <el-form
        :model="inputForm"
        label-width="auto"
        :rules="valiRules"
        hide-required-asterisk
        ref="inputForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            placeholder="请输入账号"
            v-model="inputForm.account"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="inputForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <div class="buttons">
          <el-button
            type="primary"
            round
            plain
            @click="login"
            resetField
            :loading="isLogin"
            >{{ isLogin ? "登录中" : "登录" }}</el-button
          >
          <el-button type="primary" round plain @click="register"
            >注册</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginView",
  data() {
    return {
      inputForm: {
        account: "",
        password: ""
      },
      valiRules: {
        account: [
          {
            required: true,
            message: "请输入您注册时使用的手机号码",
            trigger: "blur"
          },
          {
            min: 11,
            max: 11,
            message: "手机号码长度应为11位数字",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度在6 ~ 16位之间",
            trigger: "blur"
          }
        ]
      },
      isLogin: false
    };
  },
  methods: {
    async login() {
      var valiResult = false;
      //前端验证输入数据是否合法
      this.$refs.inputForm.validate((result) => {
        valiResult = result;
        if (!valiResult) {
          return this.$message({
            showClose: true,
            type: "error",
            duration: 3000,
            message: "登陆失败！"
          });
        }
      });
      if (!valiResult) {
        return;
      }
      this.isLogin = true;
      //向服务器请求Token
      await this.axios({
        method: "post",
        url: "/user/login",
        data: {
          username: this.inputForm.account,
          password: this.inputForm.password
        }
      })
        .then(({ data: res }) => {
          this.isLogin = false;
          if (res.status === 1) {
            this.$message({
              showClose: true,
              type: "success",
              duration: 1000,
              message: "登陆成功！"
            });
            this.$router.push("/home");
          } else {
            this.$message({
              showClose: true,
              type: "error",
              duration: 3000,
              message: res.message
            });
          }
        })
        .catch((err) => {
          this.isLogin = false;
          return this.$message({
            showClose: true,
            type: "error",
            duration: 3000,
            message: err.message
          });
        });
    },
    register() {
      this.$message({
        showClose: true,
        type: "info",
        duration: 3000,
        message: "暂未开放注册功能。"
      });
    }
  },
  mounted() {
    window.document.body.style.background = "#232946";
  }
};
</script>
<style lang="scss" scoped>
#login-view {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  max-width: 400px;
  min-width: 300px;
  padding: 20px 30px;
  background: white;
  border: 1px solid #efefef;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 1px rgba(255, 255, 255, 0.6);
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
  color: #fffffe;
}

.title {
  color: #439fff;
  margin-bottom: 15px;
  text-align: center;
  font-size: 25px;
}
</style>
