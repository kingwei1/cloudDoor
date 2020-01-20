<template>
    <div id="home">
        <el-carousel :interval="5000" arrow="always" :height="imgHeight" indicator-position="none">
            <el-carousel-item v-for="banner in banners">
                <img  ref="imgHeight" :src="banner.src"  @load="imgload"/>
            </el-carousel-item>
        </el-carousel>
        <div class="box gray">
            <div class="layout">
                <div class="title">{{title1}}<span class="border"></span></div>
                <div class="blueTitle">{{subTitle1}}</div>
                <div class="practice">
                    <div>
                        <div class="imgBox"><img src="../assets/practice-1.png"/></div>
                        <span>专业讲座</span>
                        <i></i>
                    </div>
                    <div>
                        <div class="imgBox"><img src="../assets/practice-2.png"/></div>
                        <span>实训一</span>
                        <i></i>
                    </div>
                    <div>
                        <div class="imgBox"><img src="../assets/practice-2.png"/></div>
                        <span>实训二</span>
                        <i></i>
                    </div>
                    <div>
                        <div class="imgBox"><img src="../assets/practice-3.png"/></div>
                        <span>创新创业</span>
                        <i></i>
                    </div>
                    <div>
                        <div class="imgBox"><img src="../assets/practice-4.png"/></div>
                        <span>实训三</span>
                        <i></i>
                    </div>
                </div>
                <div class="btnCenter"><el-button type="primary" round @click="link">查看明细</el-button></div>
            </div>
        </div>
        <div class="box">
            <div class="layout">
                <div class="title">{{title2}}<span class="border"></span></div>
                <div class="blueTitle">{{subTitle2}}</div>
                <threeLayout>
                    <!--卡槽用法-->
                    <template slot-scope="slotThree">
                        <div v-for="box in boxs3Project" class="consult">
                            <router-link :to="{path:'/ProjectDetail1',query:{id:box.id}}">
                                <img :src="box.src"/>
                                <div class="projectIntro">
                                    <div class="proTitle">{{box.proTitle}}</div>
                                    <div class="proCompany">{{box.proCompany}}</div>
                                    <div class="proTime">{{box.proTime}}</div>
                                </div>
                            </router-link>
                        </div>
                    </template>
                    <!--卡槽用法-->
                </threeLayout>
                <div class="btnCenter"><router-link to="/ProjectList"><el-button type="primary" round>查看全部</el-button></router-link></div>
            </div>
        </div>
        <div class="box gray">
            <div class="layout">
                <div class="title">{{title3}}<span class="border"></span></div>
                <div class="blueTitle">{{subTitle3}}</div>
            </div>
            <div class="introduceBox">
                <div class="introduce">
                    <div style="width: 100%">
                        <div class="imgbox"><img :src="introContent.logo" /></div>
                        <span class="border1"></span>
                        <div class="introduceTitle">{{introContent.name}}介绍</div>
                        <div class="introduceContent">{{introContent.content}}</div>
                    </div>
                </div>
                <div class="navBox">
                    <div class="nav">
                        <el-row >
                            <el-col :span="12">
                                <el-menu
                                        @select="handleOpen"
                                        :default-active="navselected"
                                        class="el-menu-vertical-demo"
                                        active-text-color="#337ce7"
                                        background-color="var(--blue)"
                                        text-color="#fff"
                                >
                                    <el-menu-item v-for="(com,index) in company" :index="com.id">
                                        <span slot="title">{{com.name}}</span>
                                    </el-menu-item>
                                </el-menu>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>

        </div>
        <!-- <div class="box">
            <div class="layout">
                <div class="title">动态论坛<span class="border"></span></div>
                <threeLayout>
                    
                    <template slot-scope="slotThree">
                        <div v-for="box in boxs3Company" class="company" @click="downloadApp()">
                            <img :src="box.src"/>
                            <div class="companyIntro">
                                <div class="comTitle">{{box.comTitle}}</div>
                                <div class="comIntro">{{box.comIntro}}</div>
                                <div><span class="see">{{box.see}}</span><span class="read">{{box.read}}</span><button class="btn">阅读全文</button></div>
                            </div>
                        </div>
                    </template>
                    
                </threeLayout>
            </div>
        </div> -->
        <div class="box ">
            <div class="layout">
                <div class="title">{{title4}}<span class="border"></span></div>
                <threeLayout>
                    <!--卡槽用法-->
                    <template slot-scope="slotThree">
                        <div v-for="box in boxs2Consult" class="consult">
                            <router-link :to="{path:'/informationDetail',query:{id:box.id}}"> 
                            <img :src="box.src"/>
                                <div class="consultIntro">
                                    <div class="consultTitle">{{box.consultTitle}}</div>
                                    <div class="consultCompany">{{box.consultCompany}}</div>
                                    <div class="consultTime">{{box.consultTime}}</div>
                                </div>
                            </router-link>
                        </div>
                    </template>
                    <!--卡槽用法-->
                </threeLayout>
                <div class="btnCenter"><router-link to="/informationList"><el-button type="primary" round>查看全部</el-button></router-link></div>
            </div>
        </div>
        <dialogBox :flag="'访问论坛明细'" :dialogVisible="dialogVisible" @close="dialogVisible=false"></dialogBox>
				<dialogBox :flag="'登录提示'" :dialogVisible="dialogVisible2" @close="dialogVisible2=false" :datas='datas' @login="login"></dialogBox>
    </div>
