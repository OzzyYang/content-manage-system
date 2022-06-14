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
          ref="bookData"
          :model="bookData"
        >
          <el-form-item
            v-if="bookData.cover !== null"
            style="line-height: 80px"
            label="封图"
            prop="cover"
            size="large"
          >
            <div style="position: relative">
              <el-avatar :src="bookData.cover" size="large" fit="fill">
                <!-- 头像加载不出来时的默认图片 -->
                <img src="@/../public/avatar.png" />
              </el-avatar>
              <el-button
                icon="el-icon-edit"
                circle
                style="position: absolute; left: 50px"
                size="large"
                @click="$refs.selectCover.click()"
              ></el-button>
              <!-- 隐式文件上传框 -->
              <input
                ref="selectCover"
                type="file"
                @change="editCover"
                style="display: none"
              />
            </div>
          </el-form-item>
          <el-form-item v-if="bookData.id !== null" label="序号" prop="id">
            <el-input v-bind:value="bookData.id" disabled></el-input>
          </el-form-item>
          <el-form-item
            v-if="bookData.title !== null"
            label="标题"
            prop="title"
          >
            <el-input v-model="bookData.title"></el-input>
          </el-form-item>
          <el-form-item v-if="bookData.title !== null" label="标签" prop="tags">
            <el-select
              v-model="bookData.tags"
              multiple
              placeholder="请选择标签"
            >
              <el-option
                v-for="item in tagsData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item
            v-if="bookData.level !== null"
            prop="level"
            label="权限"
          >
            <el-radio-group v-model="bookData.level" size="mini">
              <el-radio-button :label="'1'">管理员</el-radio-button>
              <el-radio-button :label="'2'">用户</el-radio-button>
              <el-radio-button :label="'3'">游客</el-radio-button>
            </el-radio-group></el-form-item
          > -->
          <el-form-item
            v-if="bookData.createtime !== null"
            prop="createtime"
            label="创建日期"
          >
            <el-input
              placeholder="请选择日期"
              suffix-icon="el-icon-date"
              v-bind:value="
                bookData.createtime
                  ? dayjs(bookData.createtime).format('YYYY-MM-DD HH:mm:ss')
                  : ''
              "
              disabled
            >
            </el-input
          ></el-form-item>
          <el-form-item
            v-if="bookData.status !== null"
            prop="status"
            label="状态"
          >
            <el-radio-group v-model="bookData.status" size="medium">
              <el-radio :label="1">已下架</el-radio>
              <el-radio :label="2">上架中</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            v-if="bookData.intro !== null"
            label="简介"
            prop="title"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 6 }"
              placeholder="请输入内容"
              v-model="bookData.intro"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitBookInfo">提交</el-button>
            <el-button @click="getBookData">重置</el-button>
          </el-form-item>
        </el-form></el-main
      >
    </el-container>
  </div>
</template>
<script>
export default {
  name: "ManageBook",
  data() {
    return {
      bookData: {},
      tagsData: [],
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
      this.initBookData();
      switch (this.$route.params.action) {
        case "add":
          this.headerContent = "添加新绘本";
          this.submitInfo = {
            submitURL: "/manage/book/add",
            successMSG: "添加新绘本成功！"
          };
          break;

        default:
          this.headerContent = "编辑绘本信息";
          this.bookData.id = this.$route.params.action;
          this.submitInfo = {
            submitURL: "/manage/book/" + this.bookData.id + "/update",
            successMSG: "修改绘本信息成功！"
          };
          this.getBookData();
          break;
      }
    },
    /**
     * 初始化用户数据
     * 如果值为null则对应的表单项不会进行显示
     */
    initBookData() {
      switch (this.$route.params.action) {
        case "add":
          this.bookData = {
            cover: "",
            id: null,
            title: "",
            status: 2,
            createtime: null,
            tags: []
          };
          break;

        default:
          //已经有值或者值为null的数据不会被覆盖
          this.bookData = {
            cover: this.bookData.cover ? this.bookData.cover : "",
            id: this.bookData.id ? this.bookData.id : "",
            title: this.bookData.title ? this.bookData.title : "",
            status: this.bookData.status ? this.bookData.status : "",
            createtime: this.bookData.createtime
              ? this.bookData.createtime
              : "",
            intro: this.bookData.intro ? this.bookData.intro : "",
            tags: this.bookData.tags ? this.bookData.tags : []
          };
          break;
      }
    },
    formateTagStr(tagStr) {
      console.log(this.bookData);
      var tags = [];
      tagStr.split(",").forEach((tag, index) => {
        tags[index] = parseInt(tag.split("-")[0]);
      });
      return tags;
    },
    async getAllTags() {
      await this.axios
        .get("/manage/tag/getAll")
        .then(({ data: res }) => {
          if (res.status === 1) {
            this.tagsData = res.data;
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          this.$alert(err.message, "提示", {
            confirmButtonText: "好的",
            callback: () => {}
          });
        });
    },
    /**
     * 根据路径中的ID参数获取绘本信息
     */
    async getBookData() {
      this.loadingData = true;
      await this.axios
        .get("/manage/book/" + this.bookData.id + "/get")
        .then(({ data: res }) => {
          if (res.status === 1) {
            this.bookData = res.data;
            //格式化tags
            this.bookData.tags = this.formateTagStr(this.bookData.tags);
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
          this.initBookData();
        });
    },
    /**
     * 提交数据
     */
    async submitBookInfo() {
      this.loadingData = true;
      await this.axios
        .post(this.submitInfo.submitURL, this.bookData)
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
    editCover(e) {
      if (e.target.files && e.target.files[0]) {
        const selectedCover = e.target.files[0];
        //是否为JPG格式或者PNG格式
        const isJPGOrPng =
          selectedCover.type === "image/jpeg" ||
          selectedCover.type === "image/png";
        //大小是否小于等于500KB
        const isST100K = selectedCover.size / 1024 / 1024 <= 0.1;
        if (!isJPGOrPng) {
          return this.$message.error("图片只能是JPG或者PNG格式！");
        }
        if (!isST100K) {
          return this.$message.error("图片大小不能超过100Kb！");
        }
        const bookData = this.bookData;
        var reader = new FileReader();
        //监听读取事件
        reader.addEventListener(
          "load",
          function () {
            // 将图片文件转化为Base64格式
            bookData.cover = reader.result;
          },
          false
        );
        reader.readAsDataURL(selectedCover); //读取图片
      }
    }
  },
  created() {
    this.init();
    this.getAllTags();
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
