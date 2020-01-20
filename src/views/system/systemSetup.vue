<template>
	<div id="main">	
		<div class="backLayout">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
			  <el-button type="primary" @click="openForCreateRole">创建角色</el-button>
			</el-breadcrumb>	
			<tableList :tableData="tableData" :titles="titles" operate='true' flag='systemSetup' @open="open" @changeState='changeState'></tableList>
			<dialogBox :dialogVisible='show' :flag="flag" :datas="datas" @close="show=false" @createRole="createRole" @editRole="editRole"></dialogBox>
		</div>
	</div>
</template>
<script>

	import tableList from '../components/tableList'
	import dialogBox from '../components/dialogBox'
	export default{
		name:'systemSetup',
		components:{
			tableList,
			dialogBox
		},
		data(){
			return{
				show:false,
				flag:'',
        id:0,
				datas:{
					roleName:'',
					roleDescribe:'',
					roleName2:'',
					roleDescribe2:'',
				},
               titles:[
                  {
                     prop:'number',
                     label:'序号'
                  },{
                     prop:'name',
                     label:'角色名称'
                  },{
                     prop:'describe',
                     label:'角色描述'
                  },{
                     prop:'status',
                     label:'状态'
                  },
               ],
               tableData:[]
			}
		},
		methods:{
			openForCreateRole(){
				this.flag='创建角色';
				this.show=true
			},
			open(id,flag,name,describe){
				this.show=true;
				this.flag=flag;
				this.datas.roleName2=name;
				this.datas.roleDescribe2=describe;
				this.id=id;
        console.log(this.id)
			},
			changeState(row){
				  console.log(row)
				  let that = this;
				  const token=localStorage.getItem('token')							
					let state = row.status == '正常'? '禁用':'启用';
					let state2 = row.status == '正常'? false:true;
					this.$confirm('确认'+state+'‘<span style="color:#FF9800">'+row.name+'</span>'+'’角色吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true,
				}).then(() => {
					that.$axios.post(this.$baseUrl+'/portal/role/available?token='+token+'&roleId='+row.id+'&isAvailable='+state2)
					.then(function(res){
							console.log(res)
							if(res.data.code == 0){
								that.$message({
									type: 'success',
									message: state+'成功!'
								});
								that.refresh();
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
			getPower(){
				const token=localStorage.getItem('token')
                let that = this;
                let index1=1;
                let id=1;
                this.$axios.get(this.$baseUrl+'/portal/role/roles?token='+token,{})
                .then(function(res){
                	console.log(res)
                    let data=res.data.data;
                    data.forEach(function(value,index,array){
                    	if (value.available==true) {
                    		value.available='正常'
                    	}
                    	else if (value.available==false) {
                    		value.available='禁用'
                    	}
                    	that.tableData.push({
                    		number:((id-1)*10)+index1,
                    		name:value.roleName,
                    		describe:value.description,
                    		status:value.available,
												id:value.id
                    	})
                    	index1++;
                    })
                    	
                })
                .catch(function(err){
                    console.log(err)
                })
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
                	 that.refresh();
                	 that.show=false               	
                })
                .catch(function(err){
                    console.log(err)
                })
			},
			editRole(){
				const token=localStorage.getItem('token')
                let that = this;
                this.$axios.post(this.$baseUrl+'/portal/role/update?token='+token,{
                	roleName:this.datas.roleName2,
                	description:this.datas.roleDescribe2,
                  id:this.id,
                })
                .then(function(res){
                	 console.log(res) 
                	 that.refresh(); 
                	 that.show=false               	
                })
                .catch(function(err){
                    console.log(err)
                })
			},
			refresh(){
            //策略进行DOM的更新，表格以及分页刷新
            //this.paginationShow = false;
            this.$nextTick(function () {
              this.tableData=[];
             this.getPower();
              //this.paginationShow = true;
            })
          },
		},
		created:function(){
			this.getPower();
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