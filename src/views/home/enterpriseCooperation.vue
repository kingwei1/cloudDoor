<template>
<div id="main">
        <div class="backLayout">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>企业合作</el-breadcrumb-item> 
            </el-breadcrumb>
             <tableList :tableData="tableData" :titles="titles" operate='true' flag='enterpriseCooperation' @edit="edit"></tableList>
            <pagination></pagination>
        </div>
    </div>
</template>

<script>
	import tableList from '../components/tableList'
    import pagination from '../components/pagination'
    import dialogBox from '../components/dialogBox'
    export default {
        name: "enterpriseCooper",
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
                        label:'序号'
                    },{
                        prop:'title',
                        label:'企业名称'
                    },{
                        prop:'creater',
                        label:'企业负责人'
                    },{
                        prop:'contact',
                        label:'联系方式'
                    },{
                        prop:'status',
                        label:'联系状态'
                    },{
                        prop:'contacttimes',
                        label:'联系次数'
                    },
                ],
                tableData:[
               		{
                        id:"01",
                        title:'草鸡管理员',
                        creater:'fhh',
                        contact:'1817777777',
                        status:'未联系',
                        contacttimes:'0' 
                    },
                    {
                        id:"02",
                        title:'山鸡管理员',
                        creater:'fhh',
                        contact:'1817777777',
                        status:'未联系',
                        contacttimes:'1' 
                    },
                    {
                        id:"03",
                        title:'野鸡管理员',
                        creater:'fhh',
                        contact:'1817777777',
                        status:'已联系',
                        contacttimes:'2' 
                    }
                ],
                datas:[]
            }
        },
        methods:{
           open(){
		        this.$confirm('是否确认已经联系该企业，确认后，列表中联系次数将+1', '已联系', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: '联系+1'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消'
		          });          
		        });
		      }
    }
}
</script>

<style >
</style>