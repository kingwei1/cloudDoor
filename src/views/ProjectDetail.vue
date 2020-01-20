<template>
    <div class="ProjectDetail">
        <div class="layout">
			<breadcrumb :menu="menu"></breadcrumb>
            <div class="blur">
                <div class="blurImg"><div class="coverDiv"></div><img :src="projectData.coverImg"></div>
                <div class="titleImg">
                    <span>{{projectName}}</span>
                </div>
            </div>
        </div>
        <div class="ClassDetail content">
            <!--大tabs切换-->
            <bigNav>
                <!-- slot卡槽用法 -->
                <template slot-scope="bigNav">
                    <el-tab-pane  v-for="tab in Menutabs" :label="tab.tabsTitle" :name="tab.name" style="width: 1172px;margin: auto">
                        <div v-if="tab.name==1" class="tabContent">
                            <div class="classList">
                                <div class="item company">
									<div class="title">项目发起方</div><img :src="projectData.companyLogo" class="logo"/>
									<div class="companyIntro">
										<div class="bold">{{projectData.companyName}}</div>
									    <div>{{projectData.enterpriseIntroduction}}</div>
									</div>
								</div>
							</div>
                            <div class="classList">
                                <div class="item"><span class="title">项目技术类型</span><span class="blue">{{projectData.typeName}}</span></div>
                                <div class="item"><span class="title">项目状态</span><span class="orange">{{projectData.status}}</span></div>
                                <div class="item"><span class="title">项目介绍</span><span>{{projectData.introduction}}</span></div>
                            </div>
                        </div>
                        <div v-if="tab.name==2" class="tabContent">
                            <div class="classList essay">
								<div class="ql-container ql-snow">
									<div class="ql-editor">
										<div v-html="projectData.content"></div>
									</div>
								</div>	
                                <!-- <div class="item"><img src="../assets/timg.jpg"/></div>
                                <div class="item">运营的三个核心：视角、框架、方向下面进一步升华，就是我们的用户养成框架。我们重新看一下宏观用户视角简图，从下面到上面对于一个新用户从接触产品到习惯产品，它代表着时间。横向代表一个辐射的范围，影响的范围，从底端到顶端对于一批接触用户变成习惯用户，它的数量是慢慢变少的。
                                    以时间作为纵向坐标轴，以辐射的范围作为横向坐标轴，以数量作为水平坐标轴，套上一个框架。这个框架就是用户养成运营框架，由此可以推出运营工作的实质，也是做任何运营的一个策略动机和出发点。
                                    第一最大程度缩短用户养成时间，使我们的新产品接触用户变成习惯用户的时间尽量最短。第二培育健康的用户养成梯形。第三最大化每一环节的辐射分享。</div>
                                <div class="item"><img src="../assets/timg2.jpg"/></div> -->
                            </div>
                        </div>
                        <div v-if="tab.name==3" class="tabContent">
                            <div class="classList">
                                <el-table
                                        :data="tableData"
										:cell-style="cellStyle"
                                >
                                    <el-table-column
                                            v-for="title in titles"
                                            :prop="title.prop"
                                            :label="title.label"
                                            :class-name="title.prop"											
                                            align='center'
                                    >
                                    </el-table-column>
                                    <el-table-column label="申请岗位">
                                        <template slot-scope="scope">
                                            <div>
                                                <el-button size="mini" :disabled="projectData.status == '已完成'" v-if="tableData[scope.$index].status=='' && tableData[scope.$index].numberFull !='true'" type="primary" @click="applyJob(false,tableData[scope.$index].id)">立即申请</el-button>
                                                <el-button size="mini" v-if="tableData[scope.$index].status=='待审核' || tableData[scope.$index].status=='已通过' "  @click="applyJob(true,tableData[scope.$index].id)">查看申请信息</el-button>
                                                <el-button size="mini" v-if="tableData[scope.$index].status=='已通过'" @click="evalution(tableData[scope.$index].id)">查看企业评价</el-button>
												                        <el-button size="mini" v-if="tableData[scope.$index].status=='未通过'" @click="applyJob(false,tableData[scope.$index].id)">重新申请</el-button>
                                                <el-button size="mini" v-if="tableData[scope.$index].status !='' && tableData[scope.$index].numberFull=='true'" type="info">岗位已满</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div v-if="tab.name==4" class="tabContent">
                            <div class="classList">
                                <div class="item"><div class="title">热门评价</div></div>
                                <div class="talk">
                                    <el-input
                                            type="textarea"
                                            :rows="4"
                                            placeholder="我也来说点什么……"
                                            v-model="comment"
											maxlength='120'
											resize='none'
											>
                                    </el-input>
                                    <div class="more"><el-button type="primary" round  @click="myComment('发表评论')">发表评论</el-button></div>
                                </div>
                                <div class="userEva" v-for="(eva,index) in userEva">
                                    <div class="item"><img :src="eva.face" class="userface"/>
									  <div class="userDetail">
										  <span>{{eva.username}}</span>
										  <span>{{eva.date}}</span>
										  <div class="evaContent">{{eva.content}}</div>
									  </div>
									  <div class="box">
										 <div v-if="eva.btnHide==0" class="useReply" @click="reply(index)">回复</div>
										 <div v-if="eva.btnHide==1" class="useReply" @click="cancleReply(index)">取消回复</div>
										 <div class="reply" v-if="eva.postTotal > 0" @click="vieweply(eva.id)">查看回复</div>
										 <div :class="{good:eva.isGood,nogood:!eva.isGood}" @click="likeIt(eva.id,eva.isGood)">{{eva.good}}</div> 
									  </div>						  
									</div>
                                    
                                    <div class="hideInput" v-if="inputIndex==index">
										<el-input v-model="input" placeholder="请输入回复"></el-input>
										<el-button type="primary" @click="myComment('发布回复',eva.id)">发布</el-button>
									</div>
                                </div>
                                <pagination ref="page" :paginationShow="paginationShow" :listTotal="listTotal" @pageChangeSize="pageChangeSize" @page="page"></pagination>
								<!-- <div class="more"><el-button type="primary" round >查看全部回复</el-button></div> -->
                            </div>
                        </div>
                    </el-tab-pane>
                </template>
                <!-- slot卡槽用法-->
            </bigNav>
            <!--大tabs切换-->
        </div>
        <dialogBox :flag="flag" :dialogVisible="dialogVisible" @close="dialogVisible=false" :datas="datas" @submitChange='submit'></dialogBox>
        <dialogBox :flag="'企业评价'" :dialogVisible="dialogVisible2" @close="dialogVisible2=false" :datas="datas2"></dialogBox>
		<dialogBox :flag="'校企项目讨论区查看回复'" :dialogVisible="dialogVisible3" @close="dialogVisible3=false" :datas="datas3" @likeIt='likeIt'></dialogBox>
    </div>
