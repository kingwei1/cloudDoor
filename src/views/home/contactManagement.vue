<template>
<div id="main">
  <div class="backLayout">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>联系我们</el-breadcrumb-item>
      <!-- <el-button type="primary" @click="edit()">添加主题</el-button> -->
    </el-breadcrumb>
    <tableList :tableData="tableData" :titles="titles" :operate='false' flag='informationList'></tableList>
    <pagination></pagination>
    <dialogBox :dialogVisible='show' :flag="flag" @close="close" :datas="datas"></dialogBox>
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
          width: '50px'
        }, {
          prop: 'title',
          label: '名称'
        }, {
          prop: 'phone',
          label: '联系电话',
          width: '150px'
        }, {
          prop: 'email',
          label: '联系邮箱',
          width: '200px'
        },
        //  {
        //   prop: 'creater',
        //   label: '创建人'
        // }, {
        //   prop: 'createTime',
        //   label: '创建时间'
        // }
      ],
      tableData: [{
        id: "1",
        title: "广西科技大学计算科学与通信工程（软件工程）学院    校企合作办公室",
        email: '',
        sort: "1",
        creater: "0",
        createTime: "2018-12-26 10:31:26",
        phone: '0772-2685975'
      }],
      datas: []
    }
  },
  methods: {
    close() {
      
    }
  }
}
</script>

<style>
</style>
