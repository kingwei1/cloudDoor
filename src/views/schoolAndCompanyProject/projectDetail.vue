<template>
    <div class="backLayout">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/reviewProjectList' }">项目审核列表</el-breadcrumb-item>
            <el-breadcrumb-item>查看项目</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="box">
            <div style="margin: 20px 30px;"><h2>申请信息</h2></div>
            <div class="item">
                <span>项目ID</span><span>{{projectID}}</span><span>申请时间</span><span>{{time}}</span>
            </div>
            <div class="item" style="margin-bottom: 20px;">
                <span>发布企业</span><span>{{companyName}}</span><span>状态</span><span>{{status}}</span>
            </div>
            <div class="item" v-if="status == '待审核'">
                <div style="text-align: right">
                    <el-button type="primary" @click="submit('通过')">通过</el-button>
					<el-button type="warning" @click="submit('拒绝')">拒绝</el-button>
                </div>
            </div>
        </div>
        <div class="box" >
            <div class="formBox1">
                <div class="formInfo"><h2>基本信息</h2></div>
                <div class="formInfo"><span>项目名称</span><span>{{name}}</span></div>
                <div class="formInfo">
                    <span>项目类型</span>
                    <span>{{type}}</span>
                </div>
                <div class="formInfo" style=''>
                    <span >项目logo</span>
                    <span ><img :src="logo" style="width: 200px;"></span>
                </div>

                <div class="formInfo">
                    <span>项目简介</span>
                    <span>{{introduce}}</span>
                </div>
                <div class="formInfo">
                    <span>项目内容</span>
					<div class="ql-container ql-snow" style="margin: 0 100px;">
						<div class="ql-editor">
							<div v-html="content"></div>
						</div>
					</div>
                </div>
                <div class="formInfo">
                    <span>项目岗位</span>
                    <tableList :tableData="tableData" :titles="titles"></tableList>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import tableList from '../components/tableList'
    export default {
        name: "project-detail",
        components:{
            tableList
        },
        data(){
            return{
			    projectID:'',
				time:'',
				companyName:'',
				status:'',
                name:'xxxxx',
                type:'xxxxx',
                introduce:'xxxxx',
                content:'xxxxx',
                logo:require('@/assets/cloud.png'),
                titles:[
                    {
                        prop:'stationName',
                        label:'岗位名称'
                    },{
                        prop:'stationIntroduce',
                        label:'项目介绍'
                    },{
                        prop:'recruitsNumber',
                        label:'招募人数'
                    }
                ],
                tableData:[]
            }
        },
		methods:{
		   submit(flag){
			   console.log(flag);
			   let that=this;
			   const token=localStorage.getItem('token');
			   let state1 = flag == '通过'? '您确认该项目审核通过吗？项目通过后可以项目访问、招聘等功能':'您确认拒绝该项目吗？该项目拒绝后企业可以重新上传项目信息';
			   let state2 = flag == '通过'? true:false;    
			   this.$confirm(state1, '提示', {
			   	confirmButtonText: '确定',
			   	cancelButtonText: '取消',
			   	type: 'warning',
			   	dangerouslyUseHTMLString: true,
			   }).then(() => {
			   	this.$axios.post(this.$schoolCompanyUrl+'/school/auditProject?token='+token+'&projectId='+this.$route.query.id+'&flag='+state2)
			   	.then(function(res){
			   			console.log(res);
			   			if(res.data.code == 0){
			   				that.$message({
			   					type: 'success',
			   					message: '已'+flag+'!'
			   				});
							that.getInformation();
			   			}else{
			   				that.$message.error(res.data.msg);
			   			}						
			   	})
			   	.catch(function(err){
			   		console.log(err)
			   	})						
			   }).catch(() => {
			   	this.$message({
			   		type: 'info',
			   		message: '已取消'
			   	});          
			   });
		   },
		   getInformation(){
			   let that=this;
			   const token=localStorage.getItem('token');
			   this.$axios.get(this.$schoolCompanyUrl+'/school/project/'+this.$route.query.id+'?token='+token)
			   .then(function(res){
			   	 console.log(res)
				 if(res.data.code == 0){
					let data = res.data.data;
					that.projectID = data.id;
					that.time = that.changeDate(new Date(data.created));
					that.companyName = data.enterpriseName;
					that.name = data.name;
					that.type = data.typeName;
					that.introduce = data.introduction;
					that.content = data.content;
					that.logo = data.pictureUrl;
					that.tableData = [];
					if(data.status == 0){
							that.status = '待审核'
					}else if(data.status == 1){
							that.status = '未通过'
					}else if(data.status == 2 || data.status == 3){
							that.status = '已通过'
					}
					data.positions.forEach(function(value,index,array){
						that.tableData.push({
							stationName:value.name,
							stationIntroduce:value.introduction,
							recruitsNumber:value.total		
						})
					 })							
				 }
			   								
			   })
			   .catch(function(err){
			      console.log(err)
			   })
		   }
		},
		created:function(){
			this.getInformation();
		}
    }
</script>

<style scoped>
    .box{
        border: 1px solid #F5F5F5;
        box-shadow: -10px 10px 30px #DCDCDC;
        margin:10px auto;       
    }
    .formInfo{
        margin: 20px 30px;
        font-size: 16px;
        overflow: auto;
    }
    .formInfo span:nth-child(1){
        display: inline-block;
        width: 100px;
        text-align: left;
        float: left;
    }
    .box .el-table{
        width: calc(100% - 200px);
    }
    .item{
        padding: 10px 20px;
		margin-left: 20px;
    }
    .item span{
        display: inline-block;
    }
    .item span:nth-child(odd){
        width: 100px;
    }
    .item span:nth-child(even){
        width:300px;      
    }
</style>