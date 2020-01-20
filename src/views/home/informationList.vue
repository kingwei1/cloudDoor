<template>
    <div id="main">
        <div class="backLayout">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>资讯分类</el-breadcrumb-item>
                <el-button type="primary" @click="edit()">添加资讯分类</el-button>
            </el-breadcrumb>
            <tableList :tableData="tableData" :titles="titles" operate='true' flag='informationList' 
						@edit="edit" @changeStatus="changeStatus"></tableList>
            <pagination ref="page" :paginationShow="paginationShow" :listTotal="listTotal" @pageChangeSize="pageChangeSize" @page="page"></pagination>
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
        components:{
            tableList,
            pagination,
            dialogBox
        },
        data(){
            return{
								pageSize:10,
								paginationShow:true,
								listTotal:0,
                show:false,
                flag:'',
                id:0,
                titles:[
                    {
                        prop:'id',
                        label:'资讯分类ID'
                    },{
                        prop:'title',
                        label:'分类名称'
                    },{
                        prop:'creater',
                        label:'创建者'
                    },{
                        prop:'createTime',
                        label:'创建时间'
                    },
                ],
                tableData:[],
                datas:[]
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
            edit(id,flag,title){
                if(flag==undefined){
                    this.flag='添加资讯分类'
                    this.datas={
                        name:''
                    }
                }else{
									console.log(id,flag,title)
                    this.flag=flag;
                    this.datas={
                        name:title
                    },
                    this.id=id;
                }
                this.show=true;
            },
						changeStatus(id,state){
							
						},
            newsType(flag){
                const token=localStorage.getItem('token');
                let that=this;
                if (flag=='编辑资讯分类') {
                    this.$axios.post(this.$baseUrl+"/news/category/update?token="+token,{
                           id:that.id,
                           name:that.datas.name
                 })
                 .then(function(res){
                    console.log(res)
                    that.$message({
                        type:"success",
                        message:'修改成功！'
                    })
                    that.show=false;
                    that.refresh()
                 })
                 .catch(function(err){
                    console.log(err)
                 })
                }
                if (flag=='添加资讯分类') {
                    this.$axios.post(this.$baseUrl+"/news/category/create?token="+token,{
                           name:this.datas.name
                 })
                 .then(function(res){
                    console.log(res)
                    that.refresh();
                    that.$message({
                        type:"success",
                        message:'添加成功！'
                    })
                    that.show=false
                 })
                 .catch(function(err){
                    console.log(err)
                 })
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
            close(){
                this.show=false;
            },
            getList(page){
            const token=localStorage.getItem('token');
            let that=this;
            this.$axios.get(this.$baseUrl+'/news/category/paged?page='+page+'&size='+this.pageSize+'&token='+token,{})
            .then(function(res){
                console.log(res.data)
                let data=res.data.data.list
								that.listTotal = res.data.data.totalRow;
								that.tableData = []
                data.forEach(function(value,index,array){
                    let date=new Date(value.created)
                    let createDate=that.changeDate(date,'yyyy-MM-dd')
                    that.tableData.push({
                        id:value.id,
                        title:value.name,
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