<template>
	<div id="main">	
		<div class="backLayout">		
		  <breadcrumb :menu="menu"></breadcrumb>
		  <el-form label-position="right" label-width="150px">
			<el-form-item label="身份">
			  <el-input v-model="identity" :disabled='true'></el-input>
			</el-form-item>
			<el-form-item label="账号">
			  <el-input v-model="account" :disabled='true'></el-input>
			</el-form-item></el-form-item>
			<el-form-item label="真实姓名">
			  <el-input v-model="realName" maxlength='20'></el-input>
			</el-form-item></el-form-item>
			<el-form-item label="手机号码">
			  <el-input v-model="phone" :disabled='true'></el-input>
			</el-form-item></el-form-item>
			<el-form-item label="性别">
			  <el-radio v-model="radio1" label="1">男</el-radio>
			  <el-radio v-model="radio1" label="2">女</el-radio>
			  <el-radio v-model="radio1" label="3">保密</el-radio>
			</el-form-item>
			<div v-if="role == '企业账号'">
				<el-form-item label="年龄">
				  <el-input-number v-model="age" :min="0" :max="100"></el-input-number>
				</el-form-item>
				<el-form-item label="学历">
					<el-select v-model="educeation">
						<el-option
							v-for="e in educeations"
							:value="e.label"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="职称">
					<el-input v-model="jobName" maxlength='20'></el-input>
					<span class="tips">{{jobName.length}}/20</span>
				</el-form-item>
				<el-form-item label="从事专业">
					<el-input v-model="professional" maxlength='20'></el-input>
					<span class="tips">{{professional.length}}/20</span>
				</el-form-item>
				<el-form-item label="工作内容">
					<el-input v-model="job" maxlength='20'></el-input>
					<span class="tips">{{job.length}}/20</span>
				</el-form-item>
				<el-form-item label="电子邮箱">
					<el-input v-model="email" maxlength='20'></el-input>
					<span class="tips">{{email.length}}/20</span>
				</el-form-item>
				<el-form-item label="个人简介">
					<el-input type="textarea" :rows="6" resize="none" v-model="personalprofile" maxlength='200'></el-input>
					<span class="tips">{{personalprofile.length}}/200</span>
				</el-form-item>
			</div>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
			</el-form-item>
		  </el-form>
		</div>
	</div>
</template>
<script>
  import breadcrumb from '../components/breadcrumb1'
	export default{
		name:'personalInformation',
		components:{
			breadcrumb
		},
		data(){
			return{
				 menu:[{
				 title:'个人基本信息'
				 }],
				 id:'',
				 identity:'',
				 role:'',
				 account:'',
				 realName:'',
				 phone:'',
				 radio1:'1',
				 age:'',
				 educeation:'',
				 educeations:[
					 {
					   label:'专科'
				     },{
					   label:'本科'
				     },{
					   label:'硕士'
				     },{
					   label:'博士'
				     }
				 ],
				 jobName:'',
				 professional:'',
				 job:'',
				 email:'',
				 personalprofile:'',
			}
		},
		methods:{
			 getInformation(){	
				 let that=this;
				 const token=localStorage.getItem('token');
				 this.$axios.get(this.$baseUrl+'/portal/role/currentRole?token='+token)
				 .then(function(res){
				 	if(res.data.code == 0){
				 	let data = res.data.data;
				 	console.log(data)						 	
				 	for(var i =0;i<data.length;i++){
								
						  if(data[i] == '超级管理员'){
								 that.role = '超级管理员';
								 break;
							}else if(data[i] == '企业' || data[i] == '企业老师'){
				 				console.log(data[i])
				 			  that.role = '企业账号';
				 			  break;
				 		 }
				 	}	
					
					if(that.role != '超级管理员'){						
						that.identity = data.join(',');
						that.getRolesInformation();
					}					
				 }
				 })
				 .catch(function(err){
				 console.log(err)
				 })
				 
				 
				 			 
			  },
			 getRolesInformation(){
				   let that=this;
				   const token=localStorage.getItem('token');
				   this.$axios.get(this.$userUrl+'/account/getroles?token='+token)
				   .then(function(res){
				   console.log(res);
				   let result = res.data;
				   if(result.code == 0){
				   	that.id = result.data.id;						
				   	that.account = result.data.account;
				   	that.realName = result.data.nickname;
				   	that.phone = result.data.phone;
				   	that.age = result.data.age;
				   	if(result.data.sex =='男'){
				   		that.radio1 = '1';							
				   	}else if(result.data.sex =='女'){
				   		that.radio1 = '2';							
				   	}else{
				   		that.radio1 = '3';							
				   	}
				   	that.age = result.data.age;
				   	that.educeation = result.data.background;
				   	that.jobName = result.data.joblocal ==null? '':result.data.joblocal;
				   	that.professional = result.data.professional ==null? '':result.data.professional;
				   	that.job = result.data.job==null? '':result.data.job;
				   	that.email = result.data.email ==null? '':result.data.email;
				   	that.personalprofile = result.data.personalprofile ==null? '':result.data.personalprofile;
				   }else{
						 that.$message.error(res.data.msg);
					 }								
				   })
				   .catch(function(err){
				   console.log(err)
				   })
				},
			 onSubmit(){
				let that=this;
				const token=localStorage.getItem('token');
				let sex = '';
				if(this.radio1 == '1'){
					sex = '男';							
				}else if(this.radio1 == '2'){
					sex = '女';							
				}else{
					sex = '保密';							
				}
				console.log(sex)
				let data = {
					id:this.id,
					nickname:this.realName,
					sex:sex,
					age:this.age,
					phone:this.phone,
					background:this.educeation,
					joblocal:this.jobName,
					professional:this.professional,
					job:this.job,
					email:this.email,
					personalprofile:this.personalprofile
				}
				console.log(data)
				this.$axios.post(this.$userUrl+'/account/update?token='+token,data)
				.then(function(res){
					console.log(res)
				   if(res.data.code == 0){
					   that.$message({
						  message: '保存成功',
						  type: 'success'
						});
				   }else{
						 	that.$message.error(res.data.msg);
					 }											
				})
				.catch(function(err){
				console.log(err)
				}) 
			 }
		},
		created:function(){            
			this.getInformation();	
		}

	}
</script>
<style scoped>
	.el-input,.el-select,.el-textarea,.el-input-number{
		width: 300px;
	}
	.tips{
		margin-left: 10px;
	}
</style>
<style>

</style>