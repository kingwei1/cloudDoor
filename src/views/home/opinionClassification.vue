<template>
<div id="main">
  <div class="backLayout">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>意见类型</el-breadcrumb-item>
      <el-button type="primary" @click="openAddDialog">添加意见类型</el-button>
    </el-breadcrumb>
    <tableList :tableData="tableData" :titles="titles" operate='true' flag='opinionClassification' @changeOpinionStatus="changeOpinionStatus" @editOpinionType="editOpinionType"></tableList>
    <!-- <pagination></pagination> -->
    <dialogBox :dialogVisible='show' :acceptOpinionType="oldOpinionType" :flag="flag" @close="close" :datas="datas" @submitNewType="submitNewType"></dialogBox>
  </div>
</div>
</template>

<script>
import tableList from '../components/tableList'
import pagination from '../components/pagination'
import dialogBox from '../components/dialogBox'
export default {
  name: "information-list",
  components: {
    tableList,
    pagination,
    dialogBox
  },
  data() {
    return {
      show: false,
      oldOpinionType: null,
      flag: '',
      id: 0,
      titles: [{
        prop: 'id',
        label: '意见类型ID',
        width: '100px'
      }, {
        prop: 'name',
        label: '意见类型'
      }, {
        prop: 'creatorName',
        label: '创建人',
      }, {
        prop: 'created',
        label: '创建时间',
      }, {
        prop: 'status',
        label: '状态',
      }, ],
      tableData: [],
      datas: [],
      editID: null
    }
  },
  methods: {
    openAddDialog() {
      // 打开添加意见类型弹框
      this.show = true;
      this.flag = '添加意见类型';
    },
    editOpinionType(id, type) {
      this.editID = id;
      this.oldOpinionType = type;
      // 打开编辑意见类型弹框
      this.show = true;
      this.flag = '编辑意见类型';
    },
    submitNewType(val) {
      const loading = this.$loading({
        lock: true,
        text: '请稍后...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const token = localStorage.getItem('token');
      const that = this;
      let httpUrl;
      if (this.flag == '添加意见类型') {
        httpUrl = `${this.$baseUrl}/opinion/type?token=${token}&name=${val}`;
      } else if (this.flag == '编辑意见类型') {
        httpUrl = `${this.$baseUrl}/opinion/updateType?token=${token}&name=${val}&id=${this.editID}`;
        if (!this.editID) {
          that.$message({
            message: '系统错误，请刷新后重试',
            type: 'warning: '
          });
          return;
        }
      }
      this.$axios({
        method: 'post',
        url: httpUrl,
      }).then((response) => {
        if (response.data.code == 0) {
          that.$message({
            message: '提交成功',
            type: 'success'
          });
          that.show = false;
          if (that.flag == '添加意见类型') {
            that.getAllOpinionTypes();
          } else {
            that.tableData.map((item) => {
              if (item.id == that.editID) {
                item.name = val;
              }
            });
          }
        } else {
          that.$message({
            message: response.data.msg,
            type: 'error'
          });
        }
        loading.close();
      }).catch((error) => {
        loading.close();
        console.log(error);
      })
    },
    edit() {

    },
    changeOpinionStatus(id, status) {
      const loading = this.$loading({
        lock: true,
        text: '请稍后...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const token = localStorage.getItem('token');
      const that = this;
      this.$axios({
        method: 'post',
        url: `${this.$baseUrl}/opinion/type/show?token=${token}&id=${id}&flag=${status}`,
      }).then((response) => {
        if (response.data.code == 0) {
          that.$message({
            message: `${status ? '启用' : '禁用'}成功`,
            type: 'success'
          });
          that.tableData.map((item) => {
            if (item.id == id) {
              item.status = status ? '启用' : '禁用';
            }
          });
        }
        loading.close();
      }).catch((error) => {
        loading.close();
        console.log(error);
      })
    },
    close() {
      this.show = false;
    },
    getAllOpinionTypes() {
      // 获取所有意见类型
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const token = localStorage.getItem('token');
      const that = this;
      this.$axios({
        method: 'get',
        url: `${this.$baseUrl}/opinion/allTypes?token=${token}`,
      }).then((response) => {
        if (response.data.code == 0) {
          that.tableData = response.data.data;
          that.tableData.map((item) => {
            item.status = item.status ? '禁用' : '启用';
            item.created = that.changeDate(item.created);
          });
        }
        loading.close();
      }).catch((error) => {
        loading.close();
        console.log(error);
      })
    }
  },
  created: function() {
    this.getAllOpinionTypes();
  }
}
</script>

<style>
</style>
