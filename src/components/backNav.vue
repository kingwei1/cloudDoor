<template>
	<div id="main">
		<header>
      <div id="head">
         <div class="logo">实践能力管理后台 |</div>
               <ul>
               	<li @click="changeSideBar" :class="{headNav:flag[0]}"><router-link :to="{path:'/homeManage'}">前端门户</router-link></li>
               	<li @click="changeSideBar" :class="{headNav:flag[1]}"><router-link :to="{path:'/UserList'}">用户</router-link></li>
               	<li @click="changeSideBar"><a :href='url+"/train/#/"+train'>实训管理</a></li>
 	              <li @click="changeSideBar"><a :href='url+"/pan/html/admin/publicOpen.html"'>学习云</a></li>
               	<li @click="changeSideBar" :class="{headNav:flag[2]}"><router-link :to="{path:'/projectManage'}">校企合作项目</router-link></li>
               	<li @click="changeSideBar" :class="{headNav:flag[3]}"><router-link :to="{path:'/jobManage'}">职业生涯管理</router-link></li>
               	<li @click="changeSideBar" :class="{headNav:flag[4]}"><router-link :to="{path:'/bbs'}">论坛管理</router-link></li>
               	<li><a :href='url+"/archive-center/#/studentManagement"'>档案管理</a></li>
	              <li><a :href='url+"/evaluate/#/tutorManagement"'>测评管理</a></li>
               	<li @click="changeSideBar" :class="{headNav:flag[5]}"><router-link :to="{path:'/systemSetup'}">系统设置</router-link></li></ul>  
               <div class="userInfo">
                <span>{{userName}}</span>
								<a :href='url+"/train/#/backLogin"' style="margin-left:20px;cursor: pointer;">退出</a>
                <!-- <img src="../assets/notice.png"> -->						
               </div> 
      </div>                     
        </header>
         <SideBar :bars="bars" :inx='inx' @jumptwo="jumptwo" @jump="jump" ref="resetSideBar" :msg='msg'></SideBar>
        <div class="body">
        	<router-view></router-view>
        </div>
        <footer>copyright © 2019 benyuntech.com By云计算服务平台</footer>
	</div>