</template>

<script>
    import threeLayout from '../components/threeLayout.vue'
    import twoLayout from '../components/twoLayout.vue'
    import dialogBox from '../views/components/dialogBox'
    import MyHeader from '../components/MyHeader.vue'
    import MyFooter from '../components/MyFooter.vue'
    export default {
        name: "home",
        components: {
            threeLayout,
            twoLayout,
            dialogBox,
            MyHeader,
            MyFooter
        },
        data () {
            return {
				        url:this.$pictrueShowUrl,
                dialogVisible:false,
								dialogVisible2:false,
								isLogin:'',
								isAllow:false,
                navselected:'1',
                banners: [],
                title1:'',
                subTitle1:'',
                title2:'',
                subTitle2:'',
                title3:'',
                subTitle3:'',
                title4:'',
                imgHeight:'',
								datas:{
									Url:'/backLogin',
									title:'登录提示',
									msg:"请重新登录"
								},
                boxs3Project:[{
                    src:require('../assets/project-1.png'),
                    proTitle:'基于大数据的汽车后市场服务平台',
                    proCompany:'广西犇云科技有限公司',
                    proTime:'2018-12-04 15:22'
                },{
                    src:require('../assets/project-1.png'),
                    proTitle:'基于大数据的汽车后市场服务平台',
                    proCompany:'广西犇云科技有限公司',
                    proTime:'2018-12-04 15:22'
                },{
                    src:require('../assets/project-1.png'),
                    proTitle:'基于大数据的汽车后市场服务平台',
                    proCompany:'广西犇云科技有限公司',
                    proTime:'2018-12-04 15:22'
                }],
                boxs3Company:[{
                    src:require('../assets/company-1.png'),
                    comTitle:'基于大数据的汽车后市场服务平台',
                    comIntro:'首先感谢React、Vue、Angular、Cycle、JQuery 等这些第三方js为开发带来的便利。 以下将Vue、React这类常用的框架...',
                    see:1524,
                    read:126
                },{
                    src:require('../assets/company-1.png'),
                    comTitle:'基于大数据的汽车后市场服务平台',
                    comIntro:'首先感谢React、Vue、Angular、Cycle、JQuery 等这些第三方js为开发带来的便利。 以下将Vue、React这类常用的框架...',
                    see:1524,
                    read:126
                },{
                    src:require('../assets/company-1.png'),
                    comTitle:'基于大数据的汽车后市场服务平台',
                    comIntro:'首先感谢React、Vue、Angular、Cycle、JQuery 等这些第三方js为开发带来的便利。 以下将Vue、React这类常用的框架...',
                    see:1524,
                    read:126
                }],
                boxs2Consult:[],
                company:[],
                introduceContent:[/*
                    {content:'千锋教育隶属于北京千锋互联科技有限公司，一直秉承“做真实的自己，用良心做教育”的理念，致力于打造IT教育全产业链人才服务平台，公司总部位于北京，目前已在深圳、上海、郑州、广州、大连、武汉、成都、西安、杭州、青岛、重庆、长沙、哈尔滨、南京、太原、沈阳成立了分公司，年培养优质人才20000余人，同期在校学员5000余人，合作院校超500所，合作企业超10000家，每年有数百万名学员受益于千锋教育组织的技术研讨会、技术培训课、网络公开课及免费教学视频。',
                     logo:require("../assets/qianfeng.png"),
                     name:'千峰教育'},
                    {content:'东软睿道教育服务有限公司（简称东软睿道）由东软创办，基于东软的产业发展与人才培养实践，提供更加符合IT行业发展需求的人才培养体系和方法学，精准提升大学生和大学后的就业、创业技能，为新经济时代的转型发展提供高质量规模化的人才供给。',
                        logo:require("../assets/dongruan.png"),
                        name:'东软睿道教育'},
                    {content:'深圳市尚观众创科技有限公司，全国拥有9个全资子公司，在北京、上海、深圳、沈阳、广州、成都、武汉、大连、西安设立校区，先后建立各方向技术研究室，是中国业界高端IT技术培训课程提供商。\n' +
                        '尚观提供云计算、Oracle、嵌入式、Java、互联网大数据、人工智能+Python六大职业培训课程，组建近百人自主研发团队引进企业一线实操技术。\n',
                        logo:require("../assets/shangguan.png"),
                        name:'尚观众创'},
                    {content:'广西犇云科技有限公司于2015 年成立，公司坐落在柳州市国家高新开发区，是在柳州市行政区域内依法设立、具有独立法人资格的民营有限责任公司。\n' +
                        '提供自主研发的大数据存储、分析引擎、数据可视化等产品，为行业企业搭建自主、安全、可控的云计算+大数据应用平台。\n',
                        logo:require("../assets/logo.png"),
                        name:'犇云科技'},
                    {content:'杰普软件成立于2006年，是一家软件外包、研发咨询、教育培训多元化发展的集团公司。\n' +
                        '公司专注于云计算、大数据、人工智能、物联网、移动互联、工业机器人、区块链、电子商务等领域的产品研发及中国高等院校产学研合作对接。杰普以上海为总部，在全国设立了研发中心、软件开发中心、实训中心，并携手高校推动新兴技术领域的教学、科研、设备技术、新工科建设的产学研一体化合作。杰普是中国知名教育服务提供商。\n',
                        logo:require("../assets/jiepu.jpg"),
                        name:'杰普软件'},
                    {content:'柳州市润澄科技有限公司成立于2014年3月，是在柳州市行政区域内依法设立、具有独立法人资格的民营有限责任公司，经营范围包括：软件、网络化信息系统产品、电子产品的技术开发与销售，企业信息化管理咨询、企业数据托管服务。',
                        logo:require("../assets/runcheng.jpg"),
                        name:'润橙科技'}
                */],
                introContent:''
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                let key1=parseInt(key)
                this.introContent=this.introduceContent[key1-1];
            },
            downloadApp(){
                this.dialogVisible=true;
            },
            getlist(){
            const token = localStorage.getItem('token');
            let that=this;
            this.$axios.get(this.$baseUrl+'/news/publishNews?token='+token,{})
            .then(function(res){
							  console.log(res)
                let data=res.data.data;
                data.forEach(function(value,index,array){
                    let date=new Date(value.created)
                    let createDate=that.changeDate(date,'yyyy-MM-dd')
                    that.boxs2Consult.push({
                        id:value.id,
                        src:that.$pictrueShowUrl+'/data/access/'+value.coverImg,
                        consultTitle:value.title,
                        consultCompany:value.publisher,
                        consultTime:createDate
                    })
                })
            })
            .catch(function(err){
                console.log(err)
            })
            },
            getBanner(){
               let that=this;
               this.$axios.get(this.$baseUrl+'//focuspic/get',{})
              .then(function(res){
                let data=res.data.data;
                data.forEach(function(value,index,array){
                    that.banners.push({
                        src:that.$pictrueShowUrl+'/data/access/'+value.filePath,
                    })
                })
              })
            .catch(function(err){
                console.log(err)
            })
            },
						getProject(){
							let that=this;
							this.$axios.get(this.$baseUrl+'/homepage/user/projects')
							.then(function(res){
								console.log(res)
								if(res.data.code == 0){
									let data=res.data.data;
									that.boxs3Project = [];
									data.forEach(function(value,index,array){
											that.boxs3Project.push({
												  id:value.id,
													src:value.pictureUrl,
													proTitle:value.name,
													proCompany:value.enterpriseName,
													proTime:value.auditTime == null? '':that.changeDate(new Date(value.auditTime))
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
            getCompanyWall(){
                let that = this;
                this.$axios.get(this.$baseUrl+'/enterwall/get',{})
                .then(function(res){
									  console.log(res)
                    let data = res.data.data;
                    data.forEach(function(value,index,array){
                        let index1=index+1
                        that.company.push({
                            name:value.enterpriseName,
                            id:String(index1) 
                        })
                        that.introduceContent.push({
                            content:value.enterpriseIntroduce,
                            logo:that.$pictrueShowUrl+'/data/access/'+value.filePath,
                            name:value.enterpriseName
                        })
                        that.introContent={
                            content:array[0].enterpriseIntroduce,
                            logo:that.$pictrueShowUrl+'/data/access/'+array[0].filePath,
                            name:array[0].enterpriseName
                        }
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
            },
            getTitle(){
                let that = this;
                this.$axios.get(this.$baseUrl+'/homepage/getTitles',{})
                .then(function(res){
                    let data=res.data.data;
                        that.title1=data[0].title
                        that.subTitle1=data[0].subTitle
                        that.title2=data[1].title
                        that.subTitle2=data[1].subTitle
                        that.title3=data[2].title
                        that.subTitle3=data[2].subTitle
                        that.title4=data[3].title
                })
                .catch(function(err){
                    console.log(err)
                })
            },
             imgload(){
                 this.imgHeight=`${this.$refs.imgHeight['0'].height}px`         
            },
						getRole(){
							let that=this;
							const token=localStorage.getItem('token')
							if (token == null) {
								this.isLogin=false
							}else{
								this.isLogin=true						
								this.$axios.get(this.$baseUrl+'/portal/role/currentRole?token='+token)
												.then(function(res){   
												console.log(res)  
													if(res.data.code == 0){
														for (var i = 0; i < res.data.data.length; i++) {
															if (res.data.data[i]=='学生') {
																that.isAllow=true
																break;
															}
															else{
																that.isAllow=false
															}                         
														}
													}
												})
												.catch(function(err){
													console.log(err)
												})
							}
						},
						link(){
							if (this.isAllow==true) {
							window.location.assign(this.$pictrueShowUrl+'/train/')
							}
							if(this.isAllow==false){
								this.dialogVisible2=true
								if (this.isLogin==true) {
									this.datas.msg='您不是学生，无权访问'
								}   
								else{
									this.datas.msg='你无权访问，请重新登录'
								}     
								
							}
						},
						login(type){
							this.dialogVisible2=false
							if (type!='close') {
								this.$router.push({path:'login'})  
							}
								
						},
        },
        updated(){
        let that=this;             
        window.onresize =function temp(){
					if(that.$refs.imgHeight['0'].height!=undefined){
						that.imgHeight = `${that.$refs.imgHeight['0'].height}px`
					 }           
          }
       },     
        created:function(){
            this.getlist();
            this.getBanner();
            this.getCompanyWall();
            this.getTitle();
						this.getProject();
						this.getRole();

        }
    }
</script>

<style scoped>
    .el-carousel__item img{
        width: 100%;
    }
    .el-carousel__item.is-active.is-animating{
        text-align: center;
    }
    .box{
       padding-top: 26px;
    }
    .box.gray{
        background:#f6fafe;
    }
    .title{
        font-size: 40px;
        font-weight: bolder;
        text-align: center;
        color: #222;
    }
    .title span{
        display: block;
        width: 62px;
        border: 1px solid #00aaf9;
        background: #00aaf9;
        margin: 20px auto;
        box-shadow: 1px 1px 1px 2px #e7e7fb;
    }
    .blueTitle{
        font-size: 20px;
        color: var(--blue);
        text-align: center;
    }
    .practice{
        overflow: auto;
        padding: 26px 0;
				margin-bottom: 24px;
    }
    .practice>div{
        float: left;
        width: 222px;
        text-align: center;
        background: #fff;
        padding: 30px 0;
        border-radius: 20px 0 20px 0;
        cursor: pointer;
        box-shadow: 0px 0px 50px #dcdcdc;		
				margin: 6.2px;
    }
    .practice>div span{
        color: var(--blue);
        font-weight: bolder;
        margin-top: 26px;
    }
    .practice>div span,.practice>div i{
        display: block;
    }
    .practice>div i{
        width: 46px;
        height: 2px;
        background: #efefef;
        margin: 15px auto 8px auto;
    }
    .practice>div:hover .imgBox{
        background: #83d3f8;
    }
    .practice>div:hover i{
        background: #83d3f8;
    }
    /* .practice>div+div{
        margin-left: 15px;
    } */
    .imgBox{
        width: 95px;
        height: 95px;
        background: var(--blue);
        border-radius: 95px;
        text-align: center;
        margin: auto;
        box-shadow: 5px 10px 20px #dcdcdc
    }
    .practice .imgBox img{
        margin-top: 22px;
    }
    .btnCenter{
        text-align: center;
    }
    .threeLayout{
        padding: 26px 0 26px 0px;
    }
    .twoLayout{
        padding: 20px 0;
    }
    .projectIntro{
        background: var(--blue);
        color: #fff;
        padding: 20px;
        box-sizing: border-box;
    }
    .project:hover{
        animation:mymove 1s;
        -webkit-animation:mymove 1s; /* Safari 和 Chrome */
        cursor: pointer;
        animation-fill-mode: forwards;
    }
    .consult:hover{
        animation:mymove 1s;
        -webkit-animation:mymove 1s; /* Safari 和 Chrome */
        cursor: pointer;
        animation-fill-mode: forwards;
    }
    .project img{
        width: 100%;
        height: 244px;
    }
    .company img{
        width: 100%;
        height: 283px;
    }
    .see,.read{
        display: inline-block;
        padding-left: 30px;
        color: #c3c8cf;
    }
    .see{
        background: url("../assets/see.png") no-repeat 0 4px;
        margin-right: 20px;
    }
    .read{
        background: url("../assets/read.png") no-repeat 0 4px;
    }
    @keyframes mymove
    {
        from {transform: scale(1)
        }
        to {transform: scale(0.9)
        }
    }
    @-webkit-keyframes mymove /*Safari and Chrome*/
    {
        from {transform: scale(1)
        }
        to {transform: scale(0.9)
        }
    }
    .proTitle{
        font-size: 20px;
        font-weight: bolder;
        padding-bottom: 10px;
				height: 45px;
    }
    .consultTitle{
        font-size: 20px;
        font-weight: bolder;
        padding-bottom: 20px;
        color: var(--blue);
        height: 45px
    }
    .comTitle{
        font-size: 20px;
        font-weight: bolder;
        padding:20px 0 10px 0;
        color: var(--blue);
    }
    .comIntro{
        font-size: 14px;
        padding-bottom: 10px;
    }
    .companyIntro{
        padding: 20px;
        box-sizing: border-box;
    }
    .proCompany,.proTime{
        color: #bcd0f0;
        padding-left: 30px;
        padding-bottom: 5px;
    }
    .proCompany{
        background: url("../assets/book.png") 0 4px no-repeat;
    }
    .proTime{
        background: url("../assets/time.png") 0 4px no-repeat;
    }
    .company{
        border-radius: 20px;
        box-shadow:1px 1px 1px 1px #eee;
    }
    .company:hover{
        opacity: 0.7;
        cursor: pointer;
    }
    .consult{
        margin-bottom: 24px;
        cursor: pointer;
        position: relative;
    }
		.consult > a{
				font-size: 0;
		}
    .projectIntro ,.consultIntro{
			font-size: 14px;
		}
    @keyframes mymoveL
    {
        from {transform:translateX(0)
        }
        to {transform:translateX(30px)
        }
    }
    @-webkit-keyframes mymoveL /*Safari and Chrome*/
    {
        from {transform:translateX(0)
        }
        to {transform:translateX(30px)
        }
    }
    .consult img{
        width: 100%;
        height: 244px;
    }
    .consultIntro .consultCompany,.consultIntro .consultTime{
        padding-left: 30px;
         color: var(--blue)

    }
    .consultIntro .consultCompany{
        background: url("../assets/book-gray.png") no-repeat 0 0px;
        padding-bottom: 10px;
        height: 18px;
        
    }
    .consultIntro .consultTime{
        background: url("../assets/time-gray.png") no-repeat 0 0px;
        height: 18px;
    }
    .consultIntro{
        padding: 20px;
        box-sizing: border-box;
    }
    /*.consultTitle{
        position: absolute;
        width: 300px;
        height: 76px;
        line-height: 76px;
        font-size: 20px;
        font-weight: bolder;
        background: #fff;
        color: var(--blue);
        right: 0;
        top: 24px;
        padding-left: 20px;
    }*/
    .introduceBox{
        overflow: auto;
        margin-top: 20px

    }
    .introduce{
        width: 50%;
        float: right;
        background: #f1f5f9;
        height: 500px

    }
    .navBox{
        width: 50%;
        background: var(--blue);
        height: 500px;
    }
    .introduce .imgbox{
        height: 80px;
        margin-top: 50px;
				text-align: center;
				margin-bottom: 5px;
    }
    .introduce .imgbox img{
				max-width: 200px;
				height: 80px;
    }
    .introduce span{
        display: block;
        border:1px solid #00aaf9;
        margin:auto;
        width: 62px;
        box-shadow: 1px 1px 1px 2px #e7e7fb
    }
    .introduceTitle{
        font-size: 20px;
        font-weight: bolder;
        color: #222;
        margin: 20px auto 20px;
        text-align: center;
    }
    .introduceContent{
			  margin: 0 40px;
				text-indent:2em;
        color: #78859b;
        max-height: 250px;
        overflow: hidden;
        line-height: 30px;
				
    }
    .nav .el-col{
        float: right;
        margin-top: 80px;
    }
    .nav .el-menu-item.is-active{
        background: rgb(235,240,248)!important;
    }
		.nav .el-menu-item{
				margin: 2px;
				background-color: rgb(109,204,248) !important;
		}
		.el-menu{
			border-right:none;
		}
		

</style>
<style>
    .el-carousel{
        border-bottom: 1px solid #dbdbdb;
    }
    .el-carousel__indicators{
        display: none;
    }
    #home .el-carousel__arrow{
        width: 85px;
        height: 85px;
        background-repeat: no-repeat;
    }
    .el-carousel__arrow i{
        display: none;
    }
    #home .el-carousel__arrow:hover{
        background-color: rgba(255,255,255,1);
    }
    #home .el-carousel__arrow--left{
        background-image: url("../assets/arrow-left1.png");
        background-size: 65%;
        margin-left: 50px;
        background-position:15px 15px ;
        background-color: rgba(255,255,255,0.4);
        box-shadow: 1px 1px 30px  #dcdcdc
    }
    #home .el-carousel__arrow--right{
        background-image: url("../assets/arrow-right2.png");
        background-size: 65%;
        margin-right: 50px;
        background-position:15px 15px ;
        background-color: rgba(255,255,255,0.4);
        box-shadow: 1px 1px 30px  #dcdcdc

    }
    #home .btnCenter{
        padding: 0px 0px 36px
    }
    #home .btnCenter .el-button--primary{
        background: var(--blue);
        padding: 0;
        width: 200px;
        height: 60px;
        font-size: 16px;
        border-radius: 50px;
        box-shadow: 10px 10px 20px  #dcdcdc
    }
    #home .el-button--primary:hover{
        background: #83d3f8;
        border-color: #83d3f8;
    }
    .btn{
        background: #cdeaf8;
        color: #42b7f9;
        border: 0;
        padding: 6px 20px;
        border-radius: 20px;
        float: right;
    }
    .btn:hover{
        cursor: pointer;
        background: var(--blue);
        color: #fff;
    }
       
</style>