<template>
	<div id="main">	
		<div class="backLayout">		
			<breadcrumb :menu="menu"></breadcrumb>
      <el-form label-position="right" label-width="150px" :disabled="this.$route.query.aid != ''">
        <el-form-item label="账号">
        	<el-input v-model="account"></el-input>
        </el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="name"></el-input>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input v-model="age"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-input v-model="sex"></el-input>
				</el-form-item>
				<el-form-item label="学历">
					<el-input v-model="background"></el-input>
				</el-form-item>
				<el-form-item label="职称">
					<el-input v-model="joblocal"></el-input>
				</el-form-item>
				<el-form-item label="从事专业">
					<el-input v-model="professional"></el-input>
				</el-form-item>
				<el-form-item label="工作内容">
					<el-input v-model="job"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="phone"></el-input>
				</el-form-item>
				<el-form-item label="电子邮箱">
					<el-input v-model="email"></el-input>
				</el-form-item>
        <el-form-item label="个人简介">
        	<el-input type="textarea" :rows="6" resize="none" v-model="personalprofile"></el-input>
        </el-form-item>   
        </el-form>
      </div>
		</div>
	</div>
</template>
<script>
  import breadcrumb from '../components/breadcrumb1'
	export default{
		name:'addAccount',
		components:{
			breadcrumb
		},
		data(){
			return{
         menu:[{
         title:'用户列表',
				 path:'/UserList'
         },{
         title:'查看账户'
         }],    
         account:'',
         name:'',
				 age:'',
				 sex:'',
				 background:'',
				 joblocal:'',
				 professional:'',
				 job:'',
				 phone:'',
				 email:'',
				 personalprofile:''
			}
		},
		methods:{
			   getInformation(){
					 let that=this;
					 const token=localStorage.getItem('token');
					 console.log(this.$route.query.aid);
					 this.$axios.get(this.$userUrl+'/account/getTeacherByAid/'+this.$route.query.aid+'?token='+token)
					 .then(function(res){
					    console.log(res)
					    if(res.data.code == 0){
								let data = res.data.data;
								that.account = data.account;
								that.name = data.nickname;
								that.age = data.age;
								that.sex = data.sex;
								that.background = data.background;
								that.joblocal = data.joblocal;
								that.professional = data.professional;
								that.job = data.job;
								that.phone = data.phone;
								that.email = data.email;
								that.personalprofile = data.personalprofile;
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
 .el-input,.el-textarea{
 	width: 300px;
 }
</style>
<style>

</style>