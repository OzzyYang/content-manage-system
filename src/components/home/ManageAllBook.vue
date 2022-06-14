<template>
  <el-container style="height: 100%">
    <el-main>
      <el-table
        :data="bookData"
        style="width: 100%"
        height="99.9%"
        fit
        highlight-current-row
        v-loading="loadingData"
      >
        <el-table-column type="selection" fixed="left"> </el-table-column>
        <el-table-column prop="id" label="序号" width="50"> </el-table-column>
        <el-table-column label="封图" width="60">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.cover" size="large" fit="fill">
              <!-- 头像加载不出来时的默认图片 -->
              <img src="@/../public/avatar.png" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="书名"> </el-table-column>
        <el-table-column prop="intro" label="简介"> </el-table-column>
        <el-table-column
          prop="createtime"
          label="创建时间"
          :formatter="formatter"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column prop="tags" label="标签" width="150">
          <template slot-scope="scope">
            <el-tag
              v-for="item in scope.row.tags"
              :key="item.id"
              type="success"
              effect="light"
              style="margin-left: 2px"
            >
              {{ item.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="90"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column prop="VV" label="浏览量" width="120">
        </el-table-column>
        <el-table-column prop="BV" label="借阅量" width="120">
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
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
                  @click="deleteBook(scope.row)"
                ></el-button>
              </el-button-group>
            </el-tooltip>
          </template>
        </el-table-column> </el-table
    ></el-main>
    <el-footer style="text-align: center">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="$router.push('/home/bm/book/add')"
        >添加绘本</el-button
      >
    </el-footer>
  </el-container>
</template>
<script>
export default {
  name: "ManageAllBook",
  data() {
    return {
      bookData: [],
      loadingData: false
    };
  },
  methods: {
    async getAllBookData() {
      this.loadingData = true;
      await this.axios
        .get("/manage/book/getAll")
        .then(({ data: res }) => {
          if (res.status === 1) {
            this.bookData = res.data;
            //格式化tags
            this.bookData.forEach((book, index) => {
              this.bookData[index].tags = this.formateTags(book.tags);
            });
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
    formateTags(tagsStr) {
      var tags = [];
      tagsStr.split(",").forEach((value, index) => {
        tags[index] = {
          id: value.split("-")[0],
          name: value.split("-")[1]
        };
      });
      return tags;
    },
    /**
     * 对DOM元素显示的内容进行格式化
     */
    formatter(row, column, value) {
      switch (column.property) {
        case "status":
          return value === 1 ? "已下架" : "上架中";
        case "createtime":
          return this.dayjs(value).format("YYYY-MM-DD HH:mm:ss");

        default:
          break;
      }
    },
    goToEdit(book) {
      this.$router.push("/home/bm/book/" + book.id);
    },
    async deleteBook(book) {
      await this.$confirm("即将删除绘本, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.loadingData = true;
          this.axios
            .get("/manage/book/" + book.id + "/delete")
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.message
              });
            })
            .finally(() => {
              this.loadingData = false;
              this.getAllBookData();
            });
        })
        .catch(() => {});
    }
  },
  created() {},
  mounted() {
    this.getAllBookData();
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
