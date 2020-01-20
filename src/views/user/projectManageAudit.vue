<template>
	<div id="main">	
		<div class="backLayout">
			<!-- <el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/backNav' }">用户</el-breadcrumb-item>
			  <el-breadcrumb-item>项目经理审核</el-breadcrumb-item>
			</el-breadcrumb> -->
		    <breadcrumb :menu="menu"></breadcrumb>
            <search :searchData="searchData" @search="search"></search>
			<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
				<el-tab-pane label="待审核" name="first"></el-tab-pane>
				<el-tab-pane label="已通过" name="second"></el-tab-pane>
				<el-tab-pane label="未通过" name="third"></el-tab-pane>
			</el-tabs>
			<tableList :tableData="tableData" :titles="title" operate='true' :flag="managerAudit" @operation="operation"></tableList>
		    <pagination ref="page" :paginationShow="paginationShow" :listTotal="listTotal" @pageChangeSize="pageChangeSize" @page="page"></pagination>
		</div>
	</div>
</template>
<script>

  import tableList from '../components/tableList'
  import search from '../components/search'
  import breadcrumb from '../components/breadcrumb1'
  import pagination from '../components/pagination'
	export default{
		name:'projectManageAudit',
		components:{
			tableList,
            search,
			breadcrumb,
			pagination
		},
		data(){
			return{
			   activeName2:'first',
			   auditStatus:'pending',
			   managerAudit:'managerAudit-pending',
			   searchInput:'',
			   searchTime1:'',
			   searchTime2:'',
			   pageSize:10,
			   paginationShow:true,
			   listTotal:0,
			   menu:[{
			   	title:'项目经理审核',
			   }],	   				
			   title:'',
               titles1:[
                  {
                     prop:'id',
                     label:'技术人员ID'
                  },{
                     prop:'name',
                     label:'昵称'
                  },{
                     prop:'phone',
                     label:'手机号'
                  },{
                     prop:'realName',
                     label:'真实姓名'
                  },{
                     prop:'submissionTime',
                     label:'提交时间'
                  },{
                     prop:'resume',
                     label:'个人简介'
                  }
               ],
				titles2:[ 
					 {
						prop:'id',
						label:'技术人员ID'
					 },{
						prop:'name',
						label:'昵称'
					 },{
						prop:'phone',
						label:'手机号'
					 },{
						prop:'realName',
						label:'真实姓名'
					 },{
						prop:'submissionTime',
						label:'提交时间'
					 },{
						prop:'auditTime',
						label:'审核时间'
					 },{
						prop:'resume',
						label:'个人简介'
					 },{
						prop:'status',
						label:'状态'
					 }
				  ],
				titles3:[ 
					 {
					 prop:'id',
					 label:'技术人员ID'
					 },{
					 prop:'name',
					 label:'昵称'
					 },{
					 prop:'phone',
					 label:'手机号'
					 },{
					 prop:'realName',
					 label:'真实姓名'
					 },{
					 prop:'submissionTime',
					 label:'提交时间'
					 },{
					 prop:'auditTime',
					 label:'审核时间'
					 },{
					 prop:'resume',
					 label:'个人简介'
					 }
				 ],
               tableData:[],
               searchData:[
                  {
                    title:'',
                    type:'input',
                    placeholder:'请输入账号、昵称、手机号',
                  },{
                    title:'',
                    type:'date',
                    placeholder1:'审核起始日期',
                    placeholder2:'审核终止日期',
                  },
               ]
			}
		},
		methods:{
			page(val){
				this.getManageTable(val)
			},
			pageChangeSize(val){
				this.paginationShow = false;
							this.$nextTick(function () {
							this.paginationShow = true;
							})
							this.$refs.page.setSize(val);
							this.pageSize = val; 
							this.getManageTable(1)
			},
			search(a,b,c){
				if(c == null){
					this.searchTime1 = '';
					this.searchTime2 = '';
				} else{
					this.searchTime1 = c[0]== undefined? '':new Date(c[0]).toJSON();
					this.searchTime2 = c[1]== undefined? '':new Date(c[1]).toJSON();
				}
				this.searchInput= a[0] == undefined? '':a[0];						
				console.log(this.searchInput,this.searchTime1,this.searchTime2);
				this.getManageTable(1);
			},
			getManageTable(page){
				let that=this;
				const token=localStorage.getItem('token');	
			    console.log(token)
				if(this.activeName2 == 'first'){
					this.title = this.titles1;
					this.auditStatus = 'pending';
					this.managerAudit='managerAudit-pending';
				}else if(this.activeName2 == 'second'){
					this.title = this.titles2;
					this.auditStatus = 'pass';
					this.managerAudit='managerAudit-pass';
				}else if(this.activeName2 == 'third'){
					this.title = this.titles3;
					this.auditStatus = 'no_pass';
					this.managerAudit='managerAudit-no_pass';
				}		
				console.log(this.pageSize);
				console.log(page)

				this.$axios.get(this.$userUrl+'/stuManager/page?token='+token+'&page='+(page-1)+'&size='+this.pageSize+'&auditStatus='+this.auditStatus+'&param='+this.searchInput+'&startTime='+this.searchTime1+'&endTime='+this.searchTime2)
				.then(function(res){
					console.log(res);
					that.tableData = [];
					that.listTotal = res.data.totalElements,
					res.data.content.forEach(function(value,index,array){
						let state = value.accountStatus == 1? '已启用':'已禁用';
						that.tableData.push({
							id:value.id,
							name:value.nick,
							phone:value.phone,
							realName:value.rname,
							submissionTime:that.changeDate(new Date(value.creationTime)),
							auditTime:that.changeDate(new Date(value.auditTime)),
							resume:value.personal,
							accountStatus:value.accountStatus,
							status:state
							 })
					})
					
				})
				.catch(function(err){
					console.log(err)
				})
			},
			handleClick(tab, event){
				this.getManageTable(1);
				
			},			
			operation(data,state){
				console.log(data);
				console.log(state);
				let that=this;
				const token=localStorage.getItem('token');
				if(state == '同意' || state == '拒绝'){
					let status = state == '同意'? 'pass':'no_pass';
					console.log(status)
					this.$confirm('确认要'+state+'该用户的申请吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					}).then(() => {						
						this.$axios.put(this.$userUrl+'/stuManager/audit/'+data.id+'?auditStatus='+status+'&token='+token)
						.then(function(res){
							console.log(res.data);
							if(res.data.code == 0){
								that.$message({
									type: 'success',
									message: '审核成功!'
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
				}
				if(state == '禁用' || state == '启用'){
					let status = state == '禁用'? 'disable':'enable';
					this.$confirm('确认要'+state+'该项目经理吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
					}).then(() => {						
						this.$axios.put(this.$userUrl+'/stuManager/'+status+'/'+data.id+'?token='+token)
						.then(function(res){
							console.log(res);
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
				}
				if(state == '删除'){
					this.$confirm('确认要删除该项目经理吗？<br/>一旦删除将无法复原', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
					}).then(() => {						
						this.$axios.delete(this.$userUrl+'/stuManager/delete/'+data.id+'?token='+token)
						.then(function(res){
							console.log(res);
							if(res.data == '该项目经理删除成功'){
								that.$message({
									type: 'success',
									message: '已删除!'
								});
								that.refresh();
							}
						})
						.catch(function(err){
							console.log(err)
							that.$message.error(err.response.data);
						})				
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});          
					});
				}
			},
			refresh(){
				//策略进行DOM的更新，表格以及分页刷新
				this.paginationShow = false;
				this.$nextTick(function () {
				this.tableData=[];
				this.getManageTable(1);
				this.paginationShow = true;
				})
			},
		 },		
		created:function(){            
			this.getManageTable(1);	
		}
	}
</script>
<style scoped>

</style>
<style>
	
</style>