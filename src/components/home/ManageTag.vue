<template>
  <div class="bookinfo-edit">
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
          ref="tagData"
          :model="tagData"
        >
          <el-form-item v-if="tagData.id !== null" label="序号" prop="id">
            <el-input v-bind:value="tagData.id" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="tagData.name !== null" label="标签" prop="name">
            <el-input v-model="tagData.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitTagInfo">提交</el-button>
            <el-button @click="getTagData">重置</el-button>
          </el-form-item>
        </el-form></el-main
      >
    </el-container>
  </div>
</template>
<script>
export default {
  name: "ManageTag",
  data() {
    return {
      tagData: [],
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
      this.initTagData();
      switch (this.$route.params.action) {
        case "add":
          this.headerContent = "添加新标签";
          this.submitInfo = {
            submitURL: "/manage/tag/add",
            successMSG: "添加标签成功！"
          };
          break;

        default:
          this.headerContent = "编辑标签信息";
          this.tagData.id = this.$route.params.action;
          this.submitInfo = {
            submitURL: "/manage/tag/" + this.tagData.id + "/update",
            successMSG: "修改标签信息成功！"
          };
          this.getTagData();
          break;
      }
    },
    /**
     * 初始化标签数据
     * 如果值为null则对应的表单项不会进行显示
     */
    initTagData() {
      switch (this.$route.params.action) {
        case "add":
          this.tagData = {
            id: null,
            name: ""
          };
          break;

        default:
          //已经有值或者值为null的数据不会被覆盖
          this.tagData = {
            id: this.tagData.id ? this.tagData.id : "",
            name: this.tagData.name ? this.tagData.name : ""
          };
          break;
      }
    },

    /**
     * 根据路径中的ID参数获取绘本信息
     */
    async getTagData() {
      this.loadingData = true;
      await this.axios
        .get("/manage/tag/" + this.tagData.id + "/get")
        .then(({ data: res }) => {
          if (res.status === 1) {
            this.tagData = res.data;
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          this.$alert(err.message, "提示", {
            confirmButtonText: "好的",
            callback: () => {}
          });
        })
        .finally(() => {
          this.loadingData = false;
          this.initTagData();
        });
    },
    /**
     * 提交数据
     */
    async submitTagInfo() {
      this.loadingData = true;
      await this.axios
        .post(this.submitInfo.submitURL, this.tagData)
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
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.bookinfo-edit,
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
