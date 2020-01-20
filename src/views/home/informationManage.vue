<template>
    <div id="main">
        <div class="backLayout">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>资讯管理</el-breadcrumb-item>
                <router-link :to="{path:'/addInformation',query:{type:'add'}}"><el-button type="primary">添加资讯</el-button></router-link>
            </el-breadcrumb>
            <tableList :tableData="tableData" :titles="titles" operate='true' flag='homeManage5' :homeManage5=true @open='open'></tableList>
           <pagination ref="page" :paginationShow="paginationShow" :listTotal="listTotal" @pageChangeSize="pageChangeSize" @page="page"></pagination>
        </div>
    </div>
</template>
<script>
    import tableList from '../components/tableList'
    import pagination from '../components/pagination'
    export default {
        name: "information-manage",
        components:{
            tableList,
            pagination
        },
        data(){
            return{
							  pageSize:10,
							  paginationShow:true,
							  listTotal:0,
                titles:[
                    {
                        prop:'id',
                        label:'资讯id'
                    },{
                        prop:'title',
                        label:'资讯标题'
                    },{
                        prop:'type',
                        label:'所属分类'
                    },{
                        prop:'status',
                        label:'状态'
                    },{
                        prop:'creater',
                        label:'发布者'
                    },{
                        prop:'createTime',
                        label:'发布时间'
                    },
                ],
                tableData:[],
            }
        },
        methods:{
					page(val){
						this.getList(val)
					},
					pageChangeSize(val){
						this.paginationShow = false;
									this.$nextTick(function () {
									this.paginationShow = true;
									})
									this.$refs.page.setSize(val);
									this.pageSize = val; 
									this.getList(1)
					},
            open(id,flag){
                const token=localStorage.getItem('token');
                let that=this;
                let idArray=[id];
                if (flag=='资讯删除提示') {
                  this.$confirm('确认要删除资讯吗，删除后将无法恢复?', flag, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {                   
                    this.$axios.post(this.$baseUrl+'/news/delete?token='+token,idArray)
                    .then(function(res){
                        console.log(res)
                        that.refresh()
                        that.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    })
                    .catch(function(err){
                        console.log(err)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });  
                }               
            },
            refresh(){
            //策略进行DOM的更新，表格以及分页刷新
            //this.paginationShow = false;
            this.$nextTick(function () {
              this.tableData=[];
              this.getList(1);
              //this.paginationShow = true;
            })
          },
          getList(page){
            const token=localStorage.getItem('token');
            let that=this;
            this.$axios.get(this.$baseUrl+'/news/paged/manage?page='+page+'&size='+this.pageSize+'&token='+token,{})
            .then(function(res){
                console.log(res.data)
                let data=res.data.data.list;
								that.listTotal = res.data.data.totalRow;
								that.tableData = []
                data.forEach(function(value,index,array){
                    if (value.status==0) {
                        value.status="未发布"
                    }
                    if (value.status==1) {
                        value.status="已发布"
                    }
                    let date=new Date(value.created)
                    let createDate=that.changeDate(date,'yyyy-MM-dd')
                    that.tableData.push({
                        id:value.id,
                        title:value.title,
                        type:value.categoryName,
                        project:that.$pictrueShowUrl+'/data/access/'+value.coverImg,
                        status:value.status,
                        creater:value.publisher,
                        createTime:createDate
                    })
                })
            })
            .catch(function(err){
                console.log(err)
            })
          }
        },

        created:function(){
            this.getList(1)
        }
    }
</script>

<style scoped>

</style>