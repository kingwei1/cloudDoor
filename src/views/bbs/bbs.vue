<template>
    <div id="main">
        <div class="backLayout">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>帖子列表</el-breadcrumb-item>
            </el-breadcrumb>
            <search :searchData="searchData"></search>
            <tableList :tableData="tableData" :titles="titles" operate='true' flag='bbs'   @open="open" :bbs=true></tableList>
        </div>
    </div>
</template>

<script>
    import tableList from '../components/tableList'
    import search from '../components/search'
    export default {
        name: "bbs",
        components:{
        tableList,
        search
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
                        label:'标题'
                    },{
                        prop:'sort',
                        label:'分类'
                    },{
                        prop:'creater',
                        label:'发布者'
                    },{
                        prop:'createTime',
                        label:'发布时间'
                    },
                ],
                tableData:[
                    {
                        id:'225454',
                        title:'撒大宁的深夜食堂',
                        sort:'java',
                        page:require("../../assets/project-1.png"),
                        top:true,
                        creater:'广西科技大学',
                        createTime:'2019-1-3 11:33:22',
                        collect:1000,
                        read:1000,
                        mss:1000
                    },{
                        id:'225454',
                        title:'撒大宁的深夜食堂',
                        sort:'java',
                        page:require("../../assets/project-1.png"),
                        top:false,
                        creater:'广西科技大学',
                        createTime:'2019-1-3 11:33:22',
                        collect:1000,
                        read:1000,
                        mss:1000
                    },{
                        id:'225454',
                        title:'撒大宁的深夜食堂',
                        sort:'java',
                        page:require("../../assets/project-1.png"),
                        top:false,
                        creater:'广西科技大学',
                        createTime:'2019-1-3 11:33:22',
                        collect:1000,
                        read:1000,
                        mss:1000
                    },
                ],
                searchData:[
                    {
                        title:'',
                        type:'input',
                        placeholder:'输入标题',
                    },{
                        title:'',
                        type:'select',
                        placeholder:'请选择分类',
                        options:[
                            {
                                label:'全部'
                            },
                            {
                                label:'文件'
                            },
                            {
                                label:'视频'
                            },
                            {
                                label:'音乐'
                            },
                            {
                                label:'其它'
                            },
                        ]
                    },{
                        title:'',
                        type:'date',
                        placeholder1:'上传起始日期',
                        placeholder2:'上传终止日期',
                    },
                ],
            }
        },
        methods:{
            open(id,flag){
                this.$confirm('确认要删除帖子吗，删除后将无法恢复?', flag, {
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
            close(){
                this.show=false;
            }

        }
    }
</script>

<style scoped>

</style>