</template>
<script>
	import SideBar from '../components/SideBar'
	export default{
		name:'backNav',
		components:{
			SideBar,
		},
		data(){
			return{
				url:this.$pictrueShowUrl,
				train:'trainingWorkBench',
				activeName:'first',
				account:'',
				passward:'',
				radio:'',
        userName:'',
				 bars:[],
				 status:0,
				 msg:false,
				 inx:0,
				 flag:[false,false,false,false,false,false]	 
			}
		},
		methods:{
			getInformation(){	
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$baseUrl+'/portal/role/currentRole?token='+token)
				.then(function(res){
					console.log(res)
				if(res.data.code == 0){
				let data = res.data.data;
				that.role = data;
				console.log(data)						 	
				for(var i =0;i<data.length;i++){					
						if(data[i] == '学校' || data[i] == '老师'){
								that.train = 'trainingWorkBench';
								break;
						}else if(data[i] == '企业' || data[i] == '企业老师'){
							console.log(data[i])
							that.train = 'WorkBench';
							break;
						}
				   }					
				 }
				})
				.catch(function(err){
				console.log(err)
				})			 			 
			},
			changFlag(flagIndex){
				console.log(flagIndex)
				let that = this;
				this.flag.forEach(function(value,index,array){
					 if(flagIndex == index){
						 that.flag[index] = true;
					 }else{
						 that.flag[index] = false;
					 }
				})
			},
			cancel(){
			      const token=localStorage.getItem('token')
			      let that=this
			      this.$axios.post(this.$baseUrl+'/auth/logout?token='+token,{})
			      .then(function(res){
			        console.log(res)
			        if (res.data.code==0) {
			          localStorage.removeItem('token')
			        }
			        /* that.$router.push({path:'/backLogin',query:{}}); */
			      })
			      .catch(function(err){
			        console.log(err)
			      })
			
			    },
					
			//左侧导航跳转
			jump(title,index){
				if (title=='权限列表') {
						this.$router.push({path:'/systemSetup'})
					}
				else if (title=='用户列表') {
					this.$router.push({path:'/UserList'})
				}
				else if (title=='企业审核') {
					this.$router.push({path:'/companyAccountList'})
				}	
				else if (title=='企业认证') {
					this.$router.push({path:'/Authentication'})
				}
				else if (title=='项目经理审核') {
					this.$router.push({path:'/projectManageAudit'})
				}
				else if (title=='项目经理申请审核') {
					this.$router.push({path:'/projectManageAudit1'})
				}
				else if (title=='个人信息') {
					this.$router.push({path:'/personalInformation'})
				}
				else if (title=='企业信息') {
					this.$router.push({path:'companyInformation'})
				}
			    else if (title=='学校信息') {
			    	this.$router.push({path:'schoolInformation'})
			    }
				else if (title=='修改密码') {
					this.$router.push({path:'/changePassword'})
				}	
				else if (title=='项目管理') {
					this.$router.push({path:'/projectManage'})
				}
				else if (title=='项目审核') {
					this.$router.push({path:'/reviewProjectList'})
				}
				else if (title=='项目分类管理') {
					this.$router.push({path:'/projectSortManage'})
				}
                else if (title=='帖子列表') {
                    this.$router.push({path:'/bbs'})
                }
                else if (title=='版块分类管理') {
                    this.$router.push({path:'/bbsManage'})
                }
                else if (title=='门户首页排版') {
                    this.$router.push({path:'/homeManage'})
                }
                 else if (title=='APP首页排版') {
                    this.$router.push({path:'/APPRotation'})
                }
                else if (title=='资讯管理') {
                    this.$router.push({path:'/informationManage'})
                }
                else if (title=='资讯分类') {
                    this.$router.push({path:'/informationList2'})
                }
                else if (title=='企业合作管理') {
                    this.$router.push({path:'/enterpriseCooperation'})
                }
                else if (title=='帮助中心管理') {
                	console.log(index);
                	console.log(this.inx);
                	if (this.bars[index].status==false) {
                		this.bars[index].subBar=[
                		{
                			title:'问题列表'
                		},
                		{
                			title:'问题分类'
                		},
                		];
                		this.bars[index].status=true;
                		this.bars[4].status=false;
                		this.inx=0;
                		console.log(this.inx)
                	}
                	else if(this.bars[index].status==true){
                		this.bars[index].subBar=[];
                		this.bars[index].status=false;
                	}
                }
                else if (title=='意见管理') {
//                  this.$router.push({path:'/feedback'})
                    if (this.bars[index].status==false) {
                		this.bars[index].subBar=[
                		{
                			title:'意见列表'
                		},
                		{
                			title:'意见分类'
                		},
                		];
                		this.bars[3].status=false;
                		this.bars[index].status=true;
                		this.inx=0;
                		console.log(this.inx);
                	}
                	else if(this.bars[index].status==true){
                		this.bars[index].subBar=[];
                		this.bars[index].status=false;
                	}
                }
                else if (title=='联系我们管理') {
                    this.$router.push({path:'/contactManagement'})
                }
                else if (title=='友情链接') {
                    this.$router.push({path:'/friendshipLink'})
                }
                else if (title=='期望职业列表') {
                    this.$router.push({path:'/jobManage'})
                }
			},
			jumptwo(title,index){
				this.inx=index+1;
			 if (title=='问题列表') {
                    this.$router.push({path:'/questionsList'})
                }
			 else if(title=='问题分类'){
			 	this.$router.push({path:'/questionsClassification'})
			 }
			 else if(title=='意见列表'){
			 	this.$router.push({path:'/opinionList'})
			 }
			 else if(title=='意见分类'){
			 	this.$router.push({path:'/opinionClassification'})
			 }
			},
			changeSideBar(){
				this.$refs.resetSideBar.resetSideBar()
				//点击顶部导航，改变左侧导航
				if (this.$route.name=='UserList') {
					    this.changFlag(1);
							this.bars=[
										{
											title:'用户列表',	
										},{
											title:'企业审核',	
										},{
											title:'企业认证',	
										},{
											title:'项目经理审核',	
										},{
											title:'企业信息',	
										},{
											title:'学校信息',	
										},{
											title:'个人信息',	
										},{
											title:'修改密码',	
										},
							]		
			}
			if (this.$route.name=='systemSetup') {
				this.changFlag(5);
				this.bars=[
                    {
                      title:'系统管理',	
                    }
				]
			}
			if (this.$route.name=='projectManage') {
				this.changFlag(2);
				this.bars=[
                    {
                      title:'项目管理',	
                    },{
                      title:'项目审核',	
                    },{
                      title:'项目经理申请审核',	
                    },{
                      title:'项目分类管理',	
                    }
				]
			}
			if (this.$route.name=='bbs') {
				this.changFlag(4);
				this.bars=[
					{
						title:'帖子列表',
					},{
						title:'版块分类管理',
					}
				]
			}
                if (this.$route.name=='homeManage') {
                    this.changFlag(0);
										this.bars=[
                            {
		                      title:'门户首页排版',	
		                    },
		                     {
		                      title:'APP首页排版',	
		                    },
		                    {
		                      title:'企业合作管理',	
		                    },
		                     {
		                        title:'帮助中心管理',	
	                          subBar:[],
		              		      status:false
		                    },
		                    {
		                      title:'意见管理',	
		                      subBar:[],
		              		    status:false
		                    },
		                     {
		                      title:'联系我们管理',	
		                    },
		                    {
		                      title:'友情链接',	
		                    },
		                    {
		                      title:'资讯管理',	
		                    },
		                    {
		                      title:'资讯分类',	
		                    }
                    ]
                    console.log(this.bars)
                }
                if (this.$route.name=='jobManage') {
                    this.changFlag(3);
										this.bars=[
                        {
                            title:'期望职业列表',
                        }
                    ]
                }
			}
		},
		created:function(){
			this.getInformation();
			//防止刷新左侧菜单消失
			if (this.$route.name=='UserList'||this.$route.name=='viewAccount'||this.$route.name=='addAccount'||this.$route.name=='Authentication'||this.$route.name=='signAuthentication'||this.$route.name=='viewAuthenticationDetail'||this.$route.name=='companyAccountList'||this.$route.name=='reviewCompanyAccount' ||this.$route.name=='projectManageAudit' ||this.$route.name=='personalInformation' ||this.$route.name=='companyInformation' ||this.$route.name=='schoolInformation' ||this.$route.name=='changePassword'
			||this.$route.name=='manageInformation') {
				this.changFlag(1);
				this.bars=[
                     {
                     	title:'用户列表',	
                     },{
                     	title:'企业审核',	
                     },{
                     	title:'企业认证',	
                     },{
                     	title:'项目经理审核',	
                     },{
                     	title:'企业信息',	
                     },{
                     	title:'学校信息',	
                     },{
                     	title:'个人信息',	
                     },{
                     	title:'修改密码',	
                     },
				]
			}
			if (this.$route.name=='systemSetup'||this.$route.name=='editAuthority') {
				this.changFlag(5);
				this.bars=[
                   {
                      title:'权限管理',	
                    }
                    
				]
			}	
			if (this.$route.name=='projectManage'||this.$route.name=='projectDetail'||this.$route.name=='reviewProject'||this.$route.name=='projectSortManage'||this.$route.name=='addProject'||this.$route.name=='applyRecruits'||this.$route.name=='reviewProjectList' || this.$route.name=='projectManageAudit1') {
				this.changFlag(2)
				this.bars=[
                    {
                      title:'项目管理',	
                    },{
                      title:'项目审核',	
                    },{
                      title:'项目经理申请审核',	
                    },{
                      title:'项目分类管理',	
                    }
				]
			}
            if (this.$route.name=='bbs'||this.$route.name=='bbsDetail'||this.$route.name=='bbsManage') {
                this.changFlag(4)
								this.bars=[
                    {
                        title:'帖子列表',
                    },{
                        title:'版块分类管理',
                    }
                ]
            }
            if (this.$route.name=='homeManage'||this.$route.name=='informationList2'||this.$route.name=='informationManage'||this.$route.name=='addInformation'||this.$route.name=='enterpriseCooperation'
            ||this.$route.name=='questionsList'||this.$route.name=='opinionList'||this.$route.name=='contactManagement'||this.$route.name=='friendshipLink'||this.$route.name=='opinionClassification'||this.$route.name=='questionsClassification'||this.$route.name=='APPRotation') {
								this.changFlag(0);
								console.log(this.$route.name)
								this.bars=[
                     {
                      title:'门户首页排版',	
                    },
                    {
		                title:'APP首页排版',	
		                },
                    {
                      title:'企业合作管理',	
                    },
                     {
                     title:'帮助中心管理',
                     subBar:[],
                		 status:false
                    },
                    {
                      title:'意见管理',	
                      subBar:[],
                	    status:false
                    },
                     {
                      title:'联系我们管理',	
                    },
                    {
                      title:'友情链接',	
                    },
		            {
		            	title:'资讯管理',	
		            },
		            {
		                 title:'资讯分类',	
		            }
                ]
            }
            if (this.$route.name=='jobManage') {
							  this.changFlag(3);
                this.bars=[
                    {
                        title:'期望职业列表',
                    }
                ]
            }
            const token=localStorage.getItem('token');
            console.log(token)
            let token1=token.split('.')[1]
            let userInfo=window.atob(token1)
            let that=this;
            let id =userInfo.split(':"')[1].split('",')[0]
            this.$axios.get(this.$baseUrl+'/user/info?aids='+id,{})
            .then(function(res){
							console.log(res)
              that.userName=res.data.data[0].nickname
            })
            .catch(function(err){
              console.log(err)
            })
		}
	}
