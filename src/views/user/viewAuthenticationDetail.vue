<template>
	<div id="signAuthenticationMain">
		<div class="backLayout">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Authentication' }">企业认证</el-breadcrumb-item>
        <el-breadcrumb-item>查看详情</el-breadcrumb-item>
      </el-breadcrumb>  
			<div class="resultBox">
			    <span class="title">审核认证结果：</span>
			    <div class="resultInfo" :class="{pass:status=='pass',no_pass:status=='no_pass',wait:status=='wait'}">
			    	<p>{{stateName}}</p>
						<div>审核备注：{{remarks}}</div>
						<div v-if="status =='wait'">正在审核中，工作人员会在3~5个工作日进行处理，请耐心等待!</div>
			    	<div>提交时间：{{subitTime}}</div>
			    	<div v-if="status !='wait'">审核时间：{{reviewTime}}</div>
						<router-link :to="{path:'/signAuthentication',query:{id:this.id,type:this.$route.query.type}}"><el-button type='warning' v-if="status=='no_pass'" style="float: right;background: #ff9800">重新提交</el-button></router-link>			    	
			    </div>	
			</div>
			<div class="box" >				    		
				<div class="formBox">
					<div class="title">企业基本信息</div>
					<div class="formInfo"><span>企业名称</span><span>{{name}}</span></div>
					<div class="formInfo"><span>统一社会信用代码</span><span>{{code}}</span></div>
					<div class="formInfo" style=''>
						<span style="float: left;">事业单位证明/营业执照</span>
						<div style="margin-right: 20px;display: inline-block;height: 80px;" v-for="showImg in license"><img style='width: 100px;cursor:pointer' :src='showImg.fileId' @click="showPictrue(showImg.fileId)" :title='showImg.name'></div>
					</div>
					<div class="formInfo"><span>机构类型</span><span>{{type}}</span></div>
					<div class="formInfo">
						<span>企业规模</span>
						<span>{{scale}}</span>
					</div>
					<div class="formInfo">
						<span>所在区域</span>
						<span style="margin-right: 20px">{{province}}</span>
						<span>{{city}}</span>
					</div>
					<div class="formInfo"><span>详细地址</span><span>{{adress}}</span></div>
					<div class="title">企业运营信息</div>
					<div class="formInfo"><span>运营者身份证姓名</span><span>{{operatorName}}</span></div>
					<div class="formInfo"><span>运营者手机号</span><span>{{operatorPhone}}</span></div>
					<div class="formInfo"><span>联系邮箱</span><span>{{email}}</span></div>
					<div class="formInfo">
						<span style="float: left;">运营授权确认函</span>
						<div style="margin-right: 20px;display: inline-block;height: 80px;" v-for="showImg in authorization"><img style='width: 100px;cursor:pointer' :src='showImg.fileId' @click="showPictrue(showImg.fileId)" :title='showImg.name'></div>
					</div>
					<div class="formInfo">
						<span style="float: left;">补充文件</span>
						<div style="margin-right: 20px;display: inline-block;height: 80px;" v-for="showImg in supplement"><img style='width: 100px;cursor:pointer' :src='showImg.fileId' @click="showPictrue(showImg.fileId)" :title='showImg.name'></div>
					</div>								
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import map from '../../../static/json/map.js'
	export default{
		name:'viewAuthenticationDetail',
		data(){
			return{ 
			  authentication:this.$route.query.type,
              dialogImageUrl:'',
              dialogVisible: false,
              name:'犇云公司',
              code:'1646464646',
              type:'好的类型',
              scale:'很大',
              province:'广西省',
              city:'柳州市',
              adress:'广西柳州市犇云公司',
              operatorName:'大哥',
              operatorPhone:'1068461864',
              email:'benyun@123.com',
              subitTime:'2019-1-1',
              reviewTime:'2019-1-1',
              status:'pass',
			  remarks:'',
			  stateName:'',
			  id:'',
			  license:[],
			  authorization:[],
			  supplement:[]
			}
		},
		methods:{
	   showPictrue(url){
		   this.$alert('<a target="_blank" href='+url+'><img src='+url+' style="width:100%" ></a>',  {
              dangerouslyUseHTMLString: true,
              showConfirmButton:false
            }).catch(() => {
            });
	   },
       getCompany(){
       	let that=this;
       	const token=localStorage.getItem('token');
       	this.$axios.get(this.$userUrl+'/company/info?token='+token)
       	.then(function(res){
       		console.log(res);
       		if(res.data.code == 0){
       			let data = res.data.data;
       			console.log(data.length)
				console.log(that.authentication)
       			if(data.length == 1){
							  that.showCompany(data[0]);      					
       			}else if(data.length == 2){
       					if(data[0].authtype == that.authentication){
       						     that.showCompany(data[0]);
       					}else if(data[1].authtype == that.authentication){
       						     that.showCompany(data[1]);
       					}  
       			}
       		}
       									
       	})
       	.catch(function(err){
       		console.log(err)
       	})
       },
			 showCompany(data){
				 if(data.auditstatus == 'pass'){
					 this.status = 'pass';
					 this.stateName = '审核通过';
				 } else if(data.auditstatus == 'no_pass'){
					 this.status = 'no_pass';
					 this.stateName = '审核不通过';
				 } else if(data.auditstatus == 'pending'){
					 this.status = 'wait';
					 this.stateName = '待审核';
				 }						
					this.subitTime = this.changeDate(new Date(data.committime));
					this.reviewTime = this.changeDate(new Date(data.audittime));
					this.remarks = data.auditnote;
					this.name = data.name;
					this.code = data.code;
					this.type = data.type;
					this.scale = data.scale;
					this.province = data.province;
					this.city = data.city;
					this.adress = data.address;
					this.operatorName = data.operatorname;
					this.operatorPhone = data.operatorphone;
					this.email = data.email;
					this.id = data.id;
					let img1 = JSON.parse(data.license);
					let img2 = JSON.parse(data.authorization);
					let img3 = JSON.parse(data.supplement);
					for(let i=0;i<img1.length;i++){
						this.license.push({name:img1[i].originalFilename,fileId:this.$pictrueShowUrl+'/data/download/'+img1[i].fileId})
					}
					for(let i=0;i<img2.length;i++){
						this.authorization.push({name:img2[i].originalFilename,fileId:this.$pictrueShowUrl+'/data/download/'+img2[i].fileId})
					}
					if(img3 != null){
					   for(let i=0;i<img3.length;i++){
					   	this.supplement.push({name:img3[i].originalFilename,fileId:this.$pictrueShowUrl+'/data/download/'+img3[i].fileId})
					   }
					}
									
			 }			 
		},
		created:function(){
		    this.getCompany();			
		}
	}
</script>
<style scoped>
	.box{
		border: 1px solid #F5F5F5;
		box-shadow: -10px 10px 30px #DCDCDC;
		margin:20px auto 50px;
		padding: 30px 0px
	}
	.formBox .title{
		font-size: 23px;
		font-weight: bolder;
		margin: 50px 100px 20px;
	}
	.formBox .formInfo{
		margin: 30px 130px;
		font-size: 16px;
		overflow: auto;
	}
	.formBox .formInfo span:nth-child(1){
		display: inline-block;
		width: 200px;
		text-align: left;
	}
   .resultBox .title{
    font-size: 26px;
    font-weight: bolder;
    display: inline-block;
    margin-bottom: 20px
   }
   .resultInfo{
   	border: 1px solid #DCDCDC;
   	padding: 0px 20px 20px;
   	overflow: auto;
   }
   .resultInfo p{
   	font-size: 20px;
   	font-weight: bolder;
   }
   .resultInfo div{
   	margin-bottom: 10px
   }
   .resultBox .pass{
   	background:#8bc34a;
   }
   .resultBox .no_pass{
   	background:#fa5454;
   	color: #fff
   }
   .resultBox .wait{
   	background:#ff9800;
   	color: #fff
   }

</style>
<style>
   
</style>