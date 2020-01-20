<template>
<div id="main">
  <div class="backLayout" v-if="false">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>问题列表</el-breadcrumb-item>
      <!-- 问题列表，暂时写死 -->
      <!-- <router-link :to="{path:'/addquestionsList',query:{type:'add'}}">
        <el-button type="primary">添加问题</el-button>
      </router-link> -->
    </el-breadcrumb>
    <tableList :tableData="tableData" :titles="titles" :operate='false' flag='informationList'></tableList>
    <pagination></pagination>
    <dialogBox :dialogVisible='show' :flag="flag" @close="close" :datas="datas"></dialogBox>
  </div>
  <div class="backLayout" style="text-align: center; margin-top: 250px; font-size: 16px; color: #ccc;">暂无数据</div>
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
        label: '问题ID'
      }, {
        prop: 'title',
        label: '问题标题'
      }, {
        prop: 'oneclass',
        label: '一级分类'
      }, {
        prop: 'twoclass',
        label: '二级分类'
      }, {
        prop: 'sort',
        label: '排序值'
      }, {
        prop: 'status',
        label: '状态'
      }, {
        prop: 'creater',
        label: '创建人'
      }, {
        prop: 'createTime',
        label: '发布时间'
      }, ],
      tableData: [{
          id: "1",
          title: "广西科技大学",
          oneclass: "实习系统",
          twoclass: "实训一",
          sort: "10",
          status: "已发布",
          creater: "0",
          createTime: "2018-12-26 10:31:26"
        },
        {
          id: "2",
          title: "广西科技大学",
          oneclass: "实习系统",
          twoclass: "实训一",
          sort: "10",
          status: "已发布",
          creater: "0",
          createTime: "2018-12-26 10:31:26"
        },
        {
          id: "3",
          title: "广西科技大学",
          oneclass: "实习系统",
          twoclass: "实训一",
          sort: "10",
          status: "已发布",
          creater: "0",
          createTime: "2018-12-26 10:31:26"
        },
        {
          id: "4",
          title: "广西科技大学",
          oneclass: "实习系统",
          twoclass: "实训一",
          sort: "10",
          status: "未发布",
          creater: "0",
          createTime: "2018-12-26 10:31:26"
        }
      ],
      datas: []
    }
  },
  methods: {
    //          edit(id,flag,title){
    //              if(flag==undefined){
    //                  this.flag='添加资讯分类'
    //                  this.datas={
    //                      name:''
    //                  }
    //              }else{
    //                  this.flag=flag;
    //                  this.datas={
    //                      name:title
    //                  },
    //                  this.id=id;
    //              }
    //              this.show=true;
    //          },
    //          newsType(flag){
    //              const token=localStorage.getItem('token');
    //              let that=this;
    //              if (flag=='编辑资讯分类') {
    //                  this.$axios.post("http://api.succy.cn/v2/portal/news/category/update?token="+token,{
    //                         id:that.id,
    //                         name:that.datas.name
    //               })
    //               .then(function(res){
    //                  console.log(res)
    //                  that.$message({
    //                      type:"success",
    //                      message:'修改成功！'
    //                  })
    //                  that.show=false;
    //                  that.refresh()
    //               })
    //               .catch(function(err){
    //                  console.log(err)
    //               })
    //              }
    //              if (flag=='添加资讯分类') {
    //                  this.$axios.post("http://api.succy.cn/v1/portal/news/category/create?token="+token,{
    //                         name:this.datas.name
    //               })
    //               .then(function(res){
    //                  console.log(res)
    //                  that.refresh();
    //                  that.$message({
    //                      type:"success",
    //                      message:'添加成功！'
    //                  })
    //                  that.show=false
    //               })
    //               .catch(function(err){
    //                  console.log(err)
    //               })
    //              }
    //          },
    //          refresh(){
    //          //策略进行DOM的更新，表格以及分页刷新
    //          //this.paginationShow = false;
    //          this.$nextTick(function () {
    //            this.tableData=[];
    //            this.getlist();
    //            //this.paginationShow = true;
    //          })
    //          },
    //          close(){
    //              this.show=false;
    //          },
    //          getlist(){
    //          const token=localStorage.getItem('token');
    //          let that=this;
    //          this.$axios.get('http://api.succy.cn/v1/portal/news/category/paged?page=1&size=10&token='+token,{})
    //          .then(function(res){
    //              console.log(res.data)
    //              let data=res.data.data.list;
    //              data.forEach(function(value,index,array){
    //                  let date=new Date(value.created)
    //                  let createDate=that.changeDate(date,'yyyy-MM-dd')
    //                  that.tableData.push({
    //                      id:value.id,
    //                      title:value.name,
    //                      creater:value.publisher,
    //                      createTime:createDate
    //                  })
    //              })
    //          })
    //          .catch(function(err){
    //              console.log(err)
    //          })
    //          }
    //      },
    //      created:function(){
    //         this.getlist()
  }
}
</script>

<style scoped>

</style>
