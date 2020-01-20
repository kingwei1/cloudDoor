<template>
    <div id="main">
        <div class="backLayout">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>项目分类管理</el-breadcrumb-item>
                <el-button type="primary" @click="edit('添加分类')">添加分类</el-button>
            </el-breadcrumb>
            <tableList :tableData="tableData" :titles="titles" operate='true' flag='projectSortManage' @open="open" @edit="edit"></tableList>
            <dialogBox :dialogVisible='show' :flag="flag" @close="close" :datas="datas" @newsType='newsType'></dialogBox>
        </div>
    </div>
</template>
<script>
    import tableList from '../components/tableList'
    import search from '../components/search'
    import dialogBox from '../components/dialogBox'
    export default {
        name: 'projectSortManage',
        components: {
            tableList,
            search,
            dialogBox
        },
        data() {
            return {
                show:false,
                flag:'',
                titles:[
                    {
                        prop:'title',
                        label:'分类名称'
                    },
                    {
                        prop:'sort',
                        label:'排序'
                    },{
                        prop:'createTime',
                        label:'创建时间'
                    },{
                        prop:'status',
                        label:'状态'
                    }
                ],
                tableData:[],
                datas:{
								sorts:'0',
								name:''
					     },
            }
        },
        methods:{
            open(state,id){
							  console.log(state,id)
								let state1 = state == '已显示'? '确认要隐藏该分类吗，隐藏后前端将不展示该分类内容！':'确认要显示该分类吗，显示后前端展示该分类内容！';
								let state2 = state == '已显示'? false:true;
								let state3 = state == '已显示'? '已隐藏':'已显示';
                this.$confirm(state1, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                 }).then(() => {
									  let that=this;
									  const token=localStorage.getItem('token');
									  this.$axios.post(this.$schoolCompanyUrl+'/type/hide?token='+token+'&id='+id+'&flag='+state2)
									  .then(function(res){
												console.log(res);
												if(res.data.code == 0){
													that.$message({
														message: state3,
														type: 'success'
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
            },
            edit(flag,row){
                if(flag=='添加分类'){
                    this.flag='添加分类';
										this.datas={
												name:'',
												sorts:0
										}										
                }else if(flag=='修改分类'){
                    this.flag=flag;
										console.log(row)
                    this.datas={
                        name:row.title,
                        sorts:row.sort,
												id:row.id
                    }
                }
                this.show=true;
            },
            close(){
                this.show=false;
            },
			getTypes(){
				console.log(22);
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$schoolCompanyUrl+'/type/types?token='+token)
				.then(function(res){
					console.log(res);
					if(res.data.code == 0){
						let data = res.data.data;
						data.forEach(function(value,index,array){
							let state = value.status == 0? '已显示':'已隐藏'
							that.tableData.push({
								title:value.name,
								sort:value.weight,
								createTime:that.changeDate(new Date(value.created)),
								id:value.id,
								status:state
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
			newsType(flag){
				console.log(flag);
				let that=this;
				const token=localStorage.getItem('token');
				if(this.datas.name == ''){
					this.$message.error('请填写分类名称');
				}else{
					if(flag == '添加分类'){
						 this.$axios.post(this.$schoolCompanyUrl+'/type/type?token='+token+'&name='+this.datas.name+'&weight='+this.datas.sorts)
						 .then(function(res){
						 	console.log(res);
						 		if(res.data.code == 0){
						 		that.$message({
						 			message: '创建成功',
						 			type: 'success'
						 		});
						 		that.show=false;
						 		that.refresh();
						 	}else{
						 		that.$message.error(res.data.msg);
						 	}
						 		
						 })
						 .catch(function(err){
						 		console.log(err)
						 })
					}
					else if(flag == '修改分类'){
						 this.$axios.post(this.$schoolCompanyUrl+'/type/modifyType?token='+token+'&name='+this.datas.name+'&weight='+this.datas.sorts+'&id='+this.datas.id)
						 .then(function(res){
						 	console.log(res);
						 		if(res.data.code == 0){
						 		that.$message({
						 			message: '修改成功',
						 			type: 'success'
						 		});
						 		that.show=false;
						 		that.refresh();
						 	}else{
						 		that.$message.error(res.data.msg);
						 	}
						 		
						 })
						 .catch(function(err){
						 		console.log(err)
						 })
					}
					
				}			
			},
			refresh(){
				//策略进行DOM的更新，表格以及分页刷新
				this.$nextTick(function () {
				this.tableData=[];
				this.getTypes();
				})
			},

    },
		created:function(){
			this.getTypes();
		}
    }
</script>