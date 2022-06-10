<template>
  <div class="userinfo-edit">
    <el-container>
      <el-header
        ><el-page-header
          @back="$router.back()"
          style="line-height: 60px"
          :content="headerContent"
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
            v-if="userData.avatar !== null"
            style="line-height: 80px"
            label="头像"
            prop="avatar"
            size="large"
          >
            <div style="position: relative">
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
          <el-form-item v-if="userData.id !== null" label="序号" prop="id">
            <el-input v-bind:value="userData.id" disabled></el-input>
          </el-form-item>
          <el-form-item
            v-if="userData.username !== null"
            label="用户名"
            prop="username"
          >
            <el-input v-model="userData.username"></el-input>
          </el-form-item>
          <el-form-item
            v-if="userData.password !== null"
            label="登陆密码"
            prop="password"
          >
            <el-input v-model="userData.password"></el-input>
          </el-form-item>
          <el-form-item
            v-if="userData.phone !== null"
            label="手机号码"
            prop="phone"
          >
            <el-input v-model="userData.phone"></el-input>
          </el-form-item>
          <el-form-item
            v-if="userData.email !== null"
            prop="email"
            label="邮箱"
          >
            <el-input v-model="userData.email"></el-input>
          </el-form-item>
          <el-form-item
            v-if="userData.nickname !== null"
            prop="nickname"
            label="昵称"
          >
            <el-input v-model="userData.nickname"></el-input>
          </el-form-item>
          <el-form-item v-if="userData.age !== null" prop="age" label="年龄">
            <el-input v-model="userData.age"></el-input>
          </el-form-item>
          <el-form-item
            v-if="userData.gender !== null"
            prop="gender"
            label="性别"
          >
            <el-radio-group v-model="userData.gender" size="medium">
              <el-radio :label="'男'">男性</el-radio>
              <el-radio :label="'女'">女性</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="userData.islogin !== null"
            prop="islogin"
            label="在线"
          >
            <el-radio-group v-model="userData.islogin" size="medium">
              <el-radio :label="'1'">在线</el-radio>
              <el-radio :label="'0'">离线</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="userData.status !== null"
            prop="status"
            label="使用状态"
          >
            <el-radio-group v-model="userData.status" size="medium">
              <el-radio :label="'1'">正常</el-radio>
              <el-radio :label="'0'">注销</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="userData.level !== null"
            prop="level"
            label="权限"
          >
            <el-radio-group v-model="userData.level" size="mini">
              <el-radio-button :label="'1'">管理员</el-radio-button>
              <el-radio-button :label="'2'">用户</el-radio-button>
              <el-radio-button :label="'3'">游客</el-radio-button>
            </el-radio-group></el-form-item
          >
          <el-form-item
            v-if="userData.createtime !== null"
            prop="createtime"
            label="创建日期"
          >
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
          <el-form-item
            v-if="userData.lastlogin !== null"
            prop="lastlogin"
            label="上次登陆"
          >
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
            <el-button type="primary" @click="submitUserInfo">提交</el-button>
            <el-button @click="getUserData">重置</el-button>
          </el-form-item>
        </el-form></el-main
      >
    </el-container>
  </div>
</template>
<script>
export default {
  name: "ManageUser",
  data() {
    return {
      userData: {},
      loadingData: false,
      headerContent: "",
      submitInfo: {}
    };
  },
  methods: {
    /**
     * 根据路径参数初始化组件
     */
    init() {
      this.initUserData();
      switch (this.$route.params.action) {
        case "add":
          this.headerContent = "添加新用户";
          this.submitInfo = {
            submitURL: "/manage/user/add",
            successMSG: "添加新用户成功！"
          };
          break;

        default:
          this.headerContent = "编辑用户信息";
          this.userData.id = this.$route.params.action;
          this.submitInfo = {
            submitURL: "/manage/user/" + this.userData.id + "/update",
            successMSG: "修改用户信息成功！"
          };
          this.getUserData();
          break;
      }
    },
    /**
     * 初始化用户数据
     * 如果值为null则对应的表单项不会进行显示
     */
    initUserData() {
      switch (this.$route.params.action) {
        case "add":
          this.userData = {
            avatar: "",
            id: null,
            username: "",
            phone: "",
            email: "",
            nickname: "",
            age: "",
            gender: "",
            islogin: null,
            status: "1",
            level: "2",
            createtime: null,
            lastlogin: null,
            password: ""
          };
          break;

        default:
          //已经有值或者值为null的数据不会被覆盖
          this.userData = {
            avatar: this.userData.avatar ? this.userData.avatar : "",
            id: this.userData.id ? this.userData.id : "",
            username: this.userData.username ? this.userData.username : "",
            phone: this.userData.phone ? this.userData.phone : "",
            email: this.userData.email ? this.userData.email : "",
            nickname: this.userData.nickname ? this.userData.nickname : "",
            age: this.userData.age ? this.userData.age : "",
            gender: this.userData.gender ? this.userData.gender : "",
            islogin: this.userData.islogin ? this.userData.islogin : "",
            status: this.userData.status ? this.userData.status : "",
            level: this.userData.level ? this.userData.level : "",
            createtime: this.userData.createtime
              ? this.userData.createtime
              : "",
            lastlogin: this.userData.lastlogin ? this.userData.lastlogin : "",
            password: null
          };
          break;
      }
    },
    /**
     * 根据路径中的ID参数获取用户信息
     */
    async getUserData() {
      this.loadingData = true;
      await this.axios
        .get("/manage/user/" + this.userData.id + "/get")
        .then(({ data: res }) => {
          if (res.status === 1) {
            this.userData = res.data;
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          this.$alert(err.message, "提示", {
            confirmButtonText: "好的",
            callback: () => {
              // this.getUserData();
            }
          });
        })
        .finally(() => {
          this.loadingData = false;
          console.log(this.userData);
          //再次初始一下数据，防止原来为null的数据被获取的值覆盖
          this.initUserData();
        });
    },
    /**
     * 提交用户数据
     */
    async submitUserInfo() {
      this.loadingData = true;
      await this.axios
        .post(this.submitInfo.submitURL, this.userData)
        .then(({ data: res }) => {
          if (res.status === 1) {
            this.$alert(this.submitInfo.successMSG, "提示", {
              type: "success",
              confirmButtonText: "好的"
            });
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          this.$alert(err.message, "提示", {
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
  created() {
    this.init();
  }
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