</template>

<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
    import bigNav from '../views/components/bigNav.vue'
    import dialogBox from '../views/components/dialogBox.vue'
	import breadcrumb from './components/breadcrumb'
	import pagination from '../views/components/pagination'
    export default {
        name: "project-detail",
        components: {
            bigNav,
            dialogBox,
			breadcrumb,
			pagination
        },
        data(){
            return{
				menu:[{
					title:'首页',
					path:'/cloudHome'
				},{
					title:'校企项目',
					path:'/ProjectList'
				},{
					title:'校企项目明细',
					class:'blue'
				}],
				id:this.$route.query.id,
				paginationShow:true,
				listTotal:0,
				pageNum:1,
				pageSize:10,
				datas3Id:'',
				tableId:'',
				projectName:'',
				projectData:{
					companyName:'',
					enterpriseIntroduction:'',
					typeName:'',
					status:'',
					introduction:'',
					content:'',
					coverImg:''
				},
                inputIndex:undefined,
                comment:'',
                dialogVisible:false,
                dialogVisible2:false,
				dialogVisible3:false,
                input:'',
                flag:'',
                Menutabs:[{
                    name:'1',
                    tabsTitle:'项目资料',
                },{
                    name:'2',
                    tabsTitle:'项目详情',
                },{
                    name:'3',
                    tabsTitle:'团队招聘',
                },{
                    name:'4',
                    tabsTitle:'讨论区',
                }],
                datas:{},
                datas2:{},
				datas3:[],
                titles:[
                    {
                        prop:'projectName',
                        label:'岗位名称'
                    },{
                        prop:'projectRequire',
                        label:'岗位介绍'
                    },{
                        prop:'num',
                        label:'招聘人数'
                    },{
                        prop:'nowNum',
                        label:'现有人数'
                    },{
                        prop:'status',
                        label:'状态'
                    }
                ],
                tableData:[],
                userEva:[]
            }
        },
        methods:{
			page(val){				
				this.pageNum = val;
				this.getDiscuss();
			},
			pageChangeSize(val){
				this.paginationShow = false;
				this.$nextTick(function () {
				this.paginationShow = true;
				})
				this.$refs.page[0].setSize(val);
				this.pageSize = val; 
				this.getDiscuss();
			},
			vieweply(id){
				console.log(id);
				this.dialogVisible3 = true;
				this.datas3Id = id;
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$schoolCompanyUrl+'/student/posts/'+id+'?token='+token)
				.then(function(res){
						console.log(res);
						if(res.data.code == 0){
							let data = res.data.data;
							that.datas3 = [];
							data.forEach(function(value,index,array){
								that.datas3.push({
									id:value.id,
									avatarUrl:value.avatarUrl == '#'? require('../assets/userface.jpg'):value.avatarUrl,
									name:value.name,
									date:that.changeDate(new Date(value.created)),
									content:value.content,
									isGood:value.isLike,
									postTotal:value.likeTotal
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
			getDiscuss(){
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$schoolCompanyUrl+'/student/project/posts?token='+token+'&projectId='+this.id+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize)
				.then(function(res){
						console.log(res);
						if(res.data.code == 0){
							let data = res.data.data;
							if(res.data.count <= 10){
								that.paginationShow = false;
							}else{
								that.paginationShow = true;
								that.listTotal = res.data.count;
							}
							that.userEva = [];
							data.forEach(function(value,index,array){
								that.userEva.push({
									id:value.id,
									username:value.name,
									face:value.avatarUrl == '#'? require('../assets/userface.jpg'):value.avatarUrl,
									date:that.changeDate(new Date(value.created)),
									good:value.likeTotal,
									content:value.content,
									isGood:value.isLike,
									postTotal:value.postTotal,
									btnHide:0
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
			myComment(flag,id){
				console.log(this.comment);
				console.log(this.input);
				let that=this;
				const token=localStorage.getItem('token');
				let postId = '';
				let content = '';
				if(flag == '发表评论'){
					if(this.comment == ''){
						this.$message.error('请输入你的评论');
						return;
					}else{
						postId = 0;
						content = this.comment;
					}
				}else if(flag == '发布回复'){
					if(this.input == ''){
						this.$message.error('请输入你的评论');
						return;
					}else{
						postId = id;
						content = this.input;
					}
				}
					
				this.$axios.post(this.$schoolCompanyUrl+'/student/post?token='+token,{projectId:this.id,postId:postId,content:content})
				.then(function(res){
						console.log(res);
						if(res.data.code == 0){
							let data = res.data.data;
							that.comment = '';
							that.getDiscuss();
							that.inputIndex=undefined;
							that.btnHide=0;
							that.$message({
								  message: '评论成功',
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
			likeIt(id,flag){
				console.log(id,flag);
				let that=this;
				const token=localStorage.getItem('token');
				let like = flag == true? false:true;
				this.$axios.post(this.$schoolCompanyUrl+'/student/post/like?token='+token+'&postId='+id+'&flag='+like)
				.then(function(res){
						console.log(res);
						if(res.data.code == 0){
							if(that.dialogVisible3 == true){
								that.vieweply(that.datas3Id);	
							}else{
								that.getDiscuss();
							}							
															
						}else{
							that.$message.error(res.data.msg);	
						}
						
				})
				.catch(function(err){
					console.log(err)
				})
			},
			cellStyle(row, column, rowIndex, columnIndex){
							if (row.column.className == 'status' && row.row.status == '待审核') {
											return 'color:#ff9800'
							}
							else if (row.column.className == 'status' && row.row.status == '未通过') {
											return 'color:red'
							}
							else if (row.column.className == 'status' && row.row.status == '已通过') {
											return 'color:#3397fc'
							}
			},
            reply(index){
                this.inputIndex=index;
                for(var i= 0; i<this.userEva.length;i++){
									this.userEva[i].btnHide = 0;
								}
								this.userEva[index].btnHide = 1;
            },
            cancleReply(index){
                this.inputIndex=undefined;
								this.userEva[index].btnHide = 0;
            },
            applyJob(e,id){
                //申请岗位
                this.dialogVisible=true;
                this.datas.flag=e;
                if(e==true){
                    this.flag='查看申请信息';
					this.getStudentInformation(id);
                }else{
                    this.flag='项目岗位申请';
					this.tableId = id;
					this.getStudentInformation(id);
                }
            },
			submit(){
				let that=this;
				const token=localStorage.getItem('token');
				let data = {
					positionId:this.tableId, //申请对应职位的id
					introduction:this.datas.textarea //个人简介
				}
				this.$axios.post(this.$schoolCompanyUrl+'/student/apply/position?token='+token,data)
				.then(function(res){
						console.log(res);
						if(res.data.code == 0){
							that.dialogVisible=false;
							that.$message({
							  message: '提交成功',
							  type: 'success'
							});
							that.getRecruit();							
						}else{
							that.$message.error(res.data.msg);
						}
						
				})
				.catch(function(err){
					console.log(err)
				})
			},
			getStudentInformation(id){
				console.log(id)
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$schoolCompanyUrl+'/student/positionInfo/'+id+'?token='+token)
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
								textarea:data.introduction == null? '':data.introduction,
								name:data.name,
								phone:data.phone,
								graduation:data.school,
								class:data.grade,
								email:data.email,
								major:data.major,
								sex:sex,
								//是否申请过
								flag:that.datas.flag,
								face:data.avatarUrl == '#'? require('../assets/userface.jpg'):data.avatarUrl,								
								addTime:that.changeDate(new Date(data.created))
							}
						}
						
				})
				.catch(function(err){
					console.log(err)
				})
			},
            evalution(id){
                this.dialogVisible2=true;
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$schoolCompanyUrl+'/student/evaluation/'+id+'?token='+token)
				.then(function(res){
						console.log(res);
						if(res.data.code == 0){
							let data = res.data.data;
							that.datas2 = {
								company:data.enterpriseName,
								job:data.positionName,
								applyTime:that.changeDate(new Date(data.created)),
								startTime:that.changeDate(new Date(data.auditTime)),
								evaluateTime:data.evaluationTime == null? '':that.changeDate(new Date(data.evaluationTime)),
								evaluate:data.evaluation
							}
						}else{
							that.$message.error(res.data.msg);
						}
						
				})
				.catch(function(err){
					console.log(err)
				})
            },
			getInformation(){
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$schoolCompanyUrl+'/student/project/'+this.id+'?token='+token)
				.then(function(res){
						console.log(res);
						if(res.data.code == 0){
							let data = res.data.data;
							that.projectName = data.name;
							that.projectData = {
								companyName:data.enterpriseName,
								enterpriseIntroduction:data.enterpriseIntroduction,
								typeName:data.typeName,
								status:data.status == 2? '进行中':'已完成',
								introduction:data.introduction,
								content:data.content,
								coverImg:data.pictureUrl,
								companyLogo:data.logo == null? '#':that.$pictrueShowUrl+'/data/download/'+data.logo,								
							}
						}
						
				})
				.catch(function(err){
					console.log(err)
				})
			},
			getRecruit(){
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$schoolCompanyUrl+'/student/positions/'+this.id+'?token='+token)
				.then(function(res){
						console.log(res);
						if(res.data.code == 0){
							let data = res.data.data;
							that.tableData = [];
							data.forEach(function(value,index,array){
								let state = '';
								let number = '';							
								if(value.status == null){
									state = '';
									if(value.total == value.currentTotal){
										number = true;
									}
								}else if(value.status == 0){
									state = '待审核'
								}else if(value.status == 1){
									state = '未通过'
								}else if(value.status == 2 || value.status == 3){
									state = '已通过'
								}
								that.tableData.push({
									projectName:value.name,
									projectRequire:value.introduction,
									num:value.total,
									nowNum:value.currentTotal,
									status:state,
									numberFull:number,
									id:value.id
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
		   this.getInformation();
		   this.getRecruit();
		   this.getDiscuss();
		}
    }
</script>

<style scoped>
    .title{
        font-size: 20px;
        font-weight: bolder;
        margin-bottom: 14px;
    }
    span.title{
        width: 160px;
        vertical-align: top;
    }
    .titleImg{
        height: 280px;
        text-align: center;
        position: absolute;
        left: 0;top: 0;right: 0;
    }
    .blur{
        position: relative;
    }
    /* .blurImg{
        background: url('../assets/signup.png')  no-repeat;
        height: 280px;
        background-size: 100% 100%;
        text-align: center;
        -webkit-filter: blur(2px);
        -moz-filter: blur(2px);
        -ms-filter: blur(2px);
        -o-filter: blur(2px);
        filter: blur(2px);
    } */
		.blurImg{
				height: 280px;
				text-align: center;
				-webkit-filter: blur(2px);
				-moz-filter: blur(2px);
				-ms-filter: blur(2px);
				-o-filter: blur(2px);
				filter: blur(2px);
				position: relative;
		}
		.blurImg img{
				height: 280px;
				width: 100%;
				-webkit-filter: blur(7px);
				-moz-filter: blur(7px);
				-o-filter: blur(7px);
				-ms-filter: blur(7px);
				filter:blur(7px);
		}
		.blurImg .coverDiv{
				position: absolute;
				background: rgba(0,0,0,0.2);
				top: 0;
				height: 280px;
				width: 100%;
				z-index: 999
		}
    .titleImg>span{
        font-size: 35px;
        font-weight: bolder;
        color: #fff;
        display: block;
        padding: 110px 0 10px 0;
    }
    .content{
        padding: 38px 0;
        line-height: 30px;
    }
    .classList {
        margin: 20px 0;
        background: #fff;
        -webkit-box-shadow: 2px 2px 2px #ddd;
        box-shadow: 2px 2px 2px #ddd;
        padding: 20px;
    }
    .classList .item{
        padding-bottom: 10px;
    }
    .classList .item span{
        display: inline-block;
        max-width: 930px;
    }
    .company{
        overflow: auto;
    }
    .company>div{
        float: left;
    }
    .company .logo{
        width: 160px;
        height: 160px;
        border-radius: 160px;
        float: left;
    }
    .company .title{
        width: 160px;
    }
    .company .companyIntro{
        width: 690px;
        padding-left: 60px;
    }
    .company .bold{
        font-weight: bolder;
        font-size: 18px;
        padding-bottom: 10px;
    }
    .essay img{
        width: 100%;
    }
    .userEva{
        font-size: 16px;
        border-top: 4px solid #f6f9fd;
    }
    .userEva:nth-child(2){
        border-top: 0;
    }
    .userEva .evaContent{
        font-size: 16px;
        padding-bottom: 30px;
				word-wrap:break-word;
    }
	.evaContent{
		width: 950px;
	}
    .userEva:hover .useReply{
        display: inline;
    }
    .userEva .userface,.userEva .userDetail{
        float: left;
    }
    .userEva .userDetail>span{
        display: inline-block;
        font-size: 16px;
		margin-right:20px;
        padding-top: 8px;
    }
    .userEva .item{
        overflow: auto;
        border-bottom: 1px solid #ededef;
        padding: 10px 0 20px 0;
        position: relative;
    }
    .userEva .userface{
        width: 60px;
        height: 60px;
        border-radius: 80px;
        margin-right: 20px;
    }
	.box{
		position: absolute;
		bottom: 20px;
		right: 0px;
		display: inline;
	}
    .reply,.good,.useReply,.nogood{
		display: inline;
		padding: 0 35px;
        /* position: absolute;
        bottom: 20px;
        padding-left: 50px; */
    }
    .reply{
        background: url("../assets/mss.png") no-repeat;
        background-size: auto 90%;
        /* right: 100px; */
        cursor: pointer;
    }
    .good{
        background: url("../assets/good.png") no-repeat; 
        background-size: auto 90%;
        /* right: 0px; */
		cursor: pointer;
    }
	.nogood{
        background: url("../assets/nogood.png") no-repeat; 
        background-size: auto 90%;
       /* right: 0px; */
		cursor: pointer;
    }
    .useReply{
        background: url("../assets/usereply.png") no-repeat;
        /* right: 270px; */
        cursor: pointer;
        display: none;
    }
    .reply:hover{
        color: var(--blue);
    }
    .hideInput{
        padding-bottom: 20px;
    }
    .hideInput .el-input{
        width: 1000px;
        margin-right: 10px;
    }
    .tabContent{
        padding: 0 20px;
    }
    .classList .more{
        text-align: right;
        padding: 20px 0;
    }
		#bigNav .el-tabs__content {
       padding-top: 0 !important;
    }
		.layout{
			overflow: visible;
		}
</style>
<style>
    #main .ClassDetail #bigNav .el-tabs__content{
        padding-top: 0;
        background: #f6fafe;
        margin-top: 30px;
    }
    .el-table th>.cell,.el-table td div{
        text-align: center;
    }
    .classList .el-table th{
        background: #e0ffff;
        color: var(--blue);
    }
    .classList .el-table .el-button{
        display: block;
        margin: 0 auto 10px auto;
    }
</style>