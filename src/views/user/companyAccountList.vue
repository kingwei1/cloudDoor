<template>
	<div id="main">	
		<div class="backLayout">		
			<breadcrumb :menu="menu"></breadcrumb>
      <search :searchData="searchData" @search='search'></search>
			<tableList :tableData="tableData" :titles="titles" operate='true' flag='companyAccountList'  headimg="true"></tableList>
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
		name:'companyAccountList',
		components:{
			tableList,
      search,
			breadcrumb,
			pagination
		},
		data(){
			return{  
				       searchInput:'',
							 searchRole:'',
							 searchTime1:'',
							 searchTime2:'',
							 pageSize:10,
							 paginationShow:true,
							 listTotal:0,
				       menu:[{
				       title:'企业审核',
				       }],
               titles:[
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
                     prop:'company',
                     label:'所属单位'
                  },{
                     prop:'applyTime',
                     label:'申请时间'
                  },{
                     prop:'status',
                     label:'状态'
                  },
               ],
               tableData:[],
               searchData:[
                  {
                    title:'',
                    type:'input',
                    placeholder:'请输入账号、昵称、手机号',
                  },{
                    title:'',
                    type:'select',
                    placeholder:'请选择状态',
                    options:[
                       {
                        label:'待审核'
                       },
                       {
                        label:'已通过'
                       },
											 {
											 label:'未通过'
											 },
                    ]
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
				this.getCompany(val)
			},
			pageChangeSize(val){
				this.paginationShow = false;
							this.$nextTick(function () {
							this.paginationShow = true;
							})
							this.$refs.page.setSize(val);
							this.pageSize = val; 
							this.getCompany(1)
			},
			search(a,b,c){
				console.log(a,b,c);
				if(c == null){
					this.searchTime1 = '';
					this.searchTime2 = '';
				} else{
					this.searchTime1 = c[0]== undefined? '':new Date(c[0]).toJSON();
					this.searchTime2 = c[1]== undefined? '':new Date(c[1]).toJSON();
				}
				if(b[1] != undefined){
					if(b[1] == '待审核'){
						 this.searchRole = 'pending';
					}else if(b[1] == '已通过'){
						 this.searchRole = 'pass';
					}else{
						 this.searchRole = 'no_pass';
					}
				}else{
					this.searchRole = '';
				}
				this.searchInput= a[0] == undefined? '':a[0];						
				//console.log(this.searchInput,this.searchRole,this.searchTime1,this.searchTime2);
				this.getCompany(1);
			},
			getCompany(page){
				const token=localStorage.getItem('token');
				let that=this;
				console.log(this.searchInput,this.searchRole,this.searchTime1,this.searchTime2);
				this.$axios.get(this.$userUrl+'/company/page?page='+(page-1)+'&size='+this.pageSize+'&param='+this.searchInput+'&auditStatus='+this.searchRole+'&startTime='+this.searchTime1+'&endTime='+this.searchTime2+'&token='+token)
				.then(function(res){
					console.log(res);
					that.tableData = [];
					that.listTotal = res.data.totalElements,
					res.data.content.forEach(function(value,index,array){
						let sex = value.account.gender;
						let userImg = '';
						if(sex == -1){
							sex = '未知';
							userImg = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194176525,2404367419&fm=26&gp=0.jpg'
						}else if(sex == 0){
							sex = '男';
							userImg = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3682778528,1296181263&fm=26&gp=0.jpg'
						}else{
							sex = '女';
							userImg = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4061672780,1877745021&fm=26&gp=0.jpg'
						}
						let status = value.company.auditstatus;
						if(status == 'pass'){
							status = '已通过'
						}else if(status == 'pending'){
							status = '待审核'
						}else{
							status = '未通过'
						}
					that.tableData.push({
						 account:value.account.accountNumber,
						 phone:value.account.phoneNo,
						 name:value.account.nickname,
						 //headimg:value.account.avatarUrl,
						 headimg:userImg,
						 identity:value.account.roleName,
						 sex:sex,
						 company:value.account.deptName,
						 applyTime:that.changeDate(new Date(value.company.committime)),
						 status:status,
						 id:value.company.id
					 })
					})
					
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
				this.getCompany(1);
				this.paginationShow = true;
				})
			},
		},
		created:function(){
			this.getCompany(1);
		}
	}
</script>
<style scoped>

</style>
<style>
	/* .backLayout .el-breadcrumb__inner.is-link{
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
  } */
</style>