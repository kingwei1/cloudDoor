<template>
	<div id="main">	
		<div class="backLayout">
			<div v-if="role == 'admin' || role == 'company' || role == 'school'">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>用户列表</el-breadcrumb-item>
					<el-button type="primary" @click="createAccount">创建账号</el-button>
				</el-breadcrumb>	
				<search :searchData="searchData" @search='search'></search>
				<tableList :tableData="tableData" :titles="titles" operate='true' :flag='UserList'  headimg="true" @accountManage='accountManage'></tableList>
				<pagination ref="page" :paginationShow="paginationShow" :listTotal="listTotal" @pageChangeSize="pageChangeSize" @page="page"></pagination>
			  <dialogBox :dialogVisible='show' flag="账号身份授权" :datas="datas" @submitChange='submitChange' @close="show=false"></dialogBox>
			</div>
			<div v-if="role == '无权限'">
					<h3>抱歉，您无权限查看用户列表，请重新登陆后查看</h3>
			</div>
		 </div>	
	</div>
</template>
<script>
  import pagination from '../components/pagination'
	import tableList from '../components/tableList'
  import search from '../components/search'
	import dialogBox from '../components/dialogBox'
	export default{
		name:'UserList',
		components:{
			tableList,
      search,
			pagination,
			dialogBox
		},
		data(){
			return{ 
						  show:false,
				      flag:'',
							datas:[],
							aid:'',
				      role:'无权限',
							UserList:'',
							pageSize:10,
							paginationShow:true,
							listTotal:0,
							titles:'',
							searchInput:'',
							searchRole:'',
							searchTime1:'',
							searchTime2:'',
              title1:[
                  {
                     prop:'account',
                     label:'账号'
                  },{
                     prop:'phone',
                     label:'手机号'
                  },{
                     prop:'name',
                     label:'昵称'
                  },{
                     prop:'identity',
                     label:'身份'
                  },{
                     prop:'sex',
                     label:'性别'
                  },{
                     prop:'createTime',
                     label:'创建时间'
                  },{
                     prop:'status',
                     label:'状态'
                  },
               ],
							 title2:[
							 		{
							 			prop:'account',
							 			label:'账号'
							 		},{
							 			prop:'phone',
							 			label:'手机号'
							 		},{
							 			prop:'name',
							 			label:'昵称'
							 		},{
							 			prop:'sex',
							 			label:'性别'
							 		},{
							 			prop:'createTime',
							 			label:'创建时间'
							 		},{
							 			prop:'status',
							 			label:'状态'
							 		},
							 ],
               tableData:[],
							 searchData:'',
               searchData1:[
                  {
                    title:'',
                    type:'input',
                    placeholder:'请输入账号、昵称、手机号',
                  },{
                    title:'',
                    type:'select',
                    placeholder:'请选择身份',
                    options:[]
                  },{
                    title:'',
                    type:'date',
                    placeholder1:'上传起始日期',
                    placeholder2:'上传终止日期',
                  },
               ],
							 searchData2:[
							 	{
							 		title:'',
							 		type:'input',
							 		placeholder:'请输入账号、昵称、手机号',
							 	},{
							 		title:'',
							 		type:'date',
							 		placeholder1:'上传起始日期',
							 		placeholder2:'上传终止日期',
							 	},
							 ]
			}
		},
		methods:{
			page(val){
				this.getImgList(val)
			},
			pageChangeSize(val){
				this.paginationShow = false;
							this.$nextTick(function () {
							this.paginationShow = true;
							})
							this.$refs.page.setSize(val);
							this.pageSize = val; 
							this.getImgList(1)
			},
			createAccount(){
				this.$router.push({path:'/addAccount',query:{role:this.role}})
			},
			search(a,b,c){
				//console.log(a,b,c);
				if(c == null){
					this.searchTime1 = '';
					this.searchTime2 = '';
				} else{
					this.searchTime1 = c[0]== undefined? '':this.changeDate(new Date(c[0]),'yyyy/MM/dd');
					this.searchTime2 = c[1]== undefined? '':this.changeDate(new Date(c[1]),'yyyy/MM/dd');
				}
				if(b[1] != undefined){
					for(let i =0;i<this.searchData1[1].options.length;i++){
						if(b[1] == this.searchData1[1].options[i].label){
							this.searchRole = this.searchData1[1].options[i].value;
							break;
						}
					}
				}
				this.searchInput= a[0] == undefined? '':a[0];						
				//console.log(this.searchInput,this.searchRole,this.searchTime1,this.searchTime2);
				this.getImgList(1);
			},
			getImgList(val){				
				let that = this;
				let url = '';
				const token=localStorage.getItem('token');
				console.log(this.searchInput,this.searchRole,this.searchTime1,this.searchTime2);
				console.log(this.role)
				if(this.role == 'admin'){
					if(this.searchTime1 == ''){
						url = this.$baseUrl+'/user/page?pageNum='+val+'&pageSize='+this.pageSize+'&query='+this.searchInput+'&roleId='+this.searchRole+'&token='+token;
					} else {
						url = this.$baseUrl+'/user/page?pageNum='+val+'&pageSize='+this.pageSize+'&query='+this.searchInput+'&roleId='+this.searchRole+'&startTime='+this.searchTime1+'&endTime='+this.searchTime2+'&token='+token;
					}
					this.$axios.get(url)
					.then(function(res){
							console.log(res);
							let data = res.data.data;
							that.listTotal = res.data.count,
							that.tableData = [];
							data.forEach(function(value,index,array){
									let status = value.status == 1? '正常':'禁用';
									let gender;
									let userImg = '';
									if(gender == -1){
										gender = "未知"
										userImg = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194176525,2404367419&fm=26&gp=0.jpg'
									} else if(gender == 0){
										gender = "女";
										userImg = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4061672780,1877745021&fm=26&gp=0.jpg'
									} else {
										gender = "男";
										userImg = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3682778528,1296181263&fm=26&gp=0.jpg' 
									}; 
									that.tableData.push({
											account:value.accountNumber,
											phone:value.phoneNo,
											name:value.nickname,
											//headimg:value.avatarUrl,
											headimg:userImg,
											identity:value.roleName,
											sex:gender,
											createTime:that.changeDate(value.createdTime),
											status:status,
											aid:value.aid
									})
							})
					})
					.catch(function(err){
							console.log(err)
					})
				}
				else{
					  let time1 = '';
					  let time2 = '';
					  if(this.searchTime1 != ''){
							time1 = new Date(this.searchTime1).toJSON();
							time2 = new Date(this.searchTime2).toJSON();
						}
					 	this.$axios.get(this.$userUrl+'/account/getboy?token='+token+'&pageable='+(val-1)+'&pageablesize='+this.pageSize+'&phonename='+this.searchInput+'&time1='+time1+'&time2='+time2)
					 	.then(function(res){
					 			console.log(res);
									that.tableData = [];
					 			if(res.data.code == 0){
									let data = res.data.data.content;
									that.listTotal = res.data.data.totalElements,
									
									data.forEach(function(value,index,array){
											let status = value.status == 1? '正常':'禁用';
											let userImg = '';
											if(value.sex == '男'){
												userImg = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3682778528,1296181263&fm=26&gp=0.jpg'					
											} else if(value.sex == '女'){
												userImg = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4061672780,1877745021&fm=26&gp=0.jpg'
											} else {
												userImg = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194176525,2404367419&fm=26&gp=0.jpg'
											};										
											that.tableData.push({
													account:value.account,
													phone:value.phone,
													name:value.nickname,
													headimg:userImg,
													sex:value.sex,
													createTime:that.changeDate(new Date(value.time)),
													status:status,
													aid:value.aid
											})
									})
								}
					 	})
					 	.catch(function(err){
					 	console.log(err)
					 	})
					 				
					 }		
		   },
			submitChange(){
			 	let that = this;
				 const token=localStorage.getItem('token');
				 let idArray = [];
				 for(let i=0;i<this.datas.length;i++){
					 if(this.datas[i].isChosen == true || this.datas[i].isChosen == 'true'){
						   idArray.push(this.datas[i].id)
						 }
					 }
					 this.$axios({
						 url:this.$baseUrl+'/portal/role/currentAccount/roles/'+this.aid+'?token='+token,
						 method:'post',
						 data:idArray
					 })
					 .then(function(res){
					 		console.log(res);
							if(res.data.code == 0){							 
								 that.$message({
									message: '授权成功',
									type: 'success'
								});
								that.show = false;
								that.refresh();
							}else{
								that.$message({
									message: res.data.msg,
									type: 'warning'
								});
							}
					 										  
					 })
					 .catch(function(err){
					 console.log(err)
					 })
			 },
			accountManage(status,account){
				      console.log(status,account)
							let that = this;
				      const token=localStorage.getItem('token');
							if(status == '身份授权'){
								  this.aid = account;
									this.$axios.get(this.$baseUrl+'/portal/role/currentAccount/roles/'+account+'?token='+token)
									.then(function(res){
											console.log(res);
											if(res.data.code == 0){
												that.show = true;
												that.datas = res.data.data;
												console.log(that.datas)
											}									  
									})
									.catch(function(err){
									console.log(err)
									})
							}else{
								 	let state = status == '正常' ? '停用':'启用';
								 	let state2 = status == '正常' ? 0:1;							
								 	this.$confirm('确认'+state+'‘'+'<span style="color:#FF9800">'+account+'</span>'+'’账号吗？', '提示', {
								 	confirmButtonText: '确定',
								 	cancelButtonText: '取消',
								 	type: 'warning',
								 	dangerouslyUseHTMLString: true,
								 }).then(() => {
								 	that.$axios.post(this.$baseUrl+'/user/block?accounts='+account+'&status='+state2+'&token='+token,{})
								 	.then(function(res){
								 			console.log(res)
								 			that.$message({
								 				type: 'success',
								 				message: state+'成功!'
								 			});
								 			that.refresh();
								 	})
								 	.catch(function(err){
								 			console.log(err)
								 	})			 				
								 }).catch(function(err)  {
								 	console.log(err)
								 	that.$message({
								 		type: 'info',
								 		message: '已取消'
								 	});          
								 });
							}
				      
			 },
			getRoles(){
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$baseUrl+'/portal/role/currentRole?token='+token)
				.then(function(res){
					  console.log(res);	
					  if(res.data.code == 0){
						let data = res.data.data;
						console.log(data)
						for(var i =0;i<data.length;i++){
							if(data[i] == '超级管理员' || data[i] == '管理员'){
								that.role = 'admin';
								that.searchData = that.searchData1;
								that.titles = that.title1;
								that.UserList = 'UserListAdmin';
								that.adminSelect();
								that.getImgList(1);
								break;
							} else if(data[i] == '学校'){
								that.role = 'school';
								that.searchData = that.searchData2;
								that.titles = that.title2;
								that.UserList = 'UserList';
								that.getImgList(1);
								break;
							}else if(data[i] == '企业'){
								that.role = 'company';
								that.searchData = that.searchData2;
								that.titles = that.title2;
								that.UserList = 'UserListCompany';
								that.getImgList(1);
								break;
							}
						}					
					}
				})
				.catch(function(err){
				console.log(err)
				})
							
			},
			//管理员登陆时可以筛选查询不同身份的用户列表（动态获取不同身份的id）
			adminSelect(){
				let that=this;
				const token=localStorage.getItem('token');
				 this.$axios.get(this.$baseUrl+'/portal/role/roles?token='+token)
				 .then(function(res){
				 	console.log(res.data.data);
				 	if(res.data.code == 0){
				 		let data = res.data.data;
				 		data.forEach(function(value,index,array){
				 			that.searchData1[1].options.push({
				 				value:value.id,
				 				label:value.roleName,
				 				})
				 		})	
				 	}							
				 })
				 .catch(function(err){
				 console.log(err)
				 })
			},
			refresh(){
				//策略进行DOM的更新，表格以及分页刷新
				this.paginationShow = false;
				this.$nextTick(function () {
				this.tableData=[];
				this.getImgList(1);
				this.paginationShow = true;
				})
			},
		},
		created:function(){  
			  this.getRoles();							
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