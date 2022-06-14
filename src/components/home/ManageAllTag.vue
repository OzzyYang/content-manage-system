<template>
  <el-container style="height: 100%">
    <el-main>
      <el-table
        :data="tagData"
        style="width: 100%"
        height="99.9%"
        fit
        highlight-current-row
        v-loading="loadingData"
      >
        <el-table-column type="selection" fixed="left"> </el-table-column>
        <el-table-column prop="id" label="序号" width="50"> </el-table-column>
        <el-table-column prop="name" label="标签名"> </el-table-column>
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
                  @click="deleteTag(scope.row)"
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
        @click="$router.push('/home/tm/tag/add')"
        >添加标签</el-button
      >
    </el-footer>
  </el-container>
</template>
<script>
export default {
  name: "ManageAllTag",
  data() {
    return {
      tagData: [],
      loadingData: false
    };
  },
  methods: {
    async getAllTagData() {
      this.loadingData = true;
      await this.axios
        .get("/manage/tag/getAll")
        .then(({ data: res }) => {
          if (res.status === 1) {
            this.tagData = res.data;
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
    goToEdit(tag) {
      this.$router.push("/home/tm/tag/" + tag.id);
    },
    async deleteTag(tag) {
      await this.$confirm("即将删标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.loadingData = true;
          this.axios
            .get("/manage/tag/" + tag.id + "/delete")
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
              this.getAllTagData();
            });
        })
        .catch(() => {});
    }
  },
  created() {},
  mounted() {
    this.getAllTagData();
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