</script>
<style scoped>
header{
    background: #2b303b;
    position: fixed;
    top:0;
    right: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    overflow: auto;
}
#head{
  max-width: 1920px;
  min-width: 500px;
  overflow: hidden;
  height: 60px
}
.logo{
width: 170px;
float: left;
font-size: 14px;
color: #fff;
text-align: right;
line-height: 60px;
background: url("../assets/logo.png") no-repeat 0 5px;
background-size: 30% 85%;
}

ul {
  float: left;  
}
ul li{
float: left;
}
ul li a{
color: rgba(255,255,255,0.7);
display: inline-block;
padding: 0 10px;
height: 60px;
line-height: 60px;
box-sizing: border-box;
font-size: 14px
}
ul li:nth-child(1){
  padding: 0 0px
}
ul li a:hover{
color: #fff;
}
.userInfo{
			float: right;
			color: #fff;
			margin-right: 80px;
			line-height: 60px;
			font-size: 14px;
	}
	.userInfo a{
	    margin-left: 20px;
    color:rgba(255,255,255,0.7);
	}
	.userInfo a:hover{
	    margin-left: 20px;
	    color:#fff;
	}
.userInfo img{
	width: 30px;
	height: 30px;
	margin-left: 70px;
	position: relative;
	top: 8px;
	cursor: pointer;
}
.body{
  padding-bottom: 60px;
}

footer{
  text-align: center;
  position: fixed;
  left: 200px;
  right: 0;
  bottom: 0;
  height: 44px;
  line-height: 44px;
  padding: 0 15px;
  background-color: #eee;
  z-index: 999;
  font-size: 12px
}
.headNav a{
	color: #fff;
	border-bottom: 5px solid #5FB878;
}
</style>
<style>

</style>