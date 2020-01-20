<template>
    <div id="main">
        <div class="backLayout">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>版块分类管理</el-breadcrumb-item>
                <el-button type="primary" @click="edit()">添加版块分类</el-button>
            </el-breadcrumb>
            <tableList :tableData="tableData" :titles="titles" operate='true' flag='bbsManage' @edit="edit"  @open="open" :bbsManage='true'></tableList>
            <dialogBox :dialogVisible='show' :flag="flag" @close="close" :datas="datas"></dialogBox>
        </div>
    </div>
</template>

<script>
    import dialogBox from '../components/dialogBox'
    import tableList from '../components/tableList'
    export default {
        name: "bbs-manage",
        components:{
            tableList,
            dialogBox
        },
        data(){
            return{
                show:false,
                flag:'',
                titles:[
                    {
                        prop:'id',
                        label:'编号'
                    },{
                        prop:'title',
                        label:'分类名称'
                    },{
                        prop:'num',
                        label:'帖子数量'
                    },{
                        prop:'sort',
                        label:'排序'
                    },{
                        prop:'createTime',
                        label:'创建时间'
                    },
                ],
                tableData:[
                    {
                        id:'225454',
                        title:'java',
                        num:123,
                        sort:12,
                        createTime:'2019-1-3 11:33:22',
                        top:true
                    },{
                        id:'225455',
                        title:'java',
                        num:123,
                        sort:12,
                        createTime:'2019-1-3 11:33:22',
                        top:false
                    },{
                        id:'225456',
                        title:'java',
                        num:123,
                        sort:12,
                        createTime:'2019-1-3 11:33:22',
                        top:true
                    },
                ],
                datas:'',
            }
        },
        methods:{
            open(id,flag){
                this.$confirm('确认要删除该版块分类吗，删除后将无法恢复?', flag, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            edit(id,flag){
                if(flag==undefined){
                    this.flag='添加版块分类'
                    this.datas={
                        name:'',
                        show:'',
                        sort:undefined
                    }
                }else{
                    this.flag=flag;
                    this.datas={
                        name:'xxxx',
                        show:'1',
                        sort:2
                    }
                }
                this.show=true;
            },
            close(){
                this.show=false;
            }

        }
    }
</script>

<style scoped>

</style>