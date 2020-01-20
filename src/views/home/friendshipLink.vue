<template>
<div id="main">
  <div class="backLayout">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>友情链接</el-breadcrumb-item>
      <!--<el-button type="primary" @click="edit()">添加友情链接</el-button>-->
    </el-breadcrumb>
    <tableList :tableData="tableData" :titles="titles" :operate='false' flag='friendshipLink' @edit="edit"></tableList>
    <pagination></pagination>
    <dialogBox :dialogVisible='show' :flag="flag" @close="close" :datas="datas" @newsType="newsType"></dialogBox>
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
      flag: '',
      id: 0,
      titles: [{
          prop: 'id',
          label: '序号',
          width: '80px',
        }, {
          prop: 'title',
          label: '名称'
        },
        {
          prop: 'contact',
          label: '跳转URL'
        },
        // {
        //   prop: 'sort',
        //   label: '排序值'
        // },
        // {
        //   prop: 'creater',
        //   label: '创建人'
        // },
        // {
        //   prop: 'createTime',
        //   label: '创建时间'
        // }
      ],
      tableData: [{
          id: "1",
          title: "实践能力服务平台",
          contact: 'http://api.succy.cn/portal/#/cloudHome',
          sort: "1",
          creater: "0",
          createTime: "2018-12-26 10:31:26",
        },
        {
          id: "2",
          title: "广西科技大学",
          contact: 'http://www.gxust.edu.cn/',
          sort: "1",
          creater: "0",
          createTime: "2018-12-26 10:31:26",
        },
        // {
        //   id: "3",
        //   title: "广西科大软件学院",
        //   contact: 'http://www.gxut.edu.cn/maps/index/id/35',
        //   sort: "1",
        //   creater: "0",
        //   createTime: "2018-12-26 10:31:26",
        // },
        {
          id: "4",
          title: "润澄科技",
          contact: 'http://www.gxrc.com',
          sort: "1",
          creater: "0",
          createTime: "2018-12-26 10:31:26",
        },
        {
          id: "5",
          title: "千锋教育",
          contact: 'http://www.mobiletrain.org',
          sort: "1",
          creater: "0",
          createTime: "2018-12-26 10:31:26",
        },
        {
          id: "6",
          title: "东软睿道",
          contact: 'http://www.neuedu.com',
          sort: "1",
          creater: "0",
          createTime: "2018-12-26 10:31:26",
        },
        {
          id: "7",
          title: "深圳尚观",
          contact: 'http://www.gduplooking.com/',
          sort: "1",
          creater: "0",
          createTime: "2018-12-26 10:31:26",
        },
        {
          id: "8",
          title: "上海杰普",
          contact: 'http://www.briup.com',
          sort: "1",
          creater: "0",
          createTime: "2018-12-26 10:31:26",
        }
      ],
      datas: []
    }
  },
  methods: {
    edit(id, flag, title) {
      if (flag == undefined) {
        this.flag = '添加友情链接'
        this.datas = {
          name: ''
        }
      } else {
        this.flag = flag;
        this.datas = {
            name: title
          },
          this.id = id;
      }
      this.show = true;
    },
    newsType(flag) {
      const token = localStorage.getItem('token');
      let that = this;
      if (flag == '编辑友情链接') {
        this.$axios.post(this.$baseUrl + "/news/category/update?token=" + token, {
            id: that.id,
            name: that.datas.name
          })
          .then(function(res) {
            console.log(res)
            that.$message({
              type: "success",
              message: '修改成功！'
            })
            that.show = false;
            that.refresh()
          })
          .catch(function(err) {
            console.log(err)
          })
        //               that.show=false
      }
      if (flag == '添加友情链接') {
        this.$axios.post(this.$baseUrl + "/news/category/create?token=" + token, {
            name: this.datas.name
          })
          .then(function(res) {
            console.log(res)
            that.refresh();
            that.$message({
              type: "success",
              message: '添加成功！'
            })
            that.show = false
          })
          .catch(function(err) {
            console.log(err)
          })
        that.show = false
      }
    },
    close() {
      this.show = false;
    },
  }
}
</script>

<style>
</style>
