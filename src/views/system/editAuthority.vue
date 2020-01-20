<template>
	<div id="main">
		<div class="backLayout">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/systemSetup' }">权限管理</el-breadcrumb-item>
			  <el-breadcrumb-item>编辑权限</el-breadcrumb-item>
			  <el-button type="primary" @click="create">创建角色</el-button>
			</el-breadcrumb>
			<dialogBox :dialogVisible='show' :flag="flag" :datas="datas" @close="show=false" @createRole="createRole"></dialogBox>
			<div class="baseInfo">
				<div class="title">基本信息</div>
				<div class="info">
					<div class="label">
						<span>角色名称：</span><span>{{name}}</span>
					</div>
					<div class="label">
						<span>角色描述：</span><span>{{describe}}</span>
					</div>
					<div class="label">
						<span>状态：</span><span>{{status}}</span>
						<el-button type="primary" @click='submit'>保存</el-button>
					</div>
				</div>
			</div>	

			<div class="edit">
				<div class="title">权限设置</div>
				<div class="info">
					<el-tree
					  :data="data2"
					  show-checkbox
					  node-key="id"
					  highlight-current
					  :props="defaultProps"
						ref="tree"
					  >
					</el-tree>
	       </div>
			</div>
		</div>
	</div>
</template>
<script>
	import dialogBox from '../components/dialogBox'
	export default{
		name:'editAuthority',
		components:{
			dialogBox
		},
		data(){
			return{
        show:false,
				flag:'',
				name:'',
				status:'',
				describe:'',
				datas:{
					roleName:'',
					roleDescribe:'',
				},
				data2: [],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
		},
		methods:{
			create(){
				this.flag='创建角色';
				this.show=true
			},
			setCheckedKeys(key) {				
        this.$refs.tree.setCheckedKeys(key);
      },
			createRole(){
				const token=localStorage.getItem('token')
								let that = this;
								this.$axios.post(this.$baseUrl+'/portal/role/add?token='+token,{
									roleName:this.datas.roleName,
									description:this.datas.roleDescribe
								})
								.then(function(res){
									console.log(res)
									if(res.data.code == 0){
										that.show=false;
										that.$message({
											message: '新建角色成功',
											type: 'success'
										});
									}else{
										that.$message.error(res.data.msg);
									}
									               	
								})
								.catch(function(err){
										console.log(err)
								})
			},
			submit(){
				let key = this.$refs.tree.getCheckedKeys();
				let idList = [];
				this.data2.forEach((value,index,array)=>{
						this.data2[index].children.forEach((value1,index1,array1)=>{
								this.data2[index].children[index1].children.forEach((value2,index2,array2)=>{
										let id = this.data2[index].children[index1].children[index2].id;										
										if(key.indexOf(id) != -1){
											 idList.push(this.data2[index].children[index1].children[index2].hideId)
										}
								})					
						})						
				})
				console.log(idList);
				let that = this;
				const token=localStorage.getItem('token');
				this.$axios({
					url:this.$baseUrl+'/portal/role/permissions/'+this.$route.query.id+'?token='+token,
					method:'post',
					data:idList
				})
				.then(function(res){
					 if(res.data.code == 0){
						 that.$message({
								message: '权限设置修改成功',
								type: 'success'
							});
					 }else{
						 this.$message.error(res.data.msg);
					 }
					
				})
				.catch(function(err){
						console.log(err)
				})
			},
			getPermissions(){
				  console.log(this.$route.query.id);
				  let that = this;
			  	const token=localStorage.getItem('token')	
					this.$axios.get(this.$baseUrl+'/portal/role/role/'+this.$route.query.id+'?token='+token)
					.then(function(res){
						console.log(res)
						if(res.data.code == 0){
							let data = res.data.data;
							that.name = data.roleName;
							that.describe = data.description;
							that.status = data.available == true? '正常':'禁用';
						}
					})
					.catch(function(err){
							console.log(err)
					})
					this.$axios.get(this.$baseUrl+'/portal/role/permissions?token='+token+'&roleId='+this.$route.query.id)
					.then(function(res){
						console.log(res)
						that.data2 = [];
						let key = [];
							res.data.data.forEach((value,index,array)=>{
								that.data2.push({
									id: index,
									label: value.orgName,
									children:[]
								})
								value.modules.forEach((value1,index1,array1)=>{
									that.data2[index].children.push({
										id:index+'-'+index1,
										label: value1.moduleName,
										children:[]
									})
									value1.resources.forEach((value2,index2,array2)=>{
										that.data2[index].children[index1].children.push({
											id:index+'-'+index1+'-'+index2,
											label: value2.resDesc,
											hideId:value2.id,
											isChosen:value2.isChosen
										})
										if(value2.isChosen){
											key.push(index+'-'+index1+'-'+index2)
										}
									})
								})								
							})	
							that.setCheckedKeys(key);
					})
					.catch(function(err){
							console.log(err)
					})
			}
		},
		created:function(){
			this.getPermissions();
		}
	}
</script>
<style scoped>
	 .title{
		background: #bbbbbb;
		line-height: 30px;
		padding: 10px;
		font-size: 20px
	}
	 .info{
		border: 1px solid #bbbbbb;
		padding:20px 40px;
		position: relative;
	}
	.baseInfo .info .label{
		margin: 15px 0px;
		overflow: auto;
	}
	.baseInfo .info .label span:nth-child(1){
		display: inline-block;
		width: 150px
	}
	.baseInfo .info .label .el-button{
		float: right;
		width: 150px;
		font-size: 16px
	}
	.edit{
		margin: 40px 0px
	}	
</style>
<style >
     .edit .el-tree-node__content{
     	 margin: 0px 0px 10px
     }
     .edit .el-tree-node__label{
		font-size: 16px;
		float: left;
	}
	.edit .el-checkbox{
		position: absolute;
		right: 0px;
	}
	.edit .el-checkbox__inner{
		height: 20px;
		width: 20px;		
	}
	.el-checkbox__inner{
		border:1px solid #98aad4 !important;
	}
	.edit .el-checkbox__inner::after{
		height: 12px;
		width: 5px;
		margin-left: 3px;
	}
</style>