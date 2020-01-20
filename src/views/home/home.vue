<template>
    <div id="main">
        <div class="backLayout">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>门户首页排版</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="title"><span>门户焦点图</span><span class="blue">还可以再添加{{addNum1}}个图片</span><el-button type="primary" @click='open(undefined,"添加轮播图")'>添加轮播图</el-button></div>
            <tableList :tableData="tableData" :titles="titles" operate='true' flag='homeManage' :homeManage='true' @edit='open'></tableList>
            <div class="title"><span>实训能力设置</span></div>
            <div class="formBox">
                <div><span>大标题</span><span><el-input v-model="BigTitle" @input="hadleInput1" :maxlength="15" /></span><span class="use">{{inputSum1}}/15</span></div>
                <div><span>副标题</span><span><el-input v-model="NextTitle" class="long" @input="hadleInput2" :maxlength="30"/></span><span class="use">{{inputSum2}}/30</span></div>
            </div>
            <div class="title"><span>校企项目设置</span></div>
            <div class="formBox">
                <div><span>大标题</span><span><el-input v-model="BigTitle2" @input="hadleInput3" :maxlength="15"/></span><span class="use">{{inputSum3}}/15</span></div>
                <div><span>副标题</span><span><el-input v-model="NextTitle2" class="long" @input="hadleInput4" :maxlength="30"/></span><span class="use">{{inputSum4}}/30</span></div>
            </div>
            <div class="title"><span class="blue">还可以再添加{{addNum2}}个项目(为了展示美观建议总共3或者6个)</span><el-button type="primary" @click="addProject()">添加项目</el-button></div>
            <tableList :tableData="tableData2" :titles="titles2" operate='true' flag='homeManage2' :homeManage2='true' @operation='projectManage'></tableList>
            <div class="title"><span>企业墙设置</span></div>
            <div class="formBox">
                <div><span>大标题</span><span><el-input v-model="BigTitle3" @input="hadleInput5" :maxlength="15"/></span><span class="use">{{inputSum5}}/15</span></div>
                <div><span>副标题</span><span><el-input v-model="NextTitle3" class="long" @input="hadleInput6" :maxlength="30"/></span><span class="use">{{inputSum6}}/30</span></div>
            </div>
            <div class="title"><span class="blue">还可以再添加{{addNum3}}个企业logo</span><el-button type="primary" @click='open(undefined,"添加企业墙")'>添加企业logo</el-button></div>
            <tableList :tableData="tableData3" :titles="titles3" operate='true' flag='homeManage3' :homeManage3='true' @deleteCompany='deleteCompany' @edit='open'></tableList>
            <div class="title"><span>热门资讯设置</span></div>
            <div class="formBox">
                <div><span>大标题</span><span><el-input v-model="BigTitle4" @input="hadleInput8" :maxlength="15"/></span><span class="use">{{inputSum8}}/15</span></div>
            </div>
            <div class="title"><span class="blue">还可以再添加{{addNum4}}个热门资讯(为了展示美观建议总共3或者6个)</span><el-button type="primary" @click='open(undefined,"添加资讯")'>添加资讯</el-button></div>
            <tableList :tableData="tableData4" :titles="titles4" operate='true' flag='homeManage4' :homeManage5='true' @open='open'></tableList>
            <dialogBox :dialogVisible='show' :flag="flag" :datas="datas" @close="show=false" @submitImgInfo='submitImgInfo' @submitCompany='submitCompany' ref="getOldImg" @addNews='addNews'></dialogBox>
            <dialogBox :dialogVisible='show2' :flag="flag2" :datas="datas2" @close="show2=false" @saveProject="saveProject"></dialogBox>
						<div style="margin: auto;width: 100px;padding:0px 0px 60px">
            	<el-button type='primary' @click="saveTitle">一键保存标题</el-button>
            </div>

        </div>

    </div>
</template>

