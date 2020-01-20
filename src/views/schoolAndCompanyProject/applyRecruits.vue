<template>
	<div id="main">	
		<div class="backLayout">			
				<breadcrumb :menu="menu"></breadcrumb>
        <div class="title"><h3>招聘情况明细</h3></div>
			  <tableList :tableData="tableData1" :titles="titles1" flag='recruitsDetail'  ></tableList>
        <div class="title"><h3>申请人列表</h3></div>
        <tableList :tableData="tableData2" :titles="titles2" operate='true' flag='applyList' @open="open" ></tableList>
        <dialogBox :dialogVisible='show' :flag="flag" :datas="datas" @close="show=false"></dialogBox>
		</div>
	</div>
</template>
<script>
  import breadcrumb from '../components/breadcrumb1'
	import tableList from '../components/tableList'
  import dialogBox from '../components/dialogBox'
	export default{
		name:'projectManage',
		components:{
			tableList,
      dialogBox,
			breadcrumb
		},
		data(){
			return{
						   menu:[],
               flag:'',
               datas:{},
               show:false,
							 state:this.$route.query.state,
               titles1:[
                  {
                     prop:'stationName',
                     label:'岗位名称'
                  },{
                     prop:'stationIntroduce',
                     label:'项目介绍'
                  },{
                     prop:'recruitsNumber',
                     label:'招募人数'
                  },
                  {
                     prop:'alreadyRecruits',
                     label:'已招募人数'
                  }
               ],
               tableData1:[],
               titles2:[
                  {
                     prop:'name',
                     label:'应聘人'
                  },{
                     prop:'contect',
                     label:'联系方式'
                  },{
                     prop:'station',
                     label:'应聘岗位'
                  },
                  {
                     prop:'status',
                     label:'状态'
                  },
                  {
                     prop:'auditTime',
                     label:'审核时间'
                  }
               ],
               tableData2:[
                  {
                     name:'大明',
                     contect:'116546486',
                     station:'产品经理',
                     status:"待确认",
                     auditTime:"2019-2-5"
                  },
                  {
                     name:'大明',
                     contect:'116546486',
                     station:'产品经理',
                     status:"已通过",
                     auditTime:"2019-2-5"
                  },
                  {
                     name:'大明',
                     contect:'116546486',
                     station:'产品经理',
                     status:"未通过",
                     auditTime:"2019-2-5"
                  },
               ],
               
			}
		},
		methods:{
			  open(flag,id){
					console.log(id,flag)
					let that=this;
					const token=localStorage.getItem('token');
					if(flag == '申请人简历'){
						this.show=true;
						this.flag=flag
						this.$axios.get(this.$schoolCompanyUrl+'/enterprise/studentInfo/'+id+'?token='+token)
						.then(function(res){
								console.log(res);
								if(res.data.code == 0){
									let data = res.data.data;
									let sex = '';
									if(data.gender == 0){
										sex = '女'
									}else if(data.gender == 1){
										sex = '男'
									}else{
										sex = '保密'
									}
									that.datas = {
											img:data.avatarUrl == null? require('../../assets/userface.jpg'):data.avatarUrl,
											name:data.name,
											contect:data.phone,
											sex:sex,
											school:data.school,
											major:data.major,
											grade:data.grade,
											email:data.email,
											evaluate:data.introduction,
									}
								}
								
						})
						.catch(function(err){
							console.log(err)
						})						
					}
					else{
						let state = flag == '同意'? true:false;
						this.$confirm('确认'+flag+'该申请人的申请吗', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning',
							dangerouslyUseHTMLString: true,
						}).then(() => {
							this.$axios.post(this.$schoolCompanyUrl+'/enterprise/audit/student?token='+token+'&studentPositionId='+id+'&flag='+state)
							.then(function(res){
									console.log(res);
									if(res.data.code == 0){
										that.$message({
										message: '提交成功',
										type: 'success'
										});
										that.getList();
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
												
					}
        },
				getList(){
					let that=this;
					const token=localStorage.getItem('token');
					this.$axios.get(this.$schoolCompanyUrl+'/enterprise/studentPositions/'+this.$route.query.id+'?token='+token)
					.then(function(res){
							console.log(res);	
							if(res.data.code == 0){
								let data = res.data.data;
								that.tableData1 = [];
								that.tableData2 = [];
								data.positions.forEach(function(value,index,array){
									that.tableData1.push({										
											stationName:value.name,
											stationIntroduce:value.introduction,
											recruitsNumber:value.total,
											alreadyRecruits:value.currentTotal																	               
									})
								})
								data.students.forEach(function(value,index,array){
									let state = '';
									let editable = '';
									if(value.status == 0){
										state = '待确认'
									}else if(value.status == 1){
										state = '未通过'
									}else{
										state = '已通过'
									}
									if(that.state	== 'edit' && value.status != 3){
										 editable = true;
									}else{
										 editable = false;
									}
									that.tableData2.push({
										    id:value.id,
												name:value.studentName,
												contect:value.studentPhone,
												station:value.positionName,
												status:state,
												auditTime:value.auditTime == null? '':that.changeDate(new Date(value.auditTime)),
												editable:editable,																		 
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
			this.getList();
			if(this.state == 'see'){
				this.menu = [{
						   title:'项目审核列表',
						   path:'/reviewProjectList'
						   },{
						   title:'招聘申请'
						   }];
			 }else if(this.state == 'edit'){
				this.menu = [{
						   title:'项目列表',
						   path:'/projectManage'
						   },{
						   title:'招聘申请'
						   }];
			}
		}
	}
</script>
<style scoped>

</style>
<style>
	.backLayout .el-breadcrumb__inner.is-link{
		font-weight: normal;
	}
	.backLayout .el-breadcrumb__inner.is-link:hover{
		font-weight: bolder;
		color: #000
	}
	.backLayout .el-breadcrumb{
  	font-size: 16px!important;
  	display: inline-block;
  	width: 100%;
  	line-height: 40px
  }
  .backLayout .el-breadcrumb>span:nth-child(1){
  	border-left: 4px solid #000;
  }
  .backLayout .el-breadcrumb .el-button{
  	 float: right;
  }
</style>