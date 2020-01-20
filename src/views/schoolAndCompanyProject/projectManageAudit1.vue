<template>
	<div id="main">	
		<div class="backLayout">
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
			   managerAudit:'managerAudit1-pending',
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
                     prop:'projectId',
                     label:'项目ID'
                  },{
                     prop:'name',
                     label:'项目名称'
                  },{
                     prop:'user',
                     label:'申请人'
                  },{
                     prop:'phone',
                     label:'手机号'
                  },{
                     prop:'starTime',
                     label:'申请时间'
                  }
               ],
				titles2:[ 
					 {
					 prop:'projectId',
					 label:'项目ID'
					 },{
					 prop:'name',
					 label:'项目名称'
					 },{
					 prop:'user',
					 label:'申请人'
					 },{
					 prop:'phone',
					 label:'手机号'
					 },{
					 prop:'starTime',
					 label:'申请时间'
					 },{
					 prop:'endTime',
					 label:'审核时间'
					 }
				  ],				
               tableData:[],
               searchData:[
                  {
                    title:'',
                    type:'input',
                    placeholder:'请输入审核人名称',
                  },{
                    title:'',
                    type:'date',
                    placeholder1:'申请起始日期',
                    placeholder2:'申请终止日期',
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
					this.searchTime1 = c[0]== undefined? '':this.changeDate(new Date(c[0]),'yyyy/MM/dd');
					this.searchTime2 = c[1]== undefined? '':this.changeDate(new Date(c[1]),'yyyy/MM/dd') + ' 23:59:59';
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
					this.auditStatus = 0;
					this.managerAudit='managerAudit1-pending';
				}else if(this.activeName2 == 'second'){
					this.title = this.titles2;
					this.auditStatus = 2
					this.managerAudit='managerAudit1-pass';
				}else if(this.activeName2 == 'third'){
					this.title = this.titles2;
					this.auditStatus = 1
					this.managerAudit='managerAudit1-no_pass';
				}		
				console.log(this.pageSize);
				console.log(page)
                let url = '';
				if(this.searchTime1 == '' || this.searchTime1 == null){
					url = this.$schoolCompanyUrl+'/enterprise/stuManagers?token='+token+'&pageNum='+page+'&pageSize='+this.pageSize+'&status='+this.auditStatus+'&query='+this.searchInput;
				}else{
					url = this.$schoolCompanyUrl+'/enterprise/stuManagers?token='+token+'&pageNum='+page+'&pageSize='+this.pageSize+'&status='+this.auditStatus+'&query='+this.searchInput+'&starTime='+this.searchTime1+'&endTime='+this.searchTime2;
				}
				this.$axios.get(url)
				.then(function(res){
					console.log(res);
					if(res.data.code == 0){
						that.tableData = [];
						let data = res.data.data;
						that.listTotal = res.data.count,
						data.forEach(function(value,index,array){
							that.tableData.push({
								projectId:value.projectId,
								name:value.projectName,
								phone:value.studentPhone,
								id:value.id,
								user:value.studentName+'\n'+value.studentId,
								starTime:value.created == null? '':that.changeDate(new Date(value.created)),
								endTime:value.auditTime == null? '':that.changeDate(new Date(value.auditTime)),
								})
						})
					}else{
						that.$message.error(res.data.msg);
					}		
					
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
					let status = state == '同意'? true:false;
					console.log(status)
					this.$confirm('确认要'+state+'该用户的申请吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					}).then(() => {						
						this.$axios.post(this.$schoolCompanyUrl+'/enterprise/stuManager/audit?flag='+status+'&stuManagerId='+data.id+'&token='+token)
						.then(function(res){
							console.log(res);
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
					let status = state == '禁用'? false:true;
					this.$confirm('确认要'+state+'该项目经理吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
					}).then(() => {						
						this.$axios.post(this.$schoolCompanyUrl+'/enterprise/stuManager/status?flag='+status+'&stuManagerId='+data.id+'&token='+token)
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