<template>
	<div id="main">	
		<div class="backLayout">		
			<breadcrumb :menu="menu"></breadcrumb>
      <div class="formBox">
        <div class="info">
          <span>账号:</span>
          <el-input v-model="account" maxlength='20'></el-input>
        </div>
        <div class="info">
          <span>密码:</span>
          <el-input v-model="passward"></el-input>
        </div>
        <div class="info">
          <span>确认密码:</span>
          <el-input v-model="repassward"></el-input>
        </div>
        <div class="info">
          <span>手机号:</span>
          <el-input v-model="phone"></el-input>
        </div>
        <div class="info">
          <span>真实姓名:</span>
          <el-input v-model="name" maxlength='20'></el-input>
        </div>
        <div class="info">
          <span>性别:</span>
          <el-radio v-model="radio1" label="1">男</el-radio>
          <el-radio v-model="radio1" label="2">女</el-radio>
					<el-radio v-model="radio1" label="3">保密</el-radio>
        </div>
				<div class="info" v-if="roles == 'school' || roles == 'company'">
					<span>学历:</span>
					<el-select v-model="educeation">
						<el-option
							v-for="e in educeations"
							:value="e.label"
						></el-option>
					</el-select>
				</div>
				<div class="info" v-if="roles == 'company'">
					<span>职称:</span>
					<el-input v-model="joblocal" maxlength='20'></el-input>
					<span>{{joblocal.length}}/20</span>
				</div>
				<div class="info" v-if="roles == 'company'">
					<span>从事专业:</span>
					<el-input v-model="professional" maxlength='20'></el-input>
					<span>{{professional.length}}/20</span>
				</div>
        <div class="info" v-if="roles == 'admin'">
          <span>单位类型:</span>
          <el-radio v-model="radio2" label="1">学校</el-radio>
          <el-radio v-model="radio2" label="2">企业</el-radio>
        </div>				
        <div class="info" v-if="roles == 'admin'">
          <span>所属单位:</span>
					<div class="school" v-if="radio2 == '1'">
          <el-select v-model="school" @change="change1" placeholder="请选择学校">
            <el-option
               v-for="item in schools"
               :label="item.label"
							 :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="institute" @change="change2" placeholder="请选择学院">
            <el-option
               v-for="item in institutes"
               :label="item.label"
               :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="major" placeholder="请选择专业">
            <el-option
               v-for="item in majors"
               :label="item.label"
               :value="item.value"
            ></el-option>
          </el-select>
					</div>
					<div class="company" v-if="radio2 == '2'">
					  <el-input v-model="company"></el-input>
					</div>
        </div>
        <div class="btn"><el-button type="primary" @click="onSubmit">保存</el-button></div>
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
				 roles:this.$route.query.role,
         menu:[{
         title:'用户列表',
				 path:'/UserList'
         },{
         title:'创建账号'
         }],    
         account:'',
         phone:'',
         name:'',
         passward:'',
         repassward:'',
         radio1:'1',
         radio2:'1',
         school:'',
         schools:[],
         institute:'',
         institutes:[],
         major:'',
         majors:[],
				 company:'',
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
				 joblocal:'',
				 professional:''
			}
		},
		methods:{
			   onSubmit(){
					 let that=this;
					 const token=localStorage.getItem('token');
					 let sex = '';
					 let type = '';
					 let telRegex = /^[1][3,4,5,7,8][0-9]{9}$/;
					 if(this.account == '' || this.phone == '' ||this.passward == '' ||this.name == ''){
						   this.$message.error('有空值，请完善创建内容！');
						   return; 
					 }else if(this.passward.length < 6 || this.passward.length > 20){
						   this.$message.error('密码长度6-20！');
						   return;
					 }else if(this.passward != this.repassward){
						   this.$message.error('密码不一致！');
						   return;
					 }else if(!telRegex.test(this.phone)){						 					
							this.$message.error('请确认输入的号码是否正确！');
							return;
					 }
					 if(this.radio1 == '1'){
					    sex = '男';							
					 }else if(this.radio1 == '2'){
					    sex = '女';							
					 }else{
					    sex = '保密';							
					 }
					 if(this.roles == 'admin'){
							 if(this.radio2 == '1'){
								type = 'school';
							 }else if(this.radio2 == '2'){
								type = 'company';							
							 }
							 for(let i =0;i<this.schools.length;i++){
								if(this.school == this.schools[i].value){
									this.school = this.schools[i].label;
									break;
								}
							 }
							 for(let i =0;i<this.institutes.length;i++){
							 if(this.institute == this.institutes[i].value){
								this.institute = this.institutes[i].label;
								break;
							 }
							 }
							 for(let i =0;i<this.majors.length;i++){
							 if(this.major == this.majors[i].value){
								this.major = this.majors[i].label;
								break;
							 }
							 }
							 let data = {
								account:this.account,
								phone:this.phone,
								passw:this.passward,
								nickname:this.name,
								sex:sex,
								type:type,
								school:this.school,
								college:this.institute,
								professionalname:this.major,
								unitname:this.company
							 }
							 console.log(data);					
							 this.$axios.post(this.$userUrl+'/account/addaccount?token='+token,data)
							 .then(function(res){
							 console.log(res);
								if(res.data.code == 0){
									that.$message({
										message: '添加成功',
										type: 'success'
									});
									that.$router.push({path:'/UserList',query:{}});
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
					 }else{
						 if(this.roles == 'company'){
						    type = 'companyboy';
						 }else if(this.roles == 'school'){
						    type = 'schoolboy';							
						 }
						 let data = {
						 account:this.account,
						 phone:this.phone,
						 passw:this.passward,
						 nickname:this.name,
						 sex:sex,
						 type:type,
						 background:this.educeation,
						 joblocal:this.joblocal,
						 professional:this.professional
						 }
						 console.log(data);
						 this.$axios.post(this.$userUrl+'/account/addaccountboy?token='+token,data)
						 .then(function(res){
						   console.log(res)
							 if(res.data.code == 0){
							 	that.$message({
							 		message: '添加成功',
							 		type: 'success'
							 	});
							 	that.$router.push({path:'/UserList',query:{}});
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
					 }
					 
				 },
         getSchool(){
					 let that=this;
					 const token=localStorage.getItem('token');
					 this.$axios.get(this.$userUrl+'/school/getschoollist?token='+token)
					 .then(function(res){
					 	  let result = res.data;
						  if(result.code == 0){
								that.schools = [];
								result.data.forEach(function(value,index,array){
									that.schools.push({
										label:value.schoolname,
										value:value.id
										})
								})
							}
					 })
					 .catch(function(err){
					 	console.log(err)
					 })
					 
				 },
				 change1(){
					 let that=this;
					 const token=localStorage.getItem('token');
					 this.$axios.get(this.$userUrl+'/school/getcollegelist?token='+token+'&schoolid='+this.school)
					 .then(function(res){
					 	let result = res.data;
					 	if(result.code == 0){
					 		that.institutes = [];
							that.majors = [];
					 		result.data.forEach(function(value,index,array){
					 			that.institutes.push({
					 				label:value.collegename,
					 				value:value.id
					 				})
					 		})
					 	}
					 })
					 .catch(function(err){
					 console.log(err)
					 })
				 },
				 change2(){
				 	console.log(this.institute);
				 	let that=this;
				 	const token=localStorage.getItem('token');
				 	this.$axios.get(this.$userUrl+'/school/getprofessionallist?token='+token+'&collegeid='+this.institute)
				 	.then(function(res){
				 	let result = res.data;
				 	if(result.code == 0){
				 		that.majors = [];
				 		result.data.forEach(function(value,index,array){
				 			that.majors.push({
				 				label:value.professionalname,
				 				value:value.id
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
			this.getSchool();	
		}

	}
</script>
<style scoped>
   .formBox{
    width: 90%;
    margin: auto;
   }
   .formBox .info{
    margin-bottom: 30px
   }
   .formBox .info span{
     display: inline-block;
     width: 100px
   }
	 .company,.school{
		 display: inline-block;
	 }
   .el-input,.el-select{
    width: 280px;
    margin-right: 10px
   }
   .el-button{
    width: 200px
   }
   .formBox .btn{
       background: #fff;
       margin:auto ;
       float: none;
       width: 200px;

   }
</style>
<style>

</style>