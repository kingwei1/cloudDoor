<template>
    <div id="main">
        <div class="backLayout">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>期望职业</el-breadcrumb-item>
                <el-button type="primary" @click="edit()">添加期望职业</el-button>
            </el-breadcrumb>
            <tableList :tableData="tableData" :titles="titles" operate='true' flag='jobManage' @edit="edit" @refresh='refresh'></tableList>
            <pagination></pagination>
            <dialogBox :dialogVisible='show' :flag="flag" @close="close" :datas="datas" @submit="submit"></dialogBox>
        </div>
    </div>
</template>

<script>
    import tableList from '../components/tableList'
    import pagination from '../components/pagination'
    import dialogBox from '../components/dialogBox'
    export default {
        name: "job-manage",
        components:{
            tableList,
            pagination,
            dialogBox
        },
        data(){
            return{
                show:false,
                flag:'',
                id:0,
                titles:[
                    {
                        prop:'id',
                        label:'期望职业ID'
                    },{
                        prop:'title',
                        label:'期望职业'
                    },{
                        prop:'status',
                        label:'状态'
                    },{
                        prop:'createTime',
                        label:'创建时间'
                    },
                ],
                tableData:[],
                datas:{
                       name:'',
                       content:'', 
                 }
            }
        },
        methods:{
            edit(id,flag){
                if(flag==undefined){
                    this.flag='添加期望职业'
                    this.datas={
                        name:''
                    }
                }else{
                    this.flag=flag;
                    this.id=id;
                    const token = localStorage.getItem('token')
                    let that=this;
                    this.$axios.get(this.$baseUrl+'/career/career/career/'+id+'?token='+token,{})
                    .then(function(res){
                        console.log(res.data)
                        let data=res.data.data
                        that.datas.name=data.name;
                        that.datas.content=data.introduction
                    })
                    .catch(function(err){
                        console.log(err)
                    })
                }
                this.show=true;
            },
            getList(){
                const token = localStorage.getItem('token')
                let that=this;
                this.$axios.get(this.$baseUrl+'/career/career/careers?token='+token,{})
                .then(function(res){
                    console.log(res.data)
                    let data=res.data.data
                    data.forEach(function(value,index,array){
                        let date=new Date(value.created)
                        let status
                        if (value.status==0) {
                            status='正常'
                        }if (value.status==1) {
                            status='禁用'
                        }
                        that.tableData.push({
                            id:value.id,
                            title:value.name,
                            createTime:that.changeDate(date),
                            status:status
                        })
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
            },
            close(){
                this.show=false;
            },
            submit(flag){
                if (flag=='添加期望职业') {
                    console.log(this.datas.content)
                    const token = localStorage.getItem('token')
                    let that=this;
                    let formData=new FormData();
                    formData.append('name',this.datas.name)
                    formData.append('introduction',this.datas.content)
                    this.$axios({
                        url:this.$baseUrl+'/career/career/career?token='+token,
                        method:'post',
                        data:formData
                    })
                    .then(function(res){
                        console.log(res.data)
                        that.$message({
                            type:'success',
                            message:'添加成功'
                        })
                        that.show=false;
                        that.refresh();
                    })
                    .catch(function(err){
                        console.log(err)
                    })
                }
                if (flag=='编辑期望职业') {
                    const token = localStorage.getItem('token')
                    let that=this;
                    let formData=new FormData();
                    formData.append('id',this.id)
                    formData.append('name',this.datas.name)
                    formData.append('introduction',this.datas.content)
                    this.$axios({
                        url:this.$baseUrl+'/career/career/modifyCareer?token='+token,
                        method:'post',
                        data:formData
                    })
                    .then(function(res){
                        console.log(res.data)
                        that.$message({
                            type:'success',
                            message:'修改成功'
                        })
                        that.show=false;
                        that.refresh();
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
               this.getList();
              //this.paginationShow = true;
            })
        }
        },

        created:function(){
            this.getList()
        }
    }
</script>

<style scoped>

</style>