<script>
    import tableList from '../components/tableList'
    import dialogBox from '../components/dialogBox'
    export default {
        name: "home",
        components:{
            tableList,
            dialogBox
        },
        data(){
            return{
                addNum1:0,
								addNum2:0,
								addNum3:0,
								addNum4:0,
                BigTitle:'',
                NextTitle:'',
                BigTitle2:'',
                NextTitle2:'',
                BigTitle3:'',
                NextTitle3:'',
                BigTitle4:'',
                inputSum1:0,
                inputSum2:0,
                inputSum3:0,
                inputSum4:0,
                inputSum5:0,
                inputSum6:0,
                inputSum7:0,
                inputSum8:0,
                show:false,
                flag:'',
                id:'',
								show2:false,
								datas2:{
									data:[],
									name:'',
									enterpriseName:'',
									pictureUrl:'',
									weight:'',
									id:'',
									auditTime:''
								},
								flag2:'',
                datas:{
                    title:'',
                    href:'',
                    sort:0,
                    oldImgUrl:'',
                    oldImgId:'',
                    name:'',
                    introduce:'',
                    sort2:0,
                    cname:'',
                    nname:'',
                    newsSort:0,
                },
                titles:[
                    {
                        prop:'id',
                        label:'序号'
                    },{
                        prop:'title',
                        label:'标题'
                    },{
                        prop:'href',
                        label:'跳转链接'
                    },{
                        prop:'sort',
                        label:'排序'
                    }
                ],
                titles2:[
                    {
                        prop:'id',
                        label:'项目id'
                    },{
                        prop:'title',
                        label:'项目名称'
                    },{
                        prop:'company',
                        label:'发布企业'
                    },{
                        prop:'sort',
                        label:'排序'
                    }
                ],
                titles3:[
                    {
                        prop:'id',
                        label:'序号'
                    },{
                        prop:'cname',
                        label:'企业名称'
                    },{
                        prop:'cintroduce',
                        label:'企业介绍'
                    },{
                        prop:'sort',
                        label:'排序'
                    }
                ],
                titles4:[
                    {
                        prop:'id',
                        label:'资讯id'
                    },{
                        prop:'title',
                        label:'资讯名称'
                    },{
                        prop:'read',
                        label:'浏览量'
                    },{
                        prop:'sort',
                        label:'排序'
                    }
                ],
                tableData:[],
                tableData2:[],
                tableData3:[],
                tableData4:[],
            }
        },
        methods:{
            hadleInput1(event){
                 this.inputSum1=event.length
            },
            hadleInput2(event){
                 this.inputSum2=event.length
            },
            hadleInput3(event){
                 this.inputSum3=event.length
            },
            hadleInput4(event){
                 this.inputSum4=event.length
            },
            hadleInput5(event){
                 this.inputSum5=event.length
            },
            hadleInput6(event){
                 this.inputSum6=event.length
            },
            hadleInput7(event){
                 this.inputSum7=event.length
            },
            hadleInput8(event){
                 this.inputSum8=event.length
            },
						addProject(){
							 let that=this;
							 const token=localStorage.getItem('token');
							 this.$axios.get(this.$schoolCompanyUrl+'/homepage/portal/projects?token='+token)
							 .then(function(res){
							 	console.log(res)
							 	if(res.data.code == 0){
							 		let data = res.data.data;
									that.datas2.data = [];
							 		data.forEach(function(value,index,array){
							 				that.datas2.data.push({
							 						id: value.id,
							 						name: value.name,
							 						enterpriseName: value.enterpriseName,
							 						pictureUrl: value.pictureUrl,
													auditTime:value.auditTime
							 				})
							 		});
									that.flag2= '添加项目';
									that.show2=true;
							 	}else{
											that.$message.error(res.data.msg);
								}

							 })
							 .catch(function(err){
							 console.log(err)
							 })
						},
						getProject(){
							let that=this;
							const token=localStorage.getItem('token');
							this.$axios.get(this.$baseUrl+'/homepage/admin/projects?token='+token)
							.then(function(res){
								console.log(res)
								if(res.data.code == 0){
									let data = res.data.data;
									that.tableData2 = [];
									that.addNum2 = 6 - data.length;
									data.forEach(function(value,index,array){
											that.tableData2.push({
													id: value.id,
													title: value.name,
													company: value.enterpriseName,
													sort: value.weight,
													project: value.pictureUrl,
											})
									});

								}

							})
							.catch(function(err){
							console.log(err)
							})
						},
						saveProject(flag){
							let that=this;
							const token=localStorage.getItem('token');
							console.log(this.datas2);
							if (flag=='添加项目') {
								if(this.datas2.id == ''){
										this.$message.error('请选择要添加展示的项目');
								}else{
									let data = {
										id:this.datas2.id,
										name:this.datas2.name,
										enterpriseName:this.datas2.enterpriseName,
										pictureUrl:this.datas2.pictureUrl,
										weight:this.datas2.weight,
										auditTime:this.datas2.auditTime
									}
									this.$axios.post(this.$baseUrl+'/homepage/admin/project?token='+token,data)
									.then(function(res){
										console.log(res)
										if(res.data.code == 0){
											let data = res.data.data;
											that.show2=false;
											that.getProject();
										}else{
											that.$message.error(res.data.msg);
										}

									})
									.catch(function(err){
									console.log(err)
									})
								}
							}
							else if(flag=='编辑项目'){
								this.$axios.post(this.$baseUrl+'/homepage/admin/project/weight?token='+token+'&projectId='+this.datas2.id+'&weight='+this.datas2.weight)
								.then(function(res){
									console.log(res)
									if(res.data.code == 0){
										let data = res.data.data;
										that.show2=false;
										that.getProject();
									}else{
										that.$message.error(res.data.msg);
									}

								})
								.catch(function(err){
								console.log(err)
								})
							}

						},
						projectManage(row,flag){
							console.log(row,flag);
							if(flag == '编辑项目'){
								this.datas2.id = row.id;
								this.datas2.name = row.title;
								this.datas2.enterpriseName = row.company;
								this.datas2.pictureUrl = row.project;
								this.datas2.weight = row.sort;
								this.show2 = true;
								this.flag2 = flag;
							}else if(flag == '删除项目'){
								let that = this;
								const token=localStorage.getItem('token');
								this.$confirm('是否确认删除该条校企合作项目，删除将取消该项目首页热门展示', '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											dangerouslyUseHTMLString: true,
											type: 'warning'
										}).then(() => {
											this.$axios.post(this.$baseUrl+'/homepage/admin/project/delete/'+row.id+'?token='+token)
											.then(function(res){
													console.log(res)
													if(res.data.code == 0){
														that.$message({
															type: 'success',
															message: '取消该项目首页热门展示!'
														});
														that.getProject();
													}else{
														that.$message.error(res.data.msg);
													}
											})
											.catch(function(err){
													console.log(err)
											})
										}).catch((err) => {
											console.log(err)
											that.$message({
												type: 'info',
												message: '已取消'
											});
										});
							}

						},
            getImgList(){
                const token=localStorage.getItem('token')
                let that = this;
                this.$axios.get(this.$baseUrl+'/focuspic/get?token='+token,{})
                .then(function(res){
                    let data = res.data.data;
										that.addNum1 = 10 - data.length;
                    data.forEach(function(value,index,array){
                        that.tableData.push({
                            id: value.id,
                            title: value.title,
                            href: value.jumpLink,
                            sort: value.sort,
                            banner: that.$pictrueShowUrl+'/data/access/'+value.filePath,
                            fileId:value.fileId
                        })
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
            },
            getCompany(){
                const token=localStorage.getItem('token')
                let that = this;
                this.$axios.get(this.$baseUrl+'/enterwall/get?token='+token,{})
                .then(function(res){
                    let data = res.data.data;
										that.addNum3 = 6 - data.length;
                    data.forEach(function(value,index,array){
                        that.tableData3.push({
                            id: value.id,
                            sort: value.sort,
                            cname:value.enterpriseName,
                            cintroduce:value.enterpriseIntroduce,
							              fileId:value.fileId,
                            logo: that.$pictrueShowUrl+'/data/access/'+value.filePath,
                        })
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
            },
            getNews(){
            	const token=localStorage.getItem('token');
	            let that=this;
	            this.$axios.get(this.$baseUrl+'/news/publishNews?token='+token,{})
	            .then(function(res){
	                console.log(res.data)
	                let data=res.data.data;
									that.addNum4 = 6 - data.length;
	                data.forEach(function(value,index,array){
	                    let date=new Date(value.created)
	                    let createDate=that.changeDate(date,'yyyy-MM-dd')
	                    that.tableData4.push({
	                        id:value.id,
	                        title:value.title,
	                        project:that.$pictrueShowUrl+'/data/access/'+value.coverImg,
	                        read:value.views,
                            sort:value.sort

	                    })
	                })
	            })
	            .catch(function(err){
	                console.log(err)
	            })
            },
            getTitle(){
            	const token=localStorage.getItem('token')
                let that = this;
                this.$axios.get(this.$baseUrl+'/homepage/getTitles?token='+token,{})
                .then(function(res){
                	console.log(res)
                    let data=res.data.data;
                    	that.BigTitle=data[0].title
                    	that.NextTitle=data[0].subTitle
                    	that.BigTitle2=data[1].title
                    	that.NextTitle2=data[1].subTitle
                    	that.BigTitle3=data[2].title
                    	that.NextTitle3=data[2].subTitle
                    	that.BigTitle4=data[3].title
                })
                .catch(function(err){
                    console.log(err)
                })
            },
			  deleteCompany(id){
					  const token=localStorage.getItem('token');
						let that=this;
					  console.log(id);
						this.$axios.delete(this.$baseUrl+'/enterwall/delete?token='+token+'&enterpriseWallId='+id,{})
						.then(function(res){
								console.log(res)
								that.refresh();
						})
						.catch(function(err){
								console.log(err)
						})
				},
            submitImgInfo(value,flag){
               const token=localStorage.getItem('token');
               let that=this;
               if (flag=='添加轮播图') {
                  let FocusPicture={
                    title:that.datas.title,
                    sort:that.datas.sort,
                    fileId:value.value2,
                    filePath:value.value,
                    jumpLink:that.datas.href
               }
               this.$axios.post(this.$baseUrl+'/focuspic/add?token='+token,FocusPicture)
               .then(function(res){
                 console.log(res)
                 that.$message({
                    message:'添加成功',
                    type:'success'
                 })
                 that.show=false
                 that.refresh()
               })
               .catch(function(err){
                 console.log(err)
               })
               }
               if (flag=='编辑轮播图') {
                 console.log(value)
                  if (value==undefined) {
                    value={value:this.datas.oldImgUrl,value2:this.datas.oldImgId}
                  }
                  console.log(value.value)
                  let FocusPicture={
                    id:that.id,
                    title:that.datas.title,
                    sort:that.datas.sort,
                    fileId:value.value2,
                    filePath:value.value,
                    jumpLink:that.datas.href
                 }
                 console.log(FocusPicture)
                  this.$axios.post(this.$baseUrl+'/focuspic/update?token='+token,FocusPicture)
                       .then(function(res){
                         console.log(res)
                         that.$message({
                            message:'修改成功',
                            type:'success'
                         })
                         that.show=false
                         that.refresh()
                       })
                       .catch(function(err){
                         console.log(err)
                       })
               }

            },
            submitCompany(value,flag){
								const token=localStorage.getItem('token');
								let that=this;
                if (flag=='编辑企业墙') {
                    if (value==undefined) {
                    value={value:this.datas.oldImgUrl,value2:this.datas.oldImgId}
                  }
                  console.log(value.value)
                  let company={
                    id:that.id,
                    enterpriseName:that.datas.name,
                    sort:that.datas.sort2,
                    fileId:value.value2,
                    filePath:value.value,
                    enterpriseIntroduce:that.datas.introduce
                 }
                 console.log(company)
                   this.$axios.post(this.$baseUrl+'/enterwall/update?token='+token,company)
                       .then(function(res){
                         console.log(res)
                         that.$message({
                            message:'修改成功',
                            type:'success'
                         })
                         that.show=false
                         that.refresh()
                       })
                       .catch(function(err){
                         console.log(err)
                       })
                }
					if(flag=='添加企业墙') {
						let company={
							sort:that.datas.sort2,
							fileId:value.value2,
							filePath:value.value,
							enterpriseName:that.datas.name,
							enterpriseIntroduce:that.datas.introduce
						}
						console.log(company);
						console.log(that.datas)
						this.$axios.post(this.$baseUrl+'/enterwall/add?token='+token,company)
									.then(function(res){
										console.log(res)
										if(res.data.code == 0){
											that.$message({
												message:'添加成功',
												type:'success'
											})
											that.show=false
											that.refresh()
										}else{
											that.$message.error(res.data.msg);
										}

									})
									.catch(function(err){
										console.log(err)
									})
					}
            },
            open(row,flag){
                this.flag=flag;
                this.show=true;
                if (this.flag=='添加轮播图') {
                    let that=this
                    this.datas.title='';
                    this.datas.sort='';
                    this.datas.href='';
                    let oldImg=[]
                    setTimeout(function(){
                        that.$refs.getOldImg.dialogGetOldImg(oldImg);
                    },100)

                }
                if (this.flag=='编辑轮播图') {
                	console.log(row.banner)
                    let that=this
                    this.id=row.id;
                    this.datas.title=row.title;
                    this.datas.sort=parseInt(row.sort);
                    this.datas.href=row.href;
                    this.datas.oldImgUrl=row.banner.split('access/')[1];
                    this.datas.oldImgId=row.fileId;
                    let oldImg=[{name:'banner',url:this.datas.oldImgUrl}]
                    setTimeout(function(){
                        that.$refs.getOldImg.dialogGetOldImg(oldImg);
                    },100)
                }
                if (this.flag=='删除轮播图') {
                    const token=localStorage.getItem('token')
                    let that=this;
                    this.$confirm('确认删除‘'+'<span style="color:#FF9800">'+row.title+'</span>'+'’轮播图吗？', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning',
                      dangerouslyUseHTMLString: true,
                    }).then(() => {
                        this.$axios.post(this.$baseUrl+'/focuspic/delete?token='+token+'&focusPictureId='+row.id)
                        .then(function(res){
                            console.log(res)
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                              });
                            that.refresh()
                        })
                        .then(function(err){
                            console.log(err)
                        })

                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消'
                      });
                    });
                }
          if(flag=='编辑企业墙'){
						console.log(row.logo)
						let that=this
						this.id=row.id;
						this.datas.name=row.cname;
						this.datas.sort2=parseInt(row.sort);
						this.datas.oldImgUrl=row.logo.split('access/')[1];
						this.datas.oldImgId=row.fileId;
						this.datas.introduce=row.cintroduce;
						 let oldImg=[{name:'company',url:this.datas.oldImgUrl}]
						setTimeout(function(){
								that.$refs.getOldImg.dialogGetOldImg(oldImg);
						},100)
					}
				if(flag=='添加企业墙'){
					let that=this
					this.datas.name='';
					this.datas.sort2=0;
					this.datas.oldImgUrl='';
					this.datas.oldImgId='';
					this.datas.introduce='';
					 let oldImg=[]
					setTimeout(function(){
							that.$refs.getOldImg.dialogGetOldImg(oldImg);
					},100)
				}
				if (flag=='添加资讯') {
                    this.datas.nname=''
                    this.datas.newsSort=''
                    this.$refs.getOldImg.dialogGetNews()
				}
                if (flag=='编辑资讯') {
                    this.datas.nname=row.title
                    this.datas.newsSort=row.sort
                }
            },
            saveTitle(){
            	const token=localStorage.getItem('token')
                let that=this;
                let homepages=[
                   {
                   	id:1,
                   	title:this.BigTitle,
                   	subTitle:this.NextTitle
                   },
                   {
                   	id:2,
                   	title:this.BigTitle2,
                   	subTitle:this.NextTitle2
                   },
                   {
                   	id:3,
                   	title:this.BigTitle3,
                   	subTitle:this.NextTitle3
                   },
                   {
                   	id:4,
                   	title:this.BigTitle4,
                   	subTitle:''
                   },
                ]
                that.$axios.post(this.$baseUrl+'/homepage/addTitles?token='+token,homepages)
                .then(function(res){
                	console.log(res)
                	that.$message({
                		type:'success',
                		message:'保存成功'
                	})
                	that.refresh();
                })
                .catch(function(err){
                	console.log(err)
                })
            },
            addNews(newsId){
                const token=localStorage.getItem('token')
                let that=this;
                this.$axios.post(this.$baseUrl+'/news/addNewsToHomepage?token='+token+'&id='+newsId+'&sort='+this.datas.newsSort,{})
                .then(function(res){
                    console.log(res)
                    that.$message({
                        type:'success',
                        message:'提交成功'
                    })
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
			   this.tableData3=[];
               this.tableData4=[];
			   this.getTitle();
               this.getImgList();
			   this.getCompany();
               this.getNews();
              //this.paginationShow = true;
            })
          },
        },
        created:function(){
            this.getImgList();
            this.getCompany();
            this.getNews();
            this.getTitle();
						this.getProject();
        }

    }
</script>

<style scoped>
    .title{
        padding-bottom: 30px;
    }
    .title .el-button{
        float: right;
    }
    .title .blue{
        font-size: 14px;
        display: inline-block;
        margin-left: 30px;
    }
    .el-table{
        margin-bottom: 30px;
    }
    .formBox span:nth-child(1){
        display: inline-block;
        width: 120px;
        padding-left: 50px;
    }
    .formBox span .el-input{
        width: 400px;
    }
    .formBox span .el-input.long{
        width: calc(100% - 250px);
    }
    .formBox>div{
        padding-bottom: 20px;
    }
    .formBox span.use{
        display: inline-block;
        color: #999;
        font-size: 12px;
        margin-left: 30px;
    }
</style>
