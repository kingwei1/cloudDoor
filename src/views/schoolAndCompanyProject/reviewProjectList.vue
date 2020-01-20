<template>
	<div id="main">	
		<div class="backLayout">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>项目审核列表</el-breadcrumb-item>
			</el-breadcrumb>	
      <search :searchData="searchData" @search='search'></search>
			<tableList :tableData="tableData" :titles="titles" operate='true' flag='reviewProjectLsit'  @open="open"
       @auditPro="auditPro"></tableList>
      <pagination ref="page" :paginationShow="paginationShow" :listTotal="listTotal" @pageChangeSize="pageChangeSize" @page="page"></pagination>
			<dialogBox :dialogVisible='show' :flag="flag" :datas="datas" @close="close"></dialogBox>
		</div>
	</div>
</template>
<script>
  import pagination from '../components/pagination'
	import tableList from '../components/tableList'
  import search from '../components/search'
  import dialogBox from '../components/dialogBox'
	export default{
		name:'reviewProjectLsit',
		components:{
			tableList,
      search,
      dialogBox,
			pagination
		},
		data(){
			return{
               show:false,
               flag:'',
							 pageSize:10,
							 paginationShow:true,
							 listTotal:0,
							 searchTime1:'',
							 searchTime2:'',
							 searchState:'',
							 searchInput:'',
               titles:[
                  {
                     prop:'id',
                     label:'项目ID'
                  },
                  {
                     prop:'company',
                     label:'项目企业'
                  },
                  {
                     prop:'proName',
                     label:'项目名称'
                  },{
                     prop:'proIntroduce',
                     label:'项目介绍'
                  },{
                     prop:'sort',
                     label:'项目分类'
                  },{
                     prop:'recruitsNumber',
                     label:'招募人数'
                  },{
                     prop:'Number',
                     label:'现有人数'
                  },{
                     prop:'createTime',
                     label:'创建时间'
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
                    placeholder:'项目名称',
                  },{
                    title:'',
                    type:'select',
                    placeholder:'请选择状态',
                    options:[
                       {
                       label:'全部',
                       value:''
                       },{
                        label:'待审核',
						value:'0'
                       },
						{
						 label:'未通过',
						 value:'1'
						},
                       {
                        label:'已通过',
						value:'2'
                       },
                       {
                        label:'已完成',
						value:'3'
                       }
                    ]
                  },{
                    title:'',
                    type:'date',
                    placeholder1:'上传起始日期',
                    placeholder2:'上传终止日期',
                  },
               ],
               datas:{
                tableData:[],
                titles:[
                    {
                     prop:'name',
                     label:'技术人员'
                  },{
                     prop:'station',
                     label:'所在岗位'
                  },{
                     prop:'time',
                     label:'评价时间'
                  },{
                     prop:'evaluate',
                     label:'对技术人员的评价'
                  }
                ],                
               }
			}
		},
		methods:{
			page(val){
				this.getList(val)
			},
			pageChangeSize(val){
				this.paginationShow = false;
							this.$nextTick(function () {
							this.paginationShow = true;
							})
							this.$refs.page.setSize(val);
							this.pageSize = val; 
							this.getList(1)
			},
	  open(id,flag){ 
			this.show=true;
			this.flag=flag;
			let that=this;
			const token=localStorage.getItem('token');		
			this.$axios.get(this.$schoolCompanyUrl+'/enterprise/evaluations/'+id+'?token='+token)
			.then(function(res){
					console.log(res);	
					if(res.data.code == 0){
						let data = res.data.data;						
						that.datas.tableData = [];
						data.forEach(function(value,index,array){
							that.datas.tableData.push({
									id:value.id,
									name:value.studentName,
									station:value.positionName,
									time:that.changeDate(new Date(value.evaluationTime)),
									evaluate:value.evaluation
							})
						})														
					}
			})
			.catch(function(err){
					console.log(err)
			})
       },
      close(){
        this.show=false;
      },
      auditPro(state,id){
			console.log(state,id)
			let that=this;
			const token=localStorage.getItem('token');
			if(state == '通过' || state == '拒绝'){
				let state1 = state == '通过'? '您确认该项目审核通过吗？项目通过后可以项目访问、招聘等功能':'您确认拒绝该项目吗？该项目拒绝后企业可以重新上传项目信息';
				let state2 = state == '通过'? true:false;    
				this.$confirm(state1, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true,
				}).then(() => {
					this.$axios.post(this.$schoolCompanyUrl+'/school/auditProject?token='+token+'&projectId='+id+'&flag='+state2)
					.then(function(res){
							console.log(res);
							if(res.data.code == 0){
								that.$message({
									type: 'success',
									message: '已'+state+'!'
								});
								that.refresh();
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
			else if(state == '显示' || state == '隐藏'){
				let state1 = state == '隐藏'? '您确认隐藏该项目吗？隐藏后前端不可查看':'您确认显示该项目吗？显示后前端将展示该项目';
				let state2 = state == '隐藏'? false:true;    
				this.$confirm(state1, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true,
				}).then(() => {
					this.$axios.post(this.$schoolCompanyUrl+'/school/showProject?token='+token+'&projectId='+id+'&flag='+state2)
					.then(function(res){
							console.log(res);
							if(res.data.code == 0){
								that.$message({
									type: 'success',
									message: '已'+state+'!'
								});
								that.refresh();
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
			search(a,b,c){
				console.log(a,b,c);
				if(c == null){
					this.searchTime1 = '';
					this.searchTime2 = '';
				} else{
					this.searchTime1 = c[0]== undefined? '':this.changeDate(new Date(c[0]),'yyyy/MM/dd');
					this.searchTime2 = c[1]== undefined? '':this.changeDate(new Date(c[1]),'yyyy/MM/dd') + ' 23:59:59';
				}
				if(b[1] != undefined){
					for(let i =0;i<this.searchData[1].options.length;i++){
						if(b[1] == this.searchData[1].options[i].label){
							this.searchState = this.searchData[1].options[i].value;
							break;
						}
					}
				}
				this.searchInput= a[0] == undefined? '':a[0];						
				console.log(this.searchInput,this.searchState,this.searchTime1,this.searchTime2);
				this.getList(1);
			},
			getList(page){
				let that=this;
				const token=localStorage.getItem('token');
				let url = '';
				if(this.searchTime1 == '' || this.searchTime1 ==undefined){
					url = this.$schoolCompanyUrl+'/school/projects?token='+token+'&pageNum='+page+'&pageSize='+this.pageSize+'&query='+this.searchInput+'&status='+this.searchState;
				}else{
					url = this.$schoolCompanyUrl+'/school/projects?token='+token+'&pageNum='+page+'&pageSize='+this.pageSize+'&query='+this.searchInput+'&status='+this.searchState+'&startTime='+this.searchTime1+'&endTime='+this.searchTime2;
				}
				this.$axios.get(url)
				.then(function(res){
						console.log(res);
						if(res.data.code == 0){
							let data = res.data.data;
							that.listTotal = res.data.count;
							that.tableData = [];
							data.forEach(function(value,index,array){
									let state = '';
									if(value.status == 0){
											state = '待审核'
									}else if(value.status == 1){
											state = '未通过'
									}else if(value.status == 2){
											state = '已通过'
									}else if( value.status == 3){
											state = '已完成'
									}									
									that.tableData.push({
										id:value.id,
										company:value.enterpriseName,
										proName:value.name,
										proIntroduce:value.introduction,
										sort:value.typeName,
										recruitsNumber:value.total,
										Number:value.currentTotal == null? 0:value.currentTotal,
										createTime:that.changeDate(new Date(value.created)),
										status:state,
										isShow:value.isShow
									});
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
				this.getList(1);
				this.paginationShow = true;
				})
			},

		},
		created:function(){
			this.getList(1);
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