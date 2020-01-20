<template>
	<div id="signAuthenticationMain">
		<div class="backLayout">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item  :to="{ path: '/companyAccountList' }">企业审核</el-breadcrumb-item>
        <el-breadcrumb-item v-if="status=='待审核'">审核账号</el-breadcrumb-item>
        <el-breadcrumb-item v-if="status!='待审核'">查看明细</el-breadcrumb-item>
      </el-breadcrumb>
			<div class="resultBox">
			    <span class="title">企业账号审核</span>
			    <div class="resultInfo" v-if="status=='待审核'">
			    	 <span>审核备注</span><el-input type="textarea" :rows='5' v-model="remarks"></el-input>
             <div class="btn1">
              <el-button type="primary" @click="result('pass')">通过</el-button><el-button type="danger" @click="result('no_pass')">不通过</el-button>
            </div>          
			    </div>	
          <div class="resultInfo" v-if="status=='已通过'">
              <div class="label"><span>审核人</span><span>{{auditor}}</span></div>
              <div class="label"><span>审核时间</span><span>{{auditTime}}</span></div>
              <div class="label"><span>审核状态</span><span style="color: #3ea63d">{{status}}</span></div>
              <div class="label"><span>审核备注</span><span>{{remarks1}}</span></div>          
          </div>
          <div class="resultInfo" v-if="status=='未通过'">
             <div class="label"><span>审核人</span><span>{{auditor}}</span></div>
             <div class="label"><span>审核时间</span><span>{{auditTime}}</span></div>
             <div class="label"><span>审核状态</span><span style="color: red">{{status}}</span></div>
             <div class="label"><span>审核备注</span><span>{{remarks1}}</span></div>     
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
	export default{
		name:'reviewCompanyAccount',
		data(){
			return{
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
              status:this.$route.query.status,
              remarks:'',
              auditor:'xxx',
              auditTime:'2019-2-1',
              remarks1:'xxxxxxxxxxxxxx',
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
			   result(flag){
					 const token=localStorage.getItem('token');
					 let that=this;
					 let data = {
						 id:this.$route.query.id,
						 auditStatus:flag,
						 auditNote:this.remarks
					 }
					 console.log(data)
					 this.$axios.post(this.$userUrl+'/company/auditAuthInfo?token='+token,data)
					 .then(function(res){
					    console.log(res);
							if(res.data.code == 0){
								that.$message({
									message: '审核成功',
									type: 'success'
								});
								that.$router.push({path:'/companyAccountList',query:{}});
							} else{
								that.$message({
									message:res.data.msg ,
									type: 'warning'
								});
							}
					 })
					 .catch(function(err){
					 console.log(err)
					 })
					},
         getCompany(){
					 console.log(this.status)
					 console.log(this.$route.query.id);
					 const token=localStorage.getItem('token');
					 let that=this;
					 
					 this.$axios.get(this.$userUrl+'/company/get/'+this.$route.query.id+'?token='+token)
					 .then(function(res){
					    console.log(res);
							if(res.data.code == 0){
								  let data = res.data.data;
								  that.name = data.name;
									that.code = data.code;
									that.type = data.type;
									that.scale = data.scale;
									that.province = data.province;
									that.city = data.city;
									that.adress = data.address;
									that.operatorName = data.operatorname;
									that.operatorPhone = data.operatorphone;
									that.email = data.email;
									that.auditor = data.auditor;
									that.auditTime = that.changeDate(new Date(data.audittime));
									that.remarks1 = data.auditnote;
									let img1 = JSON.parse(data.license);
									let img2 = JSON.parse(data.authorization);
									let img3 = JSON.parse(data.supplement);
									console.log(img1)
									for(let i=0;i<img1.length;i++){
										that.license.push({name:img1[i].originalFilename,fileId:that.$pictrueShowUrl+'/data/download/'+img1[i].fileId})
									}
									console.log(that.license)
									for(let i=0;i<img2.length;i++){
										that.authorization.push({name:img2[i].originalFilename,fileId:that.$pictrueShowUrl+'/data/download/'+img2[i].fileId})
									}
									if(img3 != null){
									for(let i=0;i<img3.length;i++){
										that.supplement.push({name:img3[i].originalFilename,fileId:that.$pictrueShowUrl+'/data/download/'+img3[i].fileId})
									}
									}
							}
					 })
					 .catch(function(err){
					 console.log(err)
					 })
					 
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
   	padding: 20px 20px ;
   	overflow: auto;
   }
   .resultInfo span:nth-child(1),.resultInfo span:nth-child(3n){
    float: left;
    display: inline-block;
    width: 100px
   }
   .resultInfo .el-textarea{
    width: 500px
   }
   .resultInfo .btn1{
    margin:20px 100px 0;
   }
   .resultInfo .label{
    margin: 10px 0px
   }


</style>
<style>
   
</style>